'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface UsageStats {
  geminiUsage: number;
  geminiLimit: number;
  exportsToday: number;
  exportLimit: number;
}

export function UsageTracker() {
  const [usage, setUsage] = useState<UsageStats>({
    geminiUsage: 0,
    geminiLimit: 100,
    exportsToday: 0,
    exportLimit: 50
  });

  useEffect(() => {
    // Load usage from localStorage
    const savedUsage = localStorage.getItem('ai-generator-usage');
    if (savedUsage) {
      setUsage(JSON.parse(savedUsage));
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateUsage = (type: 'generation' | 'export') => {
    setUsage(prev => {
      const newUsage = {
        ...prev,
        ...(type === 'generation' 
          ? { geminiUsage: prev.geminiUsage + 1 }
          : { exportsToday: prev.exportsToday + 1 }
        )
      };
      localStorage.setItem('ai-generator-usage', JSON.stringify(newUsage));
      return newUsage;
    });
  };

  const geminiPercentage = (usage.geminiUsage / usage.geminiLimit) * 100;
  const exportPercentage = (usage.exportsToday / usage.exportLimit) * 100;

  return (
    <Card className="w-full bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <CheckCircle className="h-5 w-5 text-green-400" />
          Daily Usage Limits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2 text-white">
            <span>Assignments Generated</span>
            <span>{usage.geminiUsage}/{usage.geminiLimit}</span>
          </div>
          <Progress value={geminiPercentage} className="h-2" />
          {geminiPercentage > 80 && (
            <div className="flex items-center gap-1 text-orange-400 text-xs mt-1">
              <AlertTriangle className="h-3 w-3" />
              Approaching daily limit
            </div>
          )}
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-2 text-white">
            <span>Documents Downloaded</span>
            <span>{usage.exportsToday}/{usage.exportLimit}</span>
          </div>
          <Progress value={exportPercentage} className="h-2" />
          {exportPercentage > 80 && (
            <div className="flex items-center gap-1 text-orange-400 text-xs mt-1">
              <AlertTriangle className="h-3 w-3" />
              Approaching daily limit
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}