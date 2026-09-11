import { PencilSparkles, BriefcaseBusiness, MessageCircleQuestionMark, SearchCheck, FileSearch, Target, Check, TriangleAlert } from "lucide-react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";

const features = [
    {
        title: "Analyse Your CV",
        icon: SearchCheck,
        description: "Understand exactly how well your CV matches a job."
    },
    {
        title: "ATS Compatibility",
        icon: Target,
        description: "Get an ATS-style compatibility score based on skills, keywords, experience and qualifications."
    },
    {
        title: "Skill Gap Detection",
        icon: FileSearch,
        description: "Identify important skills and keywords missing from your CV."
    },
    {
        title: "Tailored Applications",
        icon: PencilSparkles,
        description: "Generate job-specific professional summaries and application content."
    },
    {
        title: "Interview Preparation",
        icon: MessageCircleQuestionMark,
        description: "Generate interview questions based on the role and your experience."
    },
    {
        title: "Application Tracking",
        icon: BriefcaseBusiness,
        description: "Track applications, interview stages, deadlines and outcomes."
    },
];

const steps = [
    {
        number: "01",
        title: "Upload Your CV",
        description: "PDF or DOCX, up to 10 MB. Nothing is shared with employers."
    },
    {
        number: "02",
        title: "Paste the Job Description",
        description: "Any advert, from any job board or careers page."
    },
    {
        number: "03",
        title: "AI Analyses Your Match",
        description: "Skills, keywords, experience and qualifications, side by side."
    },
    {
        number: "04",
        title: "Improve, Apply & Track",
        description: "Tailor your CV, write the letter, prepare and follow every stage."
    },
];

const matches = ["Python", "JavaScript", "SQL", "React", "Next.js", ];

const missing = ["AWS", "Docker", "Node.js", ];


function Home() {
    return (
        <div className="">
            <section className="mx-25 mt-20 mb-25">
                <div className="flex flex-col gap-5 text-center items-center">
                    <h1 className="text-5xl font-bold w-210 leading-13">Land Your Next Job With an AI-Powered Application Assistant</h1>
                    <p className="text-lg text-muted-foreground w-130">
                        Analyse your CV against any job description, discover skill gaps, generate tailored applications, prepare for interviews,
                        and track every application in one place.
                    </p>

                    <Link
                        // to="/signup"
                        aria-label="Analyse my CV"
                        className="font-medium w-35 mt-4 px-3 py-2 border-2 border-secondary-foreground">
                            Analyse my CV
                    </Link>
                </div>
            
                <div className="flex my-20 items-center justify-center">
                    <div className="relative p-6 w-150 h-115 bg-card shadow-md border-1 border-border">
                        <h3 className="text-muted-foreground font-medium">Frontend Developer — TechCorp</h3>
                        <div className="absolute top-7 right-7 px-2 py-1 w-17 rounded-lg text-sm text-primary bg-primary/20">Analysis</div>

                        <div className="flex gap-5 items-center pt-5">
                            <div className="w-25 h-25 font-medium text-md">
                                <CircularProgressbar value={82} text={"82%"}
                                    classes={{text: "fill-foreground [text-anchor:middle] [dominant-baseline:central]", path: "stroke-primary transition-all duration-500 ease-in-out", trail: "stroke-background"}}
                                    styles={buildStyles({ strokeLinecap: 'round', textSize: '20px', })}/>
                            </div>

                            <div className="flex flex-col">
                                <h3 className="text-md font-medium">Strong Match</h3>
                                <p className="text-md text-muted-foreground">Your CV matches most core requirements for this role.</p>
                            </div>
                        </div>

                        <div className="pt-5">
                            <h3 className="pt-5 pb-2 text-sm text-muted-foreground font-medium">STRONG MATCH</h3>
                            
                            <div className="flex gap-2">
                                {matches.map((match, index) => (
                                    <span key={index} className="flex gap-1 px-2 py-1 items-center text-sm text-success bg-success/10">
                                        <Check size={15} />
                                        {match}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-5">
                            <h3 className="pb-2 text-sm text-muted-foreground font-medium">MISSING</h3>
                        
                            <div className="flex gap-2">
                                {missing.map((value, index) => (
                                    <span key={index} className="flex gap-1 px-2 py-1 items-center text-sm text-warning bg-warning/10">
                                        <TriangleAlert size={15} />
                                        {value}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 p-3 bg-muted-foreground/10">
                            <h3 className="pb-1 text-sm text-muted-foreground font-medium">SUGGESTED IMPROVEMENT</h3>
                            <p className="text-md">Add measurable achievements to your most recent role.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-30 py-15 bg-destructive-foreground border-1 border-border">
                <div className="text-center items-center">
                    <h1 className="pb-2 text-3xl font-bold">Everything your application needs</h1>
                    <p className="text-md text-muted-foreground">One workspace for matching, improving, writing, practising and tracking.</p>
                </div>

                <div className="mt-10 grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-popover border-1 border-border p-6">
                            <feature.icon size={25} className="mb-2 text-primary bg-primary/10 w-9 h-9 p-2" />
                            <span className="text-md text-foreground font-medium">{feature.title}</span>
                            <p className="pt-2 text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-30 py-15">
                <h1 className="text-3xl font-bold">How it works</h1>

                <div className="mt-10 grid gap-8 md:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col border-t-2 border-border">
                            <span className="pt-4 text-md text-primary font-medium">{step.number}</span>
                            <span className="text-md text-foreground font-medium">{step.title}</span>
                            <p className="pt-2 text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-30 py-15 bg-destructive-foreground border-1 border-border">
                <div className="flex flex-col gap-5 text-center items-center">
                    <h1 className="text-3xl font-bold">Built for honest, effective applications</h1>
                    <p className="w-180 text-md text-muted-foreground">RacketAI never invents degrees, certifications, employers or achievements. It highlights what your CV already supports, shows where the job asks for more, and suggests truthful ways to close the gap.</p>
                
                    <Link
                        // to="/signup"
                        aria-label="Analyse my CV"
                        className="font-medium w-35 mt-2 px-3 py-2 border-2 border-secondary-foreground">
                            Analyse my CV
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;