import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INotyMessage } from './noty.interface';

interface ValidationError {
  /**
   * Object that was validated.
   */
  target?: Object;
  /**
   * Object's property that haven't pass validation.
   */
  property: string;
  /**
   * Value that haven't pass a validation.
   */
  value?: any;
  /**
   * Constraints that failed validation with error messages.
   */
  constraints: {
    [type: string]: string;
  };
  /**
   * Contains all nested validation errors of the property.
   */
  children: ValidationError[];
}

interface IAttachOptions {
  successText: string;
  errorText?: string;
  showError?: boolean;
  showProgress?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotyService {

  private _showNoty$ = new Subject<INotyMessage>();
  showNoty$ = this._showNoty$.asObservable();
  private defaultOptions: IAttachOptions = {
    successText: null,
    errorText: null,
    showError: true,
    showProgress: false
  };

  constructor() { }

  // attachNoty<T>(options?: IAttachOptions) { // todo attach error noty in request interceptor, attach success by demand
  //   options = {
  //     ...this.defaultOptions,
  //     ...(options ? options : {})
  //   };
  //
  //   return (source: Observable<T>) =>
  //     new Observable<T>(observer => {
  //       // console.log('request start');
  //
  //       return source.subscribe(
  //         (response: T) => {
  //           if (options.successText) {
  //             this.success(options.successText);
  //           }
  //
  //           observer.next(response);
  //         },
  //         responseError => {
  //           if (options.showError) {
  //             let message = '';
  //
  //             if (options.errorText) {
  //               message += `${options.errorText}:\n`
  //             }
  //
  //             if (responseError.error && responseError.error.message) {
  //               message += this.buildErrorMessage(responseError.error);
  //             } else {
  //               message += responseError.statusText;
  //             }
  //
  //             this.error(message);
  //           }
  //
  //           observer.error(responseError);
  //         },
  //         () => observer.complete()
  //       );
  //     })
  // }

  success(message) {
    this._showNoty$.next({
      type: 'success',
      message
    });
  }

  info(message) {
    this._showNoty$.next({
      type: 'info',
      message
    });
  }

  error(message) {
    this._showNoty$.next({
      type: 'error',
      message
    });
  }

  // private buildErrorMessage(response: any): string {
  //   const errors: string[] = [];
  //
  //   if (typeof response.message === 'string') {
  //     errors.push(`${response.error}: ${response.message}`);
  //
  //   } else if (Array.isArray(response.message) && response.message.length > 0) {
  //     errors.push(response.error + ':');
  //     errors.push(...this.getErrorsFromValidationErrors(response.message));
  //   }
  //
  //   return errors.join('\n');
  // }
  //
  // private getErrorsFromValidationErrors(validationErrors: ValidationError[]): string[] {
  //   const errors: string[] = [];
  //
  //   validationErrors.forEach(validationError => {
  //
  //     if (validationError.constraints) {
  //       let errorMsg = this.buildMessageFromConstraints(validationError.constraints);
  //
  //       if (typeof validationError.value === 'string') {
  //         errorMsg += `, got: '${validationError.value}'`;
  //       }
  //
  //       errors.push(errorMsg);
  //     }
  //
  //     if (Array.isArray(validationError.children) && validationError.children.length > 0) {
  //       errors.push(...this.getErrorsFromValidationErrors(validationError.children));
  //     }
  //   });
  //
  //   return errors;
  // }
  //
  // private buildMessageFromConstraints(constraints: ValidationError['constraints']): string {
  //   const messages: string[] = [];
  //
  //   Object.keys(constraints).forEach(key => {
  //     messages.push(constraints[key]);
  //   });
  //
  //   return messages.join(', ');
  // }
}
