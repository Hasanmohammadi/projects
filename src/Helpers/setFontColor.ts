const setFontColor = (bgColor: string) => {
  const r = bgColor.substring(1, 3);
  const g = bgColor.substring(3, 5);
  const b = bgColor.substring(5, 7);

  const bgDelta =
    parseInt(r, 16) * 0.299 +
    parseInt(g, 16) * 0.587 +
    parseInt(b, 16) * 0.114;
  return 255 - bgDelta < 105 ? '#000' : '#fff';
};

export default setFontColor;
