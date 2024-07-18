import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/Account/register';
  
  register(model:any){
    return this.http.post(this.baseUrl,model)
  }
}
