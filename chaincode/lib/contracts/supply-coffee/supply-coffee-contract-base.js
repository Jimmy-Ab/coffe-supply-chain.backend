'use strict'

const { Contract } = require('fabric-contract-api');


class SupplyCoffeeContractBase extends Contract
{
    constructor(namespace)
    {
        super(namespace);
    }

    //kes = [owner, years, month, date, batchNo, _bagId]
    _createCK(stub, keys)
    {
        return stub.createCompositeKey('SupplyCoffee', keys);
    }
    //keys = []
    _createShipmentCK(stub, keys)
    {
        return stub.createCompositeKey('SupplyCoffeeShipment', keys);
    }
    //keys = [owner, productionplace]
    _createWashedCoffeeIndCK(stub, keys)
    {
        return stub.createCompositeKey('WashedCoffeeInd', keys);
    }
    _createNaturalCoffeeIndCK(stub, keys)
    {
        return stub.createCompositeKey('NaturalCoffeeInd', keys);
    }

    //keys = [batchNo, deliveryId]
    _createCoffeeCherryCK(stub, keys)
    {
        return stub.createCompositeKey('CoffeeCherry', keys);
    }
    _require(value, name)
    {
        if (!value)
        {
            throw new Error(`Parameter ${name} is missing.`);
        }
    }

    _toBuffer(obj)
    {
        return Buffer.from(JSON.stringify(obj));
    }

    _fromBuffer(buffer)
    {
        if (Buffer.isBuffer(buffer))
        {
            if (!buffer.length)
            {
                return;
            }
        }

        return JSON.parse(buffer.toString('utf-8'));
    }
}

module.exports = { SupplyCoffeeContractBase };