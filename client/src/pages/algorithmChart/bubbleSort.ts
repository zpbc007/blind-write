import { deepCopy } from '@utils/utils'

export default function* BubbleSort (
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
    for (let i = data.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            // 当前指针
            currentIndex = [j]
            yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
            if (data[j] > data[j + 1]) {
                // 需要操作的指针
                operateIndex = [j, j + 1]
                yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
                // 交换位置
                exchangePosition(data, j, j + 1)
                yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
            }
            // 操作完毕
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