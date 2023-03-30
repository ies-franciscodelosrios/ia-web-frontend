import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  exports: [
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ]
})
export class AngularMaterialModule { }
