import { Popconfirm } from "antd";
import React from "react";

function Post({ url, status, title, handleUpdate, handleDelete }) {
  return (
    <div className=" shadow-gray-500 shadow-md rounded-md">
      <div className="h-[250px]">
        <img src={url} alt="" className="rounded-t-md h-full object-fill w-full" />
      </div>
      <div className="p-3">
        <p
          className={`
          ${status === "TO LEARN" && "text-green-500"} 
          ${status === "LEARNING" && "text-blue-500"} 
          ${status === "LEARNED" && "text-red-500"} 
          font-medium`}
        >
          {status}
        </p>
        <p className="pt-3">{title}</p>
      </div>
      <div className="p-3 flex gap-3">
        <button
          className="bg-blue-500 p-3 rounded-md text-white hover:bg-blue-400 "
          onClick={handleUpdate}
        >
          Edit
        </button>
        <Popconfirm
          title="Delete"
          description="Are you sure to delete this post?"
          style={{ background: "red" }}
          onConfirm={handleDelete}
        >
          <button
            type="primary"
            className="p-3 rounded-md cursor-pointer text-white bg-red-500 hover:bg-red-400"
          >
            Delete
          </button>
        </Popconfirm>
        <button className="bg-green-500 p-2 rounded-md text-white hover:bg-green-400">View</button>
      </div>
    </div>
  );
}

export default Post;
