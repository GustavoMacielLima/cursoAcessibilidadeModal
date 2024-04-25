import { AfterViewInit, Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[appFocusTrap]',
    standalone: true
})
export class FocusTrapDiractive implements AfterViewInit {
    private firstFocusableElement!: HTMLElement;
    private lastFocusableElement!: HTMLElement;
    
    constructor(private elementRef: ElementRef<any>){}

    ngAfterViewInit(): void {
        const focusableElement: Array<HTMLElement> = this.elementRef
            .nativeElement
            .querySelectorAll(`
                [tabindex]:not([tabindex="-1"]),
                a[href]:not([disabled]),
                button:not([disabled]),
                textarea:not([disabled]),
                input:not([disabled]),
                select:not([disabled])`
            ) as Array<HTMLElement>;
        this.firstFocusableElement = focusableElement[0];
        this.lastFocusableElement = focusableElement[focusableElement.length - 1];
        this.firstFocusableElement.focus();
    }

    @HostListener('keydown', ['$event'])
    public manageTab(event: KeyboardEvent): void {
        if (event.key !== 'Tab'){
            return;
        }

        if (event.shiftKey && document.activeElement === this.firstFocusableElement){
            this.lastFocusableElement.focus();
            event.preventDefault()
        } else if (!event.shiftKey && document.activeElement === this.lastFocusableElement){
            this.firstFocusableElement.focus();
            event.preventDefault()
        }
    }
}