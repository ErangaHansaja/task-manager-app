import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `<h1>Task Manager App</h1><p>API URL: {{ apiUrl }}</p>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  apiUrl = environment.apiUrl;
}
