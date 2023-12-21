/**
 * 设置token
 * @param token
 * @returns
 */
export const setToken = (token: string) =>
	window.localStorage.setItem("snake-pro-token", token);

/**
 * 获取token
 * @returns
 */
export const getToken = () => {
	const token = window.localStorage.getItem("snake-pro-token");
	return token;
};

/**
 * 获取token
 * @returns
 */
export const clearToken = () =>
	window.localStorage.removeItem("snake-pro-token");
