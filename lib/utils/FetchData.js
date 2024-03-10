export const fetchData = async (url) => {
    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }

    return response.json();
};
