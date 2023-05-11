import React from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function usePrivateAxiosAPI() {

    const axiosPrivate = useAxiosPrivate()
    const getAllProjects = async() => {
        try {
            console.log("Reached workspaceapi")

            return await axiosPrivate.get('/api/project/getAllProjects')
        } catch (err) {

            throw { err: err.response.data?.message }
        }
    }

    const projectMembers = async( projectId)=>{

        try {

            return await axiosPrivate.get('/api/project/getAllMembers/'+projectId)
        } catch (err) {

            throw { err: err.response.data?.message }
        }

    }

 

    return { getAllProjects , projectMembers }
}

export default usePrivateAxiosAPI