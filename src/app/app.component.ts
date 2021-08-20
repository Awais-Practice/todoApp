import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component } from '@angular/core';
import { SharedService } from 'src/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Todo App';
  date = new Date().toISOString().slice(0, 10);
  myData: any = [];
  constructor(private sharedservice: SharedService) {
    this.myData = this.sharedservice.myData;
  }
  createTask(event: any) {
    this.myData.unshift({
      taskTitle: event,
      timing: `Task created on: ${this.date}`,
    });
  }
  clickDeleteTask(index: any) {
    alert(index);
    this.myData.splice(index, 1);
  }
}
