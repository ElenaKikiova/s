import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEditPostModalComponent } from './add-edit-post-modal/add-edit-post-modal.component';

@NgModule({
  declarations: [
    AddEditPostModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddEditPostModalComponent
  ],
  bootstrap: [
    AddEditPostModalComponent
  ],
})
export class ComponentsModule { }
