'use strict'
const User = use("App/Models/User");

class UserController {
    async register({ request, auth, response }) {
        try {
          const { name, email, password } = request.body;
    
          if (!name || !email || !password) {
            return response.status(400).send({
              status: "error",
              message: "You must enter a name, email and password."
            })
          }
          
          // If theres no users on the table the first one will be the admin
          let user = await User.first();
    
          let is_admin = user ? false : true;
    
          // Check if current user is admin before creating
          if (user && !auth.user?.is_admin) {
            return response.status(403).send({
              message: "Not authorized",
            });
          }
    
          const userExists = await User.findBy("email", email);
          if (userExists) {
            return response.status(400).send({
              status: "error",
              message: "Email in use",
            });
          }
    
          user = new User();
          user.email = email;
          user.password = password;
          user.name = name;
          user.is_admin = is_admin;
          if (auth.user?.is_admin) {
            user.is_admin = request.body.is_admin
          }
    
          await user.save();
          return response.status(200).json({
            status: "ok",
            message: "User created with success",
            UserID: user["_id"],
          });
        } catch (error) {
          console.log(error.message);
          return response.status(403).json({
            status: "error",
            debug_error: error.message,
          });
        }
    }
}

module.exports = UserController
