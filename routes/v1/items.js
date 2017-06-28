var express = require('express');
var router = express.Router();

const query = require('../../db/v1/query');


// Get all items of user => GET /items/:id
// Get one itme of user => GET /items/:id/item

// get all items of user
router.get('/:id', (req, res, next) => {
  if(!isNaN(req.params.id)){
    query.getAllItemsByUser(req.params.id)
      .then(items => {
        res.json(items);
      });
  } else {
    resError(res, 500, "Item Not Found")
  }
});
// get one item of user
router.get('/:id/item/:item_id', (req, res, next) => {
  if(!isNaN(req.params.id) || !isNaN(req.params.item_id)){
    query.getOneItemByUser(req.params.id, req.params.item_id)
      .then(items => {
        res.json(items);
      });
  } else {
    resError(res, 500, "Item Not Found")
  }
});
// add item to user
router.post('/:id', (req, res, next) => {
  query.addItem(req.params.id, req.body)
    .then(items => {
      res.json(items);
    });
});
// update item
router.patch('/:id', (req, res, next) => {
  query.addItem(req.params.id, req.body)
    .then(items => {
      res.json(items);
    });
});
// delete item from user
router.delete('/:id', (req, res, next) => {
  query.deleteItem(req.params.id)
    .then(items => {
      res.json(items);
    })
});


module.exports = router;
