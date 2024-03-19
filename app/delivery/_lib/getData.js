
import { fetchData } from "@/lib/utils/FetchData";
export const getData = async () => {
        try {
            const [responseDelivery, responseOrder] = await Promise.all([
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/delivery`),
                fetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`)
            ]);

            return responseDelivery.map(delivery=>{
              const matchOrder = responseOrder.find(order=>order._id === delivery.orderId._id);
              return{
                ...delivery,
                orderId:matchOrder
              }
            })

        } catch (error) {
            console.error("Error fetching data:", error);
            setMsg("Failed to fetch data");
        }
    }


 