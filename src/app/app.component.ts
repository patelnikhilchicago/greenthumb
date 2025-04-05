import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import { FormsModule } from '@angular/forms';
import { compileFromFile } from 'json-schema-to-typescript';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'greenthumbs';
  ai = new GoogleGenAI({ apiKey: "AIzaSyBUiOoBA_vCKxwiqMjdT8VXF5DBMGTqn74" });
  searchInput: any;
  searchResults: any;
  searchResultsArray!: string[];
  ngOnInit(): void{
    //this.main();
    
  }


  async searchBasedonCity(){
    const prompt = `In ${this.searchInput} what plants can I grow around this time of the year, only provide the names of vegetables, fruits and herbs.  provide your output using one list that is comma separated. DO NOT INCLUDE ANY OTHER DETAIL EXPECT A COMMA SEPARATED LIST`;

    const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    console.log(response.text);
    this.searchResults = response.text;

    this.searchResultsArray = this.searchResults.split(",");
    
    console.log(this.searchResultsArray.forEach(element => {
      console.log(element);
    }));
    
  }

  async Search(){
    console.log(this.searchInput);
    this.searchBasedonCity();
  }

  async main() {
    const contents =
    "Hi! Generate an image of strawberry plant that is ready to be harvested. " +
    "The whole strawberry plant should be visible in the image " +
    "the plant should be in a backyard.";

     var response = await this.ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: contents,
      config: {
        responseModalities: ["Text", "Image"],
      },
    });
    for (const part of response!.candidates![0].content!.parts!) {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        var imageData:any = part.inlineData.data;
        var buffer = Buffer.from(imageData!, "base64");
        fs.writeFileSync("gemini-native-image.png", buffer);
        console.log("Image saved as gemini-native-image.png");
      }
    }

    // const response = await this.ai.models.generateContent({
    //   model: "gemini-2.0-flash",
    //   contents: "Explain how AI works in a few words",
    // });
    // console.log(response.text);
  }

   
}
