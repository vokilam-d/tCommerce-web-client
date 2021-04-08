import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputCapitalize]'
})
export class InputCapitalizeDirective {

  constructor(
    private readonly ngControl: NgControl
  ) { }

  @HostListener('input', ['$event.target'])
  public onInput(input: HTMLInputElement): void {
    if (!input.value) { return; }

    const capitalizedInput = input.value.replace(/^./, input.value[0].toUpperCase());
    this.ngControl.control.setValue(capitalizedInput);
  }
}
