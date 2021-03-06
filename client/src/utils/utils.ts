// 复制普通对象
export function deepCopy (obj: Object) {
    return JSON.parse(JSON.stringify(obj))
}

// 交换数组元素位置
export function exchange (arr: Array<any>, index1: number, index2: number) {
    let temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}