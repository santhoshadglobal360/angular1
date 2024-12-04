// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [HomeComponent]
//     });
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule] // Import necessary modules
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController); // Inject the mock HTTP controller
    fixture.detectChanges(); // Trigger initial data binding
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding HTTP requests
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.userForm.value).toEqual({ name: '', phone: '' });
  });

  it('should validate form as invalid when empty', () => {
    expect(component.userForm.invalid).toBeTrue();
  });

  it('should validate name as required', () => {
    let nameControl = component.userForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.invalid).toBeTrue();
    expect(nameControl?.errors?.['required']).toBeTrue();
  });

  it('should validate phone number pattern', () => {
    let phoneControl = component.userForm.get('phone');
    phoneControl?.setValue('12345'); // Invalid phone number
    expect(phoneControl?.invalid).toBeTrue();
    expect(phoneControl?.errors?.['pattern']).toBeTrue();
  });

  it('should validate form as valid when correct data is entered', () => {
    component.userForm.setValue({ name: 'John Doe', phone: '1234567890' });
    expect(component.userForm.valid).toBeTrue();
  });

  it('should make an HTTP POST request on form submission', () => {
    component.userForm.setValue({ name: 'John Doe', phone: '1234567890' });
    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:3000/save-user'); // Expect the request to this URL
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'John Doe', phone: '1234567890' });

    // Simulate a successful response
    req.flush({ success: true });

    expect(component.submitted).toBeTrue(); // Check if the success state is set
  });
});