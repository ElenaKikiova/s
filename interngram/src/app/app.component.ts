import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interngram';

  collapsed = true;

  serverUrl = "http://localhost:8080";

  posts = [];

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

  async addPost(type, modal) {
    this.resetPost();
    this.post.type = type;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result;
  }

  async editPost(post, modal) {
    this.post = JSON.parse(JSON.stringify(post));
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result;
  }

  async save(modal){
    this.modalService.dismissAll();
    console.log(this.post);
    this.post.date = new Date(this.post.date);
    this.savePost();
    this.resetPost();
  }


  async deletePost(post, modal){
    console.log(post);
    this.post = JSON.parse(JSON.stringify(post));
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result;

  }

  async confirmedDelete(post){
    
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
