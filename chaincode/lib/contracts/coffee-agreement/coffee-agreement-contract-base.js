"use strict";

const { Contract } = require("fabric-contract-api");
const CoffeeAgreement = require("../../models/coffee-agreement");

class CoffeeAgreementContractBase extends Contract {
  constructor(namespace) {
    super(namespace);
  }
  _require(value, name) {
    if (!value) {
      throw new Error(`Parameter ${name} is missing.`);
    }
  }
  _createCK(stub, id) {
    return stub.createCompositeKey("CoffeeAgreement", [id]);
  }

  async _getCoffeeAgreement(stub, id) {
    const exportCoffeeByte = await stub.getState(this._createCK(stub, id));
    return CoffeeAgreement.from(exportCoffeeByte);
  }
  async _doesCoffeeAgreementExist(stub, id) {
    const exportCoffeeByte = await stub.getState(this._createCK(stub, id));
    return !!exportCoffeeByte && exportCoffeeByte.toString().length > 0;
  }
}

module.exports = { CoffeeAgreementContractBase };
