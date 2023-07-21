'use strict'

class CoffeeGrower {
    constructor() {
        this.nationalityId = '';
        this.fullName = '';
        this.farmPlace = '';
        this.farmSize = '';
        this.deliveries = [];
        this.registeredAt = '';

    }


    static from(body) {

        const result = new CoffeeGrower();
        result.nationalityId = body.nationalityId;
        result.fullName = body.fullName;
        result.farmPlace = body.farmPlace;
        result.farmSize = body.farmSize;
        result.deliveries = body.deliveries;
        result.registeredAt = body.registeredAt;

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