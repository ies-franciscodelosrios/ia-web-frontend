import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-leyend',
  templateUrl: './leyend.component.html',
  styleUrls: ['./leyend.component.css']
})
export class LeyendComponent implements OnInit {
  @Input() nameQG: string;
  @Input() descriptionQG: string;

  constructor() { }

  ngOnInit(): void {
  }

}
