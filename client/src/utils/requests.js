// export default class Requests {

//     const navigate = useNavigate();

//     constructor() {
//         this.baserUrl = "http://localhost:5002";
//     }

//     async get(url) {
//         return await fetch(`${this.baserUrl}${url}`, {
//             method: "GET",
//             headers: {
//                 "content-type": "application/json",
//                 "x-auth-token": localStorage.getItem("token"),
//             },
//         });
//     }
//     async post(url, body) {
//         return await fetch(`${this.baserUrl}${url}`, {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json",
//                 "x-auth-token": localStorage.getItem("token"),
//             },
//             body: body,
//         });
//     }

//     async delete(url) {
//         return await fetch(`${this.baserUrl}${url}`, {
//             method: "DELETE",
//             headers: {
//                 "content-type": "application/json",
//                 "x-auth-token": localStorage.getItem("token"),
//             },
//         });
//     }

//     async put(url, body) {
//         return await fetch(`${this.baserUrl}${url}`, {
//             method: "PUT",
//             headers: {
//                 "content-type": "application/json",
//                 "x-auth-token": localStorage.getItem("token"),
//             },
//             body: body,
//         });
//     }

//     async handleLogged(url) {
//         try {
//             const res = await this.get(url)
//             // console.log("handelLogged", res)
//             if (res.status === 401) {
//                 navigate('/login');
//             } else {
//                 navigate(url);
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }


const baserUrl = "http://localhost:5002";

export async function GetRequest(url) {
    return await fetch(`${baserUrl}${url}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
        },
    });
}

export async function PostRequest(url, body) {
    return await fetch(`${baserUrl}${url}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
        },
        body: body,
    });
}

export async function DeleteRequest(url) {
    return await fetch(`${baserUrl}${url}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
        },
    });
}

export async function PutRequest(url, body) {
    return await fetch(`${baserUrl}${url}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
        },
        body: body,
    });
}

// export async function HandleLogged(url) {

//     const navigate = useNavigate();

//     try {
//         const res = await GetRequest(url)
//         // console.log("handelLogged", res)
//         if (res.status === 401) {
//             navigate('/login');
//         } else {
//             navigate(url);
//         }
//     } catch (e) {
//         console.log(e)
//     }
// }


