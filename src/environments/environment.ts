// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoint:'http://localhost:8080/api/',
  getUserByDNI:'user/search/dni/',
  getUserByIDNAVISION:'user/search/id/',
  getUserEvents:'event/user/',
  getTeamManagerByUser:'userRelations/count/',
  getNameTeamManagerByUser:'userRelations/name/',
  updateUser:'user',
  updatePhotoProfile:'photo/update/',
  uploadPhoto:'photo/upload/'
};




