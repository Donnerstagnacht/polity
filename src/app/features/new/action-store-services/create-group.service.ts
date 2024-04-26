import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CreateGroupService {

    constructor(private router: Router) {
    }

    public createGroup(group: any): void {
        console.log(group)
        this.router.navigate(['/group']);
    }
}
