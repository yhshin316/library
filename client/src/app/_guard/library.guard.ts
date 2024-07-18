import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';

export const libraryGuard: CanActivateFn = (route, state) => {
  var account = inject(AccountService);
  if(account.currentUser()?.role=="Librarian"){
    return true;
  }
  return false;
};
