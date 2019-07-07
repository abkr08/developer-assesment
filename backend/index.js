const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
//bodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/students', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected');
});
const Student = mongoose.model('Student', 
    { 
        id: Number,
        firstName: String,
        lastName: String,
        age: Number,
        nationality: String
    }
);

app.get('/', (req, res) => {
    res.send('Working!!!');
})

app.get('/students', (req, res) => {
    Student.find({}, (err, students) => {
        if (students.length){
            res.send(students);
        } else {
            res.status(404)        // HTTP status 404: NotFound
                .send('No student found');
        }
        
    });
})

app.post('/init', (req, res) => {
    const {id, firstName, lastName, age, nationality} = req.body;
    const student = new Student({ 
        id,
        firstName,
        lastName,
        age,
        nationality
    });
    student.save().then(() => res.send(200));
})
app.listen(8080, () => {
    console.log('server listening on port 8080');
})