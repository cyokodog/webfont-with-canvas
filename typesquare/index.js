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

const strStock = [];

const textFilterAndStock = (text) => {
  if (strStock.length === 0) {
    strStock.push(text);
    return text;
  }
  return text
    .split('')
    .filter((str) => {
      if (strStock.includes(str)) {
        return false;
      }
      strStock.push(str);
      return true;
    })
    .join('');
};

const loadWebFont = async (fontFamily, text) => {
  if (text === '') {
    return;
  }

  return new Promise((resolve) => {
    const filteredText = textFilterAndStock(text);
    if (filteredText === '') {
      resolve();
      return;
    }
    window.Ts.loadFontAsync({
      cssName: fontFamily,
      text,
      hasHint: false,
      outputType: 'json',
      callbackId: Date.now(),
      callback: async (params) => {
        const data = JSON.parse(params.data);
        const res = JSON.parse(data.res);
        const fontFace = new FontFace(res.fontFamily, `url(data:font/woff;base64,${res.src})`, {
          fontWeight: res['font-weight'],
        });
        document.fonts.add(fontFace);
        await fontFace.load();
        resolve();
      },
    });
  });
};

$textInput.addEventListener('input', function (event) {
  loadWebFont('Suzumushi', this.value).then(() => {
    drawText($canvas, this.value, 'Suzumushi');
  });
});
