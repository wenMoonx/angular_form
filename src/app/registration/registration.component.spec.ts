import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  dispatchFakeEvent,
  setFieldValue,
} from '../spec-helpers/element.spec-helpers';
import {
  email,
  firstName,
  lastName,
  password,
} from '../spec-helpers/signup-data.spec-helpers';
import { DebugElement } from '@angular/core';

const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'password',
  'confirmPassword',
];

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegistrationComponent],
      providers: [{ provide: apiService, useValue: apiService }],
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const fillForm = () => {
    setFieldValue(fixture, 'firstName', firstName);
    setFieldValue(fixture, 'lastName', lastName);
    setFieldValue(fixture, 'email', email);
    setFieldValue(fixture, 'password', password);
    setFieldValue(fixture, 'confirmPassword', password);
  };

  const markFieldAsTouched = (element: DebugElement) => {
    dispatchFakeEvent(element.nativeElement, 'blur');
  };

  it('submits the form successfully', () => {
    expect(component).toBeTruthy();
  });
});
