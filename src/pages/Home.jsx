import { NavLink, Outlet, useNavigate, useLocation} from "react-router-dom";
import { useEffect } from 'react';

const getNavLinkClass = ({ isActive }) => 
  `${isActive ? "px-2 py-1 text-sm bg-border rounded-t-md text-tab-text" : "px-2 py-1 text-sm text-button"} hover:text-tab-text`

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation()

  //redirect to expenses-user if page loads at root level
  useEffect(()=>{
    if(location.pathname =='/'){
      navigate('expenses-user')
    }
  }, [location, navigate])

  return <>
      <div className="flex flex-col max-w-[785px] w-full gap-4 font-outfit bg-blue-background">
        <div className="flex w-full gap-2">

          <div className='flex items-center w-1/3 mt-12 border rounded-md border-border bg-zinc-50'>
            <div className='flex flex-col justify-center w-full gap-1 px-3 py-6'>
              <p className='text-xs text-gray-600'>Your balance</p>
              <p className='text-xl font-semibold text-gray-950'>$AMOUNT</p>
            </div> 
          </div>

          <div className='flex items-center w-1/3 mt-12 border rounded-md border-border bg-zinc-50'>
            <div className='flex flex-col justify-center w-full gap-1 px-3 py-6'>
              <p className='text-xs text-gray-600'>You&apos;re going to get</p>
              <p className='text-xl font-semibold text-green'>$AMOUNT</p>
            </div>            
            <img src="../../images/VectorGreen.svg" className="w-[67px] mr-6 h-[43px]"></img>
          </div>

          <div className='flex items-center w-1/3 mt-12 border rounded-md border-border bg-zinc-50'>
            <div className='flex flex-col justify-center w-full gap-1 px-3 py-6'>
              <p className='text-xs text-gray-600'>You owe</p>
              <p className='text-xl font-semibold text-red-700'>$AMOUNT</p>
            </div>            
            <img src="../../images/VectorRed.svg" className="w-[67px] mr-6 h-[43px]"></img>
          </div>
        </div>
        <div className="">
          <NavLink className={getNavLinkClass} to={`expenses-user`}>
            Your expenses
          </NavLink>   
          <NavLink className={getNavLinkClass} to={`statistics`}>
            Statistics
          </NavLink>
        </div>       
        <Outlet />
      </div>
    </>
}

