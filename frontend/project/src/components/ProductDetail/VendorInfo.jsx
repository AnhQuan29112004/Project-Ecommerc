const VendorInfo = ({vendorDetail}) => {
    if (!vendorDetail) {
        return <div>No vendor data</div>; // Trả về thông báo nếu không có dữ liệu vendor
      }
      
      console.log("Vendor Detail",vendorDetail);
    return (
        <div className="md:w-1/3">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">{vendorDetail.address}</p>
                {vendorDetail.address ? (
                    <p className="text-sm text-green-600">
                        Unverified Address{' '}
                        <a href="#" className="text-blue-500 hover:underline">
                            Change
                        </a>
                    </p>
                ):(
                    <p className="text-sm text-red-600">
                        Verified Address{' '}
                        <a href="#" className="text-blue-500 hover:underline">
                            Change
                        </a>
                    </p>
                )}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h2 className="text-lg font-bold text-gray-800">Return & Warranty</h2>
                <ul className="list-disc list-inside text-sm text-gray-600">
                    <li>{vendorDetail.days_return} Days Return</li>
                    <li>{vendorDetail.warranty_period} Months Warranty</li>
                </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold text-gray-800">Vendor</h2>
                <p className="text-gray-800">{vendorDetail.title_shop}</p>
                <div className="flex items-center mt-2">
                    <div className="text-yellow-500">★★★★★</div>
                    <span className="ml-2 text-gray-600 text-sm">(32 reviews)</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                    Address: {vendorDetail.address}
                </p>
                <p className="text-sm text-gray-600">Contact Seller: {vendorDetail.phone_number}</p>
                <div className="mt-4">
                    <p className="text-gray-800 font-bold">Rating: 92%</p>
                    <p className="text-sm text-gray-600">Ship on time: {vendorDetail.shipping_on_time}%</p>
                    <p className="text-sm text-gray-600">Good Quality: 89%</p>
                </div>
                <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md">
                    Become a Vendor
                </button>
            </div>
        </div>
    );
};

export default VendorInfo;