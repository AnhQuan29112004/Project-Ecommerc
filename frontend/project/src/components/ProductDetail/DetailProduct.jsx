import { useLocation, Link } from 'react-router-dom';

const ProductDetails = ({productDetail}) => {
    return (
        <div className="">
            <h1 className="text-2xl font-bold text-gray-800">{productDetail.product_name}</h1>
            <div className="flex items-center mt-2">
                <div className="text-yellow-500">★★★★★</div>
                <span className="ml-2 text-gray-600 text-sm">(32 reviews)</span>
            </div>
            <div className="mt-4">
                <span className="line-through text-red-500 text-lg">${productDetail.old_price}</span>
                <span className="text-green-600 font-bold text-xl ml-2">${productDetail.new_price}</span>
                <span className="text-green-600 ml-2">{productDetail.percentage}% Off</span>
            </div>
            <p className="mt-4 text-gray-600">Mô tả tóm tắt: <span>{productDetail.description}</span></p>
            
            <div className="flex items-center mt-6">
                <input
                    type="number"
                    defaultValue="1"
                    min="1"
                    className="w-16 p-2 border border-gray-300 rounded-md"
                    style={{ backgroundColor:"white" }}
                />
                <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md flex items-center">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                    </svg>
                    Add to cart
                </button>
                <button className="ml-4 text-gray-500">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                    </svg>
                </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 mt-6">
                    
                    <h2 className="text-lg font-bold text-gray-800">Product Details</h2>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                        <li>Type: {productDetail.type}</li>
                        <li>MFG: {productDetail.mfg}</li>
                        <li>EXP: {productDetail.exp}</li>
                        <li>SKU: {productDetail.sku}</li>
                        <li>Tags: {productDetail.tag && productDetail.tag.map((tag) => (<Link key={tag} to={`/product/tag/${tag}`}><span>#{tag}, </span></Link>))}</li>
                        
                        
                        <li>Stock: {productDetail.stock} Items in Stock</li>
                    </ul>
            </div>
            {/* <div className="mt-6 text-sm text-gray-600">
                <p>Type: Organic</p>
                <p>MFG: 18-Oct-2022</p>
                <p>EXP: 100 Days</p>
                <p>SKU: stx2197</p>
                <p>Tags: Snack, Organic, Brown</p>
                <p>Stock: 10 Items in Stock</p>
            </div> */}
        </div>
    );
};

export default ProductDetails;