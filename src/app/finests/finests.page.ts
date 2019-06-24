import { Component, OnInit } from '@angular/core';
import { WineBatch } from '../_models/WineBatch';
import { WineBatchProvider } from '../_providers/WineBatchProvider';
import { NoteProvider } from '../_providers/NoteProvider';

@Component({
  selector: 'app-finests',
  templateUrl: './finests.page.html',
  styleUrls: ['./finests.page.scss'],
})
export class FinestsPage implements OnInit {
  public finestsWines: Array<WineBatch>

  constructor(private wineProvider: WineBatchProvider, private noteProvider: NoteProvider) { this.finestsWines = [] }

  ngOnInit() {
    this.wineProvider.getWineBatches().then(wines => {
      wines.forEach(wine => {
        this.noteProvider.getNote(wine.id).then(note => {
          if (note.value >= 3) this.finestsWines.push(wine)
        })
      })
    })
  }

}
