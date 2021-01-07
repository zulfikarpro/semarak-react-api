const express = require("express");
const {
  regency,
  province,
  districts,
  villages,
} = require("../../../controllers/geo/IndoController");
const router = express.Router();

router.get("/province", province);
router.get("/regency", regency); //butuh province_id
router.get("/district", districts); //butuh regency_id
router.get("/village", villages); //butuh district_id

module.exports = router;
