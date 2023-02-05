import { Rol } from "./rol"
import { Turn } from "./turn"

export interface User {
  rols:Rol[],
  events:Event[],
  turns:Turn[],
  codigo:string,
  apellido1:string,
  apellido2:string,
  create_date:Date,
  email:string,
  login:string,
  name:string,
  password:string,
  profile_picture:string
}
