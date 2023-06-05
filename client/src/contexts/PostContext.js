import React, { createContext, useReducer } from "react";
import postReducer, { initState } from "../reducers/post/reducer";
import axios from "axios";
import { apiUrl } from "./constants";
import setAuthToken from "../utils/setAuthToken";
import { add_post, delete_post, get_posts, update_post } from "../reducers/post/actions";

export const PostContext = createContext();

function PostContextProvider({ children }) {
  const [postSate, dispatch] = useReducer(postReducer, initState);

  // getPosts
  const getPosts = async (query) => {
    setAuthToken(localStorage["auth_token"]);
    const { page, status, searchString, sort } = query;

    try {
      const res = await axios.get(
        `${apiUrl}/posts/?page=${page}&status=${status}&searchString=${searchString}`
      );
      if (res?.data?.success) {
        dispatch(get_posts({ posts: res?.data?.posts, postsLoading: false }));
        return res;
      }
    } catch (error) {
      return error;
    }
  };

  // addPost
  const addPost = async (postData) => {
    setAuthToken(localStorage["auth_token"]);
    try {
      const res = await axios.post(`${apiUrl}/posts/create`, postData);
      if (res.data.success) {
        dispatch(add_post({ post: res?.data?.post, postsLoading: false }));
        return res;
      }
    } catch (error) {
      return error;
    }
  };

  // updatePost
  const updatePost = async (id, updateData) => {
    setAuthToken(localStorage["auth_token"]);
    try {
      const res = await axios.put(`${apiUrl}/posts/update/${id}`, updateData);
      if (res?.data?.success) {
        dispatch(update_post({ post: res?.data?.post, postsLoading: false }));
        return res;
      }
    } catch (error) {
      return error;
    }
  };

  // deletePost
  const deletePost = async (id) => {
    setAuthToken(localStorage["auth_token"]);
    try {
      const res = await axios.delete(`${apiUrl}/posts/delete/${id}`);
      if (res?.data?.success) {
        dispatch(delete_post({ post: res?.data?.post, postsLoading: false }));
        return res;
      }
    } catch (error) {
      return error;
    }
  };

  const values = {
    postSate,
    getPosts,
    addPost,
    updatePost,
    deletePost,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
}

export default PostContextProvider;
