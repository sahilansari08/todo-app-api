const { log } = require('console');
const express = require('express')
const fs = require("fs");
const { title } = require('process');
const { message } = require('prompt');

const app = express();
app.use(express.json())


app.get('/todo', (req, res) => {
    const data = fs.readFileSync("data.json", 'utf8')
    res.send({ status: true, data: JSON.parse(data) })
})

app.get('/todo/:id', (req, res) => {

    const data = JSON.parse(fs.readFileSync("data.json", 'utf-8'))
    var filtered_data = data.filter((item) => item.id == req.params.id)

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
    const data = JSON.parse(fs.readFileSync("data.json", 'utf8'))
    tital.id = data.length+1
    tital.completed = false
    tital.created_at = new Date()
    tital.updated_at = null
    data.push(tital)
    // console.log(tital)
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
    res.send({ status: true, data: tital })
})

app.put('/todo/:id', (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.send({ status: false, message: "request is invalid" })
    }
    const New_data = req.body
    const data = JSON.parse(fs.readFileSync("data.json", 'utf8'))
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
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
    res.send({ status: true, data: IsData })
})

app.delete('/todo/:id',(req,res)=>{
    const data = JSON.parse(fs.readFileSync("data.json", 'utf8'))
    for (let item of data){
        if(item.id == req.params.id){
            data.pop(data.indexOf(item))
        }
    }
    fs.writeFileSync('data.json', JSON.stringify(data, null, 4))
    res.send({status:true,data:data})
})

app.listen(5000)