export interface ICurrentList {
  id: number,
  title: string,
  image: string
}


export interface ICurrentItem{
  id: number,
  title: string,
  price: number,
  //badges: string,
  calories: number,
  numberOfServings: number,
  aisle: string,
  ingredientList: string,
  images: string
}


export interface ICurrentTrivia {
  text: string
}