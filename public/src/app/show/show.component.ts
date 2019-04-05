import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetService } from '../services/pet.service';
import { Pet } from '../models';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  @Input()
  pet: Pet;
  constructor(
    private petService: PetService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
    .pipe(
      map(params => params.get('id')), // converts param, takes id,
      switchMap(id => this.petService.getPet(id)) // point at pet service
    )
    .subscribe(pet => {
      console.log('pet', pet);
      this.pet = pet; // reassign to pet
    });
  }
  delete(id) {
    this.petService.removePet(id).subscribe(result => {
      console.log('this is the removePet(id) route, id is', id);
      this.router.navigate(['/pets']);
    });
  }
}
