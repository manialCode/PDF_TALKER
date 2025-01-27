import { writable, type Writable } from "svelte/store";

/**
 * Interfaz que define los posibles estados de la aplicación.
 */
interface APP_STATUS {
    INIT: number, 
    LOADING: number,
    CHAT_MODE: number,
    ERROR: number, 
}

/**
 * Interfaz que define la información del estado de la aplicación.
 */
interface AppStatusInfo {
    id: string;
    url: string;
    pages: number;
}

/**
 * Objeto que contiene los posibles estados de la aplicación.
 */
export const APP_STATUS: APP_STATUS = {
    INIT: 0, 
    LOADING: 1,
    CHAT_MODE: 2,
    ERROR: -1,
};

/**
 * Store que contiene el estado actual de la aplicación.
 */
export const appStatus: Writable<number> = writable(APP_STATUS.INIT);

/**
 * Store que contiene la información del estado de la aplicación.
 */
export const appStatusInfo: Writable<AppStatusInfo> = writable({ id: '', url: '', pages: 0 });

/**
 * Cambia el estado de la aplicación basado en el nombre proporcionado.
 * @param name - El nombre del estado al que se desea cambiar.
 */
export const setStatus = (name: keyof APP_STATUS): void => {
    const status = APP_STATUS[name];
    if (status !== undefined) {
        appStatus.set(status);
    } else {
        throw new Error(`Estado desconocido: ${name}`);
    }   
}

/**
 * Establece la información del chat.
 * @param param0 - Un objeto que contiene el id, url y páginas del chat.
 */
export const setChat = (
    { id, url, pages }: { id: string, url: string, pages: number }
): void => {
    appStatusInfo.set({ id, url, pages });
}