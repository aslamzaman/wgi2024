export const fetchData = async (url) => {
    try {

        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }

        return response.json();
    } catch (error) {
        console.error('Failed to fetch delivery data:', error);
    }
};



export const fetchLocalData = (key) => {
    const localDelivery = localStorage.getItem(key);
    const responseDelivery = localDelivery ? JSON.parse(localDelivery) : [];
    return responseDelivery;
};


export const loadInitialData = async (key) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${key}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        const data = await response.json();
        console.log(data);
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to fetch delivery data:', error);
    }
};


