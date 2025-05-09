import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  url = 'http://localhost:3000/questions';
  questions: Question[] = [];
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url);
  }
  getQuestionById(id: number) {
    return this.http.get<Question>(`${this.url}/${id}`);
  }
}
