import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataSharingServiceService } from '../data-sharing-service.service';
import { GoogleGenAI } from "@google/genai";


@Component({
  selector: 'app-plant',
  imports: [],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.css'
})
export class PlantComponent implements OnInit {
  message: string = '';
  subscription: Subscription;
  punDescription: any = '';
  shortDescription: any = '';
  ai = new GoogleGenAI({ apiKey: "AIzaSyBUiOoBA_vCKxwiqMjdT8VXF5DBMGTqn74" });

  constructor( private _Activatedroute: ActivatedRoute,
      private _router: Router, private dataSharing: DataSharingServiceService) {
      this.subscription = this.dataSharing.currentMessage.subscribe((message) => (this.message = message));
     }


    ngOnInit(): void {
     console.log(this.message);
     this.main();
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    async main(){
      const response = await this.ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `Provide your response in a # separated list format. For the first item in the list, provide a one line pun about ${this.message}. For the second item in the list provide a brief description of ${this.message}, suitable for a beginner, in 2-3 lines.`,
        });
        console.log(response.text);
        var splitResponse = response.text?.split("#"); 
        
        this.punDescription = splitResponse![1];
        this.shortDescription = splitResponse![2];
    }
    
    
    
}
