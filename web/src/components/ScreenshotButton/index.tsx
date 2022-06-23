import html2canvas from 'html2canvas';

import './styles.css';

function ScreenshotButton() {
  async function handleSaveFile(url: string) {
    try {
      const link = document.createElement('a');

      link.download = `graph.png`;
      link.href = url;
      link.click();
    } catch (error) {
      console.error('There was an error saving file');
    }
  }

  async function handleTakeScreenshot() {
    try {
      const ignoreElements = ['download-button', 'converter-wrapper'];

      const canvas = await html2canvas(document.querySelector('.App')!, {
        backgroundColor: '#202124',
        ignoreElements: element => {
          return ignoreElements.some(className =>
            element.classList.contains(className),
          );
        },
      });
      const base64image = canvas.toDataURL('image/png');

      handleSaveFile(base64image);
    } catch (error) {
      console.error('There was an error taking the screenshot');
    }
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="download-button"
    >
      <svg
        width={22}
        height={22}
        viewBox="0 -0.5 17 17"
        xmlns="http://www.w3.org/2000/svg"
        className="download-icon"
      >
        <title>Download</title>
        <g fill="#bdc1c6" fillRule="evenodd">
          <path
            d="M15.031 9.016v4H3v-4H1V16h15.938V9.016h-1.907Z"
            className="si-glyph-fill"
          />
          <path
            d="m9.072 9.947 2.91-3.876-2.014-.021V1.065H8.03V6.05h-2l3.042 3.897Z"
            className="si-glyph-fill"
          />
        </g>
      </svg>
    </button>
  );
}

export default ScreenshotButton;
