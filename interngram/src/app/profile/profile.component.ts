import { CommonModule } from '@angular/common';  
import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsModule } from '../components/components.module';

import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { BookmarkService } from '../services/bookmark.service';

import { CommentsModalComponent } from '../components/comments-modal/comments-modal.component';
import { AddEditPostModalComponent } from '../components/add-edit-post-modal/add-edit-post-modal.component';
import { DeletePostModalComponent } from '../components/delete-post-modal/delete-post-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user;

  public post;

  posts = [];

  collapsed = false;

  index = 0;

  ngOnInit(): void {

    if(localStorage.getItem("userId") == null){
      this.router.navigate(['/login']);
    }

    this.user = {
      _id: localStorage.getItem("userId"),
      Email: localStorage.getItem("userEmail"),
      Bookmarks: []
    }
    console.log(this.user);

    this.bookmarkService.loadBookmarks(this.user._id).subscribe((data) => {
      this.user.Bookmarks = data["bookmarks"];
      console.log(data["bookmarks"]);
      console.log(this.user);
    })

    this.post = {
      "_id": null,
      "userId": this.user,
      "type": '',
      "title": '',
      "date": null,
      "likes": [],
      "meta": {
        "url": '',
        "alt": ''
      }
    };
  }


  constructor(
    private modalService: NgbModal,
    public router: Router,
    private postService: PostService,
    private bookmarkService: BookmarkService
  ){
    this.loadPosts();
  }

  public resetPost(){
    this.post = {
      "_id": null,
      "userId": this.user,
      "type": '',
      "title": '',
      "date": '',
      "likes": [],
      "meta": {
        "url": '',
        "alt": ''
      }
    }
  }



  async addPost(type) {
    this.resetPost();
    this.post.type = type;

    let modalRef = this.modalService.open(AddEditPostModalComponent, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.post = this.post;
    
    modalRef.result.then((result) => {
      if(result != null){
        this.post = result;
        this.savePost();
      }
    });
  
  }
  async editPost(post) {
    this.post = JSON.parse(JSON.stringify(post));
    console.log(this.post);
    const modalRef = this.modalService.open(AddEditPostModalComponent);
    modalRef.componentInstance.post = this.post;

    modalRef.result.then((result) => {
      if(result != null){
        this.post = result;
        this.savePost();
      }
    });
  }

  async deletePost(post){
    console.log(post);
    this.post = JSON.parse(JSON.stringify(post));
    const modalRef = this.modalService.open(DeletePostModalComponent);
    modalRef.componentInstance.post = this.post;

    modalRef.result.then((result) => {
      console.log(result);
      if(result == true){
        this.confirmedDelete();
      }
    });

  }

  async confirmedDelete(){
    
    this.postService.deletePost(this.post._id).subscribe((data) => {
      
      let findPost = this.posts.findIndex((p) => p._id == this.post._id);
      console.log(this.post, findPost);
      
      this.posts.splice(findPost, 1);
    });
  }

  async loadPosts(){
    this.postService.loadPosts(this.index).subscribe((data => {
      this.posts = this.posts.concat(data["posts"]);
    }))
    this.index++;
  }

  async savePost(){
    
    let userData = this.post.userId;
    this.post.userId = userData._id;

    this.postService.savePost(this.post).subscribe((data) => {
      let newPost = data["post"];
    
      newPost.userId = userData;
      console.log(newPost);
      let findPost = this.posts.findIndex((p) => p._id == newPost._id);
      console.log(newPost, findPost);
      if(findPost == -1){
        this.posts.unshift(newPost);
      }
      else{
        this.posts[findPost] = newPost;
      }
    })
    
  }

  async like(post){
    let index = post.likes.indexOf(this.user._id);

    if(index < 0){
      post.likes.push(this.user._id);
    }
    else{
      post.likes.splice(index, 1);
    }

    this.postService.updateLikes(post).subscribe((data) => {
      console.log(data);
    })
  }

  async bookmark(post){
    let index = this.user.Bookmarks.indexOf(post._id);

    if(index < 0){
      this.user.Bookmarks.push(post._id);
    }
    else{
      this.user.Bookmarks.splice(index, 1);
    }

    this.bookmarkService.updateBookmarks({
      "_id": this.user._id, 
      "Bookmarks": this.user.Bookmarks
    }).subscribe((data) => {
      console.log(data);
    })
  }


  async showComments(post){

    this.postService.loadComments(post._id).subscribe((data => {
      console.log(data);

      const modalRef = this.modalService.open(CommentsModalComponent);
      modalRef.componentInstance.post = post;
      modalRef.componentInstance.user = this.user,
      modalRef.componentInstance.comments = data["comments"];

    }))

  }

  async logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
