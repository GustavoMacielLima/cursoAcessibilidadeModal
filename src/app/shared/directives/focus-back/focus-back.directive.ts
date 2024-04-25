import { Directive, ElementRef, OnDestroy, OnInit } from "@angular/core";

@Directive({
    selector: '[appFocusBack]',
    standalone: true
})
export class FocusBackDirective implements OnInit, OnDestroy{
    private lastFocusedElement!: Element | null;

    constructor(private elementRef: ElementRef<any>){}

    public ngOnInit(): void {
        this.lastFocusedElement = document.activeElement;
    }

    ngOnDestroy(): void {
        if(this.lastFocusedElement){
            (this.lastFocusedElement as HTMLElement).focus();
        }
    }
}