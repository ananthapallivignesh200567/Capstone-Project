'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/i18n';

export default function Hero() {
  const { t } = useTranslations();

  const gridSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'>
  <path d='M0 0H40' stroke='#1d4ed8' stroke-opacity='0.15' stroke-width='1' fill='none'/>
  <path d='M0 0V40' stroke='#1d4ed8' stroke-opacity='0.15' stroke-width='1' fill='none'/>
  </svg>`;
  const gridBackground = `url("data:image/svg+xml,${encodeURIComponent(gridSvg)}")`;

  const buttonClass =
    'group relative border border-black bg-transparent px-8 py-3 font-mono text-sm font-bold uppercase text-blue-700 transition-all duration-200 ease-in-out hover:bg-blue-700 hover:text-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-0 active:translate-y-0 active:shadow-none cursor-pointer';

  return (
    <section
      className="h-screen w-full p-4 md:p-12 lg:p-24 bg-gray-50"
      style={{
        backgroundImage: gridBackground,
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center border border-gray-200 text-blue-700 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,0.06)] rounded-2xl">
        <h1 className="mb-12 text-center font-mono text-6xl font-bold uppercase leading-none tracking-tighter md:text-8xl lg:text-9xl selection:bg-blue-700 selection:text-white">
          {t('home.brandLine1')}
          <br />
          {t('home.brandLine2')}
        </h1>

        <div className="flex flex-col gap-4 md:flex-row md:gap-12">
          <a
            href="https://github.com/srbhr/Resume-Matcher"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            GitHub
          </a>
          <a
            href="https://resumematcher.fyi"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            {t('home.docs')}
          </a>
          <Link href="/dashboard" className={buttonClass}>
            {t('home.launchApp')}
          </Link>
        </div>
      </div>
    </section>
  );
}
