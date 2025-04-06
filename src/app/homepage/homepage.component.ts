
import { AfterViewInit, Component, ElementRef, ViewChild, Input, OnChanges  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleGenAI } from "@google/genai";

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataSharingServiceService } from '../data-sharing-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router, private datasharing: DataSharingServiceService) { 
     this.citySubscription = this.datasharing.currentCity.subscribe((message) => (this.searchInput = message));
  }


  citySubscription: Subscription;

  title = 'greenthumbs';
  ai = new GoogleGenAI({ apiKey: "AIzaSyBUiOoBA_vCKxwiqMjdT8VXF5DBMGTqn74" });
  searchInput: any;
  searchResults: any;
  searchResultsArray!: string[];
  ngOnInit(): void{
    if(this.datasharing.getSearchResults().length > 1){
      this.searchResultsArray = this.datasharing.getSearchResults();
    }
    //console.log("This is the search array element #2 " + this.searchResultsArray[2]);
  }


  async searchBasedonCity(){
    const prompt = `In ${this.searchInput} what plants can I grow around this time of the year, only provide the names of vegetables, fruits and herbs.  provide your output using one list that is comma separated. DO NOT INCLUDE ANY OTHER DETAIL EXPECT A COMMA SEPARATED LIST. ONLY PROVIDE THE NAME, NOT THE CATEGORY.`;

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

    this.datasharing.changeCity(this.searchInput);
    this.datasharing.setSearchResults(this.searchResultsArray);

  }

  async Search(){
    console.log(this.searchInput);
    this.searchBasedonCity();
  }

  


  buttonClicked(){
    this.router.navigate(['plant']);
  }

  plantClicked(index: any){
    this.datasharing.changeMessage(this.searchResultsArray[index]);
    this.router.navigate(['plant']);
  }

}
