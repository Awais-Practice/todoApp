import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  title = 'Edit task ';
  constructor() {}

  ngOnInit(): void {}
}