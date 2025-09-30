import { SlBasket } from "react-icons/sl"

const OrdersCard = () => {
  return (
    <div className="bg-[#020817] p-6 flex items-center justify-start gap-3 rounded-lg">
      <div className="bg-amber-600 rounded-full w-12 h-12 flex items-center justify-center">
      <SlBasket className="text-white text-lg"/>
      </div>
      <div className="text-white flex flex-col items-start justify-starrt">
        <h2 className="text-sm font-semibold">Total Orders</h2>
        <p className="text-xl font-bold">1,024</p>
      </div>
    </div>
  )
}

export default OrdersCard
