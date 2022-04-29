<template>

  <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" @tab-click="ClickTab">
    <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>

</template>

<script>
export default {
  name: "Tabs",
  data() {
    return {
      /*editableTabsValue: this.$store.state.editableTabsValue,
      editableTabs: this.$store.state.editableTabs,
      tabIndex: this.$store.state.tabIndex*/
    }
  },
  computed: {
    editableTabsValue:{
      get(){
        return this.$store.state.menus.editableTabsValue
      },
      set(val){
        this.$store.state.menus.editableTabsValue = val
      }
    },
    editableTabs: {
      get(){
        return this.$store.state.menus.editableTabs
      },
      set(val) {
        this.$store.state.menus.editableTabs = val
      }
    },
    tabIndex: {
      get(){
        return this.$store.state.menus.tabIndex
      },
      set(val){
        this.$store.state.menus.tabIndex = val
      }
    }

  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;

        if (targetName === "index"){
          return
        }
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);

        this.$router.push({name: activeName})

      }
    },
    ClickTab(target){
      this.$router.push({name: target.name})
    }
  }
}
</script>

<style scoped>

</style>