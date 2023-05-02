import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../shared/models/Plant';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Plant[]> {
    return this.http.get<Plant[]>("http://localhost:8080/api/plants");
  }

  getAllBySearch(searchTerm: string) {
    return this.http.get<Plant[]>("http://localhost:8080/api/plants/search/" + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>("http://localhost:8080/api/plants/tags");
  }

  getAllByTag(tag: string) {
    return tag === "All" ?
      this.getAll() :
      this.http.get<Plant[]>("http://localhost:8080/api/plants/tag/" + tag);
  }

  getOneById(plantId:string) {
    return this.http.get<Plant>("http://localhost:8080/api/plants/" + plantId);
  }
}
