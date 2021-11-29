/**
 * Pearson distance/similarity between two blogs.
 * https://coursepress.lnu.se/courses/web-intelligence/7d3df09086dc550ee1efa29239170531/3-Clustering.pdf
 *
 * @param {number} n the total number of words in all blogs.
 * @param {Blog} blogA the first blog.
 * @param {Blog} blogB the second blog.
 * @returns the similarity.
 */
export const pearson = async (n, blogA, blogB) => {
  //Init variables
  let sumA = 0,
    sumB = 0,
    sumAsq = 0,
    sumBsq = 0,
    pSum = 0;

  //Number of words
  // const n = 706

  //Iterate over all words
  for (let i = 0; i < n; i++) {
    cntA = blogA.wordCount(i); //word counts for each word in A
    cntB = blogB.wordCount(i); //word counts for each word in B
    sumA += cntA; //sum of word counts for A
    sumB += cntB; //sum of word counts for B
    sumAsq += cntA ** 2; //sum of squared word counts for A
    sumBsq += cntB ** 2; //sum of squared word counts for B
    pSum += cntA * cntB; //product of word counts from A and B
  }

  //Calculate Pearson
  num = pSum - (sumA * sumB) / n;
  den = sqrt(
    (sumAsq - Math.pow(sumA, 2) / n) * (sumBsq - Math.pow(sumB, 2) / n)
  );

  //Return inverted Pearson score
  return 1.0 - num / den;
};
