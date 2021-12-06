export default class Blog {
  name = "";
  #wordCount = [];

  setName(value) {
    this.name = value;
  }

  getName() {
    return this.name;
  }

  getWordCount(i) {
    return this.#wordCount[i];
  }

  setWordCount(i, count) {
    this.#wordCount.splice(i, 1, count);
  }
}
