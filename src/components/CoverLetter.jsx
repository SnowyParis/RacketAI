const inputClassName = "p-2 w-50 border border-input outline-none focus:ring-1 focus:ring-ring"
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
                <div className="bg-card w-120 border border-border">
                    <div className="p-4 border-b border-border">
                        <h3 className="pb-1 text-xl font-bold">Letter details</h3>
                    </div>

                    <form className="p-4">
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
                            <textarea rows={4} placeholder="Anything specific you want mentioned such as availability, relocation, a referra, etc." className="mt-2 p-4 w-110 border border-input outline-none focus:ring-1 focus:ring-ring">
                            </textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CoverLetter;