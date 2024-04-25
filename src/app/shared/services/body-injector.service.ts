import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class BodyInjectorService{
    constructor(private appRef: ApplicationRef){}

    public stackBeforeAppRoot(componentRef: ComponentRef<any>): void {
        const domElement: HTMLElement = this.createDomElement(componentRef);
        const appRoot = document.body.querySelector('app-root');
        document.body.insertBefore(domElement, appRoot);
    }

    private createDomElement(componentRef: ComponentRef<any>): HTMLElement{
        const domElement: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];

        return domElement;
    }
}