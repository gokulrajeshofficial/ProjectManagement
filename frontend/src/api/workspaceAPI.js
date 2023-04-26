import useAxiosPrivate from "../hooks/useAxiosPrivate"


function workspaceAPI(){
   const axiosPrivate = useAxiosPrivate()
   const getAllWorkspace = async()=>{
        try{
         console.log("Reached workspaceapi")
        
            return  await axiosPrivate.get('/api/workspaces')
            }catch(err){
         
               throw {err : err.response.data?.message}
            }
         }
   const createWorkspace = async(obj)=>{
      try{
         console.log("Reached workspace")
         return await axiosPrivate.post('api/createWorkspace',obj)
      }catch(error)
      {
         console.log(error , "Caught Error")
      }
   }


         return{
            getAllWorkspace,createWorkspace
            
         }

}

export default workspaceAPI