const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../schema/user");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");


const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email().min(5),
    password: joi.string().required().min(8),
    image: joi.string().optional().allow(null, ''),
    location: joi.string().optional().allow(null, ''),
    isBusiness: joi.boolean().required()
})

router.post("/", async (req, res) => {
    try {
        // joi validation
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send("Wrong body" + error);

        // check for existing user
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already exists");

        // add document to db
        user = new User(req.body);
        user.password = await bcrypt.hash(req.body.password, 10);
        await user.save();

        const token = JWT.sign({ _id: user._id, isBusiness: user.isBusiness }, process.env.JWT_Key);
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error);
    }


})

module.exports = router;