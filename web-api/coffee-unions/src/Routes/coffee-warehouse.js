const router = require("express").Router();

const {
    addNewWarehouse,
    updateWarehouse,
    removeWarehouse,
    getWarehouse,
    getAllWarehouse
} = require('../controllers/coffee-warehouse');

const { protect } = require('../middleware/auth');

router.route("/get-warehouse/:id").get(protect, getWarehouse);
router.route("/get-all-warehouse").get(protect, getAllWarehouse);
router.route("/add-new-warehouse").post(protect, addNewWarehouse);
router.route("/update-warehouse").put(protect, updateWarehouse);
router.route("/delete-warehouse/:id").delete(protect, removeWarehouse);

module.exports = router;