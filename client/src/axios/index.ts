import axios from 'axios';
import { REACT_APP_API_URI } from '../constants';

export default axios.create({
  baseURL: REACT_APP_API_URI
});
