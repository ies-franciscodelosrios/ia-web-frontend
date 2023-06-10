export const environment = {
  production: true,
  login:'http://iaweb.duckdns.org:8080/login',
  endpoint:'http://iaweb.duckdns.org:8080/api/',
  getUserByDNI:'user/search/dni/',
  getAllUsers:'user/all',
  getUserByIDNAVISION:'user/search/id',
  getUserEvents:'event/user/',
  getNameTeamManagerByUser:'userRelations/active',
  getNameTeamManagerBySocio:'userRelations/active/socio',
  getAllUsersRelations: 'userRelations/all',
  updateUser:'user',
  updatePhotoProfile:'photo/',
  uploadPhoto:'photo/upload/',
  user:'user',
  setUserActive:'user/active',
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
  getAllPollsAssignmentsByUser: 'pollAssignments/ByUser',
  getAllQuestions:'tr/all/questions/user',
  createResponse:'response',
  //Polls EndPoints
  updatePoll:'poll/update',
  getAllQuestionnaireGroups: 'group/all',
  getAllQuestionsAdmin: 'question/all',
  assignCuestionnaireToUser: 'pollAssignments/save/assignQG',
  assignQuestionToSurvey: 'tr',
  createQuestionnaire: 'group/create',
  updateQuestionnaire: 'group/update',
  updateUserRelations: 'userRelations',
  createQuestion: 'question',
  createUserRelation: 'userRelations/create',
  getAllUserRelations: 'userRelations/all',
  //UserRelations Endpoints
  getActiverRelationsByIdNavision: 'userRelations/active',
};
