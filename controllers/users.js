const bcrypt = require("bcrypt");
const {
  addUser,
  getUserByEmail,
  updateUserPictureUrl,
  hashPassword,
  generateUserToken,
} = require("../model/users");

async function uploadPicture(req, res) {
    const result = await uploadToCloudinary(req.file.path);
    await updateUserPictureUrl(req.params.userId, result.secure_url);
    fs.unlinkSync(req.file.path);
    res.send({ pictureUrl: result.secure_url });
}

async function signup(req, res, next) {
    try {
      const { email, password } = req.body;
      const passwordHash = await hashPassword(password);
      await addUser(email, passwordHash);
      res.send({ user: { email } });
    } catch (e) {
      next(e);
    }
}

async function login(req, res, next) {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).send("User not found with this email");
      return;
    }
    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (err) next(err);
      else {
        if (result) {
          const token = generateUserToken(user);
          res.send({
            token,
            user: {
              email: user.email,
              created_date: user.created_date,
              id: user.id,
            },
          });
        } else {
          res.status(401).send("Incorrect password");
        }
      }
    });
  }


module.exports = {uploadPicture, signup, login}