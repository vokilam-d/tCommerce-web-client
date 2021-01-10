import { environment } from '../../environments/environment';

export const SEARCH_QUERY_PARAM = 'q';
export const DUMMY_PATH = 'dummy';
export const INPUT_MEDIA_ACCEPT_TYPES = '.jpg,.jpeg,.png,.webp,.svg,.tiff,.gif';
export const DEFAULT_ERROR_TEXT = 'Что-то пошло не так. Пожалуйста, попробуйте позже';
export const IS_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
export const VALID_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
export const VIEWED_PRODUCT_IDS_KEY = 'recentlyViewedProducts';
export const DEFAULT_PHONE_NUMBER_VALUE = '+380';
export const MINIMAL_ORDER_COST: number = 150;

// export const API_HOST = environment.production ? '' : 'http://localhost:3000';
export const API_HOST = environment.production ? '' : 'https://klondike.com.ua';
export const UPLOADED_HOST = API_HOST;
// export const UPLOADED_HOST = 'https://klondike.com.ua';
