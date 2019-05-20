import { Component, OnInit } from '@angular/core';

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
  public dateAdded: number
  public vineYard: string

  constructor() {
    this.batchName = "Vin vraiment très nul"
    this.bottleNumber = 10
    this.country = "Ici"
    this.year = 20000

    // Known bug : Two-way binding ([(ngModel)]="") doesn't work with ion-datetime component since almost 1 year
    this.dateAdded = Date.now()
    this.vineYard = "Vous n'est pas ignoble vous êtes vignoble"
  }

  ngOnInit() {
  }

}
