<template>
  <!-- 页面容器 -->
  <div class="container">
    <!-- 页面头部 -->
    <div class="header">
      <!-- 返回按钮 -->
      <van-icon
        @click="goback"
        class="header-left"
        name="arrow-left"
        size="30"
      />
      <!-- 页面标题 -->
      填写服务订单
    </div>
    <!-- 顶部轮播图 -->
    <div class="banner">
      <schedule item="0" />
    </div>
    <!-- 服务信息展示 -->
    <van-cell class="cell">
      <template #title>
        <!-- 服务图标 -->
        <van-image
          height="25"
          width="25"
          :src="createInfo.service?.serviceImg"
        />
        <!-- 服务名称 -->
        {{ createInfo.service?.serviceName }}
      </template>
      <!-- 服务内容标识 -->
      <template #default> <div class="service-text">服务内容</div></template>
    </van-cell>

    <!-- 表单容器 -->
    <van-cell-group class="cell">
      <!-- 医院选择项 -->
      <van-cell>
        <template #title>就诊医院 </template>
        <template #default>
          <!-- 医院选择触发 -->
          <div @click="showHospital = true">
            {{ from.hospital_name || "请选择就诊医院" }}
            <!-- 向右箭头图标 -->
            <van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
      <!-- 就诊时间选择项 -->
      <van-cell>
        <template #title>就诊时间 </template>
        <template #default>
          <!-- 日期选择触发 -->
          <div @click="showDate = true">
            {{ timer }}<van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
      <!-- 陪诊师选择项 -->
      <van-cell>
        <template #title>陪诊师 </template>
        <template #default>
          <!-- 陪诊师选择触发 -->
          <div @click="showCompanion = true">
            {{ companion_name }}<van-icon name="arrow" />
          </div>
        </template>
      </van-cell>
      <!-- 接送地址输入项 -->
      <van-cell>
        <template #title>接送地址 </template>
        <template #default>
          <!-- 地址输入框 -->
          <div>
            <van-field
              class="text"
              input-align="right"
              v-model="from.receiveAddress"
              placeholder="请填写就诊人地址"
            />
          </div>
        </template>
      </van-cell>
      <!-- 联系电话输入项 -->
      <van-cell>
        <template #title>联系电话 </template>
        <template #default>
          <!-- 电话输入框 -->
          <div>
            <van-field
              class="text"
              input-align="right"
              v-model="from.tel"
              placeholder="请填写您的联系电话"
            />
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 服务需求描述 -->
    <van-cell-group title="服务需求" class="cell">
      <van-field
        class="text"
        style="height: 100px"
        v-model="from.demand"
        placeholder="请简单描述您要就诊的科室.."
      />
    </van-cell-group>

    <!-- 提交按钮 -->
    <van-button @click="sumbit" class="sumbit" type="primary" size="large">
      提交订单
    </van-button>

    <!-- 医院选择弹出层 -->
    <van-popup v-model:show="showHospital" position="bottom">
      <van-picker
        :columns="hospitalColumns"
        @confirm="hospitalOnConfirm"
        @cancel="showHospital = false"
      />
    </van-popup>
    <!-- 陪诊师选择弹出层 -->
    <van-popup v-model:show="showCompanion" position="bottom">
      <van-picker
        :columns="companionColumns"
        @confirm="companionOnConfirm"
        @cancel="showCompanion = false"
      />
    </van-popup>

    <!-- 日期选择弹出层 -->
    <van-popup v-model:show="showDate" position="bottom">
      <van-date-picker
        @confirm="dateOnConfirm"
        @cancel="showDate = false"
        v-model="currentDate"
        :min-date="minDate"
        title="选择日期"
      />
    </van-popup>

    <!-- 支付二维码弹出层 -->
    <van-dialog :show-confirm-button="false" v-model:show="showcode">
      <!-- 关闭按钮 -->
      <van-icon name="cross" @click="closeCode" class="close" />
      <!-- 支付方式说明 -->
      <div>微信支付</div>
      <!-- 二维码展示 -->
      <van-image height="150" width="150" :src="code" />
      <!-- 操作提示 -->
      <div>请使用本人微信扫描二维码</div>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, computed } from "vue";
import QRCode from "qrcode";
import { useRouter, useRoute } from "vue-router";
import schedule from "../../components/schedule.vue";

// 初始化路由实例
const router = useRouter();
const route = useRoute();
// 获取当前组件实例
const { proxy } = getCurrentInstance();

// 响应式数据：创建订单所需信息
const createInfo = ref({});
// 控制弹出层显示状态
const showHospital = ref(false);
const showCompanion = ref(false);
const showDate = ref(false);
const showcode = ref(false);
// 二维码数据
const code = ref();
// 当前选择的日期
const currentDate = ref();
// 最小可选日期（当前日期）
const minDate = ref(new Date());
// 表单数据
const from = reactive({});

// 计算属性：医院选择列表
const hospitalColumns = computed(() => {
  return createInfo.value?.hospitals?.map((item) => {
    return { text: item.name, value: item.id };
  });
});

// 计算属性：陪诊师选择列表
const companionColumns = computed(() => {
  return createInfo.value?.companion?.map((item) => {
    return { text: item.name, value: item.id };
  });
});

// 计算属性：格式化后的就诊时间
const timer = computed(() => {
  return currentDate.value?.toString().replaceAll(",", "-") || "请选择就诊时间";
});

// 计算属性：陪诊师名称
const companion_name = computed(() => {
  return (
    createInfo?.value?.companion?.find((item) => item.id === from.companion_id)
      ?.name || "请选择陪诊师"
  );
});

// 获取创建订单信息的方法
const getCreateInfo = async () => {
  const res = await proxy.$api.getCreateInfo();
  if (res) {
    createInfo.value = res;
    // 初始化医院选择（根据路由参数）
    let id = route.query.id;
    let hospital = createInfo.value.hospitals.find((item) => item.id === +id);
    from.hospital_id = hospital.id;
    from.hospital_name = hospital.name;
  }
};

// 返回上一页
const goback = (item) => {
  router.go(-1);
};

// 陪诊师选择确认处理
const companionOnConfirm = (item) => {
  from.companion_id = item.selectedValues[0];
  showCompanion.value = false;
};

// 医院选择确认处理
const hospitalOnConfirm = async (item) => {
  from.hospital_id = item.selectedValues[0];
  from.hospital_name = createInfo.value.hospitals.find(
    (item) => item.id === from.hospital_id
  ).name;
  showHospital.value = false;
};

// 日期选择确认处理
const dateOnConfirm = async (item) => {
  let time = currentDate.value.toString().replaceAll(",", "");
  let date = new Date(time.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
  from.starttime = date.getTime();
  showDate.value = false;
};

// 关闭支付二维码弹窗
const closeCode = async (item) => {
  showcode.value = false;
  router.push("/order");
};

// 提交订单处理
const sumbit = async () => {
  // 表单验证字段
  let arr = [
    "companion_id",
    "demand",
    "hospital_id",
    "hospital_name",
    "receiveAddress",
    "starttime",
    "tel",
  ];
  for (const i of arr) {
    if (!from[i]) {
      showNotify({ message: "请把每一项都填写" });
      return;
    }
  }

  // 提交订单
  let res = await proxy.$api.createOrder(from);
  // 生成支付二维码
  QRCode.toDataURL(res.wx_code).then((url) => {//qrcode插件，把后端返回的url编码成支付二维码
    code.value = url;
    showcode.value = true;
  });
};

// 组件挂载时获取数据
onMounted(() => {
  getCreateInfo();
});
</script>

<style lang="less" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
}

.header {
  padding: 10px 0;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  
  .header-left {
    float: left;
  }
}

.cell {
  width: 95%;
  margin: 5px auto;
  background-color: #fff;
  
  ::v-deep(.van-field__control) {
    color: var(--van-cell-value-color);
  }
}

.service-text {
  background: url(data:image/png;base64编码)
    no-repeat center center;
  background-size: 20px;
}

.sumbit {
  position: absolute;
  bottom: 0;
}

::v-deep(.van-dialog__content) {
  text-align: center;
  padding: 20px;
  
  .close {
    position: absolute;
    left: 20px;
  }
}
</style>