import axios from "axios";
import { v4 } from "uuid";

const baseUrl = "/api";

/**
 * 添加trace id
 */
axios.interceptors.request.use(
  function (config) {
    config.headers.set("X-Trace-Id", v4());
    return config;
  },
  function (error) {
    // 请求错误时做些什么
    return Promise.reject(error);
  }
);

/**
 * create post
 */
export async function createPost(body) {
  return axios({
    method: "post",
    url: baseUrl + "/post",
    body: body,
  });
}
