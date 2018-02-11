import { exchangeDataAndPosition } from '@utils/utils'
import { 
    BarDataType
} from '@constant/ChartConstant'

// 选择排序
export default function* selectSort (
    // 待排序数组
    data: BarDataType, 
    currentColor: string,
    operateColor: string,
    restColor: (data: BarDataType) => string[]) {
        let {dataList, colorList, xAxisData} = data
        for (let i = 0; i < dataList.length; i++) {
            let minIndex = i
            for (let j = i + 1; j < dataList.length; j++) {
                // 当前指针
                colorList[j] = currentColor
                yield { dataList, colorList, xAxisData }
                if (dataList[j] < dataList[minIndex]) {
                    minIndex = j
                } 
                colorList = restColor({dataList, colorList, xAxisData})
            }
            if (minIndex !== i) {
                // 操作的两个元素
                colorList[i] = colorList[minIndex] = operateColor
                yield {dataList, colorList, xAxisData}
                exchangeDataAndPosition(dataList, xAxisData, i, minIndex)
                // 操作完成
                yield {dataList, colorList, xAxisData}
            }
            colorList = restColor({dataList, colorList, xAxisData})
        }
    }       