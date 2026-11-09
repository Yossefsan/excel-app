/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { PhoneSimulator } from './components/PhoneSimulator';
import { DeliverablesHub } from './components/DeliverablesHub';
import { AiaExplorer } from './components/AiaExplorer';
import { AssetGallery } from './components/AssetGallery';
import { CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'downloads' | 'explorer' | 'assets'>('simulator');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  return (
    <div className="min-h-screen bg-[#F5F8F6] flex flex-col font-sans text-[#1F2933]">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPhoneFrame={isPhoneFrame}
        setIsPhoneFrame={setIsPhoneFrame}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-6">
        {activeTab === 'simulator' && (
          <PhoneSimulator
            isPhoneFrame={isPhoneFrame}
            onOpenDeliverables={() => setActiveTab('downloads')}
          />
        )}

        {activeTab === 'downloads' && <DeliverablesHub />}

        {activeTab === 'explorer' && <AiaExplorer />}

        {activeTab === 'assets' && <AssetGallery />}
      </main>

      {/* Bottom Footer */}
      <footer className="bg-white border-t border-[#E1E9E3] py-6 text-center text-xs text-[#68756D] space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#33A852]" />
            <span className="font-semibold text-[#185C37]">
              مشروع كودولار المطور: Excel_Learning_Hub.aia (إصدار 2.0)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>تم الحفاظ على كافة الشروحات الأصلية للدوال الـ 11</span>
            <span>•</span>
            <span className="text-[#217346] font-bold">تم تصحيح تصنيف دالة MAX للحسابية</span>
          </div>

          <div className="flex items-center gap-1 text-[#68756D]">
            <span>صمم لـ Kodular Creator و MIT App Inventor</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
