const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const basic_router = require('./routes/basic_route');
const social_media_router = require('./routes/social_media_route');
const auth_router = require('./routes/auth_route');
const user_router = require('./routes/user_route');
const contact_info_router = require('./routes/contact_info_route');
const role_router = require('./routes/role_route');
const permission_router = require('./routes/permission_route');
const user_permission_router = require('./routes/user_permission_route');
const admin_router = require('./routes/admin_route');
const air_router = require('./routes/air_routes');
const module_router = require('./routes/module_route');
const user_role_router = require('./routes/user_role_route');
const city_router = require('./routes/sabre_city_routes');
const app = express();
dotenv.config()
app.use(express.json())
app.use(express.static('public'))

app.use(cors({origin:'*'}))
app.use(cookieParser())
app.use('/api/v1/auth', auth_router)
app.use('/api/v1/airs', air_router)
app.use('/api/v1/cities', city_router)
app.use('/api/v1/users', user_router)
app.use('/api/v1/modules', module_router)
app.use('/api/v1/admins', admin_router)
app.use('/api/v1/basics', basic_router)
app.use('/api/v1/social-medias', social_media_router)
app.use('/api/v1/contact-infos', contact_info_router)
app.use('/api/v1/roles', role_router)
app.use('/api/v1/user-role', user_role_router)
app.use('/api/v1/permissions', permission_router)
app.use('/api/v1/user-permissions', user_permission_router)

module.exports = app;