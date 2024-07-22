import { Address, beginCell, Cell } from "@ton/core";

export abstract class Op {
  static transfer = 0xf8a7ea5;
  static transfer_notification = 0x7362d09c;
  static internal_transfer = 0x178d4519;
  static excesses = 0xd53276db;
  static burn = 0x595f07bc;
  static burn_notification = 0x7bdd97de;

  static provide_wallet_address = 0x2c76b973;
  static take_wallet_address = 0xd1735400;
  static mint = 21;
  static change_admin = 3;
  static change_content = 4;
}

export abstract class Errors {
  static invalid_op = 709;
  static not_admin = 73;
  static unouthorized_burn = 74;
  static discovery_fee_not_matched = 75;
  static wrong_op = 0xffff;
  static not_owner = 705;
  static not_enough_ton = 709;
  static not_enough_gas = 707;
  static not_valid_wallet = 707;
  static wrong_workchain = 333;
  static balance_error = 706;
}

export type JettonMinterContent = {
  type: 0 | 1;
  uri: string;
};

export type JettonMinterConfig = {
  admin: Address;
  content: Cell;
  wallet_code: Cell;
};

export function jettonMinterConfigToCell(config: JettonMinterConfig): Cell {
  return beginCell()
    .storeCoins(0)
    .storeAddress(config.admin)
    .storeRef(config.content)
    .storeRef(config.wallet_code)
    .endCell();
}

export function jettonContentToCell(content: JettonMinterContent) {
  return beginCell()
    .storeUint(content.type, 8)
    .storeStringTail(content.uri) //Snake logic under the hood
    .endCell();
}

export function mintMessage(
  from: Address,
  to: Address,
  jetton_amount: bigint,
  forward_ton_amount: bigint,
  total_ton_amount: bigint,
  query_id: number | bigint = 0
) {
  const mintMsg = beginCell()
    .storeUint(Op.internal_transfer, 32)
    .storeUint(0, 64)
    .storeCoins(jetton_amount)
    .storeAddress(null)
    .storeAddress(from) // Response addr
    .storeCoins(forward_ton_amount)
    .storeMaybeRef(null)
    .endCell();

  return beginCell()
    .storeUint(Op.mint, 32)
    .storeUint(query_id, 64) // op, queryId
    .storeAddress(to)
    .storeCoins(total_ton_amount)
    .storeCoins(jetton_amount)
    .storeRef(mintMsg)
    .endCell();
}

export function changeAdminMessage(newOwner: Address) {
  return beginCell()
    .storeUint(Op.change_admin, 32)
    .storeUint(0, 64) // op, queryId
    .storeAddress(newOwner)
    .endCell();
}

export function changeContentMessage(content: Cell) {
  return beginCell()
    .storeUint(Op.change_content, 32)
    .storeUint(0, 64) // op, queryId
    .storeRef(content)
    .endCell();
}

export function transferMessage(
  jetton_amount: bigint,
  to: Address,
  responseAddress: Address,
  customPayload: Cell | null,
  forward_ton_amount: bigint,
  forwardPayload: Cell | null
) {
  return beginCell()
    .storeUint(0xf8a7ea5, 32)
    .storeUint(0, 64) // op, queryId
    .storeCoins(jetton_amount)
    .storeAddress(to)
    .storeAddress(responseAddress)
    .storeMaybeRef(customPayload)
    .storeCoins(forward_ton_amount)
    .storeMaybeRef(forwardPayload)
    .endCell();
}

export function burnMessage(
  jetton_amount: bigint,
  responseAddress: Address,
  customPayload: Cell | null
) {
  return beginCell()
    .storeUint(0x595f07bc, 32)
    .storeUint(0, 64) // op, queryId
    .storeCoins(jetton_amount)
    .storeAddress(responseAddress)
    .storeMaybeRef(customPayload)
    .endCell();
}

export function withdrawTonsMessage() {
  return beginCell()
    .storeUint(0x6d8e5e3c, 32)
    .storeUint(0, 64) // op, queryId
    .endCell();
}

export function withdrawJettonsMessage(from: Address, amount: bigint) {
  return beginCell()
    .storeUint(0x768a50b2, 32)
    .storeUint(0, 64) // op, queryId
    .storeAddress(from)
    .storeCoins(amount)
    .storeMaybeRef(null)
    .endCell();
}
