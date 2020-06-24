import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.css']
})
export class CommentsModalComponent implements OnInit {

  @Input() postId: any;
  @Input() user: any;
  @Input() comments: any;

  newComment = {
    userId: {
      _id: null,
      Email: null
    },
    postId: null,
    comment: ""
  }

  constructor(
    private postService: PostService
  ) { }

  // public type;
  // public title;
  // public date;
  // public url;
  // public alt;

  // public commentsForm;

  ngOnInit(): void {

    this.newComment.postId = this.postId;
    this.newComment.userId = {
      _id: this.user._id,
      Email: this.user.Email
    }

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

    this.comments.unshift(JSON.parse(JSON.stringify(this.newComment)));

    let commentForDb = JSON.parse(JSON.stringify(this.newComment));
    commentForDb.userId = this.newComment.userId._id;

    this.postService.addComment(commentForDb).subscribe((data) => {
      console.log(data);
      this.newComment.comment = "";
    })
    
  }

}
