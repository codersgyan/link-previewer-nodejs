const StaticDomParser = require('./StaticDomParser');
const DomParser = require('./DomParser');

const metaHandler = (req, res, next) => {
    const { url } = req.query;
    if (!url) {
        return res.sendStatus(400);
    }
    (async () => {
        try {
            // We can inject any kind of Parser here...
            const parser = new DomParser(new StaticDomParser());
            const meta = await parser.parse(url);
            res.json(meta);
        } catch (err) {
            console.log(err);
            return next(err);
        }
    })();
};

module.exports = metaHandler;
