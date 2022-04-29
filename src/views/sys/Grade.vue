<template>

  <div>
    <template>

      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          stripe
          border
          height="550"
          :header-cell-style="{textAlign:'center'}"
          :cell-style="{textAlign:'center'}"
          :row-style="{height: '60px'}"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="courseName"
            label="课程名称"
            width="150px">
        </el-table-column>
        <el-table-column
            prop="courseNo"
            label="课程编号"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="courseType"
            label="课程类别"
            width="130px"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="semester"
            label="开课学期"
            width="180px">
        </el-table-column>
        <el-table-column
            prop="credit"
            label="学分"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="totalGrade"
            label="总评成绩"
            show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "Grade",
  data(){
    return{
      tableData: [],

    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;

      this.delBatchStatus = val.length === 0
    },

    getTableData(){

      this.$axios.get('/studentCourse/getStudentGrade').then( res =>{

        this.tableData = res.data.data


      })

    }


  },

  created() {

    this.getTableData()

  }
}
</script>

<style scoped>

</style>