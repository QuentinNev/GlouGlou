import { Storage } from '@ionic/storage'
import { Injectable } from '@angular/core'
import { ToasterService } from '../_services/toaster.service'
import { Note } from '../_models/Note';

@Injectable()
export class NoteProvider {
  private storageKey: string

  constructor(
    private storage: Storage,
    private toaster: ToasterService
  ) {
    this.storageKey = "notes"
  }

  //#region localstorage

  public setNotes(notes: Array<Note>) {
    this.storage.set(this.storageKey, notes)
  }

  /**
   * Gets all notes and check if there's no notes already created
   * @param note to add to the storage
   */
  public async addNote(note) {
    let notes = await this.getNotes()
    console.log("all notes", notes)
    if (notes) { notes.push({ wineId: note.wineId, value: note.value }) }
    else notes = [note]
    console.log("updates notes", notes)

    // this works only first time, where we set a second time notes in storage it just do nothing...
    this.storage.set(this.storageKey, notes)
  }

  /**
   * Returns any array with all notes
   */
  public getNotes() {
    return this.storage.get(this.storageKey)
  }

  /**
   * Returns a single note
   * @param wineId of wine related to the desired note
   */
  public getNote(wineId) {
    return this.storage.get(this.storageKey).then(notes => {
      // avoid notes.find on undefined array
      if (notes) {
        let foundNote = notes.find(note => { return note.wineId == wineId })
        // create if there's not note yet
        if (foundNote) { return foundNote }
        else {
          let newNote = new Note(wineId, 0)
          this.addNote(newNote)
          return { wineId: wineId, value: 0 }
        }
        // create if there's not note yet
      } else {
        let newNote = new Note(wineId, 0)
        this.addNote(newNote)
        return { wineId: wineId, value: 0 }
      }
    })
  }

  /**
   * Update an already created note
   * @param note note object with new value
   */
  public updateNote(updatedNote: Note) {
    this.getNotes().then(notes => {
      let newNotes = notes.map(note => {
        return (note.wineId == updatedNote.wineId) ? updatedNote : note
      })

      this.setNotes(newNotes)
    })
  }

  //#endregion
}