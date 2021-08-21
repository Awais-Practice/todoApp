import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  title = 'Edit task ';

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: { taskTitle: string; timing: string }
  ) {}

  ngOnInit(): void {}
  editTask(event: any) {
    console.log(event);
  }
}
