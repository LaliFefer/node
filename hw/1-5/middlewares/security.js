// Simulated security middleware: random check 0..10, if 9 -> 401
module.exports = (req, res, next) => {
    const n = Math.floor(Math.random() * 11); // 0..10
    if (n === 9) {
        console.log(`Security middleware: blocked ${req.method} ${req.originalUrl} (rand=${n})`);
        return res.status(401).json({ error: 'Request not secure (simulated)' });
    }
    console.log(`Security middleware: allowed (rand=${n})`);
    next();
};
