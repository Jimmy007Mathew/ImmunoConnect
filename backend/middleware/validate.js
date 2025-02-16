// For validating child creation
const validateChild = (req, res, next) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ message: 'Name and age are required' });
    }

    if (typeof age !== 'number' || age < 0 || age > 18) {
        return res.status(400).json({ message: 'Invalid age value' });
    }

    next();
};

module.exports = { validateChild };