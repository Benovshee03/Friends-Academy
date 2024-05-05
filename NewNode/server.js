const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const seedPermissions = require('./seeds/permissionSeedData');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    autoConnect: true,
    cors: {
        origin: '*'
    }
});


io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı.');

    socket.on('addCategory', (newCategory) => {
        console.log('Yeni kategori eklendi:', newCategory);
        io.emit('categoryAdded', newCategory);
    });


    socket.on('notification', (notification) => {
        console.log('Yeni bildirim:', notification); // db ye kaydedilebilir + mail gönderin, sms gönderin, push notification gönderin
        io.emit('notification', notification);
    });


    socket.on('disconnect', () => {
        console.log('Bir kullanıcı bağlantıyı kesti.');
    });
});


app.use(express.json());
app.use(cors())

mongoose
    .connect(process.env.DATABASE_SERVER_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the database!');
    }).catch((err) => {
        console.log('Connection failed!', err);
    });

// seedPermissions(mongoose);

const authRouter = require('./routes/auth');
const courseRouter = require('./routes/courses');
const userRouter = require('./routes/users');
const roleRouter = require('./routes/roles');
const uploadRouter = require('./routes/uploads');
const userRoleRouter = require('./routes/userRoles');
const permissionRouter = require('./routes/permissions');
const rolePermissionRouter = require('./routes/rolePermissions');


app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/roles', roleRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/userRoles', userRoleRouter);
app.use('/api/courses', courseRouter);
app.use('/api/permissions', permissionRouter);
app.use('/api/rolePermissions',rolePermissionRouter);




app.get('/', (req, res) => {
    res.send('Hello World!');
});

const SOCKET_PORT = process.env.SOCKET_PORT || 7001;
io.listen(SOCKET_PORT, () => console.log(`socket.io server running on port ${SOCKET_PORT}`));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));