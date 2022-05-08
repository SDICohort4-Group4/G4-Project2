const express=require("express");
const router=express.Router();

const AdminUserController=require("../controllers/admin.user.controller");
const adminUserController= new AdminUserController();

// check routing is working
router.get("/admin",(req,res)=>{
    return res.send("Admin route is working!")
})

router.post("/admin/register", adminUserController.register);

router.post("/admin/login", adminUserController.login);


module.exports=router;