const User = require('./models/users');

exports.userController = {
    getUsers(req, res) {
        User.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
    getUser(req, res) {
        User.findOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    filterUsers(req, res) {
        let query = {}
        if (req.query.job){
            query.job = req.query.job
        }
        if (req.query.gender){
            query.gender = req.query.gender
        }
        if (req.query.email){
            query.email = req.query.email
        }
        console.log(query);
        User.find(query)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    addUser(req, res) {
        const { body } = req;
        const newUser = new User(body);
        const result = newUser.save();
        if (result) {
            res.json(newUser)
        } else {
            res.status(404).send("Error saving a restaurant");
        }
    },
    updateUser(req, res) {
        const { body } = req;
        User.updateOne({ id: req.params.id }, body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error updating restaurant from db: ${err}`));
    },
    deleteUser(req, res) {
        User.deleteOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error deleting user from db: ${err}`));
    }
};
