import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsModule } from './components/components.module';
import { AddEditPostModalComponent } from './components/add-edit-post-modal/add-edit-post-modal.component';
import { DeletePostModalComponent } from './components/delete-post-modal/delete-post-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
