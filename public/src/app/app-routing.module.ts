import { PetsComponent } from './pets/pets.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/pets' }, // without login and register
  // {path: 'register', component: RegisterComponent},
  {
    path: 'pets',
    children: [
      { path: '', component: PetsComponent },
      { path: 'new', component: NewComponent },
      { path: ':id', component: ShowComponent },
      { path: ':id/edit', component: EditComponent },
      { path: '**', component: PagenotfoundComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
