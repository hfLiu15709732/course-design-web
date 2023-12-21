<script setup lang="ts">
import { CloseOutlined, CopyOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ContentWidth, LayoutType, ThemeType } from '../../basic-layout/typing'
import Body from './body.vue'
import BlockCheckbox from './block-checkbox.vue'
import ThemeColor from './theme-color.vue'
import LayoutSetting from './layout-setting.vue'
import RegionalSetting from './regional-setting.vue'
import OtherSetting from './other-setting.vue'
import { message } from 'ant-design-vue'
const props = withDefaults(defineProps<{
  open?: boolean
  theme?: ThemeType
  colorPrimary?: string
  colorList?: ({ key: string; color: string })[]
  layout?: LayoutType
  contentWidth?: ContentWidth
  fixedHeader?: boolean
  fixedSider?: boolean
  splitMenus?: boolean
  header?: boolean
  footer?: boolean
  menu?: boolean
  menuHeader?: boolean
  colorWeak?: boolean
  multiTab?: boolean
  multiTabFixed?: boolean
}>(), {
  theme: 'light',
  colorList: () => [
    { key: 'techBlue', color: '#1677FF' },
    { key: 'daybreak', color: '#1890ff' },
    { key: 'dust', color: '#F5222D' },
    { key: 'volcano', color: '#FA541C' },
    { key: 'sunset', color: '#FAAD14' },
    { key: 'cyan', color: '#13C2C2' },
    { key: 'green', color: '#52C41A' },
    { key: 'geekblue', color: '#2F54EB' },
    { key: 'purple', color: '#722ED1' },
  ],
})
const emit = defineEmits(['update:open', 'settingChange'])
const prefixCls = shallowRef('ant-pro-drawer-setting')
const handleVisible = (open: boolean) => {
  emit('update:open', open)
}

const changeTheme = (theme: ThemeType) => {
  emit('settingChange', 'theme', theme)
}

const changeColor = (color: string) => {
  emit('settingChange', 'colorPrimary', color)
}

const changeLayout = (layout: string) => {
  emit('settingChange', 'layout', layout)
}
const changeSettingLayout = (key: string, value: any) => {
  emit('settingChange', key, value)
}

function copySetting() {
  const { copy } = useClipboard()
  copy(JSON.stringify(props.layoutSetting ?? {}))
  message?.success("游戏设置保存成功")
}

const token = useAntdToken()
</script>

<template>
  <div :class="`${prefixCls}-handle`" :style="{
    backgroundColor: token?.colorPrimary,
    borderEndStartRadius: `${token?.borderRadius}px`,
    borderStartStartRadius: `${token?.borderRadius}px`,
  }" @click="handleVisible(!open)">
    <CloseOutlined v-if="open" :class="`${prefixCls}-handle-icon${theme === 'light' ? '' : '-dark'}`"
      style="font-size: 20px;" />
    <SettingOutlined v-else :class="`${prefixCls}-handle-icon${theme === 'light' ? '' : '-dark'}`"
      style="font-size: 20px;" />
  </div>
  <a-drawer :open="open" :width="300" placement="right" :closable="false" @update:open="handleVisible">
    <template #handle>
      <div :class="`${prefixCls}-handle`" :style="{
        position: 'absolute',
        top: '240px',
        right: '300px',
        backgroundColor: token?.colorPrimary,
        borderEndStartRadius: `${token?.borderRadius}px`,
        borderStartStartRadius: `${token?.borderRadius}px`,
      }" @click="handleVisible(!open)">
        <CloseOutlined v-if="open" :class="`${prefixCls}-handle-icon${props.theme === 'light' ? '' : '-dark'}`"
          style="font-size: 20px;" />
        <SettingOutlined v-else :class="`${prefixCls}-handle-icon${props.theme === 'light' ? '' : '-dark'}`"
          style="font-size: 20px;" />
      </div>
    </template>
    <div :class="`${prefixCls}-content`">

      <Body title="战场主题风格">
        <div :class="`${prefixCls}-block-checkbox`">
          <BlockCheckbox :checked="props.theme === 'light'" theme="light" :is-dark="props.theme === 'dark'"
            @click="changeTheme('light')" />
          <BlockCheckbox v-if="layout !== 'mix'" :checked="props.theme === 'inverted'" theme="inverted"
            :is-dark="props.theme === 'dark'" @click="changeTheme('inverted')" />
          <BlockCheckbox :checked="props.theme === 'dark'" theme="dark" :is-dark="props.theme === 'dark'"
            @click="changeTheme('dark')" />
        </div>
      </Body>

      <Body title="战场主题色">
        <ThemeColor :color-list="colorList" :color="colorPrimary" @change="changeColor" />
      </Body>
      <a-divider />


      <Body>
        <RegionalSetting :layout="layout" :header="header" :menu-header="menuHeader" :footer="footer"
          :multi-tab="multiTab" :multi-tab-fixed="multiTabFixed" :menu="menu" @change-setting="changeSettingLayout" />
      </Body>
      <a-divider />

      <Body>
        <OtherSetting :color-weak="colorWeak" @change-setting="changeSettingLayout" />
      </Body>

      <Body>
        <div flex gap-2 flex-col class="main-save">
          <a-alert type="warning" show-icon message="手势贪吃蛇小游戏 将会在2024年 1月 11日进行游戏更新 敬请玩家期待">
            <template #icon>
              <NotificationOutlined />
            </template>
          </a-alert>
          <a-button @click="copySetting">
            <CopyOutlined /> 确认保存
          </a-button>
        </div>
      </Body>
    </div>
  </a-drawer>
</template>

<style lang="less">
@import "./index.less";

.main-save {
  position: absolute;
  bottom: 30px;
  left: 16px;
  width: 90%;
}
</style>
