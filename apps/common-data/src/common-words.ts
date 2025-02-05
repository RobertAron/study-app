import type { WordDefinition } from "./types.js";
import { PrismaClient } from "cms-db";

export const commonWords = (
  [
    ["1", "你好", "nǐhǎo", "interj.", "hello; hi", "👋🙂"],
    ["2", "再见", "zàijiàn", "interj.", "bye; goodbye", "👋🙋‍♀️"],
    ["3", "请问", "qǐngwèn", "v.", "please (allow me to) ask; excuse me", "🙏❓"],
    ["4", "知道", "zhīdào", "v.", "to know; to be aware of", "💡🧠"],
    ["5", "好", "hǎo", "adj.", "good", "👍✨"],
    ["6", "谢谢", "xièxie", "v.", "thanks", "🙏😄"],
    ["7", "不客气", "búkèqi", "", "(lit. don't be polite) you’re welcome", "🤗🙌"],
    ["8", "对不起", "duìbuqǐ", "v.", "sorry", "😔🙇‍♀️"],
    ["9", "没关系", "méiguānxi", "", "it doesn’t matter; that’s all right", "👌🤷"],
    ["10", "说", "shuō", "v.", "to say; to speak", "🗣️💬"],
    ["11", "有", "yǒu", "v.", "to have; to own", "🙌👜"],
    ["12", "朋友", "péngyou", "n.", "friend", "👬🤝"],
    ["13", "中文", "Zhōngwén", "n.", "Chinese language", "🇨🇳🀄"],
    ["14", "喂", "wèi", "interj.", "hey; hello (on the phone)", "☎️👋"],
    ["15", "去", "qù", "v.", "to go; to go over", "➡️🏃"],
    ["16", "和", "hé", "conj.", "and", "➕🔗"],
    ["17", "今天", "jīntiān", "n.", "today", "📅☀️"],
    ["18", "人", "rén", "n.", "person; people", "👤👥"],
    ["19", "叫", "jiào", "v.", "to be called", "🙋🗣️"],
    ["20", "名字", "míngzi", "n.", "name", "🏷️❓"],

    ["1", "什么", "shénme", "q.pron.", "what", "❓🤔"],
    ["2", "早上好", "zǎoshang hǎo", "", "(lit. morning good) good morning", "☀️🌅"],
    ["3", "晚安", "wǎn’ān", "", "(lit. evening peace) good night", "🌙😴"],
    ["4", "吃", "chī", "v.", "to eat", "🍽️😋"],
    ["5", "喝", "hē", "v.", "to drink", "🥤😋"],
    ["6", "不用谢", "búyòng xiè", "", "(lit. no use thank) you’re welcome", "NP!"],
    ["7", "哎呀", "āiyā", "interj.", "ah; oh, my; dear me", "😮🤦‍♂️"],
    ["8", "是", "shì", "v.", "to be", "=️⃣"],
    ["9", "对", "duì", "adj.", "correct; right", "🙂‍↕️🙆‍♂️😁"],
    ["10", "汉语", "Hànyǔ", "n.", "(Spoken) Chinese language", "🇨🇳🀄"],
    ["11", "家", "jiā", "n.", "home", "🏠💕"],
    ["12", "很", "hěn", "adv.", "very; pretty; quite", "🌟✨"],
    ["13", "好", "hǎo", "adj.", "okay", "👍👌"],
    ["1", "的", "de", "p.", "of; possessive marker", "📎🔗"],
    ["15", "来", "lái", "v.", "to come; to come over", "⬅️🏃"],
    ["16", "老师", "lǎoshī", "n.", "teacher", "👩‍🏫👨‍🏫"],
    ["17", "一个", "yí ge", "num.-m.w. phr.", "one thing", "1️⃣"],
    ["18", "水", "shuǐ", "n.", "water", "💧🚰"],
    ["19", "爸爸", "bàba", "n.", "dad", "👪👨"],
    ["20", "妈妈", "māma", "n.", "mom", "👪👩"],

    ["1", "哪儿", "nǎr", "q.pron.", "where", "📍❓"],
    ["2", "喜欢", "xǐhuan", "v.", "to like", "❤️👍"],
    ["3", "车", "chē", "n.", "car; vehicle", "🚗🚙"],
    ["4", "男朋友", "nánpéngyou", "n.", "boyfriend", "👨❤️"],
    ["5", "女朋友", "nǚpéngyou", "n.", "girlfriend", "👩❤️"],
    ["6", "现在", "xiànzài", "n.", "now", "⏰⬇️"],
    ["7", "吗", "ma", "p.", "particle for yes-or-no question", "~❓"],
    ["8", "没有", "méi yǒu", "v. phr.", "to not have; to not own", "∅🫙"],
    ["9", "可以", "kěyǐ", "m.v.", "can (possibly); to be able to", "✅🧑‍🔧"],
    ["10", "多", "duō", "adj.", "much; many", "🔢#"],
    ["11", "洗手间", "xǐshǒujiān", "n.", "bathroom; restroom", "🚽🚪"],
    ["4", "在", "zài", "prep./v.", "at; in; exist", "📍"],
    ["13", "不是", "bú shì", "v. phr.", "not to be", "🚫❌"],
    ["14", "也", "yě", "adv.", "also; too", "➕1️⃣"],
    ["15", "衣服", "yīfu", "n.", "clothes", "👕👚"],
    ["16", "吃饭", "chīfàn", "v. / v. phr.", "to eat meal", "🍛🍜"],
    ["17", "睡觉", "shuìjiào", "v. / v. phr.", "to sleep", "😴🛏️"],
    ["18", "杯", "bēi", "m.w.", "cup; glass", "🥤☕"],
    ["19", "看", "kàn", "v.", "to look at; to watch; to see", "👀📺"],
    ["20", "苹果", "píngguǒ", "n.", "apple", "🍎🍏"],

    ["1", "谁", "shéi", "q.pron.", "who", "❓👤"],
    ["2", "想", "xiǎng", "v.", "desire/want", "🤤🤩"],
    ["3", "要", "yào", "m.v.", "need / want (commanding)", "--*"],
    ["4", "明天见", "míngtiān jiàn", "", "(lit. tomorrow meet) see you tomorrow", "📅👋"],
    ["5", "饿", "è", "adj.", "hungry", "🤤🍴"],
    ["6", "超市", "chāoshì", "n.", "supermarket", "🏬🛒"],
    ["7", "汉字", "Hànzì", "n.", "Chinese character", "🀄🔤"],
    ["8", "呢", "ne", "p.", "used at the end of the sentence to ask a contextual question", "❔🧐"],
    ["9", "狗", "gǒu", "n.", "dog", "🐶🐕"],
    ["10", "猫", "māo", "n.", "cat", "🐱🐈"],
    ["11", "不", "bù", "adv.", "not", "🚫🙅"],
    ["12", "听", "tīng", "v.", "to listen; to listen to", "👂🔊"],
    ["13", "走", "zǒu", "v.", "to leave", "🏃‍♂️🏃‍♀️"],
    ["14", "手机", "shǒujī", "n.", "cellphone; mobile phone", "📱🤳"],
    ["15", "上课", "shàngkè", "v.", "(for students) to attend class; (for teachers) to give class", "🏫👩‍🏫"],
    ["16", "大", "dà", "adj.", "big; giant; huge", "🐘💪"],
    ["17", "小", "xiǎo", "adj.", "small; little", "🐭👶"],
    ["18", "电话", "diànhuà", "n.", "phone; phone call", "☎️📞"],
    ["19", "同事", "tóngshì", "n.", "coworker; colleague", "👥💼"],
    ["20", "同学", "tóngxué", "n.", "classmate; schoolmate", "👩‍🎓👨‍🎓"],
  ] as const
).map(([_, characters, pinyin, __, definition, emoji], index): WordDefinition => {
  const id = `common-words-${index}`;
  return {
    character: characters,
    definition,
    fileName: `${id}.mp3`,
    id,
    pinyin,
    emoji,
  };
});

const client = new PrismaClient()

async function main(){
  for(const word of commonWords){
    console.log(word.character)
    await client.words.update({
      where:{
        characters:word.character
      },
      data:{
        emojiChallenge:word.emoji,
        meaning:word.definition,
      }
    })
  }
}

main()