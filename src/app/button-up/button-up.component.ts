import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScrollToService } from '../services/scroll-to/scroll-to.service';

@Component({
  selector: 'button-up',
  templateUrl: './button-up.component.html',
  styleUrls: ['./button-up.component.scss']
})
export class ButtonUpComponent implements OnInit {

  windowScrolled: boolean;

  constructor( private scrollToService: ScrollToService ) { }

  ngOnInit(): void { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset > 100) {
      this.windowScrolled = true;
    }
    if (window.pageYOffset < 100) {
      this.windowScrolled = false;
    }
  }

  scrollTop() {
    this.scrollToService.scrollTo({ container: 'body', offset: -window.scrollY, duration: 800 });
  }

}
