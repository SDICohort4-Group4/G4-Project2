const Joi = require('joi');
const {Sequelize, Op} = require('sequelize')

const {Item} = require("../models");

class ItemService{

    excludeData = [                
        "itemID", 
        "itemPrice", 
        "itemDiscount", 
        "hidden", 
        "deleted", 
        "expiryDate", 
        "createdByAdminID", 
        "updatedByAdminID", 
        "createdAt", 
        "updatedAt"
    ];

    validateDate(val) {

        // YYYY/MM/DD or MM/DD/YYYY(primary)
        try {
            new Date(val).toISOString();
            return true;
        } catch (e) {
            return false; 
        };
    
    };

    async getByItem(property, value, value2, value3){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        let getItem = null;

        //Retrive item data by sku/skustrict/name/description/category1/category2/brand/salepricelt/salepricegt/qtylt/qtygt:property?
        switch(property){
            case "sku":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where:{SKU: {[Op.iLike]:`%${value}%`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData}
                });
                break;
            case "skustrict":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where:{SKU: `${value}`, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData}
                });
                break;
            case "brand":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {brand: {[Op.iLike]:`%${value}%`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData}
                });
                break;
            case "category1":
                if(property ==  null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemCategory1: {[Op.iLike]:`%${value}%`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData}
                });
                break;
            case "category2":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemCategory2: {[Op.iLike]:`%${value}%`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData}
                });
                break;
            case "name":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemName: {[Op.iLike]:`%${value}%`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData}
                });
                break;
            case "description":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemDescription: {[Op.iLike]:`%${value}%`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData}
                });
                break;
            case "salepricelt":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemSalePrice: {[Op.lte]:`${value}`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData},
                    order: [['itemSalePrice','DESC']]
                });
                break;
            case "salepricegt":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemSalePrice: {[Op.gte]:`${value}`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData},
                    order: [['itemSalePrice','ASC']]
                });
                break;
            case "qtylt":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {Qty: {[Op.lte]:`${value}`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData},
                    order: [['Qty','DESC']]
                });
                break;
            case "qtygt":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {Qty: {[Op.gte]:`${value}`}, hidden: false, deleted: false},
                    attributes: {exclude: this.excludeData},
                    order: [['Qty','ASC']]
                });
                break;
        }

        // Retrive all item data
        if(property == null && value == null && value2 == null && value3 == null){
            getItem = await Item.findAll({
                attributes: {exclude: this.excludeData}                
            // const [itemPrice, itemDiscount, hidden, deleted, expiryDate, createdByAdminID, updatedByAdminID, createdAt, updatedAt, ...visible ] = getAllItems;
            });
        };

        if(getItem == null){
            result.message = `/${property}/${value} does not exist`;
            result.status = 404;

            return result;
        };


        result.message = `Item data retrieved successfully`;
        result.data = getItem;
        result.status = 200;

        return result;

    }

    async adminGetByItem(property, value, value2, value3){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        let getItem = null;

        //Retrive item data by sku/sku/strict/name/description/category1/category2/brand/salepricelt/salepricegt/qtylt/qtygt/hidden/deleted/:property?
        switch(property){
            case "sku":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where:{SKU: {[Op.iLike]:`%${value}%`}}
                });
                break;
            case "skustrict":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where:{SKU: `${value}`}
                });
                break;
            case "brand":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {brand: {[Op.iLike]:`%${value}%`}}
                });
                break;
            case "category1":
                if(property ==  null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemCategory1: {[Op.iLike]:`%${value}%`}}
                });
                break;
            case "category2":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemCategory2: {[Op.iLike]:`%${value}%`}}
                });
                break;
            case "name":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemName: {[Op.iLike]:`%${value}%`}}
                });
                break;
            case "description":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemDescription: {[Op.iLike]:`%${value}%`}}
                });
                break;
            case "salepricelt":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemSalePrice: {[Op.lte]:`${value}`}},
                    order: [['itemSalePrice','DESC']]
                });
                break;
            case "salepricegt":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {itemSalePrice: {[Op.gte]:`${value}`}},
                    order: [['itemSalePrice','ASC']]
                });
                break;
            case "qtylt":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {Qty: {[Op.lte]:`${value}`}},
                    order: [['Qty','DESC']]
                });
                break;
            case "qtygt":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {Qty: {[Op.gte]:`${value}`}},
                    order: [['Qty','ASC']]
                });
                break;
            case "hidden":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {hidden:`${value}`}
                });
                break;
            case "deleted":
                if(property == null || value == null) break;
                getItem = await Item.findAll({
                    where: {deleted:`${value}`}
                });
                break;
        }

        // Retrive all item data
        if(property == null && value == null && value2 == null && value3 == null){
            getItem = await Item.findAll({
                attributes: {exclude: this.excludeData}                
            // const [itemPrice, itemDiscount, hidden, deleted, expiryDate, createdByAdminID, updatedByAdminID, createdAt, updatedAt, ...visible ] = getAllItems;
            });
        };

        if(getItem == null){
            result.message = `/${property}/${value} does not exist`;
            result.status = 404;

            return result;
        };


        result.message = `Item data retrieved successfully`;
        result.data = getItem;
        result.status = 200;

        return result;

    }

    async updateItem(
        sku, 
        itemName,
        itemDescription,
        itemPrice,
        itemSalePrice,
        itemDiscount,
        itemCategory1,
        itemCategory2,
        brand,
        itemPic1,
        itemPic2,
        UOM,
        Qty,
        hidden,
        deleted,
        expiryDate
    ){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        // check whether item sku already exists
        const checkItem = await Item.findOne({where:{SKU:sku}});

        let isNotChanged = new Array;

        if (checkItem == null){
            result.message = `Item SKU: ${sku} does not exist`;
            result.status = 400;

            return result;
        }

        // function isValidURL(string) {
        //     var result = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

        //     return (result !== null)
        // }

        if(itemName != null){
            if(typeof itemName != "string"){
                isNotChanged.push(`itemName was not updated`)
            } else {
                checkItem.itemName = itemName;
                isNotChanged.push(`itemName was updated successfully to "${checkItem.itemName}"`)
            }
        }

        if(itemDescription != null){
            if(typeof itemDescription != "string"){
                isNotChanged.push(`itemDescription was not updated`)
            } else {
                checkItem.itemDescription = itemDescription;
                isNotChanged.push(`itemDescription was updated successfully to "${checkItem.itemDescription}"`)
            }
        }

        if(itemPrice != null){
            if(typeof itemPrice == "number" && itemPrice >= 0){
                checkItem.itemPrice = itemPrice;
                isNotChanged.push(`itemPrice was updated successfully to $${checkItem.itemPrice}`)
            } else {
                isNotChanged.push(`itemPrice was not updated`)
            }
        }

        if(itemSalePrice != null){
            if(typeof itemSalePrice == "number" && itemSalePrice >= 0){
                checkItem.itemSalePrice = itemSalePrice;
                isNotChanged.push(`itemSalePrice was updated successfully to $${checkItem.itemSalePrice}`)
            } else {
                isNotChanged.push(`ItemSalePrice was not updated`)
            }
        }

        if(itemDiscount != null){
            if(typeof itemDiscount == "number" && itemDiscount >= 0){
                checkItem.itemDiscount = itemDiscount;
                isNotChanged.push(`itemDiscount was updated successfully to ${checkItem.itemDiscount}`)
            } else {
                isNotChanged.push(`itemDiscount was not updated`)
            }
        }

        if(itemCategory1 != null){
            if(typeof itemCategory1 == "string"){
                checkItem.itemCategory1 = itemCategory1.toUpperCase();
                isNotChanged.push(`itemCategory1 was updated successfully to ${checkItem.itemCategory1}`)
            } else {
                isNotChanged.push(`itemCategory1 was not updated`)
            }
        }

        if(itemCategory2 != null){
            if(typeof itemCategory2 == "string"){
                checkItem.itemCategory2 = itemCategory2.toUpperCase();
                isNotChanged.push(`itemCategory2 was updated successfully to ${checkItem.itemCategory2}`)
            } else {
                isNotChanged.push(`itemCategory2 was not updated`)
            }
        }

        if(brand != null){
            if(typeof brand == "string"){
                checkItem.brand = brand.toUpperCase();
                isNotChanged.push(`brand was updated successfully to ${checkItem.brand}`)
            } else {
                isNotChanged.push('brand was not updated')
            }
        }

        if(itemPic1 != null){
            if(typeof itemPic1 == "string"){
                checkItem.itemPic1 = itemPic1;
                isNotChanged.push(`itemPic1 was updated successfully to ${checkItem.itemPic1}`)
            } else {
                isNotChanged.push(`itemPic1 was not updated`)
            }
        }

        if(itemPic2 != null){
            if(typeof itemPic2 == "string"){
                checkItem.itemPic2 = itemPic2;
                isNotChanged.push(`itemPic2 was updated successfully to ${checkItem.itemPic2}`)
            } else {
                isNotChanged.push(`itemPic2 was not updated`)
            }
        }

        if(UOM != null){
            if(typeof UOM == "string"){
                checkItem.UOM = UOM.toUpperCase();
                isNotChanged.push(`itemUOM was updated successfully to ${checkItem.UOM}`)
            } else {
                isNotChanged.push(`itemUOM was not updated`)
            }
        }

        if(Qty != null){
            if(typeof Qty == "number" && Qty >= 0){
                checkItem.Qty = Qty;
                isNotChanged.push(`Qty was updated successfully to ${checkItem.Qty}`)
            } else {
                isNotChanged.push(`Qty was not updated`)
            }
        }

        if(hidden != null){
            if(typeof hidden == "boolean"){
                checkItem.hidden = hidden;
                isNotChanged.push(`"hidden" field was updated successfully to ${checkItem.hidden}`)
            } else {
                isNotChanged.push(`"hidden" field was not updated`)
            }
        }

        if(deleted != null){
            if(typeof deleted == "boolean"){
                checkItem.deleted = deleted;
                isNotChanged.push(`"deleted" field was updated successfully to ${checkItem.deleted}`)
            } else {
                isNotChanged.push(`"deleted" field was not updated`)
            }
        }
        
        if(expiryDate != null){
            if(typeof expiryDate == "string" && this.validateDate(expiryDate)){
                checkItem.expiryDate = expiryDate;
                isNotChanged.push(`expiryDate was updated successfully to ${checkItem.expiryDate}`)
            } else {
                isNotChanged.push(`expiryDate field was not updated. YYYY-MM-DD or MM-DD-YYYY format. [ . / - ] separators are equivalent`)
            }
        }
        
        await checkItem.save();
        
        if(isNotChanged.length > 0){
            result.message = isNotChanged;
        } else {
            result.message = "Nothing was changed";
        }
        Date.parse
        result.status = 200;
        result.data = await Item.findOne({where:{SKU:sku}})

        return result;
    };

}

module.exports = ItemService;