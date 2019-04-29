// Generated by BUCKLESCRIPT VERSION 5.0.3, PLEASE EDIT WITH CARE
'use strict';

var Bn = require("bs-bn.js/src/Bn.js");
var Jest = require("@glennsl/bs-jest/src/jest.js");
var Formats = require("../src/Formats.bs.js");

Jest.describe("Encode", (function (param) {
        Jest.describe("#address", (function (param) {
                return Jest.test("address", (function (param) {
                              return Jest.Expect[/* toEqual */12]("0x01234", Jest.Expect[/* expect */0](Formats.Encode[/* address */0]("0x01234")));
                            }));
              }));
        Jest.describe("#transaction", (function (param) {
                return Jest.test("tx", (function (param) {
                              return Jest.Expect[/* toEqual */12]("0x6d5923e6449122cbbcc1b96093e0b7e4fd3e469f58daddae", Jest.Expect[/* expect */0](Formats.Encode[/* address */0]("0x6d5923e6449122cbbcc1b96093e0b7e4fd3e469f58daddae")));
                            }));
              }));
        Jest.describe("#blockOrTag", (function (param) {
                Jest.test("small number", (function (param) {
                        return Jest.Expect[/* toEqual */12]("0x4d2", Jest.Expect[/* expect */0](Formats.Encode[/* block */1](1234)));
                      }));
                return Jest.test("zero", (function (param) {
                              return Jest.Expect[/* toEqual */12]("0x0", Jest.Expect[/* expect */0](Formats.Encode[/* block */1](0)));
                            }));
              }));
        return Jest.describe("#blockOrTag", (function (param) {
                      Jest.test("small number", (function (param) {
                              return Jest.Expect[/* toEqual */12]("0x4d2", Jest.Expect[/* expect */0](Formats.Encode[/* blockOrTag */3](/* Block */[1234])));
                            }));
                      Jest.test("zero", (function (param) {
                              return Jest.Expect[/* toEqual */12]("0x0", Jest.Expect[/* expect */0](Formats.Encode[/* blockOrTag */3](/* Block */[0])));
                            }));
                      Jest.test("latest", (function (param) {
                              return Jest.Expect[/* toEqual */12]("latest", Jest.Expect[/* expect */0](Formats.Encode[/* blockOrTag */3](/* Latest */1)));
                            }));
                      Jest.test("pending", (function (param) {
                              return Jest.Expect[/* toEqual */12]("pending", Jest.Expect[/* expect */0](Formats.Encode[/* blockOrTag */3](/* Pending */2)));
                            }));
                      return Jest.test("earliest", (function (param) {
                                    return Jest.Expect[/* toEqual */12]("earliest", Jest.Expect[/* expect */0](Formats.Encode[/* blockOrTag */3](/* Earliest */0)));
                                  }));
                    }));
      }));

Jest.describe("Decode", (function (param) {
        Jest.describe("quantity", (function (param) {
                Jest.test("smallish number", (function (param) {
                        return Jest.Expect[/* toEqual */12](1234, Jest.Expect[/* expect */0](Formats.Decode[/* quantity */0]("0x4d2")));
                      }));
                Jest.test("zero", (function (param) {
                        return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Formats.Decode[/* quantity */0]("0x0")));
                      }));
                return Jest.test("largeish number", (function (param) {
                              return Jest.Expect[/* toEqual */12](226982304, Jest.Expect[/* expect */0](Formats.Decode[/* quantity */0]("0x0D8779a0")));
                            }));
              }));
        Jest.describe("nonce", (function (param) {
                Jest.test("smallish number", (function (param) {
                        return Jest.Expect[/* toEqual */12](1234, Jest.Expect[/* expect */0](Formats.Decode[/* nonce */1]("0x4d2")));
                      }));
                Jest.test("zero", (function (param) {
                        return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Formats.Decode[/* nonce */1]("0x0")));
                      }));
                return Jest.test("largeish number", (function (param) {
                              return Jest.Expect[/* toEqual */12](226982304, Jest.Expect[/* expect */0](Formats.Decode[/* nonce */1]("0x0D8779a0")));
                            }));
              }));
        Jest.describe("block", (function (param) {
                Jest.test("smallish number", (function (param) {
                        return Jest.Expect[/* toEqual */12](1234, Jest.Expect[/* expect */0](Formats.Decode[/* block */2]("0x4d2")));
                      }));
                Jest.test("zero", (function (param) {
                        return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Formats.Decode[/* block */2]("0x0")));
                      }));
                return Jest.test("largeish number", (function (param) {
                              return Jest.Expect[/* toEqual */12](226982304, Jest.Expect[/* expect */0](Formats.Decode[/* block */2]("0x0D8779a0")));
                            }));
              }));
        return Jest.describe("amount", (function (param) {
                      Jest.test("smallish number", (function (param) {
                              return Jest.Expect[/* toEqual */12](1234.0, Jest.Expect[/* expect */0](Bn.toNumber(Formats.Decode[/* amount */3]("0x4d2"))));
                            }));
                      Jest.test("zero", (function (param) {
                              return Jest.Expect[/* toEqual */12](0.0, Jest.Expect[/* expect */0](Bn.toNumber(Formats.Decode[/* amount */3]("0x0"))));
                            }));
                      Jest.test("largeish number", (function (param) {
                              return Jest.Expect[/* toEqual */12](226982304.0, Jest.Expect[/* expect */0](Bn.toNumber(Formats.Decode[/* amount */3]("0x0D8779a0"))));
                            }));
                      Jest.test("large un-prefixed number", (function (param) {
                              return Jest.Expect[/* toEqual */12]("2681210161307671758365144741753253651834466456474188701102", Jest.Expect[/* expect */0](Bn.toString(10, undefined)(Formats.Decode[/* amount */3]("6d5923e6449122cbbcc1b96093e0b7e4fd3e469f58daddae"))));
                            }));
                      return Jest.test("large prefixed number", (function (param) {
                                    return Jest.Expect[/* toEqual */12]("2681210161307671758365144741753253651834466456474188701102", Jest.Expect[/* expect */0](Bn.toString(10, undefined)(Formats.Decode[/* amount */3]("0x6d5923e6449122cbbcc1b96093e0b7e4fd3e469f58daddae"))));
                                  }));
                    }));
      }));

Jest.describe("strip0x", (function (param) {
        Jest.describe("has prefix", (function (param) {
                return Jest.test("strips prefix", (function (param) {
                              return Jest.Expect[/* toEqual */12]("12314a", Jest.Expect[/* expect */0](Formats.strip0x("0x12314a")));
                            }));
              }));
        return Jest.describe("no prefix", (function (param) {
                      return Jest.test("leaves string alone", (function (param) {
                                    return Jest.Expect[/* toEqual */12]("12314a", Jest.Expect[/* expect */0](Formats.strip0x("12314a")));
                                  }));
                    }));
      }));

/*  Not a pure module */
