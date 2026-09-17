import { Hammer, Upload, FileText, Trash, FileCheckCorner, PencilSparkles, FileSearch, Mail, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
    {
        icon: FileSearch,
        title: "Analyse CV",
    },
    {
        icon: PencilSparkles,
        title: "Tailored CV",
    },
    {
        icon: Mail,
        title: "Cover Letter",
    },
];


function AnalyseCV() {
    return (
        <div className="m-8">
            <div className="flex gap-15">
                <aside className="flex justify-center p-3 sticky top-0 w-50 h-fit bg-sidebar border border-border">
                    <div className="">
                        {items.map((item, index) => (
                            <span key={index} className="flex gap-2 my-2 px-2 py-1 items-center text-md text-muted-foreground hover:bg-muted-foreground/10">
                                <item.icon size={20} />
                                {item.title}
                            </span>
                        ))}
                    </div>
                </aside>

                <div>
                    <div className="pb-5">
                        <h1 className="pb-1 text-3xl font-bold">Analyse Your Job Match</h1>
                        <p className="text-md text-muted-foreground">
                            Upload your CV and paste a job description and to see how well it matches the job description.
                        </p>
                    </div>

                    <div className="flex gap-5">
                        <div className="bg-card w-120 border border-border">
                            <div className="p-4 border-b border-border">
                                <h3 className="pb-1 text-xl font-bold">Your CV</h3>
                                <p className="text-md text-muted-foreground">PDF or DOCX, up to 10 MB.</p>
                            </div>

                            <div className="flex flex-col py-10 items-center m-5 gap-5 bg-background border-2 border-dashed">
                                <Upload size={20} className="mb-2 text-accent-foreground bg-card rounded-lg w-9 h-9 p-2" />

                                <div className="text-center">
                                    <h3 className="pb-1 text-xl font-bold text-center">Upload your CV</h3>
                                    <p className="text-md text-muted-foreground">Drag and drop your CV here</p>
                                    <p className="pt-2 text-md text-muted-foreground">or</p>
                                </div>

                                <label class="block">
                                    <span class="sr-only">Choose File</span>
                                    <input type="file" class="block w-full text-sm text-muted-foreground
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border
                                file:text-sm file:font-semibold
                              file:bg-blue-50 file:text-accent-foreground
                              file:hover:bg-blue-100
                                cursor-pointer"
                                    />
                                </label>

                                <p className="mt- 2 text-xs text-muted-foreground">Supported formats: PDF, DOCX · Maximum size: 10 MB</p>

                            </div>
                        </div>

                        <div className="bg-card w-120 border border-border">
                            <div className="p-4 border-b border-border">
                                <h3 className="pb-1 text-xl font-bold">Job Description</h3>
                                <p className="text-md text-muted-foreground">Paste the job description as published here.</p>
                            </div>

                            <div className="m-5">
                                <span className="text-md font-display">Job Description</span>
                                <textarea rows={10} placeholder="Paste the job description here..." className="mt-2 p-4 w-110 border border-input outline-none focus:ring-1 focus:ring-ring">
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <Link
                    to="/analyse-cv"
                    aria-label="Analyse my CV"
                    className="font-medium w-35 mt-4 px-3 py-2 border-2 border-secondary-foreground hover:bg-muted-foreground/10 transition">
                    Analyse my CV
                </Link>
            </div >
        </div >
    );
}

export default AnalyseCV;