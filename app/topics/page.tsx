import { TopicList } from '@/components/topics/topic-list';
import { DEMO_TOPICS } from '@/lib/demo-data';

export default function TopicsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Topic Intelligence</h1>
        <p className="text-muted-foreground mt-2">
          Analyze visibility and sentiment by topic
        </p>
      </div>

      <TopicList topics={DEMO_TOPICS} />
    </div>
  );
}

