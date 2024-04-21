export const fetchInitialData = async (key) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${key}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        const data = await response.json();
       // console.log(data);
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to fetch delivery data:', error);
    }
};


