export default class Blog {
    name = ""
    words = []
    
    setName(value) {
        this.name = value;
    }

    setWord(word, occurence) {
        this.words.push({
            word,
            occurence
        })
    }

    wordCount(i) {
        return this.words[i].occurence
    }
}