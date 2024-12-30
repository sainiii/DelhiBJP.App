import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { APPConstants, AuthConstants } from './constants/auth.constant';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {

    apiData$ = new BehaviorSubject<any>(null);
    userData$ = new BehaviorSubject<any>(null);
    parentChildList = new BehaviorSubject<any>([]);
    curriculumList$ = new BehaviorSubject<any>([]);
    curriculumDetails$ = new BehaviorSubject<any>([]);
    academicYear$ = new BehaviorSubject<any[]>([]);

    public message: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    notificationsCount: BehaviorSubject<number> = new BehaviorSubject<any>(0);

    public FilterDataSharing: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    unsubscribe = new Subject<void>();
    updateNeeded = new BehaviorSubject<boolean>(false);
    selectedChild = new BehaviorSubject<any>(null);
    selectedStudent = new BehaviorSubject<any>(null);

    userModules = new BehaviorSubject<any[]>([]);
    schoolSettings = new BehaviorSubject<any>(null);
    feeSettings = new BehaviorSubject<any>(null);

    teacherSubjects = new BehaviorSubject<any[]>([]);

    constructor(private storageService: StorageService) { }

    setAcademicYear(FilterData: any) {
        this.academicYear$.next(FilterData);
    }
    getAcademicYear() {
        return this.academicYear$.asObservable();
    }

    setFilterdata(FilterData: any) {
        this.FilterDataSharing.next(FilterData);
    }
    getFilterdata() {
        return this.FilterDataSharing.asObservable();
    }

    setMessage(message: any) {
        this.message.next(message);
    }
    getMessage() {
        return this.message.asObservable();
    }

    // for notification count
    setNotificationsCount(count: number) {
        this.notificationsCount.next(count);
    }
    getNotificationsCount() {
        return this.notificationsCount.asObservable();
    }

    SetApiData() {
        this.storageService.get(APPConstants.AUTHAPP).then(res => {
            this.apiData$.next(res);
        });
    }

    getApiData() {
        return this.apiData$.asObservable();
    }

    SetUserData() {
        this.storageService.get(AuthConstants.AUTH).then(res => {
            this.userData$.next(res);
        });
    }

    getUserData() {
        return this.userData$.asObservable();
    }

    setChildList(childList: any) {
        this.parentChildList.next(childList);
    }
    getChildList() {
        return this.parentChildList.asObservable();
    }

    setCurriculumDetails(data: any) {
        this.curriculumDetails$.next(data);
    }

    getCurriculumDetails() {
        return this.curriculumDetails$.asObservable();
    }

    setCurriculumList(data: any) {
        this.curriculumList$.next(data);
    }

    getCurriculumList() {
        return this.curriculumList$.asObservable();
    }

    setUpdateNeeded(status: any) {
        this.updateNeeded.next(status);
    }

    getUpdateNeeded() {
        return this.updateNeeded.asObservable();
    }

    setSelectedChild(status: any) {
        this.selectedChild.next(status);
    }

    getSelectedChild() {
        return this.selectedChild.asObservable();
    }

    setSelectedStudent(status: any) {
        this.selectedStudent.next(status);
    }

    getSelectedStudent() {
        return this.selectedStudent.asObservable();
    }

    setUserModules(modules: any) {
        this.userModules.next(modules);
    }

    getUserModules() {
        return this.userModules.asObservable();
    }

    setSchoolSettings(settings : any) {
        this.schoolSettings.next(settings);
    }

    getSchoolSettings() {
        return this.schoolSettings.asObservable();
    }

    setFeeSettings(settings : any) {
        this.feeSettings.next(settings);
    }

    getFeeSettings() {
        return this.feeSettings.asObservable();
    }

    setTeacherSubjects(subjects: any) {
        this.teacherSubjects.next(subjects);
    }

    getTeacherSubjects() {
        return this.teacherSubjects.asObservable();
    }

    clear() {
        //     this.apiData$.next(null);
        //     this.userData$.next(null);
        this.parentChildList.next([]);
        this.curriculumList$.next([]);
        this.curriculumDetails$.next([]);
        this.academicYear$.next([]);
        // this.message.next(null);
        this.notificationsCount.next(0);
        // this.FilterDataSharing.next(null);

        this.unsubscribe.next();
    }
}
