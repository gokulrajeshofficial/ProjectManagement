import dotenvConfig from "../../dotenvConfig"
import express , {Application} from "express"

const serverConfig = (app : Application)=>{
    const port = dotenvConfig.port
    app.listen(port , ()=>{
        console.log(`Server listening on Port ${port}`)
    })
}

export default serverConfig  