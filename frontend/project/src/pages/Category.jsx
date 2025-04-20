import { Link } from 'react-router-dom';
import useCategoryStore from '../store/categoryStore';
import { useEffect } from 'react';

const Categories = () => {
  const { categories, loading, error, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <div className="text-center p-8">Đang tải...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="container py-4">
      <h1 className="text-3xl font-bold mb-6">Danh mục</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {categories.map((category) => (
          <div key={category.id} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.category_name}</h5>
                <Link
                  to={`/category/${category.slug_category}`}
                  className="btn btn-primary"
                >
                  Xem danh mục
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;