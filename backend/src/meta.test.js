const request = require('supertest');
const assert = require('assert');
const app = require('./app');
const mockedAxios = require('axios');
jest.mock('axios');

describe('GET /api/meta', function () {
    it('sends 400 if url query param does not exists', (done) => {
        request(app)
            .get('/api/meta')
            .set('Accept', 'application/json')
            .expect(400, done);
    });

    it('should return meta info if proper url provided', async () => {
        const mockedResponse = {
            title: 'Next JS blog using Typescript and Strapi headless CMS  🔥🔥🚀 ( Hindi )',
            description:
                'Register for free for MERN Course now 🔥🔥🚀https://mern.space🔥👉🏾 Support this channel:  https://www.youtube.com/channel/UCo9xTRmg1SqQ5JSsA2fAgJw/joinNext...',
            image: 'https://i.ytimg.com/vi/JEwokvSQK4o/hqdefault.jpg',
        };

        mockedAxios.get.mockResolvedValue({
            data: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
                <meta name="title" content="${mockedResponse.title}"/>
                <meta name="description" content="${mockedResponse.description}"/>
                <meta property="og:image" content="${mockedResponse.image}"/>
            </head>
            <body>

            </body>
            </html>
        `,
        });
        const url = 'https://www.youtube.com/watch?v=JEwokvSQK4o';

        const response = await request(app)
            .get(`/api/meta?url=${url}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('image');
        expect(response.body).toEqual(mockedResponse);
    });
});
