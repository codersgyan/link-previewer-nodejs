class DomParser {
    constructor(parser) {
        this.parser = parser;
    }
    parse(url) {
        return this.parser.parse(url);
    }
}

module.exports = DomParser;
