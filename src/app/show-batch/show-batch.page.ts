import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode'
import { ActivatedRoute } from '@angular/router';
import { WineBatchProvider } from '../_providers/WineBatchProvider';
import { WineBatch } from '../_models/WineBatch';
import { LastUpdateService } from '../_services/last-update.service';

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
  private connectionState: string

  constructor(private route: ActivatedRoute, private wineBatchProvider: WineBatchProvider, private lup: LastUpdateService) {
    this.connectionState = (this.lup.lastTry) ? "Online" : "Offline"
  }

  ngOnInit() {
    this.refresh()
  }


  loadBatch() {
    this.wineBatchProvider.getWineBatch(this.batchId).then(batch => {
      this.wineBatch = batch
      console.log(this.wineBatch)
      this.dateAdded = new Date(this.wineBatch.dateAdded)
      this.generateQRCode()
    })
  }

  public async refresh() {
    this.batchId = await this.route.snapshot.paramMap.get('id')
    this.loadBatch()
  }

  generateQRCode() {
    // toDataURL return an base64 encoded picture and not an URL at all
    QRCode.toDataURL(this.batchId).then(url => {
      console.log(url)
      this.QRCode = url
    }).catch(err => {
      console.log(err)
    })
  }

}
