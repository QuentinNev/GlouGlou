import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WineBatchProvider } from '../_providers/WineBatchProvider'
import { WineBatch } from '../_models/WineBatch'

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
  public dateAdded: number
  public vineYard: string

  constructor(public wineBatchProvider: WineBatchProvider) {
    if (false) {
      this.batchName = "Vin vraiment très nul"
      this.bottleNumber = 10
      this.country = "Ici"
      this.year = 20000

      // Known bug : Two-way binding ([(ngModel)]="") doesn't work with ion-datetime component since something like 1 year but they doesn't seems to care
      this.dateAdded = Date.now()
      this.vineYard = "Vous n'est pas ignoble vous êtes vignoble"
    }
  }

  ngOnInit() {
  }

  public create() {
    let wineBatch = new WineBatch(this.batchName, this.bottleNumber, this.country, this.year, this.dateAdded, this.vineYard)

    this.wineBatchProvider.addLocalWineBatch(wineBatch)
  }
}
