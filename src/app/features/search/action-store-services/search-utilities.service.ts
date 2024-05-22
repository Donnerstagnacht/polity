import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SearchUtilitiesService {


    public replaceSpacesWithPipe(searchTerm: string): string {
        if (searchTerm.endsWith(' ')) {
            searchTerm = searchTerm.substring(0, searchTerm.length - 1)
        }
        searchTerm = searchTerm.replace(/ /g, '|')
        return searchTerm
    }
}
