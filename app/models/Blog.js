const mongoose = require("mongoose");
const BlogSchema = require("../../database/schemas/BlogSchema.js");

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
