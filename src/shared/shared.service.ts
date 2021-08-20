import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  getData() {
    return fetch('http://localhost:5000/tasks').then((item) => item.json());
  }

  constructor() {}
}
