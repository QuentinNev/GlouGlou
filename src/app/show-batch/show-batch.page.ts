import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode'
import { ActivatedRoute } from '@angular/router';
import { WineBatchProvider } from '../_providers/WineBatchProvider';
import { WineBatch } from '../_models/WineBatch';
import { LastUpdateService } from '../_services/last-update.service';
import { ToasterService } from '../_services/toaster.service';
import { NoteProvider } from '../_providers/NoteProvider';
import { Note } from '../_models/Note';
import { log } from 'util';

@Component({
  selector: 'app-show-batch',
  templateUrl: './show-batch.page.html',
  styleUrls: ['./show-batch.page.scss'],
})
export class ShowBatchPage implements OnInit {
  private batchId: string
  private QRCode: string
  private dateAdded: Date
  private wineBatch: WineBatch
  private note: Note

  private connectionState: string

  constructor(
    private route: ActivatedRoute,
    private wineBatchProvider: WineBatchProvider,
    private lup: LastUpdateService,
    private toaster: ToasterService,
    private noteProvider: NoteProvider
  ) {
    this.connectionState = this.lup.getState()
  }

  ngOnInit() {
    this.loadBatch()
  }

  /**
   * Get wine id then load it
   */
  public async loadBatch() {
    this.batchId = await this.route.snapshot.paramMap.get('id')
    this.wineBatchProvider.getWineBatch(this.batchId).then(batch => {
      this.wineBatch = batch
      this.dateAdded = new Date(this.wineBatch.dateAdded)
      this.generateQRCode()
      // Get wine note
      this.noteProvider.getNote(this.wineBatch.id).then(note => {
        console.log("WTFFFFF");
        if (note) {
          console.log("There's already a note")
          this.note = note
        } else {
          console.log("Wine form api and no note set yet !")
          let newNote = new Note(this.wineBatch.id, 0)
          this.noteProvider.addNote(newNote)
        }
      })
    })
  }

  private generateQRCode() {
    // toDataURL return an base64 encoded picture and not an URL at all
    QRCode.toDataURL(this.batchId).then(url => {
      console.log(url)
      this.QRCode = url
    }).catch(err => {
      console.log(err)
    })
  }

  public updateNote() {
    this.noteProvider.updateNote(this.note)
  }

}
