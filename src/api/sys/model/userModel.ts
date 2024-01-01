/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  id: number;
  name: string;
  remark: string;
  description: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  roles: RoleInfo[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户名
  username: string;
  // 昵称
  nickname: string;
  // 邮箱
  email: string;
  // 手机
  phone: string;
  // 头像
  avatar: string;
  // 状态：1 正常，2 冻结
  status: number;
  // 角色名称
  roleName: string;
  // 角色
  role: RoleInfo;
  // 可切换角色
  roles: RoleInfo[];
}
