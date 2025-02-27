'use strict';

var PDFPreviewPlugin = {};

PDFPreviewPlugin.parse = function (data, callback) {
    if (!data || !data.postData || !data.postData.content) {
        return callback(null, data);
    }

    var styles = `
        width: 100%;
        max-width: 800px;
        height: 600px;
        border: none;
        margin: 20px auto;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
    `;

    var containerStyles = `
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
    `;

    var mobileStyles = `
        @media (max-width: 768px) {
            iframe {
                width: 100%;
                height: 400px;
            }
        }
    `;

    var fullscreenStyles = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    var closeButtonStyles = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: red;
        color: white;
        border: none;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
    `;

    var pdfRegex = /<a href="(https?:\/\/[^"]+\.pdf)"[^>]*>([^<]+)<\/a>/g;

    // PDF linklerini otomatik iframe embed formatına dönüştür
    data.postData.content = data.postData.content.replace(pdfRegex, function (match, url) {
        return `
            <style>${mobileStyles}</style>
            <div style="${containerStyles}">
                <iframe src="${url}#toolbar=0" style="${styles}" allowfullscreen></iframe>
                <button onclick="expandPDF(this, '${url}')" style="position:absolute; bottom:10px; right:10px; background:#007bff; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:5px;">🔍 Büyüt</button>
            </div>
        `;
    });

    // JavaScript kodu ekleyerek büyütme/küçültme işlevi sağlıyoruz
    data.postData.content += `
        <script>
            function expandPDF(button, url) {
                var fullscreenDiv = document.createElement('div');
                fullscreenDiv.style = '${fullscreenStyles}';
                fullscreenDiv.innerHTML = \`
                    <button onclick="closePDF(this)" style="${closeButtonStyles}">❌ Kapat</button>
                    <iframe src="\${url}#toolbar=0" style="width:90%; height:90%; border:none;"></iframe>
                \`;
                document.body.appendChild(fullscreenDiv);
            }

            function closePDF(button) {
                var fullscreenDiv = button.parentElement;
                fullscreenDiv.remove();
            }
        </script>
    `;

    callback(null, data);
};

module.exports = PDFPreviewPlugin;
