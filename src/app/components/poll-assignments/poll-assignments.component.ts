import {Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
const enum TodoSliceEnum {
  COMPLETE = "Complete",
  INCOMPLETE = "Incomplete"
}

class Todo {
  id: string
  description: string
  completed: boolean
}

const todos: Todo[] = [{ id: '123', description: 'Complete me!', completed: false }]
const todos2: Todo[] = [{ id: '321', description: 'Done!', completed: true }]
@Component({
  selector: 'app-poll-assignments',
  templateUrl: './poll-assignments.component.html',
  styleUrls: ['./poll-assignments.component.css']
})

export class PollAssignmentsComponent {
 /**
   * Control column ordering and which columns are displayed.
   */
 displayedColumns:string[] =  ['id', 'description', 'actions']
 dataSource: MatTableDataSource<Todo>

 ngOnInit() {
   const self = this;
   this.dataSource = new MatTableDataSource(todos);
 }
 ngOnDestroy() {}
}
