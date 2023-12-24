import { defHttp } from '@/utils/http/axios';
import { CreateRoleRequest, RoleListParams, RoleListResult } from '../model/permission/role';

enum Api {
  RoleList = '/roles',
}

export const listRole = (params?: RoleListParams) =>
  defHttp.get<RoleListResult>({ url: Api.RoleList, params });

export const createRole = (params?: CreateRoleRequest) =>
  defHttp.post({ url: Api.RoleList, params: params });

export const updateRole = (id: number, params?: CreateRoleRequest) =>
  defHttp.put({ url: Api.RoleList + '/' + id, params: params });

export const deleteRole = (name: string) => defHttp.delete({ url: Api.RoleList + '/' + name });
