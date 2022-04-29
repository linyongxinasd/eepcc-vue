<template>

  <div>
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
        <template >
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
        <el-button @click="search">搜索</el-button>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCourse()">新增课程</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
            title="确定批量删除吗？"
            @confirm="deleteHandle(null)">
          <el-button slot="reference" type="danger" :disabled="delBatchStatus">批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
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
            prop="stuName"
            label="学生姓名"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="courseName"
            label="课程名称"
            width="150px">
        </el-table-column>
        <el-table-column label="课程目标一">
          <el-table-column
              prop="objectiveOneUsual"
              label="课堂表现成绩"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="objectiveOneExperiment"
              label="实验作业成绩"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="objectiveOneFinal"
              label="期末考试成绩"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="objectiveOneGrade"
              label="课程目标得分"
              show-overflow-tooltip>
          </el-table-column>
        </el-table-column>

        <el-table-column label="课程目标二">
          <el-table-column
              prop="objectiveTwoUsual"
              label="课堂表现成绩"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="objectiveTwoExperiment"
              label="实验作业成绩"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="objectiveTwoFinal"
              label="期末考试成绩"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="objectiveTwoGrade"
              label="课程目标得分"
              show-overflow-tooltip>
          </el-table-column>
        </el-table-column>

        <el-table-column label="课程目标三">
          <el-table-column
              prop="objectiveThreeUsual"
              label="课堂表现成绩"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="objectiveThreeExperiment"
              label="实验作业成绩"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="objectiveThreeFinal"
              label="期末考试成绩"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="objectiveThreeGrade"
              label="课程目标得分"
              show-overflow-tooltip>
          </el-table-column>
        </el-table-column>
        <el-table-column
            prop="usualGrade"
            label="课堂表现成绩"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="experimentGrade"
            label="实验作业成绩"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="finalGrade"
            label="期末考试成绩"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="totalGrade"
            label="总评成绩"
            show-overflow-tooltip>
        </el-table-column>

        <el-table-column
            prop="operation"
            label="操作"
            width="150px">
          <template slot-scope="scope">
            <el-button type="text" @click="editHandle(scope.row.id)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <template>
              <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  @confirm="deleteHandle(scope.row.id)">
                <el-button type="text" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>


          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "CourseGrade",
  data() {
    return {
      tableData: [],
      searchForm: {
        name: '',
        semesterId: '',
        classId: ''

      },
      delBatchStatus: true,
      courseNameOptions: [],
      semesterOptions:[],
      classOptions:[],
      defaultParams: {
        label: 'name',
        value: 'id',
        children: 'classes',
        emitPath: false
      }


    }
  },
  methods: {

    handleSelectionChange(val) {
      this.multipleSelection = val;

      this.delBatchStatus = val.length === 0
    },
    editHandle(id) {
      this.addCourse()

      this.$axios.get('/course/info/' + id).then(res => {

        this.courseForm = res.data.data


        this.dialogVisible = true
      })


    },
    deleteHandle(id) {
      var ids = [];

      if (id) {
        ids.push(id)
      } else {

        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })

      }
      console.log("数组id" + ids)
      this.$axios.post('/course/delete', ids).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success',
          onClose: () => {
            this.getCourseData()
          }
        });
      })

    },
    getTableData() {
      this.$axios.get('/studentCourse/getCourseGrade',{
        params: {
          name: this.searchForm.name
        }
      }).then(res => {

        this.tableData = res.data.data

      })
    },
    search() {
      this.$axios.post('/studentCourse/getByRequire',this.searchForm).then(res =>{

        this.tableData = res.data.data
      })
    },

    addCourse(){

      this.$axios.get('/type/getType').then( res =>{

        this.types = res.data.data
        this.dialogVisible =true

      })

      this.$axios.get('/stuGrade/getGradeClass').then( res =>{
        this.options = res.data.data
        this.dialogVisible =true

      })
      this.$axios.get('/stuClass/getStuClass').then( res =>{

        this.stuClasses = res.data.data
        this.dialogVisible =true


      })

      this.$axios.get('/stuGrade/getStuGrade').then( res =>{
        this.stuGrades = res.data.data
        this.dialogVisible =true

      })

      this.$axios.get('/semester/getSemester').then( res =>{

        this.semesters = res.data.data
        this.dialogVisible =true


      })

      this.$axios.get('/getTeachers/'+ 4 ).then( res =>{

        this.teachers = res.data.data
        this.dialogVisible =true
      })

      this.$axios.get('/getTeachers/'+ 5 ).then( res =>{

        this.evaluators = res.data.data
        this.dialogVisible =true
      })

      this.$axios.get('/getTeachers/'+ 6 ).then( res =>{

        this.directors = res.data.data
        this.dialogVisible =true
      })

    },
    getCourseSelect(){

      this.$axios.get('/course/getCourseSelect').then( res =>{

        this.courseNameOptions = res.data.data
      })
    },
    getSemester(){
      this.$axios.get('/semester/getSemester').then( res =>{

        this.semesterOptions = res.data.data

      })
    },
    getClassOptions(){
      this.$axios.get('/stuGrade/getGradeClass').then( res =>{
        this.classOptions = res.data.data

      })
    }

  },
  created() {

    /*this.getTableData()*/

    this.getCourseSelect()

    this.getSemester()
    this.getClassOptions()


  }
}
</script>

<style scoped>

</style>