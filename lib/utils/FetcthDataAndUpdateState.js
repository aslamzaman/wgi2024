import { fetchData } from "./FetchData";
export const fetchDataAndUpdateState = async (key, setStateFunction) => {
    try {
        const localStorageData = localStorage.getItem(key);
        if (localStorageData) {
            setStateFunction(JSON.parse(localStorageData));
        } else {
            const responseData = await fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${key}`);
            localStorage.setItem(key, JSON.stringify(responseData));
            setStateFunction(responseData);
        }
    } catch (error) {
        console.error(`Error fetching ${key} data:`, error);
    }
};

