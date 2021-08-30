import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  getData() {
    return fetch(`${environment.backendUrl}/tasks`).then((item) => item.json());
  }

  constructor() {}
}
