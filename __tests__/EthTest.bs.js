// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Eth = require("../src/Eth.bs.js");
var Jest = require("@glennsl/bs-jest/src/jest.js");

describe("#blockNumber", (function () {
        return Jest.testPromise(/* None */0, "fetches block", (function () {
                      return Eth.blockNumber(/* () */0).then((function (no) {
                                    return Promise.resolve(Jest.Expect[/* toBeGreaterThan */5](5768135, Jest.Expect[/* expect */0](no)));
                                  }));
                    }));
      }));

describe("#getBalance", (function () {
        Jest.testPromise(/* None */0, "empty Balance", (function () {
                return Eth.getBalance("0x160c5ce58e2cc4fe7cc45a9dd569a10083b2a275", /* None */0, /* () */0).then((function (amount) {
                              return Promise.resolve(Jest.Expect[/* toBe */2](0, Jest.Expect[/* expect */0](amount.toNumber())));
                            }));
              }));
        return Jest.testPromise(/* None */0, "With Balance at block", (function () {
                      return Eth.getBalance("0x76CF5100f62BaBd1574c3d2082f01c6bb3b420f8", /* Some */[/* Block */[5768167]], /* () */0).then((function (amount) {
                                    return Promise.resolve(Jest.Expect[/* toBe */2]("6000000000000000", Jest.Expect[/* expect */0](amount.toString(10))));
                                  }));
                    }));
      }));

/*  Not a pure module */
