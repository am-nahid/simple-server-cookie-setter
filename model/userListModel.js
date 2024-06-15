const userDetails = require("../schema/userSchema")

const allData = [
    {
        "id": 0,
        "name": "John",
        "email":"john@123",
        "phone": 4946541545,
        "address": "Goa"
    },
    {
        "id": 1,
        "name": "Doe",
        "email":"doe@123",
        "phone": 5946511545,
        "address": "Manali"
    },
    {
        "id": 2,
        "name": "Wick",
        "email":"wick@123",
        "phone": 5656465415,
        "address": "Bangalore"
    },
    {
        "id": 3,
        "name": "Cena",
        "email":"cena@123",
        "phone": 5565416545,
        "address": "Mumbai"
    },
    {
        "id": 4,
        "name": "Johnny",
        "email":"johnny@123",
        "phone": 6452512455,
        "address": "Gujrat"
    },
    {
        "id": 5,
        "name": "Snow",
        "email":"snow@123",
        "phone": 4946541545,
        "address": "Wizag"
    },
]

const addDetails = async (req, res) => {
    const data = req.body;
    try {
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.address) {
            console.log(data.name ,data.email,data.phone ,data.address);
            return res.status(400).send("Missing required fields");
        }

        const newStd = new userDetails({
            id: parseInt(new Date().getTime().toString()),
            name:data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
        });

        const result = await newStd.save();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

const updateDetails = async (req,res)=>{
    const data = req.body;
    try {
        const std = await userDetails.findOne({ id: data.id });
    
        if (std) {
            // Update the existing document
            await userDetails.updateOne({ id: data.id }, {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
            });
    
            // Fetch the updated document
            const updatedStd = await userDetails.findOne({ id: data.id });
            return res.send(updatedStd);
        } else {
            return res.status(409).send("Unable to find student");
        }
    } catch (err) {
        console.error(err);
        return res.status(409).send("Unable to save student");
    }
    

   
}

const fetchAllDetail = async(req,res)=>{
    try{
        const result = await userDetails.find()
        res.send(result)
    }catch(err){
        console.error('Error inserting data:', err);
    res.status(500).send({
  message: 'Internal server error',
  statusCode: 500,
});
    }
}

const fetchIndividualUser = async(req,res)=>{
    const id = req.params.id
    // console.log(id);

    try{
        const fetchStdById = await userDetails.findOne({id:id})
        if(fetchStdById){
            return res.send(fetchStdById)
        }else{
            return res.status(404).send('No Student found');

        }
    }catch(err){
        console.log(err);
        return res.status(500).send('Internal error')
    }

}

const deleteUser = async (req,res)=>{
    const id = req.params.id
    // console.log(id);

    try{
        const deleteStdById = await userDetails.deleteOne({id:id})
        if (deleteStdById.deletedCount > 0) {
            return res.send({
                message: `Student with ID ${id} has been successfully deleted.`,
                deletedCount: deleteStdById.deletedCount
            });
        } else {
            return res.status(404).send('No student found with the provided ID.');
        }
    }catch(err){
        console.log(err);
        return res.status(500).send('Internal error')
    }
}

module.exports = {addDetails, fetchAllDetail, updateDetails , fetchIndividualUser, deleteUser}