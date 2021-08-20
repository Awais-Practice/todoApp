import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditInputComponent } from './common/components/edit-input/edit-input.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { TaskInputComponent } from './common/components/task-input/task-input.component';
import { FormsModule } from '@angular/forms';
import { SharedService } from 'src/shared/shared.service';

@NgModule({
  declarations: [AppComponent, EditInputComponent, TaskInputComponent],
  imports: [
    BrowserModule,
    PickerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
