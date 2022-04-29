<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">查询</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择上级菜单">
            <template v-for="item in tableData">
              <el-option :label="item.name" :value="item.id"></el-option>
              <template v-for="child in item.children">
                <el-option :label="child.name" :value="child.id">
                  {{ " - " + child.name }}
                </el-option>
              </template>
            </template>

          </el-select>
        </el-form-item>
        <el-form-item label="日期" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="类型" prop="type" label-width="100px">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label=0>目录</el-radio>
            <el-radio :label=1>菜单</el-radio>
            <el-radio :label=2>按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status" label-width="100px">
          <el-radio-group v-model="ruleForm.statu">
            <el-radio :label=0>禁用</el-radio>
            <el-radio :label=1>正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

    <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        stripe
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
      </el-table-column>

      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型">
        <template slot-scope="scope">
          <el-tag size="small">目录</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="state"
          label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status === 1" type="success">正常</el-tag> <!-- type更换样式-->
          <el-tag size="small" v-else-if="scope.row.status === 0 " type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          prop="operation"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="editHandle(scope.row.id)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <template>
            <el-popconfirm
                title="这是一段内容确定删除吗？"
                @confirm="deleteHandle(scope.row.id)">
              <el-button slot="reference">删除</el-button>
            </el-popconfirm>
          </template>


        </template>
      </el-table-column>

    </el-table>


  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ],
        date1: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        date2: [
          {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
        ],
        type: [
          { required: true, message: '请选择一个类型', trigger: 'change'}
        ],
        resource: [
          {required: true, message: '请选择活动资源', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写活动形式', trigger: 'blur'}
        ]
      },
      dialogVisible: false,
      formInline: {
        user: '',
        region: ''
      },
      tableData: []
    }
  }, methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.resetForm('ruleForm')
            done();
          })
          .catch(_ => {
          });

    },
    getTableData() {

      this.$axios.get('/sys/menu/list').then(res => {
        this.tableData = res.data.data
      })

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!');
          this.$axios.post('/sys/menu/' + (this.ruleForm.id ? 'update' : 'save'), this.ruleForm).then(res => {

            this.$message({
              message: '恭喜你操作成功',
              type: 'success',
              onClose: () => {
                this.getTableData()
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
      this.ruleForm = {}
    },
    editHandle(id) {
      this.$axios.get('/sys/menu/info/' + id).then(res =>{
        this.ruleForm = res.data.data

        this.dialogVisible =true
      })

    },
    deleteHandle(id){
      this.$axios.post('/sys/menu/delete/'+id).then(res =>{
        this.$message({
          message: '删除成功',
          type: 'success',
          onClose: () => {
            this.getTableData()
          }
        });
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