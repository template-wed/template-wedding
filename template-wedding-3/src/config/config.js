export const WEDDING_DATE = new Date("2026-12-12T08:00:00");

export const formatWeddingDate = (date) => {
  return {
    full: date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    short: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  };
};