import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import Index from "../views/Index"

import User from "../views/sys/User"
import Role from "../views/sys/Role"
import Menu from "../views/sys/Menu"
import Course from "@/views/sys/Course";
import CourseGrade from "../views/sys/CourseGrade"
import Grade from "@/views/sys/Grade";
import ScatterPlot from "@/views/sys/ScatterPlot";
import Upload from "@/views/sys/Upload";
import UserCenter from "../views/UserCenter";


import axios from "../axios";
import store from "../store"


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/sys/users',
                name: 'sysUser',
                component: User
            },
            {
                path: '/sys/roles',
                name: 'sysRole',
                component: Role
            },
            {
                path: '/sys/menus',
                name: 'sysMenu',
                component: Menu
            },
            {
                path: '/sys/center',
                name: 'userCenter',
                component: UserCenter
            },
            {
                path: '/sys/course',
                name: 'sysCourse',
                component: Course
            },
            {
                path: '/sys/courseGrade',
                name: 'sysCourseGrade',
                component: CourseGrade
            },
            {
                path: '/sys/grade',
                name: 'sysGrade',
                component: Grade
            },
            {
                path: '/sys/scatterPlot',
                name: 'sysScatterPlot',
                component: ScatterPlot
            },
            {
                path: '/sys/upload',
                name: 'sysUpload',
                component: Upload
            },

            {
                path: '/index',
                name: 'index',
                component: Index
            }
        ]
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    }
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/!* webpackChunkName: "about" *!/ '../views/AboutView.vue')
    }*/
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {


    let hasRoute = store.state.menus.hasRoutes

    let token = localStorage.getItem("token")

    if (to.path == '/login') {
        next()

    } else if (!token) {
        next({path: '/login'})


    } else if (token && !hasRoute) {
        axios.get("/sys/menu/nav", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {

            console.log("res.data.data==>")

            console.log(res.data.data)

            // ??????menuList
            store.commit("setMenuList", res.data.data.nav)

            // ??????????????????
            store.commit("setPermList", res.data.data.authoritys)
            console.log("store.state.menus.menuList==>")
            console.log(store.state.menus.menuList)

            // ??????????????????
            let newRoutes = router.options.routes

            res.data.data.nav.forEach(menu => {
                if (menu.children) {
                    menu.children.forEach(e => {

                        // ????????????
                        let route = menuToRoute(e)

                        // ?????????????????????????????????
                        if (route) {
                            newRoutes[0].children.push(route)
                        }

                    })
                }
            })

            console.log("newRoutes")
            console.log(newRoutes)
            router.addRoutes(newRoutes)

            hasRoute = true
            store.commit("changeRouteStatus", hasRoute)
        })
    }


    next()
})// ??????????????????
const menuToRoute = (menu) => {

    if (!menu.component) {
        return null
    }

    let route = {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title
        }
    }
    route.component = () => import('@/views/' + menu.component + '.vue')

    return route
}
export default router
