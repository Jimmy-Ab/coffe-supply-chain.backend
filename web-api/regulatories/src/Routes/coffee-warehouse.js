const router = require("express").Router();

const {
    addNewWarehouse,
    updateWarehouse,
    removeWarehouse,
    getWarehouse,
    getAllWarehouse
} = require('../controllers/coffee-warehouse');


router.route("/get-warehouse/:id").get(getWarehouse);
router.route("/get-all-warehouse").get(getAllWarehouse);
router.route("/add-new-warehouse").post(addNewWarehouse);
router.route("/update-warehouse").put(updateWarehouse);
router.route("/delete-warehouse/:id").delete(removeWarehouse);

module.exports = router;