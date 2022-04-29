import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ({
    state: {
        menuList: [],
        permList: [],

        hasRoutes: false,

        editableTabsValue: 'index', //默认首页
        editableTabs: [{
            title: '首页',
            name: 'index',
        }]
    },
    getters: {},
    mutations: {

        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, perms) {
            state.permList = perms
        },
        changeRouteStatus(state, hasRoutes) {
            state.hasRoutes = hasRoutes
        },

        addMenu(state, tab) {

            let index = state.editableTabs.findIndex(e => e.name === tab.name)

            if (index === -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name,
                });
            }

            state.editableTabsValue = tab.name;
        },
        resetState: (state) => {
            state.menuList = []
            state.permList = []

            state.hasRoutes = false

            state.editableTabsValue = 'index' //默认首页
            state.editableTabs = [{
                title: '首页',
                name: 'index',
            }]

        }

    },
    actions: {}
})
