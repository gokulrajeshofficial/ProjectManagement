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
    const getTask = async(taskId)=>{
        try{
            return await axiosPrivate.get('/api/task/getTask/'+taskId)

        }catch(err){
            throw { err: err.response.data?.message }
        }

    }

    const taskUpdate = async(task)=>{
        try{
            return await axiosPrivate.patch('/api/task/updateTask/', {task})

        }catch(err){
            throw { err: err.response.data?.message }
        }
    }

    const getAllTaskUser = async(email)=>{
        try{
            return await axiosPrivate.get('/api/task/getUserTasks/'+email)

        }catch(err){
            throw { err: err.response.data?.message }
        }

    }
    const deleteTaskAPI = async(taskId)=>{
        try{
            return await axiosPrivate.delete('/api/task/deleteTask/'+taskId)
        }catch(err){
            throw { err: err.response.data?.message }
        }

    }

    return {taskCreation ,  getAllTasks , getTask , taskUpdate , getAllTaskUser , deleteTaskAPI}
}

export default useTaskAPI