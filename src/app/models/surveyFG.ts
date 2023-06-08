export interface modelObject {
  name:                     string;
  id:                       number;
  active:                   boolean;
  description:              string;
}

export interface Response {
  text_Value: string
  integer_Value: number
  textRelation: TextRelation
  id?: number
}

export interface TextRelation {
  question: any
  questionaryGroup: any
  relationId: number
}


export interface QuestionResponseObject{
  QuestionID: number;
  ResponseID: number;
  integer_value?: number;
  polls_assignment_id: number;
  relation_id:number;
  text: string;
  text_relation_id: number;
  text_value?: string;
  type: string;
}


