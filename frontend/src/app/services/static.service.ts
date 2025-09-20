import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticService {
  static baseUrl = environment.apiUrl;

  constructor() {}

  auth = {
    register: StaticService.baseUrl + 'auth/register',
    login: StaticService.baseUrl + 'auth/login'
  };

  task = {
    list: StaticService.baseUrl + 'task/task',
    create: StaticService.baseUrl + 'task/task',
    getById: (id: string) => `${StaticService.baseUrl}task/task/${id}`,
    update: (id: string) => `${StaticService.baseUrl}task/task/${id}`,
    delete: (id: string) => `${StaticService.baseUrl}task/task/${id}`
  };
}
