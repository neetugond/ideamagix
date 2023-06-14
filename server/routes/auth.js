const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middlewares/auth");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // check all the missing fields.
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "please enter all the required fields!" });

  // name validation.
  if (name.length > 20)
    return res
      .status(400)
      .json({ error: "name can only be less than 20 characters" });

  // email validation.
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email))
    return res
      .status(400)
      .json({ error: "please enter a valid email address." });

  // validation of password.
  if (password.length <= 8)
    return res
      .status(400)
      .json({ error: "password must be atleast 8 characters" });
  try {
    const doesUserAlreadyExist = await User.findOne({ email });

    if (doesUserAlreadyExist)
      return res.status(400).json({
        error: `a user with that email [${email}] already exists so please try another one.`,
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    // save the user.
    const result = await newUser.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: "please enter all the required fields!" });

  // email validation.
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "please enter a valid email address." });

  try {
    const userExits = await User.findOne({ email });

    if (!userExits)
      return res.status(400).json({ error: "Invalid email or password!" });

    // if user present
    const passwordMatch = await bcrypt.compare(
      password,
      userExits.password
    );

    if (!passwordMatch)
      return res.status(400).json({ error: "Invalid email or password!" });

    const payload = { _id: userExits._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const user = { ...userExits._doc, password: undefined };
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
    }
    
});

router.get("/userme", auth, async (req, res) => {
    return res.status(200).json({ ...req.user._doc });
  });

module.exports = router;