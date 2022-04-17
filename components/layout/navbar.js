import { UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);

  const [current, setCurrent] = useState('');
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
      process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter(); 

  const logout = () => {
    window.localStorage.removeItem('auth');
    setState(null);
    router.push('/login');
};

  return (
    <header className="flex items-center p-3 flex-wrap text-white bg-green">
      <div className="px-2">
        <Link href="/">
          <a>
              <img src="./favicon.ico" alt="LJ" />
          </a>
        </Link>
      </div>

      <button
        onClick={() => setShowNav(!showNav)}
        type="button"
        className="inline-flex p-3 text-black hover:text-white focus:text-white focus:outline-none lg:hidden ml-auto"
      >
        <svg
          className="h-6 w-6 fill-current"
          viewBox="0 -53 384 384"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
          <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        </svg>
      </button>

      <div className="w-full flex-grow lg:inline-flex lg:flex-grow lg:w-auto mt-3">
        <div
          className={
            "lg:inline-flex lg:flex-row lg:ml-auto flex flex-col " +
            (showNav ? "" : "hidden")
          }
        >

        {state !== null ? (
          <>
            <Link href="/products">
            <a className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
              PRODUCTS
            </a>
          </Link>

          <Link href="/contact">
            <a className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
              CONTACT
            </a>
          </Link>

          <Link href="/cart">
            <a className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
              CART
            </a>
          </Link>

                                      
          {state.user.role === "Admin" && (
            <>
              <Link href="/admin/addProducts" >
                <a className="hover:cursor-pointer lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
                  ADD PRODUCTS
                </a>
              </Link>

              <Link href="/admin/orders" >
              <a className="hover:cursor-pointer lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
                MY ORDERS
              </a>
              </Link>

              <Link href="/admin/products" >
                <a className="hover:cursor-pointer lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
                  MY PRODUCTS
                </a>
              </Link>
            </>
          )}  

          
            <a onClick={logout} className="hover:cursor-pointer lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">LOG OUT</a>
      
          </>
        ) : (
          <>
          <Link href="/products">
          <a className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
            PRODUCTS
          </a>
        </Link>

        <Link href="/login">
          <a className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
            LOGIN
          </a>
        </Link>

        <Link href="/register">
          <a className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
            REGISTER
          </a>
        </Link>

        <Link href="/contact">
          <a className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-black hover:text-white">
            CONTACT
          </a>
        </Link>
      </>
    )}        
    </div>
    </div>
    </header>
  );
};

export default Navbar;