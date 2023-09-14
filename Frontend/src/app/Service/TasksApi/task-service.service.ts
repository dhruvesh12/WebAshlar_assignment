import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  baseUrl  = environment.baseUrl
  

  constructor(private http : HttpClient) { }


  postTask(data:any):Observable<any>{


    return this.http.post(this.baseUrl+'api/postTask',data)

  }


  getAllTask(Id:any):Observable<any>{


    return this.http.get(this.baseUrl+'api/getAllTask/'+Id)

  }


  EditTask(id:any,Data:any):Observable<any>{
    return this.http.put(this.baseUrl+'api/updateTask/'+id,Data)
  }

  EditTaskStatus(id:any,Data:any):Observable<any>{
    return this.http.put(this.baseUrl+'api/updateTaskStatus/'+id,Data)
  }


  deleteTask(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+'api/deleteTask/'+id)
  }

  AssignTask(id:any,Data:any):Observable<any>{
    return this.http.put(this.baseUrl+'api/AssignTask/'+id,Data)
  }
}
