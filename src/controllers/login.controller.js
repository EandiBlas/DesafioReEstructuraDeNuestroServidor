import LoginService from "../services/login.services.js";

class LoginController {
    constructor() {
        this.service = new LoginService();
    }

    createUser = async (req, res) => {
        try {
          const newUser = await this.service.createUser(req.body);
          req.session['username'] = newUser.username;
          res.status(200).json({ message: "Usuario creado", user: newUser });
        } catch (error) {
          console.log(error);
          res.status(400).json({ message: error.message });
        }
    }
    
    loginUser = async (req, res) => {
        try {
          const userDB = await this.service.loginUser(req.body);
          req.session['username'] = userDB.username;
          res.status(200).json({ message: 'Session created', user: userDB });
        } catch (error) {
          console.log(error);
          res.status(400).json({ message: error.message });
        }
    }

}

export default LoginController