import { Component, Input, OnInit } from '@angular/core';
import { Range } from '../../shared/dtos/filter.dto';

@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit {

  @Input() range: Range;
  @Input() selected: Range;

  constructor() { }

  ngOnInit(): void {
  }

}
