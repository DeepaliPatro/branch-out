import { Component } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  tags?: Tag[];
  constructor(plantService: PlantService) {
    plantService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    })
  }
}
