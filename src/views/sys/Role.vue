<template>
  <div>
    <el-form :inline="true" style="float: left">
      <el-form-item>
        <el-input v-model="searchForm.name" placeholder="名称" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="">搜索</el-button>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
      <el-form-item>
          <el-popconfirm
              title="确定批量删除吗？"
              @confirm="deleteHandle(null)">
            <el-button slot="reference" type="danger" :disabled="delBatchStatus" >批量删除</el-button>
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
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="日期"
            width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
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
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 40]"
          :current-page="current"
          :page-size="size"
          :total="total"
      >
      </el-pagination>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      delBatchStatus: true,
      searchForm: {
        name: ''

      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      current: 1,
      size: 10,
      total: 1001
    }

  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

      this.delBatchStatus = val.length === 0
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
      this.$axios.post('/sys/role/delete',ids).then(res =>{
        this.$message({
          message: '删除成功',
          type: 'success',
          onClose: () => {
            this.getTableData()
          }
        });
      })

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    editHandle(id) {
      this.$axios.get('/sys/role/info/' + id).then(res =>{
        this.ruleForm = res.data.data

        this.dialogVisible =true
      })

    },
  },
  created() {
    this.getTableData()
  }
}
</script>

<style scoped>
.el-pagination {
  float: right;
  margin-top: 20px ;
}

</style>