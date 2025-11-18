import { useState, useEffect } from 'react';
import { DocumentTemplate, FormFieldValue, TemplateFieldType } from '../types';
import { companyData, shareholders } from '../data/companyData';

interface DocumentEditorProps {
  template: DocumentTemplate;
  onBack: () => void;
}

declare const html2pdf: any;

export default function DocumentEditor({ template, onBack }: DocumentEditorProps) {
  const [formData, setFormData] = useState<FormFieldValue>({});
  const [logoFile, setLogoFile] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill company data
  useEffect(() => {
    const initialData: FormFieldValue = {};
    template.variables.forEach(variable => {
      if (variable.key === 'NAZWA_SPOLKI') initialData[variable.key] = companyData.name;
      else if (variable.key === 'KRS') initialData[variable.key] = companyData.krs;
      else if (variable.key === 'NIP') initialData[variable.key] = companyData.nip;
      else if (variable.defaultValue) initialData[variable.key] = variable.defaultValue;
      else initialData[variable.key] = '';
    });
    setFormData(initialData);
  }, [template]);

  // Generate HTML preview
  useEffect(() => {
    let html = template.htmlTemplate;

    // Replace variables
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, String(value || ''));
    });

    // Handle logo
    if (logoFile) {
      html = html.replace(/{{LOGO_SPOLKI}}/g, logoFile);
      html = html.replace(/{{#if LOGO_SPOLKI}}/g, '');
      html = html.replace(/{{\/if}}/g, '');
    } else {
      html = html.replace(/{{#if LOGO_SPOLKI}}.*?{{\/if}}/gs, '');
    }

    // Add current year
    html = html.replace(/{{YEAR}}/g, new Date().getFullYear().toString());

    setHtmlContent(html);
  }, [formData, logoFile, template]);

  const handleInputChange = (key: string, value: string | number | File) => {
    setFormData(prev => ({ ...prev, [key]: value }));

    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    template.variables.forEach(variable => {
      if (variable.required && !formData[variable.key]) {
        newErrors[variable.key] = 'To pole jest wymagane';
      }

      if (variable.validation && formData[variable.key]) {
        const value = formData[variable.key];

        if (variable.validation.pattern) {
          const regex = new RegExp(variable.validation.pattern);
          if (!regex.test(String(value))) {
            newErrors[variable.key] = variable.validation.message || 'Nieprawidłowy format';
          }
        }

        if (variable.validation.min !== undefined && Number(value) < variable.validation.min) {
          newErrors[variable.key] = `Minimalna wartość: ${variable.validation.min}`;
        }

        if (variable.validation.max !== undefined && Number(value) > variable.validation.max) {
          newErrors[variable.key] = `Maksymalna wartość: ${variable.validation.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleExportPDF = () => {
    if (!validateForm()) {
      alert('Proszę poprawić błędy w formularzu');
      return;
    }

    const element = document.getElementById('document-preview');
    const opt = {
      margin: 20,
      filename: `${template.name.replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleSaveDraft = () => {
    if (!validateForm()) {
      alert('Proszę poprawić błędy w formularzu');
      return;
    }

    const draft = {
      templateId: template.id,
      templateName: template.name,
      data: formData,
      savedAt: new Date().toISOString()
    };

    const drafts = JSON.parse(localStorage.getItem('documentDrafts') || '[]');
    drafts.push(draft);
    localStorage.setItem('documentDrafts', JSON.stringify(drafts));

    alert('Szkic zapisany pomyślnie!');
  };

  const handlePrint = () => {
    if (!validateForm()) {
      alert('Proszę poprawić błędy w formularzu');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const renderFormField = (variable: typeof template.variables[0]) => {
    const value = formData[variable.key] || '';
    const hasError = !!errors[variable.key];

    switch (variable.type) {
      case TemplateFieldType.TEXT:
        return (
          <input
            type="text"
            value={String(value)}
            onChange={(e) => handleInputChange(variable.key, e.target.value)}
            placeholder={variable.placeholder}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
              hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
        );

      case TemplateFieldType.NUMBER:
        return (
          <input
            type="number"
            value={String(value)}
            onChange={(e) => handleInputChange(variable.key, Number(e.target.value))}
            placeholder={variable.placeholder}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
              hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
        );

      case TemplateFieldType.DATE:
        return (
          <input
            type="date"
            value={String(value)}
            onChange={(e) => handleInputChange(variable.key, e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
              hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
        );

      case TemplateFieldType.TEXTAREA:
        return (
          <textarea
            value={String(value)}
            onChange={(e) => handleInputChange(variable.key, e.target.value)}
            placeholder={variable.placeholder}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
              hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
        );

      case TemplateFieldType.SELECT:
        return (
          <select
            value={String(value)}
            onChange={(e) => handleInputChange(variable.key, e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
              hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Wybierz...</option>
            {variable.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case TemplateFieldType.SHAREHOLDER_SELECT:
        return (
          <select
            value={String(value)}
            onChange={(e) => handleInputChange(variable.key, e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
              hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Wybierz akcjonariusza...</option>
            {shareholders.map(sh => (
              <option key={sh.id} value={sh.name}>{sh.name} ({sh.shares} akcji)</option>
            ))}
          </select>
        );

      case TemplateFieldType.IMAGE:
        return (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
            {logoFile && (
              <img src={logoFile} alt="Logo preview" className="mt-2 h-16 object-contain" />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <i className="fas fa-arrow-left text-xl"></i>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {template.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {template.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
            >
              <i className="fas fa-save"></i>
              <span>Zapisz szkic</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center gap-2"
            >
              <i className="fas fa-print"></i>
              <span>Drukuj</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <i className="fas fa-file-pdf"></i>
              <span>Eksport PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Split Screen */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Form */}
        <div className="w-1/2 overflow-y-auto p-8 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Wypełnij dane dokumentu
          </h2>

          <div className="space-y-6">
            {template.variables.map((variable) => (
              <div key={variable.key}>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                  {variable.label}
                  {variable.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFormField(variable)}
                {errors[variable.key] && (
                  <p className="mt-1 text-sm text-red-500">{errors[variable.key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Preview */}
        <div className="w-1/2 bg-gray-200 dark:bg-gray-900 overflow-y-auto p-8">
          <div className="bg-white shadow-2xl mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
            <div
              id="document-preview"
              className="p-0"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
