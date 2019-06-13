import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode'
import { ActivatedRoute } from '@angular/router';
import { VineBatchProvider } from '../_providers/VineBatchProvider';
import { VineBatch } from '../_models/VineBatch';

@Component({
  selector: 'app-show-batch',
  templateUrl: './show-batch.page.html',
  styleUrls: ['./show-batch.page.scss'],
})
export class ShowBatchPage implements OnInit {
  private batchId: string
  private vineBatch: VineBatch

  constructor(private route: ActivatedRoute, private vineBatchProvider: VineBatchProvider) {
  }

  ngOnInit() {
    this.batchId = this.route.snapshot.paramMap.get('id')
    this.loadBatch()
  }

  loadBatch() {
    this.vineBatchProvider.getVineBatch(this.batchId).then(batch => {
      this.vineBatch = batch
    })
  }

}