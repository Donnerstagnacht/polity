import {Inject, Injectable} from '@angular/core';

type Pagination = {
    from: number,
    to: number,
    step: number
}

/**
 * Creates a pagination instance.
 *
 * @param {@Inject(20)} step - The step determines how many store objects are shown on page load and added if the
 * user scrolls to the bottom.
 *
 */
@Injectable({
    providedIn: 'root'
})
export class PaginationStoreService {
    private pagination: Pagination = {
        from: 0,
        to: 20,
        step: 20
    }

    constructor(@Inject(20) private step: number) {
        this.pagination.to = this.step;
        this.pagination.step = this.step;
    }

    /**
     * Increments the value of `this.pagination.to `step`, e.g. more array elements are displayed to the user
     *
     * @return {void}
     */
    public incrementTo(): void {
        this.pagination.to += this.pagination.step;
    }

    /**
     * Gets the value of the 'pagination.to' property
     *
     * @return {number} The number of array items which should be displayed to the user
     */
    public getTo(): number {
        return this.pagination.to;
    }

    /**
     * Gets the value of the 'pagination.step' property
     *
     * @return {number} The number of items which should be added once the user scrolls to the bottom
     */
    public getStep(): number {
        return this.pagination.step;
    }

}
