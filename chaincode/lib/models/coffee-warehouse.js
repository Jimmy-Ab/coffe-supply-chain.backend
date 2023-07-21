'use strict'
class CoffeeWarehouse {
    constructor() {
        this.id = '';
        this.warehouseNo = '';
        this.name = '';
        this.address = '';
        this.size = '';
        this.capacity = '';
        this.owner = '';
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

        const result = new CoffeeWarehouse();
        result.id = bufferOrJson.id;
        result.warehouseNo = bufferOrJson.warehouseNo;
        result.name = bufferOrJson.name;
        result.address = bufferOrJson.address;
        result.size = bufferOrJson.size;
        result.capacity = bufferOrJson.capacity;
        result.owner = bufferOrJson.owner;
        result.latitude = bufferOrJson.latitude;
        result.longitude = bufferOrJson.longitude;
        result.txId = bufferOrJson.txId;
        return result;
    }
    toJson() {
        return JSON.stringify(this);
    }
    toBuffer() {
        return Buffer.from(this.toJson());
    }
}

module.exports = CoffeeWarehouse;