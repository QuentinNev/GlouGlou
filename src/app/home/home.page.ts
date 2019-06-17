import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WineBatchProvider } from '../_providers/WineBatchProvider';
import { WineBatch } from '../_models/WineBatch';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private wineBatches: Array<WineBatch>
  private test: String

  constructor(public wineBatchProvider: WineBatchProvider) {
    this.getWineBatches()
  }

  /**
   *  Refresh wine batches then update displayed list
   */
  public async getWineBatches() {
    this.wineBatchProvider.refreshWineBatches()
    this.wineBatches = await this.wineBatchProvider.getWineBatches()
  }

  public refresh() {
    this.getWineBatches()
  }

  public removeBatch(uuid: string) {
    this.wineBatchProvider.removeWineBatch(uuid).then(() => {
      this.getWineBatches()
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
