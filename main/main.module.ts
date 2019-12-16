import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
      CommonModule,
      MainRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }