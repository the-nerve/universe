export enum TICKETING_PURCHASE_TYPE {
  DOOR = "door",
  EXTERNAL = "external",
  INTERNAL = "internal",
}

export enum TICKETING_STATUS {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
  AVAILABLE_SOON = "available-soon",
  SOLD_OUT = "sold-out",
  UNKNOWN = "unknown",
}

export const TICKETING_PURCHASE_TYPE_DISPLAY = {
  [TICKETING_PURCHASE_TYPE.DOOR]: "Tickets at Door",
  [TICKETING_PURCHASE_TYPE.EXTERNAL]: "Get Tickets",
  [TICKETING_PURCHASE_TYPE.INTERNAL]: "Unavailable",
} as const;

export const TICKETING_STATUS_DISPLAY = {
  [TICKETING_STATUS.AVAILABLE]: "On Sale Now",
  [TICKETING_STATUS.UNAVAILABLE]: "Unavailable",
  [TICKETING_STATUS.AVAILABLE_SOON]: "Available Soon",
  [TICKETING_STATUS.SOLD_OUT]: "Sold Out",
  [TICKETING_STATUS.UNKNOWN]: "Unknown",
} as const;
