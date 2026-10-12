import { generateCoverLetter } from "../services/aiAPI.js";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

const inputClassName = "p-2 w-full border border-input outline-none focus:ring-1 focus:ring-ring"
const labelClassName = "pt-4 pb-2 text-md font-medium";

const initialForm = {
  jobTitle: "",
  company: "",
  hiringManager: "",
  tone: "Professional",
  additionalInfo: "",
  useCVAnalysis: false,
};

function CoverLetter() {
    const [form, setForm] = useState(initialForm);
    const [cvFile, setCvFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

      function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleGenerate(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.jobTitle.trim() || !form.company.trim()) {
      setError("Please enter the job title and company.");
      return;
    }

    if (form.useCVAnalysis && !sessionStorage.getItem("racketAIAnalysis")) {
      setError(
        "No saved CV analysis was found. Analyse your CV first or untick this option."
      );
      return;
    }

    try {
      setLoading(true);
      setCoverLetter("");

      const savedAnalysis = form.useCVAnalysis
        ? JSON.parse(sessionStorage.getItem("racketAIAnalysis"))
        : null;

      const response = await generateCoverLetter({
        cvFile,
        ...form,
        cvAnalysis: savedAnalysis,
      });

      setCoverLetter(response.data.coverLetter);
      setSuccess("Your cover letter has been generated.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to generate your cover letter. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }


  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setSuccess("Cover letter copied to clipboard.");
    } catch {
      setError("Could not copy the letter. Please select and copy it manually.");
    }
  }

  function handleDownload() {
    const blob = new Blob([coverLetter], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "cover-letter.txt";
    link.click();

    URL.revokeObjectURL(url);
  }

    return (
        <div className="mx-15 mt-7 mb-10">
            <div className="pb-8 text-center">
                <h1 className="pb-1 text-3xl font-bold">AI Cover Letter Generator</h1>
                <p className="text-md text-muted-foreground">
                    Give the role details, pick a tone, and edit the result until it sounds like you.
                </p>
            </div>

            <div className="flex gap-5 justify-center">
                <div className="bg-card w-100 border border-border">
                    <div className="p-4 border-b border-border">
                        <h3 className="pb-1 text-xl font-bold">Letter details</h3>
                    </div>

                    <form className="p-5" onSubmit={handleGenerate}>
                        <div className="flex flex-col">
                            <label htmlFor="jobTitle" className="pb-2 text-md font-medium">Job title</label>
                            <input id="jobTitle" 
                                className={inputClassName} 
                                placeholder="e.g. Frontend Developer"
                                value={form.jobTitle}
                                onChange={handleChange} 
                                required
                            />

                            <label htmlFor="company" className={labelClassName}>Company</label>
                            <input id="company" 
                                className={inputClassName} 
                                placeholder="e.g. TechCorp"
                                value={form.company}
                                onChange={handleChange} 
                                required
                            />

                            <label htmlFor="hiringManager" className={labelClassName}>Hiring manager (optional)</label>
                            <input id="hiringManager"
                                className={inputClassName} 
                                placeholder="e.g. Thando Nkosi"
                                value={form.hiringManager}
                                onChange={handleChange} 
                            />

                            <label htmlFor="tone" className={labelClassName}>Tone</label>
                            <select id="tone"
                                className={inputClassName}
                                value={form.tone}
                                onChange={handleChange}
                            >
                                <option>Professional</option>
                                <option>Friendly</option>
                                <option>Confident</option>
                                <option>Concise</option>
                            </select>

                            <label  htmlFor="additionalInfo" className={labelClassName}>Additional information (optional)</label>
                            <textarea id="additionalInfo"
                                rows={3} 
                                placeholder="Anything specific you want mentioned such as availability, relocation, a referral, etc." 
                                className={inputClassName}
                                value={form.additionalInfo}
                                onChange={handleChange}
                            >
                            </textarea>

                            <label className="pt-4 pb-2 text-md inline-flex gap-2 items-center">
                                <input type="checkbox" 
                                    className="w-4 h-4 accent-primary"
                                    checked={form.useCVAnalysis}
                                    onChange={handleChange} 
                                />
                                Use my CV analysis
                            </label>

                            {form.useCVAnalysis && (
                                <p className="text-xs text-muted-foreground">
                                    Your previously saved CV analysis will be used.
                                </p>
                            )}

                            <div className="mt-4 flex justify-center">
                                <button
                                    className="outline-button generate-button"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Generating..." : "Generate Cover Letter"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="bg-card w-150 border border-border">
                    <div className="p-4 border-b border-border">
                        <h3 className="pb-1 text-xl font-bold">Cover Letter</h3>
                    </div>

                    <div className="flex flex-col gap-4 p-5 items-center">
                        <div>
                            {loading ? (
                                <div className="">
                                    <ClipLoader
                                        loading={loading}
                                        size={150}
                                        aria-label="Loading Spinner"
                                    />
                                    <h3>Writing your cover letter...</h3>
                                    <p>Preparing a draft for your application.</p>
                                </div>
                            ) : coverLetter ? (
                                <div className="">
                                    <p className="">
                                        Review the draft and make any changes before using it.
                                    </p>

                                    <textarea
                                        className=""
                                        aria-label="Edit generated cover letter"
                                        value={coverLetter}
                                        onChange={(event) =>
                                        setCoverLetter(event.target.value)
                                        }
                                        rows={20}
                                    />

                                    <div className="">
                                        <button
                                        className=""
                                        type="button"
                                        onClick={handleCopy}
                                        >
                                            Copy Letter
                                        </button>

                                        <button
                                        className=""
                                        type="button"
                                        onClick={handleDownload}
                                        >
                                            Download.txt
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="pb-1 text-xl text-center font-medium">No cover letter yet</h3>
                                    <p className="text-md text-center text-muted-foreground">Fill in the role details on the left and generate a first draft you can edit.</p>
                                </div>
                            )}
                        </div>

                        {/* <a
                            href="#"
                            aria-label="Generate Cover Letter"
                            onClick={handleGenerate()}
                            className="font-medium w-48 mt-4 px-3 py-2 border-2 border-secondary-foreground hover:bg-muted-foreground/10 transition">
                            Generate Cover Letter
                        </a> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoverLetter;