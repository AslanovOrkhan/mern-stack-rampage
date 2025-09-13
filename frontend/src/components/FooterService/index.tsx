import FooterServiceCard from "../FooterServiceCard";

const FooterService = () => {
  return (
    <div className="grid grid-cols-4 py-4 px-10">
      <FooterServiceCard
        className="border-r border-gray-400 pl-4"
        name="Fast and Free Delivery"
        description="Free shipping on all orders over 1000 TL"
      />
      <FooterServiceCard
        className="border-r border-gray-400 pl-4"
        name="Related Customer Services"
        description="Get help quickly and easily by contacting us on any issue."
      />
      <FooterServiceCard
        className="border-r border-gray-400 pl-4"
        name="Special Offers"
        description="Join us with your email for our offers tailored to your needs"
      />
      <FooterServiceCard
        name="Safe Payment"
        description="All your information is safe with iyzico payment infrastructure"
      />
    </div>
  );
};

export default FooterService;
