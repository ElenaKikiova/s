import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectToServerService } from './connect-to-server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient,
    public connectToServerService: ConnectToServerService
    ) { }

  
  public register(data){

    return this.http.post(this.connectToServerService.serverUrl + '/register',
      { data } 
    )
  }
}
