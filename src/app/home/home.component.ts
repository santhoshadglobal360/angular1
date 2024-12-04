import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  submitted = false;
  userForm: FormGroup;  // Declare the form group

  constructor(private fb: FormBuilder, private http: HttpClient) {  // Inject HttpClient
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Send form data to the backend
      this.http.post('http://localhost:3000/save-user', this.userForm.value)
        .subscribe(response => {
          this.submitted = true;
          console.log('Data saved successfully', response);

          // Reset the form and hide the success message after 3 seconds
          setTimeout(() => {
            this.submitted = false;
            this.userForm.reset();  // Reset form values
          }, 3000);

        }, error => {
          console.error('Error:', error);
        });
    }
  }
}
