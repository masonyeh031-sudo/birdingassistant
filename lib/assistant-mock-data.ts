import { birdCards } from "@/lib/home-data";
import { birdSizeOptions } from "@/lib/bird-size";
import type {
  BirdFeature,
  BirdObservationFormState,
  BirdProfile,
  EntryMode,
} from "@/lib/assistant-types";

function getBirdImage(name: string) {
  const bird = birdCards.find((item) => item.name === name);

  return {
    imageSrc: bird?.imageSrc ?? "",
    imageAlt: bird?.imageAlt ?? `${name} 鳥類照片`,
  };
}

export const assistantEntryCards: Array<{
  mode: EntryMode;
  title: string;
  description: string;
  eyebrow: string;
}> = [
  {
    mode: "photo",
    eyebrow: "照片辨識",
    title: "上傳鳥類照片開始分析",
    description: "適合手上已經有一張鳥照，想先從外觀與整體輪廓快速得到候選鳥種的人。",
  },
  {
    mode: "conditions",
    eyebrow: "條件辨識",
    title: "依觀察條件縮小候選",
    description: "如果照片不夠清楚，也能先用環境、外觀、行為與棲地線索做輔助判斷。",
  },
  {
    mode: "journal",
    eyebrow: "觀察紀錄",
    title: "整理成自然筆記卡",
    description: "把這次賞鳥的時間、地點、特徵與推測鳥種整理成一張可以保存的觀察卡。",
  },
];

export const environmentOptions: BirdFeature[] = [
  { value: "urban", label: "都市", description: "街道、社區、建築物周邊與生活圈綠地" },
  { value: "campus", label: "校園", description: "操場、校樹區、校園草地與校舍周邊" },
  { value: "park", label: "公園", description: "都市公園、社區公園、樹蔭步道與花木區" },
  { value: "forest", label: "森林", description: "低中海拔林地、樹林內部與林緣" },
  { value: "mountain", label: "山區", description: "山徑、林道、丘陵步道與中高海拔環境" },
  { value: "grassland", label: "草地", description: "開闊草生地、短草地、河濱草坡" },
  { value: "shrubland", label: "灌叢", description: "灌木叢、竹林邊緣、荒地與林下濃密植被" },
  { value: "farmland", label: "農田", description: "水田、旱田、田埂、農村邊緣" },
  { value: "wetland", label: "濕地", description: "濕地保護區、魚塭、沼澤與潮濕開闊地" },
  { value: "pond_lake", label: "池塘 / 湖泊", description: "公園池塘、水庫、湖泊與靜水水域" },
  { value: "river_stream", label: "河川 / 溪流", description: "河岸、溪谷、溪石、河濱水域" },
  { value: "estuary_mudflat", label: "河口 / 灘地", description: "出海口、泥灘、沙洲、紅樹林與潮間帶" },
  { value: "coast", label: "海岸", description: "沙灘、港區、礁岩海岸與防波堤" },
  { value: "ocean", label: "海洋", description: "近海、外海、船上觀察與海面飛行鳥類" },
];

export const colorOptions: BirdFeature[] = [
  { value: "black", label: "黑", description: "整體偏黑或黑色區塊明顯", hex: "#1f2520" },
  { value: "white", label: "白", description: "白色羽區很明顯", hex: "#f7f7f2" },
  { value: "gray", label: "灰", description: "灰色、銀灰或灰白色區塊", hex: "#9aa2a6" },
  { value: "brown", label: "褐", description: "偏褐、赭褐色", hex: "#816448" },
  { value: "tan", label: "棕", description: "偏暖棕、土色或淡棕", hex: "#b48d61" },
  { value: "yellow", label: "黃", description: "有黃或黃綠區塊", hex: "#d7b93d" },
  { value: "orange", label: "橙", description: "橘色或暖橙色塊", hex: "#d7853c" },
  { value: "red", label: "紅", description: "紅或栗紅區塊", hex: "#b34e45" },
  { value: "blue", label: "藍", description: "藍色、藍綠或青藍區塊", hex: "#4b7fa8" },
  { value: "green", label: "綠", description: "綠色、橄欖綠或黃綠", hex: "#6d8f46" },
];

export const defaultObservationForm: BirdObservationFormState = {
  imagePreview: null,
  imageName: "",
  environment: "park",
  selectedEnvironment: "park",
  size: "",
  autoDetectedSize: "",
  autoDetectedSizeConfidence: "",
  autoDetectedSizeReason: "上傳照片後，賞鳥助手會先估計鳥體大小並預設選項。",
  userSelectedSize: "",
  finalSelectedSize: "",
  colorTraits: [],
  autoDetectedColors: [],
  userAdjustedColors: [],
  colorDetectionStatus: "idle",
  colorDetectionConfidence: "",
  colorDetectionReason: "上傳照片後，系統會先嘗試抓鳥體主色並自動勾選色塊。",
};

const profiles: BirdProfile[] = [
  {
    topMatch: {
      chineseName: "白頭翁",
      englishName: "Light-vented Bulbul",
      scientificName: "Pycnonotus sinensis",
      confidence: "中高",
      reasoning: [
        "頭頂偏深色、後頭有明顯淺色塊時，很容易先想到白頭翁。",
        "常出現在公園、校園與生活圈樹叢，是都市環境裡最常見的候選之一。",
        "站在枝頭或高處觀察時，站姿和中型體格都很符合新手常見印象。",
      ],
    },
    alternatives: [
      {
        chineseName: "紅嘴黑鵯",
        englishName: "Black Bulbul",
        scientificName: "Hypsipetes leucocephalus",
        confidence: "中",
        reasoning: ["如果整體更偏深色、嘴腳色彩更顯眼，可以再和紅嘴黑鵯比較。"],
      },
      {
        chineseName: "鵲鴝",
        englishName: "Oriental Magpie-Robin",
        scientificName: "Copsychus saularis",
        confidence: "中低",
        reasoning: ["如果黑白對比更強、尾巴更常上翹，也可能轉向鵲鴝。"],
      },
    ],
    description: "白頭翁是台灣生活圈最容易遇到的常見鳥之一，對新手來說是建立辨識信心的好起點。",
    habitat: "都市公園、校園、住宅區綠地、低海拔樹叢",
    diet: "果實、花蜜、昆蟲與人類生活圈常見的小型食物來源",
    behavior: "常停在枝頭、電線或較顯眼位置，叫聲活潑，群體互動明顯。",
    commonnessTaiwan: "台灣西部與低海拔生活圈非常常見",
    similarSpecies: [
      {
        chineseName: "紅嘴黑鵯",
        note: "整體更深色，嘴腳色彩更鮮明，頭部不會呈現典型白頭輪廓。",
        compareFocus: "先看頭頂與後頭對比，再看嘴腳是否有強烈紅色。",
      },
      {
        chineseName: "鵲鴝",
        note: "黑白對比更俐落，尾巴使用頻率更高。",
        compareFocus: "先看尾巴是否常抬起，再看體型是否更修長。",
      },
    ],
    observationSummary: "照片中的中型樹棲鳥，若頭部黑白對比清楚，最值得先和白頭翁對照。",
    surveySuggestions: [
      "下一步請回頭確認頭頂、後頭與臉部的色塊分布。",
      "如果現場還看得到，試著觀察牠是否常停在高處鳴叫。",
      "再拍一張側面或正面的照片，會更容易和相似種做排除。",
    ],
    environments: ["urban-park", "campus", "residential", "forest"],
    colorTraits: ["black", "white", "gray", "brown"],
    visualTraits: ["中型鳥", "頭頂偏深色", "後頭白色塊", "常停在枝頭"],
    ...getBirdImage("白頭翁"),
  },
  {
    topMatch: {
      chineseName: "綠繡眼",
      englishName: "Warbling White-eye",
      scientificName: "Zosterops japonicus",
      confidence: "中高",
      reasoning: [
        "小型、黃綠色系加上白色眼圈時，綠繡眼通常會是非常前面的候選。",
        "牠常出現在校園、公園和花樹區，和人類生活圈的接觸很高。",
        "如果你注意到牠常成群、動作很快，這也是很有代表性的線索。",
      ],
    },
    alternatives: [
      {
        chineseName: "山紅頭",
        englishName: "Rufous-capped Babbler",
        scientificName: "Cyanoderma ruficeps",
        confidence: "中低",
        reasoning: ["若頭部更偏栗紅、綠色不那麼乾淨，可再比較山紅頭。"],
      },
      {
        chineseName: "五色鳥",
        englishName: "Taiwan Barbet",
        scientificName: "Psilopogon nuchalis",
        confidence: "低",
        reasoning: ["如果嘴型更粗厚、體型不那麼小，才會往五色鳥靠近。"],
      },
    ],
    description: "綠繡眼是許多人開始賞鳥後最早學會辨識的小型鳥之一，眼圈非常有記憶點。",
    habitat: "都市公園、庭院、花樹區、低海拔森林",
    diet: "花蜜、小果實、昆蟲",
    behavior: "成群移動、停留時間短，常在枝葉間快速穿梭。",
    commonnessTaiwan: "台灣低海拔生活圈和林地很常見",
    similarSpecies: [
      {
        chineseName: "山紅頭",
        note: "頭部偏暖褐、眼圈感不如綠繡眼那麼強。",
        compareFocus: "先看白色眼圈是不是第一眼最明顯的特徵。",
      },
      {
        chineseName: "五色鳥",
        note: "嘴更粗、體型更紮實，臉部色塊更鮮明。",
        compareFocus: "先看嘴型，再看整體是不是圓短可愛的輪廓。",
      },
    ],
    observationSummary: "如果照片裡是小型黃綠色鳥，且眼周白圈清楚，綠繡眼通常是最先要確認的方向。",
    surveySuggestions: [
      "試著看牠是不是常和同類一起出現。",
      "再確認白色眼圈是否完整、明顯。",
      "若能聽到聲音，也可把細短連續的叫聲一起納入判斷。",
    ],
    environments: ["urban-park", "campus", "residential", "forest", "mountain-trail"],
    colorTraits: ["green", "yellow", "white"],
    visualTraits: ["小型鳥", "白色眼圈", "動作很快", "常在枝葉間活動"],
    ...getBirdImage("綠繡眼"),
  },
  {
    topMatch: {
      chineseName: "珠頸斑鳩",
      englishName: "Spotted Dove",
      scientificName: "Spilopelia chinensis",
      confidence: "中",
      reasoning: [
        "中型、偏褐色、常在地面或草地附近活動時，珠頸斑鳩會是非常常見的方向。",
        "頸側黑底白點斑紋很像珠鍊，是新手最值得記住的辨識點。",
        "生活圈、公園、校園都容易看到牠慢慢地在地上走動或啄食。",
      ],
    },
    alternatives: [
      {
        chineseName: "紅鳩",
        englishName: "Red Collared Dove",
        scientificName: "Streptopelia tranquebarica",
        confidence: "中低",
        reasoning: ["如果整體更偏暖紅褐、線條更纖細，可比較紅鳩。"],
      },
      {
        chineseName: "白頭翁",
        englishName: "Light-vented Bulbul",
        scientificName: "Pycnonotus sinensis",
        confidence: "低",
        reasoning: ["只有在停枝位置與中型印象類似時才可能被一起保留。"],
      },
    ],
    description: "珠頸斑鳩是在生活圈裡非常穩定的常見鳥，走路節奏和頸側斑紋都很有記憶點。",
    habitat: "都市綠地、學校草地、公園步道、低海拔聚落",
    diet: "種子、穀粒、地面昆蟲與零碎食物",
    behavior: "常在地面慢步覓食，也會停在枝條與建物邊緣休息。",
    commonnessTaiwan: "台灣平地和都會生活圈非常常見",
    similarSpecies: [
      {
        chineseName: "紅鳩",
        note: "整體更偏紅褐，體態更纖細，頸部斑點感較弱。",
        compareFocus: "先看頸側珠鍊斑紋，再看整體是不是暖紅色。",
      },
      {
        chineseName: "家八哥",
        note: "若照片距離遠，只看中型與地面活動可能會混到。",
        compareFocus: "先確認牠是不是典型鳩類輪廓和較小的頭部。",
      },
    ],
    observationSummary: "如果照片中是常在地面走動的中型褐色鳥，先看頸側花紋，珠頸斑鳩通常很快就能被確認。",
    surveySuggestions: [
      "下一步先放大確認頸側斑點。",
      "再看牠是不是以穩定步伐在地面找食物。",
      "若還不確定，補拍正側面會比只拍背面更好辨識。",
    ],
    environments: ["urban-park", "campus", "residential", "farmland-grassland"],
    colorTraits: ["brown", "tan", "gray"],
    visualTraits: ["中型鳥", "頸側珠鍊斑紋", "地面走動", "鳩鴿輪廓"],
    ...getBirdImage("珠頸斑鳩"),
  },
  {
    topMatch: {
      chineseName: "小白鷺",
      englishName: "Little Egret",
      scientificName: "Egretta garzetta",
      confidence: "中高",
      reasoning: [
        "全身偏白、腿長、在水邊或淺水區活動時，小白鷺通常會很快浮上來。",
        "站姿修長、覓食時會專注盯著水面，是很典型的鷺科觀察印象。",
        "如果照片裡看到白色大鳥加長腳，水邊棲地會讓判斷更穩。",
      ],
    },
    alternatives: [
      {
        chineseName: "大白鷺",
        englishName: "Great Egret",
        scientificName: "Ardea alba",
        confidence: "中",
        reasoning: ["如果體型更大、脖子更修長，可以再比較大白鷺。"],
      },
      {
        chineseName: "黃頭鷺",
        englishName: "Chinese Pond Heron",
        scientificName: "Ardeola bacchus",
        confidence: "中低",
        reasoning: ["繁殖期若頭頸帶暖黃色調，也可能朝黃頭鷺靠近。"],
      },
    ],
    description: "小白鷺是新手最容易先學會的水鳥之一，白色體羽與修長站姿非常有辨識度。",
    habitat: "池塘、濕地、河岸、魚塭、河口",
    diet: "魚類、蝦蟹、水生昆蟲與小型水生動物",
    behavior: "常在淺水區慢步涉水，停下來後會長時間盯著水面觀察。",
    commonnessTaiwan: "平地濕地與城市河岸相當常見",
    similarSpecies: [
      {
        chineseName: "大白鷺",
        note: "體型更大、比例更修長，常給人更從容的感覺。",
        compareFocus: "先看整體比例與脖子長度，再看是否過於高大。",
      },
      {
        chineseName: "黃頭鷺",
        note: "非繁殖期顏色差異較難看，但站姿與線條常和小白鷺不同。",
        compareFocus: "先看是否有暖色頭頸與較短胖的輪廓。",
      },
    ],
    observationSummary: "如果照片裡是白色長腳鳥，且出現在水邊，小白鷺通常是第一輪很合理的候選。",
    surveySuggestions: [
      "觀察嘴、腳與腳趾顏色會更有幫助。",
      "再看牠是在淺水中涉水還是在岸邊靜站。",
      "若能補到側面全身照，和大白鷺的差異會更清楚。",
    ],
    environments: ["wetland", "pond-lake", "river-stream", "seaside", "estuary-flat", "farmland-grassland"],
    colorTraits: ["white", "black"],
    visualTraits: ["大型長腳", "全身白色", "細長黑嘴", "水邊涉水"],
    ...getBirdImage("小白鷺"),
  },
  {
    topMatch: {
      chineseName: "黑冠麻鷺",
      englishName: "Malayan Night Heron",
      scientificName: "Gorsachius melanolophus",
      confidence: "中",
      reasoning: [
        "如果你看到的是偏褐色、中型、站姿筆直的鳥，黑冠麻鷺很值得優先考慮。",
        "牠常在校園、公園草地與樹林邊安靜移動，對台灣城市觀察者來說其實不陌生。",
        "很多人第一次看到都會低估牠的常見度，因為牠站著不動時很容易被忽略。",
      ],
    },
    alternatives: [
      {
        chineseName: "夜鷺",
        englishName: "Black-crowned Night Heron",
        scientificName: "Nycticorax nycticorax",
        confidence: "中低",
        reasoning: ["如果深色頭頂與白腹對比更鮮明，可以再比夜鷺。"],
      },
      {
        chineseName: "珠頸斑鳩",
        englishName: "Spotted Dove",
        scientificName: "Spilopelia chinensis",
        confidence: "低",
        reasoning: ["只有在遠看體型和褐色輪廓相近時才可能一起被保留。"],
      },
    ],
    description: "黑冠麻鷺在台灣都會生活圈其實不罕見，尤其在校園與公園常常讓人驚喜。",
    habitat: "公園草地、校園、低海拔林緣、水邊草地",
    diet: "昆蟲、蚯蚓、小型無脊椎動物與其他地面食物來源",
    behavior: "常靜靜站著，靠近時才慢慢走開，很少突然大動作飛離。",
    commonnessTaiwan: "台灣西部低海拔公園與校園相當常見",
    similarSpecies: [
      {
        chineseName: "夜鷺",
        note: "顏色分布更偏黑白對比，站姿和脖子縮起來的感覺也不同。",
        compareFocus: "先看背部與腹部對比，再看頭頂是否深黑。",
      },
      {
        chineseName: "黃頭鷺",
        note: "若在水邊涉水、腿更長，可能會偏向其他鷺科。",
        compareFocus: "先看是否偏向林地草地環境，以及站姿是不是特別筆直。",
      },
    ],
    observationSummary: "如果照片裡的鳥站姿筆直、褐色、在公園草地邊活動，黑冠麻鷺很值得列入第一順位。",
    surveySuggestions: [
      "再確認站姿是否筆直、脖子是否常縮在身體裡。",
      "觀察牠是慢走離開還是立即飛起。",
      "若現場能再補一張全身照，會更容易排除夜鷺與其他鷺科。",
    ],
    environments: ["urban-park", "campus", "forest", "mountain-trail", "farmland-grassland"],
    colorTraits: ["brown", "tan", "black"],
    visualTraits: ["中型偏大", "站姿筆直", "褐色系", "嘴細長"],
    ...getBirdImage("黑冠麻鷺"),
  },
  {
    topMatch: {
      chineseName: "翠鳥",
      englishName: "Common Kingfisher",
      scientificName: "Alcedo atthis",
      confidence: "中高",
      reasoning: [
        "藍綠背部、暖橘腹部加上細長直嘴時，翠鳥是非常有代表性的候選。",
        "如果出現在池塘、溪流或河岸邊，棲地線索也會讓判斷更穩。",
        "牠常停在枝條或欄杆邊等著俯衝抓魚，停棲姿態也很有辨識力。",
      ],
    },
    alternatives: [
      {
        chineseName: "小白鷺",
        englishName: "Little Egret",
        scientificName: "Egretta garzetta",
        confidence: "低",
        reasoning: ["只有在水邊環境相同但體型和顏色線索不足時，才會被一起列入。"],
      },
      {
        chineseName: "五色鳥",
        englishName: "Taiwan Barbet",
        scientificName: "Psilopogon nuchalis",
        confidence: "中低",
        reasoning: ["如果綠色更重、嘴更厚，就要和五色鳥比較。"],
      },
    ],
    description: "翠鳥是很多人心中的明星水鳥，顏色對比強烈，只要看到一次就很難忘記。",
    habitat: "溪流、池塘、公園水域、河岸",
    diet: "小魚、蝦、昆蟲與小型水生動物",
    behavior: "常停在水邊高處觀察，突然俯衝入水覓食。",
    commonnessTaiwan: "低海拔水域環境穩定可見，但需要一點耐心觀察",
    similarSpecies: [
      {
        chineseName: "五色鳥",
        note: "五色鳥嘴更粗、體型更圓短，棲位多在樹洞與樹梢。",
        compareFocus: "先看嘴型粗細，再看是不是以水邊活動為主。",
      },
      {
        chineseName: "白鶺鴒",
        note: "如果只看水邊出現，仍要先排除其他常見水邊鳥。",
        compareFocus: "顏色對比和嘴型會是最快速的區分點。",
      },
    ],
    observationSummary: "如果照片裡藍綠與暖橘的色塊對比明顯，又出現在水邊，翠鳥通常會是最先值得確認的答案。",
    surveySuggestions: [
      "優先看背部與腹部的顏色對比。",
      "再確認嘴型是不是細長又筆直。",
      "如果現場還看得到，觀察牠是否從高處俯衝進水。",
    ],
    environments: ["wetland", "pond-lake", "river-stream", "urban-park"],
    colorTraits: ["blue", "green", "orange", "white"],
    visualTraits: ["小型鳥", "細長直嘴", "藍綠背部", "常在水邊停棲"],
    ...getBirdImage("翠鳥"),
  },
];

export const birdProfiles = profiles;
export { birdSizeOptions };

export const sampleObservation: BirdObservationFormState = {
  imagePreview: getBirdImage("黑冠麻鷺").imageSrc,
  imageName: "sample-malayan-night-heron.jpg",
  environment: "forest",
  selectedEnvironment: "forest",
  size: "medium-large",
  autoDetectedSize: "medium-large",
  autoDetectedSizeConfidence: "中",
  autoDetectedSizeReason: "範例照片中的鳥體輪廓較紮實，比例接近夜鷺、黑冠麻鷺這類中大型鳥，因此先預設為中大型鳥。",
  userSelectedSize: "medium-large",
  finalSelectedSize: "medium-large",
  colorTraits: ["brown", "tan", "black"],
  autoDetectedColors: ["brown", "tan"],
  userAdjustedColors: ["black"],
  colorDetectionStatus: "done",
  colorDetectionConfidence: "中",
  colorDetectionReason: "範例照片中鳥體以褐色與暖棕色為主，黑色作為使用者補充線索。",
};
