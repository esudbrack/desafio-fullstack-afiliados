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
    
          let user = await User.first();
    
          let is_admin = user ? false : true;
    
          // Checar permissão para registrar novas contas
          if (user && !auth.user?.is_admin) {
            return response.status(403).send({
              message: "Not authorized",
            });
          }
    
          const userExists = await User.findBy("email", email);
          if (userExists) {
            return response.status(400).send({
              status: "error",
              message: "User already registered",
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
    
          let success = await user.save();
          return response.status(201).json({
            status: "ok",
            message: "User is registered",
            success,
            UserID: user["_id"],
          });
        } catch (error) {
          console.log(error.message);
          response.status(403).json({
            status: "error",
            debug_error: error.message,
          });
        }
    }
}

module.exports = UserController
