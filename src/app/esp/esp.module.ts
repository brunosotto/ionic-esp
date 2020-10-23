import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EspPageRoutingModule } from './esp-routing.module';
import { EspPage } from './esp.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EspPageRoutingModule
  ],
  declarations: [EspPage]
})
export class EspPageModule {}
