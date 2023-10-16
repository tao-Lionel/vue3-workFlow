<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <a-popover title="新增节点" trigger="hover" placement="right">
        <template #content>
          <div class="add-node-popover-body">
            <a class="add-node-popover-item approver" @click="addNode(FlowNodeObject.Approval)">
              <div class="item-wrapper">
                <img
                  src="https://staticcdn.youliao.com//static/image/cloud_pc/icon/flow-approval.png"
                  style="width: 30px; height: 30px"
                />
              </div>
              <p>审批人</p>
            </a>
            <a class="add-node-popover-item notifier" @click="addNode(FlowNodeObject.Copy)">
              <div class="item-wrapper">
                <img
                  src="https://staticcdn.youliao.com//static/image/cloud_pc/icon/flow-copy.png"
                  style="width: 30px; height: 30px"
                />
              </div>
              <p>抄送人</p>
            </a>

            <a class="add-node-popover-item condition" @click="addNode(FlowNodeObject.Gateway)">
              <div class="item-wrapper">
                <img
                  src="https://staticcdn.youliao.com//static/image/cloud_pc/icon/flow-condition.png"
                  style="width: 30px; height: 30px"
                />
              </div>
              <p>条件分支</p>
            </a>

            <a class="add-node-popover-item handle" @click="addNode(FlowNodeObject.Handle)">
              <div class="item-wrapper">
                <img
                  src="https://staticcdn.youliao.com//static/image/cloud_pc/icon/flow-handle.png"
                  style="width: 30px; height: 30px"
                />
              </div>
              <p>处理人</p>
            </a>
          </div>
        </template>
        <img
          src="https://staticcdn.youliao.com//static/image/cloud_pc/icon/add.png"
          style="width: 30px; height: 30px"
        />
      </a-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, toRefs, PropType, inject } from "vue";
import { nodeConfigEnum, getNodeId, FlowNodeObject, setDefaultValue, getRoleList, getField } from "@/views/setting";
import { deepClone } from "@/plugins/utils";

const props = defineProps({
  childNode: {
    type: Object as PropType<FlowNodeType>,
    required: true
  }
});

const emit = defineEmits(["update:childNode"]);

// 添加节点
const addNode = (type: 1 | 2 | 3 | 5 | 6) => {
  let nowNode = { id: getNodeId(type), ...deepClone(nodeConfigEnum[type].defaultObj()) };
  const childNode = props.childNode ? props.childNode : undefined;

  console.log("添加节点有没有子节点", childNode);
  console.log("添加的节点", { ...nowNode, childNode });

  emit("update:childNode", {
    ...nowNode,
    childNode
  });
};
</script>

<style scoped lang="scss">
.add-node-btn-box {
  width: 240px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca;
  }
  .add-node-btn {
    user-select: none;
    width: 240px;
    padding: 15px 0 25px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    flex-grow: 1;
    .btn {
      outline: none;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      width: 30px;
      height: 30px;
      background: #3296fa;
      border-radius: 50%;
      position: relative;
      border: none;
      line-height: 30px;
      -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      .iconfont {
        color: #fff;
        font-size: 16px;
      }
      &:hover {
        transform: scale(1.3);
        box-shadow: 0 13px 27px 0 rgba(0, 0, 0, 0.1);
      }
      &:active {
        transform: none;
        background: #1e83e9;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.add-node-popover-body {
  display: flex;
  .add-node-popover-item {
    margin-right: 10px;
    cursor: pointer;
    text-align: center;
    flex: 1;
    color: #191f25 !important;
    .item-wrapper {
      user-select: none;
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-bottom: 5px;
      background: #fff;
      border: 1px solid #e2e2e2;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      .iconfont {
        font-size: 35px;
        line-height: 30px;
      }
    }
    &.approver {
      .item-wrapper {
        color: #ff943e;
      }
    }
    &.notifier {
      .item-wrapper {
        color: #3296fa;
      }
    }
    &.condition {
      margin-right: 0px;
      .item-wrapper {
        color: #15bc83;
      }
      p {
        white-space: nowrap;
      }
    }
    &.handle {
      margin-left: 10px;
      .item-wrapper {
        color: #15bc83;
      }
      p {
        white-space: nowrap;
      }
    }
    &:hover {
      .item-wrapper {
        background: #3296fa;
        box-shadow: 0 0px 5px 0 rgba(50, 150, 250, 0.4);
      }
      .iconfont {
        color: #fff;
      }
    }
    &:active {
      .item-wrapper {
        box-shadow: none;
        background: #eaeaea;
      }
      .iconfont {
        color: inherit;
      }
    }
  }
}
</style>
