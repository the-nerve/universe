import { isValueNullish } from "../../common/isValueNullish.js";
import { TICKETING_PURCHASE_TYPE, TICKETING_STATUS } from "./Ticketing.constants.js";
import { Ticketing } from "./Ticketing.schema.js";

/**
 * Tickets have a set price
 * * A price of 0 will be valid (when free tickets are set)
 */
export const hasTicketPrice = <T extends Ticketing>(ticketing: T) => {
  return !isValueNullish(ticketing.basePrice) && ticketing.basePrice >= 0;
};

/**
 * Tickets for the event are free
 */
export const hasFreeTickets = <T extends Ticketing>(ticketing: T) => {
  return ticketing.basePrice === 0;
};

/**
 * Tickets for the event are available to be purchased
 */
export const hasTicketsOnSale = <T extends Ticketing>(ticketing: T) => {
  return ticketing.salePrice && ticketing.salePrice > 0;
};

/**
 * This event has a special industry ticket price
 */
export const hasIndustryTicketPrice = <T extends Ticketing>(ticketing: T) => {
  return ticketing.industryPrice && ticketing.industryPrice > 0;
};

/**
 * This event has a special student ticket price
 */
export const hasStudentTicketPrice = <T extends Ticketing>(ticketing: T) => {
  return ticketing.studentPrice && ticketing.studentPrice > 0;
};

/**
 * A ticket type is defined (type doesn't matter)
 */
export const hasTicketPurchaseTypeDefined = <T extends Ticketing>(ticketing: T) => {
  return !!ticketing.purchaseType;
};

/**
 * The ticket type has been defined as "door"
 */
export const hasTicketsAtDoor = <T extends Ticketing>(tickets: T) => {
  return tickets?.purchaseType === TICKETING_PURCHASE_TYPE.DOOR;
};

/**
 * The ticket type has been defined as "internal"
 */
export const hasInternalTickets = <T extends Ticketing>(tickets: T) => {
  return tickets?.purchaseType === TICKETING_PURCHASE_TYPE.INTERNAL;
};

/**
 * The ticket type has been defined as "external"
 */
export const hasExternalTicketProvider = <T extends Ticketing>(tickets: T) => {
  return tickets?.purchaseType === TICKETING_PURCHASE_TYPE.EXTERNAL;
};

/**
 * An external ticket link ahs been set
 */
export const hasExternalTicketLink = <T extends Ticketing>(tickets: T) => {
  return !!tickets?.link;
};

/**
 * External ticket type is set and a URL exists
 */
export const hasValidExternalTickets = <T extends Ticketing>(tickets: T) => {
  return hasExternalTicketProvider(tickets) && hasExternalTicketLink(tickets);
};
