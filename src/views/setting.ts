type ProcessDataType = {
    tableId?: number  //审批id
    workFlowDef?: String // 流程名称
    directorMaxLevel?: number //审批主管最大层级
    flowPermission?: Array<any> //发起人
}

export type { ProcessDataType }