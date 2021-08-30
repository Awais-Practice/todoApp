import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { TaskInputComponent } from '../task-input/task-input.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  @ViewChild(TaskInputComponent) awais: TaskInputComponent | undefined;
  title = 'Edit task ';

  constructor(
    private dialog: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public task: { _id: number; taskTitle: string; timing: string }
  ) {}

  ngOnInit(): void {}
  editTask(taskTitle: any) {
    const id = this.task._id;
    this.task.taskTitle = taskTitle;

    fetch(`${environment.backendUrl}/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        taskTitle: taskTitle,
      }),
    });

    this.dialog.close();
  }
}
