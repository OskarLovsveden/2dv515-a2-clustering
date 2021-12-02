import { kMeans, centroidsToClusters } from "utils/clustering";
import { fileToArray } from "utils/filereader";
import DataSet from "models/DataSet";

export default async function handler(req, res) {
  const {
    query: { algorithm },
    method,
  } = req;

  if (method === "GET") {
    const fileAsArray = await fileToArray("data/blogdata.txt");
    const dataSet = new DataSet(fileAsArray);
    await dataSet.process();
    let clusters;

    switch (algorithm) {
      case "kMeans":
        clusters = kMeans(dataSet);
        break;
      case "hierarchical":
        clusters = hierarchical(dataSet);
        break;
      default:
        // erronous status?
        break;
    }

    res.status(200).json(clusters);
  }
}
