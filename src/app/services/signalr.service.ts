import { Injectable } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { take } from 'rxjs';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class SignalrService {
    private connection: any;
    private proxy: any;
    _loginUser: any;
    private _ChatRoom: any;
    apiconfig: any;

    constructor(
        private httpService: ApiService,
        private dataSharingService: DataSharingService,
        private storageService: StorageService
    ) { }

    async initializeSignalRConnection(userData?: { Id: string; FirstName: string; }) {
        this.getroom(userData);
    }

    getroom(userData) {
        if (userData!.Id) {
            this.httpService.getList('/api/chat/user/' + userData!.Id + '/rooms')
                .subscribe(async (x: any) => {
                    this._ChatRoom = x || [];

                    let school = await this.storageService.get('apiconfig');
                    this.apiconfig = school.apiUrl;
                    this.connection = $.hubConnection(this.apiconfig);
                    this.proxy = this.connection.createHubProxy('signalRChatHub');

                    this.proxy.on('deleteMessage', (serverMessage: any) => {
                        this.onMessageDeleted(serverMessage);
                    });

                    this.proxy.on('receiveMessage', (serverMessage: any) => {
                        this.onMessageReceived(serverMessage);
                    });

                    this.connection.start().done((data: any) => {
                        if (userData!.Id && this._ChatRoom) {
                            for (let item of this._ChatRoom) {
                                this.connectHub(userData!.FirstName, userData!.Id, userData!.Id, item.RoomId)
                            }
                        }
                    }).fail((error: any) => {
                        console.log('Notification Hub error -> ' + error);
                    });
                }, (error: any) => {
                    console.log(error);
                });
        }
    }
    onReceiveMessage(): any {
        this.proxy.on('receiveMessage', (serverMessage: any) => {
            // console.log("receiveMessage");
            return serverMessage;
        });
    }

    public disconnected(): void {
        this.proxy.disconnected(function () {
            // console.log("disconnected");
        });
    }

    public BroadCastMessage(entity: any): void {
        try {
            this.proxy.invoke('BroadCastMessage', entity)
                .fail((error: any) => {
                    console.log('broadcastMessage error -> ' + error);
                });
        }
        catch (error) {
            console.error('Here is the error message', error);
        }
    }

    public connectHub(id: string, userid: string, connectid: string, groub: string): void {
        this.proxy.invoke('hubconnect', id, userid, connectid, groub)
            .fail((error: any) => {
                console.log('broadcastMessage error -> ' + error);
            });
    }

    public onMessageReceived(msgFrom: any) {
        this.dataSharingService.setMessage(msgFrom);
    }

    public onMessageDeleted(msgFrom: any) {
        this.dataSharingService.setMessage(msgFrom);
    }
}

