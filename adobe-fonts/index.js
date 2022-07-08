const $preview = document.querySelector('h1');
const $canvas = document.querySelector('canvas');
const $textInput = document.querySelector('input[type=text]');

const log = () => {
  console.log('-------');
  document.fonts.forEach((fontFace) => {
    if (fontFace.family === 'Graphik Web') return;
    console.log(fontFace);
  });
};

const cleanCanvas = (canvas) => {
  const canvasWidth = 1200;
  const canvasHeight = 200;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#557799';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const drawText = (canvas, text, fontFamily) => {
  cleanCanvas(canvas);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#aaccff';
  ctx.font = `48px "${fontFamily}"`;
  ctx.textBaseline = 'top';
  ctx.fillText(text, 50, 100);
};

const convertCodePoints = (str) => {
  return Array.from(str).map((char) => {
    const codePoint = char.codePointAt(0).toString(16);
    return `u+${codePoint}`.toUpperCase();
  });
};

const unicodeRangeMatch = (fontName, text) => {
  const codePoints = convertCodePoints(text);
  return codePoints.every((codePoint) => {
    let loaded = false;
    document.fonts.forEach((fontFace) => {
      if (
        fontFace.family === fontName &&
        fontFace.status === 'loaded' &&
        fontFace.unicodeRange.split(', ').includes(codePoint)
      ) {
        loaded = true;
      }
    });
    return loaded;
  });
};

const fontLoading = (fontName, text) => {
  const $dummyText = document.createElement('div');
  $dummyText.innerHTML = text;
  $dummyText.style.fontFamily = fontName;
  $dummyText.style.display = 'none';
  document.body.appendChild($dummyText);

  return new Promise((resolve) => {
    const lastFontsSize = document.fonts.size;
    const watchLoading = () => {
      setTimeout(() => {
        if (document.fonts.size > lastFontsSize) {
          $dummyText.remove();
          let loaded = true;
          document.fonts.forEach((fontFace) => {
            if (fontFace.family === fontName && fontFace.status !== 'loaded') {
              loaded = false;
            }
          });
          if (loaded) {
            resolve();
            return;
          }
          watchLoading();
        }
      }, 100);
    };
    watchLoading();
  });
};

const loadFont = async (fontName, text) => {
  if (unicodeRangeMatch(fontName, text)) {
    return;
  }
  return fontLoading(fontName, text);
};

$textInput.addEventListener('input', function (event) {
  // console.log(this.value);
  // $preview.textContent = this.value;
  loadFont('pigmo-00', this.value).then(() => {
    drawText($canvas, this.value, 'pigmo-00');
  });
});

setTimeout(() => {
  log();
}, 1000);
