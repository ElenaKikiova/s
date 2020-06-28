import { CommonModule } from '@angular/common';  
import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FileUploader } from 'ng2-file-upload';

import { ComponentsModule } from '../components/components.module';

import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { BookmarkService } from '../services/bookmark.service';

import { CommentsModalComponent } from '../components/comments-modal/comments-modal.component';
import { AddEditPostModalComponent } from '../components/add-edit-post-modal/add-edit-post-modal.component';
import { DeletePostModalComponent } from '../components/delete-post-modal/delete-post-modal.component';
import { AuthService } from '../services/auth.service';
import { ConnectToServerService } from '../services/connect-to-server.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user;

  public avatar;

  collapsed = true;

  uploader: FileUploader;

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

    this.bookmarkService.loadBookmarks(this.user._id, true).subscribe((data) => {
      this.user.Bookmarks = data["bookmarks"];
      console.log(data["bookmarks"]);
      console.log(this.user);
    })

    this.uploader = new FileUploader({
      url: this.connectToServerService.serverUrl + "/uploadAvatar",
      itemAlias: this.user._id
    });
  
     
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };
  }



  constructor(
    private modalService: NgbModal,
    public router: Router,
    private postService: PostService,
    private authService: AuthService,
    private bookmarkService: BookmarkService,
    private connectToServerService: ConnectToServerService
  ){

    
  }

  async removeBookmark(post){

    let index = this.user.Bookmarks.indexOf(post);
    console.log(index);

    this.user.Bookmarks.splice(index, 1);

    this.bookmarkService.updateBookmarks({
      "_id": this.user._id, 
      "Bookmarks": this.user.Bookmarks
    }).subscribe((data) => {
      console.log(data);
    })

  }

  // async selectedFile(event) {
  //   this.avatar = event.target.files[0];
  // }

  // async onUpload(){
  //   const uploadData = new FormData();
  //   uploadData.append('myFile', this.avatar, this.avatar.name);

  //   this.authService.uploadAvatar(uploadData).subscribe((data) => {
  //     console.log(data);
  //   });
  // }


  
  async logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
