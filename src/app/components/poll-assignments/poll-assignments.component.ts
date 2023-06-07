import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from './../../services/survey.service';
import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PollAssignment } from 'src/app/models/survey';
import { Router } from '@angular/router';


@Component({
  selector: 'app-poll-assignments',
  templateUrl: './poll-assignments.component.html',
  styleUrls: ['./poll-assignments.component.css']
})

export class PollAssignmentsComponent implements OnDestroy{

  pollsAssignment: PollAssignment[] = []
  pollsAssignmentFound: PollAssignment;
  pollAssignmentSub: Subscription;
  pollAssignmentFoundSub: Subscription;

  displayedColumns: string[] = ['id', 'questionaryGroup.name', 'questionaryGroup.description'
  , 'questionaryGroup.startDate', 'questionaryGroup.endDate', 'poll.signed', 'button'];
  dataSource: MatTableDataSource<PollAssignment>;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private surveyService: SurveyService, private route: Router) {}

  ngOnInit() {
    this.getPollsAssignment()
  }

  getPollsAssignment() {
    this.surveyService.loadData(localStorage.getItem("user_current"))
    this.pollAssignmentSub = this.surveyService.PollsAssignmentData.subscribe(data => {
      this.dataSource = new MatTableDataSource<PollAssignment>(data)
      this.dataSource.paginator = this.paginator;
      this.pollsAssignment = data
    })
  }

  getPollAssignmentFound(poll) {
    if (this.pollAssignmentFoundSub instanceof Subscription) {
      this.pollAssignmentFoundSub.unsubscribe()
    }

    this.surveyService.findPollAssignment(poll.id)
    this.pollAssignmentFoundSub = this.surveyService.PollsAssignmentFound.subscribe(data => {
      this.pollsAssignmentFound = data

    })

    this.route.navigate(['polls-assignment/questionnaire'], { queryParams: { id: poll.id }})
  }

  ngOnDestroy() {
    if (this.pollAssignmentSub instanceof Subscription) {
      this.pollAssignmentSub.unsubscribe()
    }
  }

}
