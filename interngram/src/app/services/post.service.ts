import { Injectable } from '@angular/core';
import { ConnectToServerService } from './connect-to-server.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private connectToServerService: ConnectToServerService
  ) { }

  public loadPosts(index){
    return this.http.get(this.connectToServerService.serverUrl + '/posts/' + index)
  }

  public loadComments(postId){
    return this.http.get(this.connectToServerService.serverUrl + '/comments/' + postId)
  }

  public addComment(data){
    return this.http.post(this.connectToServerService.serverUrl + '/addComment',
      { data } 
    )
  }

  public deleteComment(commentId){
    return this.http.post(this.connectToServerService.serverUrl + '/deleteComment',
      { commentId } 
    )
  }
  
  public savePost(data){
    return this.http.post(this.connectToServerService.serverUrl + '/savePost',
      { data } 
    )
  }

  public deletePost(postId){
    return this.http.post(this.connectToServerService.serverUrl + '/deletePost',
    {id: postId}
    )
  }

  public updateLikes(post){
    return this.http.post(this.connectToServerService.serverUrl + '/updateLikes',
    {post: post}
    )
  }

}
