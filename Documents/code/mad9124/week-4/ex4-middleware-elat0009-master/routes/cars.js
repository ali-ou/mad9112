const cars = require('../data/cars')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => res.send({ data: cars }))

router.get('/:carId', (req, res) => {
    const carId = parseInt(req.params.carId)
    const car = cars.find(car => car.id === carId)
    res.send({ data: car })
})

router.post('/', (req, res) => {
    const { make, model, colour } = req.body
    const newCar = {
    id: Date.now(),
    make: make,
    model: model,
    colour: colour
    }
    cars.push(newCar)
    res.status(201).send({ data: newCar })
})

router.put('/:carId', (req, res) => {
    const carId = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === carId)
    if (index < 0) {
    res.status(404).send({
        errors: [{
        status: 'Not Found',
        code: '404',
        title: 'Resource does not exist',
        description: `We could not find a car with id: ${carId}`
        }]
    })
    } else {
    const { make, model, colour } = req.body
      const updatedCar = { id: carId, make, model, colour }
      cars[index] = updatedCar
      res.send({ data: updatedCar })
    }
  })
  
  router.patch('/:carId', (req, res) => {
    const carId = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === carId)
    if (index < 0) {
      res.status(404).send({
        errors: [{
          status: 'Not Found',
          code: '404',
          title: 'Resource does not exist',
          description: `We could not find a car with id: ${carId}`
        }]
      })
    } else {
      const { id, ...theRest } = req.body
      const updatedCar = Object.assign({}, cars[index], theRest)
      cars[index] = updatedCar
      res.send({ data: updatedCar })
    }
  })
  
  router.delete('/:carId', (req, res) => {
    const carId = parseInt(req.params.carId)
    const index = cars.findIndex(car => car.id === carId)
    if (index < 0) {
      res.status(404).send({
        errors: [{
          status: 'Not Found',
          code: '404',
          title: 'Resource does not exist',
          description: `We could not find a car with id: ${carId}`
        }]
      })
    } else {
      const deletedCar = cars[index]
      cars.splice(index, 1)
      res.send({ data: deletedCar })
    }
  })


module.exports = router 