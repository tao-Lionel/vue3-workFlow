/**
 * @description: 获取随机数
 * @param {*} num 几位随机数
 */
export const getRandomNumber = (num = 6): string => {
  let result = "";
  for (let i = 0; i < num; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

const isDef = (val: unknown) => {
  return val !== void 0 && val !== null;
};
const isObject = (val: unknown) => {
  return val !== null && typeof val === "object";
};

/**
 * @description: 通用深拷贝方法
 * @param {any} obj 需要拷贝的对象
 * @return {*}
 */
export const deepClone = (obj: any): any => {
  if (!isDef(obj)) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item: any) => deepClone(item));
  }
  if (isObject(obj)) {
    const to: Record<string, any> = {};
    Object.keys(obj).forEach((key: any) => {
      to[key] = deepClone(obj[key]);
    });
    return to;
  }
  return obj;
};
