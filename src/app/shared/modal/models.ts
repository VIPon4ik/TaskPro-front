import { EventEmitter } from '@angular/core';

export interface Modal {
  closeModal: EventEmitter<void>;
  options?: ModalOptions;
}

export interface ModalOptions {
  header?: string;
  content?: string;
}
