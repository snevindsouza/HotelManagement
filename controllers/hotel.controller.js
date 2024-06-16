//Create Read:ReadAll & ReadSpecific Update Delete + search operation

const { Op } = require('sequelize');  // Import Sequelize Op
const Hotel = require('../models/hotel.model');

exports.findAll = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.send(hotels);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving hotels.',
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      res.send(hotel);
    } else {
      res.status(404).send({
        message: `Not found Hotel with id ${req.params.id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: 'Error retrieving Hotel with id ' + req.params.id,
    });
  }
};

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  try {
    const hotel = await Hotel.create(req.body);
    res.send(hotel);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Hotel.',
    });
  }
};

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  try {
    const [updated] = await Hotel.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedHotel = await Hotel.findByPk(req.params.id);
      res.send(updatedHotel);
    } else {
      res.status(404).send({
        message: `Not found Hotel with id ${req.params.id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: 'Error updating Hotel with id ' + req.params.id,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Hotel.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.send({ message: 'Hotel was deleted successfully!' });
    } else {
      res.status(404).send({
        message: `Not found Hotel with id ${req.params.id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: 'Could not delete Hotel with id ' + req.params.id,
    });
  }
};

exports.search = async (req, res) => {
    try {
      const keyword = req.query.keyword || '';
      const hotels = await Hotel.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${keyword}%` } },
            { location: { [Op.like]: `%${keyword}%` } },
            { rating: { [Op.like]: `%${keyword}%` } }
          ]
        }
      });
      res.send(hotels);
    } catch (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while searching hotels.',
      });
    }
  };
