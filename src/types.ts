// Add your own custom types in here
export type Dog = {
  id?:number,
  name:string; 
  image:string;
  description:string; 
  isFavorite:boolean
}

export type ActiveTab = "favorite" | "unfavorite" | "all-dogs" | "create-dog-form";