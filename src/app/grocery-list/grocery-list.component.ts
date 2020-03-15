import { Component, OnInit, Output, Input } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { ICurrentItem, ICurrentTrivia, ICurrentList } from '../icurrent-list';



@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: [
    '../../assets/bootstrap/css/bootstrap.min.css', 
    './grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {

  list: ICurrentList[] = [];
  frontList: ICurrentList[] = [];
  frontListItems = ["Organic Valley Whole Milk", "Large Brown Eggs", "Avocado oil", "Yogurt organic whole milk", "Milk chocolate swiss", "Granny apples" ];
  item: ICurrentItem;
  totalBill: number = 0;
  totalItems: number = 0;
  trivia: ICurrentTrivia;



  constructor(private groceryService: GroceryService) { }

  ngOnInit() {
    let numGen = Math.floor(Math.random() * 6)
    this.groceryService.getCurrnetTrivia().subscribe(data => this.trivia = data); 
    this.groceryService.getCurrnetList(this.frontListItems[numGen]).subscribe(data => this.frontList = data);

  }

  task: string = '';
  taskTemp: string;
  tasks = new Array;


  /* ID generator for custom items */
  customId: number = Math.floor(Math.random() * (100000000 - 1000000000)) + 1000000000;

  /* MAIN SEARCH event */
  onClickSearch(){
    if (this.task && this.task.trim().length !== 0){
        this.groceryService.getCurrnetList(this.task).subscribe(data => this.list = data);
    } 
    this.task =''
   }

   showFrontItem = false;
   onClickShowFrontItem(){
     this.showFrontItem == false ? this.showFrontItem = true : undefined;
   }
   onClickHideFrontItem(){
     this.showFrontItem == true ? this.showFrontItem = false : undefined;
   }


   /* Search show/hide results */
   showList = false;
   onClickShowList(){
     this.showList == false ? this.showList = true : undefined;
     for (var key in this.list)
     delete this.list[key];
   }
   onClickHideList(){
     this.showList == true ? this.showList= false : undefined;
   }

  /* SECOND API CALL for each item detaios */
   onClickDetails(id){
    this.groceryService.getCurrnetItem(id).subscribe(data => this.item = data); 
  }  

   /* Each item show/hide details results */
   showItem = false;
   onClickShowItem(){
     this.showItem == false ? this.showItem = true : undefined;
     delete this.item;
   }
   onClickHideItem(){
     this.showItem == true ? this.showItem = false : undefined;
   }
 
  /* ADD ITEM from search func */
  onClickAdd(item){
    this.tasks.push(
      new Object ({
        id: item.id,
        title: item.title,
        price: item.price,
        aisle: item.aisle,
        quantity: 1,
        dateTime: (new Date()).getTime(),
        isdone: false,
        showEdit: false
      }))

      this.tasks.sort((a, b) => a.aisle < b.aisle ? -1 : a.aisle > b.aisle ? 1 : 0);

      this.totalBill += item.price;
      this.totalBill.toFixed(2);
      
      this.totalItems ++;
  }

  /* ADD CUSTOM ITEM func */
  newCustomItem: string; 
  newCustomPrice: string; 
  newCustomQuantity: string; 
  newCustomAisle: string;

  onClickAddCustomItem(){
    this.customId++;
    let tempPrice: number, tempQuantity;
    this.newCustomPrice ? tempPrice = parseFloat(this.newCustomPrice) : tempPrice = 0;
    parseFloat(this.newCustomQuantity) > 0 ? tempQuantity = parseFloat(this.newCustomQuantity) : tempQuantity = 1;
    this.tasks.push(
      new Object ({
        id: this.customId,
        title: this.newCustomItem,
        price: tempPrice,
        quantity: tempQuantity,
        aisle: this.newCustomAisle,
        dateTime: (new Date()).getTime(),
        isdone: false,
        showEdit: false
      }))

      this.totalBill += tempPrice * tempQuantity;
      this.totalBill.toFixed(2);
      
      this.totalItems ++;

      this.tasks.sort((a, b) => a.aisle < b.aisle ? -1 : a.aisle > b.aisle ? 1 : 0);

      this.newCustomItem = ''; 
      this.newCustomPrice = ''; 
      this.newCustomQuantity = ''; 
      this.newCustomAisle = '';
  }

  /* Custom Item show/hide func */
  showCustomItem = false;
  onClickShowCustomItem(){
    this.showCustomItem == false ? this.showCustomItem = true : undefined;
  }
  onClickHideCustomItem(){
    this.showCustomItem == true ? this.showCustomItem = false : undefined;
  }

   /* EDIT ITEM func */
   //showEdit: boolean = false;
   newPrice: string;
   newQuantity: string;

   onClickEdit(task){
     for (let i = 0; i < this.tasks.length; i++){
      this.tasks[i].showEdit == true ? this.tasks[i].showEdit = false: undefined;
     }
     task.showEdit == false ? task.showEdit = true : undefined;
   }
 
   /* UPDATE ITEM func */
   onClickUpdateEdit(task){

      this.totalBill = this.totalBill - task.price  * task.quantity;

      task.price = parseFloat(this.newPrice);
      
      task.quantity = parseFloat(this.newQuantity);

      this.totalBill = this.totalBill  +  task.price * task.quantity;

    
    task.showEdit == true ? task.showEdit = false : undefined;
     this.totalBill.toFixed(2);
     
     this.newPrice = '';
     this.newQuantity = '';
   }

   onClickUpdateHide(task){
    task.showEdit == true ? task.showEdit = false : undefined;
   }

  /* Input Validation */
 /*  validInput(input){
    if (!input) return false;
    if (input.trim().length==0) return false;
    if (isNaN(input)) return false;
    return true
  }  */
    
 
   /* TASK IS DONE on click grey out */
   taskDone(task){
    for(var i = 0;i < this.tasks.length; i++){
      if(task.id == this.tasks[i].id){
        if(this.tasks[i].isdone){
          this.tasks[i].isdone = false;
        }
        else{
          this.tasks[i].isdone = true;
        }
        break;
      }
    }
   }

  /* DELETE ITEM func */
  onClickDelete(id){
    for(let i = 0; i < this.tasks.length; i++){
      if (this.tasks[i].id == id ) {
        this.totalBill = this.totalBill - this.tasks[i].price;
        this.totalBill.toFixed(2);
        
        this.tasks.splice(i, 1)
        this.totalItems --;
        break;
      } 
    }
  }

}

  


/* DUMMY DATA to test the UI without API calls due to limited number of calls available for free account */

/*  onClickSearch(){
    this.list = this.getCurrnetListTest();
     
   } 
 
   onClickDetails(){
     this.item = this.getCurrnetItemTest();
      
    } */
 
  /*  getCurrnetListTest(){
     let array = new Array();
     for (let i = 0; i < 5; i++){
       array.push( new Object({
         id: 123456,
         title: 'Horizon Organic Vitamin D Milk .5 Gal Carton 64 ounce In-Store Only',
         image: '../../assets/test_images/organic_milk.jpg',
         price: 3.99,
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

*/

  





