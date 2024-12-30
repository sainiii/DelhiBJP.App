import { Injectable } from '@angular/core';

import { Preferences } from '@capacitor/preferences';
@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() { }

    // Store the value
    async store(storageKey: string, value: any) {
        const encryptedValue = btoa(escape(JSON.stringify(value)));
        await Preferences.set({
            key: storageKey,
            value: encryptedValue
        });
    }

    // Get the value
    async get(storageKey: string) {
        const ret = await Preferences.get({ key: storageKey });
        if (ret.value) {
            return JSON.parse(unescape(atob(ret.value)));
        } else {
            return false;
        }
    }

    // JSON "get" example
    async getObject() {
        const ret = await Preferences.get({ key: 'user' });
        const user = JSON.parse(ret.value || '');
    }

    async setItem() {
        await Preferences.set({
            key: 'name',
            value: 'Max'
        });
    }

    async keys() {
        const keys = await Preferences.keys();
    }

    async clear() {
        await Preferences.clear();
    }

    async Removekey(storageKey: string) {
        await Preferences.remove({ key: storageKey });
    }
}