import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="">
            <section className="mx-25 my-20">
                <div className="">
                    <div className="flex flex-col gap-5 text-center items-center">
                        <h1 className="text-5xl font-bold w-210 leading-13">Land Your Next Job With an AI-Powered Application Assistant</h1>
                        <p className="text-lg text-muted-foreground w-130">
                            Analyse your CV against any job description, discover skill gaps, generate tailored applications, prepare for interviews,
                            and track every application in one place.
                        </p>

                        <Link 
                            // to="/signup"
                            aria-label="Analyse my CV" 
                            className="font-medium w-35 mt-4 px-3 py-2 border-2 border-secondary-foreground">Analyse my CV
                        </Link>
                    </div>
                </div>
                    
            </section>

            <section className="flex items-center">
                <div className="relative  m-23 p-6 w-150 h-100 bg-card shadow-md border-1 border-border">
                    <h3 className="text-muted-foreground font-medium">Frontend Developer — TechCorp</h3>
                    <div className="absolute top-7 right-7 px-2 py-1 w-17 rounded-lg text-sm text-primary bg-primary/20">Analysis</div>
                </div>
            </section>

            <section className="bg-destructive-foreground border-1 border-border">
                <div>
                    <h1>Everything your application needs</h1>
                    <p>One workspace for matching, improving, writing, practising and tracking.</p>
                </div>

            </section>
        </div>
    );
}

export default Home;