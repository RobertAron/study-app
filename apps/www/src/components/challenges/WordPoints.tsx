import { useWordPracticeCount } from "@/utils/playerState";

export function WordExperience({
  characters,
  pinyin,
  id,
  meaning,
}: {
  characters: string;
  pinyin: string;
  id: number;
  meaning: string;
}) {
  const practiceCount = useWordPracticeCount(id);
  return (
    <div className="flex flex-col items-start justify-between gap-2 rounded-md border-2 border-black bg-white p-2 sm:flex-row">
      <div className="flex w-full flex-col gap-1">
        <div className="flex justify-between text-4xl">
          <div className="font-bold">{characters}</div>
          <div>x{practiceCount}</div>
        </div>
        <div>{pinyin}</div>
        <div className="min-h-8">{meaning}</div>
      </div>
    </div>
  );
}
