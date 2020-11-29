import tinycolor from 'tinycolor2';

export const generateContrast = (primary: string) => {
  const INCREMENT = 5;
  const MAX_TRIES = 20;

  const primaryTiny = tinycolor(primary);
  const direction = primaryTiny.isDark() ? 'lighten' : 'darken';
  let contrastTiny = primaryTiny.clone()[direction](INCREMENT);

  let tries = 0;

  while (!tinycolor.isReadable(primaryTiny, contrastTiny, { level: 'AAA', size: 'small' })) {
    if (tries >= MAX_TRIES) break;
    contrastTiny = contrastTiny[direction](INCREMENT);
    tries++;
  }

  if (tries >= MAX_TRIES) {
    throw 'The color is not light or dark enough to find a good contrast';
  }

  return contrastTiny.toHex();
};

type Options = {
  nbVariation: number;
  increment: number;
  direction: string;
};

export const generatePalette = (color: string, options: Options) => {
  const { nbVariation = 6, increment = 3, direction = 'both' } = options;

  if (direction === 'right') {
    return [
      { name: 'base', color },
      ...Array.from({ length: nbVariation }).map((_, i) => ({
        name: `darken(${(i + 1) * increment})`,
        color: tinycolor(color)
          .darken((i + 1) * increment)
          .toHex(),
      })),
    ];
  }

  if (direction === 'left') {
    return [
      ...Array.from({ length: nbVariation })
        .map((_, i) => ({
          name: `lighten(${(i + 1) * increment})`,
          color: tinycolor(color)
            .lighten((i + 1) * increment)
            .toHex(),
        }))
        .reverse(),
      { name: 'base', color },
    ];
  }

  return [
    ...Array.from({ length: Math.floor(nbVariation / 2) })
      .map((_, i) => ({
        name: `lighten(${(i + 1) * increment})`,
        color: tinycolor(color)
          .lighten((i + 1) * increment)
          .toHex(),
      }))
      .reverse(),
    { name: 'base', color },
    ...Array.from({ length: Math.floor(nbVariation / 2) }).map((_, i) => ({
      name: `darken(${(i + 1) * increment})`,
      color: tinycolor(color)
        .darken((i + 1) * increment)
        .toHex(),
    })),
  ];
};
