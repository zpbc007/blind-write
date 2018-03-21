/**
 * 原地归并排序
 * @param arr 待排序数组
 */
function MergeSort(arr: number[]) {
    splitArr(arr, 0, arr.length - 1)
}

/**
 * 分割数组
 * @param arr 待分割数组
 * @param lo 要分割的起点
 * @param hi 要分割的终点
 */
function splitArr(arr: number[], lo: number, hi: number) {
    if (lo < hi) {
        let mid = Math.floor((lo + hi) / 2)
        splitArr(arr, lo, mid)
        splitArr(arr, mid + 1, hi)
        mergeArr(arr, lo, mid, hi)
    }
}

/**
 * 合并有序的两个数组
 * @param arr 待合并的数组
 * @param lo 起点
 * @param mid 中点
 * @param hi 终点
 */
function mergeArr(arr: number[], lo: number, mid: number, hi: number) {
    let i = lo, j = hi, temp = []

    // 复制数组
    for (let k = lo; k <= hi; k++) {
        temp[k] = arr[k]
    }

    for (let k = lo; k <= hi; k++) {
        if (i > mid) {
            arr[k] = temp[j++]
        } else if (j > hi) {
            arr[k] = temp[i++]
        } else if (arr[j] < arr[i]) {
            arr[k] = temp[j++]
        } else {
            arr[k] = temp[i++]
        }
    }
}