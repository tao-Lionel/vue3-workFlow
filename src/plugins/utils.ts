import { NodeConfig } from "@/views/setting";

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
