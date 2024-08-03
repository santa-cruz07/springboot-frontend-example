import axios, {AxiosError} from "axios";
import {useAuthStore} from "@/stores";
import router from "@/router";
import useToastMessage from "../hooks/useToastMessage";


export default class RestService {

    get(path: String) {
        let uri = `${window.location.origin}/api/${path}`;


        return new Promise((resolve, reject) => {
            const accessToken = useAuthStore().jwt?.accessToken;

            if (!accessToken) {
                reject(new Error('Access token is undefined.'));
                return;
            }
            axios({
                method: 'get',
                url: uri,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
            })
                .then((res) => {
                    resolve(res.data);
                })
                .catch(err => {
                    if (err.response.status === 403) {
                        useToastMessage('toast-info', {summary: 'Logged Out', detail: 'Your Session has Expired.'});
                        console.error("Status:" + err.response.status + " Get Login Redirect")
                        return router.push('/management/login')
                    }
                    else if (err.response.status === 503) {
                        useToastMessage('toast-error', {summary: 'Service Timeout', detail: 'Query took >3 minutes'});
                        reject({ stopPolling: true });
                    } else {
                        console.error("Generic Error:" + JSON.stringify(err))
                        reject(err);
                    }
                })
        });
    }

    async put(path: String, jsonB: any) {
        const uri = `${window.location.origin}/api/${path}`;

        const accessToken = useAuthStore().jwt?.accessToken;

        if (!accessToken) {
            throw new Error('Access token is undefined.');
        }

        try {
            const response = await axios({
                method: 'put',
                url: uri,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: jsonB
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async post(path: String, jsonB: any) {
        const uri = `${window.location.origin}/api/${path}`;

        const accessToken = useAuthStore().jwt?.accessToken;

        if (!accessToken) {
            throw new Error('Access token is undefined.');
        }

        try {
            const response = await axios({
                method: 'post',
                url: uri,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: jsonB
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}