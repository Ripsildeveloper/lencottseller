import { Directive , ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appUpperCase]'
})
export class UpperCaseDirective {

  constructor(public ref: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event) {
    console.log(event.target.value);
    this.ref.nativeElement.value = event.target.value.toUpperCase();
  }

}
