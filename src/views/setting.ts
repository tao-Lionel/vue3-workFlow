/** 流程名称 */
interface WorkFlowDef {
  name: string; // 流程名称
}

/** 操作人 */
interface NodeUserList {
  targetId: number;
  type: number;
  name: string; // 操作人姓名
}

/** 条件 */
interface ConditionList {
  columnId: number; //发起人id
  type: number; //1 发起人 2其他
  optType: number; //["", "<", ">", "≤", "=", "≥"][optType]
  zdy1: string; //左侧自定义内容
  zdy2: string; //右侧自定义内容
  opt1: string; //左侧符号 < ≤
  opt2: string; //右侧符号 < ≤
  columnDbName: string; //条件字段名称
  columnType: string; //条件字段类型
  showType: number; //3多选 其他
  showName: string; //展示名
  fixedDownBoxValue: ""; //多选数组
}

/**条件节点 */
interface ConditionNodes {
  nodeName: string; //节点名称
  type: number; // 0 发起人 1审批 2抄送 3条件 4路由
  priorityLevel: number; // 条件优先级
  setApproverType: number; // 审批人设置 1指定成员 2主管 4发起人自选 5发起人自己 7连续多级主管
  selectMode: number; //审批人数 1选一个人 2选多个人
  selectRange: number; //选择范围 1.全公司 2指定成员 2指定角色
  directorLevel: number; //审批终点  最高层主管数
  examineMode: number; //多人审批时采用的审批方式 1依次审批 2会签
  noHandlerAction: number; //审批人为空时 1自动审批通过/不允许发起 2转交给审核管理员
  examineEndDirectorLevel: number; //审批终点 第n层主管
  ccSelfSelectFlag: number; //允许发起人自选抄送人
  conditionList: Array<ConditionList>;
  nodeUserList: Array<NodeUserList>; //操作人
  childNode?: approverChildNode | CcChildNode;
  error: boolean;
}

/** 抄送节点 */
interface CcChildNode {
  nodeName: string; // 节点名称
  type: number; //  0 发起人 1审批 2抄送 3条件 4路由
  ccSelfSelectFlag: number; //允许发起人自选抄送人
  nodeUserList: Array<NodeUserList>; //操作人
  error: boolean; //当前审批是否通过校验
  childNode?: approverChildNode | CcChildNode;
  conditionNodes?: Array<ConditionNodes>;
}

/** 审批节点 */
interface approverChildNode {
  nodeName: string; // 节点名称
  error: boolean; //当前审批是否通过校验
  type: number; //  0 发起人 1审批 2抄送 3条件 4路由
  setApproverType: number;
  selectMode: number; //审批人数 1选一个人 2选多个人
  selectRange: number; //选择范围 1.全公司 2指定成员 2指定角色
  directorLevel: number; //审批终点  最高层主管数
  examineMode: number; // 多人审批时采用的审批方式 1依次审批 2会签
  noHandlerAction: number; //审批人为空时 1自动审批通过/不允许发起 2转交给审核管理员
  examineEndDirectorLevel: number; //审批终点 第n层主管
  childNode?: approverChildNode | CcChildNode;
  conditionNodes?: Array<ConditionNodes>;
}

/** 整个流程的节点信息 */
interface NodeConfig {
  nodeName: string; //节点名称
  type: number; // 0 发起人 1审批 2抄送 3条件 4路由
  priorityLevel: number; // 条件优先级
  setApproverType: number; // 审批人设置 1指定成员 2主管 4发起人自选 5发起人自己 7连续多级主管
  selectMode: number; //审批人数 1选一个人 2选多个人
  selectRange: number; //选择范围 1.全公司 2指定成员 2指定角色
  directorLevel: number; //审批终点  最高层主管数
  examineMode: number; //多人审批时采用的审批方式 1依次审批 2会签
  noHandlerAction: number; //审批人为空时 1自动审批通过/不允许发起 2转交给审核管理员
  examineEndDirectorLevel: number; //审批终点 第n层主管
  ccSelfSelectFlag: number; //允许发起人自选抄送人
  conditionList: Array<ConditionList>; //当审批单同时满足以下条件时进入此流程
  nodeUserList: Array<NodeUserList>; //操作人
  childNode?: approverChildNode | CcChildNode;
  conditionNodes: Array<ConditionNodes>;
  error: boolean;
}

/** 流程 */
interface Data {
  tableId: number; // 审批id
  directorMaxLevel: number; //审批主管最大层级
  flowPermission: Array<any>; //发起人
  workFlowDef: WorkFlowDef;
  nodeConfig: NodeConfig;
}

const data: Data = {
  tableId: 0, //审批id
  workFlowDef: {
    name: "", //审批名称
  },
  directorMaxLevel: 0, //审批主管最大层级
  flowPermission: [], //发起人
  nodeConfig: {
    nodeName: "", //节点名称
    type: 0, // 0 发起人 1审批 2抄送 3条件 4路由
    priorityLevel: 0, // 条件优先级
    setApproverType: 0, // 审批人设置 1指定成员 2主管 4发起人自选 5发起人自己 7连续多级主管
    selectMode: 0, //审批人数 1选一个人 2选多个人
    selectRange: 0, //选择范围 1.全公司 2指定成员 2指定角色
    directorLevel: 0, //审批终点  最高层主管数
    examineMode: 0, //多人审批时采用的审批方式 1依次审批 2会签
    noHandlerAction: 0, //审批人为空时 1自动审批通过/不允许发起 2转交给审核管理员
    examineEndDirectorLevel: 0, //审批终点 第n层主管
    ccSelfSelectFlag: 0, //允许发起人自选抄送人
    conditionList: [], // 当审批单同时满足以下条件时进入此流程
    nodeUserList: [], //操作人
    childNode: {
      nodeName: "",
      error: false, //当前审批是否通过校验
      type: 0,
      setApproverType: 0,
      selectMode: 0,
      selectRange: 0,
      directorLevel: 0,
      examineMode: 0,
      noHandlerAction: 0,
      examineEndDirectorLevel: 0,
    },
  },
};

export { data };
export type { Data, NodeConfig };
