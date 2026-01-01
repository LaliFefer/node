module.exports = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`Received request: ${req.method} ${req.originalUrl} at ${now}`);
    next();
};
