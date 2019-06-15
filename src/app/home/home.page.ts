import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { VineBatchProvider } from '../_providers/VineBatchProvider';
import { VineBatch } from '../_models/VineBatch';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private vineBatches: Array<VineBatch>

  constructor(private storage: Storage, public vineBatchProvider: VineBatchProvider) {
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

  public scan() {
    function displayContents(err, text) {
      if (err) {

      } else {
        this.navCtrl.goForward('/show-batch/' + text)
      }
    }
  }
}
