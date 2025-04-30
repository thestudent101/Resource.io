import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { BASE_URL } from 'src/app/app.provider';

@Injectable({
  providedIn: 'root'
})
export class SovernService {

  constructor(@Inject(BASE_URL) protected baseUrl: string, private http: HttpClient) {}

uploadResume(file: File): Observable<any> {


    return  from(this.extractResumeData(file)).pipe(
      switchMap(result => { 
          return this.http.post(this.baseUrl + "/profile/resume-parser", result);

      })
    )
  }

  async extractResumeData( file: File): Promise<string> {
    const postData = await this.toBase64(file).then(async (res:any) => {
      return JSON.stringify({
        DocumentAsBase64String: res,
        DocumentLastModified: new Date(file.lastModified).toISOString().substring(0, 10),
        
      })
    })
  return postData;
  }

  toBase64(file: File): Promise<any> {
      const reader = new FileReader();
      const future = new Promise((resolve, reject) => {
        reader.addEventListener('load', function () {
          const data = reader.result?.toString().replace(/^data:[^;]+;base64,/, '')          
          resolve(data);
        }, false);
        reader.addEventListener('error', function (event) {
          reject(event);
        }, false);
        reader.readAsDataURL(file);
      });
      return future;
}
}
