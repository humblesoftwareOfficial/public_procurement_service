export interface IProvisionalNoticeAwardFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
}

export enum ENoticeAwardType {
  PROVISIONAL = 'PROVISIONAL',
  DEFINITIVE = 'DEFINITIVE',
}
