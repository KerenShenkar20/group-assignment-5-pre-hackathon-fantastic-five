const User = require('../models/users');

exports.userController = {
    getUsers(req,res){
        User.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
    getUser(req,res){
        User.findOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
    deleteUser(req,res){
        // const user = userExistence(res, req);
        // if(!user){
        //     console.log("User NOT found");
        //     return;
        // }
        User.deleteOne({ id: req.params.id } ) 
            .then(docs => { console.log(`User deleted ${req.params.id}`) , res.json(docs)  })
            .catch(err => console.log(`Error deleting restaurant from db: ${err}`));
    }
};
// function userExistence(res,req){
//     const user = User.findOne({ id: req.params.id });
//     if (!user){
//         res.status(404).send(`Can't finde user: ${req.params.id}`);
//         return;
//     } 
//     return user;
// }