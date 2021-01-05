import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import  { GridComponent } from './grid/grid.component';
import  { TableComponent } from './table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '',  redirectTo: '/generator', pathMatch: 'full' },
      { path: 'generator', component: GridComponent },
      { path: 'payments', component: TableComponent }
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
