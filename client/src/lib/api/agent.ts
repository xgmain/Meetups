import axios from 'axios';
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

agent.interceptors.request.use(
    config => {
        store.uiStore.isBusy();
        return config;
    },
    error => {
        store.uiStore.isIdle();
        return Promise.reject(error);
    }
);

agent.interceptors.response.use(
    async response => {
        try {
            await sleep(1000);
            return response;
        } finally {
            store.uiStore.isIdle();
        }
    },
    error => {
        store.uiStore.isIdle();
        return Promise.reject(error);
    }
);

export default agent;