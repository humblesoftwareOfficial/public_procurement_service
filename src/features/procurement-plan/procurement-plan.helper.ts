export enum EProcurementType {
  FOURNITURES = 'FOURNITURES',
  SERVICES_COURANTS = 'SERVICES_COURANTS',
  TRAVAUX = 'TRAVAUX',
}

export interface IProcurementPlanListFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
}
