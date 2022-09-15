const router = require("express").Router;
const { 
    createPost, 
    getAllPost,
    deletePost,
    getSinglePost,
    updatePost,
} = require("./post.controller");
const {authRequired} = require("../middlewares/authRequired")

const postRouter = router();

postRouter.route("/").all(authRequired).get(getAllPost).post(createPost);
postRouter
.route("/:postId")
.all(authRequired)
.get(getSinglePost)
.patch(updatePost)
.delete(deletePost)

module.exports = postRouter;
