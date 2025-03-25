<template>
  <!-- 订单流程进度条容器 -->
  <div class="od-banner">
    <!-- 右上角装饰图标 -->
    <img class="od-banner-icon" src="/images/od_bg_icon.png" mode="widthFix" />
    
    <!-- 进度条容器，根据传入的item动态应用类名 -->
    <div class="od-jd" :class="[`od-jd-${item}`]">
      <!-- 进度条轨道 -->
      <div class="od-jd-out">
        <!-- 进度条填充 -->
        <div class="od-jd-in"></div>
      </div>
      
      <!-- 步骤文字容器，使用flex布局 -->
      <div class="vp-flex od-jd-text">
        <!-- 填写订单步骤 -->
        <div class="vp-flex_1">
          <text class="od-jd-st-0">填写订单</text>
        </div>
        <!-- 在线支付步骤 -->
        <div class="vp-flex_1">
          <text class="od-jd-st-10">在线支付</text>
        </div>
        <!-- 专人服务步骤 -->
        <div class="vp-flex_1">
          <text class="od-jd-st-20">专人服务</text>
        </div>
        <!-- 服务完成步骤 -->
        <div class="vp-flex_1">
          <text class="od-jd-st-30">服务完成</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from "vue";

// 获取当前组件实例
const { proxy } = getCurrentInstance();
// 定义组件接收的prop：当前进度状态（0-30）
const { item } = defineProps(["item"]);
</script>

<style lang="less" scoped>
/* 弹性布局混合类 */
.vp-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

/* 弹性项占满剩余空间 */
.vp-flex_1 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-tap-highlight-color: transparent;
}

/* 进度条容器样式 */
.od-banner {
  overflow: hidden;
  position: relative;
  /* 垂直重复的背景图片 */
  background: url(data:image/png;base64编码)
    repeat-y center;
  background-size: 100%;
}

/* 右上角装饰图标样式 */
.od-banner-icon {
  position: absolute;
  top: 15px;
  right: -10px;
  width: 65px;
  opacity: 0.6;
}

/* 进度条主容器 */
.od-jd {
  margin: 30px 20px;
}

/* 进度条轨道样式 */
.od-jd-out {
  background: #ffffff;
  border: 2.5px solid #ffffff;
  height: 10px;
  line-height: 10px;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
}

/* 进度条填充样式 */
.od-jd-in {
  height: 10px;
  line-height: 10px;
  border-radius: 25px;
  overflow: hidden;
  width: 0%;
  /* 垂直重复的背景图片 */
  background: url(data:image/png;base64编码)
    repeat-y center;
  background-size: 100%;
}

/* 步骤文字容器样式 */
.od-jd-text {
  text-align: center;
  padding-top: 15px;
}

/* 步骤文字样式 */
.od-jd-text text {
  color: #ffffff;
  font-size: 13px;
  opacity: 0.7;
}

/* 进度状态对应的样式 */
.od-jd-0 .od-jd-in { width: 12%; }
.od-jd-0 .od-jd-st-0 { opacity: 1; font-weight: bold; }

.od-jd-10 .od-jd-in { width: 37%; }
.od-jd-10 .od-jd-st-10 { opacity: 1; font-weight: bold; }

.od-jd-20 .od-jd-in { width: 64%; }
.od-jd-20 .od-jd-st-20 { opacity: 1; font-weight: bold; }

.od-jd-30 .od-jd-in { width: 100%; }
.od-jd-30 .od-jd-st-30 { opacity: 1; font-weight: bold; }

.od-jd-40 .od-jd-in {
  width: 100%;
  background: #999999;
}
</style>