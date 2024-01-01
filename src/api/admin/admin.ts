import { AccountParams } from '../demo/model/systemModel';
import { defHttp } from '@/utils/http/axios';
import { ListAdminResult } from '../model/admin/admin';

enum Api {
  AdminList = '/admins',
}

export const listAdmin = (params: AccountParams) =>
  defHttp.get<ListAdminResult>({ url: Api.AdminList, params });
