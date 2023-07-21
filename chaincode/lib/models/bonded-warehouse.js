'use strict'

class BondedWarehouse {
    constructor() {
        this.txId = '';
        this.name = '';
        this.owner = '';
        this.address = '';
        this.size = '';
        this.hasWeightingScale = false;
        this.hasMoistureCalibrator = false;
        this.hasFireExtinguisher = false;

        this.startDate = '';
        this.endDate = '';
        this.givenBy = '';
        this.givenDate = '';
        this.status = ''; //granted, revoked
    }


    static from(bufferOrJson) {
        if (Buffer.isBuffer(bufferOrJson)) {
            if (!bufferOrJson.length) {
                return;
            }
            bufferOrJson = JSON.parse(bufferOrJson.toString('utf-8'));
        }
        const ind = new BondedWarehouse();
        ind.txId = bufferOrJson.id;
        ind.name = bufferOrJson.name;
        ind.owner = bufferOrJson.owner;
        ind.address = bufferOrJson.address;
        ind.size = bufferOrJson.size;
        ind.hasWeightingScale = bufferOrJson.hasWeightingScale;
        ind.hasMoistureCalibrator = bufferOrJson.hasMoistureCalibrator;
        ind.hasFireExtinguisher = bufferOrJson.hasFireExtinguisher;

        ind.startDate = bufferOrJson.startDate;
        ind.endDate = bufferOrJson.endDate;
        ind.givenBy = bufferOrJson.givenBy;
        ind.givenDate = bufferOrJson.givenDate;
        ind.status = bufferOrJson.status;
        return ind;
    }
    toJson() {
        return JSON.stringify(this);
    }
    toBuffer() {
        return Buffer.from(this.toJson());
    }
}

module.exports = BondedWarehouse;