import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleGenAI } from "@google/genai";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'greenthumbs';
  ai = new GoogleGenAI({ apiKey: "AIzaSyBUiOoBA_vCKxwiqMjdT8VXF5DBMGTqn74" });
  ngOnInit(): void{
this.main();
  }

  async main() {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
  }

   
}
