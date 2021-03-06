const express = require("express");
const router=express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJWT')

const ItemController = require("../controllers/item.controller");
const itemController = new ItemController;

// check routing is working
// router.get("/item",(req,res)=>{
//     return res.send("Item route is working!")
// })

//get list of all the Item cat1 header
router.get("/item/category-list", itemController.getCatList);

router.get("/item/:property?/:value?/:value2?/:value3?", itemController.getByItem)

// can remove verifyJWT and verifyRoles middleware 
router.post("/item/add", verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.addItem);

router.put("/item/update/:sku", verifyJWT, verifyRoles('admin', 'superAdmin'),itemController.updateItem);

router.get("/admin/item/:property?/:value?/:value2?/:value3?", verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.adminGetByItem)

module.exports = router;