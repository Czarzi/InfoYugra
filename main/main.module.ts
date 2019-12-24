import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ChartsModule } from 'ng2-charts';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentExampleDialog } from './main.component';

@NgModule({
  imports: [
      CommonModule,
      MainRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      ChartsModule,
      MatButtonModule,
      MatDialogModule
  ],
  declarations: [MainComponent,DialogContentExampleDialog],
  entryComponents: [DialogContentExampleDialog]
})
export class MainModule { }