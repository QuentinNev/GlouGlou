import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-batch',
  templateUrl: './show-batch.page.html',
  styleUrls: ['./show-batch.page.scss'],
})
export class ShowBatchPage implements OnInit {
  private batchId: string

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.batchId = this.route.snapshot.paramMap.get('id')
  }

}
