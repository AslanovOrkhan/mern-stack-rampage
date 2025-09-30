import OrdersCard from "../../../components/OrdersCard";
import SaleCard from "../../../components/SaleCard";

const Dashboard = () => {
  return (
    <div className="h-full w-full p-6">
      <h1 className="text-white text-2xl font-bold capitalize">
        dashboard overview
      </h1>
      <section className="sale-card-container grid grid-cols-5 gap-6">
        <SaleCard />
        <SaleCard />
        <SaleCard />
        <SaleCard />
        <SaleCard />
      </section>
      <section className="orders-card-container mt-16 grid grid-cols-4 gap-6">
        <OrdersCard />
        <OrdersCard />
        <OrdersCard />
        <OrdersCard />
      </section>
    </div>
  );
};

export default Dashboard;
