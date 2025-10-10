"use client";
import React from "react";
import dynamic from 'next/dynamic';

// Client wrapper is lazy-loaded to keep this route a true server component
const HomeClient = dynamic(() => import('@/components/home-client'), { ssr: false });

export default function HomePage() {
  return <HomeClient />;
}