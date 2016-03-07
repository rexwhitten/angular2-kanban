import {Directive, ElementRef} from 'angular2/core';

@Directive({
    selector: '[autoFocus]'
})
export class AutoFocus {
    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        this.setFocus();
    }

    setFocus() {
        this.el.nativeElement.focus();
    }
}