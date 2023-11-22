const authMiddleware = (req, res, next) => {
    if (!req.cookies.token) {
      return res.send({ status: false, message: "token not found" });
    }
    try{
        jwt.verify(req.cookies.token, "12345678")
        next()
    }catch{
      return res.send({
          "status": false,
          "message": "Invalid token."
      })
    }
  };

module.exports = {authMiddleware}