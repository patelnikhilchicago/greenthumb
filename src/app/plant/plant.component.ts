import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataSharingServiceService } from '../data-sharing-service.service';
import { GoogleGenAI } from "@google/genai";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as fs from "node:fs";
import { Buffer } from 'buffer';
import path, { dirname } from 'node:path';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-plant',
  imports: [ FormsModule, CommonModule],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.css'
})
export class PlantComponent implements OnInit {
  message: string = '';
  subscription: Subscription;
  punDescription: any = '';
  shortDescription: any = '';
  ai = new GoogleGenAI({ apiKey: "AIzaSyBUiOoBA_vCKxwiqMjdT8VXF5DBMGTqn74" });
  sunlight: number = 8;  // percentage (0–100)
  hourConversation:number = Math.max((this.sunlight/12))*100;
  
  percent = Math.min(Math.max(this.hourConversation, 0), 100); // clamp 0–100
  
  progressStyle: string = `conic-gradient(
    #fbbc04 0% ${this.percent}%,
    #e0e0e0 ${this.percent}% 100%
  )`;



 


  constructor( private _Activatedroute: ActivatedRoute,
      private _router: Router, private dataSharing: DataSharingServiceService, private apiService: ApiService) {
      this.subscription = this.dataSharing.currentMessage.subscribe((message) => (this.message = message));
     }


    ngOnInit(): void {
     console.log(this.message);
     //this.main();
     this.imageGeneration();
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    async main(){
      const response = await this.ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `Provide your response in a # separated list format. DO NOT add numbers before your responses. For the first item in the list, provide a one line pun about ${this.message}. For the second item in the list provide a brief description of ${this.message}, suitable for a beginner, in 2-3 lines. For the third item provide a whole number, between 1 and 12 hours of sunlight how many hours of sunlight does ${this.message} plant need.`,
        });
        console.log(response.text);
        var splitResponse = response.text?.split("#"); 
        
        this.punDescription = splitResponse![1];
        this.shortDescription = splitResponse![2];
        this.sunlight = parseInt(splitResponse![3]) ;

        this.hourConversation = Math.max((this.sunlight/12))*100;
        this.percent = Math.min(Math.max(this.hourConversation, 0), 100); // clamp 0–100
        this.progressStyle = `conic-gradient(
          #fbbc04 0% ${this.percent}%,
          #e0e0e0 ${this.percent}% 100%
        )`;
    }
    
    async imageGeneration() {
      if(this.message == "default message"){
        this.message = "strawberry";
      }

      
      const contents =
      `Generate image of what a ${this.message} plant will look like when its ready for harvest. Show the whole plant.`;
  
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
          
          fs.writeFileSync("../../assets/aigeneratedimage.png", buffer!);
          console.log("Image saved as aigeneratedimage.png");
        }
      }
  
      // const response = await this.ai.models.generateContent({
      //   model: "gemini-2.0-flash",
      //   contents: "Explain how AI works in a few words",
      // });
      // console.log(response.text);
    }
    
}
