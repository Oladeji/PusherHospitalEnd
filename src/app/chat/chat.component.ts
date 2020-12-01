import { Observable } from 'rxjs';
import { Component, OnInit , Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { ChatsvrService } from '../chatsvr.service';
import { Defaultvalues } from '../Defaultvalues';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements  OnInit , OnChanges{
  userChats$: Observable<any>;
  newMsg: string;
  HospitaID
  @Input('PatientId') ChatId: string;
  oldChatId = '';
    checkbk :any
  @Output() onPatientIdChange = new EventEmitter();
  constructor( public cs: ChatsvrService ) {
    // store the patient id in the store immediately he logs in and use it  but for now maybe we should use routing
    // I should read the patient id from the store
   this.HospitaID =Defaultvalues.HospitaID;

    }


 ngOnChanges() {
 if (   this.oldChatId != this.ChatId)
   {
    
     this.userChats$ = this.cs.get(this.ChatId);
     this.oldChatId = this.ChatId;
   } 
  }
  ngOnInit() {
  this.oldChatId = this.ChatId;
  if (this.ChatId ){
     console.log('Diaplay Gett', this.ChatId);
     const source = this.cs.get(this.ChatId);
    // this.userChats$ = this.cs.joinUsers(source);
     this.userChats$ = this.cs.get(this.ChatId);
     } else
     {alert('No chat Id to use'); }
  }

  submit(chatId)  {
    console.log(chatId);
    if (!this.newMsg){
      return alert('You need to enter something');
    }
    if(this.checkbk){
      this.cs.sendMessageAll( this.newMsg, Defaultvalues.HospitaID);
    }else{
      this.cs.sendMessage(chatId, this.newMsg, Defaultvalues.HospitaID);}
    
    this.newMsg = '';
  }

  trackByCreated(i, msg){
    return msg.createdAt;
  }
}
