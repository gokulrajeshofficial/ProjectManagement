import useAxiosPrivate from "../hooks/useAxiosPrivate"



const workspaceAPI =()=>{
    const axiosPrivate = useAxiosPrivate()
    
    const getAllWorkspace = async()=>{
        try{
        
            return  await axiosPrivate.get('/api/workspaces')
            }catch(err){
         
               throw Error(`${err.response.data.message}`)
            }
         }


         return{
            getAllWorkspace
         }

}

export default workspaceAPI