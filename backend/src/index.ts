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

interface TransactionHistoryItemWeighted extends TransactionHistoryItem {
  weight: number;
}

interface AggregateWeight {
  name: string;
  totalShares: number;
  weight: number;
}

const FILENAME = "./src/transaction_history.json";
const DAYS_IN_SIX_MONTHS = 180;
const SIX_MONTHS_MILLISECONDS = DAYS_IN_SIX_MONTHS * 24 * 60 * 60 * 1000;

const main = () => {
  const data = fs.readFileSync("./src/transaction_history.json", "utf-8");

  // Your code here
  const dateOfReport = (new Date()).getTime();

  const itemsUnparsed: any[] = JSON.parse(data);
  const items: TransactionHistoryItemWeighted[] = itemsUnparsed
    .map(parseTransactionHistoryItem)
    .map(item => ({ 
      ...item, 
      weight: calculateItemWeight(item, dateOfReport) 
    }))

  const aggregatedWeights = aggregateItemsByName(items)
  console.table(aggregatedWeights);
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

  // todo check status is valid

  return {
    name: item.name,
    numberOfShares: item.numberOfShares,
    dateOfPurchase: date,
    status: item.status
  }
}

export const calculateItemWeight = (item: TransactionHistoryItem, dateOfReport: number): number => {
  if (item.status === TransactionTypes.REFUND) {
    return -1;
  }

  if (item.status === TransactionTypes.INCOMPLETE) {
    return 0;
  }

  if (item.status === TransactionTypes.PURCHASED) {

    const timeElapsedSincePurchase = dateOfReport - item.dateOfPurchase;
    if (timeElapsedSincePurchase < SIX_MONTHS_MILLISECONDS) {
      return 1.5
    }

    if (item.numberOfShares > 1000) {
      return 1.25;
    }

    return 1;
  }

  throw new Error("item STATUS unrecognised");
}

const aggregateItemsByName = (items: TransactionHistoryItemWeighted[]) => {
  const mapOfNames: Record<string, AggregateWeight> = {};

  items.forEach(item => {
    const { name } = item;

    if (name in mapOfNames) {
      mapOfNames[name].totalShares += item.numberOfShares;
      mapOfNames[name].weight += item.weight;
    } else {
      // add new entry
      mapOfNames[name] = {
        name,
        totalShares: item.numberOfShares,
        weight: item.weight
      };
    }
  });

  const table = Object.values(mapOfNames)
    .sort((a, b) => {
      if (a.weight > b.weight) return -1;
      if (a.weight < b.weight) return 1;
      else return 0;
    })

  return table;
}

main();
