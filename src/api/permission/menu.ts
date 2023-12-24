import { defHttp } from '@/utils/http/axios';
import { CreateMenuRequest, MenuListResult, MenuParams } from '../model/permission/menu';

enum Api {
  MenuTree = '/menus/tree',
  MenuList = '/menus',
}

export const menuList = (params?: MenuParams) =>
  defHttp.get<MenuListResult>({ url: Api.MenuTree, params });

export const createMenu = (params?: CreateMenuRequest) =>
  defHttp.post({ url: Api.MenuList, params: params });

export const updateMenu = (id: number, params?: CreateMenuRequest) =>
  defHttp.put({ url: Api.MenuList + '/' + id, params: params });

export const deleteMenu = (id: number) => defHttp.delete({ url: Api.MenuList + '/' + id });
