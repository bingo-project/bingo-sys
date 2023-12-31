import { defHttp } from '@/utils/http/axios';
import {
  CreateRoleRequest,
  RoleListParams,
  RoleListResult,
  SetPermissionApiRequest,
  SetPermissionMenuRequest,
} from '../model/permission/role';

enum Api {
  RoleList = '/roles',
  RoleDetail = '/roles/{name}',
  PermissionMenu = '/roles/{name}/menus',
  PermissionApi = '/roles/{name}/apis',
}

export const listRole = (params?: RoleListParams) =>
  defHttp.get<RoleListResult>({ url: Api.RoleList, params });

export const createRole = (params?: CreateRoleRequest) =>
  defHttp.post({ url: Api.RoleList, params: params });

export const updateRole = (id: number, params?: CreateRoleRequest) =>
  defHttp.put({ url: Api.RoleList + '/' + id, params: params });

export const deleteRole = (roleName: string) =>
  defHttp.delete({ url: Api.RoleDetail.replace('{name}', roleName) });

export const getPermissionMenu = (roleName: string) =>
  defHttp.get({ url: Api.PermissionMenu.replace('{name}', roleName) });

export const setPermissionMenu = (roleName: string, params?: SetPermissionMenuRequest) =>
  defHttp.put({
    url: Api.PermissionMenu.replace('{name}', roleName),
    params: params,
  });

export const getPermissionApi = (roleName: string) =>
  defHttp.get({ url: Api.PermissionApi.replace('{name}', roleName) });

export const setPermissionApi = (roleName: string, params?: SetPermissionApiRequest) =>
  defHttp.put(
    {
      url: Api.PermissionApi.replace('{name}', roleName),
      params: params,
    },
    { successMessageMode: 'none' },
  );
