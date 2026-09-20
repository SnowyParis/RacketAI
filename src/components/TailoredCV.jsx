import { Check, Pencil, X } from "lucide-react";

const inputClassName = "p-2 w-45% border border-input outline-none focus:ring-1 focus:ring-ring"

function TailoredCV() {
    return (
        <div className="mx-15 mt-7 mb-10">
            <div className="pb-8 text-center">
                <h1 className="pb-1 text-3xl font-bold">Tailored CV Content</h1>
                <p className="text-md text-muted-foreground">
                    Recommendations for your target role. Accept, edit or reject each one.
                </p>
            </div>

            <Card title="Professional Summary" subtitle="Replace generic adjectives with your actual stack and degree. Recruiters scan the first two lines for role fit." />
            <Card title="Technical Skills" subtitle="Group skills by type, name the database technology explicitly, and drop office software. Only list what you can discuss in an interview." />
            <Card title="Work Experience" subtitle="Add scale and outcome. Numbers make the same true statement far more persuasive to both people and screening tools." />
            <Card title="Projects" subtitle="Describe the problem, the stack and one measurable or concrete result. Link the repository if it is public." />
            <Card title="Education" subtitle="Name the institution, specialisation and completion year. Add relevant modules only if they support the target role." />
        </div>
    );
}

function Card({ title, subtitle }) {
    return (
        <div className="pb-6 flex gap-5 justify-center">
            <div className="bg-card w-230 border border-border">
                <div className="p-4 border-b border-border">
                    <h3 className="pb-1 text-xl font-bold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>

                <div className="p-5 flex gap-5">
                    <div className="flex flex-col gap-3 w-110">
                        <h3 className="font-medium text-xs text-muted-foreground">ORIGINAL</h3>
                        <textarea rows={3} className={`${inputClassName} bg-background`}>
                        </textarea>
                    </div>

                    <div className="flex flex-col gap-3 w-110">
                        <h3 className="font-medium text-xs text-primary">IMPROVED VERSION</h3>
                        <textarea rows={3} className={`${inputClassName} bg-primary-soft`}>
                        </textarea>
                    </div>
                </div>

                <div className="px-5 py-3 flex gap-3 border-t border-border">
                    <a href="#" className="flex px-2 py-1 gap-2 items-center text-primary-foreground bg-success border-2 border-foreground hover:bg-success/90"><Check size={15} /> <span>Accept</span></a>
                    <a href="#" className="flex px-2 py-1 gap-2 items-center text-foreground border-2 border-muted-foreground hover:bg-muted-foreground/20"><Pencil size={15} /> <span>Edit</span></a>
                    <a href="#" className="flex px-2 py-1 gap-2 items-center text-muted-foreground hover:bg-muted-foreground/10"><X size={15} /> <span>Reject</span></a>
                </div>
            </div>
        </div>
    );
}

export default TailoredCV;