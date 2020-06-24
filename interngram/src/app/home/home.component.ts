import { CommonModule } from '@angular/common';  
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsModule } from '../components/components.module';
import { AddEditPostModalComponent } from '../components/add-edit-post-modal/add-edit-post-modal.component';
import { DeletePostModalComponent } from '../components/delete-post-modal/delete-post-modal.component';

import { Router } from '@angular/router';
import { ConnectToServerService } from '../services/connect-to-server.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
      Email: localStorage.getItem("userEmail")
    }
    console.log(this.user);

    this.post = {
      "_id": null,
      "userId": this.user,
      "type": '',
      "title": '',
      "date": null,
      "meta": {
        "url": '',
        "alt": ''
      }
    };
  }

  constructor(
    private modalService: NgbModal,
    public http: HttpClient,
    public router: Router,
    private connectToServerService: ConnectToServerService
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
    
    this.modalService.dismissAll();
    this.http.post(
      this.connectToServerService.serverUrl + '/deletePost',
      {id: this.post._id}
    ).subscribe((data => {
      
      let findPost = this.posts.findIndex((p) => p._id == this.post._id);
      console.log(this.post, findPost);
      
      this.posts.splice(findPost, 1);
    }))
  }

  async loadPosts(){
    this.http.get(
      this.connectToServerService.serverUrl + '/allPosts/' + this.index
    ).subscribe((data => {
      this.posts = this.posts.concat(data["posts"]);
    }))
    this.index++;
  }

  async savePost(){
    
    let userData = this.post.userId;
    this.post.userId = userData._id;
    
    this.http.post(
      this.connectToServerService.serverUrl + '/savePost',
      {data: this.post}
    ).subscribe((data => {
      
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
    }))
  }

  async logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
