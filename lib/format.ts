const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formata centavos em reais, com espaço comum para melhor leitura na tela. */
export function formatBRL(cents: number): string {
  return brlFormatter.format(cents / 100).replace(/\u00a0/g, " ");
}

/** Valor mensal equivalente, arredondado para centavos. */
export function getMonthlyEquivalentCents(
  totalCents: number,
  months: number,
): number {
  if (!Number.isFinite(totalCents) || !Number.isFinite(months) || months <= 0) {
    return 0;
  }

  return Math.round(totalCents / months);
}
