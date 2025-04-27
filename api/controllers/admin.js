const dotenv = require("dotenv");
dotenv.config()
const Admin = require("../models/Admin");
const createJWT = require("../utils/jwt").createJWT;
const userTokenPayload = require("../utils/UserTokenPayload");
const BadRequestError = require("../errors/BadRequest");
const UnauthenticatedError = require("../errors/Unauthenticated");

exports.createUser = async (req, res) => {
  if (req.body.email != null) {
    const emailAlreadyExists = await Admin.findOne({ email: req.body.email });

    if (emailAlreadyExists) {
      throw new BadRequestError("Email already taken!");
    }
  } else if (req.body.name != null) {
    const usernameAlreadyExists = await Admin.findOne({
      username: req.body.name,
    });
    if (usernameAlreadyExists) {
      throw new BadRequestError("Admin name already taken");
    }
  }


  const user = await Admin.create(req.body);
  const tokenUser = userTokenPayload(user);
  const token = createJWT({ payload: tokenUser });
  res.status(200).json({ user, token });
};

exports.login = async (req, res) => {
  let user;
  let { ADMIN_MAIL } = process.env;
  if (req.body.email === ADMIN_MAIL) {
    user = await Admin.findOne({ email: req.body.email }).select("+password");
  } else {
    throw new UnauthenticatedError(
      "Access Denied For Unauthorised User"
    );
  }
  if (!user) {
    throw new UnauthenticatedError("User doesn't exist");
  }

  const isPasswordCorrect = await user.comparePassword(req.body.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password");
  }
  const tokenUser = userTokenPayload(user);

  const token = createJWT({ payload: tokenUser });

 
  res.status(200).json({ user, token });
};
exports.logout = async (req, res) => {
  res.status(200).json({ msg: "user logged out successfully.!" });
};
