export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pl-PL');
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
