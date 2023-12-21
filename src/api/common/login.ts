// export interface LoginParams {
//   username: string
//   password: string
// }

// export interface LoginResultModel {
//   token: string
// }

// export const loginApi = (params: LoginParams) => {
//   return usePost<LoginResultModel, LoginParams>('/login', params)
// }

/**
 * 用户相关接口信息
 *
 * 注册
 * 登录
 * 忘记密码/更新密码
 * xxxxxx
 *
 */
import { GET, POST } from "@/utils/request";

/**
 * 登录接口
 * @param data
 * @returns
 */
export const postLogin = (data: { username: string; password: string }) =>
	POST("/user/login", data, { istoken: false });

/**
 * 注册接口
 * @param data
 * @returns
 */
export const postRegister = (data: { password: string; username: string }) =>
	POST("/user/register", data, { isToken: false });

/**
 * 忘记密码/更新密码接口
 * @param data
 * @returns
 */
export const updatePassword = (data: {
	phone: string;
	password: string;
	smsCode: string;
}) => POST("/user/updatepassword", data, { isToken: false });
