import { Component, OnInit } from '@angular/core';
import { WineBatchProvider } from '../_providers/WineBatchProvider'
import { WineBatch } from '../_models/WineBatch'
import { LastUpdateService } from '../_services/last-update.service';
import { ToasterService } from '../_services/toaster.service';
import { NoteProvider } from '../_providers/NoteProvider';
import { Note } from '../_models/Note';

@Component({
  selector: 'app-new-batch',
  templateUrl: './new-batch.page.html',
  styleUrls: ['./new-batch.page.scss'],
})
export class NewBatchPage implements OnInit {
  public batchName: string
  public bottleNumber: number
  public country: string
  public year: number
  public vineYard: string
  public note: number
  private connectionState: string

  constructor(
    public wineBatchProvider: WineBatchProvider,
    private lup: LastUpdateService,
    private toaster: ToasterService,
    private noteProvider: NoteProvider
  ) {
    this.connectionState = this.lup.getState()
    this.note = 0
  }

  ngOnInit() {
  }

  public create() {
    let dateAdded = Date.now()
    let wineBatch = new WineBatch(
      this.batchName,
      this.bottleNumber,
      this.country,
      this.year,
      dateAdded,
      this.vineYard
    )

    let newNote = new Note(wineBatch.id, this.note)

    this.wineBatchProvider.addLocalWineBatch(wineBatch)
    this.noteProvider.addNote(newNote)
    this.toaster.showToast(`${this.batchName} has been added !`)
  }
}
