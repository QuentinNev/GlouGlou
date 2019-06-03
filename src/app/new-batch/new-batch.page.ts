import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { VineBatchProvider } from '../_providers/VineBatchProvider'
import { VineBatch } from '../_models/VineBatch'

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

  private vineProvider: VineBatchProvider

  constructor(private storage: Storage) {
    if (false) {
      this.batchName = "Vin vraiment très nul"
      this.bottleNumber = 10
      this.country = "Ici"
      this.year = 20000

      // Known bug : Two-way binding ([(ngModel)]="") doesn't work with ion-datetime component since something like 1 year but they doesn't seems to care
      this.dateAdded = Date.now()
      this.vineYard = "Vous n'est pas ignoble vous êtes vignoble"
    }

    this.vineProvider = new VineBatchProvider(this.storage)
  }

  ngOnInit() {
  }

  public create() {
    let vineBatch = new VineBatch(this.batchName, this.bottleNumber, this.country, this.year, this.dateAdded, this.vineYard)

    this.vineProvider.addVineBatch(vineBatch)
  }
}
