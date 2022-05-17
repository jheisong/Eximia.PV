


const urlbase: string = "https://localhost:44366/api/v1/";

function request<TResponse>(
    url: string,
    config: RequestInit = {}
): Promise<TResponse> {
    return fetch(urlbase + url, config)
        .then((response) => response.json())
        .then((data) => data as TResponse);
}

export const Api = {

    get: <TResponse>(url: string) =>
        request<TResponse>(url),

    put: <TResponse>(url: string) =>
        request<TResponse>(url, { method: 'PUT'}),

    post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
        request<TResponse>(url, { method: 'POST', body }),
}

 