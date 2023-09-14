import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/Service/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm !: FormGroup
  submitted : boolean = false
  sucessMgs:string = ''


  constructor(private FormBuilder : FormBuilder,private Service : AuthService,private route : Router){}


  ngOnInit():void{

    console.log("Running")

    this.loginForm = this.FormBuilder.group({
      Username : ['',Validators.required],
      Password : ['',Validators.required]
    })

  }


  submit(){

    this.submitted = true

    if(this.loginForm.invalid){
      return
    }

    this.Service.login(this.loginForm.value).subscribe(response=>{

      if(response.response){
        console.log(response)
        response.detail['token'] = response.token
        
        sessionStorage.setItem("Credential",JSON.stringify(response.detail))
        this.sucessMgs = "Sucessfully Logged In"
        setTimeout(()=>{
          this.submitted = false
          this.loginForm.reset()
          this.sucessMgs = ''
          
          this.route.navigate(['/'])
        },1000)

      }else{
        this.sucessMgs = "User Not Found with Given Credential"

        setTimeout(()=>{
          this.submitted = false
          this.loginForm.reset()
          this.sucessMgs = ''
        },1000)
      }

      

    })

  }

}
