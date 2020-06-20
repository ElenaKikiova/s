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
  
  // @Output() postSaved = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }


  ngOnInit(): void {
  }

  async close(){
    this.activeModal.close(null);
    // this.postSaved.emit(null);
  }
  
  async save(){
    this.modalService.dismissAll();
    console.log(this.post);
    // this.savePost();
    // this.resetPost();
    // this.postSaved.emit(this.post);
    this.activeModal.close("acl");
  }

}
