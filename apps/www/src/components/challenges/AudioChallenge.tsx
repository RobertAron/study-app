"use client";
import { RotateCcw } from "lucide-react";
import { type Ref, useEffect, useRef } from "react";
import { useAudioSourceNode, useKeyTrigger } from "@/utils/hooks";
import { LiveAudioVisualizer } from "../AudioVisualizer";
import { Kbd } from "../Kbd";
import { ChallengeWrapper } from "./ChallengeWrapper";
import { WordProgress } from "./WordProgress";

type AudioChallengeProps = {
  pinyin: string;
  onComplete?: () => void;
  active?: boolean;
  practice?: boolean;
  src: string;
  ref?: Ref<HTMLDivElement>;
};

export function AudioChallenge({ pinyin, onComplete, active, practice, ref, src }: AudioChallengeProps) {
  return (
    <ChallengeWrapper active={active} ref={ref}>
      <ChallengeAudioPlayer src={src} slow={practice} />
      <WordProgress pinyin={pinyin} active={active} practice={practice} onComplete={onComplete} />
    </ChallengeWrapper>
  );
}

export function ChallengeAudioPlayer({ src, slow }: { src: string; slow?: boolean }) {
  const audioRef = useRef<HTMLMediaElement>(null!);
  const { audioSourceNode, playAudio } = useAudioSourceNode(audioRef);
  useEffect(() => {
    audioRef.current.playbackRate = slow ? 0.7 : 1;
  }, [slow]);
  useKeyTrigger("Enter", playAudio);
  return (
    <>
      <audio ref={audioRef} src={src} autoPlay crossOrigin="anonymous" />
      <div className="grid-stack h-36 w-full">
        <div className="grid-stack-item z-10 m-1 self-start justify-self-end md:justify-self-start">
          <button
            type="button"
            className="group flex items-center gap-4 rounded-lg border border-black hocus:border-slate-300 bg-white/30 hocus:bg-black p-2 hocus:text-white text-sm backdrop-blur-sm"
            onClick={playAudio}
          >
            <RotateCcw className="h-4 w-4" />
            <div className="hidden gap-1 md:flex">
              <Kbd>⌘</Kbd>
              <Kbd>↵</Kbd>
            </div>
          </button>
        </div>
        <div className="grid-stack-item h-full w-full">
          {audioSourceNode !== null && <LiveAudioVisualizer mediaSource={audioSourceNode} width={700} />}
        </div>
      </div>
    </>
  );
}
