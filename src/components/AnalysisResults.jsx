import RecommendationCard from "./RecommendationCard";

function AnalysisResults({ analysis }) {
  return (
    <section>
      <h2>Analysis Results</h2>

      <p>
        {analysis.summary}
      </p>

      <section>
        <h3>Strong Skills</h3>

        <ul>
          {analysis.strongSkills?.map(
            (skill, index) => (
              <li key={index}>
                {skill}
              </li>
            )
          )}
        </ul>
      </section>

      <section>
        <h3>Missing Skills</h3>

        <ul>
          {analysis.missingSkills?.map(
            (skill, index) => (
              <li key={index}>
                {skill}
              </li>
            )
          )}
        </ul>
      </section>

      <section>
        <h3>Recommendations</h3>

        {analysis.recommendations?.map(
          (recommendation, index) => (
            <RecommendationCard
              key={index}
              recommendation={recommendation}
            />
          )
        )}
      </section>

      <section>
        <h3>ATS Suggestions</h3>

        <ul>
          {analysis.atsSuggestions?.map(
            (suggestion, index) => (
              <li key={index}>
                {suggestion}
              </li>
            )
          )}
        </ul>
      </section>
    </section>
  );
}

export default AnalysisResults;