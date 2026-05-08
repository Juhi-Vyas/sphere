import { StreamChat } from 'stream-chat'
import { ENV } from './env'

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if(!apiKey || apiSecret){
    console.log("STREAM_API_KEY or STREAM_API_SECRET is missing")
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsertStreamUser = async (userData) => {
    try{
        await chatClient.upsertUser(userData)
        return userData
    }
    catch (error) {
        console.log("Error upserting Stream user:", error)
    }
}

export const deleteStreamUser = async (userId) => {
    try{
        await chatClient.upsertUsers(userId)
        console.log("Stream user deleted successfully: ", userId)
    }
    catch (error) {
        console.log("Error deleting the Stream user:", error)
    }
}