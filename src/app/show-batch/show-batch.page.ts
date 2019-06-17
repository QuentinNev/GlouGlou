import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode'
import { ActivatedRoute } from '@angular/router';
import { WineBatchProvider } from '../_providers/WineBatchProvider';
import { WineBatch } from '../_models/WineBatch';

@Component({
  selector: 'app-show-batch',
  templateUrl: './show-batch.page.html',
  styleUrls: ['./show-batch.page.scss'],
})
export class ShowBatchPage implements OnInit {
  private batchId: string
  private QRCode: string
  private wineBatch: WineBatch

  constructor(private route: ActivatedRoute, private wineBatchProvider: WineBatchProvider) {
  }

  ngOnInit() {
    this.refresh()
  }


  loadBatch() {
    this.wineBatchProvider.getWineBatch(this.batchId).then(batch => {
      this.wineBatch = batch
      this.generateQRCode()
    })
  }

  public async refresh() {
    this.batchId = await this.route.snapshot.paramMap.get('id')
    this.loadBatch()
  }

  generateQRCode() {
    // toDataURL return an base64 encoded picture and not an URL at all
    QRCode.toDataURL(this.wineBatch.uuid).then(url => {
      console.log(url)
      this.QRCode = url
    }).catch(err => {
      console.log(err)
    })
  }

}
