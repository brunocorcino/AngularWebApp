import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// www.implanta.com/AngularWebApp/carros

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'carros',
        loadChildren: () => import('src/app/pages/carros/carros.module').then(c => c.CarrosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
