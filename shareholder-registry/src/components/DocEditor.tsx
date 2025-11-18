import { useState, useEffect } from 'react';
import { DocumentTemplate } from '../types';
import { docTemplatesDetails } from '../data/templates';
import { classNames } from '../utils/helpers';
import toast from 'react-hot-toast';

interface DocEditorProps {
  template: DocumentTemplate;
  onBack: () => void;
}

export default function DocEditor({ template, onBack }: DocEditorProps) {
  const tdata = docTemplatesDetails[template.id];

  if (!tdata) {
    return (
      <div className="max-w-xl mx-auto bg-slate-800 rounded-lg p-8 text-center flex flex-col items-center">
        <i className={`fa-solid ${template.icon} text-6xl mb-4 text-blue-400`}></i>
        <h2 className="font-bold text-2xl mb-2">{template.name}</h2>
        <p className="mb-8">{template.desc}</p>
        <p className="text-slate-400 mb-12">
          Edytor tego dokumentu zostanie udostępniony w kolejnej wersji.
        </p>
        <button
          className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 font-semibold"
          onClick={onBack}
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Wróć do wzorów
        </button>
      </div>
    );
  }

  const [form, setForm] = useState({ ...tdata.autofill });
  const [logo, setLogo] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  // Auto-calculate KWOTA_PODWYZSZENIA
  useEffect(() => {
    if (form.LICZBA_AKCJI && form.WARTOSC_NOMINALNA && !touched['KWOTA_PODWYZSZENIA']) {
      const val = Number(form.LICZBA_AKCJI) * Number(form.WARTOSC_NOMINALNA);
      setForm((f) => ({ ...f, KWOTA_PODWYZSZENIA: val || '' }));
    }
  }, [form.LICZBA_AKCJI, form.WARTOSC_NOMINALNA, touched]);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string) => {
    const v = e.target.value;
    setForm((old) => ({ ...old, [fieldKey]: v }));
    setTouched((old) => ({ ...old, [fieldKey]: true }));
  };

  const autofill = () => {
    setForm({ ...tdata.autofill });
    toast.success('Formularz wypełniony przykładowymi danymi');
  };

  const exportPDF = () => {
    toast('Funkcja eksportu PDF w przygotowaniu', {
      icon: '📄',
      duration: 3000
    });
  };

  const onLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e2) => {
        setLogo(e2.target?.result as string);
        toast.success('Logo dodane');
      };
      reader.readAsDataURL(file);
    }
  };

  const closeEditor = () => {
    if (window.confirm('Na pewno opuścić edytor? Niezapisane dane zostaną utracone.')) {
      onBack();
    }
  };

  const invalids = tdata.fields.filter((x) => x.required && !form[x.key]).map((x) => x.key);

  const isMobile = window.innerWidth < 768;

  const FormFields = () => (
    <div className="space-y-4">
      {tdata.fields.map((field) => (
        <div key={field.key}>
          <label className="text-sm font-semibold block mb-1">{field.label}</label>
          <input
            type={field.type}
            className={classNames(
              'w-full px-3 py-2 rounded border bg-slate-900 text-slate-100 outline-none transition',
              field.readonly ? 'bg-slate-700 cursor-not-allowed' : '',
              invalids.includes(field.key) ? 'border-red-500' : 'border-slate-700'
            )}
            value={form[field.key] ?? ''}
            onChange={(e) => onInput(e, field.key)}
            readOnly={!!field.readonly}
            placeholder={field.placeholder || ''}
            required={field.required}
          />
        </div>
      ))}
      <button
        type="button"
        className="w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 mt-2 font-semibold"
        onClick={autofill}
      >
        <i className="fa-solid fa-magic mr-2"></i>
        Wypełnij przykładowymi danymi
      </button>
    </div>
  );

  const DocPreview = () => {
    let html = tdata.preview(form);
    if (logo) {
      html = html.replace(
        /<div class="w-24 h-24[^"]*">(?:.|\n)*?<\/div>/,
        `<div class="w-24 h-24 bg-cover bg-center bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center" style="background-image:url('${logo}')"></div>`
      );
    }
    return (
      <div
        className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg shadow-lg overflow-auto scrollbar-hide"
        style={{ minHeight: '800px', maxHeight: '1200px' }}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  };

  const Toolbar = () => (
    <div className="flex gap-2 flex-wrap items-center mb-6">
      <label className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded cursor-pointer font-semibold transition">
        <i className="fa-solid fa-upload mr-2"></i>
        <span className="hidden md:inline">Dodaj logo</span>
        <input type="file" className="hidden" accept="image/*" onChange={onLogoUpload} />
      </label>
      <button
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 font-semibold"
        onClick={exportPDF}
      >
        <i className="fa-solid fa-file-arrow-down mr-2"></i> Eksport PDF
      </button>
      <button
        className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600 font-semibold"
        onClick={() => toast.success('Dane zapisane (symulacja)')}
      >
        <i className="fa-solid fa-floppy-disk mr-2"></i> Zapisz
      </button>
      <button
        className="ml-auto px-4 py-2 bg-red-600 rounded hover:bg-red-700 font-semibold"
        onClick={closeEditor}
      >
        <i className="fa-solid fa-xmark mr-2"></i> Zamknij
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <div className="w-full">
        <Toolbar />
        <div className="flex gap-2 mb-4">
          <button
            className={classNames(
              'flex-1 py-2 rounded font-semibold',
              activeTab === 'form' ? 'bg-blue-600' : 'bg-slate-700'
            )}
            onClick={() => setActiveTab('form')}
          >
            Formularz
          </button>
          <button
            className={classNames(
              'flex-1 py-2 rounded font-semibold',
              activeTab === 'preview' ? 'bg-blue-600' : 'bg-slate-700'
            )}
            onClick={() => setActiveTab('preview')}
          >
            Podgląd
          </button>
        </div>
        <div>{activeTab === 'form' ? <FormFields /> : <DocPreview />}</div>
      </div>
    );
  }

  return (
    <div>
      <Toolbar />
      <div className="flex gap-8">
        <div className="w-2/5 min-w-[340px]">
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">{template.name}</h3>
            <FormFields />
          </div>
        </div>
        <div className="w-3/5">
          <div className="sticky top-8">
            <DocPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
