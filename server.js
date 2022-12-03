import express from "express"
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import pitchesRoute from "./routes/pitchRoute.js"

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/pitches", pitchesRoute)

const PORT = process.env.PORTUSED || 8081

app.get('/', (req, res) => {
    res.send("xharktank")
})

app.listen(PORT, () => {
    mongoose.connect('mongodb://localhost/xharktank', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4

    }, (err) => {
        if (!err) {
            console.log("connected");
        }
        else {
            console.log("error" + err);

        }
    });
})

 


