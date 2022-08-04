const app = require('./src/app');

const startServer = async () => {
    const PORT = process.env.PORT || 5500;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

startServer();
