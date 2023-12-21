import type { RouteRecordRaw } from "vue-router";
export const ROOT_ROUTE_REDIRECT_PATH = "/login";
const Layout = () => import("~/layouts/index.vue");
const basicRouteMap = {
	// iframe模式下使用
	Iframe: () => import("~/pages/common/iframe.vue"),
	// 一般用于存在子集的页面
	RouteView: () => import("~/pages/common/route-view.vue"),
};
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
			title: "仪表盘",
			icon: "DashboardOutlined",
		},
		component: () => import("~/pages/settingPage/mainSettings.vue"),
	},
	{
		path: "/game",
		name: "game",
		meta: {
			title: "游戏中心",
			icon: "FormOutlined",
		},
		component: () => import("~/pages/game/mainGame.vue"),
	},
	{
		path: "/skin",
		name: "skin",
		meta: {
			title: "皮肤市场",
			icon: "LinkOutlined",
		},
		component: () => import("~/pages/shopping/shoppingmall.vue"),
	},
	{
		path: "/user",
		name: "user",
		meta: {
			title: "用户中心",
			icon: "BarsOutlined",
		},
		component: () => import("~/pages/userPage/mainUser.vue"),
	},
] as RouteRecordRaw[];
