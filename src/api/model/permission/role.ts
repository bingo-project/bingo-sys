import { BasicFetchResult, BasicPageParams } from '../baseModel';

export type RoleParams = {
  name?: string;
};

export type RoleListParams = BasicPageParams & RoleParams;

export interface RoleListItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  remark: string;
}

/**
 * @description: Request list return value
 */
export type RoleListResult = BasicFetchResult<RoleListItem>;
