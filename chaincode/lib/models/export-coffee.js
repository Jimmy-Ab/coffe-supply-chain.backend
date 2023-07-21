'use strict'

class ExportCoffee {
    constructor() {
        this.bagId = '';
        this.bagSize = '';
        this.supplyCoffeeBatchNumber = '';
        this.coffeeType = '';
        this.batchNumber = '';
        this.measurmentUnit = '';
        this.sellingPrice = 0;
        this.currency = '';
        this.productionDate = '';
        this.productionPlace = '';
        this.origin = [];
        this.owner = '';
        this.grade = '';
        this.gradeBy = '';
        this.gradeDate = '';
        this.warehouseId = '';
        this.traceability = [];
        this.supplyCoffee = [];
        this.status = ''; //prosessed and not ptossessed
    }


    static from(bufferOrJson) {
        if (Buffer.isBuffer(bufferOrJson)) {
            if (!bufferOrJson.length) {
                return;
            }

            bufferOrJson = JSON.parse(bufferOrJson.toString('utf-8'));
        }

        const result = new ExportCoffee();
        result.bagId = bufferOrJson.bagId;
        result.bagSize = bufferOrJson.bagSize;
        result.coffeeType = bufferOrJson.coffeeType;
        result.supplyCoffeeBatchNumber = bufferOrJson.supplyCoffeeBatchNumber;
        result.batchNumber = bufferOrJson.batchNumber;
        result.measurmentUnit = bufferOrJson.measurmentUnit;
        result.sellingPrice = bufferOrJson.sellingPrice;
        result.currency = bufferOrJson.currency;
        result.productionDate = bufferOrJson.productionDate;
        result.productionPlace = bufferOrJson.productionPlace;
        result.origin = bufferOrJson.origin;
        result.owner = bufferOrJson.owner;
        result.grade = bufferOrJson.grade;
        result.gradeBy = bufferOrJson.gradeBy;
        result.gradeDate = bufferOrJson.gradeDate;
        result.warehouseId = bufferOrJson.warehouseId;
        result.traceability = bufferOrJson.traceability;
        result.supplyCoffee = bufferOrJson.supplyCoffee;
        result.status = bufferOrJson.status;
        return result;
    }

    toJson() {
        return JSON.stringify(this);
    }

    toBuffer() {
        return Buffer.from(this.toJson());
    }
}

module.exports = ExportCoffee;