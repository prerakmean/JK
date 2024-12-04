import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from '../user/dashboard/dashboard.component';
import { DialogContentComponent } from '../user/dialog-content/dialog-content.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { UserListComponent } from './user-list/user-list.component';
import { IngestionComponent } from './ingestion/ingestion.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DialogContentComponent,
    UploadDocumentComponent,
    UserListComponent,
    IngestionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
  ]
})
export class UserModule { }
