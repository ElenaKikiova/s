import { Injectable } from '@angular/core';
import { ConnectToServerService } from './connect-to-server.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(
    private http: HttpClient,
    private connectToServerService: ConnectToServerService
  ) { }

  public loadBookmarks(userId, loadDetails){
    return this.http.get(this.connectToServerService.serverUrl + '/bookmarks/' + userId + '/' + loadDetails)
  }
 
  public updateBookmarks(user){
    return this.http.post(this.connectToServerService.serverUrl + '/updateBookmarks',
    {user: user}
    )
  }

}
