import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
// import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
  imports: [
      CommonModule,
      MainRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      // JwPaginationComponent
  ],
  declarations: [MainComponent]
})
export class MainModule { }