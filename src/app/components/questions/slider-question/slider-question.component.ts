
import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Options } from 'ng5-slider/options';
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomPaginator} from "../../../models/CustomPaginatorConfiguration";

@Component({
  selector: 'app-slider-question',
  templateUrl: './slider-question.component.html',
  styleUrls: ['./slider-question.component.css']
})
export class SliderQuestionComponent implements OnInit {

  sliderForm : FormGroup;
  minValue=1;
  maxValue=4;
  resultSlider: number = +'';
  value: number = 5;



   constructor(private toastr: ToastrService,private fb:FormBuilder) {
     this.sliderForm= this.fb.group({
       slider:  ['', Validators.compose([Validators.required,Validators.minLength(0),Validators.maxLength(100)])]
     })
   }

   ngOnInit(): void {
     this.resultSlider=1;
     this.sliderForm.get('slider').setValue(1);

   }


   getValueSlider = (value: number): number => {
     this.sliderForm.get('slider').setValue(value);
    return this.resultSlider=value;
   }

   logForm(){
     console.log(this.resultSlider);

   }

   show() {
     this.toastr.info('Hello world!', 'INFO!');
     this.toastr.error('Hello world!', 'DANGER!');
     this.toastr.warning('Hello world!', 'warning!');
     this.toastr.success('Hello world!', 'Success!');
   }



   options: Options = {
     showTicksValues: true,
     rightToLeft:false,
     step: 4,
     ceil:100,
     showSelectionBar:true,
     tickValueStep:0,
     stepsArray: [
       { value: 0, legend: "🙁" },
       { value: 25, legend: "😕" },
       { value: 50, legend: "😐" },
       { value: 75, legend: "🙂" },
       { value: 100, legend: "😄" },
     ]
   };
 }
