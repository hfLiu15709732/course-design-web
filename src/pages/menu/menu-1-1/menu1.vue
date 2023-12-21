<script setup lang="ts">
import { postLogin } from '~@/api/common/login';


const handleGetAllCommunityList = async () => {
  try {
    const data: Array<object> = await postLogin();
    console.log(data);

  } catch (error) {
    console.log(error);
  } finally {
    console.log("请求结束");
  }
};

</script>

<template>
  <div @click="handleGetAllCommunityList">
    Menu1-1
  </div>
</template>
