const winston = require('winston');
const meta = require.main.require('./src/meta');
const plugin = {};

plugin.init = async function (params) {
    const { router, middleware } = params;
    router.get('/plugins/pdf-preview', middleware.admin.buildHeader, renderAdminPage);
    router.get('/api/plugins/pdf-preview', renderAdminPage);
};

function renderAdminPage(req, res) {
    res.render('admin/plugins/pdf-preview', {});
}

plugin.filterPostContent = async function (data) {
    const pdfRegex = /(https?:\/\/[^\s]+\.pdf)/g;
    data.postData.content = data.postData.content.replace(pdfRegex, (match) => {
        return `<div class="pdf-preview-container">
                    <iframe src="https://mozilla.github.io/pdf.js/web/viewer.html?file=${match}" width="100%" height="500px"></iframe>
                </div>`;
    });
    return data;
};

plugin.addAdminNavigation = async function (header) {
    header.plugins.push({
        route: '/plugins/pdf-preview',
        icon: 'fa-file-pdf-o',
        name: 'PDF Preview'
    });
    return header;
};

module.exports = plugin;
