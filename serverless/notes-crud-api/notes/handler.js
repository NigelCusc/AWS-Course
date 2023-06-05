'use strict';
const { create, update, send, deleteNote, getAllNotes } = require('./lib')

module.exports.createNote = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    const data = JSON.parse(event.body)
    await create(data)
    callback(null, send(201, `Note has been created successfully. (ID: ${data.id})`))
  } catch (err) {
    callback(null, send(500, `Note has not been created. Exception occured: ${err}`))
  }
};

module.exports.updateNote = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let notesId = event.pathParameters.id;
  try {
    const data = JSON.parse(event.body)
    await update(notesId, data)
    callback(null, send(200, `The note with id: ${notesId} has been updated`))
  } catch (err) {
    callback(null, send(500, `Note has not been updated. Exception occured: ${err}`))
  }
};

module.exports.deleteNote = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  let notesId = event.pathParameters.id;
  try {
    await deleteNote(notesId)
    callback(null, send(200, `The note with id: ${notesId} has been deleted`))
  } catch (err) {
    callback(null, send(500, `Note has not been deleted. Exception occured: ${err}`))
  }
};

module.exports.getNotes = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    const notes = await getAllNotes()
    callback(null, send(200, notes))
  } catch (err) {
    callback(null, send(500, `Failed to get all notes. Exception occured: ${err}`))
  }
};
