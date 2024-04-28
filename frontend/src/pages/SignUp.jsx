import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
      
      
    <div className='relative '>
      <div className='z-[100000] nav2  absolute  top-[0]  bg-cover bg-center bg-no-repeat w-full h-[100vh] flex items-center  justify-center '></div>
      <img className='absolute '  src="https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      <div className='p-1 '>
      <div className="absolute border-2 rounded-2xl border-[#10439F]/30 left-[25%] top-[15vh] flex items-center  bg-[#008DDA]/40 justify-center h-[83vh] w-[59%] backdrop-opacity-10 backdrop-invert">
      <div className="w-[60%] h-[90%] bg-gradient-to-r from-[#008DDA]   to-[#41C9E2] rounded-xl flex items-center justify-center flex-col ">
      <div className=" w-[60%] h-[75%] flex flex-col gap-4">
      <div className=" leading-[3.2rem]">
             <h1 className="text-[3rem]">HELLo,</h1>
             <h1 className="text-[3rem] font-bold">WELCOME !</h1>
          </div>

      {/* <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1> */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className="text-white placeholder-white p-3 rounded-full border-[3px] bg-transparent "
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className="text-white placeholder-white p-3 rounded-full border-[3px] bg-transparent "
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className="text-white placeholder-white p-3 rounded-full border-[3px] bg-transparent "
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-white p-3 text-black rounded-full font-semibold text-black uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 items-center justify-center'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>



      </div>
     



      </div>
     









      </div>
      
   






    </div>
      </div>



  );
}
