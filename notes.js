const { inverse } = require('chalk')
const chalk = require('chalk')
const fs = require('fs')
const { title } = require('process')
const getNotes = () => "Your notes ..."

const addNote = ({title, body}) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote){
        notes.push({title,body})
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added"))
    }else{
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse("Note removed"))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse("No Note Found."))
    }
}

const listNotes = () => {
    console.log(chalk.inverse("Your Notes.."))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

module.exports = { getNotes, addNote, removeNote, listNotes, readNote}