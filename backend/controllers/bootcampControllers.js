const Bootcamp = require("../models/BootcampModel");

const getAllBootcamps = async (req, res) => {
  try {
    // MONGO QUERIES
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ["sort"];

    const bootcamp = await Bootcamp.find();

    //ERROR HANDLING
    if (!bootcamp) {
      return res.status(404).json("Bootcamps not found!");
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const createBootcamp = async (req, res) => {
  const { name, rating, description, price } = req.body;
  let bootcamp;
  try {
    bootcamp = await Bootcamp.create({
      name,
      rating,
      description,
      price,
    });

    //ERROR HANDLING
    if (!bootcamp) {
      return res.status(404).json("Cannot create bootcamp");
    }
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const updateBootcampById = async (req, res) => {
  let bootcamp;
  const id = req.params.id;
  // const { name, rating, description, price } = req.body;
  try {
    bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    bootcamp.save();
    //ERROR HANDLING
    if (!bootcamp) {
      return res.status(404).json(`Bootcamp with id ${id} doesn't exist!`);
    }
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

const deleteBootcampById = async (req, res) => {
  let bootcamp;
  const id = req.params.id;
  try {
    bootcamp = await Bootcamp.findByIdAndDelete(id);
    //IF THERES NO SUCH ID RETURN ERROR
    if (!bootcamp) {
      return res.status(404).json(`Bootcamp with id ${id} doesnt exist!`);
    }

    res.status(200).json({ success: true, message: "Bootcamp deleted" });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};
exports.getAllBootcamps = getAllBootcamps;
exports.createBootcamp = createBootcamp;
exports.updateBootcampById = updateBootcampById;
exports.deleteBootcampById = deleteBootcampById;
