import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {

  constructor() { }
  private plantSource = new BehaviorSubject('');
      currentPlant = this.plantSource.asObservable();

  private citySource = new BehaviorSubject('');
    currentCity = this.citySource.asObservable();

    private searchResultsArray: any[] = [];

      changeMessage(message: string) {
        this.plantSource.next(message);
      }

      changeCity(city: string){
        this.citySource.next(city);
      }

      setSearchResults(searchResults: string[]){
        this.searchResultsArray = searchResults;
      }

      getSearchResults(){
        return this.searchResultsArray;
      }
}
