// "use client"
// import { User } from "@/types/types";
// import { backendURL } from "@/types/types";
// import axios from "axios";

// export async function getUser() : Promise<User | null | undefined> {
//     const token = localStorage.getItem("token");
//     // console.log(token)
//     try {
//         let user: User | undefined;

//         if(!token) {
//             return user;
//         }

//         user = await axios.get(`${backendURL}/api/user/me`, {
//             headers: {
//                 "authorization": `${token}`
//             }
//         });
//         console.log(user)
//         return user;
//     } catch (error) {
//         console.log(error);
//     }
// }