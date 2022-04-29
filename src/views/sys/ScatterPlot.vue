<template>
  <div>
    <!--    position: relative;z-index: 999-->
    <el-form :inline="true" style="float: left">
      <el-form-item>
        <template>
          <el-select v-model="searchForm.name" filterable placeholder="请选择课程名称">
            <el-option
                v-for="item in courseNameOptions"
                :key="item.id"
                :label="item.courseName"
                :value="item.courseName">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-select v-model="searchForm.semesterId" filterable placeholder="请选择开课学期">
            <el-option
                v-for="item in semesterOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-cascader
              v-model="searchForm.classId"
              placeholder="请选择开课班级"
              :props="defaultParams"
              :options="classOptions"

          >
          </el-cascader>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button @click="getObjective">搜索</el-button>

      </el-form-item>
    </el-form>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div style="height: 50px"></div>
    <div id="first" style="width: 600px;height:400px; float: left"></div>
    <div id="second" style="width: 600px;height:400px;float: right;"></div>
    <div style="height: 500px"></div>
    <div id="third" style="width: 600px;height:400px; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';


export default {
  name: "ScatterPlot",
  data() {
    return {
      seriesDataOne: [],
      seriesDataTwo: [],
      seriesDataThree: [],
      xAxisData: [],
      searchForm: {
        name: '',
        semesterId: '',
        classId: ''

      },
      courseNameOptions: [],
      semesterOptions: [],
      classOptions: [],
      defaultParams: {
        label: 'name',
        value: 'id',
        children: 'classes',
        emitPath: false
      }

    }
  },
  mounted() {

    this.DrawScatterFirst()
    this.DrawScatterSecond()
    this.DrawScatterThird()

  },

  methods: {
    DrawScatterFirst() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('first'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '课程目标1学生个体达成度分布',
          left: 'center'

        },
        xAxis: {
          data: this.xAxisData,
          name: "学生序号",
          nameLocation: 'center',
          nameGap: 25,
          axisLine:{
            lineStyle:{
              /*color: '#f7a7a6'*/
            }
          }
        },
        yAxis: {

          name: "课程目标1达成度",
          nameLocation: 'center',
          nameGap: 25,
          axisLine:{
            show: true,
            lineStyle:{
              /*color: '#f7a7a6'*/
            }
          }
        },
        series: [
          {
            type: 'scatter',
            data: this.seriesDataOne
          }
        ],
        tooltip: {//提示框组件
          trigger: 'item', //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '({b} : {c}) <br/>' //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        }
      });
    },
    DrawScatterSecond() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('second'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '课程目标2学生个体达成度分布',
          left: 'center'

        },
        xAxis: {
          data: this.xAxisData,
          name: "学生序号",
          nameLocation: 'center',
          nameGap: 25
        },
        yAxis: {
          name: "课程目标2达成度",
          nameLocation: 'center',
          nameGap: 25,
          axisLine:{
            show: true,
            lineStyle:{
            /*  color: '#f7a7a6'*/
            }
          }
        },
        series: [
          {
            type: 'scatter',
            data: this.seriesDataTwo
          }
        ]
      });
    },
    DrawScatterThird() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('third'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '课程目标3学生个体达成度分布',
          left: 'center'

        },
        xAxis: {
          data: this.xAxisData,
          name: "学生序号",
          nameLocation: 'center',
          nameGap: 25
        },
        yAxis: {
          name: "课程目标3达成度",
          nameLocation: 'center',
          nameGap: 25,
          axisLine:{
            show: true,
            lineStyle:{
              /*color: '#a6b3f7'*/
            }
          }
        },
        series: [
          {
            type: 'scatter',
            data: this.seriesDataThree
          }
        ]
      });
    },
    getObjective() {
      this.seriesDataOne =[]
      this.seriesDataTwo =[]
      this.seriesDataThree =[]
      this.xAxisData = []
      this.DrawScatterFirst()
      this.DrawScatterSecond()
      this.DrawScatterThird()

      this.$axios.post('/studentCourse/getObjective',this.searchForm).then(res => {

        console.log(res.data.data)
        let grades = res.data.data

        if(grades.length !=0){
          for (let i = 1; i < grades.length; i++) {
            this.xAxisData.push(i)
          }
          console.log('id==>' + grades[0].objectiveGrade)

          for (let i = 0; i < grades.length; i++) {
            this.seriesDataOne.push((grades[i].objectiveOneGrade).toFixed(3))
            this.seriesDataTwo.push((grades[i].objectiveTwoGrade.toFixed(3)))
            this.seriesDataThree.push((grades[i].objectiveThreeGrade).toFixed(3))
          }


          this.DrawScatterFirst()
          this.DrawScatterSecond()
          this.DrawScatterThird()
        }

      })
    },
    search() {
      this.seriesDataOne =[]
      this.seriesDataTwo =[]
      this.seriesDataThree =[]
      this.xAxisData = []
      this.DrawScatterFirst()
      this.DrawScatterSecond()
      this.DrawScatterThird()

      this.$axios.post('/studentCourse/getByRequire', this.searchForm).then(res => {

        console.log(res.data.data)
        let grades = res.data.data

        if(grades.length !=0){
          for (let i = 1; i <= grades.length; i++) {
            this.xAxisData.push(i)
          }
          console.log('id==>' + grades[0].objectiveGrade)

          for (let i = 0; i < grades.length; i++) {
            this.seriesDataOne.push(grades[i].objectiveOneGrade)
            this.seriesDataTwo.push(grades[i].objectiveTwoGrade)
            this.seriesDataThree.push(grades[i].objectiveThreeGrade)
          }


          this.DrawScatterFirst()
          this.DrawScatterSecond()
          this.DrawScatterThird()
        }




      })
    },
    getCourseSelect() {

      this.$axios.get('/course/getCourseSelect').then(res => {

        this.courseNameOptions = res.data.data
      })
    },
    getSemester() {
      this.$axios.get('/semester/getSemester').then(res => {

        this.semesterOptions = res.data.data

      })
    },
    getClassOptions() {
      this.$axios.get('/stuGrade/getGradeClass').then(res => {
        this.classOptions = res.data.data

      })
    }
  },

  created() {

    /*this.getObjectiveOne()*/

    this.getCourseSelect()
    this.getSemester()
    this.getClassOptions()


  }
}
</script>

<style scoped>
/*.charts {
  margin-top: 100px;
}*/
</style>