'use client';

import WeddingTimeline from '@/components/WeddingTimeline';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <WeddingTimeline />
      </div>
    </main>
  );
}
