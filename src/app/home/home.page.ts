import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { VineBatchProvider } from '../providers/VineBatchProvider';
import { VineBatch } from '../models/VineBatch';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private vineBatchProvider: VineBatchProvider
  private vineBatches: Array<VineBatch>

  constructor(private storage: Storage) {
    this.vineBatchProvider = new VineBatchProvider(this.storage)
    this.vineBatches = []
    this.getVineBatches()
  }

  public async getVineBatches() {
    this.vineBatches = await this.vineBatchProvider.getVineBatches()
  }

  public refresh() {
    this.getVineBatches()
  }

  public removeBatch(uuid: string) {
    this.vineBatchProvider.removeVineBatch(uuid).then(() => {
      this.getVineBatches()
    })
  }
}
