// console.log('hello, practice');
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

    // console.log('connection successful');
    // const q1 = knexInstance('amazong_products').select('*').toQuery();
    
// const qry = knexInstance
//     .select('product_id', 'name', 'price', 'category')
//     .from('amazong_products')
//     .where({ name: 'Point of view gun' })
//     .first()
//     .toQuery();

// console.log(qry);

//   .then(result => {
//     console.log(result);
//   });

// console.log('q1:', q1);
// console.log('q2:', q2);

function searchByProduct(searchTerm) {
    knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
        console.log('SEARCH TERM', { searchTerm })
        console.log(result);
    });
}
searchByProduct('holo');


// function paginateProducts(page) {
//     const productsPerPage = 10;
//     const offset = productsPerPage * (page -1);
//     knexInstance
//         .select('products_id', 'name', 'price', 'category')
//         .from('amazong_products')
//         .limit(productsPerPage)
//         .offset(offset)
//         .then(result => {
//             console.log(result);
//         });
// }
// paginateProducts(2);



// Note: NULL gets special treatment, we can't use:
// image !=NULL b/c we'd get every row
// we will have to use IS NOT NULL operator:

/* SELECT product_id, name, price, category, image
  FROM amazong_products
  WHERE image IS NOT NULL; */

// function getProductsWithImages() {  // no parameter here
//     knexInstance
//         .select('product_id', 'name', 'price', 'category', 'image')
//         .from('amazong_products')
//         .whereNotNull('image')
//         .then(result => {
//             console.log(result)
//         });
// }
// getProductsWithImages();



/* query to allow customers to see most popular vids by view and also by region for the last 30 days 

Each row in the table reflects one view, and has a region + datetime
We need to count # of views for each combo of region and vid name
    - we'll use count() to count dates viewd
    - we'll group results by combo of vid's name and region
    - We'll sort results by region and order with most popular 1st
    - We need to use WHERE to filter only results within last 30 days

SQL query:
    SELECT video_name, region, count(date_viewed) AS views
    FROM whopipe_video_views
    WHERE date_viewed > (now() - '30 days'::INTERVAL)
    GROUP BY video_name, region
    ORDER BY region ASC, views DESC;
*/

// function mostPopularVidsForDays(days) {
//     knexInstance
//         .select('video_name', 'region')
//         .count('date_viewed AS views')
//         .where(
//             'date_viewed',
//             '>',
//             knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
//         )
//         .from('whopipe_video_views')
//         .groupBy('video_name', 'region')
//         .orderBy([
//             { column: 'region', order: 'ASC' },
//             { column: 'views', order: 'DESC' }
//         ])
//         .then(result => {
//             console.log(result)
//         });
// }
// mostPopularVidsForDays(30);