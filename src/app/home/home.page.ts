import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WineBatchProvider } from '../_providers/WineBatchProvider';
import { WineBatch } from '../_models/WineBatch';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private wineBatches: Array<WineBatch>
  private test: String

  constructor(public wineBatchProvider: WineBatchProvider, private qrScanner: QRScanner, private router: Router) {
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

  public showBatch(id) {
    this.router.navigateByUrl("/show-batch/" + id)
  }

  public scan() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.qrScanner.show()
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.router.navigateByUrl("/show-batch/" + text)

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });
        } else if (status.denied) {
          this.test = "DENIED"
          // camera permission was permanently denied
        } else {
          this.test = "MDR VTFF"
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }
}
