import { create } from 'zustand';

const useFlashcardStore = create((set, get) => ({
  cards: [],
  currentIndex: 0,
  isFlipped: false,
  understood: [],
  notUnderstood: [],

  setCards: (cards) => set({ cards, currentIndex: 0, isFlipped: false, understood: [], notUnderstood: [] }),

  flipCard: () => set((s) => ({ isFlipped: !s.isFlipped })),

  nextCard: () => {
    const { currentIndex, cards } = get();
    if (currentIndex < cards.length - 1) {
      set({ currentIndex: currentIndex + 1, isFlipped: false });
    }
  },

  prevCard: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1, isFlipped: false });
    }
  },

  markUnderstood: () => {
    const { cards, currentIndex, understood } = get();
    const cardId = cards[currentIndex]?.id;
    if (cardId && !understood.includes(cardId)) {
      set({ understood: [...understood, cardId] });
    }
    get().nextCard();
  },

  markNotUnderstood: () => {
    const { cards, currentIndex, notUnderstood } = get();
    const cardId = cards[currentIndex]?.id;
    if (cardId && !notUnderstood.includes(cardId)) {
      set({ notUnderstood: [...notUnderstood, cardId] });
    }
    get().nextCard();
  },

  getCurrentCard: () => {
    const { cards, currentIndex } = get();
    return cards[currentIndex] || null;
  },

  getProgress: () => {
    const { understood, notUnderstood, cards } = get();
    return {
      total: cards.length,
      understood: understood.length,
      notUnderstood: notUnderstood.length,
      remaining: cards.length - understood.length - notUnderstood.length,
    };
  },

  reset: () => set({
    cards: [],
    currentIndex: 0,
    isFlipped: false,
    understood: [],
    notUnderstood: [],
  }),
}));

export default useFlashcardStore;
