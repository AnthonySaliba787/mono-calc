import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  displayValue: string = '';
  calculated: boolean = false;

  updateDisplay(value: string): void {
    const operators = ['+', '-', '*', '/'];
    const lastChar = this.displayValue.slice(-1);
    const hasDecimal = this.displayValue.includes('.');

    // Reset the display if a calculation has been made and a number is pressed
    if (this.calculated) {
      if (!operators.includes(value)) {
        this.displayValue = value; // Replace the display with the new number
      } else {
        this.displayValue += value; // If an operator is pressed, continue the operation
      }
      this.calculated = false; // Reset the calculated flag
    } else {
      // Prevent adding an operator at the start or repeating operators
      if (
        !(
          operators.includes(value) &&
          (operators.includes(lastChar) || this.displayValue === '')
        )
      ) {
        // Handle entering a single decimal point
        if (value === '.') {
          // Allow a decimal point after an operator or if no decimal exists
          if (operators.includes(lastChar)) {
            this.displayValue += '0.'; // Add '0.' if a decimal point follows an operator
          } else if (!hasDecimal) {
            this.displayValue += value; // Add decimal if none already exists
          }
          return; // Exit early after handling decimal
        }

        // Prevent entering '0' immediately after an operator
        if (
          operators.includes(lastChar) &&
          value === '0' &&
          this.displayValue !== ''
        ) {
          return; // Do nothing if a leading '0' is attempted after an operator
        }

        // Handle leading '0' for initial number
        if (
          this.displayValue === '0' &&
          value !== '.' &&
          !operators.includes(value)
        ) {
          this.displayValue = value; // Replace the '0' with the new number
        } else {
          this.displayValue += value; // Continue appending the value
        }
      }
    }
  }

  calculate(): void {
    const operators = ['+', '-', '*', '/'];
    const lastChar = this.displayValue.slice(-1);

    // Prevent calculation if the expression ends with an operator or is empty
    if (operators.includes(lastChar) || this.displayValue === '') {
      return; // Do nothing if the expression is incomplete
    }

    try {
      this.displayValue = eval(this.displayValue).toString();
      this.calculated = true;
    } catch (error) {
      this.displayValue = 'Error';
      console.error(error);
      this.calculated = true;
    }
  }
}
