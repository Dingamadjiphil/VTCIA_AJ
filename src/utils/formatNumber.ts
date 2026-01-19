/**
 * Formats a number with abbreviations (K, M, B)
 * @param num - The number to format
 * @returns Formatted string with abbreviation
 */
export function formatNumberWithAbbreviation(num: number): string {
  if (num >= 1_000_000_000) {
    const value = num / 1_000_000_000;
    return value % 1 === 0 ? `${value}B` : `${value.toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    const value = num / 1_000_000;
    return value % 1 === 0 ? `${value}M` : `${value.toFixed(1)}M`;
  }
  if (num >= 1_000) {
    const value = num / 1_000;
    return value % 1 === 0 ? `${value}K` : `${value.toFixed(1)}K`;
  }
  return num.toString();
}
