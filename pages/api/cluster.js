import { kMeans, centroidsToClusters } from "utils/clustering";
import { fileToArray } from "utils/filereader";
import DataSet from "models/DataSet";

export default async function handler(req, res) {
  const {
    body: {},
    method,
  } = req;

  if (method === "GET") {
    const fileAsArray = await fileToArray("data/blogdata.txt");
    const dataSet = new DataSet(fileAsArray);
    await dataSet.process();

    const centroids = kMeans(dataSet);
    const clusters = centroidsToClusters(centroids);

    res.status(200).json(clusters);
  }
}
