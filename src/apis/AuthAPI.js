const appId = 'NZK11KBs4bC0ErXQN01qEKU3a3WVWgnr6EM0Syoc';
const restKey = 'pVDT4kF8JhQvA7iYffZOv9hKzC1mCBVKwbZQPlpz';
const serverUrl = 'https://parseapi.back4app.com/';

export async function SignInAPI(payload) {
    try {
        const url = serverUrl + 'login';
        const body = {
            username: payload.username,
            password: payload.password,
        };
        const signInDataResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await signInDataResponse.json();
    } catch (errors) {
        return errors;
    }
}

export async function ForgotPasswordAPI(emailId) {
    try {
        const url = serverUrl + '/requestPasswordReset';
        const body = {
            email: emailId,
        };
        const forgotPasswordDataResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await forgotPasswordDataResponse.json();
    } catch (errors) {
        return errors;
    }
}

export async function SignUpAPI(payload) {
    console.log(payload);
    try {
        const url = serverUrl + 'users';
        const body = payload;
        const signUpDataResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': appId,
                'X-Parse-REST-API-Key': restKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await signUpDataResponse.json();
    } catch (errors) {
        return errors;
    }
}

export const userMeApi = async(payload) => {
    try {
        if (payload.sessionToken != null && payload.sessionToken.length > 0) {
            const url = serverUrl + 'users/me';
            const authResponse = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Parse-Application-Id': appId,
                    'X-Parse-REST-API-Key': restKey,
                    'X-Parse-Session-Token': payload.sessionToken,
                    'Content-Type': 'application/json',
                },
            });
            return await authResponse.json();
        } else {
            return null;
        }
    } catch (errors) {
        return null;
    }
};