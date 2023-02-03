import { Rol } from "./rol"
import { Turn } from "./turn"

export interface User {
  rols:Rol[],
  events:Event[],
  turns:Turn[],
  codigo:String,
  apellido1:String,
  apellido2:String,
  create_date:Date,
  email:String,
  login:string,
  name:String,
  password:String,
  profile_picture:String
}
