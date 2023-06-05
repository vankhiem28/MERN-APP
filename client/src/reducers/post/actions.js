const get_posts = (payload) => {
  return {
    type: "GET_POSTS",
    payload,
  };
};

const add_post = (payload) => {
  return {
    type: "ADD_POST",
    payload,
  };
};

const update_post = (payload) => {
  return {
    type: "UPDATE_POST",
    payload,
  };
};

const delete_post = (payload) => {
  return {
    type: "DELETE_POST",
    payload,
  };
};

export { get_posts, add_post, update_post, delete_post };
