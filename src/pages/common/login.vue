<script setup lang="ts">
import { AlipayCircleFilled, LockOutlined, TaobaoCircleFilled, UserOutlined, WeiboCircleFilled } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import GlobalLayoutFooter from '~/layouts/components/global-footer/index.vue'
import { postLogin, postRegister } from '~@/api/common/login'
import { getToken, setToken } from '~@/utils/auth'
// import { loginApi } from '~/api/common/login'
const appStore = useAppStore()
const { layoutSetting } = storeToRefs(appStore)
const router = useRouter()
const loginModel = reactive({
  username: '',
  password: '',
  remember: true,
})

const registerModel = reactive({
  username: '',
  password: '',
  remember: true,
})

const formRef = shallowRef()
const antdToken = useAntdToken()
const resetCounter = 60
const submitLoading = shallowRef(false)
const buttonText = shallowRef("立即登录")
const tabsType = shallowRef('account')
const userStore = useUserStore()

const { counter, pause, reset, resume, isActive } = useInterval(1000, {
  controls: true,
  immediate: false,
  callback(count) {
    if (count) {
      if (count === resetCounter)
        pause()
    }
  },
})


const submit = async () => {
  submitLoading.value = true
  try {
    if (tabsType.value === "account") {
      if (loginModel.username === '' || loginModel.password === '') {
        throw { message: "empty" }
      }
      const data = await postLogin({
        username: loginModel.username,
        password: loginModel.password,
      })
      if (data.token) {
        message.success('登录成功 返回上次位置');
        userStore.handleChangeInfo(data)
        setToken(data.token)

        router.push('/setting')
      }
    }
    else if (tabsType.value === 'mobile') {
      if (registerModel.username === '' || registerModel.password === '') {
        throw { message: "empty" }
      }
      const data = await postRegister({
        username: registerModel.username,
        password: registerModel.password,
      })
      if (data.token) {
        message.success('注册成功,欢迎进入手势贪吃蛇的战场');
        userStore.handleChangeInfo(data)
        setToken(data.token)

        router.push('/setting')
      }
    }


  }
  catch (e) {

    if (e.message === 'empty') {
      message.warn("请填写密码及用户名")
    } else {
      message.error('用户名或密码操作，请重新尝试');
    }
    console.warn(e)
  }
  finally {
    submitLoading.value = false
  }
}


const checkAuth = async () => {
  const data = getToken();
  if (data) {
    console.log("自动进入");
    message.success("已成功返回上次战场位置")
    router.push('/setting')
  } else {

  }
}


onMounted(() => {

  checkAuth();
})





watch(tabsType, value => {
  if (value === "account") {
    buttonText.value = '立即登录'
  } else if (value === "mobile") {
    buttonText.value = "立即注册"
  }

})
</script>

<template>
  <div class="login-container">
    <div class="login-lang" flex="~" items-center justify-end gap-2 px-24px>
      <span flex items-center justify-center cursor-pointer text-16px
        @click="appStore.toggleTheme(layoutSetting.theme === 'dark' ? 'light' : 'dark')">
        <!-- 亮色和暗黑模式切换按钮 -->
        <template v-if="layoutSetting.theme === 'light'">
          <carbon-moon />
        </template>
        <template v-else>
          <carbon-sun />
        </template>
      </span>
    </div>
    <div class="login-content">
      <div class="ant-pro-form-login-cotainer">
        <div class="ant-pro-form-login-top">
          <div class="ant-pro-form-login-header">
            <span class="ant-pro-form-login-logo">
              <img src="/logo.svg">
            </span>
            <span class="ant-pro-form-login-title">
              Snake Pro
            </span>
          </div>
          <div class="ant-pro-form-login-desc">
            手势贪吃蛇 是一款很牛逼的游戏 nb nb nb
          </div>
        </div>
        <div class="ant-pro-form-login-main" w-335px>
          <a-form ref="formRef" v-model="loginModel">
            <a-tabs v-model:activeKey="tabsType" centered>
              <a-tab-pane key="account" tab="账户密码登录" />
              <a-tab-pane key="mobile" tab="注册游戏账户" />
            </a-tabs>
            <template v-if="tabsType === 'account'">
              <a-form-item name="username">
                <a-input v-model:value="loginModel.username" allow-clear placeholder="请输入用户名" size="large"
                  @pressEnter="submit">
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item name="password">
                <a-input-password v-model:value="loginModel.password" allow-clear placeholder="请输入密码" size="large"
                  @pressEnter="submit">
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>
            </template>
            <template v-if="tabsType === 'mobile'">
              <a-form-item name="username-reg">
                <a-input v-model:value="registerModel.username" allow-clear placeholder="请输入用户名" size="large">
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item name="password-reg">
                <a-input-password v-model:value="registerModel.password" allow-clear placeholder="请输入密码" size="large">
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
              </a-form-item>
            </template>
            <div class="mb-24px" flex items-center justify-between>
              <a-checkbox v-model:checked="loginModel.remember">
                自动登录
              </a-checkbox>
              <a>忘记密码 ?</a>
            </div>
            <a-button type="primary" block :loading="submitLoading" size="large" @click="submit">
              {{ buttonText }}
            </a-button>
          </a-form>
          <div class="ant-pro-form-login-other" text-14px>
            其他登录方式:
            <AlipayCircleFilled class="icon" />
            <TaobaoCircleFilled class="icon" />
            <WeiboCircleFilled class="icon" />
          </div>
        </div>
      </div>
    </div>
    <div py-24px px-50px :data-theme="layoutSetting.theme" text-14px>
      <GlobalLayoutFooter :copyright="layoutSetting.copyright">
        <template #renderFooterLinks>
          <footer-links />
        </template>
      </GlobalLayoutFooter>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: var(--bg-color-container);
}

.login-lang {
  width: 100%;
  height: 40px;
  line-height: 44px;
}

.login-content {
  flex: 1 1;
  padding: 32px 0
}

.ant-pro-form-login-cotainer {
  display: flex;
  flex: 1 1;
  flex-direction: column;
  height: 100%;
  padding: 32px 0;
  overflow: auto;
  background: inherit
}

.ant-pro-form-login-top {
  text-align: center
}

.ant-pro-form-login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  line-height: 44px
}

.ant-pro-form-login-header a {
  text-decoration: none
}

.ant-pro-form-login-title {
  position: relative;
  top: 2px;
  color: var(--text-color);
  font-weight: 600;
  font-size: 33px
}

.ant-pro-form-login-logo {
  width: 44px;
  height: 44px;
  margin-right: 16px;
  vertical-align: top
}

.ant-pro-form-login-logo img {
  width: 100%
}

.ant-pro-form-login-desc {
  margin-top: 12px;
  margin-bottom: 40px;
  color: var(--text-color-1);
  font-size: 14px
}

.ant-pro-form-login-main {
  min-width: 328px;
  max-width: 500px;
  margin: 0 auto
}

.ant-pro-form-login-main {
  .ant-tabs-nav-list {
    margin: 0 auto;
    font-size: 16px;
  }

  .ant-pro-form-login-other {
    margin-top: 24px;
    line-height: 22px;
    text-align: left
  }

  .icon {
    margin-left: 8px;
    color: var(--text-color-2);
    font-size: 24px;
    vertical-align: middle;
    cursor: pointer;
    transition: color .3s;

    &:hover {
      color: v-bind('antdToken.colorPrimary');
    }
  }
}

@media(min-width: 768px) {
  .login-container {
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }

  .login-content {
    padding: 32px 0 24px;
  }

  .ant-pro-form-login-cotainer {
    padding: 32px 0 24px;
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%
  }
}
</style>
