require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('./shopping-list-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

// use all ShoppingListService methods here:
ShoppingListService.getsAllItems(knexInstance)
    .then(items => console.log(items))
    .then(() => 
        ShoppingListService.insertItem(knexInstance, {
            name: 'New Item',
            price: '49.99',
            date_added: new Date(),
            category: 'Lunch',
            checked: false
        })
    )
    .then(newItem => {
        console.log(newItem);
        return ShoppingListService.updateItem(
            knexInstance,
            newItem.id,
            { name: 'Updated Name'}
        ).then(() => ShoppingListService.getById(knexInstance, newItem.id))
    })
    .then(item => {
        console.log(item);
        return ShoppingListService.deleteItem(knexInstance, item.id)
    });

console.log(ShoppingListService.getsAllItems());