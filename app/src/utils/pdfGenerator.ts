import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { ChecklistaMDR, Audit } from '../types/compliance';
import { formatDate } from './complianceCalculations';

export async function generateChecklistPDF(
  checklist: ChecklistaMDR,
  includeDetails: boolean = true
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPos = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Title
  doc.setFontSize(18);
  doc.text('CHECKLISTA ZGODNOŚCI MDR', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Company Data
  doc.setFontSize(12);
  doc.text(`Podmiot: ${checklist.companyData.nazwa}`, margin, yPos);
  yPos += 7;
  doc.setFontSize(10);
  doc.text(`Adres: ${checklist.companyData.adres}`, margin, yPos);
  yPos += 6;
  doc.text(`Kierownik: ${checklist.companyData.kierownik}`, margin, yPos);
  yPos += 6;
  doc.text(`Wersja: ${checklist.companyData.numerWersji}`, margin, yPos);
  yPos += 6;
  doc.text(
    `Data wejścia w życie: ${formatDate(checklist.companyData.dataWejsciaWZycie)}`,
    margin,
    yPos
  );
  yPos += 10;

  // Line
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  if (includeDetails) {
    // Oblasti and Punkty
    checklist.oblasti.forEach((oblast) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${oblast.numer} ${oblast.tytul}`, margin, yPos);
      yPos += 8;

      oblast.punkty.forEach((punkt) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const statusSymbol =
          punkt.status === 'TAK' ? '✓' : punkt.status === 'NIE' ? '✗' : '–';
        doc.text(
          `  ${punkt.numer} ${punkt.tytul}: ${statusSymbol} (${punkt.status})`,
          margin,
          yPos
        );
        yPos += 6;

        if (punkt.uwagi && includeDetails) {
          doc.setFontSize(9);
          doc.setTextColor(100, 100, 100);
          const splitUwagi = doc.splitTextToSize(
            `    Uwagi: ${punkt.uwagi}`,
            contentWidth - 10
          );
          doc.text(splitUwagi, margin, yPos);
          yPos += splitUwagi.length * 4 + 2;
          doc.setTextColor(0, 0, 0);
        }
      });
      yPos += 5;
    });
  }

  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Strona ${i} z ${totalPages} | Wygenerowano: ${new Date().toLocaleDateString('pl-PL')}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  doc.save(
    `Checklista_MDR_${checklist.companyData.numerWersji}_${new Date().toISOString().split('T')[0]}.pdf`
  );
}

export async function generateAuditReportPDF(
  audit: Audit,
  _checklist?: ChecklistaMDR
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPos = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // Title
  doc.setFontSize(18);
  doc.text('RAPORT Z AUDYTU MDR', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Audit info
  doc.setFontSize(12);
  doc.text(`Data audytu: ${formatDate(audit.data)}`, margin, yPos);
  yPos += 7;
  doc.text(`Audytor: ${audit.audytor}`, margin, yPos);
  yPos += 7;
  doc.text(`Wynik: ${audit.wynikProcentowy}%`, margin, yPos);
  yPos += 7;
  doc.text(
    `Zgodności: TAK: ${audit.liczbaZgodnosci.tak} | NIE: ${audit.liczbaZgodnosci.nie} | ND: ${audit.liczbaZgodnosci.nd}`,
    margin,
    yPos
  );
  yPos += 7;
  doc.text(`Status: ${audit.status}`, margin, yPos);
  yPos += 10;

  // Line
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Recommendations
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ZALECENIA:', margin, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const splitZalecenia = doc.splitTextToSize(
    audit.zalecenia,
    pageWidth - 2 * margin
  );
  doc.text(splitZalecenia, margin, yPos);

  doc.save(`Raport_Audytu_${audit.data}.pdf`);
}

export async function generateElementToPDF(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

  const imgX = (pdfWidth - imgWidth * ratio) / 2;
  const imgY = 10;

  pdf.addImage(
    imgData,
    'PNG',
    imgX,
    imgY,
    imgWidth * ratio,
    imgHeight * ratio
  );
  pdf.save(filename);
}
