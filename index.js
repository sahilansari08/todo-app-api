const express = require('express')
const fs = require("fs");
const bcryptjs = require('bcryptjs');
const { readFile, writeFile } = require('./common');

const app = express();
app.use(express.json())


app.get('/todo', (req, res) => {
    let data = readFile("todo")
    const query = req.query
    if (Object.keys(query).includes("completed")) {
        if (query.completed == "true") {
            data = data.filter((item) => item.completed)
        } else {
            data = data.filter((item) => !item.completed)
        }

    }
    res.send({ status: true, data: data })

})

app.get('/todo/:id', (req, res) => {

    let data = readFile("todo")
    var filtered_dsignupata = data.filter((item) => item.id == req.params.id)

    if (filtered_data.length > 0) {
        res.send({ status: true, data: filtered_data[0] })
    }
    else {
        res.send({ status: false, message: "Invalid id found." })
    }
    // console.log(filtered_data, 'f....');
})

app.post('/todo', (req, res) => {
    const tital = req.body
    if (!tital.title) {
        res.send({ status: false, message: "tital blancked" })
    }
    let data = readFile("todo")
    tital.id = data.length + 1
    tital.completed = false
    tital.created_at = new Date()
    tital.updated_at = null
    data.push(tital)
    // console.log(tital)
    writeFile("todo", data)
    res.send({ status: true, data: tital })
})

app.put('/todo/:id', (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.send({ status: false, message: "request is invalid" })
    }
    const New_data = req.body
    let data = readFile("todo")
    const IsData = data.filter((item) => item.id == req.params.id)
    // console.log(IsData)

    if (IsData.length == 0) {
        res.send({ status: false, message: "Invalid id found." })
    } console.log(req.body);

    for (let i of IsData) {
        i.title = New_data.title || i.title
        i.completed = New_data.completed || i.completed
        i.updated_at = new Date()
        console.log(i)
    }
    writeFile("todo", data)
    res.send({ status: true, data: IsData })
})

app.delete('/todo/:id', (req, res) => {
    let data = readFile("todo")
    for (let item of data) {
        if (item.id == req.params.id) {
            data.pop(data.indexOf(item))
        }
    }
    writeFile("todo", data)
    res.send({ status: true, data: data })
})

app.post('/signup', (req, res) => {
    let data = readFile("user")
    const signup_data = req.body

    filtered_data = data.filter( (item)=> item.email == req.body.email)
    if(filtered_data.length>0){
        return res.send({status:false,message:"user already exist."})
    }
    signup_data.password = bcryptjs.hashSync(signup_data.password, 1)
    signup_data.id = data.length + 1
    signup_data.created_at = new Date()
    signup_data.updated_at = null
    data.push(signup_data)
    writeFile('user', data)
    res.send({ status: true, data: signup_data })

})
app.post('/login',(req,res)=>{
    let data = readFile("user")
    const login_data = req.body
    filtered_data = data.filter( (item)=> item.email == req.body.email)
    if(filtered_data.length == 0){
        return res.send({status:false,message:"user not exist"})
    }
    const password1 = bcryptjs.compareSync(req.body.password,filtered_data[0].password)
    if(!password1){
        res.send({status:false,message:"Invalid email,password"})
    }
    res.send({status:true,data:filtered_data[0]})
})
app.listen(5000)