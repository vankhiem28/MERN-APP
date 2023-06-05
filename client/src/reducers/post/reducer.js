export const initState = {
  posts: [],
  postsLoading: true,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload.posts,
        postsLoading: action.payload.postsLoading,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload.post],
        postsLoading: action.payload.postsLoading,
      };
    case "UPDATE_POST":
      const newPost = state.posts.map((post) =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
      return {
        ...state,
        posts: newPost,
        postsLoading: action.payload.postsLoading,
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.post._id),
        postsLoading: action.payload.postsLoading,
      };
    default:
      return state;
  }
};

export default postReducer;
