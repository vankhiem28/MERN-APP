import { useContext, useEffect, useState } from "react";
import Filter from "./Filter";
import Navbar from "./Navbar";
import Post from "./Post";
import { PostContext } from "../../contexts/PostContext";
import { useCreatePostModal, useUpdatePostModal } from "../../zustand/useModalStore";
import { toast } from "react-toastify";
import CreateModal from "./modal/CreateModal";
import UpdateModal from "./modal/UpdateModal";
import { Spin } from "antd";

function Home() {
  const [updatePostData, setUpdatePostData] = useState({});
  const [idUpdatePost, setIdUpdatePost] = useState("");
  const postsData = useContext(PostContext);
  const createPostModal = useCreatePostModal();
  const updatePostModal = useUpdatePostModal();

  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState({ sort: "fi", order: 1 });
  const [obj, setObj] = useState({});
  const {
    postSate: { posts, postsLoading },
    getPosts,
    addPost,
    updatePost,
    deletePost,
  } = postsData;

  useEffect(() => {
    const Posts = async () => {
      const res = await getPosts({ page, searchString, status, sort });
      setObj(res.data);
    };
    Posts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchString, status, sort]);

  const handleOpenCreatePostModal = () => {
    createPostModal.openModal();
  };

  const handleSubmitCreatePost = async (values) => {
    const res = await addPost(values);
    if (!res?.data?.success) toast.error(res?.response?.data?.message);
    if (res?.data?.success) toast.success("Add post successfully");
    createPostModal.closeModal();
  };

  const handleUpdatePost = (id) => {
    const updatePost = posts.find((post) => post._id === id);
    setUpdatePostData(updatePost);
    setIdUpdatePost(id);
    updatePostModal.openModal();
  };

  const handleSubmitUpdatePost = async (values) => {
    const res = await updatePost(idUpdatePost, values);
    if (!res?.data?.success) toast.error(res?.response?.data?.message);
    if (res?.data?.success) toast.success("Update post successfully");
    updatePostModal.closeModal();
  };

  const handleDeletePost = async (id) => {
    const res = await deletePost(id);
    if (!res?.data?.success) toast.error(res?.response?.data?.message);
    if (res?.data?.success) toast.success("Delete post successfully");
  };

  return (
    <div>
      <CreateModal
        isModalOpen={createPostModal.isOpenModal}
        handleCancel={createPostModal.closeModal}
        handleSubmit={handleSubmitCreatePost}
      ></CreateModal>
      <UpdateModal
        isModalOpen={updatePostModal.isOpenModal}
        handleCancel={updatePostModal.closeModal}
        handleSubmit={handleSubmitUpdatePost}
        data={updatePostData}
      ></UpdateModal>
      <Navbar />
      <Filter
        setSearch={(value) => setSearchString(value)}
        setStatus={(value) => setStatus(value)}
        page={page}
        limit={obj.limit ? obj.limit : 0}
        total={obj.totalPosts ? obj.totalPosts : 0}
        setPage={(page) => setPage(page)}
      ></Filter>
      {postsLoading ? (
        <Spin className="flex justify-center items-center"></Spin>
      ) : (
        <div className="p-3 grid grid-cols-5 gap-3">
          {posts?.map((post) => {
            return (
              <Post
                key={post._id}
                status={post.status}
                title={post.title}
                url={post.url}
                handleUpdate={() => handleUpdatePost(post._id)}
                handleDelete={() => handleDeletePost(post._id)}
              />
            );
          })}
        </div>
      )}
      <div className="fixed bottom-2 right-2">
        <button
          className="text-white font-medium bg-red-700 p-3 rounded-full hover:bg-red-600"
          onClick={handleOpenCreatePostModal}
        >
          Add Post
        </button>
      </div>
    </div>
  );
}

export default Home;
