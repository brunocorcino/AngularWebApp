import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { CarrosRoutingModule } from './carros-routing.module';
import { FooterButtonsModule } from 'src/app/components/footer-buttons/footer-buttons.module';
import { VerificarValorNuloPipeModule } from 'src/app/pipes/verificar-valor-nulo/verificar-valor-nulo.pipe.module';

@NgModule({
  declarations: [
    IndexComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarrosRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    FooterButtonsModule,
    VerificarValorNuloPipeModule
  ]
})
export class CarrosModule { }
