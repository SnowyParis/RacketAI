import { Hammer } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const nav = [
    { to: "/features", label: "Features" },
    { to: "/works", label: "How It Works" },
    { to: "/about", label: "About" },
];

function Header() {
    // const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <header className="sticky top-0 z-50 px-15 glass border-b border-border/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-18 items-center justify-between py-4">
                    <Link to="/" className="flex items-center gap-2">
                        <Hammer size={20} className="text-primary-foreground bg-primary w-8 h-8 p-2" />

                        <span className="font-display text-xl font-bold tracking-tight">
                            RacketAI
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        {nav.map((item) => {
                            const active =
                                item.to === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.to);

                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`relative text-muted-foreground text-[1rem] font-medium transition-colors hover:text-secondary-foreground ${active ? "text-primary" : "text-foreground/80"}`}
                                >
                                    {item.label}

                                    {/* {active && (
                                        <motion.span
                                            layoutId="nav-underline"
                                            className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                                        />
                                    )} */}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-1">
                        <Link
                            to="/login"
                            aria-label="Login"
                            className="px-3 py-2 font-medium rounded-lg text-muted-foreground hover:bg-muted-foreground/10 transition"
                        >
                            Log In
                        </Link>

                        <Link
                            to="/signup"
                            aria-label="Signup"
                            className="ml-1 px-3 py-2 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition"
                        >
                            Get Started
                        </Link>

                        {/* <button
                            aria-label="Menu"
                            onClick={() => setOpen((prev) => !prev)}
                            className="lg:hidden grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:bg-secondary/60"
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button> */}
                    </div>
                </div>
            </div>

            {/* the dropdown navbar on smaller screens */}
            {/* {open && (
                <div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="lg:hidden overflow-hidden border-t border-border/40 bg-background/95"
                >
                    <div className="flex flex-col p-4 gap-1">
                        {nav.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-secondary/60"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )} */}
        </header>
    );
}

export default Header;
