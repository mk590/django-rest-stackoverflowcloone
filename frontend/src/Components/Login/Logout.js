import { useEffect } from "react";
import axiosInstance from "../../Interceptors/axios.js";
const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.post(
          "logout/",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
          { withCredentials: true }
        );
        console.log(data);
        localStorage.clear();
        axiosInstance.defaults.headers.common["Authorization"] = null;
        window.location.href = "/";
      } catch (e) {
        console.log("logout not working", e);
      }
    })();
  }, []);
  return <div></div>;
};

export default Logout;



// import { useEffect } from "react";
// import axios from "axios";
// const Logout = () => {
//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.post(
//           "http://127.0.0.1:8000/api/logout/",
//           {
//             refresh_token: localStorage.getItem("refresh_token"),
//           },
//           { headers: { "Content-Type": "application/json" } },
//           { withCredentials: true }
//         );
//         console.log(data);
//         localStorage.clear();
//         axios.defaults.headers.common["Authorization"] = null;
//         window.location.href = "/";
//       } catch (e) {
//         console.log("logout not working", e);
//       }
//     })();
//   }, []);
//   return <div></div>;
// };

// export default Logout;
