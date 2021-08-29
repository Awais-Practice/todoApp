import { Component } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTaskDialogComponent } from './common/components/edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './common/components/delete-task-dialog/delete-task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Todo App';
  date = new Date().toISOString().slice(0, 10);
  tasks: any = [];
  myDeleteTask: any;
  searchInputDisplay = false;
  searchKeywords = '';
  searchResult: any = [];
  controlAllTask = false;
  // check Box code ts
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  // check Box code ts

  constructor(private sharedservice: SharedService, private dialog: MatDialog) {
    const apiData = this.sharedservice
      .getData()
      .then((data) => (this.tasks = data));
    console.log(apiData);
  }
  createTask(event: any) {
    if (event.length > 0) {
      // Add task  db

      fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskTitle: event,
          timing: `Task created on: ${this.date}`,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.tasks.unshift(response);
        });
    }
  }

  openDialog(task: any) {
    const config: MatDialogConfig = {
      height: '400px',
      width: '600px',
      panelClass: 'myDialogStyle',
      data: task,
    };
    this.dialog.open(EditTaskDialogComponent, config);
  }
  // this function is delete task

  deleteTaskDialog(task: any, i: any) {
    const id = task._id;
    const config: MatDialogConfig = {
      height: '180px',
      width: '400px',
      panelClass: 'myDialogStyle',
      data: task,
    };

    this.dialog
      .open(DeleteTaskDialogComponent, config)
      .afterClosed()
      .subscribe((dialogResponse) => {
        if (dialogResponse == 'yes') this.tasks.splice(i, 1);
      });
    // delete from db
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // this function is delete task end

  openSearchInput() {
    if (this.searchInputDisplay == false) {
      this.searchInputDisplay = true;
    } else {
      this.searchInputDisplay = false;
    }
  }

  get data() {
    if (this.searchResult.length > 0) {
      return this.searchResult;
    } else {
      return this.tasks;
    }
  }

  searchTaskFromTasks() {
    this.searchResult = [];
    this.tasks.forEach((item: any) =>
      console.log(
        item.taskTitle.split(' ').forEach((word: any) => {
          if (word == this.searchKeywords) {
            this.searchResult.push(item);
          }
        })
      )
    );
  }

  controlAllTaskSectionHideShow() {
    if (this.controlAllTask == false) {
      this.controlAllTask = true;
    } else {
      this.controlAllTask = false;
    }
  }
}
