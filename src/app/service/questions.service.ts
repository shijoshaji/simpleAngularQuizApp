import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private httpClient: HttpClient) { }

  getQuestionsJSON() {
    return this.httpClient.get<any>('assets/questions.json');
  }
}

