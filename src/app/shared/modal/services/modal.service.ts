import { ApplicationRef, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private appRef = inject(ApplicationRef);

  constructor () {
    console.log(this.appRef);
  }
}
