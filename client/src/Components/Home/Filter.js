import React from "react";
import Page from "./Page";

function Filter({ setSearch, setStatus, page, limit, total, setPage }) {
  const totalPages = Math.ceil(total / limit);

  const handleOnclickPage = (page) => {
    setPage(page + 1);
  };

  return (
    <div className="p-3">
      <div className="flex items-center gap-2">
        <label htmlFor="">Search:</label>
        <div className="w-[400px] h-[50px] rounded-lg shadow-md shadow-gray-500 flex">
          <input
            type="text"
            className="outline-none h-full w-full px-2 rounded-lg"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="p-2 bg-green-600 text-white rounded-lg rounded-tl-none rounded-bl-none">
            Search
          </button>
        </div>
        <p>Page:</p>
        {totalPages > 0 &&
          [...Array(totalPages)].map((val, index) => (
            <Page key={index} page={page} onClick={() => handleOnclickPage(index)}>
              {index + 1}
            </Page>
          ))}
        <label htmlFor="">Status:</label>
        <select
          name=""
          id=""
          className="outline-none border"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Learned">Learned</option>
          <option value="Learning">Learning</option>
          <option value="To learn">To learn</option>
        </select>
        <label htmlFor="">Date:</label>
        <select name="" id="" className="outline-none border">
          <option value="">desc</option>
          <option value="">asc</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
