import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
})
export class TaskInputComponent implements OnInit {
  @Output() getInputValue = new EventEmitter<string>();

  inputValue = '';
  task = '';

  constructor() {}

  ngOnInit(): void {}

  emojisHideShow() {
    var emojisDisplay: any = document.getElementById('emojisContainer');

    if (emojisDisplay.style.display === 'none') {
      emojisDisplay.style.display = 'block';
    } else {
      emojisDisplay.style.display = 'none';
    }
  }

  addEmoji(event: any) {
    this.inputValue = this.inputValue + event.emoji.native;
    var emojisDisplay: any = document.getElementById('emojisContainer');
    emojisDisplay.style.display = 'none';
  }

  getTask() {
    return this.getInputValue.emit(this.inputValue);

    // this.inputValue = '';
  }
}
