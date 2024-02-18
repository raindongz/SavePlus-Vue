import axios from "axios";
import {v4} from 'uuid'

const baseUrl = "http://saveplus.link"

/**
 * 添加trace id
 */
axios.interceptors.request.use(function (config) {
    config.headers.set('X-Trace-Id', v4())
    config.withCredentials = true
    return config
},function (error) {
    // 请求错误时做些什么
    return Promise.reject(error);
});

/**
 * 获取商品的详细信息
 * @param postId
 * @returns {Promise<void>}
 */
export async function getProductDetailInfo(postId) {
    return axios({
        method: "get",
        url: baseUrl + "/posts/getPostInfo",
        params: {
            postId: postId
        }
    })
}


/**
 * 获取商品目录
 * @param pageNum
 * @returns {Promise<void>}
 */
export async function getProductList(pageNum) {
    return axios({
        method: "get",
        url: baseUrl + "/post/list",
        params: {
            page_size: 10,
            page_num: pageNum,
        }
    })
}
