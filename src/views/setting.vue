<template>
  <div class="process">
    <div class="process-nav">
      <span class="c-white">{{ processName }}</span>
      <a-button type="primary" @click="issue">发布</a-button>
    </div>

    <div class="zoom">
      <div :class="'zoom-out' + (nowSize === 50 ? ' disabled' : '')" @click="zoomSize(1)">-</div>
      <span>{{ nowSize }}%</span>
      <div :class="'zoom-in' + (nowSize === 300 ? ' disabled' : '')" @click="zoomSize(2)">+</div>
    </div>

    <div
      :key="divKey"
      class="box-scale"
      :style="'transform: scale(' + nowSize / 100 + '); transform-origin: 50% 0px 0px;'"
    >
      <nodeWrap :key="allNodeConfig.nodeConfig" v-model:node-config="allNodeConfig.nodeConfig"></nodeWrap>
      <div class="end-node">
        <div class="end-node-circle"></div>
        <div class="end-node-text">流程结束</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount, ref, Ref, reactive } from "vue";
import http from "@/plugins/axios";
import { getFlowDefaultData } from "./setting";
import { useStore } from "vuex";

onBeforeMount(async () => {
  // 获取数据
  // await http.get(`${process.env.BASE_URL}data.json`, {}).then(({ data }: { data: Data }) => {
  let designObject = getFlowDefaultData();

  allNodeConfig.value = designObject;
  // });
});

const allNodeConfig = ref<FlowType>({});

const divKey = ref(new Date().getTime());
const nowSize = ref(100);

// 缩放流程图
function zoomSize(type: 1 | 2) {
  divKey.value = new Date().getTime();
  if (type === 1) {
    if (nowSize.value === 50) return;
    nowSize.value -= 10;
  } else {
    if (nowSize.value === 300) return;
    nowSize.value += 10;
  }
}

// 保存
function issue() {}
</script>

<style scoped lang="scss">
@import "../css/workflow.scss";
</style>
