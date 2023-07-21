'use strict'

class CoffeeExporter {
    constructor() {
        this.nationalityId = '';
        this.fullName = '';
        this.industries = [];
        this.registeredAt = '';
        this.certificates = [];
    }

    static from(bufferOrJson) {
        if (Buffer.isBuffer(bufferOrJson)) {
            if (!bufferOrJson.length) {
                return;
            }
            bufferOrJson = JSON.parse(bufferOrJson.toString('utf-8'));
        }
        const result = new CoffeeExporter();
        result.mspId = bufferOrJson.mspId;
        result.nationalityId = bufferOrJson.nationalityId;
        result.fullName = bufferOrJson.fullName;
        result.industries = bufferOrJson.industries;
        result.farmSize = bufferOrJson.farmSize;
        result.certificates = bufferOrJson.certificates;
        result.registeredAt = bufferOrJson.registeredAt;
        return result;
    }
    toJson() {
        return JSON.stringify(this);
    }
    toBuffer() {
        return Buffer.from(this.toJson());
    }
}