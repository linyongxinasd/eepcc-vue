import axios from "axios";
import router from "./router";
import Element from "element-ui"
axios.defaults.baseURL = "http://localhost:8081"

/*全局axios异常处理*/
const request = axios.create({
    timeout: 1000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token")  //给请求带上请求头token
    return config
})

request.interceptors.response.use(
    response => {

        console.log("response ->" + response)

        let res = response.data

        if (response.data.msg === '登录失败:Bad credentials'){
            response.data.msg = '登录失败:密码错误'
        }
        if (res.statusCode!=null){
            if (res.statusCode === 200) {
                return response
            } else {
                Element.Message.error(res.msg ? res.msg : '系统异常' )
                return Promise.reject(response.data.msg)
            }
        }
        return response
    },
    error => {

        console.log(error)

        if (error.response.data) {
            error.massage = error.response.data.msg
        }

        if (error.response.status === 401) {
            router.push("/login")
            /*Element.Message.error('权限不足')*/
            /*error.message = error.response.date.msg*/

        }

        Element.Message.error(error.massage, {duration: 1000})
        return Promise.reject(error)
    }
)

export default request