import { ComponentRef, Injectable, Injector, ViewContainerRef } from "@angular/core";
import { ModalConfig } from "../interfaces/modal-config.interface";
import { ModalComponent } from "../modal.component";
import { BodyInjectorService } from "../../../services/body-injector.service";
import { ModalRef } from "../models/modal-ref.model";

@Injectable()
export class ModalService {
    private componentRef!: ComponentRef<ModalComponent>;
    constructor(
        private injector: Injector,
        private componentContainerRef: ViewContainerRef,
        private bodyInjectorService: BodyInjectorService
    ){}

    public open(config: ModalConfig): ModalRef{
        this.componentRef = this.createComponentRef();
        this.componentRef.instance.config = config;
        console.log(this.componentRef.instance);
        console.log('Open called');
        this.bodyInjectorService.stackBeforeAppRoot(this.componentRef);
        const modalRef: ModalRef = new ModalRef(this.componentRef);
        this.componentRef.instance.modalRef = modalRef;
        return modalRef;
    }

    private createComponentRef(): ComponentRef<ModalComponent> {
        return this.componentContainerRef.createComponent(ModalComponent, {
            injector: this.injector
        });;
    }
}
