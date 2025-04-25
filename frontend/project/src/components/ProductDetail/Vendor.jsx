const VendorInfo = () => {
    return (
        <div className="md:w-1/3">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">123 Main Street, Miami, USA</p>
                <p className="text-sm text-gray-600">
                    Unverified Address{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Change
                    </a>
                </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h2 className="text-lg font-bold text-gray-800">Return & Warranty</h2>
                <ul className="list-disc list-inside text-sm text-gray-600">
                    <li>100 Days Return</li>
                    <li>100 Months Warranty</li>
                </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold text-gray-800">Vendor</h2>
                <p className="text-gray-800">Noodies Co.</p>
                <div className="flex items-center mt-2">
                    <div className="text-yellow-500">★★★★★</div>
                    <span className="ml-2 text-gray-600 text-sm">(32 reviews)</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                    Address: 5171 W Campbell Ave, undefined Kent, UT 33127 United States
                </p>
                <p className="text-sm text-gray-600">Contact Seller: (+1) 540-002-0033</p>
                <div className="mt-4">
                    <p className="text-gray-800 font-bold">Rating: 92%</p>
                    <p className="text-sm text-gray-600">Ship on time: 100%</p>
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