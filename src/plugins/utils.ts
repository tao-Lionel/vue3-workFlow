import { NodeConfig } from "@/views/setting";

const conditionOptType = ["", "<", ">", "≤", "=", "≥"]; // 条件符号

export const setApproverStr = (node: NodeConfig) => {
  const { setApproverType, nodeUserList, examineMode, directorLevel, examineEndDirectorLevel, selectRange } = node;
  // 审批人设置 1指定成员 2主管 4发起人自选 5发起人自己 7连续多级主管
  if (setApproverType === 1) {
    if (nodeUserList.length === 1) {
      return nodeUserList[0].name;
    } else if (nodeUserList.length > 1) {
      // 多人审批时采用的审批方式 1依次审批 2会签
      if (examineMode === 1) {
        return nodeUserList?.map(item => item.name).toString();
      } else if (examineMode === 2) {
        return nodeUserList.length + "人会签";
      }
    }
  } else if (setApproverType === 2) {
    //审批终点  最高层主管数
    let level = directorLevel === 1 ? "直接主管" : `第${directorLevel}级主管`;
    if (examineMode === 1) {
      return level;
    } else if (examineMode === 2) {
      return level + "会签";
    }
  } else if (setApproverType === 4) {
    // 选择范围 1.全公司 2指定成员 2指定角色
    if (selectRange === 1) {
      return "发起人自选";
    } else if (nodeUserList.length > 0) {
      if (selectRange === 2) {
        return "发起人自选";
      } else {
        return `发起人从${nodeUserList[0].name}中自选`;
      }
    } else {
      return "";
    }
  } else if (setApproverType === 5) {
    return "发起人自选";
  } else if (setApproverType === 7) {
    return `从直接主管到通讯录中级别最高的第${examineEndDirectorLevel}个层级主管`;
  }
};

export const copyStr = (node: NodeConfig) => {
  if (node.nodeUserList.length) {
    return arrToStr(node.nodeUserList);
  } else if (node.ccSelfSelectFlag === 1) {
    return "发起人自选";
  }
};

export const conditionStr = (node: NodeConfig, index: number) => {
  let { conditionList, nodeUserList } = node.conditionNodes[index];
  if (conditionList.length === 0) {
    if (index === node.conditionNodes.length - 1 && node.conditionNodes[0].conditionList.length) {
      return "其他条件进入此流程";
    } else {
      return "请设置条件";
    }
  } else {
    let str = "";
    for (let i = 0; i < conditionList.length; i++) {
      let { columnId, columnType, showType, showName, optType, zdy1, opt1, zdy2, opt2, fixedDownBoxValue } = conditionList[i];
      if (!columnId) {
        if (nodeUserList.length) {
          str += "发起人属于：";
          str +=
            nodeUserList
              .map((item: any) => {
                return item.name;
              })
              .join("或") + "并且";
        }
      }
      if (columnType === "String" && showType === 3) {
        if (zdy1) {
          str += showName + "属于：" + dealStr(zdy1, JSON.parse(fixedDownBoxValue)) + "并且";
        }
      }
      if (columnType === "Double") {
        if (optType !== 6 && zdy1) {
          let opTypeStr = conditionOptType[optType];
          str += `${showName} ${optTypeStr} ${zdy1} 并且 `;
        } else if (optType === 6 && zdy1 && zdy2) {
          str += `${zdy1} ${opt1} ${showName} ${opt2} ${zdy2} 并且 `;
        }
      }
    }
    return str ? str.substring(0, str.length - 4) : "请设置条件";
  }
};

export const arrToStr = (arr: Array<any>) => {
  if (arr) {
    return arr.map((item: any) => item.name).toString();
  }
};

export const dealStr = (str: string, obj: Array<any>) => {
  let arr: Array<any> = [];
  let list = str.split(",");
  for (let key in obj) {
    list.map((item: any) => {
      if (item === key) {
        return arr.push(obj[key].value);
      }
    });
  }
  return arr.join("或");
};
