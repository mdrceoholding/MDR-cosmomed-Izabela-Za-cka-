import type { ChecklistaMDR, ComplianceStats } from '../types/compliance';

export function calculateComplianceStats(checklist: ChecklistaMDR): ComplianceStats {
  let takCount = 0;
  let nieCount = 0;
  let ndCount = 0;
  let totalCount = 0;

  const statusObszarow: Array<{ obszar: string; zgodnosc: number }> = [];

  checklist.oblasti.forEach((oblast) => {
    let oblastTak = 0;
    let oblastTotal = 0;

    oblast.punkty.forEach((punkt) => {
      totalCount++;
      oblastTotal++;

      if (punkt.status === 'TAK') {
        takCount++;
        oblastTak++;
      } else if (punkt.status === 'NIE') {
        nieCount++;
      } else if (punkt.status === 'ND') {
        ndCount++;
      }
    });

    const zgodnosc = oblastTotal > 0 ? Math.round((oblastTak / oblastTotal) * 100) : 0;
    statusObszarow.push({
      obszar: oblast.tytul,
      zgodnosc,
    });
  });

  const ogolnyStanZgodnosci =
    totalCount > 0 ? Math.round((takCount / totalCount) * 100) : 0;

  return {
    ogolnyStanZgodnosci,
    liczbaPunktow: {
      tak: takCount,
      nie: nieCount,
      nd: ndCount,
      razem: totalCount,
    },
    statusObszarow,
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL');
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'Critical':
      return 'text-red-600 dark:text-red-400';
    case 'High':
      return 'text-orange-600 dark:text-orange-400';
    case 'Medium':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'Low':
      return 'text-green-600 dark:text-green-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'TAK':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    case 'NIE':
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
    case 'ND':
      return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';
  }
}

export function getCAPAStatusColor(status: string): string {
  switch (status) {
    case 'Open':
      return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
    case 'In Progress':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    case 'Verification':
      return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
    case 'Closed':
      return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';
  }
}
