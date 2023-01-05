// import jsonwebtoken for authentication
const { request } = require('express');
const jwt = require('jsonwebtoken')
// import model account
const db = require('./mongodb')
//date and time////////////////////////
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let cTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
let cDate = (cDay + "/" + cMonth + "/" + cYear);
/////////////////////////////////////////
// login function
const login = (acno, pswd) => {
    // check acno and pswd is present in mongodb
    // asynchronouse function -promise
    return db.Account.findOne({ //LOGIN  acno pswd present in db 
        acno,
        password: pswd
    }).then((result) => {
        if (result) {
            // generate token
            let cAcno = acno
            console.log('login successfull')
            ////// JWT  authentication  Token Creation///////
            const token = jwt.sign({
                cAcno: acno
            }, 'bankl0g1n')

            /////////////////////////////////////////////////     
            return {
                status: true,
                message: "login successfull",
                username: result.username,
                email:result.email,
                balance: result.balance,
                statusCode: 200,
                token,
                cAcno,
                cardBalance: result.cardbalance

            }
        } else {
            console.log('login UNsuccessfull')
            return {
                status: false,
                message: "invalid account or password",
                statusCode: 404
            }
        }
    }).catch((error) => {
        console.log(error)
    })
}
// register
const register = (acno, pswd, usrnme, email) => {
    return db.Account.findOne({
        acno
    }).then((result) => {
        if (result) {
            console.log('acno already exist')
            return {
                status: false,
                message: "Account Exist",
                statusCode: 404
            }
        } else {
            console.log('register success')
            let newAccount = new db.Account({
                acno,
                password: pswd,
                username: usrnme,
                email,
                balance: 0,
                transaction: [],
                cardbalance: 0,
                creditcard: []
            })
            newAccount.save()
            return {
                status: true,
                message: 'register success',
                statusCode: 200
            }
        }
    }).catch((error) => {
        console.log(error)
    })
}
// fund transfer
const fundTransfer = (request, acnoname, acno, amount, pswd, frmAcno) => { // <request> jwt token from index.js
    tamt = Number(amount)
    return db.Account.findOne({  //from acount validation in db
        acno: frmAcno,
        password: pswd
    }).then((result) => {
        console.log("dataservice" + request.cAcno)
        console.log("from account" + frmAcno)
        if (request.cAcno != frmAcno) {     // jwt token validation 
            return {     // jawt token account in <request> and fromacono not in  equal operstion denied
                status: false,
                message: ('Operation Denied'),
                statusCode: 404
            }
        } else { // user account balance check
            if (result) {
                if (tamt <= result.balance) {
                    result.balance -= tamt
                    result.transaction.push({
                        date: cDate,
                        time: cTime,
                        type: "debit",
                        toacno: acno,
                        remark: "account transfer",
                        amount: tamt
                    })
                    let crntBalance = result.balance
                    result.save()
                    return db.Account.findOne({ // To account validation
                        acno,
                        username: acnoname

                    }).then((usrfind) => {
                        if (usrfind) {
                            usrfind.balance += tamt
                            usrfind.transaction.push({
                                date: cDate,
                                time: cTime,
                                type: "credit",
                                remark: "credited from"+frmAcno,
                                amount: tamt
                            })
                            usrfind.save()
                            return {
                                status: true,
                                message: ('Amount successfully transferred  '),
                                statusCode: 200,
                                crntBalance
                            }
                        } else {
                            return {
                                status: false,
                                message: ('invalid account name or number '),
                                statusCode: 404
                            }
                        }
                    })
                } else {
                    return {
                        status: false,
                        message: ('inefficient balance'),
                        statusCode: 404
                    }
                }
            } else {
                console.log('transaction UNsuccessfull')
                return {
                    status: false,
                    message: "invalid Transaction password",
                    statusCode: 404
                }
            }
        }
    })
}
/// credit card fund transfer
const creditTransfer = (request, amount, pswd, frmAcno) => { // <request> jwt token from index.js
    crdtamt = Number(amount)

    return db.Account.findOne({  //from acount validation in db
        acno: frmAcno,
        password: pswd
    }).then((result) => {
        console.log("dataservice" + request.cAcno)
        console.log("from account" + frmAcno)
        if (request.cAcno != frmAcno) {     // jwt token validation 
            return {     // jawt token account in <request> and fromacono not in  equal operstion denied
                status: false,
                message: ('Operation Denied'),
                statusCode: 404
            }
        } else { // user account balance check
            if (result) {
                if (crdtamt <= result.balance) {
                    result.balance -= crdtamt
                    result.cardbalance += crdtamt
                    result.transaction.push({
                        date: cDate,
                        time: cTime,
                        type: "Credit Card",
                        toacno: "Credit Card",
                        remark: "credit card transfer",
                        amount: crdtamt
                    })
                    result.creditcard.push({
                        date: cDate,
                        time: cTime,
                        type: "credited",
                        remark: "from account",
                        amount: crdtamt

                    })
                    let crntbalance = result.balance
                    let cardBalance = result.cardbalance
                    result.save()
                    return {
                        status: true,
                        message: ('Credit card transaction successfull'),
                        statusCode: 200,
                        crntbalance,
                        cardBalance

                    }
                } else {
                    return {
                        status: false,
                        message: ('inefficient balance'),
                        statusCode: 404
                    }
                }
            } else {
                console.log('transaction UNsuccessfull')
                return {
                    status: false,
                    message: "invalid Transaction password",
                    statusCode: 404
                }
            }
        }
    })
}
// balance enquary
const getbalance = (request, acno) => {
    return db.Account.findOne({
        acno
    }).then((result) => {
        if (request.cAcno == acno) {
            let crntAcnobalance = result.balance
            let crntCrdtbalance = result.cardbalance
            console.log(crntAcnobalance, crntCrdtbalance)
            return {
                status: true,
                message: ('balence request successfull'),
                statusCode: 200,
                crntAcnobalance,
                crntCrdtbalance
            }
        } else {
            return {     // jawt token account in <request> and fromacono not in  equal operation denied
                status: false,
                message: ('Operation Denied'),
                statusCode: 404
            }
        }
    })
}

// get transaction history
const gettransaction = (request, acno) => {
    return db.Account.findOne({
        acno
    }).then((result) => {
        if (request.cAcno == acno) {
            let transactionData = result.transaction
            console.log(transactionData)
            return {
                status: true,
                message: ('Transaction history request successfull'),
                statusCode: 200,
                transactionData
            }
        } else {
            return {     // jawt token account in <request> and fromacono not in  equal operstion denied
                status: false,
                message: ('Operation Denied'),
                statusCode: 404
            }
        }
    })
}

// account delete 
const deleteAccount=(acno)=>{
    return db.Account.deleteOne({acno}).then((result)=>{
        if (result){
            return{
                statusCode:200,
                status:true,
                message:"Account deleted successfully"

            }
        }else{
            return{
                status:false,
                statusCode:404,
                message:"Account deletion failed"
            }
        }
    })

}


// exporting login 
module.exports = {
    login,
    register,
    fundTransfer,
    creditTransfer,
    getbalance,
    gettransaction,
    deleteAccount
}