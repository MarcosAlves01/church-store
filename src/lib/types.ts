
export function ResponseGenericApiRoute(message: string) {
    return {
        request_ok: false,
        status: 500,
        error_message_api: false,
        error_message: message,
        response: null,
        message_success: '',
        message_success_api: false
    }
}

export function SuccesResponseApi(status: number, data: unknown): responseApiRouteType {
    return {
        request_ok: true,
        status: status,
        response: data,
        error_message: "",
        error_message_api: false,
        message_success: "",
        message_success_api: false
    }
}

export type responseApiRouteType<T = unknown> = {
    request_ok: boolean,
    status: number,
    error_message_api: boolean,
    error_message: string,
    response: T | null,
    message_success: string,
    message_success_api: boolean
}