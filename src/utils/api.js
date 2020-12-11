import { Auth } from "./auth";

export const BASE_URL = process.env.REACT_APP_URL;

export const queryString = params => '?' + Object.keys(params).map(key => `${ key }=${ encodeURIComponent(params[key]) }`).join('&');

const includePathList = ['/user', '/admin']

const excludePathList = ['/user/registered', '/user/login']

const request = async (partialUrl, body, query, method = 'GET', contentType = 'application/json') => {
    const needContent = ['POST', 'PUT'].includes(method);
    const needAuth = includePathList.some(i => partialUrl.startsWith(i)) && !excludePathList.some(i => partialUrl.startsWith(i))

    const promise = (await fetch(BASE_URL + partialUrl + (query ? queryString(query) : ''), {
        body: contentType === 'application/json' ? JSON.stringify(body) : body,
        method, headers: {
            ...needContent ? { 'Content-Type': contentType } : {},
            ...needAuth ? { Authorization: Auth.token } : {}
        }
    })).json();

    const { status } = await promise;
    if (status === 400) Auth.clear();

    return promise;
}

export class API {
    static get(partialUrl, query) {
        return request(partialUrl, undefined, query)
    }

    static post(partialUrl, body, query, contentType) {
        return request(partialUrl, body, query, 'POST', contentType)
    }
}
