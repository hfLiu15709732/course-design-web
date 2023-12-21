import axios from "axios";
import { defineStore } from "pinia";

const userInfoMock = {
	avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
	username: "admin",
	nickname: "超级管理员",
	token: "",
};

const useAuthStore = defineStore("auth", {
	persist: {
		key: "snake-pro-auth",
		storage: window.localStorage,
		paths: ["userInfo"],
		enable: true,
	},
	state: () => {
		return {
			userInfo: userInfoMock,
		};
	},
	actions: {
		async handleChangeInfo(data: any) {
			this.userInfo.avatar = data.avatar;
			this.userInfo.username = data.username;
			this.userInfo.token = data.token;
		},
	},
});

export default useAuthStore;
