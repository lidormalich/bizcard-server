const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../schema/user");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const _ = require("lodash");

const auth = require("../middlewares/auth");


const loginSchema = joi.object({
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(8),
})

router.post("/", async (req, res) => {
    try {
        // joi validation
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send("Wrong body");
        // check for existing user
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("User Or PassWord Wrong");
        // check Password
        const resultPass = await bcrypt.compare(req.body.password, user.password);
        if (!resultPass) return res.status(400).send("User Or PassWord Wrong");
        // Make Token
        const token = JWT.sign({ _id: user._id, isBusiness: user.isBusiness }, process.env.JWT_Key);
        // Return to client
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error);
    }


})
// router.get("/userinfo", auth, async (req, res) => {
//     try {
//         // let user = await User.findOne({ email: req.payload.email });
//         let user = await User.findById(req.payload._id);
//         if (!user) return res.status(400).send("No such User");
//         res.status(200).send(_.pick(user, ["_id", "email", "name", "isAdmin"]));
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })



module.exports = router;