export const STEAM_URL =
  "https://store.steampowered.com/app/4378340/Byrd_Ronin/";
export const STEAM_APP_ID = "4378340";
export const YOUTUBE_TRAILER_ID = ""; // preencher quando disponível

export const GAME = {
  title: "Byrd Ronin",
  developer: "RDB's Studio",
  publisher: "RDB's Studio",
  releaseDate: "8 Abr. 2026",
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
    "Byrd Ronin mistura ação 2D intensa com controles precisos e ritmo acelerado. Como um pássaro Ronin, avance destruindo tudo até alcançar a cerejeira que guarda seu juramento. Evolua a cada run, desbloqueie itens e habilidades, domine o fluxo do combate e sobreviva ao caos — este é o caminho do Ronin.",
  descriptionLong:
    "O combate em Byrd Ronin é rápido, agressivo e recompensador. Saber o momento certo de atacar e contra-atacar é a única constante. Evolua a cada run, desbloqueando itens e habilidades — domine o fluxo de combate e encare o caos.",
} as const;

export interface GameplayClip {
  src: string;
  title: string;
  context: string;
  eyebrow: string;
  description: string;
}

// Vídeos nativos: 1170×658px (ratio 585:329 ≈ 16:9)
export const GAMEPLAY_CLIPS: GameplayClip[] = [
  {
    src: "/gameplay1.webm",
    title: "Cortes em alta velocidade",
    context: "Cada swing elimina bambus e inimigos ao mesmo tempo — o ritmo não para.",
    eyebrow: "Mobilidade & Combate",
    description:
      "Mobilidade é parte central da experiência. Dash, posicionamento e timing definem como você atravessa o campo de batalha e lida com o perigo constante.\n\nCada escolha muda o ritmo da luta — avançar, recuar ou insistir pode ser a diferença entre sobreviver ou cair.",
  },
  {
    src: "/gameplay2.webm",
    title: "Sobrevivendo à pressão inimiga",
    context: "Inimigos avançam de todos os lados. Timing e posicionamento são tudo.",
    eyebrow: "Evolução & Roguelike",
    description:
      "Cada run é uma oportunidade de evolução. Desbloqueie upgrades, habilidades e ferramentas que alteram a forma de jogar. Efeitos se combinam, estilos emergem e nenhuma tentativa é igual à anterior.",
  },
];
