import { exchangeDataAndPosition } from '@utils/utils'
import { 
    BarDataType
} from '@constant/ChartConstant'

// 冒泡排序
export default function* sort(
    // 待排序数组
    data: BarDataType, 
    // 设置
    currentColor: string,
    operateColor: string,
    restColor: (data: BarDataType) => string[]) {
    let {dataList, colorList, xAxisData} = data
    for (let i = 0; i < dataList.length; i++) {
        for (let j = 0; j < dataList.length - 1; j++) {
            // 当前指针颜色
            colorList[j] = currentColor
            yield {dataList, colorList, xAxisData}
            if (data.dataList[j] > dataList[j + 1]) {
                colorList[j] = colorList[j + 1] = operateColor
                yield {dataList, colorList, xAxisData}
                
                exchangeDataAndPosition(dataList, xAxisData, j, j + 1)
                yield {dataList, colorList, xAxisData}
            }
            colorList = restColor({dataList, colorList, xAxisData})
        }
    }
}