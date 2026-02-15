/**
 * Formats a number or string as Brazilian currency (BRL).
 * Example: 2950 -> R$ 2.950,00
 */
export function formatCurrency(value: number | string): string {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d]/g, '')) / 100 : value;
  if (isNaN(numericValue)) return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue);
}

/**
 * Strips formatting from a currency string to get the decimal value.
 * Example: "R$ 2.950,00" -> 2950.00
 */
export function parseCurrency(value: string): number {
  const cleanValue = value.replace(/[^\d]/g, '');
  return cleanValue ? parseFloat(cleanValue) / 100 : 0;
}

/**
 * Formats a number with Brazilian decimal separator.
 * Example: 69.6 -> 69,60
 */
export function formatNumber(value: number | string): string {
  if (value === undefined || value === null || value === '') return '';
  const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
  if (isNaN(num)) return '';
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}
