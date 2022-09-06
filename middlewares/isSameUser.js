function isSameUser(req, res, next) {
    if (req.user.id !== req.params.userId) {
      res.status(403).send({ message: "Only the same user can access" });
      return;
    }
    next();
  }

exports.isSameUser = isSameUser;