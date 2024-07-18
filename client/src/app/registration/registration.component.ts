import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../_services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationModel:any = {};
  registerService = inject(RegisterService);
  route = inject(Router);

  registration(){
    console.log(this.registrationModel);
    return this.registerService.register(this.registrationModel).subscribe({
      next: response => {
        console.log(response);
        this.registrationModel=response;
        this.route.navigateByUrl("home");
      },
      error: error => console.log(error)
    })
  }
}
