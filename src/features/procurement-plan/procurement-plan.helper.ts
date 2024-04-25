export enum EProcurementType {
  FOURNITURES = 'FOURNITURES',
  SERVICES_COURANTS = 'SERVICES_COURANTS',
  TRAVAUX = 'TRAVAUX',
  PRESTATIONS_INTELLECTUELLES = 'PRESTATIONS_INTELLECTUELLES',
}

export interface IProcurementPlanListFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
  launchStartDate?: Date;
  launchEndDate?: Date;
  grantStartDate?: Date;
  grantEndDate?: Date;
  types?: EProcurementType[];
}

export const isValidProcurementPlanCode = (code: string) =>
  code && code.length === 23 && code.includes('PPL-');
