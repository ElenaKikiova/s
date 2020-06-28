import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.css']
})
export class CommentsModalComponent implements OnInit {

  @Input() post: any;
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


  ngOnInit(): void {

    this.newComment.postId = this.post._id;
    this.newComment.userId = {
      _id: this.user._id,
      Email: this.user.Email
    }

  }


  async submitComment(){
    console.log(this.newComment);

    this.comments.unshift(JSON.parse(JSON.stringify(this.newComment)));

    let commentForDb = JSON.parse(JSON.stringify(this.newComment));
    commentForDb.userId = this.newComment.userId._id;

    this.postService.addComment(commentForDb).subscribe((data) => {
      this.newComment.comment = "";
    })
    
  }

  

  async deleteComment(commentId){

    this.postService.deleteComment(commentId).subscribe((data) => {

      if(data == null){
        let commentIndex = this.comments.findIndex((c) => c._id == commentId);
        this.comments.splice(commentIndex, 1);
      }
    })
    
  }

}
