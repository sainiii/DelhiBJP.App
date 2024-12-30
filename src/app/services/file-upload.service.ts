import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    apiconfig: any;
    headerOptions: any;

    constructor(private http: HttpClient,
        private storageService: StorageService
    ) {
        this.getSchool();
    }

    async getSchool() {
        this.apiconfig = await this.storageService.get('apiconfig');
    }

    private setAuthHeader(): any {
        const token = localStorage.getItem('token');
        if (token != null) {
            const headers = new HttpHeaders({
                'Authorization': token.toString()
            });
            return headers;
        }
    }

    options: any = {
        reportProgress: true,
        observe: 'events'
    };

    upload(formData) {
        return this.http.post<any>(environment.apiUrl + '/api/QuestionPattern/PatternFile', formData, {
            // reportProgress: true,
            // observe: 'events',
            headers: this.headerOptions,
        }).pipe(catchError(error => {
            return error;
        }));
    }

    // addQuizFile(ScheduleId: string, QuizId: string, StudentId: string, FileNo: number, profileImage: File) {
    //   this.headerOptions = this.setHeaders();
    //   var formData: any = new FormData();
    //   formData.append("ScheduleId", ScheduleId);
    //   formData.append("QuizId", QuizId);
    //   formData.append("StudentId", StudentId);
    //   formData.append("FileNo", FileNo);
    //   formData.append("avatar", profileImage);

    //   return this.http.post<any>(environment.apiUrl + '/api/Quiz/updateStudentQuizImagesDirect/', formData, {
    //     reportProgress: true,
    //     observe: 'events',
    //     headers: this.headerOptions
    //   });
    // }

    teacherAnswerFileUpload(formData1) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/Quiz/CreateSolutionbyTeachersQuizImages', formData1, this.options);
    }

    teacherQuizFileUpload(formData1) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/Quiz/UploadTeacheterDoc', formData1, this.options);
    }
    schoolLogoSign(formData1) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/School/schoolLogoSign', formData1);
    }
    teacherHomeworkFileUpload(formData2) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/Notebook/UploadTeacheterNotebookDoc', formData2, this.options);
    }

    teacherConceptFileUpload(formData3) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/ConceptMapping/UploadConceptFile', formData3, this.options);
    }

    studentQuizSolution(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/Quiz/updateStudentQuizImagesDirectAzure', formData, this.options);
    }

    studentReviewPDF(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/MapTeacherStudentQuiz/UpdateStudentQuizByTeachers', formData, this.options);
    }

    addQuestionPapers(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/Quiz/addQuestionPapers', formData, this.options);
    }

    whiteboardUpload(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/Whiteboard', formData, this.options);
    }

    whiteboardSaveSlide(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/WhiteBoard/SaveSlides', formData, this.options);
    }

    studentUploadHomework(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/Notebook/UploadNoterBookFile', formData, this.options);
    }

    studentHomeworkReviewPDF(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/Notebook/updateStudentNotebookReviewImages', formData, this.options);
    }

    AddUpdateFuelEntry(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/FuelEntry/saveupdate_FuelEntry', formData, this.options);
    }

    UserDocumentUpload(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/User/userDocument', formData, this.options);
    }

    AddEditStudentNotes(formData) {
        this.options.headers = this.setAuthHeader();
        return this.http.post<any>(this.apiconfig.apiUrl + '/api/StudentNotes/AddEditStudentNotes', formData, this.options);
    }
    // addQuizFileAzure(ScheduleId: string, QuizId: string, StudentId: string, FileNo: number, extension: string) {
    //   this.headerOptions = this.setHeaders();
    //   var formData: any = new FormData();
    //   formData.append("ScheduleId", ScheduleId);
    //   formData.append("QuizId", QuizId);
    //   formData.append("StudentId", StudentId);
    //   formData.append("FileNo", FileNo);
    //   formData.append("ext", "." + extension);

    //   return this.http.post<any>(environment.apiUrl + '/api/Quiz/updateStudentQuizImagesDirectAzure/', formData, {
    //     headers: this.headerOptions
    //   });
    // }

    private getEventMessage(event: HttpEvent<any>, formData) {
        switch (event.type) {
            case HttpEventType.UploadProgress:
                return this.fileUploadProgress(event);
                break;
            case HttpEventType.Response:
                return this.apiResponse(event);
                break;
            default:
                return `File surprising upload event: ${event.type}.`;
        }
    }

    private fileUploadProgress(event) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        return { status: 'progress', message: percentDone };
    }

    private apiResponse(event) {
        return event.body;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(error);
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened. Please try again later.');
    }

}
