<template>
  <div class="node-wrap" v-if="nodeConfig.type !== 4">
    <div class="node-wrap-box">
      <!-- 节点标题 -->
      <div class="title">
        <UserOutlined v-show="nodeConfig.type === 1" />
        <SendOutlined v-show="nodeConfig.type === 2" />
        <span v-show="nodeConfig.type === 0">{{ nodeConfig.nodeName }}</span>
        <input
          type="text"
          class="ant-input editable-title-input"
          v-if="nodeConfig.type !== 0 && isInput"
          @blur="blurEvent()"
          @focus="focusEvent"
          v-focus
          v-model="nodeConfig.nodeName"
          :placeholder="placeholderList[nodeConfig.type]"
        />
      </div>
      <!-- 节点内容 -->
      <div class="content">
        <!-- 发起人 -->
        <div class="text" v-if="nodeConfig.type === 0">{{ arrToStr(flowPermission) ? arrToStr(flowPermission) : "所有人" }}</div>

        <!-- 审核人 -->
        <div class="text" v-if="nodeConfig.type === 1">
          <span class="placeholder" v-if="!setApproverStr(nodeConfig)"> 请选择{{ placeholderList[nodeConfig.type] }}</span>
          <span>{{ setApproverStr(nodeConfig) }}</span>
        </div>

        <!-- 抄送人 -->
        <div class="text" v-if="nodeConfig.type === 2">
          <span class="placeholder" v-if="!copyStr(nodeConfig)">请选择{{ placeholderList[nodeConfig.type] }}</span>
          <span>{{ copyStr(nodeConfig) }}</span>
        </div>
        <i class="anticon anticon-right arrow"></i>
      </div>
      <!-- 校验提示 -->
      <div class="error-tip"></div>
    </div>
  </div>
  <!-- // TODO -->
  <nodeWrap v-if="nodeConfig.childNode" v-model:nodeConfigData="nodeConfig.childNode"></nodeWrap>
</template>

<script setup lang="ts">
import { UserOutlined, SendOutlined } from "@ant-design/icons-vue";
import { onMounted, ref, onBeforeMount, watch, Ref, nextTick } from "vue";
import { setApproverStr, copyStr, conditionStr, arrToStr } from "@/plugins/utils";
import { NodeConfig } from "@/views/setting";

const props = defineProps({
  nodeConfigData: {
    type: Object,
    required: true,
  },
  flowPermissionData: {
    type: Object,
    required: true,
  },
});

defineEmits(["update:nodeConfigData", "update:flowPermissionData"]);

onMounted(() => {
  intiData();
});

const placeholderList = ref(["发起人", "审核人", "抄送人"]);
let isInput = ref(false);

function intiData() {
  console.log(nodeConfig.value);
  // 0 发起人 1审批 2抄送 3条件 4路由
  if (nodeConfig.value.type === 1) {
    console.log(setApproverStr(nodeConfig.value));
    nodeConfig.value.error = !setApproverStr(nodeConfig.value);
  } else if (nodeConfig.value.type === 2) {
    nodeConfig.value.error = !copyStr(nodeConfig.value);
  } else if (nodeConfig.value.type === 4) {
    for (let i = 0; i < nodeConfig.value.conditionNodes.length; i++) {
      nodeConfig.value.conditionNodes[i].error = conditionStr(nodeConfig.value, i) === "请设置条件" && i !== nodeConfig.conditionNodes.length - 1;
    }
  }
}

// 失去焦点触发
function blurEvent(index?: number) {
  if (index || index === 0) {
  }
}

// 获取焦点触发
function focusEvent(event: Event) {
  console.log(event);

  event.currentTarget.select();
}

watch(
  () => props.nodeConfigData,
  val => {
    nodeConfig.value = val;
    intiData();
  }
);

watch(
  () => props.flowPermissionData,
  val => {
    // console.log(val);
    flowPermission.value = val;
  }
);

const nodeConfig = ref(props.nodeConfigData) as Ref<NodeConfig>;

const flowPermission = ref(props.flowPermissionData);
</script>

<style scoped lang="scss">
@import "../css/workflow.scss";
</style>
