import { BasicFetchResult } from '../baseModel';

export type ApiParams = {
  method?: string;
  path?: string;
  group?: string;
};

export interface ApiListItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  method: string;
  path: string;
  group: string;
  description: string;
}

export interface CreateApiRequest {
  method: string;
  path: string;
  group: string;
  description: string;
}

/**
 * @description: Request list return value
 */
export type ApiListResult = BasicFetchResult<ApiListItem>;

export type ApiAllResult = ApiListItem[];
