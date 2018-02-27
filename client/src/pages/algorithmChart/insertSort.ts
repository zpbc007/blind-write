import { deepCopy } from '@utils/utils'

// 插入排序
export default function* insertSort (
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
    sortedIndex.push(0)
    unsortedInedx.splice(unsortedInedx.indexOf(0), 1)
    // 开始排序
    for (let i = 1, len = data.length; i < len; i++) {
        // 当前指针
        currentIndex = [i]
        yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
        for (let j = i; j > 0 && data[j] < data[j - 1]; j--) {
            operateIndex = [j - 1, j]
            yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
            exchangePosition(data, j, j - 1)
            yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
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