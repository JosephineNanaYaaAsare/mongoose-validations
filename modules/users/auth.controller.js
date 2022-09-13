//Get your variables from the request body
const User = require("./user.model");

exports.register = async (req, res) => {
    const { email, password }= req.body;

 // check to see if email already exist   
    const emailExists = await User.findOne({ email })
    if (emailExists) {
        return res.status(400).json({ error: "Email alreay in use" })
    }

    const user = await User.create({...req.body});

    res.status(201).json({user})
}



//