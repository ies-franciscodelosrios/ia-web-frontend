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
  user:'user',
  updatePhotoProfile:'photo/',
  uploadPhoto:'photo/upload/'
};




