const inputClassName = "p-2 w-full border border-input outline-none focus:ring-1 focus:ring-ring"
const labelClassName = "pt-4 pb-2 text-md font-medium";

function CoverLetter() {
    return (
        <div className="mx-15 my-7">
            <div className="pb-5">
                <h1 className="pb-1 text-3xl font-bold">AI Cover Letter Generator</h1>
                <p className="text-md text-muted-foreground">
                    Give the role details, pick a tone, and edit the result until it sounds like you.
                </p>
            </div>

            <div className="flex gap-5">
                <div className="bg-card w-100 border border-border">
                    <div className="p-4 border-b border-border">
                        <h3 className="pb-1 text-xl font-bold">Letter details</h3>
                    </div>

                    <form className="p-5">
                        <div className="flex flex-col">
                            <label className="pb-2 text-md font-medium">Job title</label>
                            <input className={inputClassName} placeholder="e.g. Frontend Developer" />

                            <label className={labelClassName}>Company</label>
                            <input className={inputClassName} placeholder="e.g. TechCorp" />

                            <label className={labelClassName}>Hiring manager (optional)</label>
                            <input className={inputClassName} placeholder="e.g. Thando Nkosi" />

                            <label className={labelClassName}>Tone</label>
                            <select className={inputClassName}>
                                <option>Professional</option>
                                <option>Friendly</option>
                                <option>Confident</option>
                                <option>Concise</option>
                            </select>

                            <label className={labelClassName}>Additional information (optional)</label>
                            <textarea rows={3} placeholder="Anything specific you want mentioned such as availability, relocation, a referral, etc." className={inputClassName}>
                            </textarea>

                            <label className="pt-4 pb-2 text-md inline-flex gap-2 items-center">
                                <input type="checkbox" className="w-4 h-4 accent-primary" />
                                Use my CV analysis
                            </label>

                            <div className="mt-4 flex justify-center">
                                <a
                                    // to="/analyse-cv"
                                    href="#"
                                    type="submit"
                                    aria-label="Generate Cover Letter"
                                    className="font-medium w-48 mt-4 px-3 py-2 border-2 border-secondary-foreground hover:bg-muted-foreground/10 transition">
                                    Generate Cover Letter
                                </a>
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
                            <h3 className="pb-1 text-xl text-center font-medium">No cover letter yet</h3>
                            <p className="text-md text-center text-muted-foreground">Fill in the role details on the left and generate a first draft you can edit.</p>
                        </div>

                        <a
                            // to="/analyse-cv"
                            href="#"
                            aria-label="Generate Cover Letter"
                            className="font-medium w-48 mt-4 px-3 py-2 border-2 border-secondary-foreground hover:bg-muted-foreground/10 transition">
                            Generate Cover Letter
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoverLetter;