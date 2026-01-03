// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const axiosInstance = axios.create({
//   baseURL: "https://flex-dev.cosmicslot.com/en",
// });
// export class OrdersService {
//   static fetchOrders = createAsyncThunk(
//     "OrdersService/fetchOrders",
//     async (params, redux) => {
//       const { userId } = params;
//       let url = `/api/users/${userId}/orders/all`;
//       try {
//         const { data } = await fetch(url);
//         return data;
//       } catch (error) {
//         return redux.rejectWithValue(error);
//       }
//     }
//   );
// }
