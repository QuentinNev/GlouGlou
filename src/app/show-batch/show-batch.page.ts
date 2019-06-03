import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode'

@Component({
  selector: 'app-show-batch',
  templateUrl: './show-batch.page.html',
  styleUrls: ['./show-batch.page.scss'],
})
export class ShowBatchPage implements OnInit {
  private qr: QRCode

  constructor() {
    this.qr = QRCode.create
    console.log(QRCode)
  }

  ngOnInit() {
  }

}
