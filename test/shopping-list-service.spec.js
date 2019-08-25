const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List service object', function() {

    let db;
    let testItems = [
        {
            id: 1,
            name: 'Test Item 1',
            price: '5.50',
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            category: 'Main',
            checked: false
        },
        {
            id: 2,
            name: 'Test Item 2',
            price: '3.75',
            date_added: new Date('2100-05-22T16:28:32.615Z'),
            category: 'Snack',
            checked: false
        },
        {
            id: 3,
            name: 'Test Item 3',
            price: '7.55',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            category: 'Lunch',
            checked: false
        },
        {
            id: 4,
            name: 'Test Item 4',
            price: '1.99',
            date_added: new Date('1919-12-22T16:28:32.615Z'),
            category: 'Breakfast',
            checked: true
        }
    ];

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
    });

    before(() => db('shopping_list').truncate());
    afterEach(() => db('shopping_list').truncate());
    after(() => db.destroy());

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems);
        });

        it(`getsAllItems() resolves all items from 'shopping_list' table`, () => {
            return ShoppingListService.getsAllItems(db)
                .then(actual => {
                    expect(actual).to.eql(testItems);
                });
        });

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const thirdId = 3;
            const thirdItem = testItems[thirdId -1];
            return ShoppingListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdItem.name,
                        date_added: thirdItem.date_added,
                        price: thirdItem.price,
                        category: thirdItem.category,
                        checked: thirdItem.checked
                    });
                });
        });

        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 3;
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getsAllItems(db))
                .then(getsAllItems => {
                    // copy test items array without "deleted" item
                    const expected = testItems.filter(item => item.id !== itemId);
                    expect(getsAllItems).to.eql(expected);
                });
        });

        it(`updateItem() updates an item from 'shopping_list' table`, () => {
            const idofItemToUpdate = 3;
            const newItem = {
                name: 'New Item Name',
                price: '99.99',
                date_added: new Date(),
                category: 'Main',
                checked: true
            }
            return ShoppingListService.updateItem(db, idofItemToUpdate, newItem)
                .then(() => ShoppingListService.getById(db, idofItemToUpdate))
                .then(item => {
                    expect(item).to.eql({
                        id: idofItemToUpdate,
                        ...newItem
                    });
                });
        });
    });

    context(`Given 'shopping_list' has no data`, () => {
        it(`getsAllItems() resolves an empty array`, () => {
            return ShoppingListService.getsAllItems(db)
                .then(actual => {
                    expect(actual).to.eql([]);
                });
        });

        it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem = {
                name: 'Test New Item',
                price: '29.99',
                date_added: new Date('2020-01-01T00:00:00.000Z'),
                category: 'Breakfast',
                checked: false,
            }
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        category: newItem.category,
                        checked: newItem.checked
                    });
                });
        });
    });

});