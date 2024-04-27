export const isValidBusinessOpportunityCode = (code: string) =>
  code && code.length === 23 && code.includes('BOP-');

export interface IOpportunitiesListFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
}
