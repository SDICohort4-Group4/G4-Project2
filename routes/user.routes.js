const express = require("express");
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJWT')

const UserController = require("../controllers/user.controller");
const userController = new UserController();

// check routing is working
// router.get("/user",(req,res)=>{
//     return res.send("User route is working!")
// })

// check routing is working to root
router.get("/",(req,res)=>{
    return res.send("Group 4 Project 2 root page.")
})

//router.get("/user", userController.getAllUser)

router.post("/user/register", userController.registerUser);

router.post("/user/login", userController.loginUser);

router.put("/user/update", verifyJWT, verifyRoles('user'), userController.updateUser);

router.get("/user/user-info", verifyJWT, verifyRoles('user'), userController.getInfo);


module.exports = router;