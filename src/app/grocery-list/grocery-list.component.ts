import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../grocery.service';
import { Observable } from 'rxjs';
import { ICurrentList, ICurrentItem, ICurrentSearchList } from '../icurrent-list';


@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: [
    '../../assets/bootstrap/css/bootstrap.min.css', 
    './grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {

  list: ICurrentSearchList[] = [];
  item: ICurrentItem;
  totalBill: number = 0;
  constructor(private groceryService: GroceryService) { }

  ngOnInit() {
    
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
   }

   /* Search show/hide results */
   showList = false;
   onClickShowList(){
     this.showList == false ? this.showList = true : undefined;
   }
   onClickHideList(){
     this.showList == true ? this.showList= false : undefined;
     for (var key in this.item)
     this.list.pop();
   }

  /* SECOND API CALL for each item detaios */
   onClickDetails(id){
    this.groceryService.getCurrnetItem(id).subscribe(data => this.item = data); 
  }  

   /* Each item show/hide details results */
   showItem = false;
   onClickShowItem(){
     this.showItem == false ? this.showItem = true : undefined;
   }
   onClickHideItem(){
     this.showItem == true ? this.showItem = false : undefined;
   }
 
   /* INPUT VALIDATION: empty string show/hide */
   InvalidInputShow : boolean = false;
   onClickSearchInvalidInputShow(){
    if(this.task =='' || this.task.trim().length == 0){
      this.InvalidInputShow == false ? this.InvalidInputShow= true : undefined;
    }
    this.task =''
   }
   onClickSearchInvalidInputHide(){  
    this.InvalidInputShow == true ? this.InvalidInputShow= false : undefined;
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
        isdone: false
      }))
      this.totalBill += item.price;
      this.totalBill.toFixed(2);
  }

  /* ADD CUSTOM ITEM func */
  newCustomItem: string; 
  newCustomPrice: string; 
  newCustomQuantity: string; 
  newCustomAisle: string;

  onClickAddCustomItem(){
    this.customId++;
    this.tasks.push(
      new Object ({
        id: this.customId,
        title: this.newCustomItem,
        price: this.newCustomPrice,
        quantity: this.newCustomQuantity,
        aisle: this.newCustomAisle,
        dateTime: (new Date()).getTime(),
        isdone: false
      }))

      if (parseInt(this.newCustomQuantity) != 0){
      this.totalBill += parseInt(this.newCustomPrice) * parseInt(this.newCustomQuantity);
      this.totalBill.toFixed(2);
      }
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
   showEdit: boolean = false;
   newPrice: string;
   newQuantity: string;
   taskToEdit;

   onClickEdit(task){
     this.taskToEdit = task;
     console.log(this.taskToEdit.price)
     this.showEdit == false ? this.showEdit = true : undefined;
   }
 
   /* UPDATE ITEM func */
   onClickUpdateEdit(){
    let tempPrice;
    if(this.taskToEdit.price != parseInt(this.newPrice) && this.validInput(this.newQuantity)){
      tempPrice =  this.taskToEdit.price;
      this.taskToEdit.price = parseInt(this.newPrice);
    }
    if (parseInt(this.newQuantity) != 0 && this.validInput(this.newQuantity)){
      
      this.totalBill = this.totalBill - tempPrice * this.taskToEdit.quantity;
      
      this.taskToEdit.quantity = parseInt(this.newQuantity);
      this.totalBill = this.totalBill  +  this.taskToEdit.price * this.taskToEdit.quantity;
    }  
     this.showEdit == true ? this.showEdit = false : undefined;
     this.totalBill.toFixed(2);
   }
   onClickUpdateHide(){
    this.showEdit == true ? this.showEdit = false : undefined;
   }

  /* Input Validation */
  validInput(input){
    if (!input) return false;
    if (input.trim().length==0) return false;
    if (isNaN(input)) return false;
    return true
  } 
    
 
   /* TASK IS DONE on click grey out */
   taskDone(task){
    for(var i = 0;i < this.tasks.length; i++){
      if(task.id == this.tasks[i].id){
        if(this.tasks[i].isdone){
          this.tasks[i].isdone = false;
        }
        else{
          this.tasks[i].isdone = true;
          console.log(this.tasks[i].strike)
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
        this.tasks.splice(i, 1)
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

  




  /* @Output() searchEvent = new EventEmitter<string>();

  search = new FormControl('', Validators.minLength(2));
  constructor(private showService: ShowService) { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(1000)).subscribe(
      (searchValue: string) => {
      if (!this.search.invalid && searchValue){
        this.searchEvent.emit(searchValue)
        console.log("true")
      }
    })
  }*/
