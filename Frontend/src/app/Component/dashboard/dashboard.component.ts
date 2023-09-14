import { Component, ElementRef ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { TaskServiceService } from 'src/app/Service/TasksApi/task-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  sessionData : any

  status :any [] = ['To Do','In Progress','Completed']

  AddForm!: FormGroup
  EditForm!: FormGroup
  AssignForm!: FormGroup
  SearchForm!: FormGroup
  EditProfileForm!: FormGroup


  sucessMgs:string = ''

  submitted : boolean = false
  EditFormSubmitted : boolean = false
  AssignedSubmitted: boolean = false
  EditProfileSubmitted: boolean = false

  AllTask:any[]=[]
  BackupAllTask : any[]=[]
  AllUser:any[]=[]
  


  Todeleteid:any

  @ViewChild('closePostTaskBtn') closePostTaskBtn !: ElementRef;
  element !: HTMLElement;

  constructor(private FormBuilder : FormBuilder, private service : TaskServiceService, private UserService: AuthService, private route : Router){}


  ngOnInit():void{

    this.getAllTask()
    this.getAllUser()

    this.AddForm = this.FormBuilder.group({
      Title:['',Validators.required],
      Description:['',Validators.required],
      DueDate:['',Validators.required],
      Status:['',Validators.required],
      AssignedBy:[''],
    })


    this.EditForm = this.FormBuilder.group({
      Title:['',Validators.required],
      Description:['',Validators.required],
      DueDate:['',Validators.required],
      Status:['',Validators.required],
      id:[''],
    })

    this.AssignForm = this.FormBuilder.group({
      id:[''],
      AssignedTo:['',Validators.required],
    })

    this.SearchForm = this.FormBuilder.group({
      Title:[''],
      DueDate:['',Validators.required],
      Status:['',Validators.required],
    })

    this.EditProfileForm = this.FormBuilder.group({
      FirstName : ['',Validators.required],
      LastName : ['',Validators.required],
      Email : ['',Validators.required],
      Password : ['',Validators.required],
      
      id:[''],
    })


    
  }

  getAssignToUser(id:any){

    let filtered = this.AllUser.filter((x:any)=>{
      return x._id == id
    })

    return filtered

  }

  getAllUser(){
    this.UserService.getAllUser().subscribe(response=>{
      
      if(response.response){
        let filtered =response.detail.filter((x:any)=>{
          return x.FirstName != this.sessionData.FirstName
        })
        this.AllUser = filtered
        
      }
    })
  }

  getAllTask(){
    this.sessionData = JSON.parse(sessionStorage['Credential'])
    this.service.getAllTask(this.sessionData._id).subscribe(data=>{

      if(data.response){
        this.AllTask = data.detail
        this.BackupAllTask = data.detail
      }

      console.log(this.AllTask)

    })
  }

  submit(){

    this.submitted = true

    if(this.AddForm.invalid){
      return
    }

    

    this.AddForm.get('AssignedBy')?.setValue(this.sessionData._id)

    this.service.postTask(this.AddForm.value).subscribe(response=>{
      
      if(response){
        this.sucessMgs = response.message

        setTimeout(()=>{
          this.getAllTask()
          this.sucessMgs = ''
          this.closePostTaskBtn.nativeElement.click()
        },1000)
      }

    })

  }



  getSingleTask(Val:any){

    // let filtered = this.AllTask.filter((x:any)=>{
    //   return x._id == Val._id
    // })
    console.log(Val)
    this.EditForm.setValue({Title:Val.Title,Description:Val.Description,DueDate:new Date(Val.DueDate).toISOString().substring(0,10),Status:Val.Status,id:Val._id})

  }


  SubmitEditForm(){

    this.EditFormSubmitted = true

    if(this.EditForm.invalid){
      return
    }


    this.service.EditTask(this.EditForm.get("id")?.value,this.EditForm.value).subscribe(response=>{

      if(response.response){

        this.sucessMgs = response.message

        setTimeout(()=>{
          this.getAllTask()
          this.sucessMgs = ''
          // this.closePostTaskBtn.nativeElement.click()
          document.getElementById("close")?.click();
        },1000)

      }
    })

  }


  changeStatus(id:any,status:any){

    
    this.service.EditTaskStatus(id,{Status:status}).subscribe(response=>{

      if(response.response){
        return alert(response.message)
      }

    })

  }

  deleteTask(){
    this.service.deleteTask(this.Todeleteid).subscribe(response=>{
      if(response.response){
        this.getAllTask()
        return alert("Sucessfully Deleted")
      }
    })
  }


  AssignTask(){
    this.AssignedSubmitted = true

    console.log(this.AssignForm.value)

    if(this.AssignForm.invalid){
      return
    }

   

    this.service.AssignTask(this.AssignForm.get('id')?.value,this.AssignForm.value).subscribe(response=>{

      if(response.response){
        this.ngOnInit()
        document.getElementById("closeAssign")?.click();
        return alert("Task Assigned Sucessful")
      }else{
        return alert("Task Assigned Failed")
      }

    })
  }


  searchFilter(){

    let date :any

    if(this.SearchForm.get('DueDate')?.value != ''){
      date = new Date(this.SearchForm.get('DueDate')?.value).toISOString()
    }
    console.log(this.SearchForm.get('DueDate')?.value)
    let filtered = this.BackupAllTask.filter((x:any)=>{
      return  x.Title == this.SearchForm.get('Title')?.value || x.Status == this.SearchForm.get('Status')?.value  || new Date(x.DueDate).toISOString() == date
    })
    
    if(filtered.length> 0){
      this.AllTask = filtered
    }

    this.SearchForm.reset()

  }

  Logout(){
    sessionStorage.removeItem('Credential')
    this.route.navigate(['/login'])
  }


  getUser(){

    this.EditProfileForm.setValue({FirstName:this.sessionData.FirstName,LastName:this.sessionData.LastName,Email:this.sessionData.Email,Password:this.sessionData.Password,id:this.sessionData._id})

  }

}
