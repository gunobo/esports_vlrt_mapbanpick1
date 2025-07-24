// Junggwan Valorant Banpick Tool
// BO1 기준, 정관중학교 로고와 OBS 연동 가능한 구조

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

const maps = [
  'Ascent',
  'Bind',
  'Breeze',
  'Haven',
  'Lotus',
  'Split',
  'Sunset',
];

const JunggwanBanpick = () => {
  const [step, setStep] = useState(0);
  const [teamA, setTeamA] = useState('팀 A');
  const [teamB, setTeamB] = useState('팀 B');
  const [bans, setBans] = useState([]);
  const [selectedMap, setSelectedMap] = useState('');
  const currentTurn = step < 4 ? (step % 2 === 0 ? 'A' : 'B') : null;

  const handleBan = (map) => {
    if (bans.includes(map) || selectedMap) return;
    if (step < 4) {
      setBans([...bans, map]);
      setStep(step + 1);
    } else if (step === 4) {
      const remaining = maps.filter((m) => !bans.includes(m));
      const lastMap = remaining.find((m) => m === map);
      if (lastMap) {
        setSelectedMap(lastMap);
        setStep(step + 1);
      }
    }
  };

  const resetAll = () => {
    setBans([]);
    setSelectedMap('');
    setStep(0);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h1 className="text-3xl font-bold">정관중 이스포츠 밴픽 시스템 (BO1)</h1>
      <div className="flex gap-6 items-center">
        <input
          type="text"
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <span className="font-bold">VS</span>
        <input
          type="text"
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {maps.map((map) => (
          <Card
            key={map}
            className={`p-4 text-center cursor-pointer transition-all border-2 rounded-xl ${
              bans.includes(map)
                ? 'opacity-40 border-red-400'
                : selectedMap === map
                ? 'border-green-500 scale-105'
                : 'hover:border-blue-400'
            }`}
            onClick={() => handleBan(map)}
          >
            <div className="text-xl font-semibold">{map}</div>
            {bans.includes(map) && <X className="mx-auto mt-2 text-red-500" />}
            {selectedMap === map && <Check className="mx-auto mt-2 text-green-500" />}
          </Card>
        ))}
      </div>

      {step < 4 && (
        <div className="text-lg font-medium">
          <span className="text-blue-600">
            {currentTurn === 'A' ? teamA : teamB}
          </span>{' '}
          팀이 밴할 차례입니다. ({step + 1}/4)
        </div>
      )}

      {step === 4 && !selectedMap && (
        <div className="text-lg font-medium text-green-600">
          남은 맵 중 하나를 선택해 주세요.
        </div>
      )}

      {selectedMap && (
        <div className="text-2xl font-bold text-green-700">
          최종 선택 맵: {selectedMap}
        </div>
      )}

      <Button variant="outline" onClick={resetAll} className="mt-4">
        초기화
      </Button>
    </div>
  );
};

export default JunggwanBanpick;
