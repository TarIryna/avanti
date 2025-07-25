// import jsCookie from "js-cookie";
// import { createContext, useContext, useEffect, useState } from "react";
// import { ECookie } from "../enums";
// import { useProfile } from "./ProfileProvider";

// const LastGoogleAccountContext = createContext({});

// export const LastGoogleAccountProvider = ({ children }) => {
//   const [lastGoogleAccountEmail, setLastGoogleAccountEmail] = useState("");
//   const [isCallGoogle, setIsCallGoogle] = useState(false);

//   const { userProfile } = useProfile();

//   useEffect(() => {
//     if (!!userProfile?.email && isCallGoogle) {
//       jsCookie.set(ECookie.LastGoogleAccountEmail, userProfile.email);
//       setIsCallGoogle(false);
//       setTimeout(() => {
//         setLastGoogleAccountEmail(userProfile.email);
//       }, 1000);
//     }
//   }, [isCallGoogle, userProfile?.email]);

//   return (
//     <LastGoogleAccountContext.Provider
//       value={{
//         lastGoogleAccountEmail,
//         setLastGoogleAccountEmail,
//         handlerWrite: () => {
//           setIsCallGoogle(true);
//         },
//       }}
//     >
//       {children}
//     </LastGoogleAccountContext.Provider>
//   );
// };

// export const useLastGoogleAccount = () => useContext(LastGoogleAccountContext);
