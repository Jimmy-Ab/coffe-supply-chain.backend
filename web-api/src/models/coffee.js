'use strict';

class redCherryCoffee {
    constructor(bagId, bagSize, batchNumber, unitOfMeasure, farmPlace, farmer, buyer, txDate, sellingPrice, currency) {

        this.bagId = bagId;
        this.bagSize = bagSize;
        this.batchNumber = batchNumber;
        this.unitOfMeasure = unitOfMeasure;
        this.farmPlace = farmPlace;
        this.farmer = farmer;
        this.buyer = buyer;
        this.txDate = txDate;
        this.sellingPrice = sellingPrice;
        this.currency = currency;
    }
}

class coffee {
    constructor(bagId, bagSize, batchNumber, unitOfMeasure, processedAt, owner, yer, txDate, sellingPrice, currency, grade) {
        this.bagId = bagId;
        this.bagSize = bagSize;
        this.batchNumber = batchNumber;
        this.unitOfMeasure = unitOfMeasure;
        this.processedAt = processedAt;
        this.owner = owner;
        this.txDate = txDate;
        this.sellingPrice = sellingPrice;
        this.currency = currency;
        this.grade = grade;
    }
}

class physicalAddress {
    constructor(longtitude, Latitude, country, region, zone, city, woreda, kebele) {
        this.longtitude = longtitude;
        this.Latitude = Latitude;
        this.country = country;
        this.region = region;
        this.zone = zone;
        this.city = city;
        this.woreda = woreda;
        this.kebele = kebele;
    }

}
module.exports = {
    redCherryCoffee,
    coffee,
    physicalAddress
}




