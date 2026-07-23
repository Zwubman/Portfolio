import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import { projectsApi } from './services/projectsApi';
import { experiencesApi } from './services/experiencesApi';
import { skillsApi } from './services/skillsApi';
import { contactApi } from './services/contactApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [experiencesApi.reducerPath]: experiencesApi.reducer,
    [skillsApi.reducerPath]: skillsApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      projectsApi.middleware,
      experiencesApi.middleware,
      skillsApi.middleware,
      contactApi.middleware
    ),
});

setupListeners(store.dispatch);
