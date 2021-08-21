import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTaskDialogComponent } from './common/components/edit-task-dialog/edit-task-dialog.component';
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
  constructor(private sharedservice: SharedService, private dialog: MatDialog) {
    const apiData = this.sharedservice
      .getData()
      .then((data) => (this.myData = data));
    console.log(apiData);
  }
  createTask(event: any) {
    this.myData.unshift({
      taskTitle: event,
      timing: `Task created on: ${this.date}`,
    });

    console.log(event);
  }
  clickDeleteTask(index: any) {
    this.myData.splice(index, 1);
  }
  openDialog() {
    const config: MatDialogConfig = {
      height: '400px',
      width: '600px',
      panelClass: 'myDialogStyle',
    };
    this.dialog.open(EditTaskDialogComponent, config);
  }
}
