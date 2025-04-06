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
  plantName: string = '';
  cityName: string = '';

  plantSubscription: Subscription;  
  citySubscription: Subscription;
  punDescription: any = '';
  shortDescription: any = '';
  bestMonthToSow: any = '';
  sowInstructions: any = '';
  typeOfSoil: any = '';
  soilpH: any = '';
  sowingMethod: any = '';
  sowingMethodDescription: any = '';
  sowingDepth: any = '';
  germination: any = '';
  pests: any = '';
  pesticides: any = '';




  ai = new GoogleGenAI({ apiKey: "AIzaSyBUiOoBA_vCKxwiqMjdT8VXF5DBMGTqn74" });
  sunlight: number = 8;  // percentage (0–100)
  hourConversation:number = Math.max((this.sunlight/12))*100;
  
  percent = Math.min(Math.max(this.hourConversation, 0), 100); // clamp 0–100
  
  progressStyle: string = `conic-gradient(
    #fbbc04 0% ${this.percent}%,
    #e0e0e0 ${this.percent}% 100%
  )`;

  water : number = 8;  // percentage (0–100)
  waterConversation:number = Math.max((this.water/10))*100;
  waterPercent = Math.min(Math.max(this.waterConversation, 0), 100); // clamp 0–100
  progressStyleW: string = `conic-gradient(
rgb(31, 9, 234) 0% ${this.waterPercent}%,
    #e0e0e0 ${this.waterPercent}% 100%
  )`;



 


  constructor( private _Activatedroute: ActivatedRoute,
      private _router: Router, private dataSharing: DataSharingServiceService, private apiService: ApiService) {
      this.plantSubscription = this.dataSharing.currentPlant.subscribe((message) => (this.plantName = message));
      this.citySubscription = this.dataSharing.currentCity.subscribe((message) => (this.cityName = message));
     }


    ngOnInit(): void {
     console.log(this.plantName);
     this.main();
     //this.imageGeneration();
    }
    ngOnDestroy() {
      this.plantSubscription.unsubscribe();
      this.citySubscription.unsubscribe();
    }

    async main(){
      const response = await this.ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `Provide your response in a # separated list format. 
          DO NOT add numbers before your responses. 
          For the first item in the list, provide a one line pun about ${this.plantName}. 
          For the second item in the list provide a brief description of ${this.plantName}, suitable for a beginner, in 2-3 lines. 
          For the third item provide a whole number, between 1 and 12 hours of sunlight how many hours of sunlight does ${this.plantName} plant need. Don't just give me 6 everytime.
          For the fourth item provide which exact month to sow seeds for ${this.plantName} plant in ${this.cityName} location.
          For fifth item, provide a short instruction on how to carry out fourth item.
          For sixth item, choose one soil type that is suitable for ${this.plantName} plant and provide a short description of the choose soil type.
          For seventh item, provide what soil pH to have for ${this.plantName} plant
          For eigth item, choose one sowing method for ${this.plantName} plant from (Broadcasting, Drilling, Dibbling, Hill planting, Indoor sowing, Seedbed sowing, Transplanting).
          For ninth item, provide a short description on how to carry out eigth item.
          For tenth item, provide the depth at which to sow for ${this.plantName} plant.
          For eleventh item, provide one type of germination for ${this.plantName} plant, followed by a short description.
          For twelfth item, provide a list of Pests that ${this.plantName} plant will attract in ${this.cityName} location.
          For thirteenth item, provide a list of pesticides that can be used on ${this.plantName} plant.`,
          
        });
        console.log(response.text);
        var splitResponse = response.text?.split("#"); 
        
        this.punDescription = splitResponse![1];
        this.shortDescription = splitResponse![2];
        this.sunlight = parseInt(splitResponse![3]) ;
        this.water = parseInt(splitResponse![4]) ;
        this.bestMonthToSow =  splitResponse![4];
        this.sowInstructions = splitResponse![5];
        this.typeOfSoil  = splitResponse![6];
        this.soilpH = splitResponse![7];
        this.sowingMethod = splitResponse![8];
        this.sowingMethodDescription = splitResponse![9];
        this.sowingDepth = splitResponse![10];
        this.germination = splitResponse![11];
        this.pests = splitResponse![12];
        this.pesticides = splitResponse![13];

        this.hourConversation = Math.max((this.sunlight/12))*100;
        this.percent = Math.min(Math.max(this.hourConversation, 0), 100); // clamp 0–100
        this.progressStyle = `conic-gradient(
          #fbbc04 0% ${this.percent}%,
          #e0e0e0 ${this.percent}% 100%
        )`;

        this.waterConversation = Math.max((this.water/10))*100;
        this.waterPercent = Math.min(Math.max(this.waterConversation, 0), 100); // clamp 0–100
        this.progressStyleW= `conic-gradient(
        rgb(31, 9, 234) 0% ${this.waterPercent}%,
        #e0e0e0 ${this.waterPercent}% 100%
        )`;
    }
    
    // async imageGeneration() {
    //   if(this.plantName == "default message"){
    //     this.plantName = "strawberry";
    //   }

      
    //   const contents =
    //   `Generate image of what a ${this.plantName} plant will look like when its ready for harvest. Show the whole plant.`;
  
    //    var response = await this.ai.models.generateContent({
    //     model: "gemini-2.0-flash-exp-image-generation",
    //     contents: contents,
    //     config: {
    //       responseModalities: ["Text", "Image"],
    //     },
    //   });
    //   for (const part of response!.candidates![0].content!.parts!) {
    //     // Based on the part type, either show the text or save the image
    //     if (part.text) {
    //       console.log(part.text);
    //     } else if (part.inlineData) {
    //       var imageData:any = part.inlineData.data;
    //       var buffer = Buffer.from(imageData!, "base64");
          
    //       fs.writeFileSync("../../assets/aigeneratedimage.png", buffer!);
    //       console.log("Image saved as aigeneratedimage.png");
    //     }
    //   }
  
    //   // const response = await this.ai.models.generateContent({
    //   //   model: "gemini-2.0-flash",
    //   //   contents: "Explain how AI works in a few words",
    //   // });
    //   // console.log(response.text);
    // }
    
}
