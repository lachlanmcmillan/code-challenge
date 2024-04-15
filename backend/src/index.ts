import * as fs from "fs";

export enum TransactionTypes {
  INCOMPLETE = "INCOMPLETE",
  PURCHASED = "PURCHASED",
  REFUND = "REFUND",
}

interface TransactionHistoryItem {
  name: string;
  numberOfShares: number;
  dateOfPurchase: number;
  status: TransactionTypes;
}

interface TransactionHistoryItemWeighted {
  name: string;
  numberOfShares: number;
  dateOfPurchase: number;
  status: TransactionTypes;
  weight: number;
}

const FILENAME = "./src/transaction_history.json";

const main = () => {
  const data = fs.readFileSync("./src/transaction_history.json", "utf-8");

  // Your code here

  const itemsUnparsed: any[] = JSON.parse(data);
  const items: TransactionHistoryItem[] = itemsUnparsed.map(parseTransactionHistoryItem);

  const largeItems = items.filter(x => x.numberOfShares > 1000);
  console.log(largeItems);
};

export const parseTransactionHistoryItem = (item: any): TransactionHistoryItem => {
  if (typeof item !== 'object' || item === null) {
    throw new Error("invalid item");
  }

  if (!item.name || !item.numberOfShares || !item.dateOfPurchase || !item.status ) {
     throw new Error("invalid item");
  }

  const date = Date.parse(item.dateOfPurchase);

  if (isNaN(date)) {
    throw new Error(`invalid item date ${item.dateOfPurchase}`);
  }

  // todo check status

  return {
    name: item.name,
    numberOfShares: item.numberOfShares,
    dateOfPurchase: date,
    status: item.status
  }
}

export const calculateItemWeight = (item: TransactionHistoryItem) => {
  if (item.status === TransactionTypes.REFUND) {
    return -1;
  }

  if (item.status === TransactionTypes.INCOMPLETE) {
    return 0;
  }

  if (item.status === TransactionTypes.PURCHASED) {
    // todo date of purchase
    // if (item.dateOfPurchase > )

    if (item.numberOfShares > 1000) {
      return 1.25;
    }

    return 1;
  }
}

main();
