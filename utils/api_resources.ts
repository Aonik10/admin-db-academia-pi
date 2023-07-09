export const SERVER_URL = "http://localhost:3000/api";

export async function request(path: string, method: string, body: any = null) {
    const response = await fetch(SERVER_URL + path, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
    });

    return response;
}

interface FormDataRequestResponse {
    message: string;
    url: string;
}

export async function formDataRequest(
    path: string,
    body: FormData
): Promise<FormDataRequestResponse> {
    const response = await fetch(SERVER_URL + path, {
        method: "POST",
        body,
    });
    return response.json();
}
