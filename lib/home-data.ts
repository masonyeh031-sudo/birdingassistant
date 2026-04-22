export type BirdCard = {
  name: string;
  summary: string;
  habitat: string;
  clue: string;
  size: string;
  behavior: string;
  watchTip: string;
  accent: string;
  imageSrc: string;
  imageAlt: string;
  imageCredit: string;
  imagePage: string;
  matcherHabitats: string[];
  matcherTraits: string[];
};

export type SpotCard = {
  name: string;
  lineKey: string;
  station: string;
  line: string;
  route: string;
  summary: string;
  birds: string[];
  bestTime: string;
  bestFor: string;
  habitatType: string;
  speciesCount: number;
  distanceKm: number;
  tone: string;
  sourceUrl: string;
};

export type ChannelTopic = {
  title: string;
  summary: string;
  focus: string;
  audience: string;
  sourceUrl: string;
  thumbnailUrl?: string;
  viewCount?: string;
  publishOrder?: string;
};

export type ChannelSection = {
  title: string;
  description: string;
  accent: string;
  topics: ChannelTopic[];
};

export type PlaylistCard = {
  title: string;
  summary: string;
  vibe: string;
  ctaLabel: string;
  playlistUrl: string;
  accent: string;
  note?: string;
  videoTitle: string;
  thumbnailUrl: string;
  publishOrder: string;
  playlistLabel?: string;
};

export type FeaturedVideoCard = {
  title: string;
  summary: string;
  viewCount: string;
  videoUrl: string;
  thumbnailUrl: string;
  playlistLabel?: string;
};

export const birdCategories = [
  { key: "all", label: "全部鳥類" },
  { key: "urban", label: "都市常見" },
  { key: "park", label: "公園樹叢" },
  { key: "water", label: "水邊濕地" },
  { key: "shorebird", label: "鴴科 / 鷸科" },
  { key: "swallow-summer", label: "燕科夏候鳥" },
  { key: "taiwan-endemic", label: "台灣特有種" },
  { key: "taiwan-endemic-subspecies", label: "台灣特有亞種" },
  { key: "winter-migrant", label: "冬候鳥" },
  { key: "summer-migrant", label: "夏候鳥" },
  { key: "forest-edge", label: "林緣山區" },
] as const;

export const mrtLines = [
  { key: "all", label: "全部路線" },
  { key: "wenhu", label: "文湖線" },
  { key: "tamsui-xinyi", label: "淡水信義線" },
  { key: "songshan-xindian", label: "松山新店線" },
  { key: "bannan", label: "板南線" },
] as const;

export const guanNiaoRenChannel = {
  name: "觀鳥人 YouTube 頻道",
  handle: "@watching-birds",
  channelUrl: "https://www.youtube.com/@watching-birds",
  playlistsUrl: "https://www.youtube.com/@watching-birds/playlists",
  intro:
    "以都市賞鳥、相似鳥種辨識與黑冠麻鷺行為觀察為核心，用短影片降低新手入門門檻。",
  sourceUrl: "https://www.youtube.com/@watching-birds",
};

export const guanNiaoRenPlaylists: PlaylistCard[] = [
  {
    title: "鳥類電子圖鑑",
    summary: "如果你想先把單一鳥種的基礎印象建立起來，這組最像可慢慢累積的影音圖鑑。",
    vibe:
      "很適合拿來當你的第一套影音鳥圖鑑。先把一種鳥從臉、羽色到成幼鳥差異慢慢看熟，之後再回頭看相似種比較，會有一種『原來我真的看得出來』的成就感。",
    ctaLabel: "直接看鳥類電子圖鑑",
    playlistUrl: "https://www.youtube.com/watch?v=aWP0HOBtzSU&list=PLPonTf39GETD3gaGNHziRv38wsoIe5QKe",
    accent: "from-rose-100 via-orange-50 to-white",
    videoTitle: "【鳥類電子圖鑑】EP1 要如何分辨夜鷺成鳥和亞成鳥呢？｜觀鳥人",
    thumbnailUrl: "https://i.ytimg.com/vi/aWP0HOBtzSU/hqdefault.jpg",
    publishOrder: "頻道系列型內容代表作",
    playlistLabel: "單一鳥種入門",
  },
  {
    title: "觀鳥人田野調查",
    summary: "把實地賞鳥、導覽活動與公園觀察集中看，適合喜歡跟著走現場的人。",
    vibe:
      "如果你喜歡跟著別人的鏡頭一起走進現場，這組會很有臨場感。從公園、步道到實際賞鳥路線，一邊看一邊很容易想像自己下次也可以這樣出門觀察。",
    ctaLabel: "直接看這個播放清單",
    playlistUrl: "https://www.youtube.com/watch?v=KeGPugahdjM&list=PLPonTf39GETDW6SnTBRY9rVq5h1scaFot",
    accent: "from-emerald-100 via-emerald-50 to-white",
    videoTitle: "【觀鳥人田野調查】白石湖吊橋爬山之旅｜觀鳥人",
    thumbnailUrl: "https://i.ytimg.com/vi/KeGPugahdjM/hqdefault.jpg",
    publishOrder: "頻道第 26 支上架",
    playlistLabel: "田野調查",
  },
  {
    title: "YA！我們來對決吧！",
    summary: "這是頻道裡最成熟的辨識系列，專門把相似鳥種放在一起對照講解。",
    vibe:
      "如果你最常卡在『明明長很像，到底差在哪』，這條就是最快上手的入口。兩種鳥直接放在一起比，會讓你從模糊印象一下子變成有抓手的辨識記憶。",
    ctaLabel: "直接看相似鳥種辨識清單",
    playlistUrl: "https://www.youtube.com/watch?v=X7b4sb1URXw&list=PLPonTf39GETDv7aklBRB7Ic-wNA5jCPFM",
    accent: "from-amber-100 via-amber-50 to-white",
    videoTitle: "【YA！我們來對決吧！】EP3 大白鷺和中白鷺差在哪？｜觀鳥人",
    thumbnailUrl: "https://i.ytimg.com/vi/X7b4sb1URXw/hqdefault.jpg",
    publishOrder: "頻道第 28 支上架",
    playlistLabel: "相似鳥種辨識",
  },
  {
    title: "從鳥開始學觀察力",
    summary: "比起純辨識，這組更像基礎觀念課，適合想把名詞、部位和分類補起來的人。",
    vibe:
      "這組像是替你的賞鳥眼睛打底。先把鳥的部位、觀察順序和基本概念建立起來，之後不管看辨識影片還是自己在公園遇到鳥，都會更知道該從哪裡開始看。",
    ctaLabel: "直接看觀察力入門清單",
    playlistUrl: "https://www.youtube.com/watch?v=lNyLv2vqNOc&list=PLPonTf39GETBpuAHTBNEKcn0nXcHSuw_Q",
    accent: "from-sky-100 via-sky-50 to-white",
    videoTitle: "【從鳥開始學觀察力】介紹鳥的部位（上）｜觀鳥人",
    thumbnailUrl: "https://i.ytimg.com/vi/lNyLv2vqNOc/hqdefault.jpg",
    publishOrder: "頻道早期上架代表作",
    playlistLabel: "觀察力入門",
  },
];

export const guanNiaoRenFeaturedVideos: FeaturedVideoCard[] = [
  {
    title: "【YA！我們來對決吧！】EP7 喜鵲和樹鵲差在哪？",
    summary: "目前頻道裡觀看數最高的鳥類辨識代表作之一，適合先從最有記憶點的長尾鳥差異開始看。",
    viewCount: "4,337 次觀看",
    videoUrl: "https://www.youtube.com/watch?v=2FPrHNX4728",
    thumbnailUrl: "https://i.ytimg.com/vi/2FPrHNX4728/hqdefault.jpg",
    playlistLabel: "相似鳥種辨識",
  },
  {
    title: "【YA！我們來對決吧！】EP3 大白鷺和中白鷺差在哪？",
    summary: "用最常見的白色鷺科鳥類做差異比較，對剛開始學水鳥辨識的人很實用。",
    viewCount: "2,813 次觀看",
    videoUrl: "https://www.youtube.com/watch?v=X7b4sb1URXw",
    thumbnailUrl: "https://i.ytimg.com/vi/X7b4sb1URXw/hqdefault.jpg",
    playlistLabel: "相似鳥種辨識",
  },
  {
    title: "【YA！我們來對決吧！】EP6 珠頸斑鳩和紅鳩差在哪？",
    summary: "把生活圈裡容易看到、卻最常叫錯名字的斑鳩類拆開講，很適合新手入門。",
    viewCount: "2,697 次觀看",
    videoUrl: "https://www.youtube.com/watch?v=pt-zpNIz-8M",
    thumbnailUrl: "https://i.ytimg.com/vi/pt-zpNIz-8M/hqdefault.jpg",
    playlistLabel: "相似鳥種辨識",
  },
];

export const guanNiaoRenChannelSections: ChannelSection[] = [
  {
    title: "頻道推薦觀看順序",
    description: "先從最容易建立記憶點的系列開始，再回到鳥類辨識與延伸議題，會比較容易追得下去。",
    accent: "bg-emerald-50 border-emerald-100",
    topics: [
      {
        title: "家八哥、白尾八哥和冠八哥的差異",
        summary: "把都市最容易搞混的八哥類一次拆開，很適合對照網站的常見鳥類卡片一起記。",
        focus: "八哥類、外來種辨識、城市常見鳥",
        audience: "想先解決最常混淆鳥種的新手",
        sourceUrl: "https://www.youtube.com/watch?v=TXgGqxM6T2Q",
        thumbnailUrl: "https://i.ytimg.com/vi/TXgGqxM6T2Q/hqdefault.jpg",
        viewCount: "1,118 次觀看",
        publishOrder: "頻道第 6 支上架",
      },
      {
        title: "棕背伯勞與紅尾伯勞的識別方法",
        summary: "伯勞類對新手來說常常只覺得『長很像』，這支會把差異講得很具體。",
        focus: "伯勞辨識、羽色差異、相似種比較",
        audience: "想進一步提升辨識細節的人",
        sourceUrl: "https://www.youtube.com/watch?v=_XdZBB3pAfU",
        thumbnailUrl: "https://i.ytimg.com/vi/_XdZBB3pAfU/hqdefault.jpg",
        viewCount: "2,613 次觀看",
        publishOrder: "頻道第 9 支上架",
      },
      {
        title: "珠頸斑鳩和金背鳩差在哪？",
        summary: "把都市與林邊都可能看到的鳩類差異講清楚，對剛開始認斑鳩系統的人很實用。",
        focus: "斑鳩辨識、頸部花紋、羽色差異",
        audience: "想把生活圈常見鳩類一次分清楚的人",
        sourceUrl: "https://www.youtube.com/watch?v=NfbfHrF0160",
        thumbnailUrl: "https://i.ytimg.com/vi/NfbfHrF0160/hqdefault.jpg",
        viewCount: "2,093 次觀看",
        publishOrder: "頻道第 25 支上架",
      },
    ],
  },
  {
    title: "田野調查與觀察延伸",
    description: "如果你比較喜歡跟著走現場、看實地觀察和導覽活動，這幾支會更適合你。",
    accent: "bg-sky-50 border-sky-100",
    topics: [
      {
        title: "首次！關渡自然公園賞鳥之旅",
        summary: "最新上架的田野調查片之一，適合直接感受頻道現在的外出觀察節奏。",
        focus: "關渡自然公園、水鳥、外出賞鳥",
        audience: "想跟著頻道走戶外路線的人",
        sourceUrl: "https://www.youtube.com/watch?v=Sx_DvxSRuo4",
        thumbnailUrl: "https://i.ytimg.com/vi/Sx_DvxSRuo4/hqdefault.jpg",
        viewCount: "167 次觀看",
        publishOrder: "頻道第 1 支上架",
      },
      {
        title: "800mm 鏡頭直擊！台大常見鳥類的生動畫面",
        summary: "用很近的拍攝距離帶你看常見鳥的動作，對建立生活圈辨識很有幫助。",
        focus: "台大校園、常見鳥、特寫觀察",
        audience: "想練生活圈辨識的人",
        sourceUrl: "https://www.youtube.com/watch?v=gI7X_RDeQRs",
        thumbnailUrl: "https://i.ytimg.com/vi/gI7X_RDeQRs/hqdefault.jpg",
        viewCount: "179 次觀看",
        publishOrder: "頻道第 2 支上架",
      },
      {
        title: "鳥類導航：鳥類導覽活動開箱",
        summary: "如果你對實體導覽活動或現場帶看有興趣，這支是很好的入口。",
        focus: "導覽活動、大安森林公園、入門帶看",
        audience: "想知道觀鳥導覽長什麼樣的人",
        sourceUrl: "https://www.youtube.com/watch?v=y4tcKjd2xnw",
        thumbnailUrl: "https://i.ytimg.com/vi/y4tcKjd2xnw/hqdefault.jpg",
        viewCount: "224 次觀看",
        publishOrder: "頻道第 8 支上架",
      },
    ],
  },
];

export const guanNiaoRenBlog = {
  name: "觀鳥人部落格",
  platform: "vocus 方格子",
  blogUrl: "https://vocus.cc/user/%40mason_bird_watching",
  intro:
    "用文章延伸 YouTube 影片內容，補上觀察背景、辨識重點與黑冠麻鷺專題紀錄，適合想慢慢讀的人。",
  sourceUrl: "https://vocus.cc/user/%40mason_bird_watching",
};

export const guanNiaoRenBlogSections: ChannelSection[] = [
  {
    title: "相似鳥種辨識整理",
    description: "如果你想知道『到底怎麼分』，這一組最實用，尤其適合常在公園看到八哥或斑鳩卻叫不出名字的人。",
    accent: "bg-amber-50 border-amber-100",
    topics: [
      {
        title: "辨識家八哥、白尾八哥和臺灣冠八哥的方式",
        summary: "從新手最常混淆的八哥類切入，適合搭配網站的常見鳥類卡片一起看。",
        focus: "相似種差異、外來種與保育種",
        audience: "想建立辨識力的新手",
        sourceUrl: "https://vocus.cc/user/%40mason_bird_watching",
      },
      {
        title: "家八哥和白尾八哥對臺灣冠八哥與農民的影響",
        summary: "不只講怎麼分，還把物種影響與保育背景補上，知識密度更完整。",
        focus: "物種辨識、外來種影響、保育",
        audience: "想從辨識延伸到議題理解的人",
        sourceUrl: "https://vocus.cc/user/%40mason_bird_watching",
      },
    ],
  },
  {
    title: "野生動物議題與延伸觀察",
    description: "除了賞鳥教學，頻道也延伸到野生動物倡議與現場紀錄，讓內容不只停在『認鳥』。",
    accent: "bg-sky-50 border-sky-100",
    topics: [
      {
        title: "EP1 為野生動物而走行動聯盟，為什麼要遊行呢？",
        summary: "把參與現場活動的原因與訴求講清楚，讓觀眾知道賞鳥也能連到保育行動。",
        focus: "倡議現場、行動背景",
        audience: "對野生動物議題有興趣的人",
        sourceUrl: "https://vocus.cc/user/%40mason_bird_watching",
      },
      {
        title: "EP2 為野生動物遊行，三大宗旨與三項具體訴求",
        summary: "承接上一支，適合想快速理解活動重點與保育主張的人。",
        focus: "活動重點、訴求整理",
        audience: "想快速掌握議題的人",
        sourceUrl: "https://vocus.cc/user/%40mason_bird_watching",
      },
    ],
  },
];

type BirdSeed = Omit<
  BirdCard,
  "size" | "behavior" | "watchTip" | "imageSrc" | "imageAlt" | "imageCredit" | "imagePage"
>;

type BirdImageOverride = {
  imageSrc: string;
  imageAlt: string;
  imageCredit: string;
  imagePage: string;
};

function createBirdImage(name: string, imageSrc: string, imagePage: string): BirdImageOverride {
  return {
    imageSrc,
    imageAlt: `${name} 的真實鳥類照片`,
    imageCredit: "Wikipedia / Wikimedia Commons",
    imagePage,
  };
}

function createBirdPlaceholderImage(name: string): BirdImageOverride {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 520">
    <rect width="720" height="520" rx="48" fill="#eef4ea"/>
    <circle cx="545" cy="130" r="74" fill="#d8e6d2"/>
    <path d="M172 319c42-86 126-135 238-121 95 12 142 72 158 138-88 50-210 61-316 36-35-8-62-25-80-53z" fill="#496541"/>
    <path d="M448 201c40-26 85-16 111 14 18 21 24 49 18 77-57 14-112-2-155-44 2-18 10-34 26-47z" fill="#496541"/>
    <path d="M168 318c-42-17-81-20-117-8 25 42 74 65 140 70z" fill="#496541"/>
    <circle cx="536" cy="219" r="8" fill="#f9f6ee"/>
    <path d="M583 232l66 10-63 25z" fill="#496541"/>
    <text x="360" y="448" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#496541">${name} 照片待補</text>
    <text x="360" y="486" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#6f8767">避免誤放不同鳥種照片</text>
  </svg>`;

  return {
    imageSrc: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    imageAlt: `${name} 的照片待補佔位圖`,
    imageCredit: "照片待補，避免誤放不同鳥種",
    imagePage: "#photo-pending",
  };
}

function describeSize(traits: string[]) {
  if (traits.includes("large")) return "大型鳥，遠看也能先靠輪廓、腿長或翼型縮小方向。";
  if (traits.includes("medium-large")) return "中大型鳥，通常比鴿子大，先看站姿和整體比例。";
  if (traits.includes("small")) return "小型鳥，適合先看整體輪廓與移動方式。";
  if (traits.includes("medium")) return "中型鳥，站姿與頭部比例通常很好辨識。";
  return "體型中等偏大，遠看時也容易留下印象。";
}

function describeBehavior(traits: string[], habitats: string[]) {
  if (traits.includes("waterbird")) return "常在水邊慢步覓食，停下來觀察嘴型與腳色很有幫助。";
  if (traits.includes("tail-up")) return "移動時尾巴或身體動作明顯，行為特徵很有辨識價值。";
  if (habitats.includes("forest-edge")) return "多在樹梢、灌叢或林緣活動，聽聲音常比先看到更容易。";
  return "常出現在生活圈綠地，先記住牠最常出現的位置會更快上手。";
}

function describeWatchTip(traits: string[], habitats: string[]) {
  if (traits.includes("eye-ring")) return "先看臉部細節和眼圈，再回頭對照身體顏色。";
  if (traits.includes("head-pattern")) return "頭部花紋通常是第一辨識點，先記頭再記身體。";
  if (traits.includes("white")) return "白色區塊的位置與範圍，往往是分辨相似鳥種的關鍵。";
  if (habitats.includes("water")) return "先判斷是在岸邊、淺水區還是草叢邊活動，再縮小候選範圍。";
  return "先看體型和站姿，再補看顏色與嘴型，會比只盯羽色更有效。";
}

const birdImageOverrides: Record<string, BirdImageOverride> = {
  白頭翁: createBirdImage(
    "白頭翁",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Light-vented_Bulbul_%28Pycnonotus_sinensis%29_%287184485008%29.jpg",
    "https://commons.wikimedia.org/wiki/File:Light-vented_Bulbul_(Pycnonotus_sinensis)_(7184485008).jpg"
  ),
  綠繡眼: createBirdImage(
    "綠繡眼",
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Japanese_white-eye_at_Tenn%C5%8Dji_Park_in_Osaka%2C_January_2016_III.jpg",
    "https://en.wikipedia.org/wiki/Warbling_white-eye"
  ),
  麻雀: createBirdImage(
    "麻雀",
    "https://upload.wikimedia.org/wikipedia/commons/9/98/Tree_Sparrow_August_2007_Osaka_Japan.jpg",
    "https://en.wikipedia.org/wiki/Eurasian_tree_sparrow"
  ),
  紅嘴黑鵯: createBirdImage(
    "紅嘴黑鵯",
    "https://upload.wikimedia.org/wikipedia/commons/3/39/Black_Bulbul_0A2A0215.jpg",
    "https://en.wikipedia.org/wiki/Black_bulbul"
  ),
  夜鷺: createBirdImage(
    "夜鷺",
    "https://upload.wikimedia.org/wikipedia/commons/a/a1/Nycticorax_nycticorax_457953189.jpg",
    "https://en.wikipedia.org/wiki/Black-crowned_night_heron"
  ),
  小白鷺: createBirdImage(
    "小白鷺",
    "https://upload.wikimedia.org/wikipedia/commons/f/f1/Little_egret_%28Egretta_garzetta%29_Photograph_by_Shantanu_Kuveskar.jpg",
    "https://en.wikipedia.org/wiki/Little_egret"
  ),
  珠頸斑鳩: createBirdImage(
    "珠頸斑鳩",
    "https://upload.wikimedia.org/wikipedia/commons/6/6d/Spotted_dove_%28Spilopelia_chinensis_suratensis%29.jpg",
    "https://en.wikipedia.org/wiki/Spotted_dove"
  ),
  五色鳥: createBirdImage(
    "五色鳥",
    "https://upload.wikimedia.org/wikipedia/commons/7/71/Taiwan_barbet_%28Psilopogon_nuchalis%29_Qianshan.jpg",
    "https://en.wikipedia.org/wiki/Taiwan_barbet"
  ),
  鵲鴝: createBirdImage(
    "鵲鴝",
    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Oriental_magpie-robin_%28Copsychus_saularis_ceylonensis%29_male.jpg",
    "https://en.wikipedia.org/wiki/Oriental_magpie-robin"
  ),
  樹鵲: createBirdImage(
    "樹鵲",
    "https://upload.wikimedia.org/wikipedia/commons/0/01/Dendrocitta_formosae_formosae_1.jpg",
    "https://en.wikipedia.org/wiki/Grey_treepie"
  ),
  黑冠麻鷺: createBirdImage(
    "黑冠麻鷺",
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Malayan_Night-Heron_-_Taiwan_S4E8695_%2817320173361%29.jpg",
    "https://en.wikipedia.org/wiki/Malayan_night_heron"
  ),
  白鶺鴒: createBirdImage(
    "白鶺鴒",
    "https://upload.wikimedia.org/wikipedia/commons/6/60/20180415_015_Winterswijk_Witte_kwikstaart_%2840785272624%29.jpg",
    "https://en.wikipedia.org/wiki/White_wagtail"
  ),
  黃頭鷺: createBirdImage(
    "黃頭鷺",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Chinese%20pond%20heron.jpg",
    "https://commons.wikimedia.org/wiki/File:Chinese_pond_heron.jpg"
  ),
  牛背鷺: createBirdImage(
    "牛背鷺",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Eastern%20cattle%20egret%20IMG%208019.jpg",
    "https://commons.wikimedia.org/wiki/File:Eastern_cattle_egret_IMG_8019.jpg"
  ),
  蒼鷺: createBirdImage(
    "蒼鷺",
    "https://upload.wikimedia.org/wikipedia/commons/7/71/Grey_heron_2022_03_18_01.jpg",
    "https://en.wikipedia.org/wiki/Grey_heron"
  ),
  大白鷺: createBirdImage(
    "大白鷺",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/Great_Egret_%28Ardea_alba%29_in_Breeding_Plumage%2C_Cape_May_County%2C_New_Jersey%2C_USA_%28cropped%29.png",
    "https://en.wikipedia.org/wiki/Great_egret"
  ),
  翠鳥: createBirdImage(
    "翠鳥",
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Alcedo_atthis_-England-8_%28cropped%29.jpg",
    "https://en.wikipedia.org/wiki/Common_kingfisher"
  ),
  紅冠水雞: createBirdImage(
    "紅冠水雞",
    "https://upload.wikimedia.org/wikipedia/commons/e/ee/Common_moorhen_%28Gallinula_chloropus%29_France.jpg",
    "https://en.wikipedia.org/wiki/Common_moorhen"
  ),
  白腹秧雞: createBirdImage(
    "白腹秧雞",
    "https://upload.wikimedia.org/wikipedia/commons/0/0f/Amaurornis_phoenicurus_-_Singapore_Botanic_Gardens.jpg",
    "https://en.wikipedia.org/wiki/White-breasted_waterhen"
  ),
  小彎嘴: createBirdImage(
    "小彎嘴",
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Tawny-flanked_Prinia_%28Prinia_subflava%29_%2811465162445%29.jpg",
    "https://en.wikipedia.org/wiki/Tawny-flanked_prinia"
  ),
  灰頭鷦鶯: createBirdImage(
    "灰頭鷦鶯",
    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Plain_prinia_%28Prinia_inornata_inornata%29.jpg",
    "https://en.wikipedia.org/wiki/Plain_prinia"
  ),
  褐頭鷦鶯: createBirdImage(
    "褐頭鷦鶯",
    "https://upload.wikimedia.org/wikipedia/commons/3/31/Zitting_cisticola_2024_04_19_%28cropped%29.jpg",
    "https://en.wikipedia.org/wiki/Zitting_cisticola"
  ),
  家燕: createBirdImage(
    "家燕",
    "https://upload.wikimedia.org/wikipedia/commons/7/7d/Rauchschwalbe_Hirundo_rustica.jpg",
    "https://en.wikipedia.org/wiki/Barn_swallow"
  ),
  赤腰燕: createBirdImage(
    "赤腰燕",
    "https://upload.wikimedia.org/wikipedia/commons/e/eb/Red-rumped_swallow_in_Calpe%2C_Spain_-_May_2018_01.jpg",
    "https://en.wikipedia.org/wiki/European_red-rumped_swallow"
  ),
  洋燕: createBirdImage(
    "洋燕",
    "https://upload.wikimedia.org/wikipedia/commons/b/b2/Pacific_Swallow_%28Hirundo_tahitica%29.jpg",
    "https://commons.wikimedia.org/wiki/File:Pacific_Swallow_(Hirundo_tahitica).jpg"
  ),
  棕沙燕: createBirdImage(
    "棕沙燕",
    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Grey-throated_Martin_%28Riparia_chinensis%29_%2830357547261%29.jpg",
    "https://commons.wikimedia.org/wiki/File:Grey-throated_Martin_(Riparia_chinensis)_(30357547261).jpg"
  ),
  大卷尾: createBirdImage(
    "大卷尾",
    "https://upload.wikimedia.org/wikipedia/commons/f/f9/Bdrongo-Sandeep1.jpg",
    "https://en.wikipedia.org/wiki/Black_drongo"
  ),
  斑文鳥: createBirdImage(
    "斑文鳥",
    "https://upload.wikimedia.org/wikipedia/commons/e/e6/Scaly-breasted_munia_%28Lonchura_punctulata_nisoria%29_Ubud.jpg",
    "https://en.wikipedia.org/wiki/Scaly-breasted_munia"
  ),
  白腰文鳥: createBirdImage(
    "白腰文鳥",
    "https://upload.wikimedia.org/wikipedia/commons/2/26/White-rumped_Munia_East_Distrct_Sikkim_India_05.07.2018.jpg",
    "https://en.wikipedia.org/wiki/White-rumped_munia"
  ),
  紅鳩: createBirdImage(
    "紅鳩",
    "https://upload.wikimedia.org/wikipedia/commons/c/c3/Streptopelia_tranquebarica.jpg",
    "https://en.wikipedia.org/wiki/Red_collared_dove"
  ),
  山紅頭: createBirdImage(
    "山紅頭",
    "https://upload.wikimedia.org/wikipedia/commons/9/93/Rufous-capped_babbler_%28Cyanoderma_ruficeps_praecognitum%29_Shuangyu.jpg",
    "https://en.wikipedia.org/wiki/Rufous-capped_babbler"
  ),
  台灣藍鵲: createBirdImage(
    "台灣藍鵲",
    "https://upload.wikimedia.org/wikipedia/commons/7/79/Taiwan_blue_magpie_%28Urocissa_caerulea%29_Xindian.jpg",
    "https://en.wikipedia.org/wiki/Taiwan_blue_magpie"
  ),
  台灣竹雞: createBirdImage(
    "台灣竹雞",
    "https://upload.wikimedia.org/wikipedia/commons/c/c0/Bambusicola_thoracicus_-Yangmingshan_National_Park%2C_Taiwan-8.jpg",
    "https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%AB%B9%E9%9B%9E"
  ),
  藍腹鷴: createBirdImage(
    "藍腹鷴",
    "https://upload.wikimedia.org/wikipedia/commons/0/03/Swinhoe%27s_Pheasant_0673.jpg",
    "https://zh.wikipedia.org/wiki/%E8%93%9D%E9%B9%87"
  ),
  帝雉: createBirdImage(
    "帝雉",
    "https://upload.wikimedia.org/wikipedia/commons/6/60/Mikado_Pheasant_398.jpg",
    "https://zh.wikipedia.org/wiki/%E5%B8%9D%E9%9B%89"
  ),
  台灣朱雀: createBirdImage(
    "台灣朱雀",
    "https://upload.wikimedia.org/wikipedia/commons/a/a8/Taiwan_Rosefinch_Carpodacus_formosanus%2C_male%2C_Taiwan.jpg",
    "https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E6%9C%B1%E9%9B%80"
  ),
  台灣灰鷽: createBirdImage(
    "台灣灰鷽",
    "https://upload.wikimedia.org/wikipedia/commons/3/36/Grey-headed_Bullfinch.jpg",
    "https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%81%B0%E9%A0%AD%E7%81%B0%E9%9B%80"
  ),
  赤腹山雀: createBirdImage(
    "赤腹山雀",
    "https://upload.wikimedia.org/wikipedia/commons/6/67/Sittiparus_castaneoventris%2C_Taiwan_1.jpg",
    "https://zh.wikipedia.org/wiki/%E8%B5%A4%E8%85%B9%E5%B1%B1%E9%9B%80"
  ),
  黃山雀: createBirdImage(
    "黃山雀",
    "https://upload.wikimedia.org/wikipedia/commons/4/47/Taiwan_tit.jpg",
    "https://zh.wikipedia.org/wiki/%E9%BB%83%E5%B1%B1%E9%9B%80"
  ),
  烏頭翁: createBirdImage(
    "烏頭翁",
    "https://upload.wikimedia.org/wikipedia/commons/8/8b/Styan%27s_bulbul.jpg",
    "https://zh.wikipedia.org/wiki/%E7%83%8F%E9%A0%AD%E7%BF%81"
  ),
  台灣紫嘯鶇: createBirdImage(
    "台灣紫嘯鶇",
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/Formosan_Whistling-Thrush_-_Taiwan_S4E6052_%2817047153068%29.jpg",
    "https://zh.wikipedia.org/wiki/%E8%87%BA%E7%81%A3%E7%B4%AB%E5%98%AF%E9%B6%87"
  ),
  喜鵲: createBirdImage(
    "喜鵲",
    "https://upload.wikimedia.org/wikipedia/commons/2/22/Eurasian_magpie_%2810860%29.jpg",
    "https://en.wikipedia.org/wiki/Eurasian_magpie"
  ),
  鳳頭蒼鷹: createBirdImage(
    "鳳頭蒼鷹",
    "https://upload.wikimedia.org/wikipedia/commons/8/88/C-Goshawk-Sandeep.jpg",
    "https://en.wikipedia.org/wiki/Crested_goshawk"
  ),
  大冠鷲: createBirdImage(
    "大冠鷲",
    "https://upload.wikimedia.org/wikipedia/commons/3/37/Spilornis_cheela_%28Bandipur%2C_2008%29.jpg",
    "https://en.wikipedia.org/wiki/Crested_serpent_eagle"
  ),
  小環頸鴴: createBirdImage(
    "小環頸鴴",
    "https://upload.wikimedia.org/wikipedia/commons/d/d3/Charadrius_dubius_-_Little_ringed_plover_05.jpg",
    "https://en.wikipedia.org/wiki/Little_ringed_plover"
  ),
  磯鷸: createBirdImage(
    "磯鷸",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/Actitis_hypoleucos_-_Laem_Pak_Bia.jpg",
    "https://en.wikipedia.org/wiki/Common_sandpiper"
  ),
  黃小鷺: createBirdImage(
    "黃小鷺",
    "https://upload.wikimedia.org/wikipedia/commons/9/9d/Ixobrychus_sinensis_-_Chinese_Garden.jpg",
    "https://en.wikipedia.org/wiki/Yellow_bittern"
  ),
  小水鴨: createBirdImage(
    "小水鴨",
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/Eurasian_teal_%28Anas_crecca_crecca%29_male_Qingshui.jpg",
    "https://en.wikipedia.org/wiki/Eurasian_teal"
  ),
  綠頭鴨: createBirdImage(
    "綠頭鴨",
    "https://upload.wikimedia.org/wikipedia/commons/b/bf/Anas_platyrhynchos_male_female_quadrat.jpg",
    "https://en.wikipedia.org/wiki/Mallard"
  ),
  赤腹鶇: createBirdImage(
    "赤腹鶇",
    "https://upload.wikimedia.org/wikipedia/commons/0/05/Turdus_eunomus_-_Forest_Botial-Jarvis_-_616099817_%28cropped%29.jpeg",
    "https://en.wikipedia.org/wiki/Dusky_thrush"
  ),
  白腹鶇: createBirdImage(
    "白腹鶇",
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Pale_Thrush_-_Taiwan_S4E8071_%2817027483687%29.jpg",
    "https://en.wikipedia.org/wiki/Pale_thrush"
  ),
  灰椋鳥: createBirdImage(
    "灰椋鳥",
    "https://upload.wikimedia.org/wikipedia/commons/2/20/Spodiopsar_cineraceus_Higashi-hagoromo_station.jpg",
    "https://en.wikipedia.org/wiki/White-cheeked_starling"
  ),
  八哥: createBirdImage(
    "八哥",
    "https://upload.wikimedia.org/wikipedia/commons/7/7f/Acridotheres_javanicus_-_Kent_Ridge_Park.jpg",
    "https://en.wikipedia.org/wiki/Javan_myna"
  ),
  白尾八哥: createBirdImage(
    "白尾八哥",
    "https://upload.wikimedia.org/wikipedia/commons/d/db/Great_myna_%28Acridotheres_grandis%29_Prek_Toal.jpg",
    "https://en.wikipedia.org/wiki/Great_myna"
  ),
  家八哥: createBirdImage(
    "家八哥",
    "https://upload.wikimedia.org/wikipedia/commons/3/3c/Acridotheres_tristis00.jpg",
    "https://en.wikipedia.org/wiki/Common_myna"
  ),
  黑翅鳶: createBirdImage(
    "黑翅鳶",
    "https://upload.wikimedia.org/wikipedia/commons/2/28/Black-shouldered_Kite_%28Elanus_caeruleus%29_in_Hyderabad_W_IMG_4418.jpg",
    "https://en.wikipedia.org/wiki/Black-winged_kite"
  ),
  黑鳶: createBirdImage(
    "黑鳶",
    "https://upload.wikimedia.org/wikipedia/commons/5/5a/Schwarzmilan.jpg",
    "https://en.wikipedia.org/wiki/Black_kite"
  ),
  黑面琵鷺: createBirdImage(
    "黑面琵鷺",
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Black_faced_spoonbill_at_Niigata.JPG",
    "https://en.wikipedia.org/wiki/Black-faced_spoonbill"
  ),
  冠羽畫眉: createBirdImage(
    "冠羽畫眉",
    "https://upload.wikimedia.org/wikipedia/commons/8/81/Garrulax_taewanus%2C_Taiwan_1.jpg",
    "https://en.wikipedia.org/wiki/Taiwan_hwamei"
  ),
  白耳畫眉: createBirdImage(
    "白耳畫眉",
    "https://upload.wikimedia.org/wikipedia/commons/9/9b/White-eared_Sibia_-_Taiwan_S4E8153_%2819547305835%29.jpg",
    "https://en.wikipedia.org/wiki/White-eared_sibia"
  ),
  棕背伯勞: createBirdImage(
    "棕背伯勞",
    "https://upload.wikimedia.org/wikipedia/commons/6/64/Lanius_cristatus_-_Surin.jpg",
    "https://en.wikipedia.org/wiki/Brown_shrike"
  ),
  東方環頸鴴: createBirdImage(
    "東方環頸鴴",
    "https://upload.wikimedia.org/wikipedia/commons/b/bd/Kentish_plover_%28Charadrius_alexandrinus_alexandrinus%29_Sfax.jpg",
    "https://commons.wikimedia.org/wiki/File:Kentish_plover_(Charadrius_alexandrinus_alexandrinus)_Sfax.jpg"
  ),
  蒙古鴴: createBirdImage(
    "蒙古鴴",
    "https://upload.wikimedia.org/wikipedia/commons/7/75/Lesser_Sand_Plover_AMSM4982_2_LSPL.jpg",
    "https://commons.wikimedia.org/wiki/File:Lesser_Sand_Plover_AMSM4982_2_LSPL.jpg"
  ),
  鐵嘴鴴: createBirdImage(
    "鐵嘴鴴",
    "https://upload.wikimedia.org/wikipedia/commons/4/43/Greater_Sand_Plover.jpg",
    "https://commons.wikimedia.org/wiki/File:Greater_Sand_Plover.jpg"
  ),
  灰斑鴴: createBirdImage(
    "灰斑鴴",
    "https://upload.wikimedia.org/wikipedia/commons/e/ed/Grey_plover_%28_black-bellied_plover%29.jpg",
    "https://commons.wikimedia.org/wiki/File:Grey_plover_(_black-bellied_plover).jpg"
  ),
  太平洋金斑鴴: createBirdImage(
    "太平洋金斑鴴",
    "https://upload.wikimedia.org/wikipedia/commons/c/c1/Pacific_Golden-Plover_in_Bakkhali_September_2025_by_Tisha_Mukherjee_06.jpg",
    "https://commons.wikimedia.org/wiki/File:Pacific_Golden-Plover_in_Bakkhali_September_2025_by_Tisha_Mukherjee_06.jpg"
  ),
  高蹺鴴: createBirdImage(
    "高蹺鴴",
    "https://upload.wikimedia.org/wikipedia/commons/b/bb/Black-winged_stilt_courtship_behaviour.jpg",
    "https://commons.wikimedia.org/wiki/File:Black-winged_stilt_courtship_behaviour.jpg"
  ),
  反嘴鴴: createBirdImage(
    "反嘴鴴",
    "https://upload.wikimedia.org/wikipedia/commons/0/07/Pied_avocet_%28Recurvirostra_avosetta%29.jpg",
    "https://commons.wikimedia.org/wiki/File:Pied_avocet_(Recurvirostra_avosetta).jpg"
  ),
  大杓鷸: createBirdImage(
    "大杓鷸",
    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Eurasian_Curlew_by_Tisha_Mukherjee_05.jpg",
    "https://commons.wikimedia.org/wiki/File:Eurasian_Curlew_by_Tisha_Mukherjee_05.jpg"
  ),
  中杓鷸: createBirdImage(
    "中杓鷸",
    "https://upload.wikimedia.org/wikipedia/commons/0/0c/Whimbrel_Numenius_phaeopus.jpg",
    "https://commons.wikimedia.org/wiki/File:Whimbrel_Numenius_phaeopus.jpg"
  ),
  青足鷸: createBirdImage(
    "青足鷸",
    "https://upload.wikimedia.org/wikipedia/commons/c/c7/The_common_greenshank_%28Tringa_nebularia%29.jpg",
    "https://commons.wikimedia.org/wiki/File:The_common_greenshank_(Tringa_nebularia).jpg"
  ),
  赤足鷸: createBirdImage(
    "赤足鷸",
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Common_Redshank_Tringa_totanus.jpg",
    "https://commons.wikimedia.org/wiki/File:Common_Redshank_Tringa_totanus.jpg"
  ),
  鷹斑鷸: createBirdImage(
    "鷹斑鷸",
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/Tringa_glareola_-_Wood_Sandpiper_09.jpg",
    "https://commons.wikimedia.org/wiki/File:Tringa_glareola_-_Wood_Sandpiper_09.jpg"
  ),
  田鷸: createBirdImage(
    "田鷸",
    "https://upload.wikimedia.org/wikipedia/commons/8/82/Common_snipe_%28Gallinago_gallinago%29_in_courtship_flight.jpg",
    "https://commons.wikimedia.org/wiki/File:Common_snipe_(Gallinago_gallinago)_in_courtship_flight.jpg"
  ),
  尖尾濱鷸: createBirdImage(
    "尖尾濱鷸",
    "https://upload.wikimedia.org/wikipedia/commons/5/59/Sharp-tailed_Sandpiper_at_Lake_Wollumboola%2C_Jervis_Bay_National_Park_NSW.jpg",
    "https://commons.wikimedia.org/wiki/File:Sharp-tailed_Sandpiper_at_Lake_Wollumboola,_Jervis_Bay_National_Park_NSW.jpg"
  ),
  紅胸濱鷸: createBirdImage(
    "紅胸濱鷸",
    "https://upload.wikimedia.org/wikipedia/commons/8/86/Red_Necked_Stint_with_Little_stint.jpg",
    "https://commons.wikimedia.org/wiki/File:Red_Necked_Stint_with_Little_stint.jpg"
  ),
  寬嘴鷸: createBirdImage(
    "寬嘴鷸",
    "https://upload.wikimedia.org/wikipedia/commons/f/fb/Broad_billed_sandpiper_by_Sreedev_Puthur.jpg",
    "https://commons.wikimedia.org/wiki/File:Broad_billed_sandpiper_by_Sreedev_Puthur.jpg"
  ),
  三趾濱鷸: createBirdImage(
    "三趾濱鷸",
    "https://upload.wikimedia.org/wikipedia/commons/7/75/Sanderling_Westkapelle_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Sanderling_Westkapelle_02.jpg"
  ),
  翻石鷸: createBirdImage(
    "翻石鷸",
    "https://upload.wikimedia.org/wikipedia/commons/a/ad/Ruddy_Turnstone_2025_12_25_03.jpg",
    "https://commons.wikimedia.org/wiki/File:Ruddy_Turnstone_2025_12_25_03.jpg"
  ),
  黑腹濱鷸: createBirdImage(
    "黑腹濱鷸",
    "https://upload.wikimedia.org/wikipedia/commons/1/14/Dunlin_%2874699%29.jpg",
    "https://commons.wikimedia.org/wiki/File:Dunlin_(74699).jpg"
  ),
  黑尾鷸: createBirdImage(
    "黑尾鷸",
    "https://upload.wikimedia.org/wikipedia/commons/4/40/Black-tailed_Godwit_Uferschnepfe.jpg",
    "https://commons.wikimedia.org/wiki/File:Black-tailed_Godwit_Uferschnepfe.jpg"
  ),
  琵嘴鴨: createBirdImage(
    "琵嘴鴨",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Anas%20clypeata%202.jpg",
    "https://commons.wikimedia.org/wiki/File:Anas_clypeata_2.jpg"
  ),
  赤頸鴨: createBirdImage(
    "赤頸鴨",
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/Eurasian_wigeon_in_Sakai%2C_Osaka%2C_February_2016.jpg",
    "https://commons.wikimedia.org/wiki/File:Eurasian_wigeon_in_Sakai,_Osaka,_February_2016.jpg"
  ),
  尖尾鴨: createBirdImage(
    "尖尾鴨",
    "https://upload.wikimedia.org/wikipedia/commons/6/64/Northern_Pintail_Duck_5.jpg",
    "https://commons.wikimedia.org/wiki/File:Northern_Pintail_Duck_5.jpg"
  ),
  白眉鴨: createBirdImage(
    "白眉鴨",
    "https://upload.wikimedia.org/wikipedia/commons/8/83/Garganey_by_Tisha_Mukherjee_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Garganey_by_Tisha_Mukherjee_02.jpg"
  ),
  花嘴鴨: createBirdImage(
    "花嘴鴨",
    "https://upload.wikimedia.org/wikipedia/commons/9/97/Spot-billed_duck%2C_Tenn%C5%8Dji_Park%2C_Osaka%2C_October_2015.jpg",
    "https://commons.wikimedia.org/wiki/File:Spot-billed_duck,_Tennōji_Park,_Osaka,_October_2015.jpg"
  ),
  彩鷸: createBirdImage(
    "彩鷸",
    "https://upload.wikimedia.org/wikipedia/commons/7/75/Greater_Painted-Snipe_by_Tisha_Mukherjee_02.jpg",
    "https://commons.wikimedia.org/wiki/File:Greater_Painted-Snipe_by_Tisha_Mukherjee_02.jpg"
  ),
  燕鴴: createBirdImage(
    "燕鴴",
    "https://upload.wikimedia.org/wikipedia/commons/c/c1/Oriental_Pratincole_by_Tisha_Mukherjee_04.jpg",
    "https://commons.wikimedia.org/wiki/File:Oriental_Pratincole_by_Tisha_Mukherjee_04.jpg"
  ),
  小燕鷗: createBirdImage(
    "小燕鷗",
    "https://upload.wikimedia.org/wikipedia/commons/c/c8/Little_tern_%28Sternula_albifrons%29_male%2C_Rajshahi%2C_Bangladesh.jpg",
    "https://commons.wikimedia.org/wiki/File:Little_tern_(Sternula_albifrons)_male,_Rajshahi,_Bangladesh.jpg"
  ),
  黑枕燕鷗: createBirdImage(
    "黑枕燕鷗",
    "https://upload.wikimedia.org/wikipedia/commons/3/37/Black-naped_tern_%28Sterna_sumatrana%29_adult_breeding_plumage.jpg",
    "https://commons.wikimedia.org/wiki/File:Black-naped_tern_(Sterna_sumatrana)_adult_breeding_plumage.jpg"
  ),
  栗喉蜂虎: createBirdImage(
    "栗喉蜂虎",
    "https://upload.wikimedia.org/wikipedia/commons/8/8c/Blue-tailed_bee-eater_%28Merops_philippinus%29_Yala.jpg",
    "https://commons.wikimedia.org/wiki/File:Blue-tailed_bee-eater_(Merops_philippinus)_Yala.jpg"
  ),
};

const birdSeeds: BirdSeed[] = [
  {
    name: "白頭翁",
    summary: "都市與郊區最常見的鳥種之一，活潑好動，常在樹梢與電線間跳躍。",
    habitat: "公園、校園、住宅區綠地",
    clue: "黑色頭頂配上明顯白色後頭，是最容易記住的外觀特徵。",
    accent: "from-rose-100 to-orange-50",
    matcherHabitats: ["urban", "park", "forest-edge"],
    matcherTraits: ["medium", "head-pattern", "dark"],
  },
  {
    name: "綠繡眼",
    summary: "身形嬌小，常成群出現，喜歡在花叢與枝葉間快速移動。",
    habitat: "庭院、果園、低海拔闊葉林",
    clue: "眼睛周圍一圈白色眼框，腹部偏黃綠，是辨識關鍵。",
    accent: "from-lime-100 to-emerald-50",
    matcherHabitats: ["park", "forest-edge"],
    matcherTraits: ["small", "eye-ring", "green"],
  },
  {
    name: "麻雀",
    summary: "與人類生活距離很近，容易在路邊、屋簷與農地周圍看到。",
    habitat: "街區、車站、農村、空地",
    clue: "體色偏褐，臉頰淡色，常以短距離跳步方式活動。",
    accent: "from-amber-100 to-stone-50",
    matcherHabitats: ["urban", "park"],
    matcherTraits: ["small", "brown"],
  },
  {
    name: "紅嘴黑鵯",
    summary: "叫聲響亮，體型中等，常見於開闊樹林與山邊聚落。",
    habitat: "山區邊緣、果園、灌叢",
    clue: "黑色身體配上鮮紅嘴喙與腳，是非常直接的辨識點。",
    accent: "from-slate-100 to-red-50",
    matcherHabitats: ["forest-edge", "park"],
    matcherTraits: ["medium", "dark"],
  },
  {
    name: "夜鷺",
    summary: "靠近水域時很有機會遇見，白天常安靜停棲，傍晚後更活躍。",
    habitat: "河岸、公園池塘、濕地",
    clue: "成鳥背部偏黑、腹部偏白，站姿穩重，脖子常縮起。",
    accent: "from-sky-100 to-cyan-50",
    matcherHabitats: ["water"],
    matcherTraits: ["waterbird", "medium", "dark"],
  },
  {
    name: "小白鷺",
    summary: "水邊常客，步伐緩慢，擅長在淺水區覓食，是新手容易認出的鳥。",
    habitat: "濕地、魚塭、溪口、河濱",
    clue: "全身白色、黑腳配黃趾，覓食時會專注盯著水面。",
    accent: "from-white to-slate-100",
    matcherHabitats: ["water"],
    matcherTraits: ["waterbird", "white", "medium"],
  },
  {
    name: "珠頸斑鳩",
    summary: "常在住宅區、公園草地與校園活動，步調穩定，常低頭在地面覓食。",
    habitat: "都市綠地、公園草地、校園空地",
    clue: "頸側有黑底白點的斑紋，看起來像一圈珠鍊。",
    accent: "from-stone-100 to-amber-50",
    matcherHabitats: ["urban", "park"],
    matcherTraits: ["medium", "brown"],
  },
  {
    name: "五色鳥",
    summary: "在台灣低海拔都市樹林很常聽到叫聲，外型可愛，是許多人入門後最先記住的樹棲鳥。",
    habitat: "都市公園、校園老樹區、低海拔林地",
    clue: "綠色身體、粗嘴、臉上有藍黃紅色塊，是辨識度很高的鳥。",
    accent: "from-emerald-100 to-lime-50",
    matcherHabitats: ["park", "forest-edge"],
    matcherTraits: ["green", "medium", "thick-bill"],
  },
  {
    name: "鵲鴝",
    summary: "在校園、住家附近與開闊林緣都不難遇見，常站在明顯的位置抬尾鳴唱。",
    habitat: "校園、庭院、林緣、低海拔聚落",
    clue: "黑白對比明顯，尾巴常翹起，是辨識時很好用的特徵。",
    accent: "from-slate-100 to-neutral-50",
    matcherHabitats: ["urban", "forest-edge"],
    matcherTraits: ["medium", "dark", "tail-up"],
  },
  {
    name: "樹鵲",
    summary: "體型比想像中大，常成小群在樹梢活動，聲音存在感很高。",
    habitat: "低海拔林緣、公園大樹區、郊山",
    clue: "長尾加上黑白栗色塊明顯，飛行時很容易留下印象。",
    accent: "from-violet-100 to-sky-50",
    matcherHabitats: ["forest-edge", "park"],
    matcherTraits: ["medium", "brown", "tail-up"],
  },
  {
    name: "黑冠麻鷺",
    summary: "在都市公園與校園其實很常見，站著不動時很像落葉堆。",
    habitat: "校園、公園草地、樹林邊緣",
    clue: "站姿筆直、嘴喙粗長，受驚時會慢慢走開而不是立刻飛走。",
    accent: "from-zinc-100 to-orange-50",
    matcherHabitats: ["park", "urban"],
    matcherTraits: ["medium", "brown", "waterbird"],
  },
  {
    name: "白鶺鴒",
    summary: "常在河岸、停車場、空地或草坪上快步行走，尾巴會上下擺動。",
    habitat: "河岸步道、草地、空地、校園",
    clue: "黑白配色明顯，走路節奏快，尾巴不停點動。",
    accent: "from-white to-slate-100",
    matcherHabitats: ["urban", "water", "park"],
    matcherTraits: ["small", "white", "tail-up"],
  },
  {
    name: "黃頭鷺",
    summary: "夏季常見於農地、草地與水田邊，繁殖羽時頭頸帶暖黃色。",
    habitat: "農田、濕地邊、草地",
    clue: "繁殖期頭頸偏黃褐，線條較修長，站姿常比牛背鷺更像典型水邊鷺科。",
    accent: "from-amber-100 to-white",
    matcherHabitats: ["water", "park"],
    matcherTraits: ["white", "waterbird", "medium"],
  },
  {
    name: "牛背鷺",
    summary: "常出現在牛群、草地與農田邊，走動節奏穩定，和小白鷺相比更短胖。",
    habitat: "草地、農田、濕地邊緣",
    clue: "脖子較短、身形更結實，常直接在地面走動，和黃頭鷺的修長感不太一樣。",
    accent: "from-amber-100 to-slate-50",
    matcherHabitats: ["water", "park"],
    matcherTraits: ["white", "waterbird", "medium"],
  },
  {
    name: "蒼鷺",
    summary: "體型很大，常在濕地、河口與魚塭靜靜站著，存在感很強。",
    habitat: "河口、魚塭、濕地、河濱",
    clue: "長腿長頸、灰色為主，飛行時脖子會縮成 S 型。",
    accent: "from-slate-100 to-cyan-50",
    matcherHabitats: ["water"],
    matcherTraits: ["waterbird", "dark", "medium"],
  },
  {
    name: "大白鷺",
    summary: "比小白鷺更高大修長，常在較開闊的濕地與河口活動。",
    habitat: "濕地、河口、魚塭、水田",
    clue: "全身白色、體型大，脖子修長，動作相對從容。",
    accent: "from-white to-cyan-50",
    matcherHabitats: ["water"],
    matcherTraits: ["white", "waterbird", "medium"],
  },
  {
    name: "翠鳥",
    summary: "常在溪流、公園池塘與河道邊出現，停棲後會突然俯衝抓魚。",
    habitat: "溪流、池塘、河岸、水圳",
    clue: "藍綠背部與橘褐腹部對比強，嘴長而直。",
    accent: "from-cyan-100 to-blue-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "green", "thick-bill"],
  },
  {
    name: "紅冠水雞",
    summary: "濕地公園很容易遇到，會在水邊草叢間走動，幼鳥與成鳥外觀差異也很有趣。",
    habitat: "埤塘、濕地、公園池畔",
    clue: "額頭有紅色額甲，身體偏黑，腳趾很長。",
    accent: "from-slate-100 to-red-50",
    matcherHabitats: ["water"],
    matcherTraits: ["waterbird", "dark", "medium"],
  },
  {
    name: "白腹秧雞",
    summary: "常在都市水溝、草叢與濕地邊緣出沒，聲音常比身影更容易先被發現。",
    habitat: "水溝、濕地草叢、池塘邊",
    clue: "臉與腹部偏白，身體深色，常快速穿梭在草叢間。",
    accent: "from-white to-slate-100",
    matcherHabitats: ["water"],
    matcherTraits: ["waterbird", "white", "dark"],
  },
  {
    name: "小彎嘴",
    summary: "在灌叢與林緣相當常見，常成對活動，叫聲辨識度高。",
    habitat: "灌叢、林緣、郊山步道",
    clue: "尾巴長、嘴微彎，動作靈活，常在低矮枝葉間穿梭。",
    accent: "from-stone-100 to-lime-50",
    matcherHabitats: ["forest-edge"],
    matcherTraits: ["small", "brown", "tail-up"],
  },
  {
    name: "灰頭鷦鶯",
    summary: "草地與灌叢的常客，會在蘆葦或草叢頂端停一下又鑽進去。",
    habitat: "草地、濕地灌叢、農地邊緣",
    clue: "頭偏灰、身體褐色，尾巴細長，常發出連續叫聲。",
    accent: "from-zinc-100 to-amber-50",
    matcherHabitats: ["park", "water", "forest-edge"],
    matcherTraits: ["small", "brown", "tail-up"],
  },
  {
    name: "褐頭鷦鶯",
    summary: "和灰頭鷦鶯一樣很常見，但頭頂更偏暖褐色，棲地重疊度高。",
    habitat: "草地、濕地邊、灌叢",
    clue: "頭頂褐色較明顯，尾巴細長，常在低處快速移動。",
    accent: "from-amber-100 to-stone-50",
    matcherHabitats: ["park", "water", "forest-edge"],
    matcherTraits: ["small", "brown", "tail-up"],
  },
  {
    name: "家燕",
    summary: "春夏常見的飛行高手，常在建築物與空地上空高速掠過。",
    habitat: "街區上空、橋下、河岸、農地",
    clue: "飛行速度快、尾叉明顯，停棲時身形修長。",
    accent: "from-slate-100 to-blue-50",
    matcherHabitats: ["urban", "water"],
    matcherTraits: ["small", "dark", "tail-up", "swallow", "swallow-summer", "summer-migrant"],
  },
  {
    name: "赤腰燕",
    summary: "和家燕一樣常見於開闊空域，但腰部的暖色調是很好的辨識點。",
    habitat: "農地、河岸、聚落邊緣",
    clue: "腹部較淡，腰部帶橙褐色，尾叉不如家燕那麼深。",
    accent: "from-amber-100 to-white",
    matcherHabitats: ["urban", "water"],
    matcherTraits: ["small", "brown", "tail-up", "swallow", "swallow-summer", "summer-migrant"],
  },
  {
    name: "洋燕",
    summary: "常在低海拔聚落、海岸和河岸附近飛行捕蟲，飛行高度常較低，是很適合和家燕比較的燕科鳥。",
    habitat: "海岸、河岸、聚落、開闊地",
    clue: "尾叉較短，額與喉帶暖栗色，整體比家燕更圓短，常貼近水面或建物周邊飛行。",
    accent: "from-cyan-100 to-amber-50",
    matcherHabitats: ["urban", "water", "park"],
    matcherTraits: ["small", "dark", "orange", "tail-up", "swallow", "swallow-summer", "summer-migrant"],
  },
  {
    name: "棕沙燕",
    summary: "小型燕科鳥，常沿河岸、濕地或開闊水域上方成群飛行，遷徙季與夏季前後較容易被注意。",
    habitat: "河岸、濕地、開闊水域、農田上空",
    clue: "整體灰褐色調，喉胸較淡，尾叉不深，常以快速低飛方式在水面或草地上空捕蟲。",
    accent: "from-stone-100 to-sky-50",
    matcherHabitats: ["water", "park"],
    matcherTraits: ["small", "brown", "white", "swallow", "swallow-summer", "summer-migrant"],
  },
  {
    name: "大卷尾",
    summary: "在農地、公園與林緣常停在高處觀察，捕蟲動作俐落。",
    habitat: "開闊林緣、農地、公園",
    clue: "整體黑色，尾巴分叉像剪刀，是很好記的特徵。",
    accent: "from-slate-100 to-neutral-50",
    matcherHabitats: ["park", "forest-edge", "urban"],
    matcherTraits: ["dark", "medium", "tail-up"],
  },
  {
    name: "斑文鳥",
    summary: "草地和農地邊很常見，常小群覓食，冬季時更容易遇到。",
    habitat: "草地、農田、灌叢邊",
    clue: "褐色身體配上白色斑點，嘴粗短呈灰藍色。",
    accent: "from-stone-100 to-amber-50",
    matcherHabitats: ["park", "forest-edge"],
    matcherTraits: ["small", "brown", "thick-bill"],
  },
  {
    name: "白腰文鳥",
    summary: "常混在斑文鳥群裡，體型小巧，喜歡在草穗和低矮植被上活動。",
    habitat: "草地、農地邊、灌叢",
    clue: "深色身體配上明顯白腰，嘴厚而短。",
    accent: "from-slate-100 to-white",
    matcherHabitats: ["park", "forest-edge"],
    matcherTraits: ["small", "dark", "thick-bill"],
  },
  {
    name: "紅鳩",
    summary: "在郊區、農地與林緣不難遇到，叫聲低沉，常靜靜停在電線或枝頭。",
    habitat: "農地、灌叢、聚落邊緣",
    clue: "整體帶暖紅褐色調，體型比斑鳩更纖細。",
    accent: "from-rose-100 to-amber-50",
    matcherHabitats: ["forest-edge", "urban"],
    matcherTraits: ["medium", "brown"],
  },
  {
    name: "山紅頭",
    summary: "低海拔山區常見的小型山鳥，成群活動時很熱鬧。",
    habitat: "林緣、郊山步道、低海拔闊葉林",
    clue: "頭部偏栗紅，身體橄欖綠，常在樹梢間不停穿梭。",
    accent: "from-rose-100 to-lime-50",
    matcherHabitats: ["forest-edge"],
    matcherTraits: ["small", "green", "brown"],
  },
  {
    name: "台灣藍鵲",
    summary: "雖然不是每天都遇到，但在部分郊區和校園林地很有機會看見整群出動。",
    habitat: "郊山、校園樹林、住宅區邊緣",
    clue: "藍色身體、紅嘴紅腳，尾巴非常長，辨識度極高。",
    accent: "from-cyan-100 to-indigo-100",
    matcherHabitats: ["forest-edge", "urban"],
    matcherTraits: ["medium", "tail-up", "dark"],
  },
  {
    name: "喜鵲",
    summary: "在部分北部空曠綠地與河濱不難看到，黑白配色鮮明。",
    habitat: "河濱、公園、農田邊",
    clue: "黑白身體搭配長尾，站在高處時相當醒目。",
    accent: "from-white to-slate-100",
    matcherHabitats: ["park", "urban"],
    matcherTraits: ["medium", "white", "tail-up"],
  },
  {
    name: "鳳頭蒼鷹",
    summary: "都市公園與校園樹林都可能見到，是台灣都會區相當有名的猛禽。",
    habitat: "都市公園、校園、大型綠地",
    clue: "飛行時尾巴長、翅圓，眼神銳利，腹面有細橫斑。",
    accent: "from-stone-100 to-slate-50",
    matcherHabitats: ["park", "urban"],
    matcherTraits: ["medium", "brown", "head-pattern"],
  },
  {
    name: "大冠鷲",
    summary: "郊山和林緣經常能看到在空中盤旋，是入門辨認猛禽的好對象。",
    habitat: "山區步道、林緣、丘陵",
    clue: "頭後有冠羽，飛行時翅膀寬大，尾巴有明顯條紋。",
    accent: "from-amber-100 to-zinc-50",
    matcherHabitats: ["forest-edge"],
    matcherTraits: ["medium", "brown", "head-pattern"],
  },
  {
    name: "小環頸鴴",
    summary: "河灘與潮間帶常見的小型鷸鴴科鳥類，常在裸露地表快速跑動。",
    habitat: "河灘、海邊、濕地裸地",
    clue: "眼圈鮮明、腳細長，停下來時頭部黑白花紋很清楚。",
    accent: "from-amber-100 to-sky-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "white", "head-pattern"],
  },
  {
    name: "磯鷸",
    summary: "溪流與河岸很容易看到，常低頭點動身體，在石頭與水邊來回走動。",
    habitat: "溪流、河岸、濕地邊",
    clue: "褐色背、白色腹，飛起來時翅膀上有白斑。",
    accent: "from-stone-100 to-sky-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "brown", "white"],
  },
  {
    name: "黃小鷺",
    summary: "喜歡躲在水邊植被裡，離得近時常突然振翅飛起。",
    habitat: "池塘、濕地、蘆葦邊",
    clue: "身形較小，背部偏黃褐，飛行時翅膀大片白色很明顯。",
    accent: "from-amber-100 to-white",
    matcherHabitats: ["water"],
    matcherTraits: ["waterbird", "brown", "white"],
  },
  {
    name: "小水鴨",
    summary: "冬季濕地常見鴨科鳥類，體型小巧，是辨識水鳥的好入門。",
    habitat: "埤塘、濕地、河口",
    clue: "身體緊湊，公鳥頭部花色細緻，常成群休息或覓食。",
    accent: "from-emerald-100 to-cyan-50",
    matcherHabitats: ["water"],
    matcherTraits: ["waterbird", "small", "green"],
  },
  {
    name: "綠頭鴨",
    summary: "在公園湖面與冬季濕地都很常見，是許多人最熟悉的鴨類之一。",
    habitat: "池塘、湖泊、濕地",
    clue: "公鳥頭部綠色金屬光澤明顯，母鳥則偏褐色。",
    accent: "from-green-100 to-emerald-50",
    matcherHabitats: ["water"],
    matcherTraits: ["waterbird", "green", "brown"],
  },
  {
    name: "赤腹鶇",
    summary: "秋冬在公園與林地地面覓食時常見，偶爾會一群一起出現。",
    habitat: "公園草地、林下、校園樹蔭",
    clue: "腹部暖橘色很有記憶點，常在落葉層翻找食物。",
    accent: "from-rose-100 to-amber-50",
    matcherHabitats: ["park", "forest-edge"],
    matcherTraits: ["medium", "brown", "ground"],
  },
  {
    name: "白腹鶇",
    summary: "冬季都會公園常見的鶇科鳥類，安靜時不太起眼，但其實很常出現。",
    habitat: "公園、校園、林緣",
    clue: "腹部偏白，背部褐灰色，站姿挺直。",
    accent: "from-white to-stone-100",
    matcherHabitats: ["park", "forest-edge"],
    matcherTraits: ["medium", "white", "brown"],
  },
  {
    name: "灰椋鳥",
    summary: "在都市街區、校園和公園都常見，常群聚停在電線或樹上。",
    habitat: "街區、公園、校園",
    clue: "灰白身體配黑色頭部與橘色嘴腳，群體行動很明顯。",
    accent: "from-slate-100 to-amber-50",
    matcherHabitats: ["urban", "park"],
    matcherTraits: ["medium", "white", "dark"],
  },
  {
    name: "八哥",
    summary: "都市常見外來種，在草地上行走和在路燈上停棲都很常見。",
    habitat: "街區、公園、空地",
    clue: "黑褐色身體、黃色嘴腳，眼周裸皮也偏黃。",
    accent: "from-zinc-100 to-amber-50",
    matcherHabitats: ["urban", "park"],
    matcherTraits: ["medium", "dark", "brown"],
  },
  {
    name: "白尾八哥",
    summary: "和八哥一樣常在人類活動區域出現，飛行時尾部白斑容易被注意到。",
    habitat: "公園、校園、街區",
    clue: "身體偏深色，尾部白色塊和黃色嘴腳很醒目。",
    accent: "from-slate-100 to-white",
    matcherHabitats: ["urban", "park"],
    matcherTraits: ["medium", "white", "dark"],
  },
  {
    name: "家八哥",
    summary: "在都市與市場周邊活動力很強，叫聲粗啞，常成對或成群。",
    habitat: "街區、住商混合區、公園",
    clue: "褐色身體、黑頭、黃色眼圈與嘴腳，是典型外來種外觀。",
    accent: "from-amber-100 to-zinc-50",
    matcherHabitats: ["urban"],
    matcherTraits: ["medium", "brown", "dark"],
  },
  {
    name: "黑翅鳶",
    summary: "近年在台灣平地愈來愈常見，常停在電線杆上觀察草地中的獵物。",
    habitat: "農地、河濱、草地邊",
    clue: "全身灰白，肩部有黑色翼斑，會在空中定點振翅。",
    accent: "from-white to-slate-100",
    matcherHabitats: ["park", "urban", "water"],
    matcherTraits: ["white", "dark", "medium"],
  },
  {
    name: "黑鳶",
    summary: "河岸與開闊地常可見在空中盤旋，是很有代表性的中大型猛禽。",
    habitat: "河濱、河口、開闊丘陵",
    clue: "尾巴略呈凹形，飛行時翅膀長而略成 V 字。",
    accent: "from-zinc-100 to-slate-50",
    matcherHabitats: ["water", "forest-edge"],
    matcherTraits: ["dark", "medium"],
  },
  {
    name: "黑面琵鷺",
    summary: "冬季濕地明星鳥種，雖然不是生活圈天天可見，但新手常會特別想認識。",
    habitat: "河口、潟湖、濕地",
    clue: "全身白色，黑色匙狀嘴非常好認。",
    accent: "from-white to-slate-100",
    matcherHabitats: ["water"],
    matcherTraits: ["white", "waterbird", "thick-bill"],
  },
  {
    name: "冠羽畫眉",
    summary: "郊山步道與低海拔林緣常成群出現，動作熱鬧也不算太怕人。",
    habitat: "林緣、郊山、竹林邊",
    clue: "頭頂有微翹冠羽，眼周與臉部花紋清楚。",
    accent: "from-stone-100 to-lime-50",
    matcherHabitats: ["forest-edge"],
    matcherTraits: ["small", "brown", "head-pattern"],
  },
  {
    name: "白耳畫眉",
    summary: "山區和林緣常見，聲音宏亮，常一邊叫一邊在灌木間移動。",
    habitat: "郊山、林緣、竹林",
    clue: "耳羽白色明顯，背部褐色，尾巴略長。",
    accent: "from-white to-stone-100",
    matcherHabitats: ["forest-edge"],
    matcherTraits: ["small", "brown", "head-pattern"],
  },
  {
    name: "棕背伯勞",
    summary: "秋冬在空曠地和草生地很常見，常停在高處等待獵物。",
    habitat: "空地、河濱、農地、草地",
    clue: "眼部黑色過眼線強烈，背部帶栗褐色。",
    accent: "from-amber-100 to-slate-50",
    matcherHabitats: ["park", "urban", "water"],
    matcherTraits: ["small", "brown", "head-pattern"],
  },
  {
    name: "東方環頸鴴",
    summary: "小型鴴科水鳥，冬季與過境期常在河口、沙洲、海岸灘地快速跑停覓食。",
    habitat: "河口、沙灘、潮間帶、鹽田裸地",
    clue: "體型小、腿細，胸前有斷開的黑褐色環帶，常用跑跑停停的方式覓食。",
    accent: "from-amber-100 to-sky-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "brown", "white", "shorebird", "plover", "winter-migrant"],
  },
  {
    name: "蒙古鴴",
    summary: "常見過境與冬候鴴科鳥，喜歡在海岸泥灘、河口與沙洲活動。",
    habitat: "河口泥灘、沙洲、海岸濕地",
    clue: "嘴較短、身形圓潤，繁殖羽胸側橙褐色，非繁殖羽則偏灰褐。",
    accent: "from-stone-100 to-sky-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "brown", "white", "shorebird", "plover", "winter-migrant"],
  },
  {
    name: "鐵嘴鴴",
    summary: "比蒙古鴴略大，冬季與過境期在開闊泥灘和海岸沙洲可見。",
    habitat: "河口、潮間帶、海岸沙地",
    clue: "嘴較粗長，頭胸比例比蒙古鴴更紮實，常和其他鴴科混群。",
    accent: "from-amber-100 to-stone-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "brown", "white", "shorebird", "plover", "winter-migrant"],
  },
  {
    name: "灰斑鴴",
    summary: "中型鴴科冬候鳥，非繁殖羽灰白低調，常在潮間帶與河口灘地活動。",
    habitat: "河口、泥灘、海岸濕地",
    clue: "體型較大，嘴短直，非繁殖羽整體灰白，飛行時黑色腋羽是重要線索。",
    accent: "from-slate-100 to-sky-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "gray", "white", "shorebird", "plover", "winter-migrant"],
  },
  {
    name: "太平洋金斑鴴",
    summary: "過境與冬季可見的中型鴴科鳥，常在草地、河口與泥灘覓食。",
    habitat: "河口、草地、潮間帶、農地邊",
    clue: "背部金褐斑點細緻，站姿挺直，繁殖羽時黑腹與白邊非常鮮明。",
    accent: "from-yellow-100 to-stone-50",
    matcherHabitats: ["water", "park"],
    matcherTraits: ["medium", "brown", "yellow", "shorebird", "plover", "winter-migrant"],
  },
  {
    name: "高蹺鴴",
    summary: "黑白配色明顯的長腿水鳥，在濕地、水田與魚塭很容易被注意到。",
    habitat: "濕地、水田、魚塭、淺水池",
    clue: "腿非常長且偏粉紅，身體黑白分明，涉水時姿態像踩高蹺。",
    accent: "from-white to-rose-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "white", "dark", "long-leg", "shorebird", "winter-migrant"],
  },
  {
    name: "反嘴鴴",
    summary: "冬季局部可見的優雅水鳥，常在淺水區用上彎嘴左右掃水覓食。",
    habitat: "河口、潟湖、鹽田、淺水濕地",
    clue: "黑白配色、長腿與上彎嘴非常醒目，覓食方式也很特殊。",
    accent: "from-white to-sky-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "white", "dark", "long-leg", "long-bill", "shorebird", "winter-migrant"],
  },
  {
    name: "大杓鷸",
    summary: "大型鷸科冬候鳥，常在廣闊河口與泥灘低頭覓食。",
    habitat: "河口泥灘、潮間帶、濕地",
    clue: "體型大，嘴非常長且向下彎，是鷸科裡最容易記住的輪廓之一。",
    accent: "from-stone-100 to-amber-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium-large", "brown", "long-bill", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "中杓鷸",
    summary: "常見過境與冬候鷸科鳥，和大杓鷸相似但體型較小、頭部花紋更明顯。",
    habitat: "河口、海岸泥灘、沙洲",
    clue: "嘴下彎但比大杓鷸短，頭頂有明顯深淺條紋。",
    accent: "from-amber-100 to-stone-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium-large", "brown", "head-pattern", "long-bill", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "青足鷸",
    summary: "冬季與過境期常見的鷸科水鳥，會在淺水邊緣慢步覓食。",
    habitat: "濕地、河口、水田、魚塭",
    clue: "腳偏灰綠，嘴略上翹，身形修長，常單獨或小群活動。",
    accent: "from-sky-100 to-stone-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "gray", "white", "long-leg", "long-bill", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "赤足鷸",
    summary: "冬候與過境期可見，常在河口、泥灘和濕地邊緣覓食。",
    habitat: "河口、濕地、潮間帶",
    clue: "紅色腳與嘴基部是重要線索，飛行時白色翼後緣很明顯。",
    accent: "from-rose-100 to-sky-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "gray", "white", "long-leg", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "鷹斑鷸",
    summary: "常見過境鷸科鳥，喜歡淡水濕地、水田和池塘邊緣。",
    habitat: "水田、池塘邊、濕地草澤",
    clue: "背部斑點細碎，腳偏黃綠，常在淺水草邊仔細覓食。",
    accent: "from-stone-100 to-lime-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "brown", "white", "long-leg", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "田鷸",
    summary: "冬季濕地與水田常見，但保護色很好，常到飛起才發現。",
    habitat: "水田、濕草地、池塘邊、沼澤",
    clue: "嘴很長、身體褐色斑紋密集，常貼近草邊蹲伏。",
    accent: "from-amber-100 to-stone-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "brown", "head-pattern", "long-bill", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "尖尾濱鷸",
    summary: "秋冬過境濱鷸之一，常和其他小型鷸科混群出現在泥灘。",
    habitat: "河口泥灘、潮間帶、鹽田",
    clue: "體型小，胸部常有細斑，非繁殖羽整體偏褐灰，需和其他濱鷸仔細比較。",
    accent: "from-stone-100 to-sky-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "brown", "white", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "紅胸濱鷸",
    summary: "小型濱鷸，過境與冬季可見，常在灘地邊緣成群覓食。",
    habitat: "河口、泥灘、海岸濕地",
    clue: "體型很小，繁殖羽胸腹帶紅褐，非繁殖羽則偏灰白，需要看嘴長與體型。",
    accent: "from-rose-100 to-slate-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "brown", "white", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "寬嘴鷸",
    summary: "過境期較值得留意的小型鷸科，常混在濱鷸群裡。",
    habitat: "河口泥灘、鹽田、潮間帶",
    clue: "嘴基較寬、嘴端微下彎，體型小，觀察時要和紅胸濱鷸等相似種比較。",
    accent: "from-stone-100 to-cyan-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "brown", "white", "long-bill", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "三趾濱鷸",
    summary: "常在海邊浪緣快速跑動，冬季海岸線很有機會遇到。",
    habitat: "沙灘、海岸浪緣、潮間帶",
    clue: "體色偏白灰，常追著退浪跑動覓食，腳色偏黑。",
    accent: "from-white to-slate-100",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "white", "gray", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "翻石鷸",
    summary: "冬季海岸和礁岩區常見，會翻動小石頭和海藻找食物。",
    habitat: "礁岩海岸、港邊、潮間帶",
    clue: "橙色腳明顯，羽色黑白褐斑駁，行為上常翻石覓食。",
    accent: "from-orange-100 to-stone-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "brown", "white", "orange", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "黑腹濱鷸",
    summary: "冬季常見濱鷸，常成群在河口泥灘覓食。",
    habitat: "河口、泥灘、鹽田、潮間帶",
    clue: "嘴略下彎，非繁殖羽灰白低調，繁殖羽腹部黑色是強烈辨識點。",
    accent: "from-slate-100 to-white",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "gray", "white", "dark", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "黑尾鷸",
    summary: "大型鷸科冬候鳥，常在河口泥灘與水田成群覓食。",
    habitat: "河口、濕地、水田、魚塭",
    clue: "嘴長直，飛行時黑白尾羽對比清楚，腿也明顯較長。",
    accent: "from-stone-100 to-rose-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium-large", "brown", "white", "long-bill", "long-leg", "shorebird", "sandpiper", "winter-migrant"],
  },
  {
    name: "琵嘴鴨",
    summary: "冬季常見雁鴨，常在湖面或濕地水面群聚濾食。",
    habitat: "湖泊、埤塘、濕地、河口",
    clue: "嘴寬大像小湯匙，是最明顯的辨識重點。",
    accent: "from-emerald-100 to-amber-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium-large", "waterbird", "green", "white", "thick-bill", "winter-migrant"],
  },
  {
    name: "赤頸鴨",
    summary: "冬季常見雁鴨，常和其他鴨類混群在開闊水面休息。",
    habitat: "湖泊、河口、濕地、埤塘",
    clue: "公鳥頭頸栗紅、額頭淡黃，身體灰色，遠看色塊很有辨識度。",
    accent: "from-rose-100 to-slate-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium-large", "waterbird", "brown", "gray", "winter-migrant"],
  },
  {
    name: "尖尾鴨",
    summary: "冬季常見雁鴨，體態修長，常在濕地或河口水面活動。",
    habitat: "濕地、河口、湖泊、埤塘",
    clue: "公鳥尾羽尖長、頸部白線上延，整體比例優雅修長。",
    accent: "from-stone-100 to-white",
    matcherHabitats: ["water"],
    matcherTraits: ["medium-large", "waterbird", "brown", "white", "tail-up", "winter-migrant"],
  },
  {
    name: "白眉鴨",
    summary: "小型雁鴨，過境與冬季可見，公鳥臉上的白眉非常醒目。",
    habitat: "水田、濕地、池塘、河口",
    clue: "公鳥頭側有明顯白眉，體型比多數雁鴨小，常混在其他鴨群裡。",
    accent: "from-white to-amber-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "waterbird", "brown", "white", "head-pattern", "winter-migrant"],
  },
  {
    name: "花嘴鴨",
    summary: "在台灣水域可見度高的鴨類，部分地區可全年觀察。",
    habitat: "公園湖泊、濕地、河川、埤塘",
    clue: "嘴端黃色明顯，身體褐色斑駁，飛行時翼鏡色塊可協助確認。",
    accent: "from-amber-100 to-green-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium-large", "waterbird", "brown", "yellow", "thick-bill"],
  },
  {
    name: "彩鷸",
    summary: "偏隱密的濕地鳥，常在水田、草澤與淺水植被邊活動。",
    habitat: "水田、濕草地、沼澤、池塘邊",
    clue: "眼周白色線條和身體斑紋明顯，雌鳥色彩通常比雄鳥鮮明。",
    accent: "from-rose-100 to-stone-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "brown", "white", "head-pattern", "shorebird", "winter-migrant"],
  },
  {
    name: "燕鴴",
    summary: "夏候鳥與過境鳥，常在開闊草地、河灘與農地上空飛行捕蟲。",
    habitat: "河灘、農地、草地、空曠濕地",
    clue: "翼型像燕子但停下來像鴴科，喉部淡色邊線和長翅是重點。",
    accent: "from-amber-100 to-sky-50",
    matcherHabitats: ["water", "park"],
    matcherTraits: ["medium", "brown", "white", "shorebird", "summer-migrant"],
  },
  {
    name: "小燕鷗",
    summary: "夏季海岸與河口常見的小型燕鷗，常在水面上方盤旋俯衝覓食。",
    habitat: "海岸、河口、沙洲、港區",
    clue: "體型小，額頭白色、嘴偏黃色，飛行輕快，常俯衝入水。",
    accent: "from-white to-sky-50",
    matcherHabitats: ["water"],
    matcherTraits: ["small", "white", "gray", "shorebird", "summer-migrant"],
  },
  {
    name: "黑枕燕鷗",
    summary: "夏季海岸與離島常見燕鷗，飛行優雅，常在海面上巡航。",
    habitat: "海岸、港區、離島、近海",
    clue: "黑色後頸像一條黑枕帶，身體白灰，翅膀修長。",
    accent: "from-white to-cyan-50",
    matcherHabitats: ["water"],
    matcherTraits: ["medium", "white", "gray", "dark", "shorebird", "summer-migrant"],
  },
  {
    name: "栗喉蜂虎",
    summary: "夏候鳥，常在河岸沙地與開闊地飛行捕蟲，色彩鮮明很容易留下印象。",
    habitat: "河岸沙地、農地邊、開闊草地",
    clue: "藍綠身體、栗色喉部與細長黑嘴，常成群停在電線或裸枝上。",
    accent: "from-cyan-100 to-amber-50",
    matcherHabitats: ["water", "park"],
    matcherTraits: ["small", "green", "blue", "orange", "long-bill", "summer-migrant"],
  },
];

type TaiwanEndemicStatus = "species" | "subspecies";

type TaiwanEndemicTaxon = {
  name: string;
  scientificName: string;
  status: TaiwanEndemicStatus;
};

const taiwanEndemicTaxa: TaiwanEndemicTaxon[] = [
  { name: "松雀鷹台灣亞種", scientificName: "Accipiter virgatus fuscipectus", status: "subspecies" },
  { name: "鳳頭蒼鷹台灣亞種", scientificName: "Lophospiza trivirgata formosae", status: "subspecies" },
  { name: "大冠鷲台灣亞種", scientificName: "Spilornis cheela hoya", status: "subspecies" },
  { name: "台灣山鷓鴣", scientificName: "Arborophila crudigularis", status: "species" },
  { name: "台灣竹雞", scientificName: "Bambusicola sonorivox", status: "species" },
  { name: "藍腹鷴", scientificName: "Lophura swinhoii", status: "species" },
  { name: "環頸雉台灣亞種", scientificName: "Phasianus colchicus foumosanus", status: "subspecies" },
  { name: "帝雉", scientificName: "Syrmaticus mikado", status: "species" },
  { name: "灰胸秧雞台灣亞種", scientificName: "Lewinia striata taiwana", status: "subspecies" },
  { name: "灰腳秧雞台灣亞種", scientificName: "Rallina eurizonoides formosana", status: "subspecies" },
  { name: "棕三趾鶉台灣亞種", scientificName: "Turnix suscitator rostrata", status: "subspecies" },
  { name: "金背鳩台灣亞種", scientificName: "Streptopelia orientalis orii", status: "subspecies" },
  { name: "紅頭綠鳩台灣亞種", scientificName: "Treron formosae formosae", status: "subspecies" },
  { name: "蘭嶼角鴞台灣亞種", scientificName: "Otus elegans botelensis", status: "subspecies" },
  { name: "黃嘴角鴞亞種", scientificName: "Otus spilocephalus hambrooki", status: "subspecies" },
  { name: "東方灰林鴞", scientificName: "Strix nivicolum", status: "subspecies" },
  { name: "鵂鶹台灣亞種", scientificName: "Taenioptynx brodiei pardalotum", status: "subspecies" },
  { name: "東方草鴞台灣亞種", scientificName: "Tyto longimembris pithecops", status: "subspecies" },
  { name: "南亞夜鷹台灣亞種", scientificName: "Caprimulgus affinis stictomus", status: "subspecies" },
  { name: "五色鳥", scientificName: "Psilopogon nuchalis", status: "species" },
  { name: "大赤啄木台灣亞種", scientificName: "Dendrocopos leucotos insularis", status: "subspecies" },
  { name: "綠啄木台灣亞種", scientificName: "Picus canus tancolo", status: "subspecies" },
  { name: "小啄木台灣亞種", scientificName: "Yungipicus canicapillus kaleensis", status: "subspecies" },
  { name: "小雲雀澎湖亞種", scientificName: "Alauda gulgula coelivox", status: "subspecies" },
  { name: "小雲雀台灣亞種", scientificName: "Alauda gulgula wattersi", status: "subspecies" },
  { name: "深山鶯台灣亞種", scientificName: "Horornis acanthizoides concolor", status: "subspecies" },
  { name: "台灣小鶯台灣亞種", scientificName: "Horornis fortipes robustipes", status: "subspecies" },
  { name: "黃頭扇尾鶯台灣亞種", scientificName: "Cisticola exilis volitans", status: "subspecies" },
  { name: "斑紋鷦鶯台灣亞種", scientificName: "Prinia striata striata", status: "subspecies" },
  { name: "褐頭鷦鶯台灣亞種", scientificName: "Prinia inornata flavirostris", status: "subspecies" },
  { name: "樹鵲台灣亞種", scientificName: "Dendrocitta formosae formosae", status: "subspecies" },
  { name: "松鴉台灣亞種", scientificName: "Garrulus glandarius taivanus", status: "subspecies" },
  { name: "星鴉台灣亞種", scientificName: "Nucifraga caryocatactes owstoni", status: "subspecies" },
  { name: "台灣藍鵲", scientificName: "Urocissa caerulea", status: "species" },
  { name: "紅胸啄花鳥台灣亞種", scientificName: "Dicaeum ignipectus formosum", status: "subspecies" },
  { name: "綠啄花鳥台灣亞種", scientificName: "Dicaeum minullum uchidai", status: "subspecies" },
  { name: "小卷尾台灣亞種", scientificName: "Dicrurus aeneus braunianus", status: "subspecies" },
  { name: "大卷尾台灣亞種", scientificName: "Dicrurus macrocercus harterti", status: "subspecies" },
  { name: "黑頭文鳥台灣亞種", scientificName: "Lonchura atricapilla formosana", status: "subspecies" },
  { name: "台灣朱雀", scientificName: "Carpodacus formosanus", status: "species" },
  { name: "台灣灰鷽", scientificName: "Pyrrhula owstoni", status: "species" },
  { name: "褐鷽台灣亞種", scientificName: "Pyrrhula nipalensis uchidai", status: "subspecies" },
  { name: "紋翼畫眉", scientificName: "Actinodura morrisoniana", status: "species" },
  { name: "繡眼畫眉", scientificName: "Alcippe morrisonia", status: "species" },
  { name: "台灣畫眉", scientificName: "Garrulax taewanus", status: "species" },
  { name: "白耳畫眉", scientificName: "Heterophasia auricularis", status: "species" },
  { name: "黃胸藪眉", scientificName: "Liocichla steerii", status: "species" },
  { name: "棕噪眉", scientificName: "Pterorhinus poecilorhynchus", status: "species" },
  { name: "台灣白喉噪鶥", scientificName: "Pterorhinus ruficeps", status: "species" },
  { name: "台灣噪眉", scientificName: "Trochalopteron morrisonianum", status: "species" },
  { name: "台灣叢樹鶯", scientificName: "Locustella alishanensis", status: "species" },
  { name: "黑枕藍鶲台灣亞種", scientificName: "Hypothymis azurea oberholseri", status: "subspecies" },
  { name: "小翼鶇", scientificName: "Brachypteryx goodfellowi", status: "species" },
  { name: "黃胸青鶲台灣亞種", scientificName: "Ficedula hyperythra innexa", status: "subspecies" },
  { name: "白尾鴝台灣亞種", scientificName: "Myiomela leucura montium", status: "subspecies" },
  { name: "台灣紫嘯鶇", scientificName: "Myophonus insularis", status: "species" },
  { name: "黃腹琉璃台灣亞種", scientificName: "Niltava vivida vivida", status: "subspecies" },
  { name: "鉛色水鶇台灣亞種", scientificName: "Phoenicurus fuliginosus affinis", status: "subspecies" },
  { name: "白眉林鴝台灣亞種", scientificName: "Tarsiger indicus formosanus", status: "subspecies" },
  { name: "栗背林鴝", scientificName: "Tarsiger johnstoniae", status: "species" },
  { name: "朱鸝台灣亞種", scientificName: "Oriolus traillii ardens", status: "subspecies" },
  { name: "褐頭花翼", scientificName: "Fulvetta formosana", status: "species" },
  { name: "黃羽鸚嘴台灣亞種", scientificName: "Suthora verreauxi morrisoniana", status: "subspecies" },
  { name: "粉紅鸚嘴台灣亞種", scientificName: "Suthora webbiana bulomachus", status: "subspecies" },
  { name: "赤腹山雀", scientificName: "Sittiparus castaneoventris", status: "species" },
  { name: "黃山雀", scientificName: "Machlolophus holsti", status: "species" },
  { name: "青背山雀台灣亞種", scientificName: "Parus monticolus insperatus", status: "subspecies" },
  { name: "煤山雀台灣亞種", scientificName: "Periparus ater ptilosus", status: "subspecies" },
  { name: "頭烏線台灣亞種", scientificName: "Schoeniparus brunneus brunneus", status: "subspecies" },
  { name: "臺灣鷦眉", scientificName: "Pnoepyga formosana", status: "species" },
  { name: "岩鷚台灣亞種", scientificName: "Prunella collaris fennelli", status: "subspecies" },
  { name: "棕耳鵯台灣亞種", scientificName: "Hypsipetes amaurotis nagamichii", status: "subspecies" },
  { name: "紅嘴黑鵯台灣亞種", scientificName: "Hypsipetes leucocephalus nigerrimus", status: "subspecies" },
  { name: "白頭翁台灣亞種", scientificName: "Pycnonotus sinensis formosae", status: "subspecies" },
  { name: "烏頭翁", scientificName: "Pycnonotus taivanus", status: "species" },
  { name: "白環鸚嘴鵯台灣亞種", scientificName: "Spizixos semitorques cinereicapillus", status: "subspecies" },
  { name: "火冠戴菊鳥", scientificName: "Regulus goodfellowi", status: "species" },
  { name: "茶腹鳾台灣亞種", scientificName: "Sitta europaea formosana", status: "subspecies" },
  { name: "八哥台灣亞種", scientificName: "Acridotheres cristatellus formosanus", status: "subspecies" },
  { name: "山紅頭台灣亞種", scientificName: "Cyanoderma ruficeps praecognitum", status: "subspecies" },
  { name: "大彎嘴", scientificName: "Erythrogenys erythrocnemis", status: "species" },
  { name: "小彎嘴", scientificName: "Pomatorhinus musicus", status: "species" },
  { name: "鷦鷯台灣亞種", scientificName: "Troglodytes troglodytes taivanus", status: "subspecies" },
  { name: "白頭鶇", scientificName: "Turdus niveiceps", status: "species" },
  { name: "冠羽畫眉", scientificName: "Yuhina brunneiceps", status: "species" },
];

const taiwanEndemicStatusByName = taiwanEndemicTaxa.reduce<Record<string, TaiwanEndemicStatus>>(
  (statuses, taxon) => {
    statuses[taxon.name] = taxon.status;
    return statuses;
  },
  {}
);

function stripEndemicSubspeciesSuffix(name: string) {
  return name.replace(/台灣亞種$/, "").replace(/澎湖亞種$/, "").replace(/亞種$/, "");
}

function resolveBirdImageOverride(name: string): BirdImageOverride {
  const exactOverride = birdImageOverrides[name];

  if (exactOverride) return exactOverride;

  const strippedName = stripEndemicSubspeciesSuffix(name);
  const sameSpeciesOverride = strippedName !== name ? birdImageOverrides[strippedName] : undefined;

  if (sameSpeciesOverride) {
    return {
      ...sameSpeciesOverride,
      imageAlt: `${name} 的本種參考照片`,
      imageCredit: `${sameSpeciesOverride.imageCredit}（本種參考照）`,
    };
  }

  return createBirdPlaceholderImage(name);
}

function inferEndemicHabitats(name: string) {
  if (/秧雞|水鶇|白尾鴝/.test(name)) return ["water", "forest-edge"];
  if (/雲雀|三趾鶉|扇尾鶯|鷦鶯|草鴞|環頸雉/.test(name)) return ["park", "forest-edge"];
  if (/鳩|八哥|白頭翁|烏頭翁|文鳥|卷尾|棕耳鵯|白環鸚嘴鵯/.test(name)) return ["urban", "park"];
  return ["forest-edge"];
}

function inferEndemicHabitatText(name: string) {
  if (/秧雞|水鶇|白尾鴝/.test(name)) return "溪流、水田、濕地邊緣與潮濕林下";
  if (/雲雀|三趾鶉|扇尾鶯|鷦鶯|草鴞|環頸雉/.test(name)) return "草地、農田、開闊地與灌叢邊緣";
  if (/鳩|八哥|白頭翁|烏頭翁|文鳥|卷尾|棕耳鵯|白環鸚嘴鵯/.test(name)) {
    return "平地聚落、公園、校園、農村與林緣";
  }
  if (/鷹|鷲|鴞|鵂鶹|夜鷹/.test(name)) return "森林、山區步道、林緣上空與夜間活動環境";
  return "台灣山林、林緣、灌叢與中高海拔步道";
}

function inferEndemicTraits(name: string, status: TaiwanEndemicStatus) {
  const traits = new Set<string>([
    status === "species" ? "taiwan-endemic" : "taiwan-endemic-subspecies",
  ]);

  if (/鷹|鷲|林鴞|草鴞|帝雉|藍腹鷴/.test(name)) traits.add("large");
  else if (/竹雞|山鷓鴣|鳩|秧雞|三趾鶉|鴞|鵂鶹|夜鷹|卷尾|樹鵲|松鴉|星鴉|朱鸝|大彎嘴/.test(name)) {
    traits.add("medium-large");
  } else if (/八哥|白頭翁|烏頭翁|白頭鶇|台灣紫嘯鶇/.test(name)) {
    traits.add("medium");
  } else {
    traits.add("small");
  }

  if (/黑|烏|卷尾|星鴉|鴉/.test(name)) traits.add("dark");
  if (/白|灰|鉛|小翼鶇/.test(name)) traits.add("gray");
  if (/白/.test(name)) traits.add("white");
  if (/褐|棕|栗|茶|竹雞|山鷓鴣|鵯|鶇|鶯|鷦/.test(name)) traits.add("brown");
  if (/黃|金/.test(name)) traits.add("yellow");
  if (/紅|赤|朱|粉/.test(name)) traits.add("red");
  if (/藍|紫|琉璃/.test(name)) traits.add("blue");
  if (/綠|五色/.test(name)) traits.add("green");
  if (/嘴|鷸|鷺|鷲|鷹/.test(name)) traits.add("long-bill");
  if (/頭|冠|眉|耳|喉|眼/.test(name)) traits.add("head-pattern");
  if (/秧雞|水鶇|白尾鴝/.test(name)) traits.add("waterbird");

  if (![...traits].some((trait) => ["dark", "gray", "white", "brown", "yellow", "red", "blue", "green"].includes(trait))) {
    traits.add("brown");
  }

  return Array.from(traits);
}

function inferEndemicAccent(name: string) {
  if (/鷹|鷲|雉|鷴|鴞/.test(name)) return "from-stone-200 to-amber-50";
  if (/水鶇|秧雞|鴝/.test(name)) return "from-sky-100 to-moss-50";
  if (/朱|赤|紅|栗|黃/.test(name)) return "from-amber-100 to-rose-50";
  if (/藍|綠|五色|琉璃/.test(name)) return "from-cyan-100 to-emerald-50";
  return "from-moss-100 to-cream";
}

function createTaiwanEndemicBirdSeed(taxon: TaiwanEndemicTaxon): BirdSeed {
  const statusLabel = taxon.status === "species" ? "台灣特有種" : "台灣特有亞種";
  const isSubspecies = taxon.status === "subspecies";

  return {
    name: taxon.name,
    summary: `${taxon.name}是${statusLabel}，是建立台灣在地鳥類辨識感的重要卡片。先從棲地、體型與頭部花紋建立印象，再慢慢補上叫聲與季節線索。`,
    habitat: inferEndemicHabitatText(taxon.name),
    clue: `${statusLabel}${isSubspecies ? "，觀察時可先以本種外型建立印象，再留意台灣族群的地域差異" : ""}。辨識時先看體型輪廓、嘴型與頭部花紋；學名：${taxon.scientificName}。`,
    accent: inferEndemicAccent(taxon.name),
    matcherHabitats: inferEndemicHabitats(taxon.name),
    matcherTraits: inferEndemicTraits(taxon.name, taxon.status),
  };
}

const taiwanEndemicSeeds = taiwanEndemicTaxa.map(createTaiwanEndemicBirdSeed);

const allBirdSeeds = [
  ...birdSeeds,
  ...taiwanEndemicSeeds.filter((bird) => !birdSeeds.some((seed) => seed.name === bird.name)),
];

export const birdCards: BirdCard[] = allBirdSeeds.map((bird) => {
  const endemicStatus = taiwanEndemicStatusByName[bird.name];
  const matcherTraits = Array.from(
    new Set([
      ...bird.matcherTraits,
      ...(endemicStatus
        ? [endemicStatus === "species" ? "taiwan-endemic" : "taiwan-endemic-subspecies"]
        : []),
    ])
  );
  const override = resolveBirdImageOverride(bird.name);

  return {
    ...bird,
    matcherTraits,
    size: describeSize(matcherTraits),
    behavior: describeBehavior(matcherTraits, bird.matcherHabitats),
    watchTip: describeWatchTip(matcherTraits, bird.matcherHabitats),
    ...override,
  };
});

export const birdingSpots: SpotCard[] = [
  {
    name: "關渡自然公園",
    lineKey: "tamsui-xinyi",
    station: "R25 關渡",
    line: "淡水信義線",
    route: "關渡自然公園 Guandu Nature Park",
    summary: "從捷運站出發就能進入濕地核心區，對第一次想看水鳥的新手非常友善。",
    birds: ["小白鷺", "夜鷺", "黑面琵鷺", "紅冠水雞"],
    bestTime: "清晨 7:00 - 9:30 或冬季下午退潮前後",
    bestFor: "想先認識水鳥、涉禽與濕地環境的新手",
    habitatType: "平地",
    speciesCount: 60,
    distanceKm: 2,
    tone: "bg-sky-50 border-sky-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "大安森林公園",
    lineKey: "tamsui-xinyi",
    station: "R06 大安森林公園",
    line: "淡水信義線",
    route: "大安森林公園 Daan Park",
    summary: "交通最方便的入門地點之一，城市裡就能練習分辨白頭翁、綠繡眼與五色鳥。",
    birds: ["白頭翁", "綠繡眼", "五色鳥", "珠頸斑鳩"],
    bestTime: "上午 7:00 - 9:00，避開正午人潮與高溫",
    bestFor: "完全新手，想從生活圈開始建立辨識感",
    habitatType: "平地",
    speciesCount: 35,
    distanceKm: 2,
    tone: "bg-emerald-50 border-emerald-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "動物園－政大",
    lineKey: "wenhu",
    station: "BR01 動物園",
    line: "文湖線",
    route: "動物園－政大 Taipei Zoo - National Chengchi University",
    summary: "沿著山邊與溪流環境前進，能從都市邊緣慢慢接觸到更多林緣鳥。",
    birds: ["白頭翁", "紅嘴黑鵯", "五色鳥", "大冠鷲"],
    bestTime: "清晨到上午 10:00 前，鳥聲最活躍",
    bestFor: "想從城市公園進階到林緣賞鳥的人",
    habitatType: "平地",
    speciesCount: 40,
    distanceKm: 4,
    tone: "bg-lime-50 border-lime-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "社子島",
    lineKey: "tamsui-xinyi",
    station: "R15 劍潭",
    line: "淡水信義線",
    route: "社子島 Shezidao",
    summary: "開闊河濱與草地環境視野很好，適合練習看遠處飛行中的鳥與濕地邊鳥種。",
    birds: ["蒼鷺", "小白鷺", "黑翅鳶", "磯鷸"],
    bestTime: "清晨 6:30 - 8:30，或傍晚日照柔和時",
    bestFor: "想找視野開闊、比較不會被樹遮住的新手",
    habitatType: "平地",
    speciesCount: 40,
    distanceKm: 2,
    tone: "bg-cyan-50 border-cyan-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "鹿角溪人工濕地",
    lineKey: "bannan",
    station: "BL05 亞東醫院",
    line: "板南線",
    route: "鹿角溪人工濕地 Lujiaoxi Constructed Wetland",
    summary: "步行距離不算長，但濕地型態完整，是很適合觀察水鳥與城市邊界鳥種的路線。",
    birds: ["小白鷺", "黃頭鷺", "紅冠水雞", "白腹秧雞"],
    bestTime: "清晨或陰天上午，水邊活動更明顯",
    bestFor: "想看濕地鳥，又不想跑太遠的人",
    habitatType: "平地",
    speciesCount: 50,
    distanceKm: 4,
    tone: "bg-teal-50 border-teal-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "烏來",
    lineKey: "songshan-xindian",
    station: "G01 新店",
    line: "松山新店線",
    route: "烏來 Wulai",
    summary: "山區鳥種更豐富，對已經看熟都市常見鳥、想進一步接觸山鳥的人很適合。",
    birds: ["山紅頭", "小彎嘴", "冠羽畫眉", "大冠鷲"],
    bestTime: "上午 7:00 - 10:00，天氣穩定、光線柔和時",
    bestFor: "已經有入門基礎，想開始看林間鳥種",
    habitatType: "山區",
    speciesCount: 45,
    distanceKm: 3,
    tone: "bg-amber-50 border-amber-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "深坑",
    lineKey: "wenhu",
    station: "BR02 木柵",
    line: "文湖線",
    route: "深坑 Shenkeng",
    summary: "從木柵延伸出去的山邊路線，對想開始接觸林緣鳥的入門者很合適。",
    birds: ["山紅頭", "五色鳥", "大冠鷲", "白耳畫眉"],
    bestTime: "上午 7:00 - 10:00，鳥聲最活躍",
    bestFor: "想從平地常見鳥進階到郊山鳥種的人",
    habitatType: "山區",
    speciesCount: 30,
    distanceKm: 2,
    tone: "bg-lime-50 border-lime-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "劍南路步道",
    lineKey: "wenhu",
    station: "BR15 劍南路",
    line: "文湖線",
    route: "劍南路 Jiannan Road",
    summary: "市區可快速抵達的山區步道型路線，適合半天賞鳥行程。",
    birds: ["白頭翁", "紅嘴黑鵯", "樹鵲", "鳳頭蒼鷹"],
    bestTime: "清晨 6:30 - 9:30",
    bestFor: "想要城市近郊、時間彈性高的人",
    habitatType: "山區",
    speciesCount: 25,
    distanceKm: 2,
    tone: "bg-emerald-50 border-emerald-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "陽明山",
    lineKey: "tamsui-xinyi",
    station: "R15 劍潭",
    line: "淡水信義線",
    route: "陽明山 Yangmingshan",
    summary: "鳥種豐富度高，適合已熟悉平地常見鳥、想挑戰更多山區鳥的使用者。",
    birds: ["冠羽畫眉", "白耳畫眉", "山紅頭", "大冠鷲"],
    bestTime: "上午 7:00 - 10:30，雲霧少時更好觀察",
    bestFor: "想進一步認識山區鳥相的入門者",
    habitatType: "山區",
    speciesCount: 45,
    distanceKm: 5,
    tone: "bg-amber-50 border-amber-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "故宮－雙溪公園",
    lineKey: "tamsui-xinyi",
    station: "R16 士林",
    line: "淡水信義線",
    route: "故宮-雙溪公園 National Palace Museum",
    summary: "結合溪流、公園與林蔭，是很平衡的新手路線。",
    birds: ["綠繡眼", "白頭翁", "鵲鴝", "翠鳥"],
    bestTime: "上午 7:30 - 10:00",
    bestFor: "想在市區與自然感之間取得平衡的人",
    habitatType: "平地",
    speciesCount: 30,
    distanceKm: 2,
    tone: "bg-sky-50 border-sky-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "芝山岩",
    lineKey: "tamsui-xinyi",
    station: "R17 芝山",
    line: "淡水信義線",
    route: "芝山岩 Zhishanyan",
    summary: "短距離但有林地感，適合第一次走進都市小山丘賞鳥的人。",
    birds: ["白頭翁", "五色鳥", "紅嘴黑鵯", "樹鵲"],
    bestTime: "清晨到上午 9:30",
    bestFor: "想用短時間接觸林緣環境的新手",
    habitatType: "平地",
    speciesCount: 25,
    distanceKm: 2,
    tone: "bg-lime-50 border-lime-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "立農濕地",
    lineKey: "tamsui-xinyi",
    station: "R19 石牌",
    line: "淡水信義線",
    route: "立農濕地 Linong Wetland",
    summary: "離捷運不遠就能接觸濕地鳥，是北市很適合練習水鳥辨識的點。",
    birds: ["小白鷺", "夜鷺", "白腹秧雞", "黃頭鷺"],
    bestTime: "清晨 6:30 - 8:30",
    bestFor: "想先學水鳥與濕地邊鳥種的人",
    habitatType: "平地",
    speciesCount: 40,
    distanceKm: 4,
    tone: "bg-cyan-50 border-cyan-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "唭哩岸－關渡",
    lineKey: "tamsui-xinyi",
    station: "R20 唭哩岸",
    line: "淡水信義線",
    route: "唭哩岸-關渡 Qili'an-Guandu",
    summary: "沿線可從都市綠地一路接到更完整的濕地環境，變化感很好。",
    birds: ["白鶺鴒", "小白鷺", "黑翅鳶", "夜鷺"],
    bestTime: "早上 7:00 - 9:30",
    bestFor: "想一次看不同棲地變化的新手",
    habitatType: "平地",
    speciesCount: 50,
    distanceKm: 6,
    tone: "bg-teal-50 border-teal-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "番仔溝－貴子坑大排",
    lineKey: "tamsui-xinyi",
    station: "R22 北投",
    line: "淡水信義線",
    route: "番仔溝-貴子坑大排 Fanzigou-Guizkendapai",
    summary: "平地水域路線，鳥況穩定，節奏不會太趕，很適合練習觀察。",
    birds: ["黃頭鷺", "牛背鷺", "白腹秧雞", "紅冠水雞"],
    bestTime: "早上 7:00 - 9:00",
    bestFor: "偏好平地散步型賞鳥的新手",
    habitatType: "平地",
    speciesCount: 40,
    distanceKm: 4,
    tone: "bg-sky-50 border-sky-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "珠海路",
    lineKey: "tamsui-xinyi",
    station: "R22A 新北投",
    line: "淡水信義線",
    route: "珠海路 Zhuhai Road",
    summary: "山邊道路型路線，能在較舒服的步行節奏下接觸山鳥。",
    birds: ["山紅頭", "冠羽畫眉", "白耳畫眉", "大卷尾"],
    bestTime: "上午 7:00 - 10:00",
    bestFor: "想開始認識北投一帶山區鳥種的人",
    habitatType: "山區",
    speciesCount: 40,
    distanceKm: 5,
    tone: "bg-amber-50 border-amber-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "忠義小徑",
    lineKey: "tamsui-xinyi",
    station: "R24 忠義",
    line: "淡水信義線",
    route: "忠義小徑 Zhongyi Trail",
    summary: "步道型路線但坡度壓力不高，適合剛接觸山徑賞鳥的使用者。",
    birds: ["白頭翁", "紅嘴黑鵯", "五色鳥", "棕背伯勞"],
    bestTime: "上午 7:00 - 10:00",
    bestFor: "想從平地過渡到步道賞鳥的人",
    habitatType: "平地",
    speciesCount: 40,
    distanceKm: 4,
    tone: "bg-lime-50 border-lime-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "挖仔尾",
    lineKey: "tamsui-xinyi",
    station: "R25 關渡",
    line: "淡水信義線",
    route: "挖仔尾 Waziwei",
    summary: "濕地與潮間帶環境完整，對想多看涉禽與水鳥的人很有吸引力。",
    birds: ["小白鷺", "蒼鷺", "磯鷸", "黑面琵鷺"],
    bestTime: "冬季上午與潮位變化時段",
    bestFor: "想把水鳥辨識練得更紮實的人",
    habitatType: "平地",
    speciesCount: 50,
    distanceKm: 2,
    tone: "bg-cyan-50 border-cyan-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "樹梅坑溪",
    lineKey: "tamsui-xinyi",
    station: "R26 竹圍",
    line: "淡水信義線",
    route: "樹梅坑溪 Plum Tree Creek",
    summary: "沿溪流與山邊環境前進，兼具水域與林緣特徵，變化感很好。",
    birds: ["翠鳥", "白頭翁", "紅嘴黑鵯", "山紅頭"],
    bestTime: "上午 7:00 - 10:00",
    bestFor: "喜歡邊走邊觀察不同環境轉換的人",
    habitatType: "山區",
    speciesCount: 40,
    distanceKm: 5,
    tone: "bg-emerald-50 border-emerald-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "淡江農場",
    lineKey: "tamsui-xinyi",
    station: "R27 紅樹林",
    line: "淡水信義線",
    route: "淡江農場 Tamkang Farm",
    summary: "山區與農場邊緣環境，鳥種豐富，適合把常見平地鳥再往外延伸。",
    birds: ["五色鳥", "樹鵲", "冠羽畫眉", "大卷尾"],
    bestTime: "上午 7:00 - 10:30",
    bestFor: "想練習聽聲辨位與山邊常見種的人",
    habitatType: "山區",
    speciesCount: 40,
    distanceKm: 4,
    tone: "bg-amber-50 border-amber-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "淡水忠烈祠",
    lineKey: "tamsui-xinyi",
    station: "R28 淡水",
    line: "淡水信義線",
    route: "淡水忠烈祠 Danshui Martyrs Shrine",
    summary: "海邊與聚落邊緣交錯，走法相對輕鬆，是淡水一帶入門路線之一。",
    birds: ["麻雀", "珠頸斑鳩", "白鶺鴒", "家燕"],
    bestTime: "上午 7:30 - 10:00",
    bestFor: "想安排淡水半日輕鬆賞鳥行程的人",
    habitatType: "平地",
    speciesCount: 35,
    distanceKm: 4,
    tone: "bg-sky-50 border-sky-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "四崁水",
    lineKey: "songshan-xindian",
    station: "G01 新店",
    line: "松山新店線",
    route: "四崁水 Sikanshui",
    summary: "山區型路線，較適合想在新店一帶延伸觀察的人。",
    birds: ["冠羽畫眉", "白耳畫眉", "山紅頭", "台灣藍鵲"],
    bestTime: "上午 7:00 - 10:00",
    bestFor: "想逐步接觸山區鳥相的人",
    habitatType: "山區",
    speciesCount: 40,
    distanceKm: 5,
    tone: "bg-lime-50 border-lime-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "廣興",
    lineKey: "songshan-xindian",
    station: "G01 新店",
    line: "松山新店線",
    route: "廣興 Guangxing",
    summary: "山區環境穩定，適合安排半天以上的延伸觀察。",
    birds: ["五色鳥", "山紅頭", "大卷尾", "大冠鷲"],
    bestTime: "上午 7:00 - 10:30",
    bestFor: "想在新店延伸更多山區觀察點的人",
    habitatType: "山區",
    speciesCount: 35,
    distanceKm: 3,
    tone: "bg-emerald-50 border-emerald-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "直潭國小",
    lineKey: "songshan-xindian",
    station: "G01 新店",
    line: "松山新店線",
    route: "直潭國小 Jhihtan Elementary School",
    summary: "山邊聚落與樹林交界，適合練習觀察不同高度活動的鳥。",
    birds: ["白頭翁", "紅嘴黑鵯", "鵲鴝", "台灣藍鵲"],
    bestTime: "上午 7:00 - 9:30",
    bestFor: "想把常見鳥和林緣鳥一起練的人",
    habitatType: "山區",
    speciesCount: 40,
    distanceKm: 6,
    tone: "bg-amber-50 border-amber-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "蘆洲堤防",
    lineKey: "songshan-xindian",
    station: "G01 新店",
    line: "松山新店線",
    route: "蘆洲堤防 Luzhou Dyke",
    summary: "原網站列在新店站延伸路線中，實際環境偏河濱開闊地，適合看水邊與空域鳥。",
    birds: ["黑翅鳶", "小白鷺", "白鶺鴒", "家燕"],
    bestTime: "清晨或傍晚",
    bestFor: "喜歡開闊視野、好走路線的人",
    habitatType: "平地",
    speciesCount: 50,
    distanceKm: 2,
    tone: "bg-cyan-50 border-cyan-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "土城彈藥庫",
    lineKey: "bannan",
    station: "BL03 土城",
    line: "板南線",
    route: "土城彈藥庫 Tucheng Ammunituin Dump",
    summary: "生態復育感強的綠地，對新手來說能同時看到平地與灌叢鳥種。",
    birds: ["白頭翁", "綠繡眼", "棕背伯勞", "斑文鳥"],
    bestTime: "上午 7:00 - 9:30",
    bestFor: "想找都會邊界型綠地路線的人",
    habitatType: "平地",
    speciesCount: 35,
    distanceKm: 5,
    tone: "bg-lime-50 border-lime-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "新海濕地",
    lineKey: "bannan",
    station: "BL08 新埔",
    line: "板南線",
    route: "新海濕地 Xinhai Artificial Wetland",
    summary: "市區相對方便抵達的濕地型路線，適合把水鳥辨識再往前推一步。",
    birds: ["小白鷺", "夜鷺", "黃頭鷺", "白腹秧雞"],
    bestTime: "清晨到上午 9:00",
    bestFor: "想在市區附近直接練水鳥辨識的人",
    habitatType: "平地",
    speciesCount: 35,
    distanceKm: 3,
    tone: "bg-sky-50 border-sky-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "青年公園",
    lineKey: "bannan",
    station: "BL10 龍山寺",
    line: "板南線",
    route: "青年公園 Youth Park",
    summary: "很適合完全新手，公園型環境簡單好走，也容易建立第一批常見鳥印象。",
    birds: ["白頭翁", "麻雀", "珠頸斑鳩", "綠繡眼"],
    bestTime: "上午 7:00 - 9:00",
    bestFor: "第一次出門賞鳥、想先建立信心的人",
    habitatType: "平地",
    speciesCount: 25,
    distanceKm: 2,
    tone: "bg-emerald-50 border-emerald-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
  {
    name: "南港公園",
    lineKey: "bannan",
    station: "BL21 昆陽",
    line: "板南線",
    route: "南港公園 Nangang Park",
    summary: "公園、水域與坡地混合，對新手來說觀察素材很多，也很方便安排短程行程。",
    birds: ["白頭翁", "綠繡眼", "夜鷺", "五色鳥"],
    bestTime: "上午 7:00 - 9:30",
    bestFor: "想在一個點同時練習平地與水邊觀察的人",
    habitatType: "平地",
    speciesCount: 40,
    distanceKm: 2,
    tone: "bg-teal-50 border-teal-100",
    sourceUrl: "https://www.birdfair.org.tw/TPE_Birdwatchingmap/",
  },
];
