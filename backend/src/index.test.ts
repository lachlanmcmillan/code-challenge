import { calculateItemWeight, parseTransactionHistoryItem, TransactionTypes } from ".";

describe("calculateItemWeight", () => {
  it("returns -1 for a refunded purchase", () => {
    const item =  {
      "name": "Terry",
      "numberOfShares": 67,
      "dateOfPurchase": Date.parse("2023-10-06T17:32:47.984Z"),
      "status": TransactionTypes.REFUND
    }
    const dateOfReport = (new Date()).getTime();
    const result = calculateItemWeight(item, dateOfReport);
    const expected = -1;
    expect(result).toBe(expected)
  })

  it("returns 0 for an incomplete purchase", () => {
    const item =  {
      "name": "Terry",
      "numberOfShares": 41,
      "dateOfPurchase": Date.parse("2023-12-25T17:11:49.442Z"),
      "status": TransactionTypes.INCOMPLETE
    }
    const dateOfReport = (new Date()).getTime();
    const result = calculateItemWeight(item, dateOfReport);
    const expected = 0;
    expect(result).toBe(expected)
  })

  it("returns 1.5 for a purchase within the last 180 days", () => {
    const item =  {
      "name": "Terry",
      "numberOfShares": 1,
      "dateOfPurchase": Date.parse("2024-01-15T12:00:00.000Z"),
      "status": TransactionTypes.PURCHASED
    }
    const dateOfReport = Date.parse("2024-04-15T12:00:00.000Z");
    const result = calculateItemWeight(item, dateOfReport);
    const expected = 1.5;
    expect(result).toBe(expected)
  });

  it("returns 1.25 for a purchase of over 1000 shares", () => {
    const item =  {
      "name": "Terry",
      "numberOfShares": 1001,
      "dateOfPurchase": Date.parse("2022-12-25T17:11:49.442Z"),
      "status": TransactionTypes.PURCHASED
    }
    const dateOfReport = Date.parse("2024-04-15T12:00:00.000Z");
    const result = calculateItemWeight(item, dateOfReport);
    const expected = 1.25;
    expect(result).toBe(expected)
  })

  it("returns 1 for a regular purchase", () => {
    const item =  {
      "name": "Terry",
      "numberOfShares": 1000,
      "dateOfPurchase": Date.parse("2022-12-25T17:11:49.442Z"),
      "status": TransactionTypes.PURCHASED
    }
    const dateOfReport = Date.parse("2024-04-15T12:00:00.000Z");
    const result = calculateItemWeight(item, dateOfReport);
    const expected = 1;
    expect(result).toBe(expected);
  });

  it("gives precedence to dateOfPurchase rule over the number of shares rule", () => {
    const item =  {
      "name": "Terry",
      "numberOfShares": 5000,
      "dateOfPurchase": Date.parse("2024-01-15T12:00:00.000Z"),
      "status": TransactionTypes.PURCHASED
    }
    const dateOfReport = Date.parse("2024-04-15T12:00:00.000Z");
    const result = calculateItemWeight(item, dateOfReport);
    const expected = 1.5;
    expect(result).toBe(expected) 
  })
})