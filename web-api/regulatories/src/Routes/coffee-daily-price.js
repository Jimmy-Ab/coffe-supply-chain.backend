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

router.route("/set-coffee-daily-price").post(setCoffeeDailyPrice);
router.route("/get-coffee-price-per-year/:date").get(getPricePerYear);
router.route("/get-coffee-price-per-month/:date").get(getPricePerYearAndMonth);
router.route("/get-today-coffee-price/:date").get(getTodayPrice);
router.route("/get-all-daily-price").get(getAllDailyPrice);
router.route("/update-coffee-daily-price").put(updateCoffeeDailyPrice);
router.route("/delete-coffee-daily-price/:date/:id").delete(deleteCoffeeDailyPrice);

module.exports = router;