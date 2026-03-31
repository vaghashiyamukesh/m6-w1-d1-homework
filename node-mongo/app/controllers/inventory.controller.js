const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Inventory = mongoose.model('Inventory');

// Create a new inventory item
exports.createInventory = (req, res) => {
  const inventory = new Inventory({
    prodname: req.body.prodname,
    qty: req.body.qty,
    price: req.body.price,
    status: req.body.status,
  });

  // Save a Inventory in the MongoDB
  inventory.save().then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).json({
      message: "Fail!",
      error: err.message
    });
  });
};

// Retrieve all inventories from the database
exports.inventories = async (req, res) => {
  try {
    const data = await Inventory.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving inventories."
    });
  }
};

// Find a single inventory with an id
exports.getInventory = (req, res) => {
  const id = req.params.id;

  Inventory.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found inventory with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving inventory with id=" + id });
    });
};

// Update an inventory item by the id
exports.updateInventory = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  try {
    const id = req.body.id;
    const data = await Inventory.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    
    if (!data) {
      res.status(404).send({
        message: `Cannot update inventory with id=${id}. Maybe inventory was not found!`
      });
    } else {
      res.send({ message: "Inventory was updated successfully." });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating inventory"
    });
  }
};

// Delete an inventory item with the specified id
exports.deleteInventory = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Inventory.findByIdAndRemove(id);
    
    if (!data) {
      res.status(404).send({
        message: `Cannot delete inventory with id=${id}. Maybe inventory was not found!`
      });
    } else {
      res.send({
        message: "Inventory was deleted successfully!"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete inventory with id=" + id
    });
  }
};
