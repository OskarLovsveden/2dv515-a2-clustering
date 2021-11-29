import fs from "fs";
import readline from "readline";

import { kMeans } from "utils/clustering";
import DataSet from "utils/DataSet";

export default async function handler(req, res) {
  const {
    body: {},
    method,
  } = req;

  if (method === "GET") {
    const ds = new DataSet(await readFile());
    await ds.process();

    // const clusters = kMeans(ds);

    res.status(200).json(ds.max);
  }
}

const readFile = async () => {
  const reader = readline.createInterface({
    input: fs.createReadStream("data/blogdata.txt"),
    crlfDelay: Infinity,
  });

  const rawData = [];

  for await (const line of reader) {
    rawData.push(line.split("\t"));
  }

  return rawData;
};
