import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Switch } from './constants/switches.constant';
import { DataSharingService } from './data-sharing.service';
import { takeUntil } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    user: any;
    chatUrl: string = '';
    webSocket: WebSocket | undefined;
    header: HttpHeaders;
    rooms: any = [];
    apiconfig: any;
    constructor(
        private httpClient: HttpClient,
        private auth: AuthService,
        private data: DataSharingService,
        private storageService: StorageService) {

        this.rooms = [];
        this.fetchUserDetails();
        this.header = new HttpHeaders({ 'Content-Type': 'application/json' });

    }

    fetchUserDetails = () => {
        this.auth.userData$.pipe(takeUntil(this.data.unsubscribe)).pipe(takeUntil(this.data.unsubscribe)).subscribe((res: any) => {
            this.user = res;
        });
    }

    generateSocketURL = async () => {
        let school = await this.storageService.get('apiconfig');
        this.apiconfig = school.apiUrl;
        const chatWebSocketUrl = 'https://trialapi.practice2perfection.com/WebSocketServer.ashx';
        this.chatUrl = `${chatWebSocketUrl}?roomId=${this.rooms[0].RoomId}`;
        if (this.webSocket) {
            return Promise.resolve(this.webSocket);
        } else {
            return Promise.resolve(new WebSocket(this.chatUrl));
        }
    }

    getChatRooms = async () => {
        this.fetchUserDetails();
        let school = await this.storageService.get('apiconfig');
        this.apiconfig = school.apiUrl;
        this.httpClient.get(this.apiconfig + `/api/chat/user/${this.user.Id}/rooms`, { headers: this.header })
            .subscribe(response => {
                this.rooms = response as any;
                this.generateSocketURL().then((websocket) => {
                    websocket.onopen = () => {
                        this.sendMessageToServer('thanks');
                    };
                });
            }, error => {
                console.log(error);
            });
    }

    connectToServer = () => {
        this.getChatRooms();
    }

    sendMessageToServer = (message: string) => {
        // this.webSocket.send(message);
    }


}
