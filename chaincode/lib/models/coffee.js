'use strict';

class Coffee {
    constructor() {
        this.bagId = '';
        this.bagSize = '';
        this.coffeeCherryBatchNo = '';
        this.coffeeType = '';
        this.batchNumber = '';
        this.measurmentUnit = '';
        this.sellingPrice = 0;
        this.currency = '';
        this.productionDate = '';
        this.productionPlace = '';
        this.owner = '';
        this.grade = '';
        this.gradeBy = '';
        this.gradeDate = '';
        this.warehouseId = '';
    }

    static from(bufferOrJson) {
        if (Buffer.isBuffer(bufferOrJson)) {
            if (!bufferOrJson.length) {
                return;
            }

            bufferOrJson = JSON.parse(bufferOrJson.toString('utf-8'));
        }

        const result = new Coffee();
        result.bagId = bufferOrJson.bagId;
        result.bagSize = bufferOrJson.bagSize;
        result.coffeeType = bufferOrJson.coffeeType;
        result.coffeeCherryBatchNo = bufferOrJson.coffeeCherryBatchNo;
        result.batchNumber = bufferOrJson.batchNumber;
        result.measurmentUnit = bufferOrJson.measurmentUnit;
        result.sellingPrice = bufferOrJson.sellingPrice;
        result.productionDate = bufferOrJson.productionDate;
        result.productionPlace = bufferOrJson.productionPlace;
        result.owner = bufferOrJson.owner;
        result.grade = bufferOrJson.grade;
        result.gradeBy = bufferOrJson.gradeBy;
        result.gradeDate = bufferOrJson.gradeDate;
        result.warehouseId = bufferOrJson.warehouseId
        return result;
    }

    toJson() {
        return JSON.stringify(this);
    }

    toBuffer() {
        return Buffer.from(this.toJson());
    }
}

module.exports = Coffee;
