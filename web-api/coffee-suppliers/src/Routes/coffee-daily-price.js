const router = require("express").Router();

const {

    getTodayPrice,
    getPricePerYear,
    getPricePerYearAndMonth,
    getAllDailyPrice,

} = require("../controllers/coffee-daily-price");
const { protect } = require('../middleware/auth');

router.route("/get-coffee-price-per-year/:date").get(getPricePerYear);
router.route("/get-coffee-price-per-month/:date").get(getPricePerYearAndMonth);
router.route("/get-today-coffee-price/:date").get(getTodayPrice);
router.route("/get-all-daily-price").get(getAllDailyPrice);

module.exports = router;