// import { createContext, useContext, useState } from "react";

// const ProfileContext = createContext({});

// export const ProfileProvider = (props) => {
//   const { children, userProfile: userProfileData } = props;
//   const [userProfile, setUserProfile] = useState(userProfileData);
//   const isAuth = Boolean(userProfile);

//   const login = (userProfile) => {
//     setUserProfile(userProfile);
//     checkAndReload();
//     // Drop cached modals (async mode)
//     // catchAsync(
//     //   ...[MODALS.FORGOT_PASSWORD].map(key =>
//     //     asyncCall(() => {
//     //       remove(key)
//     //     }),
//     //   ),
//     // )
//   };

//   const logout = () => {
//     setUserProfile(null);
//     checkAndReload();

//     // Drop cached modals (async mode)
//     // catchAsync(
//     //   ...[
//     //     MODALS.BONUS_ACTIVATE,
//     //     MODALS.BONUS_PURCHASE,
//     //     MODALS.CANCEL_BONUS,
//     //     MODALS.DEACTIVATE_BONUS,
//     //     MODALS.FORTUNE_SPIN_PURCHASE,
//     //   ].map(key =>
//     //     asyncCall(() => {
//     //       remove(key)
//     //     }),
//     //   ),
//     // )

//     // Drop cached data
//     // catchAsync(
//     //   ...[
//     //     EQueryKey.Notifications,
//     //     EQueryKey.NavigationCounters,
//     //     EQueryKey.PaymethodFields,
//     //     EQueryKey.PaymethodList,
//     //     EQueryKey.ProfileVerification,
//     //     EQueryKey.ApiKyc,
//     //   ].map(key =>
//     //     queryClient.invalidateQueries({
//     //       queryKey: [key],
//     //       exact: false,
//     //     }),
//     //   ),

//     // )
//   };

//   const updateProfile = (userProfile) => {
//     setUserProfile((prev) => {
//       if (prev) {
//         return {
//           ...prev,
//           ...userProfile,
//         };
//       }
//       return null;
//     });
//   };

//   // TODO!: Set type
//   // const updateWishlist = (object) => {
//   //   if (userProfile && 'wishlist' in userProfile) {
//   //     const wishlist = userProfile.wishlist

//   //     if (wishlist.includes(object.id) && !object.isLiked) {
//   //       setUserProfile((prev) => {
//   //         userProfile.wishlist = wishlist.filter(id => id !== object.id)

//   //         return prev
//   //       })
//   //     } else if (!wishlist.includes(object.id) && object) {
//   //       setUserProfile((prev) => {
//   //         if (userProfile) {
//   //           userProfile.wishlist = [...wishlist, object.id]
//   //         }

//   //         return prev
//   //       })
//   //     }
//   //   }
//   // }

//   return (
//     <ProfileContext.Provider
//       value={{
//         isAuth,
//         userProfile,
//         login,
//         logout,
//         updateProfile,
//         updateWishlist,
//       }}
//     >
//       {children}
//     </ProfileContext.Provider>
//   );
// };

// export const useProfile = () => useContext(ProfileContext);
