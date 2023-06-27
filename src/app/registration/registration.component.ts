import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registerForm: FormGroup;
  // registerForm!:any
  constructor() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/),
        this.include(),
      ]),
      confirmPassword: new FormControl('', [Validators.required, this.match()]),
    });
  }
  registration() {
    this.registerForm.markAllAsTouched();
  }

  include(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const firstName = this.registerForm?.controls['firstName']?.value;
      const lastName = this.registerForm?.controls['lastName']?.value;
      if (firstName === '' || lastName === '') return { isInclude: true };
      const isInclude =
        value.includes(this.registerForm?.controls['firstName']?.value) ||
        value.includes(this.registerForm?.controls['lastName']?.value);
      return isInclude ? { isInclude: true } : null;
    };
  }

  match(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value !== this.registerForm?.controls['password']?.value
        ? { match: true }
        : null;
    };
  }
}
