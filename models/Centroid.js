export default class Centroid {
    #wordCount = []
    assignments = []
    
    setWordCount(i, value) {
        this.#wordCount[i] = value;
    }
    
    wordCount(i) {
        return this.#wordCount[i]
    }

    assign(toBeAssigned) {
        this.assignments.push(toBeAssigned)
    }

    clearAssignments() {
        this.assignments = []
    }

    getAssignments() {
        return this.assignments;
    }
}