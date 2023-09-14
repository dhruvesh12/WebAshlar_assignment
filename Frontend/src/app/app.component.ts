import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';



  constructor(private route : Router){}

  ngOnInit():void{


    
    console.log(sessionStorage['Credential'])
    if(sessionStorage['Credential'] == undefined){
      this.route.navigate(['/login'])
    }
  }
}
