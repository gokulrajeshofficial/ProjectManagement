import useAxiosPrivate from "../hooks/useAxiosPrivate"


const workspaceAPI = async()=>{

   const axiosPrivate = useAxiosPrivate()
   
   const getAllWorkspace = async()=>{
        try{
         console.log("Reached workspaceapi")
        
            return  await axiosPrivate.get('/api/workspaces')
            }catch(err){
         
               throw {err : err.response.data?.message}
            }
         }


         return{
            getAllWorkspace
         }

}

export default workspaceAPI