import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode'
import { ActivatedRoute } from '@angular/router';
import { VineBatchProvider } from '../_providers/WineBatchProvider';
import { VineBatch } from '../_models/WineBatch';

@Component({
  selector: 'app-show-batch',
  templateUrl: './show-batch.page.html',
  styleUrls: ['./show-batch.page.scss'],
})
export class ShowBatchPage implements OnInit {
  private batchId: string
  private QRCode: string
  private vineBatch: VineBatch

  constructor(private route: ActivatedRoute, private vineBatchProvider: VineBatchProvider) {
  }

  ngOnInit() {
    this.batchId = this.route.snapshot.paramMap.get('id')
    this.loadBatch()
    this.generateQRCode()
    this.QRCode = null
  }

  loadBatch() {
    this.vineBatchProvider.getVineBatch(this.batchId).then(batch => {
      this.vineBatch = batch
    })
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
