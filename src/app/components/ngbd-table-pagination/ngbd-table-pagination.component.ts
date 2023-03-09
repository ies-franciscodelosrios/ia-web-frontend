import { ExporterService } from './../../services/exporter.service';
import { Turn } from 'src/app/models/turn';
import { TurnService } from 'src/app/services/turn-service';
import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'ngbd-table-pagination',
  styleUrls: ['./ngbd-table-pagination.component.css'],
  templateUrl: './ngbd-table-pagination.component.html',
})
export class NgbdTablePagination {
  displayedColumns: string[] = ['Codigo', 'Lunes', 'LunesDescripcion', 'Martes', 'MartesDescripcion', 'Miercoles', 'MiercolesDescripcion', 'Jueves', 'JuevesDescripcion', 'Viernes', 'ViernesDescripcion'];
  dataSource: MatTableDataSource<Turn>;
  turns: Turn[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private turnService:TurnService, private excelService: ExporterService) { }

  ngOnInit() {
    this.getUserTurns();
  }

  exportAsXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'my_export');
  }

  exportAsXLSXFiltered(): void {
    this.excelService.exportToExcel(this.dataSource.filteredData, 'my_export');
  }

  getUserTurns() {
    this.turnService.getUserTurns(localStorage.getItem("user_current")).then(data => {
      this.dataSource = new MatTableDataSource<Turn>(data)
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

