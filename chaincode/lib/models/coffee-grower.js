'use strict'

class CoffeeGrower {
    constructor() {
        this.id = '';
        this.nationalityId = '';
        this.fullName = '';
        this.gender = '';
        this.farmPlace = '';
        this.farmSize = '';
        this.deliveries = [];
        this.maritalStatus = '';
        this.dateOfBirth = '';
        this.registeredAt = '';
        this.latitude = '';
        this.longitude = '';
        this.txId = '';
    }
    static from(bufferOrJson) {
        if (Buffer.isBuffer(bufferOrJson)) {
            if (!bufferOrJson.length) {
                return;
            }
            bufferOrJson = JSON.parse(bufferOrJson.toString('utf-8'));
        }
        const result = new CoffeeGrower();
        result.id = bufferOrJson.id;
        result.nationalityId = bufferOrJson.nationalityId;
        result.fullName = bufferOrJson.fullName;
        result.gender = bufferOrJson.gender;
        result.farmPlace = bufferOrJson.farmPlace;
        result.farmSize = bufferOrJson.farmSize;
        result.deliveries = bufferOrJson.deliveries;
        result.maritalStatus = bufferOrJson.maritalStatus;
        result.dateOfBirth = bufferOrJson.dateOfBirth;
        result.registeredAt = bufferOrJson.registeredAt;
        result.latitude = bufferOrJson.latitude;
        result.longitude = bufferOrJson.longitude;
        result.txId = bufferOrJson.txId;

        console.log('bufferOrJson.deliveries|  '+bufferOrJson.deliveries);
        return result;
    }
    toJson() {
        return JSON.stringify(this);
    }
    toBuffer() {
        return Buffer.from(this.toJson());
    }
}

module.exports = CoffeeGrower;