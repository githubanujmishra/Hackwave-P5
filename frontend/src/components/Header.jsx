import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { omega } from "../assets/index";
import { omega2 } from "../assets/index";

// When the user is Logged in.
function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-[#96d6d5] fixed w-[100%]">
      <div className="flex justify-between items-center h-[13vh] p-3 px-[5%]">
        <Link to="/">
          <img src={omega} alt="omega" className="h-[8vh]" />
        </Link>

        <ul className="flex gap-20 text-[1.2vw] font-bold uppercase text-white ">
          {currentUser ? (
            <Link to="/create">
              <li>Create</li>
            </Link>
          ) : (
            <Link to="/">
              <li>Home</li>
            </Link>
          )}

          {currentUser ? (
            <Link to="/community">
              <li>Community</li>
            </Link>
          ) : (
            <Link to="/about">
              <li>About</li>
            </Link>
          )}
          {currentUser ? (
            <Link to="/profile">
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link to="/profile">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
