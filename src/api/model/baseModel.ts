export interface BasicPageParams {
  page: number;
  pageSize: number;
  order: string;
  sort: string;
}

export interface BasicFetchResult<T> {
  data: T[];
  total: number;
}
