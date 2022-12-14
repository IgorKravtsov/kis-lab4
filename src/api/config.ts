import axios from "axios";
import { API_HOST } from "../constants/api";

export const $api = axios.create({ baseURL: API_HOST });
