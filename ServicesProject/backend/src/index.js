import { app } from "./app.js";
import connectDB from "./db/index.js";
import 'dotenv/config'

const port=process.env.PORT||4000
connectDB()
.then(
    ()=>{
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
)
.catch((error) => {
    console.error("Error connecting to the database:", error);
    
})