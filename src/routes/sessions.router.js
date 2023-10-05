import { Router } from "express";
import { usersManager } from "../dao/managers/UserManagerMongo.js";
import {privateAcces} from '../middlewares/middlewares.js'

const router = Router()

router.get('/current', privateAcces, async (req, res) => {
    const user = await usersManager.findUser(req.session.username)
    const newUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      age: user.age,
      role: user.role,
    };
    res.render('sessions', { user: newUser, style: 'styles.css' });
});


export default router