const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.config');

// load key for hashing from common file
const fs = require("fs");
const privateKey = fs.readFileSync("./jwttest.key");

const {AdminUser, RefreshToken} = require("../models")



class AdminUserService{

    // retrieve all admin user data from the database
    async getAllAdmin(){
        let result = {
            message: null,
            status: null,
            data: null,
        };

        const getAllAdmins = await AdminUser.findAll();

        result.message = "All Admin user data retrieved";
        result.data = getAllAdmins;
        result.status = 200;

        return result;
    };

    // create a new admin user
    async registerAdmin(email, name, role, pwd){
        let result = {
            message: null,
            status: null,
        };

        // search the db and find whether the user email already exists
        const checkUser = await AdminUser.findOne({where:{adminEmail:email}});

        if (checkUser){
            result.message = `User: ${email} already exists, please use another Email `;
            result.status = 400;

            return result;
        }

        // hash the password before storing in database
        const pwdHashed = await bcrypt.hash(pwd, saltRounds);

        // create the record in db
        await AdminUser.create({
            adminEmail:email, 
            adminName:name, 
            adminRole:role, 
            adminPwd:pwdHashed
        })

        result.message = "Account successfully created";
        result.status = 200;

        return result;
    };

    //login in existing admin user
    async loginAdmin(email, pwd){
        let result = {
            message: null,
            status: null,
            accessToken: null,
            refreshToken: null,
        };

        //for use in jwttoken as it requires a standard JSON object
        let userInfo = {
            id: null,
            email: null,
            role: null,
        }

        // check whether user exists in db
        const checkUser = await AdminUser.findOne({where:{adminEmail:email}});


        if (!checkUser){
            result.message = `Email: ${email} does not exist, please use another Email`;
            result.status = 404;
            return result;
        }

        // verify hashed password
        const hashcompare = await bcrypt.compare(pwd,checkUser.adminPwd);

        if (!hashcompare) {
            result.message = "Incorrect Password";
            result.status = 401;

            return result;
        }


        userInfo.id = checkUser.adminID;
        userInfo.email = checkUser.adminEmail;
        userInfo.role = checkUser.adminRole;


        //create json web token and return accessToken
        const token = jwt.sign(userInfo, authConfig.secret, {expiresIn: authConfig.jwtExpiration});
        
        let refreshToken = await RefreshToken.createToken(checkUser);

        result.accessToken = token;
        result.message ="Login Success";
        result.status = 200;
        result.refreshToken = refreshToken.dataValues.token;

        return result;

    };

    async deleteAdmin(adminId) {
        let result = {
            message:null,
            status:null,
        }

        const targetAdmin = await AdminUser.findByPk(adminId)

        if(!targetAdmin) {
            result.message = `Admin ID ${adminId} does not exist.`;
            result.status = 404;

            return result;
        }

        // check number of super admin
        const sAdminList = await AdminUser.findAll({where:{adminRole:'superAdmin'}});

        // if there is only 1 super admin, that super admin cannot be deleted 
        if(targetAdmin.adminRole === "superAdmin" && sAdminList.length <= 1 ) {
            result.message = 'You cannot delete the only super admin.';
            result.status = 403;

            return result;
        }

        await AdminUser.destroy({where: {adminID: adminId}});
        result.status = 200;
        result.message = `Admin ID ${adminId} has been deleted`

        return result;
    };


    async updatePwdAdmin(currentPwd, newPwd, targetEmail) {
        let result = {
            message: null,
            status: null,
        }

        const targetAdmin = await AdminUser.findOne({where:{adminEmail:targetEmail}});

        if(!targetAdmin) {
            result.message = `Email ${targetEmail} does not exist.`;
            result.status = 404;
            return result;
        }

        // verify hashed password
        const hashcompare= await bcrypt.compare(currentPwd,targetAdmin.adminPwd);

        if (!hashcompare) {
            result.message="Incorrect Password";
            result.status=401;
            return result;
        }

        const pwdHashed= await bcrypt.hash(newPwd,saltRounds);
        targetAdmin.adminPwd = pwdHashed;

        await targetAdmin.save();
        result.status = 200;
        result.message = "Password changed successfully"
        return result
    }

}

module.exports = AdminUserService;