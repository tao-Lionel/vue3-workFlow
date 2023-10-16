import { getRandomNumber, deepClone } from "../plugins/utils";

// 发起人枚举
export const FlowNodeObject = {
  Launch: 0, // 发起
  Action: 1, // 发起人
  Approval: 2, // 审批
  Copy: 3, // 抄送
  Condition: 4, // 条件
  Gateway: 5, // 网关
  Handle: 6 // 处理人
};

const actionDefault: FlowNodeType = {
  id: "",
  type: 1,
  nodeName: "发起人",
  childNode: undefined,
  fields: {
    type: 0,
    users: "",
    roles: ""
  }
};

// 审批_默认对象
const approvalDefault: FlowNodeType = {
  id: "",
  type: 2,
  nodeName: "审批人",
  childNode: undefined,
  fields: {
    type: 0,
    users: "",
    roles: "",
    btnArr: [],
    againType: ""
  }
};

// 抄送_默认对象
const copyDefault: FlowNodeType = {
  id: "",
  type: 3,
  nodeName: "抄送人",
  childNode: undefined,
  fields: {
    type: 0,
    users: "",
    roles: ""
  }
};

// 条件分支_默认对象
export const conditionBranchDefault: FlowConditionItemType = {
  id: "",
  nodeName: "条件",
  type: 4,
  fields: {
    conditionRule: "",
    conditionRuleJson: ""
  },
  isOther: false,
  childNode: undefined
};

// 条件分支_其他情况
const conditionBranchOther: FlowConditionItemType = {
  id: "",
  nodeName: "其他情况",
  type: 4,
  fields: {
    conditionRule: "${true}",
    conditionRuleJson: "${true}"
  },
  isOther: true,
  childNode: undefined
};

// 条件_默认对象
const gatewayDefault: FlowNodeType = {
  id: "",
  type: 5,
  nodeName: "网关",
  childNode: undefined,
  conditionList: [],
  fields: {
    type: 0,
    users: "",
    roles: ""
  }
};

// 处理人_默认对象
const handleDefault: FlowNodeType = {
  id: "",
  type: 6,
  nodeName: "处理人",
  childNode: undefined,
  fields: {
    type: 0,
    users: "",
    roles: "",
    btnArr: [],
    againType: ""
  }
};

// 设置默认的条件分支
const setConditionDefault = (gatewayDefault: FlowNodeType) => {
  const _conditionBranchDefault = deepClone(conditionBranchDefault);
  _conditionBranchDefault.id = "Condition_" + getRandomNumber();
  _conditionBranchDefault.nodeName = `${_conditionBranchDefault.nodeName}1-优先级1`;
  const _conditionBranchOther = deepClone(conditionBranchOther);
  _conditionBranchOther.id = "Condition_" + getRandomNumber();
  const _conditionDefaultData = deepClone(gatewayDefault);
  _conditionDefaultData.conditionList.push(_conditionBranchDefault, _conditionBranchOther);
  return _conditionDefaultData;
};

export const nodeConfigEnum = {
  [FlowNodeObject.Launch]: {
    name: "发起",
    color: "#576a95",
    tag: "Launch"
  },
  [FlowNodeObject.Action]: {
    name: "发起人",
    color: "#d2d0d0",
    defaultObj: (): FlowNodeType => {
      return actionDefault;
    },
    tag: "Action"
  },
  [FlowNodeObject.Approval]: {
    name: "审批人",
    color: "#f5a938",
    defaultObj: (): FlowNodeType => {
      return approvalDefault;
    },
    tag: "Approval"
  },
  [FlowNodeObject.Copy]: {
    name: "抄送人",
    color: "#3296fa",
    defaultObj: (): FlowNodeType => {
      return copyDefault;
    },
    tag: "Copy"
  },
  [FlowNodeObject.Gateway]: {
    name: "网关",
    color: "#02A7F0",
    defaultObj: (): FlowNodeType => {
      return setConditionDefault(gatewayDefault);
    },
    tag: "Gateway"
  },
  [FlowNodeObject.Handle]: {
    name: "处理人",
    color: "#15bc83",
    defaultObj: (): FlowNodeType => {
      return handleDefault;
    },
    tag: "Handle"
  }
};

export const getLocalEnum = () => {
  const executorTypeEnum = [
    {
      key: 1,
      value: "指定成员"
    },
    {
      key: 2,
      value: "指定角色"
    },
    // {
    //   key: 3,
    //   value: "部门主管"
    // },
    {
      key: 4,
      value: "发起人本人"
    }
  ];

  const multiExamineTypeEnum = [
    // {
    //   key: 0,
    //   value: "会签（需所有审批人同意）"
    // },
    {
      key: 1,
      value: "或签（一名审批人同意即可）"
    }
    // {
    //   key: 2,
    //   value: "依次审批（按顺序依次审批）"
    // }
  ];

  const filterTypeEnum = [];

  return {
    executorTypeEnum,
    multiExamineTypeEnum
  };
};

// 获取流程节点Id
export const getNodeId = (type: number) => {
  if (type === 4) {
    return "Condition_" + getRandomNumber();
  }
  return nodeConfigEnum[type].tag + "_" + getRandomNumber();
};

//获取模板默认详情
export const getFlowDefaultData = () => {
  return {
    id: 1,
    flowName: "合同审批xxx",
    nodeConfig: {
      id: getNodeId(FlowNodeObject.Launch),
      nodeName: "发起人", // 节点名称
      type: FlowNodeObject.Launch,
      conditionList: [], //条件列表
      fields: {
        type: 4,
        users: "",
        roles: ""
      },
      multiApprovalType: 1, // 发起人审核方式： 1会签 2或签 3一次审批
      childNode: {
        id: getNodeId(FlowNodeObject.Action),
        nodeName: "发起人", // 节点名称
        type: FlowNodeObject.Action,
        conditionList: [], //条件列表
        fields: {
          type: 0,
          users: "",
          roles: ""
        },
        multiApprovalType: 1, // 发起人审核方式： 1会签 2或签 3一次审批
        childNode: {
          id: getNodeId(FlowNodeObject.Approval),
          nodeName: "审批人", // 节点名称
          type: FlowNodeObject.Approval,
          conditionList: [], //条件列表
          fields: {
            type: 0,
            users: "",
            roles: "",
            btnArr: [],
            againType: ""
          },
          multiApprovalType: 2, // 发起人审核方式： 1会签 2或签 3一次审批
          childNode: {
            id: getNodeId(FlowNodeObject.Copy),
            nodeName: "抄送人", // 节点名称
            type: FlowNodeObject.Copy,
            conditionList: [], //条件列表
            fields: {
              type: 0,
              users: "",
              roles: ""
            },
            multiApprovalType: 2, // 发起人审核方式： 1会签 2或签 3一次审批
            childNode: null
          }
        }
      }
    }
  } as FlowType;
};

// 订单跟进人
export const getNodeContentTip = (
  nodeConfig: FlowNodeType,
  { manageList, roleList, isCustom }: { manageList: any[]; roleList: any[]; isCustom: boolean } = {
    manageList: [],
    roleList: [],
    isCustom: false
  }
) => {
  if (nodeConfig.type === FlowNodeObject.Action) {
    return isCustom ? "发起人" : "订单跟进人";
  }
  // 0 未选择 1指定成员 2指定角色 3 部门主管 4发起人本人
  switch (nodeConfig.fields.type) {
    case 0:
      return `请选择${nodeConfigEnum[nodeConfig.type].name}`;
    case 1:
      return `已选择用户:`;
    case 2:
      return `已选择角色:`;
    case 3:
      return `已选择部门主管`;
    case 4:
      return `已选择发起人本人`;
  }
};
