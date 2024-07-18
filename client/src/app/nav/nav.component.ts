import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  model:any = {};
  accountService = inject(AccountService);

  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.model=response;
      },
      error: error => console.log(error)
    })
  }

  logout(){
    this.accountService.logout();
    this.model={};
  }

}
