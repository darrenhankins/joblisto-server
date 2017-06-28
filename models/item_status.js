const Model = require('objection').Model;
// const Item = require('./item');

class Item_status extends Model {
  static get tableName() {
    return 'item_status';
  }

  static get relationMappings() {
    return {
      // Model: item_status can have one item
      // an item_status can have 1 item
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/item',
        join: {
          from: 'item.id',
          to: 'item_status.item_id'
        }
      },
      // an item_status can have 1 friend
      friend: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/friend',
        join: {
          from: 'friend.id',
          to: 'item_status.friend_id'
        }
      }
    };
  }
}

module.exports = Item_status;
