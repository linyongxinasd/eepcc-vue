<template>
  <el-menu
      :default-active="this.$store.state.menus.editableTabsValue"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <router-link to="/index">
      <el-menu-item index="index" @click="addTab({name: 'index',title: '首页'})">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
    </router-link>
    <el-submenu :index="m.name" v-for="(m,index) in menuList" :key="index" >
      <template slot="title">
        <i :class="m.icon"></i>
        <span>{{m.title}}</span>
      </template>
      <router-link :to="item.path" v-for="(item, index) in m.children" :key="index">
        <el-menu-item :index="item.name" @click="addTab(item)">
          <template>
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
        </el-menu-item>
      </router-link>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  methods: {

    addTab(item) {
      this.$store.commit("addMenu",item)
    }
  },
  computed:  {
    menuList: {
      get() {
        return this.$store.state.menus.menuList
      }
    }
  },
}
</script>

<style scoped>

.el-menu-vertical-demo {
  height: 100vh;
}

a {
  text-decoration: none;
}

</style>