import { NavLink, Outlet, useNavigate, useLocation} from "react-router-dom";
import { useEffect } from 'react'
import UserSummary from "../components/UserSummary";

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
      <div className="flex flex-col max-w-[785px] w-full gap-4 font-outfit bg-blue-background p-2">
        <UserSummary />
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

