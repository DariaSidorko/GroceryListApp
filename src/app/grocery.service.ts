import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { ICurrentList, ICurrentItem, ICurrentSearchList } from './icurrent-list';
import { ICurrentListData, ICurrentItemData, ICurrentSearchListData } from './icurrent-list-data';
import { environment } from 'src/environments/environment';
import { map, combineAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  constructor(private httpClient: HttpClient, private groceryService: GroceryService) { }


  /* 
  API used:
  https://spoonacular.com/food-api
  */




  /* Original Version*/

   getCurrnetList(item: string) : Observable<ICurrentList[]>{
    return this.httpClient.get<ICurrentListData>(
      `${environment.baseUrl}api.spoonacular.com/food/products/search?query=${item}&number=5&apiKey=${environment.apiKey}`
    ).pipe(map(data => this.transformToICurrentList(data)))
  } 


  transformToICurrentList(data: ICurrentListData) : ICurrentList[]{
    console.log(data);
    let array = new Array();
    for (let i = 0; i < data.products.length; i++){
      array.push( new Object({
        id: data.products[i].id,
        title: data.products[i].title,
        image: data.products[i]. image
      }))
    }
    console.log(array);
    return array
  } 

  

 /*  */

  getCurrnetItem(id: number) : Observable<ICurrentItem>{
    return this.httpClient.get<ICurrentItemData>(
       `${environment.baseUrl}api.spoonacular.com/food/products/${id}?apiKey=${environment.apiKey}`
     ).pipe(map(data => this.transformToICurrentItem(data)))
   }           
 
   transformToICurrentItem(data: ICurrentItemData) : ICurrentItem{ 
    //console.log(data)
    return{
        id: data.id,
        title: data.title,
        price: (data.price != 0) ?  data.price / 100 : 0,
        //badges: data.badges,
        calories: data.nutrition.calories,
        numberOfServings: data.number_of_servings,
        aisle: data.aisle,
        ingredientList: data.ingredientList,
        images: data.images[0]
      }
  }

/*   getItems(search: string) : Observable<ICurrentSearchList[]>{
    console.log(search);
    return this.getCurrnetList(search);
    }
   */






  frontPageItems(){
    let array = [183070, 97123, 177378, 415326, 181073, 917107, 222094, ]
  }

  ifGluten(par){
    console.log(par)
    for (let i = 0; i < par.badges.length; i++){ 
      if (par.badges[i] == "gluten_free") 
        return "Gluten Free"
    }

  }




}
