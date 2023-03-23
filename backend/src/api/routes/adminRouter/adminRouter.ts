import express from "express";
const router = express.Router()

router.route('/')
.get((req,res)=>{
    console.log("Admin router has been reached")
    res.send("Admin router has been reached")
})

export default router