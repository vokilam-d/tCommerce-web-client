import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputCapitalize]'
})
export class InputCapitalizeDirective {

  constructor(
    private readonly control: NgControl
  ) { }

  @HostListener('input', ['$event.target'])
  public onInput(input: HTMLInputElement): void {
    const capitalizedInput = input.value.replace(/^./, input.value[0].toUpperCase());
    this.control.control.setValue(capitalizedInput);
  }
}
