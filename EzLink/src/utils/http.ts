import axios from "axios";
import { format } from 'date-fns';

export default function http() {

    let userInfo = localStorage.getItem("userInfo")
    let token = JSON.parse(userInfo || '{}').token;
    // 创建一个 Axios 实例
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080/api", // 使用环境变量作为基础URL
    });

    axiosInstance.interceptors.request.use(

        config => {
            // 打印请求被发送前的日志
            // config.headers["jwtTokenSetting"] = token;
            config.headers.Authorization = `Bearer ${token}`;

            const data = config.data;

            // 递归函数来格式化对象中的所有日期
            function formatDateFields(obj: any) {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const value = obj[key];
                        if (value instanceof Date) {
                            // 格式化日期，这里使用 'yyyy-MM-dd'T'HH:mm:ss' 作为例子
                            obj[key] = format(value, "yyyy-MM-dd'T'HH:mm:ss");
                        } else if (typeof value === 'object' && value !== null) {
                            formatDateFields(value); // 递归检查
                        }
                    }
                }
            }

            // 如果数据是对象，则尝试格式化
            if (typeof data === 'object' && data !== null) {
                formatDateFields(data);
            }

            // 不要忘了返回修改后的配置
            return config;
        },
        error => {
            // 处理请求错误
            return Promise.reject(error);
        }
    );

    // 添加响应拦截器
    axiosInstance.interceptors.response.use(
        response => {
            // 返回修改后的response对象
            return response;
        },
        error => {

            if (error.response && error.response.status === 401) {
                // 发送自定义事件

                window.dispatchEvent(new CustomEvent("unauthorized"));
            }
            // 错误处理
            // 如果需要，也可以在这里返回自定义的结构
            return Promise.reject(error);
        }
    );

    return axiosInstance
}