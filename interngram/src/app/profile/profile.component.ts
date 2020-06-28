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

  collapsed = true;

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

  }


  constructor(
    private modalService: NgbModal,
    public router: Router,
    private postService: PostService,
    private bookmarkService: BookmarkService
  ){
  }

  
  async logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
