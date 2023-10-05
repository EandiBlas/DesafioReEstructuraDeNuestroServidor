import { Router } from 'express';
import ProductManager from "../dao/managers/productManagerMongo.js"
import { usersManager } from '../dao/managers/UserManagerMongo.js';
import {privateAcces,publicAcces} from '../middlewares/middlewares.js'

const pm = new ProductManager()

const router = Router()


router.get("/", async (req, res) => {
    res.render('login', {
        style: 'styles.css'
    })

})

router.get("/products", async (req, res) => {
    const listadeproductos = await pm.getProductsView()
    res.render("products", { listadeproductos, style: 'styles.css' })
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts", {style: 'styles.css'})
})

router.get("/chat", (req, res) => {
    res.render("chat",{style:'chat.css'})
})

router.get("/register", publicAcces, (req,res)=>{
    res.render("register",{style: 'styles.css'})
})

router.get("/login", publicAcces, (req,res)=>{
    res.render("login",{style: 'styles.css'})
})

router.get('/profile', privateAcces, async (req, res) => {
    const user = await usersManager.findUser(req.session.username)
    const newUser = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    res.render('profile', { user: newUser, style: 'styles.css' });
});

export default router