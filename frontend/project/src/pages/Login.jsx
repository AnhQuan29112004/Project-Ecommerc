import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/home'); 
    } catch (err) {
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tên đăng nhập</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            style={{ backgroundColor: 'white',
              color: 'black',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '4px', }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            style={{ backgroundColor: 'white',
              color: 'black',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '4px', }}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;