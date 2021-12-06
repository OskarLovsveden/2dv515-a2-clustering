import DataSet from "models/DataSet";
import Cluster from "models/Cluster";
import Blog from "models/Blog";
import { pearson } from "utils/algorithms";

/**
 * Calculates the hierarchical clustering of a dataset of blogs.
 *
 * @param {DataSet} dataSet the blog dataset.
 */
export const hierarchical = (dataSet) => {
  const n = dataSet.getWordCount();
  const blogs = dataSet.getBlogs();
  const clusters = new Set();

  for (const blog of blogs) {
    const cluster = new Cluster();
    cluster.setBlog(blog);
    clusters.add(cluster);
  }

  while (clusters.size > 1) {
    iterate(n, clusters);
  }

  for (const cluster of clusters) {
    processNodes(cluster);
  }

  return [...clusters];
};

/**
 * Processes nodes for a cleaner result, starting with a head node.
 *
 * @param {Cluster} cluster the head node to start from.
 */
const processNodes = (cluster) => {
  if (cluster.getRight()) {
    processNodes(cluster.getRight());
  }

  if (cluster.getLeft()) {
    processNodes(cluster.getLeft());
  }

  if (!cluster.getBlog().getName()) {
    cluster.setBlog(null);
  }
};

/**
 * An iteration of hierarchical generation.
 *
 * @param {number} n the number of words in the dataset.
 * @param {Set<Cluster>} clusters the current set of clusters.
 */
const iterate = (n, clusters) => {
  let closest = Number.MAX_VALUE;
  let a = new Cluster();
  let b = new Cluster();

  for (const cA of clusters) {
    for (const cB of clusters) {
      const distance = pearson(n, cA.getBlog(), cB.getBlog());
      if (distance < closest && cA !== cB) {
        closest = distance;
        a = cA;
        b = cB;
      }
    }
  }

  const nC = merge(n, a, b, closest);
  clusters.add(nC);

  clusters.delete(a);
  clusters.delete(b);
};

/**
 * Merges two clusters.
 *
 * @param {Cluster} a the first cluster.
 * @param {Cluster} b the second cluster.
 * @param {Number} distance the distance between the clusters.
 * @return {Cluster} the merged cluster.
 */
const merge = (n, a, b, distance) => {
  const p = new Cluster();

  p.setLeft(a);
  p.setRight(b);
  a.setParent(p);
  b.setParent(p);

  const nB = new Blog();

  for (let i = 0; i < n; i++) {
    const cntA = a.getBlog().getWordCount(i);
    const cntB = b.getBlog().getWordCount(i);

    const cnt = (cntA + cntB) / 2;

    nB.setWordCount(i, cnt);
  }

  p.setBlog(nB);
  p.setDistance(distance);

  return p;
};
