import { RecommendationList } from '@/components/suggestions/recommendation-list';
import { DEMO_RECOMMENDATIONS } from '@/lib/demo-data';

export default function SuggestionsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Suggestions & Actions</h1>
        <p className="text-muted-foreground mt-2">
          Prioritized recommendations for improving GEO performance
        </p>
      </div>

      <RecommendationList recommendations={DEMO_RECOMMENDATIONS} />
    </div>
  );
}

