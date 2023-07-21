'use strict'

class NaturalSupplyCoffeeProcessingWarehousngInd {
    constructor() {
        this.id = "";
        this.name = '';
        this.machineSpec = '';
        this.owner = '';
        this.address = '';
        this.size = '';
        this.dringAreaSize = '';
        this.warehouseSize = '';
        this.hasWeightingScale = '';
        this.hasMoistureCalibrator = '';
        this.startDate = '';
        this.endDate = '';
        this.givenBy = '';
        this.givenDate = '';
        this.status = ''; //granted, revoked
        this.latitude = '';
        this.longitude = '';
    }

    static from(bufferOrJson) {
        if (Buffer.isBuffer(bufferOrJson)) {
            if (!bufferOrJson.length) {
                return;
            }
            bufferOrJson = JSON.parse(bufferOrJson.toString('utf-8'));
        }
        const ind = new NaturalSupplyCoffeeProcessingWarehousngInd();
        ind.id = bufferOrJson.id;
        ind.txId = bufferOrJson.txId;
        ind.name = bufferOrJson.name;
        ind.owner = bufferOrJson.owner;
        ind.machineSpec = bufferOrJson.machineSpec;
        ind.address = bufferOrJson.address;
        ind.size = bufferOrJson.size;
        ind.dringAreaSize = bufferOrJson.dringAreaSize;
        ind.warehouseSize = bufferOrJson.warehouseSize;
        ind.startDate = bufferOrJson.startDate;
        ind.endDate = bufferOrJson.endDate;
        ind.givenBy = bufferOrJson.givenBy;
        ind.givenDate = bufferOrJson.givenDate;
        ind.status = bufferOrJson.status;
        ind.latitude = bufferOrJson.latitude;
        ind.longitude = bufferOrJson.longitude;
        return ind;
    }
    toJson() {
        return JSON.stringify(this);
    }
    toBuffer() {
        return Buffer.from(this.toJson());
    }
}

module.exports = NaturalSupplyCoffeeProcessingWarehousngInd;