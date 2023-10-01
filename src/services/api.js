import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
// for fetch user data
export const getUsers = () => {
  return axios.get(`${API_BASE_URL}/users`);
};
// for fetch user data by user id
export const getUser = (userId) => {
  return axios.get(`${API_BASE_URL}/users/${userId}`);
};
// for fetch album data
export const getAlbums = () => {
  return axios.get(`${API_BASE_URL}/albums`);
};
// for fetch album data by user
export const getAlbumsByUserId = (userId) => {
  return axios.get(`${API_BASE_URL}/albums?userId=${userId}`);
};
// for fecth album detail by id
export const getPhotosByAlbumId = (albumId) => {
  return axios.get(`${API_BASE_URL}/photos?albumId=${albumId}`);
};

