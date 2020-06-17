import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
    "type": '',
    "title": '',
    "meta": {
      "url": '',
      "alt": ''
    }
  };
  closeResult;


  constructor(
    private modalService: NgbModal,
    public http: HttpClient
  ){
    this.loadPosts();
  }


  async addPost(type, modal) {
    this.post.type = type;
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  async save(modal){
    this.modalService.dismissAll();
    console.log(this.post);

    this.posts.push(this.post);

    this.savePost();
  }

  async getDismissReason(reason: any) {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async loadPosts(){
    this.http.get(
      this.serverUrl + '/allPosts/' + this.index
    ).subscribe((data => {
      console.log(data);
      this.posts = this.posts.concat(data["posts"]);
    }))
    this.index++;
  }

  async savePost(){
    console.log("a");
    this.http.post(
      this.serverUrl + '/savePost',
      {data: this.post}
    ).subscribe((data => {
      console.log(data);
    }))
  }

}
