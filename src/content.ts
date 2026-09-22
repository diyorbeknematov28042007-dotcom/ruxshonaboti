export type MenuKey =
  | "bio"
  | "timeline"
  | "works"
  | "shumbola"
  | "poetry"
  | "translations"
  | "awards"
  | "museum"
  | "facts"
  | "sources";

export const MAIN_MENU = {
  inline_keyboard: [
    [
      { text: "👤 Hayoti", callback_data: "menu:bio" },
      { text: "🗓 Xronologiya", callback_data: "menu:timeline" }
    ],
    [
      { text: "📚 Asarlari", callback_data: "menu:works" },
      { text: "🎭 Shum bola", callback_data: "menu:shumbola" }
    ],
    [
      { text: "✍️ She’riyati", callback_data: "menu:poetry" },
      { text: "🌐 Tarjimalari", callback_data: "menu:translations" }
    ],
    [
      { text: "🏆 Mukofotlar", callback_data: "menu:awards" },
      { text: "🏛 Muzey va xotira", callback_data: "menu:museum" }
    ],
    [
      { text: "💡 Qiziqarli faktlar", callback_data: "menu:facts" },
      { text: "🧠 Viktorina", callback_data: "quiz:1" }
    ],
    [{ text: "🔎 Manbalar", callback_data: "menu:sources" }]
  ]
};

export const BACK_MENU = {
  inline_keyboard: [[{ text: "⬅️ Bosh menyu", callback_data: "menu:home" }]]
};

export const START_TEXT = `📚 <b>G‘afur G‘ulom</b>

O‘zbek adabiyotining yirik shoiri, nosiri, publitsisti, tarjimoni va akademigi haqida interaktiv ma’lumotnoma.

Bu botda:
• hayoti va xronologiyasi;
• she’riy va nasriy ijodi;
• “Shum bola” haqida ma’lumot;
• tarjimalari;
• unvon va mukofotlari;
• uy-muzeyi va xotirasi;
• viktorina va tekshirilgan manbalar mavjud.

ℹ️ Asarlarning to‘liq matnlari mualliflik huquqi sabab botga ko‘chirilmagan; bot faktlar, tavsiflar va qisqa mazmunlar bilan ishlaydi.`;

export const CONTENT: Record<MenuKey, string[]> = {
  bio: [
    `👤 <b>Hayoti</b>

G‘afur G‘ulom XX asr o‘zbek adabiyotining eng taniqli vakillaridan biri. Ko‘pchilik adabiy manbalarda u <b>1903-yil 10-mayda Toshkentning Qo‘rg‘ontegi mahallasida</b> tug‘ilgani ko‘rsatiladi.

U yoshligida ota-onasidan erta ayrilgan: otasi vafot etganida taxminan 9 yoshda, onasidan ayrilganida esa 15 yosh atrofida bo‘lgan. Yetimlik tajribasi uning keyingi ijodidagi insonparvarlik va yetim bolalar mavzusiga kuchli ta’sir ko‘rsatgan.

U eski maktab va rus-tuzem maktabida ta’lim olgan, keyinchalik pedagogik faoliyat bilan shug‘ullangan. 1923-yildan bolalar uyi bilan bog‘liq rahbarlik ishlarida ishlagani haqida manbalar qayd etadi.`,
    `📰 <b>Jurnalistika va adabiyot</b>

G‘afur G‘ulom matbuotda faol ishlagan. Manbalarda “Kambag‘al dehqon”, “Qizil O‘zbekiston”, “Sharq haqiqati” kabi nashrlar bilan bog‘liq faoliyati tilga olinadi.

U she’r, doston, hikoya, qissa, drama, publitsistika va adabiyotshunoslikda ijod qilgan. 1943-yilda O‘zbekiston Fanlar akademiyasining haqiqiy a’zosi etib saylangan.

1963-yilda unga <b>O‘zbekiston xalq shoiri</b> faxriy unvoni berilgan.

📌 <b>Sana bo‘yicha izoh:</b> ko‘plab o‘zbek adabiy manbalari tug‘ilgan sanani 10-may deb beradi, O‘zbekiston Fanlar akademiyasining sobiq a’zolar ro‘yxatida esa 11-may ko‘rsatilgan. Vafot sanasi bo‘yicha Fanlar akademiyasi va O‘zA manbalari <b>1966-yil 10-iyul</b> sanasini ko‘rsatadi.`
  ],
  timeline: [
    `🗓 <b>Asosiy xronologiya</b>

• <b>1903</b> — Toshkentda tug‘ilgan.
• Bolalik yillari — ota-onasidan erta ayrilgan.
• <b>1920-yillar</b> — pedagogik va jurnalistik faoliyat boshlanadi.
• <b>1923</b> — bolalar uyi bilan bog‘liq rahbarlik faoliyati.
• <b>1929</b> — “Muxbir sudi” pyesasi.
• <b>1930-yillar</b> — “Netay”, “Yodgor”, “Shum bola” kabi nasriy asarlar hamda ko‘plab she’riy to‘plamlar.
• <b>1942</b> — “Sen yetim emassan”, “Sog‘inish” singari urush davri she’rlari.
• <b>1943</b> — O‘zbekiston Fanlar akademiyasi haqiqiy a’zosi.
• <b>1944–1966</b> — keyinchalik uy-muzeyga aylantirilgan Toshkentdagi uyida yashab ijod qilgan.
• <b>1963</b> — O‘zbekiston xalq shoiri.
• <b>1966-yil 10-iyul</b> — Toshkentda vafot etgan.
• <b>1970</b> — vafotidan keyin Lenin mukofoti.
• <b>1983</b> — G‘afur G‘ulom uy-muzeyi ochilgan.
• <b>2000</b> — vafotidan so‘ng “Buyuk xizmatlari uchun” ordeni bilan taqdirlangan.`
  ],
  works: [
    `📚 <b>Nasriy va dramatik asarlaridan</b>

<b>Qissalar:</b>
• “Netay”
• “Tirilgan murda”
• “Yodgor”
• “Shum bola”

<b>Hikoya va hajviy nasr:</b>
• “Hiylai shar’iy”
• “Mening o‘g‘rigina bolam”
• “Jo‘rabo‘za” turkumidagi hikoyalar

<b>Dramaturgiya:</b>
• “Muxbir sudi”
• boshqa sahna asarlari va adabiy-publitsistik matnlar

G‘afur G‘ulom nasrida xalqona yumor, Toshkent hayoti, oddiy insonlarning xarakteri, ijtimoiy muhit va bolalik dunyosi muhim o‘rin tutadi.`,
    `📖 <b>She’riy to‘plam va turkumlaridan</b>

Manbalarda quyidagi nomlar uchraydi:
• “Dinamo”
• “Tirik qo‘shiqlar”
• “Ko‘kan”
• “Sizga”
• “Chashma”
• “Yangi she’rlar”
• “O‘zbek elining g‘ururi”
• “Sharaf qo‘lyozmasi”
• “Tanlangan asarlar”

Alohida mashhur she’rlar: “Sen yetim emassan”, “Sog‘inish”, “Vaqt”, “Toshkent”, “Non”, “Men yahudiyman” va boshqalar.`
  ],
  shumbola: [
    `🎭 <b>“Shum bola”</b>

“Shum bola” — G‘afur G‘ulomning eng mashhur qissalaridan biri. Asar avtobiografik unsurlarga ega bo‘lib, XX asr boshlaridagi Toshkent hayoti, bolalar dunyosi, qashshoqlik, tirikchilik, sarguzasht va xalqona hazil orqali davr manzarasini ko‘rsatadi.

Markazdagi shum, topqir va hayotga moslashuvchan bola obrazi orqali muallif og‘ir sharoitda ham insonning zukkoligi va yashashga intilishini ko‘rsatadi.

Qissa turli yillarda qayta ishlangan va keng tarqalgan. Asar asosida ekran va sahna talqinlari yaratilgan.

📌 Bot asarning to‘liq matnini bermaydi; o‘rganish uchun mazmun, kontekst va savol-javob taqdim etadi.`
  ],
  poetry: [
    `✍️ <b>She’riyati</b>

G‘afur G‘ulom she’riyatida bir necha yirik yo‘nalish ko‘rinadi:

• <b>insonparvarlik va yetimlik:</b> “Sen yetim emassan”;
• <b>ota va farzand sog‘inchi:</b> “Sog‘inish”;
• <b>vaqt va falsafiy mushohada:</b> “Vaqt”;
• <b>yurt va shahar:</b> “Toshkent”;
• <b>urush davri ruhiyati:</b> 1940-yillar she’rlari;
• <b>xalqona til va obrazlilik:</b> kundalik hayotdan olingan timsollar.

Uning poetik uslubida jo‘shqin publitsistik ohang bilan falsafiy mushohada va xalqona ifoda birlashadi.`
  ],
  translations: [
    `🌐 <b>Tarjimonlik faoliyati</b>

G‘afur G‘ulom o‘zbek tarjima maktabining shakllanishiga katta hissa qo‘shgan ijodkorlardan biri sifatida tilga olinadi.

Manbalarda uning jahon va rus adabiyoti namoyandalari asarlarini o‘zbekchaga tarjima qilgani qayd etiladi. Jumladan:
• Uilyam Shekspir — “Otello”, “Qirol Lir”;
• Aleksandr Pushkin;
• Mixail Lermontov;
• Aleksandr Griboyedov;
• Vladimir Mayakovskiy;
• Nozim Hikmat;
• Shota Rustaveli;
• Nizomiy Ganjaviy;
• Dante;
• Bomarshe va boshqalar.

Tarjimalar o‘zbek kitobxonining jahon adabiyoti bilan tanishish doirasini kengaytirgan.`
  ],
  awards: [
    `🏆 <b>Unvon va e’tiroflar</b>

• <b>1943</b> — O‘zbekiston Fanlar akademiyasining haqiqiy a’zosi.
• <b>1963</b> — O‘zbekiston xalq shoiri.
• Sovet davrida ijodiy faoliyati uchun davlat miqyosidagi mukofotlarga sazovor bo‘lgan.
• <b>1970</b> — vafotidan keyin Lenin mukofoti bilan taqdirlanganligi Uzbekistan Travel manbasida qayd etiladi.
• <b>2000</b> — O‘zbekistonning “Buyuk xizmatlari uchun” ordeni bilan vafotidan keyin mukofotlangan.

⚠️ Ayrim ikkilamchi manbalarda mukofot nomi yoki yiliga doir tafovutlar uchraydi. Botda rasmiy va institutsional manbalar ustuvor qo‘yildi.`
  ],
  museum: [
    `🏛 <b>Uy-muzeyi va xotirasi</b>

Toshkentdagi G‘afur G‘ulom uy-muzeyi 1983-yilda ochilgan. Manbalarga ko‘ra, adib 1944-yildan 1966-yilgacha shu uyda yashab va ijod qilib kelgan.

Muzey ekspozitsiyasida:
• yoshlik davriga oid materiallar;
• urush yillaridagi ijodi;
• tarjimonlik va akademiklik faoliyati;
• ish kabineti va memorial xonalar;
• shaxsiy buyumlar va dastxatli kitoblar namoyish etiladi.

G‘afur G‘ulom nomi Toshkentdagi metro bekati, istirohat bog‘i, ko‘chalar va turli madaniy-ma’rifiy maskanlarda saqlanib keladi.`
  ],
  facts: [
    `💡 <b>Qiziqarli faktlar</b>

• G‘afur G‘ulom bolaligida yetim qolgan; bu tajriba uning ijodida qayta-qayta aks etgan.
• “Shum bola” avtobiografik unsurlarga boy.
• U faqat shoir emas: nosir, dramaturg, publitsist, tarjimon va adabiyotshunos ham bo‘lgan.
• 1943-yildan Fanlar akademiyasi haqiqiy a’zosi edi.
• U O‘zbekiston Oliy Soveti deputati sifatida ham faoliyat yuritgani O‘zA materiallarida qayd etiladi.
• Qo‘qondagi adabiyot muzeyini tashkil etish va bino bilan ta’minlashga yordam bergani haqida O‘zA yozadi.
• Uning asarlari asosida teatr va kino talqinlari yaratilgan.
• Uy-muzeyida shoirning shaxsiy buyumlari va qo‘lyozma/dastxatli materiallari saqlanadi.`
  ],
  sources: [
    `🔎 <b>Asosiy manbalar</b>

1) O‘zbekiston Respublikasi Fanlar akademiyasi — sobiq haqiqiy a’zolar:
https://academy.uz/uz/page/fanlar-akademiyasining-sobiq-haqiqiy-azolari

2) O‘zA — G‘afur G‘ulomning deputatlik faoliyati va muzey materiallari:
https://uza.uz/uz/posts/gafur-gulomning-deputatlikda-qilgan-ishlari-arab-imlosida-yozilgan-shum-bola_373143

3) Uzbekistan Travel — G‘afur G‘ulom uy-muzeyi:
https://uzbekistan.travel/uz/o/gafur-gulom-uy-muzeyi/

4) Ziyouz — G‘afur G‘ulom hayoti va ijodi:
https://www.ziyouz.com/portal-haqida/xarita/uzbek-nasri/g-afur-g-ulom-1903-1966

5) Ziyouz — she’riy ijodi:
https://www.ziyouz.com/portal-haqida/xarita/uzbek-sheriyati/zamonaviy-o-zbek-she-riyati/g-afur-g-ulom-1903-1966

📌 <b>Manba tafovuti:</b> tug‘ilgan va vafot sanasida ayrim saytlar o‘rtasida nomuvofiqlik bor. Bot buni yashirmaydi va tegishli bo‘limlarda izoh beradi.`
  ]
};

export const QUIZ = [
  {
    q: "G‘afur G‘ulom qaysi shaharda tug‘ilgan?",
    options: ["Samarqand", "Toshkent", "Buxoro", "Qo‘qon"],
    correct: 1,
    note: "Ko‘pchilik manbalarga ko‘ra, u Toshkentning Qo‘rg‘ontegi mahallasida tug‘ilgan."
  },
  {
    q: "G‘afur G‘ulom Fanlar akademiyasining haqiqiy a’zosi qachon bo‘lgan?",
    options: ["1936", "1943", "1956", "1963"],
    correct: 1,
    note: "O‘zbekiston Fanlar akademiyasi 1943-yilda saylanganini ko‘rsatadi."
  },
  {
    q: "Qaysi asar avtobiografik unsurlarga boy?",
    options: ["Shum bola", "Otello", "Qirol Lir", "Muxbir sudi"],
    correct: 0,
    note: "“Shum bola” G‘afur G‘ulom bolaligi va davr Toshkentini aks ettiruvchi avtobiografik unsurlarga ega qissa."
  },
  {
    q: "Unga O‘zbekiston xalq shoiri unvoni qachon berilgan?",
    options: ["1943", "1950", "1963", "1970"],
    correct: 2,
    note: "Manbalarda 1963-yil ko‘rsatiladi."
  },
  {
    q: "G‘afur G‘ulom uy-muzeyi qachon ochilgan?",
    options: ["1966", "1970", "1983", "2000"],
    correct: 2,
    note: "Uzbekistan Travel ma’lumotiga ko‘ra, uy-muzey 1983-yilda ochilgan."
  }
] as const;
