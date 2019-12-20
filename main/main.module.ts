import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MatPaginatorModule} from '@angular/material/paginator';
// import CanvasJS from 'canvasjs';
import { ChartsModule } from 'ng2-charts';
// import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
  imports: [
      CommonModule,
      MainRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      ChartsModule
      // CanvasJS
      // JwPaginationComponent
  ],
  declarations: [MainComponent]
})
export class MainModule { }