import tinycolor from 'tinycolor2';

const INCREMENT = 5;
const MAX_TRIES = 50;

const getContrastScore = (color1: string, color2: string) =>
  Math.ceil(tinycolor.readability(color1, color2) * 100) / 100;

export const generateContrast = (primary: string) => {
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

  return contrastTiny.toHexString();
};

type Options = {
  name: string;
  nbVariation: number;
  increment: number;
  direction: string;
  colorToCompare?: string;
};

export type Color = {
  name: string;
  color: string;
  highlight?: boolean;
  contrastScore?: number;
};

export const generatePalette = (color: string, options: Options) => {
  const { nbVariation = 6, increment = 5, direction = 'both', colorToCompare } = options;
  const hexColor = tinycolor(color).toHexString();

  if (direction === 'right') {
    return [
      {
        name: options.name,
        color: hexColor,
        highlight: true,
        ...(colorToCompare && { contrastScore: getContrastScore(hexColor, colorToCompare) }),
      },
      ...Array.from({ length: nbVariation }).map((_, i) => {
        const c = tinycolor(color)
          .darken((i + 1) * increment)
          .toHexString();
        return {
          name: `${options.name}-${(i + 1) * 100}`,
          color: c,
          ...(colorToCompare && { contrastScore: getContrastScore(c, colorToCompare) }),
        };
      }),
    ];
  }

  if (direction === 'left') {
    return [
      ...Array.from({ length: nbVariation })
        .map((_, i: number) => {
          const c = tinycolor(color)
            .lighten((i + 1) * increment)
            .toHexString();
          return {
            name: `${options.name}-${(i + 1) * 100}`,
            color: c,
            ...(colorToCompare && { contrastScore: getContrastScore(c, colorToCompare) }),
          };
        })
        .reverse(),
      {
        name: options.name,
        color: hexColor,
        highlight: true,
        ...(colorToCompare && { contrastScore: getContrastScore(hexColor, colorToCompare) }),
      },
    ];
  }

  return [
    ...Array.from({ length: Math.floor(nbVariation / 2) })
      .map((_, i) => {
        const c = tinycolor(color)
          .lighten((i + 1) * increment)
          .toHexString();
        return {
          name: `${options.name}-light-${(i + 1) * 100}`,
          color: c,
          ...(colorToCompare && { contrastScore: getContrastScore(c, colorToCompare) }),
        };
      })
      .reverse(),
    {
      name: options.name,
      color: hexColor,
      highlight: true,
      ...(colorToCompare && { contrastScore: getContrastScore(hexColor, colorToCompare) }),
    },
    ...Array.from({ length: Math.floor(nbVariation / 2) }).map((_, i) => {
      const c = tinycolor(color)
        .darken((i + 1) * increment)
        .toHexString();
      return {
        name: `${options.name}-dark-${(i + 1) * 100}`,
        color: c,
        ...(colorToCompare && { contrastScore: getContrastScore(c, colorToCompare) }),
      };
    }),
  ];
};

export const generateBrand = (brand: string, primary: string) => {
  const isBrandReadable = tinycolor.isReadable(brand, primary);
  const primaryTiny = tinycolor(primary);
  const direction = primaryTiny.isDark() ? 'lighten' : 'darken';
  let newBrand = tinycolor(brand).clone();

  let tries = 0;

  if (!isBrandReadable) {
    while (!tinycolor.isReadable(primary, newBrand)) {
      if (tries >= MAX_TRIES) break;
      newBrand = tinycolor(newBrand)[direction](INCREMENT);
      tries++;
    }
    throw {
      message: `The contrast between your brand color and your primary color is not high enough. In the same hue we recommend using: ${newBrand}`,
      brand: newBrand.toHexString(),
    };
  }

  return brand;
};

const RANGES = {
  success: [100, 140],
  info: [220, 260],
  warning: [20, 60],
  error: [-10, 10],
};

export const generateStateColor = (state: string, saturation: number, luminosity: number) => {
  const range = RANGES[state];
  const predictedStateHue = (range[1] - range[0]) / 2 + range[0];
  const predictedStateSaturation = saturation;
  const predictedStateLuminosity = luminosity;

  let predictedStateColor = tinycolor({
    h: predictedStateHue,
    s: predictedStateSaturation,
    l: predictedStateLuminosity,
  });

  let isPredictedStateColorReadable = tinycolor.isReadable(predictedStateColor, 'white');

  let tries = 0;

  if (!isPredictedStateColorReadable) {
    while (!tinycolor.isReadable(predictedStateColor, 'white')) {
      if (tries >= MAX_TRIES || predictedStateColor.toHsl().h >= range[1]) break;
      predictedStateColor = predictedStateColor.spin(0.5);
      tries++;
    }
  }

  return predictedStateColor.toHexString();
};
