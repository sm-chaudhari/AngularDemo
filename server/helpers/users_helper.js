var userModule = require('../model/users');

var users = {};

users.login = async (email ,password) =>{
    try {
        var users = await userModule.findOne({ "email": email, "password": password }).lean();
        if (users) {
            return { "status": 1, "message": "login successful", "user": users };
        } else {
            return { "status": 2, "message": "email or password invalid" };
        }
    } catch (err) {
        return { "status": 0, "message": "Error occured while finding user", "error": err }
    }
}

users.getAll = async(restaurant_id) => {
    try {
        var users = await userModule.find({'restaurant_id' : restaurant_id, 'is_active' : true, 'is_deleted' : false}).lean();
        if (users) {
            return { "status": 1, "message": "login successful", "user": users };
        } else {
            return { "status": 2, "message": "email or password invalid" };
        }
    } catch (error) {
        return { "status": 0, "message": "Error occured while finding user", "error": err }
    }   
}

users.add = async (data) => {
    var user = new userModule(data);
    try {
        let result = await user.save();
        return { "status": 1, "message": "Record inserted", "data": result };
    } catch (error) {
        return { "status": 0, "message": "Error occured while add user", "error": err }
    }
}

users.update = async (id, object) => {
    try {
        let user = await userModule.findOneAndUpdate({ _id: id }, object);
        if (!user) {
            return { "status": 2, "message": "Record has not updated" };
        } else {
            let data = await userModule.findOne({ _id: id });
            return { "status": 1, "message": "Profile has been updated", "data": data };
        }
    } catch (err) {
        return { "status": 0, "message": "Error occured while updating user", "error": err }
    }
};

users.getByID = async(id) => {
    try {
        var user = await userModule.findOne({ '_id': id });
        if (user) {
            return { "status": 1, "message": "user details found", "data": user };
        } else {
            return { "status": 2, "message": "user not found" };
        }
    } catch (error) {
        return { "status": 0, "message": "Error occured while finding user", "error": err }
    }
};

users.deleteUser = async(id) => {
    try {
        let user = await userModule.findOneAndUpdate({ _id: id }, {'is_deleted' : 1});
        // var user = await userModule.findOneAndRemove({ '_id': id });
        if (user) {
            return { "status": 1, "message": "user deleted successfully", "data": user };
        } else {
            return { "status": 2, "message": "user not found" };
        }
    } catch (error) {
        return { "status": 0, "message": "Error occured while finding user", "error": err }
    }
};

module.exports = users;