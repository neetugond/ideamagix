const mongoose = require("mongoose");
const Joi = require("joi");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  level: {
    type: String,
    required: [true, "level is required."],
  },
  description: {
    type: String,
    required: [true, "description is required."],
  },
  image: {
    type: String,
  },
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
    }
  ],
});

const Course = mongoose.model("Course", CourseSchema);

const validateCourse = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    level: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(200).required(),
    image: Joi.string(),
  });
  return schema.validate(data);
};

module.exports = {
  validateCourse,
  Course,
};
