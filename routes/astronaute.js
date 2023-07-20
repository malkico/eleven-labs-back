var express = require('express');
var router = express.Router();
var Astronaute = require('../models/Astronaute');

  router.get("/:id", async (req, res) => {
    try {

        const { id } = req.params
        const astronaute = await Astronaute.findById(id)
        res.json(astronaute)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
  })

router.get("/", async (req, res) => {
  try {
      const astronautes = await Astronaute.find()
      res.json(astronautes)
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})


router.post("/", async (req, res) => {
  try {
      const newAstronaute = new Astronaute(req.body)
      console.log(req.body)
      const astronauteSaved = await newAstronaute.save()
      res.status(201).json(astronauteSaved)
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

router.put("/:id", async (req, res) => {

  try {
      const { id } = req.params
      const { name, age } = req.body
      const updatedAstronaute = await Astronaute.findByIdAndUpdate(id, { name, age }, { new: true })
      res.json(updatedAstronaute)
  } catch (error) {
      res.status(500).json({ error: error.message })
  }

})

router.delete("/:id", async (req, res) => {

  try {
      const { id } = req.params
      const deletedAstronaute = await Astronaute.findByIdAndDelete(id)
      res.json(deletedAstronaute)
  }
  catch (error) {
      res.status(500).json({ error: error.message })
  }

})

module.exports = router;
