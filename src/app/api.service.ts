
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  private apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your API key

  
  // generateText(prompt: string): Observable<any> {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.apiKey}`,
  //   };

  //   const body = {
  //     prompt,
  //     max_tokens: 100,
  //     temperature: 0.7,
  //   };

  //   return this.http.post<any>(this.apiUrl, body, { headers });
  // }
}
