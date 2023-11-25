import {Injectable} from '@angular/core';

type Pagination = {
    from: number,
    to: number,
    step: number
}

@Injectable({
    providedIn: 'root'
})
export class PaginationStoreService {
    private pagination: Pagination = {
        from: 0,
        to: 20,
        step: 20
    }

    resetPagination(): void {
        this.pagination.from = 0;
        this.pagination.to = 10;
    }

    increasePagination(): void {
        this.pagination.to += this.pagination.step;
    }

    getPagination(): Pagination {
        return this.pagination;
    }

    getFrom(): number {
        return this.pagination.from;
    }

    getTo(): number {
        return this.pagination.to;
    }

    getStep(): number {
        return this.pagination.step;
    }

}
