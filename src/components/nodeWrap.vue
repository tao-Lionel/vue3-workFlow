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
import { onMounted, ref } from "vue";
import { setApproverStr } from "@/plugins/utils";
onMounted(() => {
  // 如果是审批
  //   console.log(nodeConfig);
  //   if (nodeConfig.value.type === 1) {
  //     console.log(setApproverStr(nodeConfig));
  //     nodeConfig.value.error = !setApproverStr(nodeConfig);
  //   }
});

const props = defineProps(["nodeConfigData"]);

defineEmits(["update:nodeConfigData"]);

console.log(props);

console.log(props.nodeConfigData);

const nodeConfig = ref(props.nodeConfigData);
console.log(nodeConfig);

// const flowPermission = ref(props.flowPermissionData);
</script>

<style scoped lang="scss">
@import "../css/workflow.scss";
</style>
