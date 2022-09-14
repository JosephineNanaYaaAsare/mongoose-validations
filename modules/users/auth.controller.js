//Get your variables from the request body
const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const generateToken = (user) => {
const token = jwt.sign(
  { id: user._id, email: user.email },
  "37adf5a8cc670b4608ed1454356995e91df5953fde95e58c2ceb3a9a63e80644",
  {
    expiresIn: "1h",
  }
);

return {
  token,
  user,
};
}

exports.register = async (req, res) => {
    const { email, password }= req.body;

 // check to see if email already exist   
    const emailExists = await User.findOne({ email })
    if (emailExists) {
        return res.status(400).json({ error: "Email alreay in use" })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({...req.body, password: hashedPassword});

    //Generate token
    const token = generateToken(user);

    res.status(201).json({token})
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ msg: "Invalid Credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }
  //Generate token
  const token = generateToken(user)
 


  res.status(200).json({ token });
}

