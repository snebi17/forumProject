const Fighters = require('../data/allFighter.json');

exports.getFighter = (req, res) => {
    let fighter = Fighters[req.data.name];

    if (!fighter) {
        return res.status(400).json({
            undefined
        });
    }
    res.json({
        fighter
    })
};