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
        to: 50,
        step: 50
    }

    resetPagination(): void {
        this.pagination.from = 0;
        this.pagination.to = 50;
    }

    increasePagination(): void {
        this.pagination.from += this.pagination.step;
        this.pagination.to += this.pagination.step;
    }

    getPagination(): Pagination {
        return this.pagination;
    }

}
