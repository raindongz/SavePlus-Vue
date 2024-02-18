import axios from "axios";
import {v4} from 'uuid'

const baseUrl = "/api"

/**
 * 添加trace id
 */
axios.interceptors.request.use(function (config) {
    config.headers.set('X-Trace-Id', v4())
    config.withCredentials = true
    return config
})

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
        withCredentials: false
    })
}
