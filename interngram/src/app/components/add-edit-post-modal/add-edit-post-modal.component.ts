import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-edit-post-modal',
  templateUrl: './add-edit-post-modal.component.html',
  styleUrls: ['./add-edit-post-modal.component.css']
})
export class AddEditPostModalComponent implements OnInit {

  
  @Input() post: any;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }


  ngOnInit(): void {
  }


}
