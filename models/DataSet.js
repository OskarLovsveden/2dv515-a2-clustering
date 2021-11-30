import Blog from 'models/Blog'

export default class DataSet {
  #rawData = [];
  wordCount = 0;
  blogs = [];
  min = [];
  max = [];

  /**
   * Constructor that takes raw data from a blog dataset matrix.
   * 
   * @param {Array} rawData the raw data to turn into a dataset.
   */
  constructor(rawData) {
    this.#rawData = rawData;
  }

  async process() {
    this.wordCount = this.#rawData[0].length - 1;

    for await (const [i, row] of this.#rawData.entries()) {
      if (i == 0) continue;

      const blog = new Blog();

      for await (const [i, colVal] of this.#rawData[0].entries()) {
        const rowVal = row[i];
        
        if (i == 0) {
          blog.setName(rowVal);
          continue;
        }

        const rowValParsed = parseInt(rowVal);

        blog.setWord(colVal, rowValParsed);

        if (this.min[i - 1] == null || rowValParsed < this.min[i - 1]) {
          this.min[i - 1] = rowValParsed;
        }

        if (this.max[i - 1] == null || rowValParsed > this.max[i - 1]) {
          this.max[i - 1] = rowValParsed;
        }
      }

      this.blogs.push(blog);
    }
  }

  getMax() {
    return this.max;
  }

  getMin() {
    return this.min;
  }

  getWordCount() {
    return this.wordCount;
  }

  getBlogs() {
    return this.blogs;
  }
}
