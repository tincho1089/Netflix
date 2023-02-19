const BASE_URL = import.meta.env.VITE_REACT_APP_URL
const API_KEY = import.meta.env.VITE_REACT_APP_KEY

export const GetApiUrl = (path: string, parameters: string) => `${BASE_URL}${path}?api_key=${API_KEY}&${parameters}`
