<template>

  <div style="padding: 20px">
    <el-card>
      <div id="myChart" style="width:950px; height: 650px; margin-left: 200px;"></div>
    </el-card>
  </div>
</template>

<script>
import request from "../../axios/request";
import * as echarts from "echarts";

export default
{
  name: "Welcome",
  data() {return {}},
  mounted() {this.drawLine();},
  methods:
  {
    drawLine()
    {
      let myChart =echarts.init(document.getElementById('myChart'));
      let option = {
        title: {
          text: 'Repartition Disk   ',
          subtext: 'Virtual Data',
          left: 'left'
        },
        tooltip:
        {
          trigger: 'item'
        },
        legend:
        {
          trigger: 'item'
        },
        toolbox:
        {
          show: true,
          feature:
          {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        series:
        [
          {
            name: 'Users',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {borderRadius: 8 },
            data: []
          }
        ]
      }
      request.get("/user/count").then(res =>
      {
        if (res.code === '200')
        {
          this.$message.success(" You are welcome here!")
          res.data.forEach(item =>
          {
            option.series[0].data.push({name: item.address, value: item.count})
          })
          // 绘制图表
          myChart.setOption(option);
        }
      })
    }
  }
}
</script>
