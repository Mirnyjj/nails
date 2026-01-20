'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Что-то пошло не так</h1>
        <p className="text-white/70 mb-6">{error.message || 'Произошла непредвиденная ошибка'}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
