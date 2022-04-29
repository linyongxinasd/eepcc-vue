const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}

Mock.mock('/vc.jpg', 'get', () => {

    Result.data = {
        token: Random.string(32),
        codeImage: Random.dataImage('120x40', 'p7n5w')
    }
    return Result
})

Mock.mock('/doLogin', 'post', () => {

    // 无法在header中传入数jwt

    // Result.code = 400
    // Result.msg = "验证码错误"

    return Result
})

Mock.mock('/getUserInfo', 'post', () => {

    // 无法在header中传入数jwt

    // Result.code = 400
    // Result.msg = "验证码错误"

    Result.data = {
        id: "1",
        username: "yida",
        avatar: "https://www.baidu.com/s?wd=Vue.js&tn=88093251_18_hao_pg&usm=2&ie=utf-8&rsv_pq=8229b9ac0002259a&oq=vue-cli&rsv_t=f2e9h8FMJ%2FwaX%2FMZc%2FCW2SMXZmgkCWWFhodMcNSKwqUY4qzz26clvWpnruMUW59uPUKsYA14f%2B3B&rsv_cq=&rsv_dl=0_right_recommends_merge_21102&euri=081b264a606a11e6a6da008cfacfb47c"
    }
    return Result
})

Mock.mock('/logout', 'post', () => {

    return Result
})

// 获取用户菜单以及权限接口
Mock.mock('/sys/menu/nav', 'get', () => {

    let nav = [
        {
            name: 'SysManga',
            title: '系统管理',
            icon: 'el-icon-s-operation',
            component: '',
            path: '',
            children: [
                {
                    name: 'sysUser',
                    title: '用户管理',
                    icon: 'el-icon-s-custom',
                    path: '/sys/users',
                    component: 'sys/User',
                    children: []
                },
                {
                    name: 'sysRole',
                    title: '角色管理',
                    icon: 'el-icon-rank',
                    path: '/sys/roles',
                    component: 'sys/Role',
                    children: []
                },
                {
                    name: 'sysMenu',
                    title: '菜单管理',
                    icon: 'el-icon-menu',
                    path: '/sys/menus',
                    component: 'sys/Menu',
                    children: []
                }
            ]
        },
        {
            name: 'sysTools',
            title: '系统工具',
            icon: 'el-icon-s-tools',
            path: '',
            component: '',
            children: [
                {
                    name: 'sysDict',
                    title: '数字字典',
                    icon: 'el-icon-s-order',
                    path: '/sys/dicts',
                    component: '',
                    children: []
                },
            ]
        }
    ]

    let authoritys = ['sys:user:list', "sys:user:save", "sys:user:delete"]

    Result.data = {
        nav: nav,
        authoritys: authoritys
    }

    return Result
})


Mock.mock('/sys/menu/list', 'get', () => {
    let menus = [

        {
            id: 1,
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 1
        }, {
            id: 2,
            date: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1517 弄',
            status: 0
        }, {
            id: 3,
            date: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
                id: 31,
                date: '2016-05-01',
                name: '王小虎31',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                id: 32,
                date: '2016-05-01',
                name: '王小虎32',
                address: '上海市普陀区金沙江路 1519 弄'
            }]
        }, {
            id: 4,
            date: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 1516 弄'
        }
    ]

    Result.data = menus

    return Result
})

Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {

    Result.data = {
        "id": 3,
        "statu": 1,
        "parentId": 1,
        "name": "角色管理",
        "path": "/sys/roles",
        "perms": "sys:role:list",
        "component": "sys/Role",
        "type": 1,
        "icon": "el-icon-rank",
        "orderNum": 2,
        "children": []
    }

    return Result
})

Mock.mock(RegExp('/sys/menu/*'), 'post', () => {

    return Result
})

Mock.mock(RegExp('/sys/role/*'), 'post', () => {

    return Result
})

Mock.mock(RegExp('/sys/role/list*'), 'get', () => {

    Result.data = {
        "records": [
            {
                "id": 3,
                "created": "2021-01-04T10:09:14",
                "updated": "2021-01-30T08:19:52",
                "statu": 1,
                "name": "普通用户",
                "code": "normal",
                "remark": "只有基本查看功能",
                "menuIds": []
            },
            {
                "id": 6,
                "created": "2021-01-16T13:29:03",
                "updated": "2021-01-17T15:50:45",
                "statu": 1,
                "name": "超级管理员",
                "code": "admin",
                "remark": "系统默认最高权限，不可以编辑和任意修改",
                "menuIds": []
            }
        ],
        "total": 2,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 1
    }

    return Result

})


Mock.mock('/getCourse', 'get', () => {
    let course = [

        {

        }, {
            id: 2,
            date: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1517 弄',
            status: 0
        }, {
            id: 3,
            date: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
                id: 31,
                date: '2016-05-01',
                name: '王小虎31',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                id: 32,
                date: '2016-05-01',
                name: '王小虎32',
                address: '上海市普陀区金沙江路 1519 弄'
            }]
        }, {
            id: 4,
            date: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 1516 弄'
        }
    ]

    Result.data = course

    return Result
})




