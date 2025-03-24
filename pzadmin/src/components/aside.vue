<template>
  <el-menu
      :style="{ width: !isCollapse ? '230px' : '64px' }"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="aside-container"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
  >
  <p class="logo-lg">{{ isCollapse ? "陪诊" : "快捷陪诊" }}</p>
      <treeMenu :menuData="menuData" />
  </el-menu>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '../stores/menuStore';
import treeMenu from './treeMenu.vue';

const router = useRouter();
const menuData = reactive(router.options.routes[0].children);
console.log(menuData);

const menuStore = useMenuStore();
const isCollapse = computed(() => menuStore.isCollapse);

const handleOpen = () => { };
const handleClose = () => { };
</script>

<style lang="less" scoped>
.aside-container {
  // min-width: 230px;
  height: 100%;
  .logo-lg {
      font-size: 20px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      color: #fff;
  }
}
</style>    