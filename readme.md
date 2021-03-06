# Catalog API
Current available Endpoints:
| Path | Verb | Request Body | Response Body | Description |
|------|------|--------------|---------------|-------------|
| /admin <br/>(require JWT)| GET |Nil| JSON: {<br/>"data": An Array of admin object,<br/> "message": The response message}| To get the list of admins. Requires Authorization token from login.|
|/admin/login| POST | JSON: {<br/>"email": "Mandatory", <br/> "pwd": "Mandatory"}| JSON: {<br/>"data": A JWT Token,<br/> "message": The response message}| Checking email and password input against database and distribute Authorization token for endpoints that are restricted to admins.|
|/admin/register <br/>(require JWT)| POST | JSON: {<br/>"email": "Mandatory",<br/> "pwd": "Mandatory",<br/> "role": "Mandatory",<br/> "name": "Optional"}| JSON: {<br/>"message": The response message}| Creation of new admin accounts. Admin can create other admin accounts. Super Admin can create other super admin/ admin accounts.<br/><br/> **Note:** Request body role can only be either "admin" or "superAdmin". "email" must also be a unique value with valid format.|
|/admin/update-password <br/>(require JWT)| PUT | JSON: {<br/> "currentPwd":"Mandatory",<br/> "newPwd":"Mandatory", <br/>"email":"Optional"}|JSON: {<br/>"message": The response message}|To change password of admins.<br/><br/> **Note:** If request body "email" is empty, the email will be set based on JWT Token data.|
|/admin/:adminId <br/>(require JWT)| DELETE | Nil | JSON: {<br/>"message": The response message} | Deleting admin based on adminID. adminID can be acquired from /admin list.|
|/user| GET | Nil | JSON: {<br/>"data": An Array of user object,<br/> "message": The response message} | To get the list of users. <br/> <br/> **Note:** Will be modified to require JWT Token. |
|/user/register| POST | JSON: {<br/>"email": "Mandatory",<br/> "pwd": "Mandatory",<br/> "name": "Optional",<br/> "nickname": "Optional"}| JSON: {<br/>"message": The response message} | Sign Up of new user.<br/><br/> **Note:** Request body "email" must be unique. | 
|/user/login| POST|JSON: {<br/>"email": "Mandatory", <br/> "pwd": "Mandatory"}|JSON: {<br/>"data": A JWT Token,<br/> "message": The response message}|Checking email and password input against database and distribute Authorization token for endpoints that are restricted to users.|


<!-- // API Endpoints

Admin Users:
GET: /admin => get all admin users (requires login first)

POST: /admin/register => create and add a new admin if name does not already exist,
payload:
{
    "email": "xxx",
    "pwd": "xxx",
    "name": "yyy",
    "role": "xxx"
}
xxx=required
yyy=optional
role is either admin or superAdmin
email is required to be unique 

POST: /admin/login => checks name and hashed password against database and returns a JSONWebtoken if password 
                      correct

PUT: /admin/update-password
{
"email":"xxx",
"currentPwd":"xxx",
"newPwd":"xxx"
}

DELETE: /admin/:adminId => deletes admin user based on adminID


Users:
GET: /user => get all normal users
POST: /user/register => create and add a new user if name does not already exist
payload:
{
    "email": "xxx",
    "name": "yyy",
    "nickname": "yyy",
    "pwd": "xxx"

}
xxx=required
yyy=optional    
email is required to be unique     

POST: /user/login => checks name hashed password against database and returns a JSONWebtoken if password    
                     correct


Items:
GET: 
/user => get all items
/item/sku/:sku => find an item by sku
/item/category1/:cat1 => find items by category1
/item/category2/"cat2 => find items by category2
/item/brand/:brand => find items by brand

POST: /item/add =>add an item, SKU and item name are required. (require admin login)
payload:
{
    "sku": "xxx",
    "itemName": "xxx",
    "itemDescription": "yyy",
    "itemPrice": yyy,
    "itemSalePrice": yyy,
    "itemDiscount": yyy,
    "itemCategory1": "yyy",
    "itemCategory2": "yyy",
    "brand": "yyy",
    "itemPic1": "yyy",
    "itemPic2": "yyy",
    "UOM": "yyy",
    "Qty": yyy,
    "hidden": false,
    "expiryDate": "yyyy-mm-dd"
}
xxx=required
yyy=optional        
sku is required to be unique
GET: /item/sku/:sku => get specific item by sku

PUT: /item/update/:sku => update item with sku
payload as per items that needs to be changed -->