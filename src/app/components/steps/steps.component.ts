import {Component, Input, OnInit} from '@angular/core';
import {Poll} from "../../models/survey";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  @Input() estado: Poll;
  constructor() {
  }

  ngOnInit(): void {

  }

}
