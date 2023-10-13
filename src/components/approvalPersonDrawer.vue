<template>
  <a-drawer v-model:visible="true" title="审批人" width="50%" @close="savePromoter">
    <div class="personFoot">
      <x-button class="mr-10" @click="goBack">取消</x-button>
      <x-button type="primary" @click="sure">确认</x-button>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { defineComponent, ref, PropType, reactive, toRefs, inject, onMounted } from "vue";

console.log("1111111111111111111111111");

const props = defineProps({
  params: {
    type: Object as PropType<FlowNodeType>,
    default: () => {
      return {};
    }
  }
});

const emit = defineEmits(["componentOk", "componentCancel"]);

const savePromoter = () => {};
const goBack = () => {};
const sure = () => {};
</script>

<style scoped>
.personFoot {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
  z-index: 1;
}
</style>
