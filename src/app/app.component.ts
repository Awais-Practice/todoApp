import { Component } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditTaskDialogComponent } from './common/components/edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './common/components/delete-task-dialog/delete-task-dialog.component';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Todo App';
  date = new Date();
  tasks: any = [];
  myDeleteTask: any;
  searchInputDisplay = false;
  moment: typeof moment = moment;
  taskStatus: any;
  searchKeywords = '';
  searchResult: any = [];
  value: any;
  getValues: any;
  // check Box code ts
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  test: any;

  // check Box code ts

  constructor(private sharedservice: SharedService, private dialog: MatDialog) {
    this.getTasks();
  }

  getTasks() {
    this.sharedservice.getData().then((data) => (this.tasks = data));
  }

  createTask(event: any) {
    if (event.length > 0) {
      // Add task  db

      fetch(`${environment.backendUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskTitle: event,
          timing: this.date,
          isCompleted: false,
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
    fetch(`${environment.backendUrl}/tasks/${id}`, {
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
      this.checked == true;
      return this.searchResult;
    } else {
      return this.tasks;
    }
  }

  searchTaskFromTasks() {
    if (this.searchKeywords) {
      this.tasks.forEach((item: any) =>
        item.taskTitle.split(' ').forEach((word: any) => {
          if (this.searchKeywords == word) {
            return this.searchResult.push(item);
          }
        })
      );
    }
    if (this.searchKeywords.length == 0) {
      alert('awais');
    }
  }

  selectedTasks = [];
  controlAllTaskSectionHideShow() {
    if (this.value.length == this.tasks.length) {
      this.checked = true;
    } else {
      this.checked = false;
    }
    this.selectedTasks = this.value;
  }

  selectAllCheckbox(value: any) {
    this.value = value.checked === true ? this.tasks : [];
  }

  deleteAllSelectedTasks() {
    for (var i = 0; i <= this.value.length; i++) {
      fetch(`${environment.backendUrl}/tasks/${this.value[i]._id}`, {
        method: 'DELETE',
      });

      this.sharedservice.getData().then((data) => (this.tasks = data));
    }
  }

  taskStatusCheck(event: any, task: any) {
    fetch(`${environment.backendUrl}/tasks/${task._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isCompleted: event.checked,
      }),
    });
    if (task.isCompleted == true) {
      event.checked == true;
    }
  }
  copyTask(task: any) {
    alert(task._id);
  }
}
