import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'parentTaskFilter',
    pure: false
})
export class ParentTaskPipe implements PipeTransform {
    transform(items: any[], term): any {
      
        return term 
            ? items.filter(item => item.parentTask.toLowerCase().indexOf(term.toLowerCase()) !== -1)
            : items;
    }
}
 


