import { NavLink, Outlet, useNavigate, useLocation} from "react-router-dom";
import { useEffect } from 'react'

const getNavLinkClass = ({ isActive }) => 
  isActive ? "px-2 py-1 text-sm bg-button rounded-t-md" : "px-2 py-1 text-sm"

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
      <div className="flex flex-col max-w-[785px] w-full gap-6 font-outfit  bg-blue-background">
        <div className="flex w-full gap-2">

          <div className='flex  w-[232px] mt-12 border rounded-md border-border bg-zinc-50 items-center'>
            <div className='flex flex-col justify-center w-full gap-1 px-3 py-6'>
              <p className='text-xs text-gray-600'>Your balance</p>
              <p className='text-xl text-gray-950'>$AMOUNT</p>
            </div>            
            <img src="../public/images/placeholder.jpg" className="mr-3 w-14 h-14"></img>
          </div>

          <div className='flex  w-[232px] mt-12 border rounded-md border-border bg-zinc-50 items-center'>
            <div className='flex flex-col justify-center w-full gap-1 px-3 py-6'>
              <p className='text-xs text-gray-600'>You&apos;re going to get</p>
              <p className='text-xl text-green'>$AMOUNT</p>
            </div>            
            <img src="../public/images/VectorGreen.svg" className="w-[67px] mr-3 h-[43px]"></img>
          </div>

          <div className='flex  w-[232px] mt-12 border rounded-md border-border bg-zinc-50 items-center'>
            <div className='flex flex-col justify-center w-full gap-1 px-3 py-6'>
              <p className='text-xs text-gray-600'>You owe</p>
              <p className='text-xl text-red-700'>$AMOUNT</p>
            </div>            
            <img src="../public/images/VectorRed.svg" className="w-[67px] mr-3 h-[43px]"></img>
          </div>
        </div>
        <div className="rounded-t-md">
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

