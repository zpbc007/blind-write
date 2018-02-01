// 定义基本的样式
export const BarOption = {
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
            } 
        }
    ]  
}

export type BarOptionType = typeof BarOption

// 排序数据
export const BarData = {
    dataList: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    colorList: [''],
    xAxisData: ['']
}

export type BarDataType = typeof BarData