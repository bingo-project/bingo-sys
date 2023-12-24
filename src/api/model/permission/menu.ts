import { BasicFetchResult } from '../baseModel';

export type MenuParams = {
  name?: string;
  // status?: string;
};

export interface MenuListItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  path: string;
  sort: string;
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

/**
 * @description: Request list return value
 */
export type MenuListResult = BasicFetchResult<MenuListItem>;
