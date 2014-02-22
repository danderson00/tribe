(function() {
    Samples = window.Samples || {};
    var sample = Samples['contentHeader'] || [];
    sample.push({
        header: 'CSS',
        content: '<pre class="highlight">.contentHeaders > div {\n    border: 1px solid grey;\n    margin: 10px 0;\n}\n\n.rounded {\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    overflow: hidden;\n}</pre>'
    });
    Samples['contentHeader'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['contentHeader'] || [];
    sample.push({
        header: 'HTM',
        content: '<pre class="highlight">&lt;div class="contentHeaders">\n    &lt;div data-bind="pane: \'/Common/contentHeader\', data: { text: \'Header Text\' }">&lt;/div>\n    &lt;div data-bind="pane: \'/Common/contentHeader\', data: { text: \'With Rounding\', gradientClass: \'gradientYellow\' }" class="rounded">&lt;/div>\n&lt;/div></pre>'
    });
    Samples['contentHeader'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['dialog'] || [];
    sample.push({
        header: 'HTM',
        content: '<pre class="highlight">&lt;button data-bind="click: showDialog">Show Dialog!&lt;/button></pre>'
    });
    Samples['dialog'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['dialog'] || [];
    sample.push({
        header: 'JS',
        content: '<pre class="highlight">T.registerModel(function(pane) {\n    this.showDialog = function() {\n        T.dialog(\'/dialogContent\', { title: \'Sample Dialog\' });\n    };\n});</pre>'
    });
    Samples['dialog'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['dialogContent'] || [];
    sample.push({
        header: 'HTM',
        content: '<pre class="highlight">&lt;div style="padding: 10px">\n    This is a separate pane loaded into the dialog pane.\n&lt;/div></pre>'
    });
    Samples['dialogContent'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['graph'] || [];
    sample.push({
        header: 'HTM',
        content: '<pre class="highlight">&lt;div data-bind="pane: \'/Common/graph\', data: graphData">&lt;/div></pre>'
    });
    Samples['graph'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['graph'] || [];
    sample.push({
        header: 'JS',
        content: '<pre class="highlight">T.registerModel(function(pane) {\n    this.graphData = {\n        series: {\n            \'Series 1\': [[0, 0], [1, 2], [2, 3], [3, 3], [4, 5]],\n            \'Series 2\': [[0, 0], [1, 1], [2, 4], [3, 3], [4, 2]]\n        },\n        css: {\n            width: 420,\n            height: 300\n        }\n    };\n});</pre>'
    });
    Samples['graph'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['grid'] || [];
    sample.push({
        header: 'HTM',
        content: '<pre class="highlight">&lt;div data-bind="pane: \'/Common/grid\', data: { source: gridSource, columns: gridColumns }">&lt;/div></pre>'
    });
    Samples['grid'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['grid'] || [];
    sample.push({
        header: 'JS',
        content: '<pre class="highlight">T.registerModel(function(pane) {\n    this.gridSource = [\n        { string: \'Hello\', first: 1, second: 4 },\n        { string: \'World\', first: 2, second: 3 }\n    ];\n    \n    this.gridColumns = [\n        { property: \'string\', heading: \'String\' },\n        { grouping: \'Grouping\', columns: [\n            { property: \'first\', heading: \'First\' },\n            { property: \'second\', heading: \'Second\' }\n        ]}\n    ];\n});</pre>'
    });
    Samples['grid'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['sample'] || [];
    sample.push({
        header: 'CSS',
        content: '<pre class="highlight">.sample {\n    margin: 10px 0;\n    border: 1px solid black;\n    border-radius: 6px;\n    overflow: hidden;\n}\n\n.sampleContent {\n    padding: 10px;\n}\n\n.samplePane {\n    border: 1px solid black;\n    padding: 10px;\n    margin: 10px 0;\n    width: 500px;\n}</pre>'
    });
    Samples['sample'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['sample'] || [];
    sample.push({
        header: 'HTM',
        content: '<pre class="highlight">&lt;div class="sample">\n    &lt;div data-bind="pane: \'/Common/contentHeader\', data: { text: pane, gradientClass: \'gradientReverseBlue\' }">&lt;/div>\n    &lt;div class="sampleContent">\n        &lt;div class="sampleSource" data-bind="pane: \'/Common/tabs\', data: { tabs: Samples[pane], tabSelected: highlightSyntax }">&lt;/div>\n        &lt;div class="samplePane" data-bind="pane: pane">&lt;/div>\n    &lt;/div>\n&lt;/div></pre>'
    });
    Samples['sample'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['sample'] || [];
    sample.push({
        header: 'JS',
        content: '<pre class="highlight">T.registerModel(function(pane) {\n    this.pane = pane.data.pane;\n\n    this.highlightSyntax = function() {\n        $(\'.sampleSource pre\').syntaxHighlight();\n    };\n});</pre>'
    });
    Samples['sample'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['tabs'] || [];
    sample.push({
        header: 'HTM',
        content: '<pre class="highlight">&lt;div data-bind="pane: \'/Common/tabs\', data: tabData">&lt;/div></pre>'
    });
    Samples['tabs'] = sample;
})();

(function() {
    Samples = window.Samples || {};
    var sample = Samples['tabs'] || [];
    sample.push({
        header: 'JS',
        content: '<pre class="highlight">T.registerModel(function(pane) {\n    this.tabData = {\n        tabs: [\n            { header: \'Tab 1\', content: \'Content 1\' },\n            { header: \'Tab 2\', content: \'Content 2\' }\n        ]\n    };\n});</pre>'
    });
    Samples['tabs'] = sample;
})();

