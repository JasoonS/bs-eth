type blockNumber = int;
type nonce = int;
type quantityResponse = string;
type blockOrTag =
  | Block(blockNumber)
  | Earliest
  | Latest
  | Pending;

type address = string;
type data = string;

type wei = BigInt.t;
type gas = int;
type eth = BigInt.t;

[@bs.deriving abstract]
type tx = {
  [@bs.as "to"]
  to_: address,
  [@bs.optional]
  from: address,
  [@bs.optional]
  gas: wei,
  [@bs.optional]
  gasPrice: wei,
  [@bs.optional]
  value: wei,
  [@bs.optional]
  data,
  [@bs.optional]
  nonce,
};

let strip0x = value => Js.String.replaceByRe([%bs.re "/^0x/"], "", value);
let hexMatcher = Js.Re.test_([%bs.re "/^0x[0-9a-fA-F]+$/"]);
let decimalMatcher = Js.Re.test_([%bs.re "/^[0-9]+$/"]);

/* Js.String.sliceToEnd(value, ~from=2); */

let bnZero = BigInt.fromInt(0);

module Decode = {
  let quantity = result =>
    switch (Js.Json.classify(result)) {
    | Js.Json.JSONNumber(value) => int_of_float(value)
    | Js.Json.JSONString(hex) =>
      if (hexMatcher(hex)) {
        BigInt.toInt(BigInt.fromString(strip0x(hex), 16));
      } else if (decimalMatcher(hex)) {
        BigInt.toInt(BigInt.fromString(strip0x(hex), 10));
      } else {
        0;
      }
    | _ => 0
    };

  let nonce = quantity;
  let block = quantity;
  let amount = result =>
    switch (Js.Json.classify(result)) {
    | Js.Json.JSONNumber(number) => BigInt.fromFloat(number)
    | Js.Json.JSONString(hex) =>
      hexMatcher(hex) ? BigInt.fromString(strip0x(hex), 16) : bnZero
    | _ => bnZero
    };
  let address = (result): address =>
    switch (Js.Json.decodeString(result)) {
    | Some(address) => address
    | None => ""
    };
  let accounts = result =>
    switch (Js.Json.classify(result)) {
    | Js.Json.JSONArray(addresses) => Belt.Array.map(addresses, address)
    | _ => [||]
    };
  let string = result =>
    switch (Js.Json.decodeString(result)) {
    | Some(data) => data
    | None => ""
    };
  let data = string;
};

let addressMatcher = [%bs.re "/^0x[0-9a-fA-F]{40}$/"];

let validateAddress = value => Js.Re.test_(addressMatcher, value);

let toHex = amount => Js.Json.string(Printf.sprintf("0x%x", amount));

module Encode = {
  let address = addr => Js.Json.string(addr);
  let data = dat => Js.Json.string(dat);
  let quantity = value =>
    Js.Json.string("0x" ++ BigInt.toString(BigInt.fromInt(value), 16));
  let amount = wei => Js.Json.string("0x" ++ BigInt.toString(wei, 16));
  let block = (blk: blockNumber) => toHex(blk);

  let transaction = tx => {
    let json: Js.Dict.t(Js.Json.t) = Js.Dict.empty();
    Js.Dict.set(json, "to", address(to_Get(tx)));
    switch (valueGet(tx)) {
    | Some(value) => Js.Dict.set(json, "value", amount(value))
    | None => ()
    };
    switch (fromGet(tx)) {
    | Some(value) => Js.Dict.set(json, "from", address(value))
    | None => ()
    };
    switch (dataGet(tx)) {
    | Some(value) => Js.Dict.set(json, "data", data(value))
    | None => ()
    };
    switch (gasGet(tx)) {
    | Some(value) => Js.Dict.set(json, "gas", amount(value))
    | None => ()
    };
    switch (gasPriceGet(tx)) {
    | Some(value) => Js.Dict.set(json, "gasPrice", amount(value))
    | None => ()
    };
    switch (nonceGet(tx)) {
    | Some(value) => Js.Dict.set(json, "nonce", quantity(value))
    | None => ()
    };
    Js.Json.object_(json);
  };

  let blockOrTag = value =>
    switch (value) {
    | Block(amount) => Js.Json.string(Printf.sprintf("0x%x", amount))
    | Latest => Js.Json.string("latest")
    | Pending => Js.Json.string("pending")
    | Earliest => Js.Json.string("earliest")
    };
};

/*
 curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c", "data":"0x06fdde03"],"id":1}' https://mainnet.infura.io/re-eth
 */
