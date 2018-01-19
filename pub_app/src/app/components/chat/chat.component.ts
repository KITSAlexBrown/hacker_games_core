import { User } from "./../../providers/user.model";
import { UsersService } from "./../../providers/users.service";
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chatkit from "pusher-chatkit-client";
import { LoginService } from "../../providers/login.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public messages: any[];
  public room: any;
  public userMessage: string = "";
  currentUser: any;
  public users = [];
  public otherUsers = [];
  user: User;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private usersService: UsersService, private userService: LoginService) {

    this.user = this.userService.user;

    const tokenProvider = new Chatkit.TokenProvider({
      url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d0f075ad-2489-4ce5-b94f-9bc670b84eb4/token?instance_locator=v1:us1:d0f075ad-2489-4ce5-b94f-9bc670b84eb4"
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:d0f075ad-2489-4ce5-b94f-9bc670b84eb4",
      userId: this.user.email,
      tokenProvider: tokenProvider
    });
    chatManager.connect({
      onSuccess: (currentUser) => {
        console.log("Successful connection", currentUser);
        this.currentUser = currentUser;
        this.room = currentUser.rooms[0];
        this.loadUsers(this.room);
       this.loadMessages();
       this.subscribeToRoom(this.room);
      },
      onError: (error) => {
        console.log("Error on connection");
      }
    });


  }

  subscribeToRoom(myRoom) {
    this.currentUser.subscribeToRoom(
      myRoom,
      {
        newMessage: (message) => {
          if (message.sender.id !== this.user.email) {
            console.log(`Received new message ${message.text}`);
            let msg = this.buildMessage(message);
            this.messages.push(msg);
            this.scrollToBottom();
          }
        }
      }
    );
  }

  loadUsers(room: any) {
    this.usersService.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
      this.otherUsers = users.filter(user => user.email !== this.user.email);
      console.log(room);
      if (room["userIds"]) {
        room["userIds"].forEach(element => {
          this.otherUsers.map(user => {
              if (element === user.email) {
                user["inChat"] = true;
              }
              return user;
          });
        });
      }
    });
  }

  addToChat(id) {
    console.log(id);
    this.currentUser.addUser(
      id,
      this.room.id,
      () => {
        console.log('Added keith to room 123');
      },
      (error) => {
        console.log(`Error adding keith to room 123: ${error}`);
      }
    );
  }

  sendMessage() {
    console.log(this.userMessage);
    if (this.userMessage.trim() === "") {
      return;
    }
    this.currentUser.sendMessage(
      {
        text: this.userMessage,
        roomId: this.room.id
      },
      (messageId) => {
        console.log(`Added message to ${this.room.name}`);
        let msg = {
          text: this.userMessage,
          user: this.user
        };
        this.messages.push(msg);
        this.scrollToBottom();
        this.userMessage = "";
      },
      (error) => {
        console.log(`Error adding message to ${this.room.name}: ${error}`);
      }
    );

  }

  ngOnInit() {

  }

   loadMessages() {
    this.currentUser.fetchMessagesFromRoom(
      this.room,
      {
        initialId: 0,
      },
      (messages) => {
        // do something with the messages
        console.log(messages, this.users);
        this.messages = messages.map(msg => {
          return this.buildMessage(msg);
        });

        this.scrollToBottom();

      },
      (error) => {
        console.log(`Error fetching messages from ${this.room.name}: ${error}`)
      }
    );
  }
  buildMessage(chatMessage) {
    let user = this.users.filter(user => user.email === chatMessage.sender.id)[0];
    return {
      user: user,
      text: chatMessage.text
    }
  }
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }, 100);
    } catch(err) { }
}
  // showRooms() {
  //   this.currentUser.getAllRooms(
  //     (rooms) => {
  //       // do something with the joinableRooms
  //       console.log(rooms);

  //     },
  //     (error) => {
  //       console.log(`Error getting joinable rooms: ${error}`);
  //     }
  //   );
  // }

  // joinRoom(roomId) {
  //   this.currentUser.joinRoom(
  //     roomId,
  //     (room) => {
  //       console.log(`Joined room with ID: ${roomId}`);
  //     },
  //     (error) => {
  //       console.log(`Error joining room ${roomId}: ${error}`);
  //     }
  //   );
  // }

}
