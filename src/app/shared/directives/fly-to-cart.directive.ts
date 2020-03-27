import { Directive, ElementRef, Input } from '@angular/core';
import { MediaDto } from '../dtos/media.dto';

@Directive({
  selector: '[flyToCart]'
})
export class FlyToCartDirective {

  @Input('flyToCart') media: MediaDto;

  constructor(private elementRef: ElementRef) { }

  start() {
    console.log(this.media);
    console.log(this.elementRef.nativeElement);
  }

}
