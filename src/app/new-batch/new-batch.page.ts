import { Component, OnInit } from '@angular/core';
import { WineBatchProvider } from '../_providers/WineBatchProvider'
import { WineBatch } from '../_models/WineBatch'
import { LastUpdateService } from '../_services/last-update.service';
import { ToasterService } from '../_services/toaster.service';

@Component({
  selector: 'app-new-batch',
  templateUrl: './new-batch.page.html',
  styleUrls: ['./new-batch.page.scss'],
})
export class NewBatchPage implements OnInit {
  public batchName: string
  public bottleNumber: number
  public country: string
  public year: number
  public vineYard: string
  private connectionState: string

  constructor(
    public wineBatchProvider: WineBatchProvider,
    private lup: LastUpdateService,
    private toaster: ToasterService
  ) {
    this.connectionState = this.lup.getState()
  }

  ngOnInit() {
  }

  public create() {
    let dateAdded = Date.now()
    let wineBatch = new WineBatch(
      this.batchName,
      this.bottleNumber,
      this.country,
      this.year,
      dateAdded,
      this.vineYard
    )
    this.wineBatchProvider.addLocalWineBatch(wineBatch)
  }
}
