import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { thumbnail } from '../types/thumbnail';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registerForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private loaderService: LoaderService,
    private toastrService: ToastrService
  ) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', [Validators.required]),

      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        this.pattern(),
        this.include(),
      ]),
      confirmPassword: new FormControl('', [Validators.required, this.match()]),
    });
  }
  clear() {
    this.registerForm.reset();
  }

  registration() {
    this.registerForm.markAllAsTouched();

    const firstName = this.registerForm.controls['firstName'].value;
    const lastName = this.registerForm.controls['lastName'].value;
    const email = this.registerForm.controls['email'].value;

    this.loaderService.setLoading(true);
    this.apiService.getThumbnail(lastName).subscribe({
      next: (value: thumbnail) => {
        this.apiService
          .register({
            firstName,
            lastName,
            email,
            thumbnailUrl: value.thumbnailUrl,
          })
          .subscribe({
            next: (value) => {
              console.log({ value });
              this.toastrService.show(
                'Your profile was submitted successfully',
                'Hi, ' + firstName,
                'success'
              );
              this.clear();
            },
            error: (err) => {
              console.error(err);
              this.toastrService.show(
                'The error was occurred during submitting',
                'Oops, ' + firstName,
                'error'
              );
              this.clear();
            },
            complete: () => {
              this.loaderService.setLoading(false);
              this.clear();
            },
          });
      },
      error: (err) => {
        console.error(err);
        this.loaderService.setLoading(false);
        this.toastrService.show(
          'The error was occurred during submitting',
          'Oops, ' + firstName,
          'error'
        );
        this.clear();
      },
    });
  }

  include(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const firstName = this.registerForm?.controls['firstName']?.value;
      const lastName = this.registerForm?.controls['lastName']?.value;
      if (!firstName || !lastName) return { isInclude: true };
      const isInclude =
        value.includes(this.registerForm?.controls['firstName']?.value) ||
        value.includes(this.registerForm?.controls['lastName']?.value);
      return isInclude ? { isInclude: true } : null;
    };
  }

  pattern(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(value);
      return valid ? null : { invalidPassword: true };
    };
  }

  match(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      return value !== this.registerForm?.controls['password']?.value
        ? { match: true }
        : null;
    };
  }
}
