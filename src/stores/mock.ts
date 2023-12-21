import type { MenuData } from "~@/layouts/basic-layout/typing";
import dynamicRoutes, { rootRoute } from "~@/router/dynamic-routes";
import { genRoutes } from "~@/router/generate-route";

export const useUserStore = defineStore("user", () => {
	const routerData = shallowRef();
	const menuData = shallowRef<MenuData>([]);
	const userInfo = reactive({
		avatar:
			"https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
		username: "admin",
		nickname: "超级管理员",
		token: "",
	});

	const generateRoutes = async () => {
		const currentRoute = {
			...rootRoute,
			children: dynamicRoutes,
		};
		menuData.value = genRoutes(dynamicRoutes);
		return currentRoute;
	};

	const generateDynamicRoutes = async () => {
		const routerDatas = await generateRoutes();
		routerData.value = routerDatas;
		return routerDatas;
	};

	const handleChangeInfo = async (data) => {
		userInfo.avatar = data.avatar;
		userInfo.username = data.username;
		userInfo.token = data.token;
		return userInfo;
	};

	const persist = {
		key: "snake-pro-user", //存储键值对的键名称
		storage: window.localStorage, //存储方式
		paths: ["userInfo"], //需要存储的数据(按需存储)
	}; //部分数据开启持久化存储

	return {
		routerData,
		menuData,
		generateDynamicRoutes,
		handleChangeInfo,
		userInfo,
		persist,
	};
});
