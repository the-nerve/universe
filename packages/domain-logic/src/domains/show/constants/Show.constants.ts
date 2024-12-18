export enum SHOW_STATUS {
  ACTIVE = "active",
  FUTURE = "future",
  PAST = "archived",
  COMING_SOON = "coming-soon",
  DEFAULT = "unknown",
}

export enum SHOW_EVENT_STATUS {
  SCHEDULED = "scheduled",
  CANCELLED = "cancelled",
  RESCHEDULED = "rescheduled",
  POSTPONED = "postponed",
}

export const SHOW_STATUS_DISPLAY = {
  [SHOW_STATUS.PAST]: "Archived",
  [SHOW_STATUS.ACTIVE]: "Now Playing",
  [SHOW_STATUS.COMING_SOON]: "Coming Soon",
  [SHOW_STATUS.FUTURE]: "Future Show",
  [SHOW_STATUS.DEFAULT]: "Status TBD",
} as const;

export enum SHOW_RATING {
  PG = "pg",
  PG13 = "pg-13",
  R = "r",
}

export const SHOW_RATING_DISPLAY = {
  [SHOW_RATING.PG]: "PG",
  [SHOW_RATING.PG13]: "PG-13",
  [SHOW_RATING.R]: "R",
} as const;

export enum SHOW_TICKET_STATUS {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
  AVAILABLE_SOON = "available-soon",
  SOLD_OUT = "sold-out",
}

export const SHOW_TICKET_STATUS_DISPLAY = {
  [SHOW_TICKET_STATUS.AVAILABLE]: "On Sale Now",
  [SHOW_TICKET_STATUS.UNAVAILABLE]: "Unavailable",
  [SHOW_TICKET_STATUS.AVAILABLE_SOON]: "Available Soon",
  [SHOW_TICKET_STATUS.SOLD_OUT]: "Sold Out",
} as const;
