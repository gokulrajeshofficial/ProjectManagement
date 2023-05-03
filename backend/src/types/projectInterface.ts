

export interface ProjectInterface{
    _id? : string ,
    projectName: string,
    projectColor: string,
    workspace : string,
    dueDate? :  Date,
    description: string,
    projectMembers: [string] ,
    createdBy? : string


}