const express = require("express");
const auth = require("../middlewares/auth");
const Card = require("../schema/card");
const router = express.Router();
const joi = require("joi");
const User = require("../schema/user");
const bcrypt = require("bcrypt");


const Userschema = new joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email().min(5),
    password: joi.string().required().min(8),
    image: joi.string().optional().allow(null, ''),
    location: joi.string().optional().allow(null, ''),
    isBusiness: joi.boolean().required()
})

router.put("/", auth, async (req, res) => {
    try {

        // joi validate
        let { error } = Userschema.validate({ ...req.body, isBusiness: req.payload.isBusiness });
        console.log(error + "ERR");
        if (error) return res.status(400).send("Data Problem");
        // update user to db
        let user = req.body;
        user.password = await bcrypt.hash(req.body.password, 10);
        let update = await User.findOneAndUpdate({ _id: req.payload._id }, user, { returnOriginal: false });
        await update.save();
        res.status(200).send("update");
    } catch (error) {
        console.log(error);
        res.status(400).send("Data Problem");
    }
});

module.exports = router;