const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.test = (req, res) => {
    console.log("Test successful");
    res.status(200).send("Api test successful.");
};

exports.register = async (req, res) => {
    try {
        console.log(req.body);
        const {name, email, password} = req.body;
        // validate
        if (!name) return res.status(400).send("Name is required.");
        if (!password || password.length < 6) {
            return res
                .status(400)
                .send(
                    "Password is required and should be minimum of 6 characters long."
                );
        }
        let userExist = await User.findOne({email}).exec();
        if (userExist) {
            return res.status(400).send("Email is already taken.");
        }
        // register

        const user = new User(req.body);
        await user.save();
        console.log("USER CREATED", user);
        return res.json({ok: true});
    } catch (err) {
        console.log("User could not be added to the database.", err);
        return res.status(400).send("Error. Please try again.");
    }
};
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email}).exec();
        // console.log("User already exists in the database.", user);
        if (!user) {
            return res.status(400).send("User with that email is not found.");
        }
        user.comparePassword(password, (err, match) => {
            console.log("Compare password in login err", err);
            if (!match || err) return res.status(400).send("Wrong password");
            // console.log("Generate a token then send as response to the client");
            let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            res.json({
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });
        });
    } catch (err) {
        console.log("Error logging in.", err);
        res.status(400).send("Login failed. Please try again.");
    }
};
