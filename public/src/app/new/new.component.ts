import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamMap } from '@angular/router';
import { PetService } from '../services/pet.service';
import { Pet } from '../models';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  // newPet: any;
  errors: string[] = [];
  newPet: Pet = new Pet();
  constructor(
    private petService: PetService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('this is from new.component.ts');
    // this.newPet = { name: '', type: '', description: '', skill1: '', skill2: '', skill3: ''};
  }

  onClick() {
    console.log('Clicked!');
  }




// working
//   onSubmit() {
//     console.log(Date.now(), 'from onSubmit, new.component.ts');
//     const observable = this.petService.addPet(this.newPet);
//     observable.subscribe(data => {
//       console.log('From onSubmit, new.component.ts. After observable.subscribe, got data from post', data);
//       this.newPet = new Pet();
//       this.router.navigate(['/pets']);
//     });
//     // console.log('Submitted');
//   }
// }


// in progress
  onSubmit() {
    console.log(Date.now(), 'from onSubmit, new.component.ts');
    const observable = this.petService.addPet(this.newPet);
    observable.subscribe((data: any) => {
      console.log('From onSubmit, new.component.ts. After observable.subscribe, got data from post', data);
      if (data.error) {
        console.log(data.error);
        this.errors = data.error;
      } else {
        this.newPet = new Pet();
        this.router.navigate(['/pets']);
      }
    });
    // console.log('Submitted');
  }
}
