import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-looping',
  // Remove the standalone property
  templateUrl: './looping.component.html',
  styleUrls: ['./looping.component.css']
})
export class LoopingComponent implements OnInit {

  // Properties to store user input, repeat count, repeated text, display text, and width toggle
  userInput: string = '';
  repeatCount: number = 1;
  repeatedText: string = ' ';
  displayText: string = 'ဒေါင်လိုက်';
  isWidth: boolean = true;

  // Constructor with ElementRef and Renderer2 injections
  constructor(private el: ElementRef, private renderer: Renderer2) {}

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
      .then(() => alert('Text copied to clipboard!'))
      .catch(err => console.error('Unable to copy text to clipboard', err));
  } else {
    // Fallback for browsers that do not support Clipboard API
    let textArea = this.renderer.createElement('textarea');
    this.renderer.setValue(textArea, cleanedText);
    this.renderer.appendChild(this.el.nativeElement, textArea);

    textArea.select();
    document.execCommand('copy');

    this.renderer.removeChild(this.el.nativeElement, textArea);

    alert('Text copied to clipboard!');
  }
}


  // Method to copy the repeated text to clipboard
  copyText() {
    this.copyToClipboard(this.repeatedText);
  }

  // Method to toggle display and generate repeated text based on width
  toggleDisplay() {
    this.isWidth = !this.isWidth;
    this.displayText = this.isWidth ? 'အလျားလိုက်' : 'ဒေါင်လိုက်';
  
    if (this.isWidth === true) {
      const repeatedLines = Array.from({ length: this.repeatCount }, (_, index) =>
        `${index + 1}.${this.userInput}<br>`
      );
      this.repeatedText = repeatedLines.join('').trim();
    } else {
      const repeatedLines = Array.from({ length: this.repeatCount }, (_, index) =>
        `${index + 1}.${this.userInput} `
      );
      this.repeatedText = repeatedLines.join('').trim();
    }
  
    console.log(this.repeatedText);
  }
  
}
