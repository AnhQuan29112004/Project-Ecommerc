const ProductImages = ({productImage}) => {
    return (
        <div className="md:w-1/3">
            <img src={productImage} alt="Product Image" className="w-full rounded-lg shadow-md" />
            <div className="flex gap-4 mt-4">
                <img src="thumb1.jpg" alt="Thumbnail 1" className="w-20 h-20 rounded-lg" />
                <img src="thumb2.jpg" alt="Thumbnail 2" className="w-20 h-20 rounded-lg" />
                <img src="thumb3.jpg" alt="Thumbnail 3" className="w-20 h-20 rounded-lg" />
                <img src="thumb4.jpg" alt="Thumbnail 4" className="w-20 h-20 rounded-lg" />
            </div>
        </div>
    );
};

export default ProductImages;