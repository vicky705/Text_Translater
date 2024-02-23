const { translate } = require('free-translate');
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 4000
const translateHandler = async(text, fromLan, toLan) => {
    return await translate(text, { from: fromLan, to: toLan });
}
app.use(cors())
app.use(express.json())

app.get('/', async(req, res) => {
    res.status(200).json("Welcome")
})

app.post('/', async(req, res) => {
    res.status(200).json("Welcome post")
})

app.post("/translate", async(req, res) => {
    let status = false
    try{
        const data = req.body
        if(data.text.length <= 0){
            return res.status(404).json({status, message : "Invalid text."})
        }
        const val = await translateHandler(data.text, "en", "fr")
        status = true
        return res.status(200).json({status, translation : val})
    } 
    catch(error) {
        res.status(500).json({status, message : "Internal server error.", error})
    }
})
app.post("/translateMore", async(req, res) => {
    let status = false
    try{
        const data = req.body
        if(data.text.length <= 0){
            return res.status(404).json({status, message : "Invalid text."})
        }
        const val = await translateHandler(data.text, data.from, data.to)
        status = true
        return res.status(200).json({status, translation : val})
    } 
    catch(error) {
        res.status(500).json({status, message : "Internal server error.", error})
    }
})


app.listen(PORT, () => {
    console.log(`Server start at http://localhost:${PORT}`)
})

