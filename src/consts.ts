export const STEAM_URL =
  "https://store.steampowered.com/app/4378340/Byrd_Ronin/";
export const STEAM_APP_ID = "4378340";
export const YOUTUBE_TRAILER_ID = ""; // preencher quando disponível

export const GAME = {
  title: "Byrd Ronin",
  developer: "RDB's Studio",
  publisher: "RDB's Studio",
  releaseDate: "Fevereiro 2026",
  price: "R$ 9,99",
  rating: "6+",
  tags: [
    "Ação",
    "Roguelike de Ação",
    "Hack and Slash",
    "Difícil",
    "2D",
  ] as const,
  descriptionShort:
    "Byrd Ronin mistura ação 2D intensa com controles precisos e ritmo acelerado. Como um pássaro Ronin, avance destruindo tudo até alcançar a cerejeira que guarda seu juramento.",
  descriptionLong:
    "O combate em Byrd Ronin é rápido, agressivo e recompensador. Saber o momento certo de atacar e contra-atacar é a única constante. Evolua a cada run, desbloqueando itens e habilidades — domine o fluxo de combate e encare o caos.",
} as const;

// Vídeos nativos: 1170×658px (ratio 585:329 ≈ 16:9)
export const GAMEPLAY_CLIPS = [
  {
    src: "/gameplay1.webm",
    caption: "Slash bamboo at full speed",
    label: "01",
  },
  {
    src: "/gameplay2.webm",
    caption: "Survive enemy pressure",
    label: "02",
  },
] as const;
