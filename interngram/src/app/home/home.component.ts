import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsModule } from '../components/components.module';
import { AddEditPostModalComponent } from '../components/add-edit-post-modal/add-edit-post-modal.component';
import { DeletePostModalComponent } from '../components/delete-post-modal/delete-post-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
  }

  serverUrl = "http://localhost:8080";

  posts = [];

  collapsed = false;

  index = 0;

  post = {
    "_id": null,
      "type": '',
      "title": '',
      "date": null,
      "meta": {
        "url": '',
        "alt": ''
      }
  };


  constructor(
    private modalService: NgbModal,
    public http: HttpClient
  ){
    this.loadPosts();
  }

  async resetPost(){
    this.post = {
      "_id": null,
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
      this.post = result;
      this.savePost();
    });
  
  }
  async editPost(post) {
    this.post = JSON.parse(JSON.stringify(post));

    const modalRef = this.modalService.open(AddEditPostModalComponent);
    modalRef.componentInstance.post = this.post;

    modalRef.result.then((result) => {
      this.post = result;
      this.savePost();
    });
  }

  async deletePost(post){
    console.log(post);
    this.post = JSON.parse(JSON.stringify(post));
    const modalRef = this.modalService.open(DeletePostModalComponent);
    modalRef.componentInstance.post = this.post;

    modalRef.result.then((result) => {
      if(result == true){
        this.confirmedDelete();
      }
    });

  }

  async confirmedDelete(){
    
    this.modalService.dismissAll();
    this.http.post(
      this.serverUrl + '/deletePost',
      {id: this.post._id}
    ).subscribe((data => {
      
      let findPost = this.posts.findIndex((p) => p._id == this.post._id);
      console.log(this.post, findPost);
      
      this.posts.splice(findPost, 1);
    }))
  }

  async loadPosts(){
    this.http.get(
      this.serverUrl + '/allPosts/' + this.index
    ).subscribe((data => {
      this.posts = this.posts.concat(data["posts"]);
    }))
    this.index++;
  }

  async savePost(){
    this.http.post(
      this.serverUrl + '/savePost',
      {data: this.post}
    ).subscribe((data => {
      
      let newPost = data["post"];
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

}
