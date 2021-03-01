
import CONSTANTS from '../constants/index.js';
import User from '../modules/user/user.validator';
import UserRoutes from '../modules/user/user.routes'

const routes = (app)=>{
   
app.use(`${CONSTANTS.API_URI}/user` ,User.isAuthenticated,UserRoutes);

}
export default routes;
// Define Routes
