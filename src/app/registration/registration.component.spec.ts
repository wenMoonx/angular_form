import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  dispatchFakeEvent,
  queryByCss,
  setFieldValue,
} from '../spec-helpers/element.spec-helpers';
import {
  email,
  firstName,
  lastName,
  password,
} from '../spec-helpers/signup-data.spec-helpers';
import { DebugElement } from '@angular/core';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegistrationComponent],
      providers: [{ provide: apiService, useValue: apiService }],
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = queryByCss(fixture, 'form');
    el = de.nativeElement;
  });

  const markFieldAsTouched = (element: DebugElement) => {
    dispatchFakeEvent(element.nativeElement, 'blur');
  };

  it('form invalid when empty', () => {
    setFieldValue(fixture, 'firstName', '');
    setFieldValue(fixture, 'lastName', '');
    setFieldValue(fixture, 'email', '');
    setFieldValue(fixture, 'password', '');
    setFieldValue(fixture, 'confirmPassword', '');
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('first name field validity', () => {
    const firstName = component.registerForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    setFieldValue(fixture, 'firstName', '');
    expect(firstName.hasError('required')).toBeTruthy();
  });

  it('last name field validity', () => {
    const lastName = component.registerForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    setFieldValue(fixture, 'lastName', '');
    expect(lastName.hasError('required')).toBeTruthy();
  });

  it('email validity', () => {
    const email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();

    setFieldValue(fixture, 'email', 'mykyta.com');
    expect(email.hasError('email')).toBeTruthy();

    setFieldValue(fixture, 'email', '');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('password validity', () => {
    const password = component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();

    setFieldValue(fixture, 'password', 'qwerasdfAd');
    expect(password.hasError('invalidPassword')).toBeTruthy();

    setFieldValue(fixture, 'password', 'Q!3di');
    expect(password.hasError('invalidPassword')).toBeTruthy();

    setFieldValue(fixture, 'password', 'QestionMykyta');
    expect(password.hasError('isInclude')).toBeTruthy();

    setFieldValue(fixture, 'password', 'QestionSuzuki');
    expect(password.hasError('isInclude')).toBeTruthy();

    setFieldValue(fixture, 'password', '');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('confirm password validity', () => {
    const confirmPassword = component.registerForm.controls['confirmPassword'];
    expect(confirmPassword.valid).toBeFalsy();

    setFieldValue(fixture, 'confirmPassword', '241421');
    expect(confirmPassword.hasError('match')).toBeTruthy();

    setFieldValue(fixture, 'confirmPassword', '');
    expect(confirmPassword.hasError('required')).toBeTruthy();
  });

  it('form should be valid', () => {
    setFieldValue(fixture, 'firstName', firstName);
    setFieldValue(fixture, 'lastName', lastName);
    setFieldValue(fixture, 'email', email);
    setFieldValue(fixture, 'password', password);
    setFieldValue(fixture, 'confirmPassword', password);
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should call onSubmit method', () => {
    el = queryByCss(fixture, 'button').nativeElement;
    el.click();
    expect(component.registerForm).toHaveBeenCalledTimes(1);
  });
});
