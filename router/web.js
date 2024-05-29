const express = require("express");
const router = express.Router();
const BlogController = require("../app/controllers/BlogController.js");
const {
  BlogCreateValidator,
  validatorMessages,
} = require("../app/validations/BlogCreateValidator.js");

router.get("/", BlogController.index);
router.get("/blog/create", BlogController.create);
router.post(
  "/blog/store",
  BlogCreateValidator,
  validatorMessages,
  BlogController.store
);
router.get("/blog/:id", BlogController.show);
router.get("/blog/:id/edit", BlogController.edit);
router.post("/blog/update", BlogController.update);
router.post("/blog/:id/destroy", BlogController.destroy);

router.use((req, res) => {
  res.status(404).render("errors/404", {
    title: "404 Page",
  });
});

module.exports = router;
