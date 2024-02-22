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
  try {
    const response = await axios.post(baseUrl + "/post", body);
    return response;
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

/**
 * update post
 */
export async function updatePost(body) {
  try {
    const response = await axios.post(baseUrl + "/post/update", body);
    return response;
  } catch (error) {
    console.error("Error update post:", error);
  }
}

/**
 * get post info
 */
export async function getPostInfo(postId) {
  try {
    const response = await axios.get(baseUrl + "/post/infoNoAuth", {
      params: {
        id: postId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error getPostInfo post:", error);
  }
}
