import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterButtonsComponent } from './footer-buttons.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FooterButtonsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [FooterButtonsComponent]
})
export class FooterButtonsModule { }
