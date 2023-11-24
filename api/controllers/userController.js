export const createUser=async(req,res)=>{
    try {
        res.status(201).json("Created User")
    } catch (error) {
        
    }
}

export const getUser=async (req,res)=>{
    try {
        res.status(200).json("Salam Orxan")
    } catch (error) {
        
    }
}