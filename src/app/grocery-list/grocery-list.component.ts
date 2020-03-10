import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { Observable } from 'rxjs';
import { ICurrentList, ICurrentItem, ICurrentSearchList } from '../icurrent-list';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: [
    '../../assets/css/bootstrap.min.css', 
    '../../assets/fontawesome-free-5.12.1-web/css/all.css',
    './grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {

  list: ICurrentList[];
  item: ICurrentItem;
  items = new Array();
  itemTemp: ICurrentItem;
  //search = new FormControl();
  //[formControl]="search"/
  itemId : number;
  constructor(private groceryService: GroceryService) { }

  ngOnInit() {
    
  }

  task: string = '';
  tasks = new Array;

  
  onClickSearch(){
    console.log("Search task: " + this.task);
    this.groceryService.getCurrnetList(this.task).subscribe(data => this.list = data);

   }


  /* for(let i=0; i<this.list.length; i++ ){
      this.groceryService.getCurrnetItem(this.list.id[i]).subscribe(data => this.item = data); 
      this.items.push(this.item);
    } */


  onClickDetails(id){
    this.itemId = id;
    this.groceryService.getCurrnetItem(this.itemId).subscribe(data => this.item = data); 

  } 


  onClickAdd(item){
    this.tasks.push(
      new Object ({
        id: item.id,
        title: item.title,
        price: item.price,
        //badges: data.badges,
        calories: item.calories,
        numberOfServings: item.number_of_servings,
        aisle: item.aisle,
        ingredientList: item.ingredientList,
        images: item.images
      }))
  }

  onClickDelete(id){
    for(let i = 0; i < this.tasks.length; i++){
      if (this.tasks[i].id == id ) {
        this.tasks.splice(i, 1)
        break;
      } 
    }
  }


  showList = false;
  onClickShowList(){
    this.showList == false ? this.showList = true : undefined;
  }
  onClickHideList(){
    this.showList == true ? this.showList= false : undefined;
    for (var key in this.items)
    delete this.items[key];
  }


  showItem = false;
  onClickShowItem(){
    this.showItem == false ? this.showItem = true : undefined;
  }
  onClickHideItem(){
    this.showItem == true ? this.showItem = false : undefined;
    for (var key in this.item)
    delete this.item[key];
  }




/* Fake Data to test the  UI without API calls */

  /* onClickSearch(){
    this.lists = this.getCurrnetListTest();
     
   } 
 
   onClickDetails(){
     this.item = this.getCurrnetItemTest();
      
    }
 */
   getCurrnetListTest(){
     let array = new Array();
     for (let i = 0; i < 5; i++){
       array.push( new Object({
         id: 123456,
         title: 'Horizon Organic Vitamin D Milk .5 Gal Carton 64 ounce In-Store Only',
         image: '../../assets/test_images/organic_milk.jpg',
         price: 399,
        calories: 90,
        numberOfServings: 5,
        aisle: 'dairy',
        ingredientList: 'An ingredient is a substance that forms part of a mixture (in a general sense). For example, in cooking, recipes specify which ingredients are used to prepare a specific dish. ... Thus all ingredients are constituents, but not all constituents are ingredients.',
        images: '../../assets/test_images/organic_milk.jpg'
       }))
     }
     return array
   }

   getCurrnetItemTest(){
    return {
        id: 123456,
        title: 'Horizon Organic Vitamin D Milk .5 Gal Carton 64 ounce In-Store Only',
        image: '../../assets/test_images/organic_milk.jpg',
        price: 399,
       calories: 90,
       numberOfServings: 5,
       aisle: 'dairy',
       ingredientList: 'An ingredient is a substance that forms part of a mixture (in a general sense). For example, in cooking, recipes specify which ingredients are used to prepare a specific dish. ... Thus all ingredients are constituents, but not all constituents are ingredients.',
       images: '../../assets/test_images/organic_milk.jpg'
      }
    }



  }





