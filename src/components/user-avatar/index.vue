<script setup lang="ts">
import { LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue';
import { clearToken } from '~@/utils/auth';
const { userInfo } = storeToRefs(useUserStore())
const router = useRouter()


const handleLogout = () => {
  clearToken();
  message.success("游戏数据保存，以安全退出")
  router.push('/login')
}
</script>

<template>
  <a-dropdown>
    <span hover="bg-[var(--hover-color)]" flex items-center h-48px px-12px cursor-pointer class="transition-all-300">
      <a-avatar :src="userInfo.avatar" mr-8px size="small" />
      <span class="anticon">{{ userInfo.nickname }}</span>
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <template #icon>
            <UserOutlined />
          </template>
          <a target="_blank" rel="noopener noreferrer" @click="() => { router.push('/user') }">
            个人中心
          </a>
        </a-menu-item>
        <a-menu-item key="1">
          <template #icon>
            <ProfileOutlined />
          </template>
          <a target="_blank" rel="noopener noreferrer" @click="() => { router.push('/setting') }">
            个人设置
          </a>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <template #icon>
            <LogoutOutlined />
          </template>
          <a target="_blank" rel="noopener noreferrer" @click="() => { handleLogout() }">
            退出登录
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
