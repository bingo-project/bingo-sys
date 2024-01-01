import { BasicFetchResult, BasicPageParams } from '@/api/model/baseModel';
import { GetUserInfoModel } from '@/api/sys/model/userModel';

export type ListAdminParams = BasicPageParams & {
  username?: string;
  nickname?: string;
  email?: string;
  phone?: string;
  status?: number;
  roleName?: string;
  [key: string]: any;
};

export interface CreateAdminRequest {
  username: string;
  nickname: string;
  email: string;
  phone: string;
  status: number;
  password?: string;
  roleNames?: string[];
}

/**
 * @description: Request list return value
 */
export type ListAdminResult = BasicFetchResult<GetUserInfoModel>;
