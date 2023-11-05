'use strict';
const { create, update, send, deleteNote, getAllNotes } = require('./lib')

module.exports.createNote = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body)
    await create(data)
    return send(201, `Note has been created successfully. (ID: ${data.id})`)
  } catch (err) {
    return send(500, `Note has not been created. Exception occured: ${err.message}`)
  }
};

module.exports.updateNote = async (event, context, callback) => {
  
  let notesId = event.pathParameters.id;
  try {
    const data = JSON.parse(event.body)
    await update(notesId, data)
    return send(200, `The note with id: ${notesId} has been updated`)
  } catch (err) {
    return send(500, `Note has not been updated. Exception occured: ${err}`)
  }
};

module.exports.deleteNote = async (event, context, callback) => {
  
  let notesId = event.pathParameters.id;
  try {
    await deleteNote(notesId)
    return send(200, `The note with id: ${notesId} has been deleted`)
  } catch (err) {
    return send(500, `Note has not been deleted. Exception occured: ${err}`)
  }
};

module.exports.getAllNotes = async (event, context, callback) => {
  
  try {
    const notes = await getAllNotes()
    return send(200, notes)
  } catch (err) {
    return send(500, `Failed to get all notes. Exception occured: ${err}`)
  }
};
