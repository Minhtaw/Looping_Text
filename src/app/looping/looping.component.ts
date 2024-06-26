import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-looping',
  // Remove the standalone property
  templateUrl: './looping.component.html',
  styleUrls: ['./looping.component.css']
})
export class LoopingComponent implements OnInit {

  // Properties to store user input, repeat count, repeated text, display text, and width toggle
  userInput: string = '';
  repeatCount: any;
  repeatedText: string = '';
  displayText: string = 'အလျားလိုက်';
  displayCheck: string = 'နံပါတ်ဖြင့်ဒေါင်လိုက်'
  isWidth: boolean = true;
  isChecked: boolean = true;

  // Constructor with ElementRef and Renderer2 injections
  constructor(private el: ElementRef, private renderer: Renderer2, private snackBar: MatSnackBar) {}

  // OnInit lifecycle hook
  ngOnInit() {
    // Initialization logic can go here
  }

  // Method to reset values and reload the web page
  resetValues() {
    window.location.reload();
  }

  // Method to copy text to clipboard
  copyToClipboard(item: string): void {

    // Replace <br> with a newline character (\n)
    const cleanedText = item.replace(/<br>/g, '\n');

    // Use Clipboard API if available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cleanedText)
        .then(() => this.showSnackBar('Text copied to clipboard!'))
        .catch(err => {
          console.error('Unable to copy text to clipboard', err);
          this.showSnackBar('Error copying text to clipboard', 'error');
        });
    // Fallback for browsers that do not support Clipboard API    
    } else {
      let textArea = this.renderer.createElement('textarea');
      this.renderer.setValue(textArea, cleanedText);
      this.renderer.appendChild(this.el.nativeElement, textArea);

      textArea.select();
      document.execCommand('copy');

      this.renderer.removeChild(this.el.nativeElement, textArea);

      this.showSnackBar('copied!');
    }
  }

  showSnackBar(message: string, panelClass: string = 'success-snackbar') {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      panelClass: [panelClass],
    });
  }


  // Method to copy the repeated text to clipboard
  copyText() {
    this.copyToClipboard(this.repeatedText);
  }

  toggleDisplay() {
    this.isWidth = !this.isWidth;
    this.displayText = this.isWidth ? 'ဒေါင်လိုက်' : 'အလျားလိုက်';

    if (this.isWidth === true) {
      this.repeatedText = (this.userInput + ' ').repeat(this.repeatCount).trim();
    } else {
      this.repeatedText = (this.userInput + '<br>').repeat(this.repeatCount).trim();

    }

  }

  checkDisplay() {
    this.isChecked = !this.isChecked;
    this.displayCheck = this.isChecked ? 'နံပါတ်ဖြင့်ဒေါင်လိုက်' : 'နံပါတ်ဖြင့်အလျားလိုက်';
  
    if (this.isChecked === true) {
      const repeatedLines = Array.from({ length: this.repeatCount }, (_, index) =>
        `${index + 1}. ${this.userInput} <br>` 
      );
      this.repeatedText = repeatedLines.join('').trim();
    } else {
      const repeatedLines = Array.from({ length: this.repeatCount }, (_, index) =>
        `${index + 1}. ${this.userInput} `  
      );
      this.repeatedText = repeatedLines.join('').trim();
    }

  }

} 