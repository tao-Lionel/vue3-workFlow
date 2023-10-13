<template>
  <div>
    <!-- 发起人节点 -->
    <div v-if="nowNodeConfig.type === FlowNodeObject.Launch" class="node-wrap">
      <div style="background: #c7c3c3; padding: 5px 15px; color: white; border-radius: 10px">发起</div>
      <addNode v-model:child-node-p="nowNodeConfig.childNode"></addNode>
    </div>

    <!-- 执行人节点 -->
    <div v-if="nowNodeConfig.type === FlowNodeObject.Action" class="node-wrap">
      <div class="node-wrap-box">
        <div class="title" :style="'background: ' + nodeConfigEnum[nowNodeConfig.type].color + ';'">
          <div style="display: flex; justify-content: space-between; width: 100%">
            <img
              src="https://staticcdn.youliao.com/static/image/cloud_pc/icon/flow-approval.png"
              style="width: 20px; height: 20px"
            />
            发起人
          </div>
        </div>
        <div class="content">
          {{ getNodeContentTip(nowNodeConfig, { manageList, roleList, isCustom }) }}
        </div>
      </div>
      <addNode :key="nowNodeConfig.childNode" v-model:child-node="nowNodeConfig.childNode"></addNode>
    </div>

    <!-- 审批节点 |  抄送节点 | 处理人节点-->
    <div
      v-if="[FlowNodeObject.Approval, FlowNodeObject.Copy, FlowNodeObject.Handle].includes(nowNodeConfig.type)"
      class="node-wrap"
    >
      <div class="node-wrap-box">
        <div>
          <div class="title" :style="'background: ' + nodeConfigEnum[nowNodeConfig.type].color + ';'">
            <!-- 展示状态 -->
            <template v-if="!isInput">
              <div style="display: flex; justify-content: space-between; width: 100%">
                <div>
                  <img
                    v-if="nodeConfig.type === FlowNodeObject.Approval"
                    src="https://staticcdn.youliao.com//static/image/cloud_pc/icon/flow-approval.png"
                    style="width: 20px; height: 20px"
                  />
                  <img
                    v-else
                    src="https://staticcdn.youliao.com//static/image/cloud_pc/icon/flow-copy.png"
                    style="width: 20px; height: 20px"
                  />
                  <span @click="() => clickEvent()"> {{ nodeConfig.nodeName }}</span>
                </div>
                <img
                  src="https://staticcdn.youliao.com//static/image/cloud_pc/icon/delete-white.png"
                  style="width: 20px; height: 20px"
                  @click="delNode()"
                />
              </div>
            </template>
            <template v-else>
              <input
                v-model="nodeName"
                type="text"
                class="flow-input"
                :placeholder="`请输入` + nodeConfigEnum[nowNodeConfig.type].name"
                @blur="blurEvent(index)"
              />
            </template>
          </div>
          <div class="content">
            <div
              @click="
                () =>
                  openDetail(getDrawer(nowNodeConfig), {
                    nodeConfig: nowNodeConfig
                  })
              "
            >
              {{ getNodeContentTip(nowNodeConfig, { manageList, roleList, isCustom }) }}
            </div>
          </div>
        </div>
      </div>
      <addNode :key="nowNodeConfig.childNode" v-model:child-node="nowNodeConfig.childNode"></addNode>
    </div>

    <!-- 条件节点 -->
    <div class="branch-wrap" v-if="nowNodeConfig.type === FlowNodeObject.Gateway">
      <div class="branch-box-wrap">
        <div class="branch-box">
          <button class="add-branch" @click="addConditionBranch()">添加条件</button>
          <div v-for="(item, index) in nowNodeConfig.conditionList" :key="index" class="col-box">
            <div class="condition-node">
              <div class="condition-node-box">
                <div class="node-wrap-box" :class="{ conditionRule: item.fields.conditionRule === '' }">
                  <div>
                    <div class="title" :style="'background: ' + nodeConfigEnum[nowNodeConfig.type].color + ';'">
                      <!-- 展示状态 -->
                      <template v-if="!isInputList.includes(index)">
                        <div style="display: flex; justify-content: space-between; width: 100%">
                          <div>
                            <span v-show="!item.isOther" @click="() => clickConditionEvent(index)">
                              {{ item.nodeName }}
                            </span>
                            <span v-show="item.isOther"> {{ item.nodeName }}</span>
                          </div>

                          <img
                            v-if="!item.isOther"
                            src="https://staticcdn.youliao.com//static/image/cloud_pc/icon/delete-white.png"
                            style="width: 20px; height: 20px"
                            @click="delConditionBranch(index)"
                          />
                        </div>
                      </template>

                      <!-- 可编辑状态 -->
                      <template v-else>
                        <input
                          v-model="item.nodeName"
                          type="text"
                          class="flow-input"
                          :placeholder="`请输入` + nodeConfigEnum[nowNodeConfig.type].name"
                          @blur="blurConditionEvent(index)"
                        />
                      </template>
                    </div>
                    <div class="content" @click="() => openDetail(getDrawer(nowNodeConfig), { nodeConfig: item })">
                      <span v-if="item.fields.conditionRule !== '' && !item.isOther">
                        {{ JSON.parse(item.fields.conditionRuleJson)[2] }}
                      </span>
                      <span v-else-if="item.isOther">其他情况进入此流程</span>
                      <span v-else class="c-danger">未设置条件</span>
                    </div>
                  </div>
                </div>
                <addNode :key="item.childNode" v-model:child-node="item.childNode"></addNode>
              </div>
            </div>
            <nodeWrap v-if="item.childNode" :key="item.childNode" v-model:node-config="item.childNode"></nodeWrap>
            <div v-if="index == 0" class="top-left-cover-line"></div>
            <div v-if="index == 0" class="bottom-left-cover-line"></div>
            <div v-if="index == nowNodeConfig.conditionList.length - 1" class="top-right-cover-line"></div>
            <div v-if="index == nowNodeConfig.conditionList.length - 1" class="bottom-right-cover-line"></div>
          </div>
        </div>
        <addNode :key="nowNodeConfig.childNode" v-model:child-node="nowNodeConfig.childNode"></addNode>
      </div>
    </div>
  </div>

  <nodeWrap
    v-if="nowNodeConfig.childNode"
    :key="nowNodeConfig.childNode"
    v-model:node-config="nowNodeConfig.childNode"
  ></nodeWrap>

  {{ components.name }}
  <component :is="components.name" />
</template>

<script setup lang="ts">
import { UserOutlined, SendOutlined } from "@ant-design/icons-vue";
import { onMounted, ref, onBeforeMount, watch, Ref, nextTick, reactive } from "vue";
import { FlowNodeObject, nodeConfigEnum, getNodeContentTip, conditionBranchDefault } from "@/views/setting";
import addNode from "./addNode.vue";
import { deepClone, getRandomNumber } from "@/plugins/utils";
import CopyPersonDrawer from "./copyPersonDrawer.vue";
import ApprovalPersonDrawer from "./approvalPersonDrawer.vue";
import ConditionDrawer from "./conditionDrawer.vue";
import HandlePersonDrawer from "./handlePersonDrawer.vue";

const props = defineProps({
  nodeConfig: {
    type: Object as PropType<FlowNodeType>,
    required: true
  }
});

const emit = defineEmits(["update:nodeConfig"]);

onMounted(() => {});

const nowNodeConfig = ref(props.nodeConfig ? props.nodeConfig : {}) as FlowNodeType;
const nodeName = ref(props.nodeConfig ? props.nodeConfig.nodeName : "");
const isInput = ref(false); //当前节点是否可编辑

//打开input编辑模式
const clickEvent = (index?: number) => {
  isInput.value = true;
};

//关闭input编辑模式
const blurEvent = (index?: number) => {
  if (nodeName.value) {
    nowNodeConfig.value.nodeName = nodeName.value;
  }
  isInput.value = false;
};

// 删除当前节点
const delNode = (index?: number) => {
  emit("update:nodeConfig", nowNodeConfig.value.childNode);
};

// 添加条件分支
const addConditionBranch = () => {
  console.log("点击添加条件按钮", nowNodeConfig.value);
  if (nowNodeConfig.value.conditionList.length > 5) {
    message.warning("最多添加5个条件");
    return false;
  }
  let len = nowNodeConfig.value.conditionList.length + 1;
  const _conditionBranchDefault = deepClone(conditionBranchDefault);
  _conditionBranchDefault.id = "Condition_" + getRandomNumber();
  _conditionBranchDefault.nodeName = `${_conditionBranchDefault.nodeName}${len - 1}-优先级${len - 1}`;
  // _conditionBranchDefault.sort = len - 1
  nowNodeConfig.value.conditionList.splice(len - 2, 0, _conditionBranchDefault);
};

// 删除条件分支
const delConditionBranch = (index: number) => {
  console.log("删除分支", nowNodeConfig.value);

  nowNodeConfig.value.conditionList.splice(index, 1);
  nowNodeConfig.value.conditionList.map((item: FlowConditionItemType, index: number) => {
    if (!item.isOther) {
      item.nodeName = `条件${index + 1}-优先级${index + 1}`;
      // item.sort = index + 1
    }
  });
  emit("update:nodeConfig", nowNodeConfig.value);
  if (nowNodeConfig.value.conditionList.length === 1) {
    if (nowNodeConfig.value.childNode) {
      if (nowNodeConfig.value.conditionList[0].childNode) {
        reData(nowNodeConfig.value.conditionList[0].childNode, nowNodeConfig.value.childNode);
      } else {
        nowNodeConfig.value.conditionList[0].childNode = nowNodeConfig.value.childNode;
      }
    }
    emit("update:nodeConfig", nowNodeConfig.value.conditionList[0].childNode);
  }
};

// 找出最后的元素
const reData = (data: FlowNodeType, addData: FlowNodeType) => {
  if (!data.childNode) {
    data.childNode = addData;
  } else {
    reData(data.childNode, addData);
  }
};

const isInputList = ref([]);

// 打开条件的input编辑模式
const clickConditionEvent = (index: number) => {
  isInputList.value.push(index);
};

//关闭条件的input编辑模式
const blurConditionEvent = (index?: number) => {
  const isInputListIndex = isInputList.value.indexOf(index);
  isInputList.value.splice(isInputListIndex, 1);
};

// 获取需要打开的抽屉
const getDrawer = (nowNodeConfig: FlowNodeType): string => {
  switch (nowNodeConfig.type) {
    case FlowNodeObject.Approval:
      return "ApprovalPersonDrawer";
    case FlowNodeObject.Copy:
      return "CopyPersonDrawer";
    case FlowNodeObject.Handle:
      return "HandlePersonDrawer";
    case FlowNodeObject.Gateway:
      return "ConditionDrawer";
  }
};

const components = reactive({
  name: "",
  params: {}
});

// 打开抽屉
const openDetail = (componentName: string, obj: object) => {
  console.log(`componentName==`, componentName, obj);
  Object.assign(components, { name: componentName, params: obj });
};
</script>

<style scoped lang="scss">
@import "../css/workflow.scss";
</style>
