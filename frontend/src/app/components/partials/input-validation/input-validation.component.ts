import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
 // Defining error messages for different types of validations
const VALIDATORS_MESSAGES: any = {
	required: 'Should not be empty',
	email: 'Email is not valid',
  minlength:'Field is too short',
  notMatch:'Password and confirm does not match'
};
 // Defining the component
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css'],
})
export class InputValidationComponent implements OnInit, OnChanges {
	// Defining input properties
	@Input() control!: AbstractControl;
	@Input() showErrorsWhen: boolean = true;
	errorMessages: string[] = [];
	constructor() {}
 	// Updating the component when changes occur
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }
 	// Initializing the component
  ngOnInit(): void {
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    });
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    });
  }
 	// Checking the validation of the control and updating error messages
	checkValidation() {
		const errors = this.control.errors;
		if (!errors) {
		this.errorMessages = [];
		return;
		}
		const errorKeys = Object.keys(errors);
		this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
	}
}
