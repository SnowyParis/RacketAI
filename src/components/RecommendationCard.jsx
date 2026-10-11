function RecommendationCard({
  recommendation,
}) {
  return (
    <article>
      <h4>
        {recommendation.title}
      </h4>

      <p>
        {recommendation.description}
      </p>

      <span>
        {recommendation.priority}
      </span>
    </article>
  );
}

export default RecommendationCard;