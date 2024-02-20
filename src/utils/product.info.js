import axios from "axios";
import { v4 } from "uuid";

const baseUrl = "https://saveplus.link";

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
      postId: postId,
    },
  });
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
      page_num: 1,
    },
  });
}
