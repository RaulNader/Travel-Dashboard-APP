import { Link, NavLink, useLoaderData, useNavigate } from "react-router";
import { logoutUser } from "~/appwrite/auth";
import { sidebarItems } from "~/constants";
import { cn } from "~/lib/utils";

const Navitems = ({ handleClick }: { handleClick: () => void }) => {
  const user = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/signin");
  };
  return (
    <section className="nav-items  ">
      <Link to="/" className="link-logo">
        <img src="/assets/icons/logo.svg" alt="Logo" className="size-7.5" />
        <h1 className="font-bold tracking-tighter">
          Tra<span className="font-extralight ">verse</span>
        </h1>
      </Link>

      <div className="container">
        <nav>
          {sidebarItems.map(({ id, label, icon, href }) => (
            <NavLink to={href} key={id}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={cn("group nav-item", {
                    "bg-primary-100 text-white!": isActive,
                  })}
                  onClick={handleClick}
                >
                  {label}
                  <img
                    src={icon}
                    alt={label}
                    className={`group-hover:brightness-0 size-0 group-hover:invert ${isActive ? "brightness-0 invert " : "text-dark-200"}`}
                  />
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        <footer className="nav-footer">
          <img
            src={user?.imageUrl}
            alt={user?.name}
            referrerPolicy="no-referrer"
          />
          <article>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </article>
          <button className="cursor-pointer" onClick={handleLogout}>
            <img
              src="/assets/icons/logout.svg"
              alt="Logout"
              className="size-6"
            />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default Navitems;
