import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from '../Service/AuthService/auth.service'
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  
  const authService: AuthService = inject(AuthService);
  const router : Router = inject(Router)

  let loggedIn
  
  console.log(state)

  if(state.url != '/login'){
    authService.checkLogin().subscribe(response=>{
      console.log(response)
      if(!response.response){
        router.navigate(['/login'])
        loggedIn = false
        
      }else{
        loggedIn = true
        
      }
    })
  }
  
  

  

  return true

  
  
};
