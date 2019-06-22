import { Component } from '@angular/core';
import { WineBatchProvider } from '../_providers/WineBatchProvider';
import { WineBatch } from '../_models/WineBatch';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx'
import { Router } from '@angular/router';
import { LastUpdateService } from '../_services/last-update.service';
import { ThemeService } from '../_services/theme.service';
import { ToasterService } from '../_services/toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private wineBatches: Array<WineBatch>
  private connectionState: string
  private isScanning: boolean

  constructor(
    public wineBatchProvider: WineBatchProvider,
    private qrScanner: QRScanner,
    private router: Router,
    private lup: LastUpdateService,
    private toaster: ToasterService,
    private themeService: ThemeService // Just include this service will load the stored theme on app load
  ) {
    this.getWineBatches()
    this.connectionState = this.lup.getState()
    this.isScanning = false
  }

  /**
   *  Refresh wine batches then update list
   */
  public async getWineBatches() {
    this.wineBatchProvider.refreshWineBatches()
    this.wineBatches = await this.wineBatchProvider.getWineBatches()
  }

  /**
   * Called by 'Refresh list' button
   */
  public refresh() {
    this.getWineBatches()
    this.connectionState = this.lup.getState()
  }

  /**
   * Removes a wine
   * @param id of wine to remove
   */
  public removeBatch(id) {
    this.wineBatchProvider.removeWineBatch(id).then(() => {
      this.getWineBatches()
    })
  }

  /**
   * Toggles scanner
   */
  public scan() {
    if (this.isScanning) {
      this.isScanning = false
      this.qrScanner.destroy()
    } else {
      this.isScanning = true
      // Asks for camera permission
      this.qrScanner.prepare().then((status: QRScannerStatus) => {
        if (status.authorized) {
          // Start scanning
          this.qrScanner.show()
          // When a QRCode have been scanned
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            this.router.navigateByUrl("/show-batch/" + text)
            this.qrScanner.destroy()
            scanSub.unsubscribe()
          })
        } else if (status.denied) {
          // Camera permission was denied permanetly
          this.toaster.showToast("Camera permission is required to allow QRCodes scan, you must allow it manually")
        } else {
          // Camera permission was denied but not permanetly
        }
      }).catch((e: any) => console.log('Error is', e));
    }
  }
}
