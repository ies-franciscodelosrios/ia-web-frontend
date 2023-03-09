import { Component, OnInit } from '@angular/core';
import { Turn } from 'src/app/models/turn';
import { TurnService } from 'src/app/services/turn-service';


@Component({
  selector: 'ngbd-table-pagination',
  templateUrl: './ngbd-table-pagination.component.html'
})
export class NgbdTablePagination implements OnInit{

  page = 1;
  pageSize = 4;
  turns: Turn[] = [];
  collectionSize = this.turns.length;

  constructor(private turnService: TurnService) {
    this.refreshCountries();
  }

  async ngOnInit() {
   this.turns = await this.turnService.getUserTurns(localStorage.getItem("user_current"));
  }

  refreshCountries() {
    this.turns
      .map((turn, i) => ({id: i + 1, ...turn}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
