// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoint:'http://localhost:8080/api/',
  getUserByDNI:'user/search/dni/',
  getAllUsers:'user/all',
  getUserByIDNAVISION:'user/search/id',
  getUserEvents:'event/user/',
  getNameTeamManagerByUser:'userRelations/active',
  updateUser:'user',
  updatePhotoProfile:'photo/',
  uploadPhoto:'photo/upload/',
  user:'user',
  //Turns Endpoints
  getAllTurns:'getAllTurns',
  getTurnById: 'turn/getTurn',
  deleteTurn: 'turn/delete',
  saveTurn: 'turn/save/assignUser',
  updateTurn: 'turn/update',
  getUserTurns: 'turn/getUserTurns',
  //Rols Endpoints
  assignRolToUser: 'rol/assignRolToUser/',
  denyRolToUser: 'rol/denyRolToUser/',
  getUsersOfOneRol: 'rol/getUsersOfOneRol',
  UserIsAdmin: 'rol/UserIsAdmin',
  UserIsSocio: 'rol/UserIsSocio',
  UserIsEvaluador: 'rol/UserIsEvaluador',
  //Endpoints Events(Calendar)
  getEventId:'event/',
  getAllEvents:'event/all',
  getEventUser:'event/user/',
  putEventUpdate:'event/update/',
  postEventCreate:'event/save/assignUser/',
  delEventId:'event/delete/',
  delAllEventUser:'event/delete/user',
  delEventUser:'event/delete/user/',
  //Surveys Endpoints
  getAllPollsAssignmentsByUser: 'pollAssignments/ByUser'
};




