import Exception from "../exceptions/Exception.js";
import mongoose from "mongoose";
import Post from "../models/Post.js";

class PostController {
  // [POST] /posts/create
  async create(req, res, next) {
    try {
      const data = {
        ...req.body,
        status: req.body.status ? req.body.status : "TO LEARN",
        user: req.userId,
      };
      const newPost = await Post.create(data);
      res.status(201).json({
        success: true,
        post: newPost,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // [PUT] /posts/update/:id
  async update(req, res, next) {
    try {
      const data = {
        ...req.body,
        status: req.body.status ? req.body.status : "TO LEARN",
      };
      const updatePost = await Post.findOneAndUpdate(
        // conditions
        { _id: req.params.id, user: req.userId },
        // data
        data,
        // return value updated
        { new: true }
      );
      if (!updatePost) throw new Exception("Failed to update post");
      res.status(201).json({
        success: true,
        post: updatePost,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // [DELETE] /posts/delete/:id
  async delete(req, res, next) {
    try {
      const deletePost = await Post.findOneAndDelete(
        // conditions
        { _id: req.params.id, user: req.userId },
        // return value updated
        { new: true }
      );
      if (!deletePost) throw new Exception("Failed to delete post");
      res.status(201).json({
        success: true,
        post: deletePost,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // [GET] /posts
  async show(req, res, next) {
    let { page = 1, limit = 2, searchString = "", status = "All", sort = "title" } = req.query;
    limit = limit >= 10 ? 10 : parseInt(limit);
    sort = req.query.sort ? req.query.sort.split(",") : [sort];
    status = status === "All" ? "" : status;
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = parseInt(sort[1]);
    } else {
      sortBy[sort[0]] = 1;
    }
    console.log(sort);
    console.log(page);
    console.log(sortBy);

    try {
      // const posts = await Post.find({ user: req.userId }).populate("user", ["name"]);
      const allPosts = await Post.aggregate([
        {
          $match: {
            $and: [
              { user: new mongoose.Types.ObjectId(req.userId) },
              {
                $and: [
                  { title: { $regex: new RegExp(searchString, "i") } },
                  { status: { $regex: new RegExp(status, "i") } },
                ],
              },
            ],
          },
        },
        {
          $sort: {
            ...sortBy,
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ]);
      const totalPosts = await Post.countDocuments({
        user: new mongoose.Types.ObjectId(req.userId),
        title: { $regex: new RegExp(searchString, "i") },
        status: { $regex: new RegExp(status, "i") },
      });
      res.status(200).json({
        page,
        limit,
        status,
        searchString,
        totalPosts,
        posts: allPosts,
        success: true,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new PostController();
