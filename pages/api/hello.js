import fs from "fs";
import readline from "readline";

import { kMeans } from "utils/clustering";
import DataSet from "models/DataSet";

export default async function handler(req, res) {
  const {
    body: {},
    method,
  } = req;

  if (method === "GET") {
    const dataSet = new DataSet(await readFile());
    await dataSet.process();

    const clusters = kMeans(dataSet);

    // res.status(200).json({msg: 'hej'});
    res.status(200).json(clusters);
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
