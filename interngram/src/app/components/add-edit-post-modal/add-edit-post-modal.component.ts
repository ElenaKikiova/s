import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormControl, ValidationErrors, FormGroupDirective, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'add-edit-post-modal',
  templateUrl: './add-edit-post-modal.component.html',
  styleUrls: ['./add-edit-post-modal.component.css']
})
export class AddEditPostModalComponent implements OnInit {

  
  @Input() post: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  public type;
  public title;
  public date;
  public url;
  public alt;

  public addEditPostForm

  ngOnInit(): void {
    console.log(this.post.type);

    this.type = new FormControl(this.post.type);

    this.title = new FormControl(this.post.title, Validators.compose([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(15)
    ]));

    this.date = new FormControl(this.post.date);

    this.url = new FormControl(this.post.meta.url, Validators.compose([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]));

    this.alt = new FormControl(this.post.meta.alt, Validators.maxLength(50));

    this.addEditPostForm = this.formBuilder.group({
      type: this.type,
      title: this.title,
      date: this.date,
      url: this.url,
      alt: this.alt
    });
  }
  

  public submit(){
    let data = {
      _id: this.post._id,
      userId: this.post.userId,
      type: this.addEditPostForm.value.type,
      title: this.addEditPostForm.value.title,
      date: this.addEditPostForm.value.date,
      meta: {
        url: this.addEditPostForm.value.url,
        alt: this.addEditPostForm.value.alt
      }
    }
    console.log(data);
    this.activeModal.close(data);
  }

  public getFormValidationErrors(form: FormGroup) {

    const result = [];
    Object.keys(form.controls).forEach(key => {
  
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            'control': key,
            'error': keyError,
            'value': controlErrors[keyError]
          });
        });
      }
    });
  
    return result;
  }


}
