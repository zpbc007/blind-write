import { deepCopy } from '@utils/utils'

// 希尔排序
export default function* shellSort (
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

    const N = data.length
    let h = 1
    while (h < Math.floor(N / 3)) {
        h = 3 * h + 1
    }
    // 开始排序
    while (h >= 1) {
        for (let i = h; i < N; i++) {
            currentIndex = [i]
            yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
            for (let j = i; j >= h && data[j] < data[j - h]; j -= h) {
                operateIndex = [j - h, j]
                yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
                exchangePosition(data, j, j - h)
                yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
                operateIndex = []
            }
            if (h === 1) {
                sortedIndex.push(i)
                unsortedInedx.splice(unsortedInedx.indexOf(i), 1)
            }
            yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
        }
        h = Math.floor(h / 3)
    }
    // sortedIndex = sortedIndex.concat(unsortedInedx)
    // unsortedInedx = []
    // operateIndex = []
    // currentIndex = []
    // yield { arr: data, sortedIndex, unsortedInedx, operateIndex, currentIndex }
}       