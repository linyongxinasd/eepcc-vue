<template>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">

<!--        <h2>这是左边的框</h2>
        <p>这是一个标签</p>
        <p>标签</p>-->
      </el-col>

      <el-col :span="8">
        <h1>欢迎来到课程资料管理系统</h1>


        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item label="账号" prop="username" style="width: 512px">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 512px">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="kaptcha" style="width: 512px">
            <el-input v-model="loginForm.kaptcha" style="width: 280px; float: left"></el-input>
            <el-image :src="base64Img? base64Img : ''" class="base64Img" @click="getCode"></el-image>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>


      </el-col>

      <el-col :span="8">
<!--        <h2>测试</h2>-->
      </el-col>
    </el-row>
</template>

<script>
import qs from 'qs'
export default {

  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        kaptcha: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
         /* { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }*/
        ],
        kaptcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入四位验证码', trigger: 'blur' }
        ]
      },
      base64Img: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!');
          this.$axios.post('/login?'+qs.stringify(this.loginForm)).then(res =>{

            const jwt = res.headers['authorization']

            this.$store.commit('SET_TOKEN', jwt)
            this.$router.push("/index")

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCode(){
      this.$axios.get('/kaptcha').then(res =>{
        this.loginForm.token = res.data.data.token
        this.base64Img = res.data.data.base64Img
        this.loginForm.kaptcha = ''
      })

    }

  },
  created() {
    this.getCode()
  }
}
</script>


<style scoped>

.el-row {
  background: #cfecf5;

  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  position: fixed;
}

.codeImg {
  margin-left: 10px;
  float: left;
  border-radius: 4px;
}

</style>