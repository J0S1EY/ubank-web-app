import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(transaction: [], searchKey: string, propName: string): any[] {
    const result: any = [];
    if (!transaction || searchKey === "" || propName === "") {
      return transaction
    }
    transaction.forEach((data:any)=>{
      if(data[propName].trim().toLowerCase().includes(searchKey.toLowerCase())){
        result.push(data)
      }
    })
    return result;
  }

}
