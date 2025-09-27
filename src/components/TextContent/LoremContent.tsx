import { cn } from "@/lib/utils";

type LoremContentProps = {
  words?: number;
  className?: string;
};

const LoremContent = ({ words = 50, className }: LoremContentProps) => {
  // Expanded lorem word bank (mix of classic + modern + filler words)
  const loremWords = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
    "veritatis",
    "quasi",
    "architecto",
    "beatae",
    "vitae",
    "dicta",
    "explicabo",
    "nemo",
    "voluptatem",
    "aspernatur",
    "consequuntur",
    "magnam",
    "ratione",
    "sequi",
    "nesciunt",
    "perspiciatis",
    "distinctio",
    "voluptates",
    "deleniti",
    "corrupti",
    "dignissimos",
    "necessitatibus",
    "corporis",
    "recusandae",
    "temporibus",
    "repudiandae",
    "illum",
    "voluptatum",
    "molestiae",
    "praesentium",
    "facere",
    "suscipit",
    "voluptatibus",
    "earum",
    "blanditiis",
    "quidem",
    "inventore",
    "eius",
    "aliquid",
    "tempora",
    "quaerat",
    "fuga",
    "nihil",
    "accusantium",
    "eveniet",
    "numquam",
    "exemplum",
    "praesent",
    "similique",
    "officiis",
    "sapiente",
    "commodi",
    "rem",
    "excepturi",
    "ipsa",
    "fugiat",
    "aliquam",
    "atque",
    "doloremque",
    "voluptas",
    "odio",
    "error",
    "adipisci",
    "illum",
    "labores",
    "praesentis",
    "temporibus",
    "maxime",
    "dolorum",
    "provident",
    "repellat",
    "possimus",
  ];

  // Generate lorem ipsum text with sentence structure
  const generateLoremText = (count: number): string => {
    const wordsArr: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * loremWords.length);
      wordsArr.push(loremWords[randomIndex]);
    }

    // Break into sentences of random length (4–12 words)
    const sentences: string[] = [];
    let i = 0;
    while (i < wordsArr.length) {
      const sentenceLength = Math.floor(Math.random() * 9) + 4; // 4–12 words
      const sentenceWords = wordsArr.slice(i, i + sentenceLength);
      if (sentenceWords.length > 0) {
        let sentence = sentenceWords.join(" ");
        sentence =
          sentence.charAt(0).toUpperCase() +
          sentence.slice(1) +
          randomPunctuation();
        sentences.push(sentence);
      }
      i += sentenceLength;
    }

    return sentences.join(" ");
  };

  // Random punctuation for variety
  const randomPunctuation = (): string => {
    const marks = [".", ".", ".", "?", "!"]; // more chances for "."
    return marks[Math.floor(Math.random() * marks.length)];
  };

  return (
    <div className="prose max-w-none">
      <p className={cn(className)}>{generateLoremText(words)}</p>
    </div>
  );
};

export default LoremContent;
