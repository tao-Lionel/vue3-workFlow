<!--
 * @Author: Wt
 * @Date: 2022-07-28 11:41:00
 * @Description: 
 * 
-->
<template>
  <div class="process">
    <div class="process-nav">
      <span class="c-theme">{{ processName }}</span>
      <a-button type="">发布</a-button>
    </div>
    <div class="process-main">
      <NodeWrap></NodeWrap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import http from "@/plugins/axios";
import { ProcessDataType } from "./setting";

onMounted(() => {
  http.get(`${process.env.BASE_URL}data.json`, {}).then(({ data }) => {
    processData.value = data;
    const { workFlowDef } = processData as ProcessDataType;
    processName.value as string = workFlowDef;
  });

  // 流程名称
  const processName = ref<string>("");

  // 本地备份的流程数据
  const processData = ref<ProcessDataType>({});

  const test = ref()
});
</script>

<style scoped lang="scss">
@import "../css/workflow.scss";
</style>
