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
  const clusters = [];

  for (const blog of blogs) {
    const cluster = new Cluster();
    cluster.blog = blog;
    clusters.push(cluster);
  }

  while (clusters.length > 1) {
    iterate(n, clusters);
  }

  return clusters;
};

/**
 * An iteration of hierarchical generation.
 *
 * @param {number} n the number of words in the dataset.
 * @param {Cluster[]} clusters the current set of clusters.
 */
const iterate = (n, clusters) => {
  //Find two closest nodes
  let closest = Number.MAX_VALUE;
  let a = new Cluster();
  let b = new Cluster();

  for (const cA of clusters) {
    for (const cB of clusters) {
      console.log(cA, cB);
      const distance = pearson(n, cA.blog, cB.blog);
      if (distance < closest && cA != cB) {
        //New set of closest nodes found
        closest = distance;
        a = cA;
        b = cB;
      }
    }
  }

  //Merge the two clusters
  const nC = merge(n, a, b, closest);

  //Add new cluster
  clusters.add(nC);

  //Remove old clusters
  clusters.splice(clusters.indexOf(a), 1);
  clusters.splice(clusters.indexOf(b), 1);
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
  //Create new cluster
  const p = new Cluster();

  //Fill data
  p.left = a;
  a.parent = p;
  p.right = b;
  b.parent = p;

  //Merge blog data by averaging word counts for each word
  const nB = new Blog();

  for (let i = 0; i < n; i++) {
    const cntA = a.blog.word_count(i);
    const cntB = b.blog.word_count(i);
    //Average word count
    const cnt = (cntA + cntB) / 2;
    //Set word count to new blog
    nB.set_word_count(i, cnt);
  }

  //Set blog to new cluster
  p.blog = nB;

  //Set distance
  p.distance = distance;

  //Return new cluster
  return p;
};
