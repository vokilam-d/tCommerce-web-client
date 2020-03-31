import { environment } from '../../environments/environment';

export const INPUT_MEDIA_ACCEPT_TYPES = '.jpg,.jpeg,.png,.webp,.svg,.tiff,.gif';
export const DEFAULT_ERROR_TEXT = 'Что-то пошло не так. Пожалуйста, попробуйте позже';
export const isEmailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
export const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const API_HOST = environment.production ? '' : 'http://localhost:3000';
