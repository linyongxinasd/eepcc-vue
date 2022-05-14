<template>
  <div>

    <el-button type="primary" @click="openDialog()">导入课程成绩excel</el-button>
    <el-dialog
        title="上传文件页面"
        :visible.sync="uploadDialogVisible"
        width="60%"
        :before-close="handleClose"

    >
      <el-cascader
          v-model="courseId"
          placeholder="请选择对应课程"
          :props="defaultParams"
          :options="courseOptions"
          style="width: 450px"

      >
      </el-cascader>
      <div style="height: 10px"></div>
      <el-upload
          ref="upload"
          class="upload-demo"
          action="http://localhost:8081/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
          :data={courseId:this.courseId}
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过100M</div>
      </el-upload>
      <div style="height: 80px"></div>
      <div style="float: right">如果没有模板请先下载模板文件
        <el-button id="a" type="text" @click="download">下载<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
      <div style="height: 5px"></div>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      fileList: [],
      /*{
        name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }*/
      uploadDialogVisible: false,
      courseId: '',
      courseOptions: [],
      defaultParams: {
        label: 'name',
        value: 'id',
        children: 'children',
        emitPath: false
      }
    };
  },
  methods: {
    openDialog() {
      this.uploadDialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    upload() {
      this.$refs.upload.submit()
    },
    submitUpload() {
      this.$refs.upload.submit();

      this.$message.success("上传文件成功");
      this.uploadDialogVisible = false
      this.fileList = []
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /*handleSuccess(res,files, fileList){
      console.log("CODE")
      console.log(res.data.statusCode)
        if(res.data.statusCode === 200){


        }

    },*/
    download() {
      const url = '/download';
      this.$axios.get(url,
          {
            responseType: 'blob'
          })
          .then((res) => {
            let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
            let url = URL.createObjectURL(blob);
            const link = document.createElement('a'); //创建a标签
            link.href = url;
            link.download = window.decodeURI(res.headers['content-disposition'].split('*=UTF-8')[1]); //重命名文件
            link.click();
            URL.revokeObjectURL(url);
            console.log("下载文件" + res);

            return this.$message.success("下载模板成功");


          }).catch(function (error) {
        console.log(error);
      })
    },
    getCourseOption() {
      this.$axios.get('course/getCourseCascade').then(res => {
        this.courseOptions = res.data.data
      })
    }
  },
  created() {
    this.getCourseOption()
  }
}
</script>

<style scoped>

</style>