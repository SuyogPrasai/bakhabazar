const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND;

export const findBackend = () => {
    if ( BACKEND_API ) {
        return BACKEND_API;
    } else {
        return "";
    }
}