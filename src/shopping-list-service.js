const ShoppingListService = {
    getsAllItems(knex) {
        return knex.select('*').from('shopping_list');
    },

    // add items (insert)
    insertItem(knex, newItem) {
        return knex
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },

    // get by id
    getById(knex, id) {
        return knex.from('shopping_list').select('*').where('id', id).first();
    },

    // delete from list
    deleteItem(knex, id) {
        return knex.from('shopping_list').where({ id }).delete();
    },

    // update shopping list (update item info)
    updateItem(knex, id, newItemFields) {
        return knex('shopping_list')
            .where({ id })
            .update(newItemFields);
    },
}

module.exports = ShoppingListService;