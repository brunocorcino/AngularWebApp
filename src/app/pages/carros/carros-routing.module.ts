import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    }, 
    {
        path: '',
        data: {
            title: 'Carros'
        },
        children: [
            {
                path: 'index',
                component: IndexComponent
            }, 
            {
                path: 'edit/:id',
                component: EditComponent
            }, 
            {
                path: 'create',
                component: EditComponent
            }
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)]
})
export class CarrosRoutingModule { }
