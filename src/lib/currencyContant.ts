export const currencyOptions = [
  { code: 'USD', symbol: 'US$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
];

export const currencySymbols: Record<string, string> = {
  USD: 'US$',
  EUR: '€',
  GBP: '£',
  BDT: '৳'
};

export const formatCurrency = (amount: number, currencyCode: string) => {
  const symbol = currencySymbols[currencyCode] || currencyCode;
  return `${symbol}${amount?.toFixed(2)}`;
};