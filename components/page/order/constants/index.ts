export enum OrderType {
  "Transfer TON",
  "Transfer Jetton",
  "Mint Jetton",
  "Change Jetton Admin",
  "Claim Jetton Admin",
  "Top-up Jetton Minter",
  "Change Jetton Metadata URL",
  "Force Burn Jetton",
  "Force Transfer Jetton",
  "Set status for Jetton Wallet",
}

export enum StatusEnum {
  unlock = "unlock",
  out = "out",
  in = "in",
  full = "full",
}

export const AmountLabel = {
  [OrderType["Transfer TON"]]: "TON Amount",
  [OrderType["Transfer Jetton"]]: "Jetton Amount (in units)",
  [OrderType["Mint Jetton"]]: "Jetton Amount (in units)",
  [OrderType["Change Jetton Admin"]]: "",
  [OrderType["Claim Jetton Admin"]]: "Jetton Minter Address",
  [OrderType["Top-up Jetton Minter"]]: "TON Amount",
  [OrderType["Change Jetton Metadata URL"]]: "",
  [OrderType["Force Burn Jetton"]]: "Jetton Amount (in units)",
  [OrderType["Force Transfer Jetton"]]: "",
  [OrderType["Set status for Jetton Wallet"]]: "",
};

export const ToAddressLabel = {
  [OrderType["Transfer TON"]]: "Destination Address",
  [OrderType["Transfer Jetton"]]: "To Address",
  [OrderType["Mint Jetton"]]: "To Address",
  [OrderType["Change Jetton Admin"]]: "New Admin Address",
  [OrderType["Claim Jetton Admin"]]: "",
  [OrderType["Top-up Jetton Minter"]]: "",
  [OrderType["Change Jetton Metadata URL"]]: "",
  [OrderType["Force Burn Jetton"]]: "",
  [OrderType["Force Transfer Jetton"]]: "To Address",
  [OrderType["Set status for Jetton Wallet"]]: "User Address",
};

export const FromAddressLabel = {
  [OrderType["Transfer TON"]]: "",
  [OrderType["Transfer Jetton"]]: "",
  [OrderType["Mint Jetton"]]: "",
  [OrderType["Change Jetton Admin"]]: "",
  [OrderType["Claim Jetton Admin"]]: "",
  [OrderType["Top-up Jetton Minter"]]: "",
  [OrderType["Change Jetton Metadata URL"]]: "",
  [OrderType["Force Burn Jetton"]]: "",
  [OrderType["Force Transfer Jetton"]]: "From Address",
  [OrderType["Set status for Jetton Wallet"]]: "",
};

export const TokenAddressLabel = {
  [OrderType["Transfer TON"]]: "",
  [OrderType["Transfer Jetton"]]: "Jetton Minter Address",
  [OrderType["Mint Jetton"]]: "Jetton Minter Address",
  [OrderType["Change Jetton Admin"]]: "Jetton Minter Address",
  [OrderType["Claim Jetton Admin"]]: "Jetton Minter Address",
  [OrderType["Top-up Jetton Minter"]]: "Jetton Minter Address",
  [OrderType["Change Jetton Metadata URL"]]: "Jetton Minter Address",
  [OrderType["Force Burn Jetton"]]: "Jetton Minter Address",
  [OrderType["Force Transfer Jetton"]]: "Jetton Minter Address",
  [OrderType["Set status for Jetton Wallet"]]: "Jetton Minter Address",
};
