export interface IProvisionalNoticeAwardFilter {
  skip: number;
  limit: number;
  searchTerm?: string;
  publicationStartDate?: Date;
  publicationEndDate?: Date;
  types?: ENoticeAwardType[];
}

export enum ENoticeAwardType {
  PROVISIONAL = 'PROVISIONAL',
  DEFINITIVE = 'DEFINITIVE',
}

export const isValidAwareNoticeCode = (code: string) =>
  code && code.length === 23 && code.includes('PNA-');