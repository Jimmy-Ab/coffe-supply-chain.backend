'use strict'

class CoffeeExportCertificate {
    constructor() {
        this.txId = '';
        this.givenFor = '';
        this.address = '';
        this.nationality = '';
        this.tinNumber = '';
        this.hasExportCoffeeProcessing = false;
        this.hasWeightingScale = false;
        this.hasMoistureCalibrator = false;
        this.warehouse = '';
        this.capital = '';
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
        const certs = new CoffeeExportCertificate();
        certs.txId = bufferOrJson.id;
        certs.givenFor = bufferOrJson.givenFor;
        certs.address = bufferOrJson.address;
        certs.nationality = bufferOrJson.nationality;
        certs.tinNumber = bufferOrJson.tinNumber;
        certs.hasExportCoffeeProcessing = bufferOrJson.hasExportCoffeeProcessing;
        certs.hasWeightingScale = bufferOrJson.hasWeightingScale;
        certs.hasMoistureCalibrator = bufferOrJson.hasMoistureCalibrator;
        certs.warehouse = bufferOrJson.warehouse;
        certs.capital = bufferOrJson.capital;

        certs.startDate = bufferOrJson.startDate;
        certs.endDate = bufferOrJson.endDate;
        certs.givenBy = bufferOrJson.givenBy;
        certs.givenDate = bufferOrJson.givenDate;
        certs.status = bufferOrJson.status;
        return certs;
    }
    toJson() {
        return JSON.stringify(this);
    }
    toBuffer() {
        return Buffer.from(this.toJson());
    }
}

module.exports = CoffeeExportCertificate;