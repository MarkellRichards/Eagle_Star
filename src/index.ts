import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express'
import { UserRoute } from "./routes";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/users', UserRoute)

createConnection().then(async  => {

   app.listen(5000, () => console.log('Server up at http://localhost:5000'))

}).catch(error => console.log(error));
