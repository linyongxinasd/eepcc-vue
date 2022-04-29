<template>
  <div>
    <el-form :inline="true" style="float: left">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="课程名称" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchCourse">搜索</el-button>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCourse()">新增课程</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
            title="确定批量删除吗？"
            @confirm="deleteHandle(null)">
          <el-button slot="reference" type="danger" :disabled="delBatchStatus" >批量删除</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
    <el-dialog
        title="请填写课程相关信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form :model="courseForm" :rules="rules" ref="courseForm" label-width="100px" class="courseForm">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="courseForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程编号" prop="courseNo">
          <el-input v-model="courseForm.courseNo"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" prop="courseTypeId">
          <el-select v-model="courseForm.courseTypeId" placeholder="请选择课程类型">
            <template v-for="item in types">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="课程总学时" prop="creditHours">
          <el-input v-model.number="courseForm.creditHours"></el-input>
        </el-form-item>
        <el-form-item label="学分" prop="credit">
          <el-input v-model="courseForm.credit" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
        </el-form-item>
<!--        <el-form-item label="开课班级" prop="stuClassId">
          <el-select v-model="courseForm.stuClassId" placeholder="请选择开课班级">
            <template v-for="item in stuClasses">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
&lt;!&ndash;          <el-input v-model="courseForm.stuClass"></el-input>&ndash;&gt;
        </el-form-item>-->
        <el-form-item label="开课班级" prop="stuClassId">
          <template >
            <el-cascader
                v-model="courseForm.stuClassId"
                placeholder="请选择开课班级"
                :props="defaultParams"
                :options="options"

                >
            </el-cascader>
          </template>
        </el-form-item>
<!--        <el-form-item label="开课年级" prop="stuGradeId">
          <el-select v-model="courseForm.stuGradeId" placeholder="请选择开课年级">
            <template v-for="item in stuGrades">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>

          </el-select>
&lt;!&ndash;          <el-input v-model="courseForm.stuGrade"></el-input>&ndash;&gt;
        </el-form-item>-->
        <el-form-item label="开课学期" prop="semester">
          <el-select v-model="courseForm.semester" placeholder="请选择开课学期">
            <template v-for="item in semesters">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
<!--          <el-input v-model="courseForm.semester"></el-input>-->
        </el-form-item>
        <el-form-item label="授课教师" prop="teacherId">
          <el-select v-model="courseForm.teacherId" placeholder="请选择授课教师">
            <template v-for="item in teachers">
              <el-option :label="item.username" :value="item.id"></el-option>
            </template>
          </el-select>
<!--          <el-input v-model="courseForm.teacher"></el-input>-->
        </el-form-item>
        <el-form-item label="评价教师" prop="evaluatorId">
          <el-select v-model="courseForm.evaluatorId" placeholder="请选择评价教师">
            <template v-for="item in evaluators">
              <el-option :label="item.username" :value="item.id"></el-option>
            </template>
          </el-select>
<!--          <el-input v-model="courseForm.evaluator"></el-input>-->
        </el-form-item>
        <el-form-item label="课程负责人" prop="directorId">
          <el-select v-model="courseForm.directorId" placeholder="请选择课程负责人">
            <template v-for="item in directors">
              <el-option :label="item.username" :value="item.id"></el-option>
            </template>
          </el-select>
<!--          <el-input v-model="courseForm.director"></el-input>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('courseForm')">提交</el-button>
          <el-button @click="resetForm('courseForm')">重置</el-button>
        </el-form-item>
      </el-form>
<!--      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>-->
    </el-dialog>

    <template>
      <el-table
          ref="multipleTable"
          :data="courseData"
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
            prop="creditHours"
            label="总学时"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="credit"
            label="学分"
            show-overflow-tooltip
            >
        </el-table-column>
        <el-table-column
            prop="stuClass"
            label="开课班级"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="stuGrade"
            label="开课班级"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="semester"
            label="开课学期"
            width="180px">
        </el-table-column>
        <el-table-column
            prop="teacher"
            label="授课教师"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="evaluator"
            label="评价教师"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="director"
            label="课程负责人"
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
  name: "Course",



  data(){
    return{
      options:[],
      defaultParams: {
        label: 'name',
        value: 'id',
        children: 'classes',
        emitPath: false
      },
      teachers: [],
      evaluators: [],
      directors: [],
      types: [],
      stuClasses: [],
      stuGrades: [],
      semesters: [],
      delBatchStatus: true,
      searchForm: {
        name: ''

      },
      courseData: [],

      courseForm: {

      },
      rules: {
        courseName: [
          {required: true, message: '请输入课程名称', trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ],
        courseNo: [
          {required: true, message: '请输入课程编号', trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ],
        courseTypeId: [
          {required: true, message: '请选择课程类型', trigger: 'blur'}
        ],
        creditHours: [
          {required: true, message: '请输入课程总学时'},
          { type: 'number', message: '总学时必须为数字值'}
        ],
        credit: [
          {required: true, message: '请输入课程学分'}

        ],
        stuClassId: [
          {required: true, message: '请选择开课班级', trigger: 'blur'}
        ],
        stuGradeId: [
          {required: true, message: '请选择开课年级', trigger: 'blur'}
        ],
        semester: [
          {required: true, message: '请选择开课学期', trigger: 'blur'}
        ],
        teacherId: [
          {required: true, message: '请选择授课教师', trigger: 'blur'}
        ],
        evaluatorId: [
          {required: true, message: '请选择评价教师', trigger: 'blur'}
        ],
        directorId: [
          {required: true, message: '请选择课程负责人', trigger: 'blur'}
        ]
      },
      dialogVisible: false,
    }
  },

  methods:{

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!');
          /*this.$axios.post('/sys/menu/' + (this.ruleForm.id ? 'update' : 'save'), this.ruleForm).then(res => {*/
          this.$axios.post('/course/save' , this.courseForm).then(res => {

            this.$message({
              message: '恭喜你操作成功',
              type: 'success',
              onClose: () => {
                this.getCourseData()
              }
            });
            this.dialogVisible = false


          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = true
      this.courseForm = {}
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.resetForm('courseForm')
            done();
          })
          .catch(_ => {
          });

    },

    deleteHandle(id){
      var ids = [];

      if (id){
        ids.push(id)
      }else {

        this.multipleSelection.forEach(row =>{
          ids.push(row.id)
        })

      }
      console.log("数组id"+ids)
      this.$axios.post('/course/delete',ids).then(res =>{
        this.$message({
          message: '删除成功',
          type: 'success',
          onClose: () => {
            this.getCourseData()
          }
        });
      })

    },

    handleSelectionChange(val) {
      this.multipleSelection = val;

      this.delBatchStatus = val.length === 0
    },

    editHandle(id) {
      this.addCourse()

      this.$axios.get('/course/info/' + id).then(res =>{

        this.courseForm = res.data.data


        this.dialogVisible =true
      })

    },
    getCourseData(){

      this.$axios.get('/course/getCourse').then( res =>{

        this.courseData = res.data.data
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
    searchCourse(){
      this.$axios.get('/course/getByName',{
        params: {
          name: this.searchForm.name
        }
      }).then(res =>{

        this.courseData = res.data.data
      })
    },




  },

  created() {

    this.getCourseData()

  }
}
</script>

<style>

.el-table-column {
  header-align: center;

}

</style>