export const formatCurrency = (
  value: number,
  locale: string = "id-ID",
  currency: string = "IDR"
): string => {
  if (value === 0) {
    return `Rp ${value}`;
  }

  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value
  );
};
