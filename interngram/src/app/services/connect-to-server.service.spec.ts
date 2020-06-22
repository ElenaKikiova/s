import { TestBed } from '@angular/core/testing';

import { ConnectToServerService } from './connect-to-server.service';

describe('ConnectToServerService', () => {
  let service: ConnectToServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectToServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
