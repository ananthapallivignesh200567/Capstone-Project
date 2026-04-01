'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from '@/lib/i18n';

export const SwissGrid = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-black">{t('nav.dashboard')}</h1>
          <p className="mt-2 text-sm font-semibold text-blue-700">
            {'// '}
            {t('dashboard.selectModule')}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {children}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            href="/settings"
            className="inline-flex items-center justify-center px-6 py-2 border border-gray-200 rounded-md bg-orange-500 text-black shadow-sm hover:bg-orange-400 transition-colors min-w-[140px]"
          >
            {t('nav.settings')}
          </Link>
        </div>
      </main>
    </div>
  );
};
