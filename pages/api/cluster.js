import { kMeans } from "utils/kMeans";
import { hierarchical } from "utils/hierarchical";
import { fileToArray } from "utils/filereader";
import DataSet from "models/DataSet";

const algorithms = Object.freeze({
  K_MEANS: "kMeans",
  HIERARCHICAL: "hierarchical",
});

const allowedMethods = Object.freeze({
  GET: "GET",
});

const handleGetRequest = async (res, query) => {
  const { algorithm } = query;
  const filePath = "data/blogdata.txt";

  try {
    const fileAsArray = await fileToArray(filePath);
    const dataSet = new DataSet(fileAsArray);
    await dataSet.process();

    switch (algorithm) {
      case algorithms.K_MEANS:
        res
          .status(200)
          .json({ type: algorithms.K_MEANS, data: kMeans(dataSet) });
        break;
      case algorithms.HIERARCHICAL:
        // No circular replacer.
        res.status(200).json({
          type: algorithms.HIERARCHICAL,
          data: hierarchical(dataSet),
        });

        // Circular replacer
        // .json({
        //   type: algorithms.HIERARCHICAL,
        //   data: JSON.stringify(
        //     hierarchical(dataSet),
        //     getCircularReplacer()
        //   ),
        // });
        break;
      default:
        res.status(400).json({ error: "bad request" });
        break;
    }
  } catch (error) {
    res.status(500).json({ error: "failed to load data" });
  }
};

export default async function handler(req, res) {
  const { query, method } = req;

  switch (method) {
    case allowedMethods.GET:
      await handleGetRequest(res, query);
      break;

    default:
      res.setHeader("Allow", [Object.values(allowedMethods)]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

// const getCircularReplacer = () => {
//   const seen = new WeakSet();
//   return (key, value) => {
//     if (typeof value === "object" && value !== null) {
//       if (seen.has(value)) {
//         return;
//       }
//       seen.add(value);
//     }
//     return value;
//   };
// };
