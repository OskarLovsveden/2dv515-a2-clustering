import fs from "fs";
import readline from "readline";

const fileToArray = async (path) => {
  const reader = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity,
  });

  const rawData = [];

  for await (const line of reader) {
    rawData.push(line.split("\t"));
  }

  return rawData;
};

export { fileToArray };
