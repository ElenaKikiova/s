import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeletePostModalComponent } from './delete-post-modal/delete-post-modal.component';
import { AddEditPostModalComponent } from './add-edit-post-modal/add-edit-post-modal.component';
import { CommentsModalComponent } from './comments-modal/comments-modal.component';

@NgModule({
  declarations: [
    AddEditPostModalComponent,
    DeletePostModalComponent,
    CommentsModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddEditPostModalComponent,
    DeletePostModalComponent,
    CommentsModalComponent
  ],
  bootstrap: [
    AddEditPostModalComponent,
    DeletePostModalComponent,
    CommentsModalComponent
  ],
})
export class ComponentsModule { }
