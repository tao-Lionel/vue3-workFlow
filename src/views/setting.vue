<!--
 * @Author: Wt
 * @Date: 2022-07-28 11:41:00
 * @Description: 
 * 
-->
<template>
  <div class="process">
    <div class="process-nav">
      <span class="c-theme">xx</span>
      <a-button type="">发布</a-button>
    </div>
    <div class="process-main">
      <NodeWrap></NodeWrap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";

onMounted(() => {});


</script>

<style scoped lang="scss">
@import "../css/workflow.scss";
</style>
