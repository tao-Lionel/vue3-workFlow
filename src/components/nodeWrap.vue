<template>
  <div class="node-wrap">
    <div class="node-wrap-box">
      <!-- 节点标题 -->
      <div class="title">
        <UserOutlined />
        <SendOutlined />
        <span>{{}}</span>
        <!-- <a-input v-model:value="value" placeholder="请输入" /> -->
      </div>
      <!-- 节点内容 -->
      <div class="content">
        <div class="text">{{}}</div>
        <RightOutlined />
      </div>
      <!-- 校验提示 -->
      <div class="error-tip"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, SendOutlined } from "@ant-design/icons-vue";
import { onMounted, ref, onBeforeMount, watch, Ref } from "vue";
import { setApproverStr } from "@/plugins/utils";
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
  // 如果是审批
  console.log(nodeConfig);
  if (nodeConfig.value.type === 1) {
    console.log(setApproverStr(nodeConfig.value));
    nodeConfig.value.error = !setApproverStr(nodeConfig.value);
  }
});

watch(
  () => props.nodeConfigData,
  val => {
    console.log(val);
    nodeConfig.value = val;
  }
);

watch(
  () => props.flowPermissionData,
  val => {
    console.log(val);
    flowPermission.value = val;
  }
);

const nodeConfig = ref(props.nodeConfigData) as Ref<NodeConfig>;
const flowPermission = ref(props.flowPermissionData);
</script>

<style scoped lang="scss">
@import "../css/workflow.scss";
</style>
