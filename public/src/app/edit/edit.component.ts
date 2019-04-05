import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';
import { PetService } from '../services/pet.service';
import { Pet } from '../models';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

// in progress, now works!

export class EditComponent implements OnInit {

  errors: string[] = [];
  thisPet = null;
  updatedPet: any = null;


   petId: string;
  // pet: Pet = new Pet();
  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private router: Router,
  ) {

    this.route.paramMap.subscribe(
      params => (this.petId = params.get('id')));
    console.log('From edit.componenet.ts, this is this.petId: ', this.petId);
    this.petService.getPet(this.petId)
      .subscribe(petReturned => {
        this.thisPet = petReturned;
        console.log('From edit.componenet.ts, this is this.thisPet.data ', this.thisPet.data);
        console.log('From edit.componenet.ts, this is this.thisPet.data.name ', this.thisPet.data.name); // getting null with this.thisPet.name!
        this.updatedPet = this.thisPet.data; // does this work? yes!
        // this.updatedPet = {
        //   name: this.thisPet.name,
        //   qty: this.thisPet.qty,
        //   price: this.thisPet.price,
        //   _id: this.thisPet._id
        // };
        console.log('From edit.componenet.ts, this is this.updatedPet ', this.updatedPet);
    });
   }

  ngOnInit() {
  }

  onSubmit(): void {
    this.petService
      .updatePet(this.petId, this.updatedPet)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['/pets']);
      });
  }

  onDelete(product: Pet): void {
    this.petService.removePet(this.petId).subscribe(result => {
      console.log('this is the onDelete() route', this.router);
      this.router.navigate(['/pets']);
    });
    console.log('ran onDelete()');

  }
}





/*old version, working, but does not prepopulate information to user form*/
  /*
export class EditComponent implements OnInit {
  petId: string;
  pet: Pet = new Pet();
  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private router: Router,
  ) {

    this.route.paramMap.subscribe(
      (params: ParamMap) => (this.petId = params.get('id')));
    console.log('From edit.componenet.ts, this is this.petId: ', this.petId);
   }

  ngOnInit() {
    // get parameters
    this.petService.getPet(this.petId)
      .subscribe(pet => {
        this.pet = pet;
      });
  }

  onSubmit(): void {
    this.petService
      .updatePet(this.petId, this.pet)
      .subscribe(result => {
      this.router.navigate(['/pets']);
      });
  }

  onDelete(product: Pet): void {
    this.petService.removePet(this.petId).subscribe(result => {
      console.log('this is the onDelete() route', this.router);
      this.router.navigate(['/pets']);
    });
    console.log('ran onDelete()');

  }
}
*/
