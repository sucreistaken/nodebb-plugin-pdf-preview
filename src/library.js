'use strict';

var PDFPreviewPlugin = {};

PDFPreviewPlugin.parse = function (data, callback) {
    if (!data || !data.postData || !data.postData.content) {
        return callback(null, data);
    }

    var styles = 'width: 100%; height: 600px; border: none; margin-top: 10px;';

    // RegExp: Harici PDF linklerini algılar
    var pdfRegex = /<a href="(https?:\/\/[^"]+\.pdf)"[^>]*>([^<]+)<\/a>/g;
    // RegExp: NodeBB'ye yüklenen PDF'leri algılar
    var uploadedPdfRegex = /<a class="post-attachment" href="([^"]+\.pdf)">([^<]+)<\/a>/g;

    // 📌 Harici PDF linklerini otomatik olarak iframe'e çevir
    data.postData.content = data.postData.content.replace(pdfRegex, function (match, url, text) {
        return `
            <div style="margin: 10px 0;">
                <iframe src="${url}" style="${styles}" allowfullscreen></iframe>
                <p><a href="${url}" target="_blank">${text}</a></p>
            </div>
        `;
    });

    // 📌 NodeBB'ye yüklenen PDF dosyaları sadece link olarak gösterilecek
    data.postData.content = data.postData.content.replace(uploadedPdfRegex, function (match, url, text) {
        return `
            <p><a href="${url}" target="_blank" style="color: #007bff; text-decoration: none;">📄 ${text}</a></p>
        `;
    });

    callback(null, data);
};

module.exports = PDFPreviewPlugin;
