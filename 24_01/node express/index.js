const express = require('express')
const app = express()   

// app.get('/', (req, res) =>{
//     res.send('Hello There!!')
// })

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/api/users'))


app.listen(3000, ()=>{
    console.log('Server started on port 3000')
})