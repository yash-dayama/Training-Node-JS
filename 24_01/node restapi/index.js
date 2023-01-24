const express = require("express");
const app = express();
const port = 3000;

// // parse json using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies =[{
    id: "1",
    title: "Golmaal",
    director: "Rohit Shetty",
    release_date: "2006-07-14",
},
{
    id: "2",
    title: "Jab we Met",
    director: "Imtiaz Ali",
    release_date: "2007-09-26",
}, 
];

// get movie list in form of json
app.get("/movie", (req, res) =>{
    res.json(movies);
});

// add movie to list

app.post("/movie", (req, res) => {
    const movie = req.body;

    console.log(movie);
    movies.push(movie);
    res.send("Movie is send to List!!"); 
});

// search for movies in the list
app.get('/movie/:id', (req, res) => {
    const id = req.params.id;

    for(let movie of movies){
        if(movie.id === id){
            res.json(movie);
            return;
        }
    }
    res.status(404).send("Movies Not Found!!");
});

// delete movie from list
app.delete('/movie/:id', (req, res) => {
    const id = req.params.id;

    movies = movies.filter(movie => {
        if(movie.id !== id){
            return true;
        }
        return false;
    });
    res.send("Movie is Deleted!!");
});

// set server to listen at port
app.listen(port, () => console.log('Server listening at port ${port}'));
