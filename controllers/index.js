import User from "../models/userSchema.js";
export const registerController = async (req, res, next) => {
  const { username, password, role } = req.body;

  try {
    if (!username || !password) {
      res.status(404).json({
        message: "Username or password is missing",
      });
    } else if (password.length < 6) {
      res.status(404).json({
        message: "Password less than 6 characters",
      });
    }
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }
    User.create({ username, password, role }).then((user) =>
      res.status(200).json({
        user,
      })
    );
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: error.mesage,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      res
        .status(401)
        .json({ message: "Login not succesful", error: "User not found" });
    } else {
      res.status(200).json({ message: "succesfully logged in." });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occured",
      error: error.message,
    });
  }
};
export const updateController = async (req, res) => {
  const { role, id } = req.body;
  // Verifying if role and id is presnt
  if (role && id) {
    // Verifying if the value of role is admin
    if (role === "admin") {
      await User.findById(id).then((user) => {
        if (user.role !== "admin") {
          user.role = role;
          user.save().then((user) => {
            res.status(200).json({
              messeage: "Update successful",
              user,
            });
          });
        } else {
          res.status(400).json({ message: "User is already an Admin" });
        }
      });
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};
export const deleteUserController = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      return res.status(200).json({ message: "User successfully deleted" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
export const getUsersController = (req, res) => {
  const users = User.find()
    .select("username password role _id")
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => console.log(err));
};
