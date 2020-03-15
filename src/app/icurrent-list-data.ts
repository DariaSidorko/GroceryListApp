export interface ICurrentListData {
  products: [
    {
      id: number,
      title: string,
      image: string
    }
  ]
}

export interface ICurrentItemData {
  id: number,
  title: string,
  price: number,
  //badges: string,
  nutrition: {
    calories: number,
  },
  number_of_servings: number,
  aisle: string,
  ingredientList: string,
  images: [string]
}


export interface ICurrentTriviaData { 
      text: string
}