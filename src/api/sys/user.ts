import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/auth/user-info',
  GetPermCode = '/roles/:role/menus',
  TestRetry = '/testRetry',
  ChangePassword = '/auth/change-password',
  SwitchRole = '/auth/switch-role',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode(roleName: string) {
  return defHttp.get<string[]>({ url: Api.GetPermCode.replace(':role', roleName) });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

export const changePassword = (passwordOld: string, passwordNew: string) =>
  defHttp.put({ url: Api.ChangePassword, params: { passwordOld, passwordNew } });

export const switchRole = (roleName: string) =>
  defHttp.put({ url: Api.SwitchRole, params: { roleName } });
