import { Hammer, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const nav = [
    { to: "/features", label: "Features" },
    { to: "/works", label: "How It Works" },
    { to: "/about", label: "About" },
];

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 px-7 sm:px-15 backdrop-blur-2xl border-b border-border">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-18 items-center justify-between py-4">
                    <Link to="/" className="flex items-center gap-2">
                        <Hammer size={23} className="text-foreground w-9 h-9 p-2 border-2 border-secondary-foreground" />

                        <span className="font-display text-xl font-bold tracking-tight">
                            RacketAI
                        </span>
                    </Link>

                    <nav className="hidden min-[860px]:flex items-center gap-8">
                        {nav.map((item) => {
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={`relative text-muted-foreground text-[1rem] font-medium transition-colors hover:text-secondary-foreground`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-1">
                        <Link
                            to="/login"
                            aria-label="Login"
                            className="hidden min-[590px]:block px-3 py-2 font-medium text-muted-foreground hover:bg-muted-foreground/10 transition"
                        >
                            Log In
                        </Link>

                        <Link
                            to="/signup"
                            aria-label="Signup"
                            className="hidden min-[590px]:block ml-1 px-3 py-2 font-medium border-2 border-secondary-foreground hover:bg-muted-foreground/10 transition"
                        >
                            Get Started
                        </Link>

                        <button
                            aria-label="Menu"
                            onClick={() => setOpen((prev) => !prev)}
                            className="min-[860px]:hidden ml-7 grid h-10 w-10 place-items-center text-foreground/70 hover:bg-muted-foreground/10"
                        >
                            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* the dropdown navbar on smaller screens */}
            {open && (
                <div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="min-[860px]:hidden overflow-hidden border-t border-border/40 bg-background/95"
                >
                    <div className="flex flex-col p-4 gap-1">
                        {nav.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                className="px-3 py-2.5 text-md font-medium hover:bg-muted-foreground/10"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="min-[590px]:hidden max-[380px]:flex-col flex  pt-3 gap-1 border-t-1 border-muted-foreground/20">
                            <Link
                                to="/login"
                                aria-label="Login"
                                className="px-3 py-2 max-[380px]:w-29 font-medium text-muted-foreground hover:bg-muted-foreground/10 transition"
                            >
                                Log In
                            </Link>

                            <Link
                                to="/signup"
                                aria-label="Signup"
                                className="ml-1 px-3 py-2 max-[380px]:w-29 font-medium border-2 border-secondary-foreground hover:bg-muted-foreground/10 transition"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
