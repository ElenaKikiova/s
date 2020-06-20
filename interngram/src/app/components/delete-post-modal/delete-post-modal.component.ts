import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: ['./delete-post-modal.component.css']
})
export class DeletePostModalComponent implements OnInit {

  
  @Input() post: any;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }


  ngOnInit(): void {
  }


}
