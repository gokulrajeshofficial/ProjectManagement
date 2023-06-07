export interface taskInterface{
    _id? : string,
    projectId? : string
    title?: string,
    description?: string,
    priority?: string,
    dueDate?: Date,
    createdDate? : Date ,
    createdBy? : string ,
    assginees? : [string] ,
    attachments? : [
        {
         location : string , name : string
        }
    ]
    status : Boolean
}