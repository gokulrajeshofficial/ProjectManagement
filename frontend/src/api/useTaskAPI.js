import useAxiosPrivate from "../hooks/useAxiosPrivate"

const useTaskAPI = ()=>{
    const axiosPrivate = useAxiosPrivate()
    const taskCreation =  async(task)=>{
        try {

            return await axiosPrivate.post('/api/task/createTask' , {task : task})
        } catch (err) {

            throw { err: err.response.data?.message }
        }


    }

    const getAllTasks = async(projectId)=>{
        try{
            return await axiosPrivate.get('/api/task/getAllTasks/'+projectId)

        }catch(err){
            throw { err: err.response.data?.message }
        }
    }

    return {taskCreation ,  getAllTasks}
}

export default useTaskAPI