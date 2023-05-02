import { Component, OnInit } from '@angular/core';
import { Plant } from '../../shared/models/Plant';
import { PlantService } from 'src/app/services/plant.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  plants: Plant[] = [];
  constructor( private plantService:PlantService, route: ActivatedRoute ) {
    let plantsObservalbe:Observable<Plant[]>;

    route.params.subscribe((params) => {
      if(params['searchTerm']) {
        plantsObservalbe = this.plantService.getAllBySearch(params['searchTerm']);
      } else if(params['tag']) { 
        plantsObservalbe = this.plantService.getAllByTag(params['tag'])
      } else {
        plantsObservalbe = plantService.getAll();
      }

      plantsObservalbe.subscribe((serverPlants) => {
        this.plants = serverPlants;
      }) 
    })
  }
  ngOnInit(): void {}
}
