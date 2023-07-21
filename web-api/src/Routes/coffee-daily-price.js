const router = require("express").Router();

const {
    setCoffeeDailyPrice,
    getTodayPrice,
    getPricePerYear,
    getPricePerYearAndMonth,
    getAllDailyPrice,
    updateCoffeeDailyPrice,
    deleteCoffeeDailyPrice
} = require("../controllers/coffee-daily-price");
const { protect } = require('../middleware/auth');

router.route("/set-coffee-daily-price").post(protect, setCoffeeDailyPrice);
router.route("/get-coffee-price-per-year/:date").get(getPricePerYear);
router.route("/get-coffee-price-per-month/:date").get(getPricePerYearAndMonth);
router.route("/get-today-coffee-price/:date").get(getTodayPrice);
router.route("/get-all-daily-price").get(getAllDailyPrice);
router.route("/update-coffee-daily-price").put(protect, updateCoffeeDailyPrice);
router.route("/delete-coffee-daily-price/:date/:id").delete(protect, deleteCoffeeDailyPrice);

module.exports = router;