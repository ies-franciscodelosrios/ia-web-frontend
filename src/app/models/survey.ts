export interface PollAssignment {
    questionaryGroup: QuestionaryGroup;
    poll:             Poll;
    name:             string;
    id:               number;
    active:           boolean;
    personCategory:   number;
    idNavision:       string;
    idNavision2:      string;
    email:            string;
}

export interface Poll {
    id?:           number;
    lastModified: string;
    active:       boolean;
    signed:       boolean;
    completed:    boolean;
    onLoad:       boolean;
    create_Date:  string;
}

export interface QuestionaryGroup {
    name:                     string;
    id:                       number;
    active:                   boolean;
    description:              string;
    personCategory:           number;
    endDate:                  null;
    startDate:                null;
}
