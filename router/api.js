const express = require("express");
let router = express.Router();
const {
  hotComic,
  newComic,
  trendingComic,
  detailComic,
  readComic,
  projectComic,
  mirrorComic,
  searchComic,
} = require("../controller/comicController.js");

router.get("/hots", hotComic);
router.get("/updates", newComic);
router.get("/trendings", trendingComic);
router.get("/detail/:slug", detailComic);
router.get("/read/:slug/:chapter", readComic);
router.get("/project/page/:page", projectComic);
router.get("/mirror/page/:page", mirrorComic);
router.get("/search/:query", searchComic);

module.exports = router;
