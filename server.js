const express = require('express')//need the QUOTES
//now that we have express
//a convention
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.json())
//WHATTT CORSS MODULEEEEEE
const cors = require('cors')

app.use(cors()) // IMPORTANT HAVE TO USE IT WITH THIS BIT

//very simple route
const PORT = 8000

let jokes = {
    'joke1': {
        'question': 'the question1',
        'answer1': 'the answera1',
        'answer2': 'answerb1'
    },
    'joke2': {
        'question': 'the question2',
        'answer1': 'the answer2',
        'answer2': 'answerb 2'
    },
    'unknown': {
        'question': 'you tell me',
        'answer1': 'surprise2',
        'answer2': 'surpriseb 2'
    }
    
}

// let joke1 = {
//     'question': 'the question',
//     'answer': 'the answer',
//     'answer2': 'answer 2'
// }

//app.get('/', (request,response) => {   })
app.get('/', (request, response) => {
    response.sendFile(__dirname+'/index.html')
})

app.get('/api/joke/:jokeID', (request, response) => {
    let jokeID = request.params.jokeID.toLowerCase() //put it to lower case or make it an integer
    //make sure it's a number?
    //add 'joke' to the front of jokeID
    jokeID = 'joke' + jokeID
    if (jokes[jokeID]){
        response.json(jokes[jokeID])
    } else {
        response.json(jokes['unknown'])
    }
})

// app.get('/api/joke/1', (request, response) => {
//     response.json(joke1)
// })

//still need to have the server listen
//THis port option is very important, so it can work with ENV e.g. heroku
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
