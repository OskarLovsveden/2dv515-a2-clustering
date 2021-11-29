export default class DataSet {
  rawData = [];
  wordCount = 0;
  blogs = [];
  min = [];
  max = [];

  constructor(rawData) {
    this.rawData = rawData;
  }

  async process() {
    this.wordCount = this.rawData[0].length - 1;

    for await (const [i, row] of this.rawData.entries()) {
      if (i == 0) continue;

      const blog = {};
      // const blog = new Blog();

      for await (const [i, key] of this.rawData[0].entries()) {
        const value = parseInt(row[i]);

        blog[key] = value;

        if (i == 0) {
          // blog.setName(value); // replaces row 24
          continue;
        }

        // blog.words[key] = value; // replaces row 24

        if (this.min[i - 1] == null || value < this.min[i - 1]) {
          this.min[i - 1] = value;
        }

        if (this.max[i - 1] == null || value > this.max[i - 1]) {
          this.max[i - 1] = value;
        }
      }

      this.blogs.push(blog);
    }
  }
}
