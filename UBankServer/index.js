// importing express
const express = require('express')
// import jsonwebtoken
const jwt = require('jsonwebtoken')

// // import data service
const dataservice = require('./service/dataservice')

// import cors Cross-Origin Resource Sharing
const cors = require('cors')
const { request, response } = require('express')

//create server app
const bankApp = express()

// define orgin to server app
bankApp.use(cors({
    origin: ["http://localhost:4200"]

}))

// to parse json data
bankApp.use(express.json())

// setup a port number for server app
bankApp.listen(3000, () => {
    console.log('server running port 3000');
})

// application specific middleware ////// authentication

const applicationMiddleware = (req, res, next) => {
    console.log('middleware active'); next()
}
bankApp.use(applicationMiddleware)

// Router-level middleware/////// token validation 

const routerMiddleware = (req, res, next) => {
    console.log('routerMiddleware active');
    //get token from request headers 'jwt' token key
    let token = req.headers['jwt']
    // verify token using jsonweb token
    console.log("token " + token)
    try {
        let data = jwt.verify(token, 'bankl0g1n')
        console.log("verify JWT Data");
        console.log(data);
        request.cAcno = data.cAcno
        next()
    } catch {
        res.status(404).json({
            status: false,
            message: "login again"
        })
    }
}
// http request REST api  -post
//login api 
bankApp.post('/login', (request, response) => {

    dataservice.login(request.body.acno, request.body.pswd).then((result) => {
        response.status(result.statusCode).json(result)
    })
})
//rgister api
bankApp.post('/register', (request, response) => {
    console.log("registe req" + request.body.acno, request.body.password, request.body.password, request.body.email)
    dataservice.register(request.body.acno, request.body.password, request.body.username, request.body.email)
        .then((result) => {
            response.status(result.statusCode).json(result)
        })
})

// Fund transfer api 
bankApp.post('/sendmoney', routerMiddleware, (request, response) => { // passing jwt token in argument <request>
    dataservice.fundTransfer(request, request.body.acnoname, request.body.acno, request.body.amount, request.body.pswd, request.body.frmAcno)
        .then((result) => {
            response.status(result.statusCode).json(result)
        }).catch((error) => {
            console.log(error)
        })
})

// credit card transfer
bankApp.post('/creditcard', routerMiddleware, (request, response) => {
    dataservice.creditTransfer(request, request.body.amount, request.body.pswd, request.body.frmAcno).then((result) => {
        response.status(result.statusCode).json(result)
    }).catch((error) => {
        console.log("card transfer" + error)
    })

})

// bank balance enquary
bankApp.post('/getbalance',routerMiddleware,(request, response)=>{
    dataservice.getbalance(request,request.body.acno).then((result)=>{
        response.status(result.statusCode).json(result)
    }).catch((error)=>{
        console.log("balance ENQ " + error)
    })
})

// Transaction History
bankApp.post('/gettransaction',routerMiddleware,(request,response)=>{
    dataservice.gettransaction(request,request.body.acno).then((result)=>{
        response.status(result.statusCode).json(result)
    }).catch((error)=>{
        console.log("Transaction History"+error);
    })
})

//delete account
bankApp.delete('/deleteacno/:acno',(request,response)=>{ // params url value fetching
    dataservice.deleteAccount(request.params.acno).then((result)=>{
        response.status(result.statusCode).json(result)
    }).catch((error)=>{
        console.log ("delete account" +error)
    })
})



// http request REST api get
bankApp.get('/', (request, response) => {
    response.send('get method')

})

// http request REST api  -patch
bankApp.patch('/', (request, response) => {
    response.send('patch mathod');
})
// http request REST api  -put
bankApp.put('/', (request, response) => {
    response.send('put mathod');
})
// http request REST api  -delete
bankApp.delete('/', (request, response) => {
    response.send('delete mathod');

})







