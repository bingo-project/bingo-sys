import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';
import { RouteMeta } from 'vue-router';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
  [key: string]: any;
};

export type RoleParams = {
  name?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  path: string;
  sort: string;
  meta: RouteMeta;
  title?: string;
  component: string;
  redirect: string;
  parentID: number;
  children?: MenuListItem[];
}

export interface CreateMenuRequest {
  name: string;
  path: string;
  sort: number;
  component: string;
  redirect: string;
  parentID: number;
  title: string;
  hidden: string;
  icon: string;
}

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
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
