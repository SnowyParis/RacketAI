import {
    BriefcaseBusiness,
    Target,
    CalendarClock,
    Trophy,
    TrendingUp,
    TrendingDown
} from "lucide-react";

const stats = [
    {
        title: "Applications",
        icon: BriefcaseBusiness,
        value: "6",
        description: <span className="flex gap-1 text-xs">
            <TrendingUp size={16} className="text-success" />
            <span>+12% this month</span>
        </span>
    },
    {
        title: "Average Match Score",
        icon: Target,
        value: "83%",
        description: <span className="flex gap-1 text-xs">
            <TrendingUp size={16} className="text-success" />
            <span>+6% this month</span>
        </span>
    },
    {
        title: "Interviews",
        icon: CalendarClock,
        value: "2",
        description: "2 upcoming"
    },
    {
        title: "Offers",
        icon: Trophy,
        value: "1",
        description: "Keep going!"
    },
];

const submissions = [
    {
        company: "TechCorp",
        role: "Frontend Developer",
        match: "91%",
        status: "Interview",
        applied: "2026-09-03",
        action: "View",
    },
    {
        company: "Average Match Score",
        role: "Junior Software Developer",
        match: "83%",
        status: "Applied",
        applied: "2026-09-01",
        action: "View",
    },
    {
        company: "Interviews",
        role: "Junior Data Analyst",
        match: "92%",
        status: "Screening",
        applied: "2026-08-29",
        action: "View",
    },
];

const thClassName = "font-medium text-[0.8rem]";
const tdClassName = "";

function Dashboard() {

    return (
        <div className="mx-auto my-10 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">Good afternoon, Alex 👋</h1>
            <p className="text-md text-muted-foreground">Ready to improve your next application?</p>

            <div className="mt-10 grid gap-8 grid-cols-1 min-[700px]:grid-cols-2 min-[880px]:grid-cols-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col p-4 w-55 bg-card rounded-xl border border-border">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground font-display">{stat.title}</span>
                            <stat.icon size={20} className="mb-2 text-accent-foreground bg-primary-soft rounded-xl w-8 h-8 p-2" />
                        </div>

                        <span className="text-3xl text-card-foreground font-bold">{stat.value}</span>
                        <p className="pt-2 text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 px-5 pt-4 bg-card border border-border">
                <h3 className="text-lg font-semibold">Recent applications</h3>
                <p className="pt-1 pb-4 text-[0.95rem] text-muted-foreground">Your latest submissions and where they stand.</p>

                <table class="table-auto w-full border-b border-t border-border">
                    <thead className="text-md text-left text-muted-foreground border-b">
                        <tr>
                            <th className={`py-2 ${thClassName}`}>COMPANY</th>
                            <th className={thClassName}>ROLE</th>
                            <th className={thClassName}>MATCH</th>
                            <th className={thClassName}>STATUS</th>
                            <th className={thClassName}>APPLIED</th>
                            <th className={thClassName}>ACTIONS</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={index} className="text-md text-left border-b">
                                <td className="py-4">{submission.company}</td>
                                <td className="text-muted-foreground">{submission.role}</td>
                                <td className="font-medium">{submission.match}</td>
                                <td> 
                                    <span className="flex gap-1 px-2 py-1 w-20 h-7 items-center rounded-lg text-accent-foreground bg-primary-soft">
                                        <span className="text-2xl">•</span>
                                        <span className="text-xs">{submission.status}</span>
                                    </span>
                                </td>
                                <td className="text-muted-foreground">{submission.applied}</td>
                                <td className="text-muted-foreground"><a className="p-2 rounded-md hover:bg-muted-foreground/10" href="#">{submission.action}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-semibold">Recent applications</h3>
            </div>
        </div>
    );
}

export default Dashboard;