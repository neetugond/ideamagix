const { validateCourse, Course } = require("../models/Course");
const router = require("express").Router();


router.post("/course", async (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

//   const { name, level, description, image } = req.body;

  try {
 
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;


