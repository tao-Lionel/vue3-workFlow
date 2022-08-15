<!--
 * @Author: Wt
 * @Date: 2022-07-28 11:41:00
 * @Description: 
 * 
-->
<template>
  <div class="process">
    <div class="process-nav">
      <span class="c-white">{{ processName }}</span>
      <a-button type="">发布</a-button>
    </div>
    <div class="process-main">
      {{ nodeConfigData }}
      <NodeWrap v-model:nodeConfigData="nodeConfigData" v-model:flowPermissionData="flowPermissionData"></NodeWrap>
      <div class="end-node">
        <div class="end-node-circle"></div>
        <div class="end-node-text">流程结束</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref, Ref } from "vue";
import http from "@/plugins/axios";
import { data, Data } from "./setting";
import { useStore } from "vuex";

onBeforeMount(async () => {
  // 获取数据
  await http.get(`${process.env.BASE_URL}data.json`, {}).then(({ data }: { data: Data }) => {
    const { workFlowDef, nodeConfig, flowPermission, directorMaxLevel, tableId } = data;
    processData.value = data;
    nodeConfigData.value = nodeConfig;
    flowPermissionData.value = flowPermission;
    directorMaxLevelData.value = directorMaxLevel;
    processName.value = workFlowDef.name;
    store.commit("setTableId", tableId);
  });
});

const store = useStore();

const processName = ref<string>(""); // 流程名称

const processData = ref<Data>(data); // 本地备份的流程数据

const nodeConfigData = ref({}); // 本地的流程节点

const flowPermissionData = ref<Array<any>>([]); // 本地的发起人

const directorMaxLevelData = ref(0); // 本地的审批主管最大层级
</script>

<style scoped lang="scss">
@import "../css/workflow.scss";
</style>
