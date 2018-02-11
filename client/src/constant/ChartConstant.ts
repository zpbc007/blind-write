// 定义基本的样式
const BarOption = {
    grid: {
        left: '5%',
        right: '5%',
        top: '3%',
        bottom: '3%'
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
            data : ['1']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series : [
        {
            type: 'bar',
            barWidth: '60%',
            // 数据由组件填充
            data: [1],
            itemStyle: {
                color: (param: any) => '123'
            },
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            } 
        }
    ]  
}
type BarOptionType = typeof BarOption
// 排序数据
const BarData = {
    dataList: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    colorList: [''],
    xAxisData: ['']
}
const ColorMap = {
    gray: '#99A3A4',
    green: '#58D68D',
    blue: '#3498DB',
    red: '#CD6155'
}
enum Status {
    Init,
    Orderd,
    Current,
    Operate
} 
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
type BarDataType = typeof BarData

type MapStatusToColor = (status?: Status) => string
type SetColor = (data: BarDataType, status?: Status, index?: number) => BarDataType

export {
    BarOption, 
    BarOptionType,
    BarData,
    BarDataType,
    ColorMap,
    Status,
    RunTimeStatus,
    MapStatusToColor,
    SetColor
}