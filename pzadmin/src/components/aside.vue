<template>
   <el-menu
        :style="{width:'230px'}"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <p class="logo-lg">快捷陪诊</p>
        <treeMenu :menuData="menuData" />
      </el-menu>
    
</template>


<script setup>
import treeMenu from './treeMenu.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const menuData = reactive(router.options.routes[0].children)
console.log(menuData)


const handleOpen = () =>{}
const handleClose = () =>{}


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



