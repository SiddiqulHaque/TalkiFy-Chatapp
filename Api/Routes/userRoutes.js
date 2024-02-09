const {
  Register,
  Login,
  updatePP,
  getAlluser,
  getSingleuser,
} = require("../Controllers/userController");
const { checkUser } = require("../Middlewares/authmiddleware");

const router = require("express").Router();
router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", checkUser, updatePP);
router.get("/allusers/:id", getAlluser);
router.get("/singleuser/:id",  getSingleuser);
module.exports = router;
