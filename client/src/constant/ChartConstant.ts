import { deepCopy, exchange } from '@src/utils/utils'

/** 
 * 算法柱状图相关数据、类型、方法
 * todo 数据应从数据库中取出 
 */

// 数据排序状态
enum Status {
    Unsorted,
    Sorted,
    Current,
    Operate
}
// 程序运行状态
enum RunTimeStatus {
    // 定时运行
    Run,
    // 单步运行
    Step,
    // 暂停
    Pause,
    // 停止（初始状态）
    Stop
}
interface StackDataType {
    sortedArr: number[],
    unsortedArr: number[],
    operateArr: number[],
    currentArr: number[]
}
interface SortMiddleType {
    arr: number[],
    sortedIndex: number[],
    unsortedInedx: number[],
    operateIndex: number[],
    currentIndex: number[]
}
// 排序数据
const BarData = {
    bubble: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    select: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    insert: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    shell: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
}
const ColorMap = {
    gray: '#99A3A4',
    green: '#58D68D',
    blue: '#3498DB',
    red: '#CD6155'
}
// 定义基本的样式
const BarOption = {
    grid: {
        left: '5%',
        right: '15%',
        top: '10%',
        bottom: '10%'
    },
    color: ['#ABEBC6', '#ABB2B9', '#F1948A', '#F39C12'],
    legend: {
        data: [
            MapStatusToName(Status.Unsorted),
            MapStatusToName(Status.Sorted),
            MapStatusToName(Status.Current),
            MapStatusToName(Status.Operate)
        ],
        top: '15'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line'
        }
    },
    xAxis: [
        {
            type: 'category',
            // 数据由组件填充
            data: ['1'],
            name: '数组元素初始位置'
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '元素值'
        }
    ],
    series: [
        {
            name: '',
            type: 'bar',
            barWidth: '60%',
            stack: '',
            data: [1]
        }
    ]
}
type BarOptionType = typeof BarOption

/**
 * 生成x轴数据
 * @param length 数据个数
 */
function CreateAxisData (length: number) {
    let arr = []
    for (let i = 0; i < length; i++) {
        arr.push(`${i}`)
    }
    
    return arr
}

/**
 * 生成柱状图数据
 * @param status 数据状态
 * @param data 该状态的数据
 */
function CreateSeriesData(status: Status, data: number[]) {
    let name = MapStatusToName(status)
    let z = MapStatusToZindex(status)
    
    let result = {
        name: '',
        type: 'bar',
        barWidth: '60%',
        stack: '总量',
        data: [1],
        z: z
    }
    return { ...result, name, data }
}

function ExchangePosition (data: number[], axisData: string[], i: number, j: number) {
    exchange(data, i, j)
    exchange(axisData, i, j)
}

/**
 * 将数据添加到option中
 * @param option 基础option 
 * @param data stackData
 */
function AddDataToOption(option: BarOptionType, seriesData: StackDataType, axisData: string[]) {
    option = deepCopy(option)
    let { sortedArr, unsortedArr, operateArr, currentArr } = seriesData

    option.xAxis[0].data = axisData

    option.series = []
    option.series.push(CreateSeriesData(Status.Sorted, sortedArr))
    option.series.push(CreateSeriesData(Status.Unsorted, unsortedArr))
    option.series.push(CreateSeriesData(Status.Operate, operateArr))
    option.series.push(CreateSeriesData(Status.Current, currentArr))

    return option
}

// 数据排序状态与图形lengend名称的映射关系
function MapStatusToName (status: Status) {
    switch (status) {
        case Status.Unsorted:
            return '未排序部分'
        case Status.Sorted:
            return '已排序部分'
        case Status.Current:
            return '当前指针'
        case Status.Operate:
            return '操作元素'
        default:
            throw new Error(`不支持的状态类型:${status}`)
    }
}
// 数据排序状态与图形zindex的映射关系
function MapStatusToZindex (status: Status) {
    switch (status) {
        case Status.Unsorted:
            return 2
        case Status.Sorted:
            return 4
        case Status.Current:
            return 3
        case Status.Operate:
            return 3
        default:
            throw new Error(`不支持的状态类型:${status}`)
    }
}
 
type MapStatusToColor = (status?: Status) => string

/**
 * 普通数组转为stack对象数组
 * @param arr 
 * @param sortedIndex 
 * @param unsortedInedx 
 * @param operateIndex 
 * @param currentIndex 
 */
function ArrayToSeriesData(
    arr: number[],
    sortedIndex: number[],
    unsortedInedx: number[],
    operateIndex: number[],
    currentIndex: number[]) {
    let sortedArr = [],
        unsortedArr = [],
        operateArr = [],
        currentArr = []

    for (let i = 0, len = arr.length; i < len; i++) {
        sortedIndex.includes(i) ? sortedArr.push(arr[i]) : sortedArr.push(0)
        unsortedInedx.includes(i) ? unsortedArr.push(arr[i]) : unsortedArr.push(0)
        operateIndex.includes(i) ? operateArr.push(arr[i]) : operateArr.push(0)
        currentIndex.includes(i) ? currentArr.push(arr[i]) : currentArr.push(0)
    }

    return {
        sortedArr,
        unsortedArr,
        operateArr,
        currentArr
    }
}

/**
 * 将生成的中间数据转为option
 * @param option 
 * @param middleData 
 * @param axisData 
 */
function AddMiddleDataToOption (option: BarOptionType, middleData: SortMiddleType, axisData: string[]) {
    middleData = deepCopy(middleData)
    let seriesData = EditDataByPriority(ArrayToSeriesData(
        middleData.arr, 
        middleData.sortedIndex, 
        middleData.unsortedInedx, 
        middleData.operateIndex, 
        middleData.currentIndex))    
    return AddDataToOption(option, {...seriesData}, axisData)
}

/**
 * 根据各个数据的优先级整理数据
 * operate > current > sorted = unsorted
 * @param middleData
 */
function EditDataByPriority (arrObj: {
    sortedArr: number[],
    unsortedArr: number[],
    operateArr: number[],
    currentArr: number[]
}) {
    let {sortedArr, unsortedArr, operateArr, currentArr} = arrObj

    for (let i = 0, len = sortedArr.length; i < len; i++) {
        if (operateArr[i] !== 0) {
            sortedArr[i] = 0
            unsortedArr[i] = 0
            currentArr[i] = 0
        } else if (currentArr[i] !== 0) {
            sortedArr[i] = 0
            unsortedArr[i] = 0
        }
    }

    return {
        sortedArr,
        unsortedArr,
        operateArr,
        currentArr
    }
}

export {
    BarOption,
    BarOptionType,
    BarData,
    ColorMap,
    Status,
    RunTimeStatus,
    MapStatusToColor,
    ArrayToSeriesData,
    StackDataType,
    CreateSeriesData,
    SortMiddleType,
    CreateAxisData,
    ExchangePosition,
    AddMiddleDataToOption
}