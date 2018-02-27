import { deepCopy } from '@utils/utils'

// 选择排序
export default function* selectSort (
    // 待排序数据
    data: number[],
    exchangePosition: (arr: number[], i: number, j: number) => void
) {
    data = deepCopy(data)
    let sortedIndex: number[] = [],
        unsortedInedx: number[] = [],
        operateIndex: number[] = [],
        currentIndex: number[] = []

    // 初始化
    for (let i = 0, len = data.length; i < len; i++) {
        unsortedInedx.push(i)
    }
    // 初始化状态
    yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
    // 开始排序
    for (let i = 0, len = data.length; i < len; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            // 当前指针
            currentIndex = [j]
            yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
            if (data[j] < data[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            operateIndex = [i, minIndex]
            yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
            // 交换位置
            exchangePosition(data, i, minIndex)
            yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
            operateIndex = []
            
        }
        sortedIndex.push(i)
        unsortedInedx.splice(unsortedInedx.indexOf(i), 1)
    }
    sortedIndex = sortedIndex.concat(unsortedInedx)
    unsortedInedx = []
    operateIndex = []
    currentIndex = []
    yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
}       