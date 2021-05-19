import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventScrollService {

  isEnabled$ = new Subject<boolean>();

  constructor() { }
}
