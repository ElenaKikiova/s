import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormControl, ValidationErrors, FormGroupDirective, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.css']
})
export class CommentsModalComponent implements OnInit {

  
  @Input() comments: any;

  newComment = {
    userId: null,
    postId: null,
    comment: ""
  }

  constructor(
    // private formBuilder: FormBuilder,
    // private modalService: NgbModal,
    // public activeModal: NgbActiveModal
  ) { }

  // public type;
  // public title;
  // public date;
  // public url;
  // public alt;

  // public commentsForm;

  ngOnInit(): void {
  //   console.log(this.post.type);

  //   this.type = new FormControl(this.post.type);

  //   this.title = new FormControl(this.post.title, Validators.compose([
  //     Validators.required,
  //     Validators.minLength(1),
  //     Validators.maxLength(15)
  //   ]));

  //   this.date = new FormControl(this.post.date);

  //   this.url = new FormControl(this.post.meta.url, Validators.compose([
  //     Validators.required,
  //     Validators.minLength(1),
  //     Validators.maxLength(50)
  //   ]));

  //   this.alt = new FormControl(this.post.meta.alt, Validators.maxLength(50));

  //   this.commentsForm = this.formBuilder.group({
  //     type: this.type,
  //     title: this.title,
  //     date: this.date,
  //     url: this.url,
  //     alt: this.alt
  //   });
  }
  

  // public submit(){
  //   let data = {
  //     _id: this.post._id,
  //     userId: this.post.userId,
  //     type: this.commentsForm.value.type,
  //     title: this.commentsForm.value.title,
  //     date: this.commentsForm.value.date,
  //     meta: {
  //       url: this.commentsForm.value.url,
  //       alt: this.commentsForm.value.alt
  //     }
  //   }
  //   console.log(data);
  //   this.activeModal.close(data);
  // }

  // public getFormValidationErrors(form: FormGroup) {

  //   const result = [];
  //   Object.keys(form.controls).forEach(key => {
  
  //     const controlErrors: ValidationErrors = form.get(key).errors;
  //     if (controlErrors) {
  //       Object.keys(controlErrors).forEach(keyError => {
  //         result.push({
  //           'control': key,
  //           'error': keyError,
  //           'value': controlErrors[keyError]
  //         });
  //       });
  //     }
  //   });
  
  //   return result;
  // }

  async submitComment(){
    console.log(this.newComment);
  }

}
