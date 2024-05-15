import { ComponentRef, EnvironmentInjector, Injectable, Type, createComponent, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { ModalComponent } from '../modal.component';
import { Modal, ModalOptions } from '../models';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private injector = inject(EnvironmentInjector);
  
  open<T extends Modal>(component: Type<T>, options?: ModalOptions): ComponentRef<T> {
    const modalComponent = createComponent(ModalComponent, { environmentInjector: this.injector });
    const componentToRender = createComponent(component, { environmentInjector: this.injector });
    
    componentToRender.instance.options = options;
    componentToRender.changeDetectorRef.detectChanges();

    modalComponent.instance.component = componentToRender;
    modalComponent.hostView.detectChanges();
 
    document.body.appendChild(modalComponent.location.nativeElement);

    modalComponent.instance.closeModal
      .pipe(
        tap(() => {
          document.body.removeChild(modalComponent.location.nativeElement);
          modalComponent.destroy();
        }),
        untilDestroyed(this),
      )
      .subscribe();

    return componentToRender;
  }
}
