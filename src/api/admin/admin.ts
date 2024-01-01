import { AccountParams } from '../demo/model/systemModel';
import { defHttp } from '@/utils/http/axios';
import { ListAdminResult } from '../model/admin/admin';

enum Api {
  AdminList = '/admins',
  AdminDetail = '/admins/:name',
}

export const listAdmin = (params: AccountParams) =>
  defHttp.get<ListAdminResult>({ url: Api.AdminList, params });

export const updateAdminStatus = (username: string, status: number) =>
  defHttp.put({ url: Api.AdminDetail.replace(':name', username), params: { status } });
