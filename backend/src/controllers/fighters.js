const mongoose = require('mongoose');

const Rankings = require('../data/fighters.json');
const AllFighters = require('../data/allFighters.json');

exports.getRankings = (req, res) => {
    res.json({
        rankings: Rankings
    })
}

exports.getFighters = (req, res) => {
    let fighters = Rankings[req.params.class];

    if (!fighters) {
        return res.status(400).send({
            message: 'Ta weight class ne obstaja!'
        });
    }
    res.status(200).json({
        data: [... fighters]
    });
};

exports.getFighter = (req, res) => {
    let fighter = null;
    AllFighters.forEach(f => {
            if (f.name === req.params.fullname) {
                fighter = f;
            };
        }
    );
    if (fighter === null) {
        return res.json({
            
        })
    }
    res.status(200).json({
        fighter
    });
}