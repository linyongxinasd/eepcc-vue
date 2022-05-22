<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <strong>面向工程认证的课程资料管理系统</strong>

        <div class="header-avatar">
          <div>
            <el-avatar size="medium" :src="UserInfo.avatar"></el-avatar>
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{UserInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/sys/center">用户中心</router-link>

              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-link href="https://www.bilibili.com/" target="_blank">B站</el-link>
          <el-link href="https://d.weibo.com/" target="_blank">微博</el-link>
        </div>



      </el-header>
      <el-main>
        <Tabs style="background-color: #e8e8e8"></Tabs>
        <router-view style="margin: 0 15px;"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import SideMenu from "@/views/include/SideMenu";
import Tabs from "@/views/include/Tabs";

export default {
  name: "Home",
  components: {
    SideMenu,Tabs
  },
  data() {
    return{
      UserInfo: {
        id: "",
        name: "",
        avatar: ""
      }
    }
  },
  methods: {
    logout() {
      this.$axios.post("/logout").then(res => {
        /*清楚localStorage和session信息*/
        localStorage.clear()
        sessionStorage.clear()

        this.$store.commit("resetState")

        this.$router.push("/login")
      })
    },
    getUserInfo(){
      this.$axios.post("/getUserInfo").then(res =>{

        this.UserInfo = res.data.data

      })
    }
  },
  created() {

    this.getUserInfo()
  }
}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;

}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 0;


}

/*
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
*/

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-avatar {
  display: flex;
}
.el-submenu {

}
a {
  text-decoration: none;
}

</style>