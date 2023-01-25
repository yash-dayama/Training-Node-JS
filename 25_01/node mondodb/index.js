require('./models/db');

const express = require('express');
const path = require('path');
const handlebars = require('handlebars'); //compile templated intp JS
const { engine } = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const { extname } = require('path');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const studentController = require('./controllers/studentController');


// content
app.get('/', (req, res) => {

    res.send(`
        <h2>Welcome to students Database</h2>
        <h3> Click here to access the <b> <a href ="/student/list"> Database </a></b></h3>`);
});
// app.get("/abc",(req,res)=>{
//     console.log("in abc")
// })
app.set("views", path.join(__dirname, "/views/"));
console.log(path.join(__dirname, "/views/"))

app.engine("hbs",
    engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: "hbs",
    defaultLayout:"mainLayouts",
    layoutsDir: __dirname + "/views/layouts/",

}));

app.set("view engine", "hbs");

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
} );

app.use('/student', studentController);