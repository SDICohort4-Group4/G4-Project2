const express=require("express");
const router=express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJWT')

const ItemController = require("../controllers/item.controller");
const itemController = new ItemController;

// check routing is working
// router.get("/item",(req,res)=>{
//     return res.send("Item route is working!")
// })

router.get("/item", itemController.getAll);

router.get("/item/sku/:sku", itemController.getBySku);

router.get("/item/category1/:cat1", itemController.getByCat1);

router.get("/item/category2/:cat2", itemController.getByCat2);

router.get("/item/brand/:brand", itemController.getByBrand);

// can remove verifyJWT and verifyRoles middleware 
router.post("/item/add",verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.addItem);

router.put("/item/update/:sku", verifyJWT, verifyRoles('admin', 'superAdmin'),itemController.updateItem);

router.get("/admin/item", verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.adminGetAll)

router.get("/admin/item/sku/:sku", verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.adminGetBySku)

router.get("/admin/item/category1/:cat1", verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.adminGetByCat1);

router.get("/admin/item/category2/:cat2", verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.adminGetByCat2);

router.get("/admin/item/brand/:brand", verifyJWT, verifyRoles('admin', 'superAdmin'), itemController.adminGetByBrand);

module.exports = router;