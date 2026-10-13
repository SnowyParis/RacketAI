import { Hammer, Upload, FileText, Trash, FileCheckCorner, PencilSparkles, FileSearch, Mail, LayoutGrid } from "lucide-react";
// import { analyseCV } from "../services/aiAPI.js";
// import RecommendationCard from "RecommendationCard.jsx"
import AnalysisResults from "AnalysisResults.jsx"
import MatchScore from "MatchScore.jsx"
import { Link } from "react-router-dom";
import { useState } from "react";

function AnalyseCV() {
    const [cv, setCv] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");

    function handleChange(event) {
        const file = event.target.files[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("File must be smaller than 5MB.");
            return;
        }

        setFileName(file.name);
        setCv(file);
    }

    async function handleAnalyse() {
        if (!cvFile) {
            setError("Please upload your CV.");
            return;
        }

        if (!jobDescription.trim()) {
            setError(
                "Please enter the job description."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");
            setAnalysis(null);

            const response = await analyseCV(
            cvFile,
            jobDescription
            );

            setAnalysis(response.data);

            //saves the analysis for the current browser tab
            sessionStorage.setItem(
                "racketAIAnalysis",
                JSON.stringify(response.data)
            );
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to analyse your CV."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="m-8">
            {analysis ?
                <div className="flex flex-col gap-3 items-center">
                    <MatchScore score={analysis.matchScore} />

                    <div className="bg-card w-120 border border-border">
                        <div className="p-4 border-b border-border">
                            <h3 className="pb-1 text-xl font-bold">CV Analysis</h3>
                            <p className="text-md text-muted-foreground">Your analysis results.</p>
                        </div>

                        <div className="m-5">
                            {/* <span className="text-md font-display">Job Description</span> */}
                            <textarea rows={15}
                                value={analysis}
                                className="mt-2 p-4 w-110 border border-input outline-none focus:ring-1 focus:ring-ring">
                            </textarea>
                        </div>
                    </div>

                    <Link
                        to="/analyse-cv"
                        aria-label="Analyse CV"
                        className="px-3 py-2 font-medium border-2 border-secondary-foreground hover:bg-muted-foreground/10 transition"
                    >
                        Analyse CV Again
                    </Link>
                </div>
                :
                <div>
                    <div className="pb-8 text-center">
                        <h1 className="pb-1 text-3xl font-bold">Analyse Your Job Match</h1>
                        <p className="text-md text-muted-foreground">
                            Upload your CV and paste a job description and to see how well it matches the job description.
                        </p>
                    </div>

                    <div className="flex gap-5 justify-center">
                        <div className="bg-card w-120 border border-border">
                            <div className="p-4 border-b border-border">
                                <h3 className="pb-1 text-xl font-bold">Your CV</h3>
                                <p className="text-md text-muted-foreground">PDF or DOCX, up to 10 MB.</p>
                            </div>

                            <div className="flex flex-col py-15 items-center m-5 gap-5 bg-background border-2 border-dashed">
                                <Upload size={20} className="mb-2 text-accent-foreground bg-card rounded-lg w-9 h-9 p-2" />

                                <div className="text-center">
                                    <h3 className="pb-1 text-xl font-bold text-center">Upload your CV</h3>
                                    <p className="text-md text-muted-foreground">Drag and drop your CV here</p>
                                    <p className="pt-2 text-md text-muted-foreground">or</p>
                                </div>

                                <label className="block">
                                    <span className="sr-only">Choose File</span>
                                    <input type="file"
                                        value={cv}
                                        onChange={handleChange}
                                        className="block w-full text-sm text-muted-foreground
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
                                <textarea rows={10}
                                    placeholder="Paste the job description here..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className="mt-2 p-4 w-110 border border-input outline-none focus:ring-1 focus:ring-ring">
                                </textarea>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            aria-label="Analyse my CV"
                            onClick={handleAnalyse}
                            disabled={loading}
                            className="font-medium w-35 mt-4 px-3 py-2 border-2 border-secondary-foreground hover:bg-muted-foreground/10 transition"
                        >
                            {loading
                                ? "Analysing..."
                                : "Analyse CV"}
                        </button>
                    </div>
                </div >
            }
        </div>
    );
}

export default AnalyseCV;