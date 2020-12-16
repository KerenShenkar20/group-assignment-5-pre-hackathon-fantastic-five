const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const {userRouter}= require("./router");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Server static assets 
app.all('*', function(req, res, next) {
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token,x-api-key');
    next();
});

app.use('/api/users',userRouter);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
   });
app.listen(port, () => console.log('Express server is running on port ', port));