import cors from 'cors'
import express from 'express'
import SignUpRoute from './routes/SignUp.router.js'
import adminRoutes from './routes/admin.route.js'
import dispalyAssignWorker from "./routes/displayAssignWoker.route.js"
import getdata from "./routes/getdata.route.js"
import LoginRoute from './routes/login.route.js'
import WorkerAvailability from './routes/workerAvailability.route.js'
import workerRoutesLogin from './routes/workerlogin.route.js'
import workerRoutes from './routes/workerregister.route.js'
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1/signup', SignUpRoute)
app.use('/api/v2/login',LoginRoute)
app.use("/api/workersregister", workerRoutes);
app.use("/api/workerslogin", workerRoutesLogin);
app.use("/api/admin", adminRoutes);
app.use("/api/workers",WorkerAvailability)
app.use("/myforms",getdata)
app.use("/customer",dispalyAssignWorker)
export { app }

