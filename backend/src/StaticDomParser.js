const cheerio = require('cheerio');
const axios = require('axios');

class StaticDomParser {
    async parse(url) {
        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: 'text/html',
                },
            });
            const title = this.parseTitle(response.data);
            const description = this.parseDescription(response.data);
            const image = this.addPrefix(this.parseImage(response.data), url);

            return {
                title,
                description,
                image,
            };
        } catch (err) {
            throw err;
        }
    }
    parseTitle(htmlString) {
        const $ = cheerio.load(htmlString);

        const ogTitle = $('meta[property="og:title"]').attr('content');
        if (ogTitle) {
            return ogTitle;
        }

        const twitterTitle = $('meta[name="twitter:title"]').attr('content');
        if (twitterTitle) {
            return twitterTitle;
        }

        const metaTitle = $('meta[name="title"]').attr('content');
        if (metaTitle) {
            return metaTitle;
        }

        const h1Title = $('h1').html();
        if (h1Title) {
            return h1Title;
        }

        const h2Title = $('h2').html();
        if (h2Title) {
            return h2Title;
        }
        return null;
    }

    parseDescription(htmlString) {
        const $ = cheerio.load(htmlString);

        const ogDescription = $('meta[property="og:description"]').attr(
            'content'
        );
        if (ogDescription) {
            return ogDescription;
        }

        const twitterDescription = $('meta[name="twitter:description"]').attr(
            'content'
        );
        if (twitterDescription) {
            return twitterDescription;
        }

        const metaDescription = $('meta[name="description"]').attr('content');
        if (metaDescription) {
            return metaDescription;
        }

        const firstParagraph = $('p').html();
        if (firstParagraph) {
            return firstParagraph;
        }

        return null;
    }

    parseImage(htmlString) {
        const $ = cheerio.load(htmlString);

        const ogImg = $('meta[property="og:image"]').attr('content');
        if (ogImg) {
            return ogImg;
        }

        const imgRelLink = $('link[rel="image_src"]').attr('href');
        if (imgRelLink) {
            return imgRelLink;
        }

        const twitterImg = $('meta[name="twitter:image"]').attr('content');
        if (twitterImg) {
            return twitterImg;
        }

        const img = $('img').attr('src');
        if (img) {
            return img;
        }

        return null;
    }

    addPrefix(img, uri) {
        return img.indexOf('//') === -1 ? `${new URL(uri).origin}/${img}` : img;
    }
}

module.exports = StaticDomParser;
