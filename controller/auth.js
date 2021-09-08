import User from "../models/user";
// test end point
export const showMessage = (req, res) => {
  res.status(200).send(req.params.message);
};

export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  // validate
  if (!name) return res.status(400).send("Name is required.");
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send("Password is required and should be minimum of 6 characters long.");
  }
  let userExist = await User.findOne({ email }).exec();
  if (userExist) return res.status(400).send("Email is already taken.");
  // register
  const user = new User(req.body);
  try {
    await user.save();
    console.log("USER CREATED", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("User could not be added to the database.", err);
    return res.status(400).send("Error. Please try again.");
  }
};
