import { TestBed } from '@angular/core/testing';

import { ChatsvrService } from './chatsvr.service';

describe('ChatsvrService', () => {
  let service: ChatsvrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsvrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
