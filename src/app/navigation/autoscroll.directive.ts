import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {StepperItem} from "./types-and-interfaces/stepper-item";

@Directive({
    selector: '[polityAutoscroll]',
    standalone: true
})
export class AutoscrollDirective {
    @Output() activeItemIndexChange: EventEmitter<number> = new EventEmitter<number>();
    @Input() menuItems: StepperItem[] = [];
    @Input() activeIndex: number = 0;
    @Input() activeItem: string = 'Name';

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('window:scroll', ['$event'])
    private onScroll(event: Event): void {
        this.updateActiveItem()
    }

    private updateActiveItem(): void {
        const containerElement = this.elementRef.nativeElement;
        const polityStepper = containerElement.parentElement;
        const polityStepperSibling = polityStepper.previousElementSibling

        const children: HTMLElement[] = Array.from(polityStepperSibling.children) as HTMLElement[];
        this.onWindowScroll(children);
    }

    private onWindowScroll(elements: HTMLElement[]): void {
        const centerScreenY: number = window.innerHeight / 2;

        // Loop through each element to check if it passes the center of the screen
        elements.forEach((element: HTMLElement): void => {
            const rect: DOMRect = element.getBoundingClientRect();
            const elementCenterY: number = rect.top + (rect.height / 2);

            // Check if the element center is passing through the center of the screen
            if (rect.top <= centerScreenY && elementCenterY >= 0 && elementCenterY <= window.innerHeight) {
                if (this.activeItem !== element.id && element.id) {
                    this.activeItem = element.id
                    this.activeIndex = this.menuItems.findIndex((item: StepperItem): boolean => item.title === element.id);
                    this.activeItemIndexChange.emit(this.activeIndex);
                }
            }
        });
    }
}
