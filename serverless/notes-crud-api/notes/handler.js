'use strict';
const { create } = require('./lib')

module.exports.createNote = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body)
    const response = await create(data)
    if (!response.success) {
      throw Error(response.message)
    }
    callback(null, { statusCode: 201, body: JSON.stringify(`Note has been created successfully. (ID: ${response.id})`) })
  } catch (err) {
    callback(null, { statusCode: 500, body: JSON.stringify(`Note has not been created. Exception occured: ${err}`) })
  }
};

module.exports.updateNote = async (event) => {
  let notesId = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify(`The note with id: ${notesId} has been updated`),
  };
};

module.exports.deleteNote = async (event) => {
  let notesId = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify(`The note with id: ${notesId} has been deleted`),
  };
};

module.exports.getNotes = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(`All notes`),
  };
};
