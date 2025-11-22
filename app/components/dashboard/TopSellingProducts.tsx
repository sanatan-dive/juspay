export default function TopSellingProducts() {
  const products = [
    {
      name: "ASOS Ridley High Waist",
      price: "$79.49",
      quantity: 82,
      amount: "$6,518.18",
    },
    {
      name: "Marco Lightweight Shirt",
      price: "$128.50",
      quantity: 37,
      amount: "$4,754.50",
    },
    {
      name: "Half Sleeve Shirt",
      price: "$39.99",
      quantity: 64,
      amount: "$2,559.36",
    },
    {
      name: "Lightweight Jacket",
      price: "$20.00",
      quantity: 184,
      amount: "$3,680.00",
    },
    {
      name: "Marco Shoes",
      price: "$79.49",
      quantity: 64,
      amount: "$1,965.81",
    },
  ];

  return (
    <div className="bg-[#F7F9FB] dark:bg-[#282828] rounded-2xl p-6 card-hover">
      <h3 className="text-base font-semibold text-[#1C1C1C] dark:text-white mb-6">
        Top Selling Products
      </h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-[#ffffff]/40">
              <th className="text-left text-xs font-normal text-[#1C1C1C]/40 dark:text-[#ffffff]/40 pb-3">
                Name
              </th>
              <th className="text-left text-xs font-normal text-[#1C1C1C]/40 dark:text-[#ffffff]/40 pb-3">
                Price
              </th>
              <th className="text-left text-xs font-normal text-[#1C1C1C]/40 dark:text-[#ffffff]/40 pb-3">
                Quantity
              </th>
              <th className="text-left text-xs font-normal text-[#1C1C1C]/40 dark:text-[#ffffff]/40 pb-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="">
                <td className="py-4 text-sm text-[#1C1C1C] dark:text-white">
                  {product.name}
                </td>
                <td className="py-4 text-sm text-[#1C1C1C] dark:text-white">
                  {product.price}
                </td>
                <td className="py-4 text-sm text-[#1C1C1C] dark:text-white">
                  {product.quantity}
                </td>
                <td className="py-4 text-sm text-[#1C1C1C] dark:text-white">
                  {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
