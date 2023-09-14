import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/AuthService/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  RegisterForm !: FormGroup
  submitted : boolean = false

  sucessMgs : string = ''


  constructor(private FormBuilder : FormBuilder, private service : AuthService){}


  ngOnInit():void{

    console.log("Running")

    this.RegisterForm = this.FormBuilder.group({
      FirstName : ['',Validators.required],
      Lastname : ['',Validators.required],
      Email : ['',Validators.required],
      Password : ['',Validators.required],
      ConfirmPass : ['',Validators.required],
    })

  }


  submit(){

    this.submitted = true

    if(this.RegisterForm.invalid || this.RegisterForm.get('Password')?.value != this.RegisterForm.get('ConfirmPass')?.value){
      return
    }


    this.service.RegisterUser(this.RegisterForm.value).subscribe(response=>{

      if(response.response){
        this.sucessMgs = response.message
        
        setTimeout(()=>{
          this.submitted = false
          this.RegisterForm.reset()
          this.sucessMgs = ''
        },1000)
      }else{
        this.sucessMgs = response.message
        
        setTimeout(()=>{
          // this.submitted = false
          // this.RegisterForm.reset()
          this.sucessMgs = ''
        },1000)
      }

    })

  }

}
