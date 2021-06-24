// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const { query } = require('express');
const {Pool} = require('pg')

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

 const getUserWithEmail = function(email) {
   
   return pool.query(`SELECT * FROM users WHERE email = $1`, [email])
   .then((result) => {
    if (result.rows) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.error(err);
  });
 }

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function(id) {
 return pool.query(`SELECT * FROM users WHERE id = $1`, [id])
 .then((result) => {
   if(!result) {
     return null;
   }
   return result.rows[0];
 })
 .catch((err) => {
   console.error(err);
 })
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser =  function(user) {
  const values = [user.name, user.email, user.password];
  return pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, values)
  .then((results) => {
    return results.rows[0];
  })
  .catch((err) => {
    console.error(err);
  })
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const queryString = `
    SELECT reservations.*, properties.*
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    WHERE reservations.guest_id = $1 
    AND reservations.end_date < now()::date
    LIMIT $2`;

  return pool.query(queryString,[guest_id, limit])
  .then((result) => result.rows)
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1=1
  `;
  console.log('this is options',options)
  if (options.city) {
    queryParams.push(`%${options.city.substring(1, options.city.length - 1)}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND cost_per_night > $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night < $${queryParams.length} `;
  }
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND rating > $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log('this is query string', queryString,'this is query params', queryParams);

  return pool.query(queryString, queryParams).then((res) => res.rows);

};

// return pool.query(`SELECT * FROM properties LIMIT $1`, [limit])
// .then((result) => {
//   if (result.rows) {
//     return result.rows;
//   } else {
//     return null;
//   }
// })
// .catch((err) => {
//   console.error(err);
// });

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
