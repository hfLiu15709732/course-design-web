import type { RouteRecordRaw } from "vue-router";
export const ROOT_ROUTE_REDIRECT_PATH = "/login";
const Layout = () => import("~/layouts/index.vue");
export const rootRoute: RouteRecordRaw = {
	path: "/",
	name: "rootPath",
	redirect: ROOT_ROUTE_REDIRECT_PATH,
	component: Layout,
	children: [],
};

export default [
	{
		path: "/setting",
		name: "Dashboard",
		meta: {
			title: "设置中心",
			icon: "UnorderedListOutlined",
		},
		component: () => import("~/pages/settingPage/mainSettings.vue"),
	},
	{
		path: "/game",
		name: "game",
		meta: {
			title: "游戏中心",
			icon: "RocketOutlined",
		},
		component: () => import("~/pages/game/mainGame.vue"),
	},
	{
		path: "/skin",
		name: "skin",
		meta: {
			title: "皮肤市场",
			icon: "ShoppingOutlined",
		},
		component: () => import("~/pages/shopping/shoppingmall.vue"),
	},
	{
		path: "/user",
		name: "user",
		meta: {
			title: "用户中心",
			icon: "CrownOutlined",
		},
		component: () => import("~/pages/userPage/mainUser.vue"),
	},
] as RouteRecordRaw[];
