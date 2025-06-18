// // import {Server} from "socket.io";

// // const io = new Server(9000, {
// //     cors: {
// //         origin: "http://localhost:3000",
// //     }
// // })

// // io.on("connection", (socket) => {
// //      console.log("user connected")
// // });
// import {Server} from "socket.io";


// const io = new Server(9000, {
//     cors: {
//         origin: ["http://localhost:3000",
//                "https://whatsapp-client-main.vercel.app",
//         ]
//     }
// })
// let users = [];
// const addUser = (userData, socketId) =>{
//     !users.some(user => user.sub === userData.sub) && 
//     users.push({ ...userData, socketId });
//     // console.log(users);
// }
// const getUsers = (userId) => {
//     return users.find(user => user.sub === userId);
// }


// io.on("connection", (socket) => {
//      console.log("user connected")

//      socket.on("addUser", userData=>{
//         addUser(userData, socket.id);
//         io.emit("getUsers", users);
//      })

//      socket.on("sendMessage",data=>{
//         const user = getUsers(data.receiverId);
//         io.to(user.socketId).emit("getMessage", data)
//      })
// });
import { Server } from "socket.io";

const io = new Server(9000, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://whatsapp-client-main.vercel.app",
            
        ],
        methods: ["GET", "POST"]
    }
});

let users = [];
const addUser = (userData, socketId) => {
    !users.some(user => user.sub === userData.sub) &&
        users.push({ ...userData, socketId });
};
const getUsers = (userId) => {
    return users.find(user => user.sub === userId);
};

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", data => {
        const user = getUsers(data.receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", data);
        }
    });
});