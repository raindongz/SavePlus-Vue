import axios from "axios";
import {v4} from 'uuid'

const baseUrl = "/api"

/**
 * 添加trace id
 */
axios.interceptors.request.use(function (config) {
    config.headers.set('X-Trace-Id', v4())
    return config
}, function (error) {
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
        url: baseUrl + "/post/infoNoAuth",
        params: {
            id: postId
        },
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

/**
 * 获取商品目录
 * 
 * @returns {Promise<void>}
 */
export async function getProductIntest() {
    return axios({
        method: "get",
        url: baseUrl + "/user/viewMyInterestList",
    })
}