import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { Pet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {
  }

  addPet(newPet) {
    // console.log('from addPet, pet.service.ts');
    return this._http.post('/pts', newPet);
  }

  getPet(id: string): Observable<Pet> {

    // return this._http.get('/pts/' + id);
    return this._http.get<Pet>('/pts/' + id);
  }

  getPets() {
    // console.log('from getPets()');
    return this._http.get('/pts');
  }

  updatePet(id, petData): Observable<Pet> {
    console.log('from updatePet() in pet.service.ts, petData is ', petData);
    return this._http.put<Pet>('/pts/' + id, petData);
  }

  removePet(id): Observable<Pet> {
    // console.log(id);
    const url = '/pts/' + id;
    // console.log(url);
    return this._http.delete<Pet>('/pts/' + id);
  }
}
