const setCoffeeDailyPrice = require('./setCoffeeDailyPrice');
const getTodayPrice = require('./getTodayPrice.js');
const getPricePerYear = require('./getPricePerYear');
const getPricePerYearAndMonth = require('./getPricePerYearAndMonth');
const getAllDailyPrice = require('./getAllDailyPrice');
const updateCoffeeDailyPrice = require('./updateCoffeeDailyPrice');
const deleteCoffeeDailyPrice = require('./deleteCoffeeDailyPrice')

module.exports = {
    setCoffeeDailyPrice,
    getTodayPrice,
    getPricePerYear,
    getPricePerYearAndMonth,
    getAllDailyPrice,
    updateCoffeeDailyPrice,
    deleteCoffeeDailyPrice
};