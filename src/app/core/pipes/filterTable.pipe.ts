import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe'
})

@Injectable()

export class FilterTablePipe implements PipeTransform {

    transform(value: any[], searchText: string): any[] {

        if (searchText == null || searchText == '') return value;
        if (value == null || value.length == 0) return value;

        searchText = searchText.toLocaleLowerCase().trim();

        let returnTable = [];
        let jsonKeys = Object.keys(value[0]);
        
        for (const item of value) {
            for (const jsonKey of jsonKeys) {
                if (item[jsonKey] == null) {
                    continue;
                }
                if (String(item[jsonKey]).toLocaleLowerCase().trim().includes(searchText)) {
                    returnTable.push(item)
                    break;
                }
            }
        }
        return returnTable;
    }

}
