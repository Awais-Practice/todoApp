import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // myData = [
  //   { taskTitle: 'Task number one ', timing: '19 August 2021' },
  //   { taskTitle: 'Task number two ', timing: '20 August 2021' },
  //   { taskTitle: 'Task number three ', timing: '21 August 2021' },
  //   { taskTitle: 'Task number four ', timing: '22 August 2021' },
  //   { taskTitle: 'Task number five ', timing: '23 August 2021' },
  // ];

  getData() {
    return fetch('http://localhost:5000/tasks').then((item) => item.json());
  }

  constructor() {}
}
