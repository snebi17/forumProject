const mongoose = require('mongoose');

const Event = mongoose.model('Event');

exports.getEvents = (req, res) => {
    Event.find()
        .then(events => {
            if (!events) {
                return res.status(400).send({
                    message: 'No events found!'
                });
            }
            res.json({
                events
            });
        })
        .catch(err => console.log(err));
};

exports.getEvent = (req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            if (!event) {
                return res.status(400).send({
                    message: 'No event found!'
                });
            }
            res.json({
                event
            })
        })
        .catch(err => console.log(err));
}

exports.addEvent = (req, res) => {
    let event = req.body.data;

    let newEvent = new Event({
        event: event.event,
        fighter1: event.fighter1,
        fighter2: event.fighter2,
        date: new Date(event.date),
        venue: event.venue,
        category: event.category,
        imgTitle: event.imgTitle
    });

    console.log(newEvent);

    newEvent.save(newEvent)
        .then(() => {
            res.status(200).send({
                message: 'Event has been saved!'
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
};

exports.removeEvent = (req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).send({
                message: 'Post has been deleted'
            });
        })
        .catch(err => res.status(500).send({
            message: err
        }));
}

exports.editEvent = (req, res) => {
}