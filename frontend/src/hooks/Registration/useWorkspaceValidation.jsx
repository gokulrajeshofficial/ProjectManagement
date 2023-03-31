import React, { useState } from 'react'

const useWorkspaceValidation = (workspaceCreation)=>{
  const [workspaceErrors, setWorkspaceErrors] = useState({
    workspaceName : "",
})
const workspaceCreationValidation = ()=>{
  if(!workspaceCreation.workspaceName.trim() )
  {
    workspaceErrors.workspaceName = "Please create a workspace Name"
  }else{
    workspaceErrors.workspaceName = ""
  }
}
const workspaceHandleNext = ()=>{
  console.log(workspaceErrors)
  workspaceCreationValidation()
  if(!workspaceErrors.workspaceName.trim())
  {
    return true
  }else{
    return false
  }
}
 return {  workspaceErrors , workspaceHandleNext}
}
export default useWorkspaceValidation