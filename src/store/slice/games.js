// import { createSlice } from '@reduxjs/toolkit';
// import { GamesService } from '@/api/games_service';

// const initialState = {
//   query: '',
//   page: 1,
//   pages: 1,
//   quantity: 30,
//   provider: null,
//   collection: null,
//   games: [],
//   isLoading: false,
//   isError: false,
//   providers: [],
//   collections: [],
//   topGames: null,
//   liveGames: null,
// };

// const commonSlice = createSlice({
//   name: 'games',
//   initialState,
//   reducers: {
//     changeGames: (state, action) => {
//       state.games = action.payload;
//     },
//     changePage: (state, action) => {
//       state.page = action.payload;
//     },
//     changePages: (state, action) => {
//       if (action.payload === 1) state.games = [];
//       state.pages = action.payload;
//     },
//     changeQauntity: (state, action) => {
//       state.page = 1;
//       state.quantity = action.payload;
//     },
//     changeProvider: (state, action) => {
//       state.collection = null;
//       state.query = '';
//       state.page = 1;
//       state.provider = action.payload;
//     },
//     changeCollection: (state, action) => {
//       state.provider = null;
//       state.query = '';
//       state.page = 1;
//       state.collection = action.payload;
//     },
//     changeQuery: (state, action) => {
//       state.provider = null;
//       state.collection = null;
//       state.page = 1;
//       state.query = action.payload;
//     },
//     changeToInitial: (state, action) => {
//       state.page = 1;
//       state.collection = null;
//       state.provider = null;
//       state.query = '';
//     },
//     changeProviders: (state, action) => {
//       state.providers = action.payload;
//     },
//     changeCollections: (state, action) => {
//       state.collections = action.payload;
//     },
//     changeTopGames: (state, action) => {
//       state.topGames = action.payload;
//     },
//     changeLiveGames: (state, action) => {
//       state.liveGames = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(GamesService.fetchGames.pending, (state) => {
//       state.isLoading = true;
//       state.isError = null;
//     });
//     builder.addCase(GamesService.fetchGames.fulfilled, (state, action) => {
//       state.isLoading = false;
//       const result =
//         state.query.length > 0 ? action.payload.result.games : action.payload;
//       if (state.page === 1) {
//         state.games = result.result;
//         state.pages = result.pages;
//       }
//       if (state.page > 1) {
//         state.games = [...state.games, ...result.result];
//         state.pages = result.pages;
//       }
//     });
//     builder.addCase(GamesService.fetchGames.rejected, (state, action) => {
//       state.isLoading = false;
//       state.isError = action.error;
//       state.games = [];
//     });
//   },
// });

// export default commonSlice;
