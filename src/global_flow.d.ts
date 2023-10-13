// 前端定义的流程类型

// 单个条件列表对象
// declare interface FlowConditionItemType {
//   id: string //条件选择的Id
//   nodeName: string //条件选择的name
//   type: 0 | 1 | 2 //条件类型 0标识大于  1表示等于 2 表示小于
//   referKey: string //对比的条件选择的key
//   referName: string //对比的条件选择的name
//   isOther?: boolean // 其他情况的标识 true
//   childNode?: FlowNodeType | undefined //流程的下一个节点
// }
declare interface FlowConditionItemType {
  id: string //条件选择的Id
  nodeName: string //条件选择的name
  readonly type: 4 //  节点类型 4.条件
  fields: FieldsConditionObject
  isOther?: boolean // 其他情况的标识
  childNode?: FlowNodeType | undefined //流程的下一个节点
  gateWayId?: string //记录父级别的id
}

// 条件规则
declare type FieldsConditionObject = {
  conditionRule: string
  conditionRuleJson: string
}

declare type FieldsGeneralObject = {
  type: 0 | 1 | 2 | 3 | 4 //  执行人类型，0 未选择 1指定成员 2指定角色 3 部门主管 4发起人本人
  users: string //选择用户列表
  roles: string //选择角色列表
}

// 节点名称类型
declare interface FlowNodeType {
  id: string // 节点Id
  nodeName: string // 节点名称
  readonly type: 0 | 1 | 2 | 3 | 4 | 5 | 6 //  节点类型：0开始  1执行，2审批，3抄送，4条件  5网关 6处理人
  conditionList?: FlowConditionItemType[] //条件列表
  // executorType?:
  // executorIds?: number[] // 执行人id
  multiApprovalType?: 0 | 1 | 2 // 多人审核方式： 1会签 2或签 3一次审批
  // roleIds?: number[] //角色Id
  fields: FieldsObject
  departmentFilter?: number //部门过滤方式：1所有部门 2跳过无主管的部门  3找不到
  childNode?: FlowNodeType | undefined //子节点
}

// 完整的流程对象
declare interface FlowType {
  id: number //流程id
  flowType?: number // 流程类型，当前只有低价审批
  flowName: string //流程名称
  conditionList?: FlowConditionItemType[] //条件列表
  nodeConfig: FlowNodeType //流程节点
}

// 前端定义条件对象
declare type FieldsConditionObject = {
  start: string //开始条件
  judge: string //选择
  judgeName?: string // 选择符号的唯一标识
  end: string //结束条件
}

// 后端定义的流程类型（global_flow类型转换给后端）

// 转换节点内容
declare type FlowFormatNodeType = {
  id?: string // 节点Id
  nodeName: string //节点名称
  // readonly type: number //  节点类型，0.发起人 1.执行  2.审批  3.抄送  4.条件  5.网关
  // readonly type: number //  节点类型，0发起人 1执行  2审批 3抄送  4.条件
  conditionList?: FlowConditionItemType[] //条件列表
  taskType: 0 | 1 | 2 | 3 | 4 | 5 // 0开始  1执行，2审批，3抄送，4条件  5网关
  fields: FieldsObject | FieldsConditionObject
  flowId: string //流程Id
  childrenId: string
  previousId?: string //上一个节点的id
  previousConditionId?: string //上一个节点的分支id
  // sourceRef: string // 来源对象
  // targetRef?: string // 目标对象
  incoming?: string // 指向该节点的连接线集合
  outgoing?: string //指出该节点的连接线集合
}

// 后端定义UserTask对象
declare type FlowFormatUserTask = {
  id: string //对象Id
  name: string //执行节点名称
  "bpmn:incoming": string // 指向该节点的连接线集合
  "bpmn:outgoing": string // //指出该节点的连接线集合
  taskType: 0 | 1 | 2 | 3 | 4 | 5 // 1执行，2审批，3抄送
  fields: FieldsObject | FieldsConditionObject // 选择对象/前置条件el条件
}

// 后端定义SequenceFlow对象
declare type FlowFormatSequenceFlow = {
  id?: string //流程id
  targetRef: string //目标对象
  sourceRef: string //源对象
  sourceGatewayId?: string
  fields?: FieldsObject | FieldsConditionObject // 选择对象/前置条件el条件
}

// 后端定义FlowStartEvent对象
declare type FlowStartEvent = {
  id: string //流程id
  name: string //目标对象
  "bpmn:outgoing": string // //指出该节点的连接线集合
}

// 后端定义FlowEndEvent对象
declare type FlowEndEvent = {
  id: string //流程id
  name: string //目标对象
  "bpmn:incoming": string // //指出该节点的连接线集合
}

// 额外的传递参数
declare type FlowExtraObject = {
  sourceGatewayId?: string
}

// 1 低价审批、2 自定义流程、3回款审批
declare type FlowTypeType = 1 | 2 | 3
