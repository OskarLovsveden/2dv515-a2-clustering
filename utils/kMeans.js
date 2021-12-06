import Centroid from "models/Centroid";
import DataSet from "models/DataSet";
import { pearson } from "./algorithms";

/**
 * Calculates the kMeans clustering of a dataset of blogs.
 *
 * @param {DataSet} dataSet
 */
export const kMeans = (dataSet) => {
  const k = 5;
  const n = dataSet.getWordCount();
  const min = dataSet.getMin();
  const max = dataSet.getMax();
  const blogs = dataSet.getBlogs();
  const centroids = [];

  for (let i = 0; i < k; i++) {
    const c = new Centroid();
    for (let j = 0; j < n; j++) {
      c.setWordCount(
        j,
        Math.floor(Math.random() * (max[i] - min[i] + 1) + min[i])
      );
    }

    centroids.push(c);
  }

  do {
    for (const c of centroids) {
      c.clearAssignments();
    }

    for (const b of blogs) {
      let distance = Number.MAX_VALUE;
      let best = new Centroid();

      for (const c of centroids) {
        const cDist = pearson(n, c, b);

        if (cDist < distance) {
          best = c;
          distance = cDist;
        }
      }

      best.assign(b);
    }

    for (const c of centroids) {
      for (let i = 0; i < n; i++) {
        let avg = 0;

        for (const b of c.getAssignments()) {
          avg += b.getWordCount(i);
        }

        avg /= c.getAssignments().length;
        c.setWordCount(i, avg);
      }
    }
  } while (newClusterAssignments(centroids));

  return centroidsToClusters(centroids);
};

const newClusterAssignments = (centroids) => {
  for (const c of centroids) {
    let current = c.getAssignments();
    let prev = c.getPrevAssignments();

    if (current.length !== prev.length) {
      return true;
    }

    current = current.slice().sort();
    prev = prev.slice().sort();

    for (let i = 0; i < current.length; i++) {
      if (current[i].getName() !== prev[i].getName()) {
        return true;
      }
    }
  }

  return false;
};

const centroidsToClusters = (centroids) => {
  const result = [];

  for (const [i, c] of centroids.entries()) {
    const cluster = {
      id: i + 1,
      blogs: [],
    };

    for (const a of c.getAssignments()) {
      cluster.blogs.push(a.getName());
    }

    result.push(cluster);
  }

  return result;
};
