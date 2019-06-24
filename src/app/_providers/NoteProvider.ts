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
  public async addNote(note: Note) {
    let notes = await this.getNotes()
    notes = notes ? [...notes, note] : [note]
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
  public getNote(wineId: number) {
    return this.storage.get(this.storageKey).then(notes => {
      return notes.find(note => {
        return note.wineId = wineId
      })
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