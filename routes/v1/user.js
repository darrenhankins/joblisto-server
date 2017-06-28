var express = require('express');
var router = express.Router();

const query = require('../../db/v1/query');

// http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
// Get all items for user => GET /user/:id/items
// Get one item for user => GET /user/:id/items/:item_id
// Create new item for user => POST /user/:id/items
// Delete one item for user => DELETE /user/:id/items/:item_id
// Update one item for user => PATCH /user/:id/items/:item_id

// get all items of user
router.get('/:id/items', (req, res, next) => {
  if(!isNaN(req.params.id)){
    query.getAllItems(req.params.id)
      .then(items => {
        res.json(items);
      });
  } else {
    resError(res, 500, "Item Not Found")
  }
});
// get one item of user
  router.get('/:id/items/:item_id', (req, res, next) => {
  if(!isNaN(req.params.id) || !isNaN(req.params.item_id)){
    query.getItem(req.params.id, req.params.item_id)
      .then(items => {
        res.json(items);
      });
  } else {
    resError(res, 500, "Item Not Found")
  }
});
// add item to user
router.post('/:id/items', (req, res, next) => {
  query.addItem(req.params.id, req.body)
    .then(items => {
      res.json(items);
    });
});
// update item
router.patch('/:id/items/:item_id', (req, res, next) => {
  query.updateItem(req.params.id, req.params.item_id, req.body)
    .then(items => {
      res.json(items);
    });
});
// delete item from user
router.delete('/:id/items/:item_id', (req, res, next) => {
  if(!isNaN(req.params.id) || !isNaN(req.params.item_id)){
    query.deleteItem(req.params.id, req.params.item_id)
      .then(items => {
        res.json(items);
      })
    } else {
      resError(res, 500, "Item Not Found")
    }
});

// router.get('/games_users/pending',(req,res) => {
//   knex.from('item')
//     .select('item.id','game.type','game.time','game.is_active','users.id as userss_id','users.users_name')
//     .innerJoin('group_item','group_item.item_id','item.id')
//     .innerJoin('group','group.id','group_item.group_id')
//     .where("game.is_active","pending")
//     .then((data)=>{
//       console.log("hey jerky", data);
//       res.json(data)
//     })
// });
//
// router.get('/games_users/pending',(req,res) => {
//   knex.from('game')
//     .select('game.id','game.type','game.time','game.is_active','users.id as userss_id','users.users_name')
//     .innerJoin('users_game','users_game.game_id','game.id')
//     .innerJoin('users','users.id','users_game.users_id')
//     .where("game.is_active","pending")
//     .then((data)=>{
//       console.log("hey jerky", data);
//       res.json(data)
//     })
// })


module.exports = router;
