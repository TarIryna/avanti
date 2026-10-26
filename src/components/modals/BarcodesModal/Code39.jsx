import * as S from "./styles";

const patterns = {
  "0": "nnnwwnwnn", "1": "wnnwnnnnw", "2": "nnwwnnnnw", "3": "wnwwnnnnn",
  "4": "nnnwwnnnw", "5": "wnnwwnnnn", "6": "nnwwwnnnn", "7": "nnnwnnwnw",
  "8": "wnnwnnwnn", "9": "nnwwnnwnn", A: "wnnnnwnnw", B: "nnwnnwnnw",
  C: "wnwnnwnnn", D: "nnnnwwnnw", E: "wnnnwwnnn", F: "nnwnwwnnn",
  G: "nnnnnwwnw", H: "wnnnnwwnn", I: "nnwnnwwnn", J: "nnnnwwwnn",
  K: "wnnnnnnww", L: "nnwnnnnww", M: "wnwnnnnwn", N: "nnnnwnnww",
  O: "wnnnwnnwn", P: "nnwnwnnwn", Q: "nnnnnnwww", R: "wnnnnnwwn",
  S: "nnwnnnwwn", T: "nnnnwnwwn", U: "wwnnnnnnw", V: "nwwnnnnnw",
  W: "wwwnnnnnn", X: "nwnnwnnnw", Y: "wwnnwnnnn", Z: "nwwnwnnnn",
  "-": "nwnnnnwnw", ".": "wwnnnnwnn", " ": "nwwnnnwnn", "$": "nwnwnwnnn",
  "/": "nwnwnnnwn", "+": "nwnnnwnwn", "%": "nnnwnwnwn", "*": "nwnnwnwnn",
};

const Code39 = ({ value }) => {
  const code = String(value ?? "").trim().toUpperCase();
  if (!code || [...code].some((char) => !patterns[char])) return null;

  const encoded = `*${code}*`;
  const segments = [];

  [...encoded].forEach((char, charIndex) => {
    [...patterns[char]].forEach((width, index) => {
      const span = width === "w" ? 2 : 1;
      segments.push({ width: span, isBar: index % 2 === 0 });
    });
    if (charIndex < encoded.length - 1) segments.push({ width: 1, isBar: false });
  });
  const moduleCount = segments.reduce((total, segment) => total + segment.width, 0);
  const moduleWidth = Math.min(0.24, 24.8 / moduleCount);

  return (
    <S.BarcodeBars role="img" aria-label={`Штрихкод ${code}`}>
      {segments.map((segment, index) => (
        <S.BarcodeModule
          key={index}
          $width={segment.width}
          $moduleWidth={moduleWidth}
          $isBar={segment.isBar}
        />
      ))}
    </S.BarcodeBars>
  );
};

export default Code39;
