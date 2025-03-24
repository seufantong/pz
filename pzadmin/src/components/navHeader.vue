<template>
  <div class="header-container">
    <div class="header-left flex-box">
      <el-icon class="icon" size="20" @click="menuStore.collapseMenu()"><Fold /></el-icon>
        <ul class="flex-box">
          <li 
          v-for="(item,index) in selectMenu" 
          :key="item.path"
          :class="{selected: route.path===item.path}"
          class="tab flex-box"
          >
          <el-icon size="12" ><component :is="item.icon" /></el-icon>
          <router-link class="flex-box text" :to="{ path: item.path }">
            {{ item.name }}
          </router-link>       
          <el-icon @click="closeTab(item, index)"  size="12" class="close"
            ><Close
          /></el-icon>
          </li>
        </ul>
        
    </div>
    <div class="header-right ">
      <el-dropdown>
        <div class="el-dropdown-link flex-box">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <p class="user-name">admin</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useMenuStore } from '../stores/menuStore';
import { useRouter, useRoute } from "vue-router";

const menuStore = useMenuStore();
const router = useRouter();
const route = useRoute();
const selectMenu = computed(() => menuStore.selectMenu);

// 关闭tab
const closeTab = (item, index) => {
  menuStore.closeMenu(item);
  // 删除非当前页标签的跳转逻辑
  if (item.path !== route.path) {
    return;
  }
  const selectMenuData = selectMenu.value;

  // 删除的最后一项
  if (index === selectMenuData.length) {
    // 如果是最后一个，跳转至首页
    if (!selectMenuData.length) {
      router.push({
        path: "/dashboard",
      });
    } else {
      router.push({
        path: selectMenuData[index - 1].path,
      });
    }
  } else {
    router.push({
      path: selectMenuData[index].path,
    });
  }
};

const userInfo = reactive(JSON.parse(localStorage.getItem('userInfo')));
const handleClick = (command) => {
  if (command === 'cancel') {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('v3pz');
    // 清除cookie中的menu
    // 跳转到登录页
    // router.push('/login')
    window.location.href = window.location.origin;
  }
};
</script>




<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
  height: 100%;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #fff;
  padding-right: 25px;
  .header-left{
    height: 100%;
    .icon{
      width: 45px;
      height: 100%;
    }
    .icon:hover{
      background-color: #f5f5f5;
      cursor: pointer;
    }
    .tab{
      padding: 0 10px;
      height: 100%;
      .text{
        margin: 0 5px;
        
      }
      .close{
        visibility: hidden;
      }
      &.selected{
        a{
          color:#409eff
        }
        i{
          color: #409eff;
        }
        background-color: #f5f5f5;
      }
    }
    
    .tab:hover{
      background-color: #f5f5f5;
      .close{
        visibility: inherit;
        color: #000;
        cursor: pointer;
      }
    }
  }
  .header-right{
    .user-name{
      margin-left: 10px;
    }
  }
  a {
    height: 100;
    color: #333;
    font-size: 15px;
  }
  }
  
  
</style>    