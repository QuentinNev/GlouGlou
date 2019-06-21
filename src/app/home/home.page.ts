import { Component } from '@angular/core';
import { WineBatchProvider } from '../_providers/WineBatchProvider';
import { WineBatch } from '../_models/WineBatch';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx'
import { Router } from '@angular/router';
import { LastUpdateService } from '../_services/last-update.service';
import { ToasterService } from '../_services/toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private wineBatches: Array<WineBatch>
  private connectionState: string

  constructor(
    public wineBatchProvider: WineBatchProvider,
    private qrScanner: QRScanner,
    private router: Router,
    private lup: LastUpdateService,
    private toaster: ToasterService
  ) {
    this.getWineBatches()
    this.connectionState = this.lup.getState()
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
    this.connectionState = this.lup.getState()
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
          // camera permission was permanently denied
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }
}
