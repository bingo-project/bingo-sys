import { isNull } from 'xe-utils';
import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  CreateMenuRequest,
  CreateRoleRequest,
} from './model/systemModel';
import { defHttp } from '@/utils/http/axios';
import { isEmpty, isUndefined } from 'lodash-es';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/menus/tree',
  CreateMenu = '/menus',
  RolePageList = '/roles',
  GetAllRoleList = '/system/getAllRoleList',
  ChangePassword = '/auth/change-password',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params }).then((data) => {
    if (!isNull(data) && !isUndefined(data) && !isEmpty(data)) {
      updateTreeTitle(data);
    }

    return data;
  });

function updateTreeTitle(treeData) {
  treeData.forEach((element) => {
    element.title = element.meta.title;
    if (element.children) {
      updateTreeTitle(element.children);
    }
  });
}

export const createMenu = (params?: CreateMenuRequest) =>
  defHttp.post({ url: Api.CreateMenu, params: params });

export const updateMenu = (id: number, params?: CreateMenuRequest) =>
  defHttp.put({ url: Api.CreateMenu + '/' + id, params: params });

export const deleteMenu = (id: number) => defHttp.delete({ url: Api.CreateMenu + '/' + id });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const createRole = (params?: CreateRoleRequest) =>
  defHttp.post({ url: Api.RolePageList, params: params });

export const updateRole = (id: number, params?: CreateRoleRequest) =>
  defHttp.put({ url: Api.RolePageList + '/' + id, params: params });

export const deleteRole = (name: string) => defHttp.delete({ url: Api.RolePageList + '/' + name });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

export const changePassword = (passwordOld: string, passwordNew: string) =>
  defHttp.put({ url: Api.ChangePassword, params: { passwordOld, passwordNew } });
