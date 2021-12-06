export default class Centroid {
  #wordCount = [];
  assignments = [];
  prevAssignments = [];

  setWordCount(i, count) {
    this.#wordCount[i] = count;
  }

  wordCount(i) {
    return this.#wordCount[i];
  }

  assign(toBeAssigned) {
    this.assignments.push(toBeAssigned);
  }

  clearAssignments() {
    this.prevAssignments = this.assignments;
    this.assignments = [];
  }

  getAssignments() {
    return this.assignments;
  }

  getPrevAssignments() {
    return this.prevAssignments;
  }
}
