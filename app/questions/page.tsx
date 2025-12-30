import { QuestionList } from '@/components/questions/question-list';
import { DEMO_QUESTIONS } from '@/lib/demo-data';

export default function QuestionsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Question Explorer</h1>
        <p className="text-muted-foreground mt-2">
          Explore AI-generated answers and brand mentions
        </p>
      </div>

      <QuestionList questions={DEMO_QUESTIONS} />
    </div>
  );
}

