import express from 'express'
import { ENV } from './lib/env.js'
import path from 'path'
import { connectDB } from './lib/db.js'
import cors from 'cors'
import {serve} from "inngest/express"
import { functions, inngest } from './lib/inngest.js'

const app = express()

const __dirname = path.resolve()

//middleware
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials: true}))

app.use("/api/inngest", serve({client: inngest, functions}))
 

const startServer = async () => {
    try{
        await connectDB()
        app.listen(ENV.PORT, () => {
        console.log(`Server is running on port ${ENV.PORT}`)
        })
    }
    catch (error){
        console.log("Error starting the server", error)
    }
}

startServer()