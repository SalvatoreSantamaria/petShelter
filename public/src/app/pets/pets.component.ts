import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetService } from '../services/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: {};
  data: {};

  constructor(
    // private _httpService: HttpService,
    private petService: PetService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPetsFromService();
  }

  getPetsFromService() {
    const observable = this.petService.getPets();
    observable.subscribe(data => {
      // console.log('Got all data', data);

      this.pets = data;
      // console.log('this is data', data[0]);
    });
  }

  delete(id) {
    this.petService.removePet(id).subscribe(result => {
      console.log('this is the removePet(id) route, id is', id);
      this.ngOnInit();
    });
  }
}
