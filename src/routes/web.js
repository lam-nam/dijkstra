const express = require("express"); // this is a import line
const router = express.Router(); // this is a init line

const {
  getHomePage,
  getAddVertex,
  getFindPath,
  getReset,
} = require("../controllers/PageControllers");

router.get("/", getHomePage);

router.post("/add-vertex", getAddVertex);

router.post("/find-path", getFindPath);

router.post("/reset-graph", getReset);
module.exports = router;
