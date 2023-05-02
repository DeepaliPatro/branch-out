import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from 'src/app/services/plant.service';
import { Plant } from 'src/app/shared/models/Plant';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})
export class PlantDetailsComponent {
  plant!: Plant;
  constructor(route: ActivatedRoute, plantService: PlantService) {
    route.params.subscribe((params) => {
      if(params['id']) {
        plantService.getOneById(params['id']).subscribe(serverPlant => {
          this.plant = serverPlant;
        });
      }
    })
  }
}
