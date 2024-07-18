import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);

  if(accountService.currentUser!=null){
    return true;
  }else{
    return false;
  }
}
