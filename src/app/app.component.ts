import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTaskDialogComponent } from './common/components/edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './common/components/delete-task-dialog/delete-task-dialog.component';
import { config } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Todo App';
  date = new Date().toISOString().slice(0, 10);
  myData: any = [];
  myDeleteTask: any;

  constructor(private sharedservice: SharedService, private dialog: MatDialog) {
    const apiData = this.sharedservice
      .getData()
      .then((data) => (this.myData = data));
    console.log(apiData);
  }
  createTask(event: any) {
    if (event.length > 0) {
      this.myData.unshift({
        taskTitle: event,
        timing: `Task created on: ${this.date}`,
      });
    }
  }

  //

  // deleteTaskDialogg() {
  //   this.myData.splice(this.myDeleteTask, 1);
  // }

  //

  openDialog(task: any) {
    const config: MatDialogConfig = {
      height: '400px',
      width: '600px',
      panelClass: 'myDialogStyle',
      data: task,
    };
    this.dialog.open(EditTaskDialogComponent, config);
  }
  deleteTaskDialog(task: any) {
    const config: MatDialogConfig = {
      height: '180px',
      width: '400px',
      panelClass: 'myDialogStyle',
      data: task,
    };
    this.dialog
      .open(DeleteTaskDialogComponent, config)
      .afterClosed()
      .subscribe((taskTodelet) => this.myData.splice(taskTodelet, 1));
  }
}
