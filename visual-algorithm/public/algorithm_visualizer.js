/**
 * algorithm-visualizer - Algorithm Visualizer
 * @version v0.1.0
 * @author Jason Park & contributors
 * @link https://github.com/parkjs814/AlgorithmVisualizer#readme
 * @license MIT
 */
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [
        function (require, module, exports) {
            'use strict';

            var _$ = $,
                extend = _$.extend;


            var cache = {
                lastFileUsed: '',
                files: {}
            };

            var assertFileName = function assertFileName(name) {
                if (!name) {
                    throw 'Missing file name';
                }
            };

            /**
             * Global application cache
             */
            module.exports = {
                getCachedFile: function getCachedFile(name) {
                        assertFileName(name);
                        return cache.files[name];
                    },
                    updateCachedFile: function updateCachedFile(name, updates) {
                        assertFileName(name);
                        if (!cache.files[name]) {
                            cache.files[name] = {};
                        }
                        extend(cache.files[name], updates);
                    },
                    getLastFileUsed: function getLastFileUsed() {
                        return cache.lastFileUsed;
                    },
                    setLastFileUsed: function setLastFileUsed(file) {
                        cache.lastFileUsed = file;
                    }
            };

        }, {}
    ],
    2: [
        function (require, module, exports) {
            'use strict';

            var Editor = require('../editor');
            var TracerManager = require('../tracer_manager');
            var DOM = require('../dom/setup');

            var _require = require('../dom/loading_slider'),
                showLoadingSlider = _require.showLoadingSlider,
                hideLoadingSlider = _require.hideLoadingSlider;

            var Cache = require('./cache');

            var state = {
                isLoading: null,
                editor: null,
                tracerManager: null,
                categories: null,
                loadedScratch: null,
                wikiList: null
            };

            var initState = function initState(tracerManager) {
                state.isLoading = false;
                state.editor = new Editor(tracerManager);
                state.tracerManager = tracerManager;
                state.categories = {};
                state.loadedScratch = null;
                state.wikiList = [];
            };

            /**
             * Global application singleton.
             */
            var App = function App() {

                this.getIsLoading = function () {
                    return state.isLoading;
                };

                this.setIsLoading = function (loading) {
                    state.isLoading = loading;
                    if (loading) {
                        showLoadingSlider();
                    } else {
                        hideLoadingSlider();
                    }
                };

                this.getEditor = function () {
                    return state.editor;
                };

                this.getCategories = function () {
                    return state.categories;
                };

                this.getCategory = function (name) {
                    return state.categories[name];
                };

                this.setCategories = function (categories) {
                    state.categories = categories;
                };

                this.updateCategory = function (name, updates) {
                    $.extend(state.categories[name], updates);
                };

                this.getTracerManager = function () {
                    return state.tracerManager;
                };

                this.getLoadedScratch = function () {
                    return state.loadedScratch;
                };

                this.setLoadedScratch = function (loadedScratch) {
                    state.loadedScratch = loadedScratch;
                };

                this.getWikiList = function () {
                    return state.wikiList;
                };

                this.setWikiList = function (wikiList) {
                    state.wikiList = wikiList;
                };

                this.hasWiki = function (wiki) {
                    return~ state.wikiList.indexOf(wiki);
                };

                var tracerManager = TracerManager.init();

                initState(tracerManager);
                DOM.setup(tracerManager);
            };

            App.prototype = Cache;

            module.exports = App;

        }, {
            "../dom/loading_slider": 13,
            "../dom/setup": 16,
            "../editor": 35,
            "../tracer_manager": 72,
            "./cache": 1
        }
    ],
    3: [
        function (require, module, exports) {
            'use strict';

            /**
             * This is the main application instance.
             * Gets populated on page load.
             */

            module.exports = {};

        }, {}
    ],
    4: [
        function (require, module, exports) {
            'use strict';

            var array2D = require('./array2d');
            var modules = require('../module');
            var util = require('./util');

            var getTracerName = function getTracerName() {
                return document.getElementById("tracerName-1D").value;
            };

            var getNumColumns = function getNumColumns() {
                var column_field = document.getElementById('numColumns-1D');
                return column_field.value;
            };

            var setup = function setup() {
                var button_1DMatrix = document.getElementById("button-1DMatrix");
                var logger;
                var arr1DTracer;
                button_1DMatrix.addEventListener('click', function () {
                    util.clearModules();
                    arr1DTracer = new modules.Array1DTracer();
                    var arrElem = document.querySelector('.module_wrapper');
                    arrElem.addEventListener("mousewheel", array2D.mousescroll, false);
                    arrElem.addEventListener("DOMMouseScroll", array2D.mousescroll, false);
                    logger = new modules.LogTracer('Generated Javascript');

                    var numColumns = getNumColumns();
                    var data = array2D.fauxData(1, numColumns)[0];

                    arr1DTracer.setData(data);
                    array2D.tableToInputFields(1, numColumns);
                    util.positionModules();
                    arr1DTracer.refresh();
                }, false);
                var button_JS = document.getElementById('button-generateJS-1D');
                button_JS.addEventListener('click', function () {
                    array2D.generateJS(logger, 'Array1DTracer', getTracerName());
                }, false);
            };

            module.exports = {
                setup: setup
            };

        }, {
            "../module": 46,
            "./array2d": 5,
            "./util": 7
        }
    ],
    5: [
        function (require, module, exports) {
            'use strict';

            var modules = require('../module');
            var util = require('./util');

            var getTracerName = function getTracerName() {
                return document.getElementById("tracerName-2D").value;
            };

            var getNumRows = function getNumRows() {
                var row_field = document.getElementById('numRows-2D');
                return row_field.value;
            };

            var getNumColumns = function getNumColumns() {
                var column_field = document.getElementById('numColumns-2D');
                return column_field.value;
            };

            var fauxData = function fauxData(r, c) {
                var D = [];
                for (var i = 0; i < r; i++) {
                    D.push([]);
                    for (var j = 0; j < c; j++) {
                        D[i].push(Math.floor(Math.random() * 10 + 1));
                    }
                }
                return D;
            };

            var tableToInputFields = function tableToInputFields(numRows, numColumns) {
                var table = document.querySelector('.mtbl-table');

                for (var i = 0; i < numRows; i++) {
                    for (var j = 0; j < numColumns; j++) {
                        var elem = document.createElement('input');
                        elem.type = 'Text';
                        elem.value = Math.floor(Math.random() * 10 + 1);
                        elem.classList.add('mtbl-col', 'inputField');
                        table.childNodes[i].childNodes[j].innerHTML = '';
                        table.childNodes[i].childNodes[j].appendChild(elem);
                    }
                }
            };

            var generateJS = function generateJS(logger, tracer, tracerName) {
                if (!logger) return;

                logger.clear();
                var table = document.querySelector('.mtbl-table');

                var numRows = table.childNodes.length;
                var numColumns = table.childNodes[0].childNodes.length;

                logger.print('Copy and paste this code in your data.js file!');
                logger.print('');

                if (numRows > 1) {
                    logger.print('let myTable = [');
                }

                var line = 'let myTable = [';
                var i;
                var j;
                var comma = ',';
                var currVal;
                var nors;
                for (i = 0; i < numRows; i++) {
                    if (numRows > 1) {
                        line = '[';
                    }
                    for (j = 0; j < numColumns - 1; j++) {
                        currVal = table.childNodes[i].childNodes[j].childNodes[0].value;
                        nors = Number(currVal);
                        if (isNaN(nors)) {
                            currVal = "'" + currVal + "'";
                        }
                        line += currVal + ',';
                    }
                    if (i === numRows - 1) {
                        comma = '';
                    }
                    currVal = table.childNodes[i].childNodes[j++].childNodes[0].value;
                    nors = Number(currVal);
                    if (isNaN(nors)) {
                        currVal = "'" + currVal + "'";
                    }
                    line += currVal + ']' + comma;
                    logger.print(line);
                }
                if (numRows > 1) {
                    logger.print(']');
                }

                logger.print("let myTableTracer = new " + tracer + " ('" + tracerName + "')");
                logger.print('myTableTracer._setData (myTable)');

                util.enabledHightlighting();
            };

            var mousescroll = function mousescroll(e) {
                var colmElem = document.querySelector('.mtbl-col');
                var delta = e.wheelDelta !== undefined && e.wheelDelta || e.detail !== undefined && -e.detail;

                var inputFields = document.getElementsByClassName("inputField");
                for (var i = 0; i < inputFields.length; i++) {
                    inputFields[i].style.width = parseFloat(colmElem.style.fontSize) * 2.5 + "px";
                }
            };

            var setup = function setup() {
                var button_2DMatrix = document.getElementById("button-2DMatrix");
                var logger;
                var arr2DTracer;
                button_2DMatrix.addEventListener('click', function () {
                    util.clearModules();
                    arr2DTracer = new modules.Array2DTracer();
                    var arrElem = document.querySelector('.module_wrapper');
                    arrElem.addEventListener("mousewheel", mousescroll, false);
                    arrElem.addEventListener("DOMMouseScroll", mousescroll, false);
                    logger = new modules.LogTracer('Generated Javascript');

                    var numRows = getNumRows();
                    var numColumns = getNumColumns();
                    var data = fauxData(numRows, numColumns);

                    arr2DTracer.setData(data);
                    tableToInputFields(numRows, numColumns);
                    util.positionModules();
                    arr2DTracer.refresh();
                }, false);
                var button_JS = document.getElementById('button-generateJS-2D');
                button_JS.addEventListener('click', function () {
                    generateJS(logger, 'Array2DTracer', getTracerName());
                }, false);
            };

            module.exports = {
                setup: setup,
                mousescroll: mousescroll,
                fauxData: fauxData,
                tableToInputFields: tableToInputFields,
                generateJS: generateJS
            };

        }, {
            "../module": 46,
            "./util": 7
        }
    ],
    6: [
        function (require, module, exports) {
            'use strict';

            var modules = require('../module');
            var array2d = require('./array2d');
            var array1d = require('./array1d');
            var util = require('./util');
            var Server = require('../server');
            var DOM = require('../dom');

            var _require = require('../server/helpers'),
                getPath = _require.getPath;

            var closeCreate = function closeCreate() {
                var $btnClose = $('#btn_close');

                $btnClose.click(function () {
                    $('.sandbox_container').remove();
                    util.clearModules();
                    reloadAlgorithm();
                });
            };

            var reloadAlgorithm = function reloadAlgorithm() {
                var _getPath = getPath(),
                    category = _getPath.category,
                    algorithm = _getPath.algorithm,
                    file = _getPath.file;

                Server.loadAlgorithm(category, algorithm).then(function (data) {
                    DOM.showAlgorithm(category, algorithm, data);
                });
            };

            var createHTML = function createHTML() {
                $('.workspace').append("<div class='sandbox_container'>\
            <section class='close_bar'>\
            <div class='btn' id='btn_close'>\
                <div class='wrapper'>\
                    <i class='fa fa-times' aria-hidden='true'></i>\
                </div>\
            </div>\
            </section>\
            <section class='auto-gen'>\
                <div class='grid' id='array1D-gen'>\
                <div> array1DTracer </div>\
                <i class='fa fa-ellipsis-h fa-5x' aria-hidden='true'></i>\
                <div class='fields'>\
                # of Columns: <input class='inputs'id='numColumns-1D' type='number' value='5'>\
                </div>\
                <div class='fields'>\
                Tracer Name: <input class='inputs'id='tracerName-1D' type='text' value='default'>\
                </div>\
                <button class='sb-button' id='button-1DMatrix'>Create 1DMatrix</button>\
                <button class='sb-button' id='button-generateJS-1D'>Generate Javascript</button>\
                </div>\
                <div class='grid' id='array2D-gen'>\
                <div> array2DTracer </div>\
                <i class='fa fa-th fa-5x' aria-hidden='true'></i>\
                <div class='fields'>\
                # of Rows: <input class='inputs'id='numRows-2D' type='number' value='5'>\
                </div>\
                <div class='fields'>\
                # of Columns: <input class='inputs'id='numColumns-2D' type='number' value='5'>\
                </div>\
                <div class='fields'>\
                Tracer Name: <input class='inputs'id='tracerName-2D' type='text' value='default'>\
                </div>\
                <button class='sb-button' id='button-2DMatrix'>Create 2DMatrix</button>\
                <button class='sb-button' id='button-generateJS-2D'>Generate Javascript</button>\
                </div>\
                <div class='grid' id='chart-gen'></div>\
                <div class='grid' id='graph-gen'></div>\
            </section>\
    </div>");
            };

            var init = function init() {

                var check = $('.sandbox_container');
                if (!check.length) {
                    util.clearModules();
                    createHTML();
                    array2d.setup();
                    array1d.setup();
                    closeCreate();
                    util.clickTraceTab();
                }
            };

            module.exports = {
                init: init
            };

        }, {
            "../dom": 12,
            "../module": 46,
            "../server": 64,
            "../server/helpers": 63,
            "./array1d": 4,
            "./array2d": 5,
            "./util": 7
        }
    ],
    7: [
        function (require, module, exports) {
            'use strict';

            var positionModules = function positionModules() {
                var elems = document.getElementsByClassName('module_wrapper');
                if (elems <= 0) return;

                var n = elems.length;
                var spacing = 100 / n;

                for (var i = 0; i < n; i++) {
                    if (i === 0) {
                        elems[i].style.bottom = spacing * (n - 1) + '%';
                    } else if (i === n - 1) {
                        elems[i].style.top = spacing * i + '%';
                    } else {
                        elems[i].style.top = spacing * i + '%';
                        elems[i].style.bottom = spacing * i + '%';
                    }
                }
            };

            var clearModules = function clearModules() {
                var elems = document.getElementsByClassName('module_wrapper');
                if (elems.length > 0) {
                    var parent = elems[0].parentElement;
                    var numChild = parent.childNodes.length;
                    for (var i = 0; i < numChild; i++) {
                        parent.removeChild(parent.firstChild);
                    }
                }
            };

            var enabledHightlighting = function enabledHightlighting() {
                var elems = document.getElementsByClassName('module_wrapper');
                var logger = elems[1];
                var wrapper = logger.childNodes[1];
                for (var i = 0; i < wrapper.childNodes.length; i++) {
                    wrapper.childNodes[i].style["-webkit-user-select"] = "all";
                }
            };

            var clickTraceTab = function clickTraceTab() {
                var btn = document.getElementById('btn_trace');
                if (btn) {
                    btn.click();
                }
            };

            module.exports = {
                enabledHightlighting: enabledHightlighting,
                positionModules: positionModules,
                clearModules: clearModules,
                clickTraceTab: clickTraceTab
            };

        }, {}
    ],
    8: [
        function (require, module, exports) {
            'use strict';

            var app = require('../app');
            var Server = require('../server');
            var showAlgorithm = require('./show_algorithm');

            var _$ = $,
                each = _$.each;


            var getAlgorithmDOM = function getAlgorithmDOM(category, subList, algorithm) {
                return $('<button class="indent">').append(subList[algorithm]).attr('data-algorithm', algorithm).attr('data-category', category).click(function () {
                    Server.loadAlgorithm(category, algorithm).then(function (data) {
                        showAlgorithm(category, algorithm, data);
                    });
                });

                $('#list').append($algorithm);
            };

            var addCategoryToDOM = function addCategoryToDOM(category) {
                var _app$getCategory = app.getCategory(category),
                    categoryName = _app$getCategory.name,
                    categorySubList = _app$getCategory.list;

                var $category = $('<button class="category">').append('<i class="fa fa-fw fa-caret-right">').append(categoryName).attr('data-category', category);

                $category.click(function () {
                    var $self = $(this);
                    $self.toggleClass('open');
                    $self.find('i.fa').toggleClass('fa-caret-right fa-caret-down');
                    $self.next().toggle(300);
                });

                var $algorithms = $('<div class="algorithms collapse">');
                $('#list').append($category).append($algorithms);

                each(categorySubList, function (algorithm) {
                    var $algorithm = getAlgorithmDOM(category, categorySubList, algorithm);
                    $algorithms.append($algorithm);
                });
            };

            module.exports = function () {
                each(app.getCategories(), addCategoryToDOM);
            };

        }, {
            "../app": 3,
            "../server": 64,
            "./show_algorithm": 26
        }
    ],
    9: [
        function (require, module, exports) {
            'use strict';

            var Server = require('../server');

            var _$ = $,
                each = _$.each;


            var addFileToDOM = function addFileToDOM(category, algorithm, file, explanation) {
                var $file = $('<button>').append(file).attr('data-file', file).click(function () {
                    Server.loadFile(category, algorithm, file, explanation);
                    $('.files_bar > .wrapper > button').removeClass('active');
                    $(this).addClass('active');
                });
                $('.files_bar > .wrapper').append($file);
                return $file;
            };

            module.exports = function (category, algorithm, files, requestedFile) {
                $('.files_bar > .wrapper').empty();

                each(files, function (file, explanation) {
                    var $file = addFileToDOM(category, algorithm, file, explanation);
                    $file.addClass('tab_button');
                    if (requestedFile && requestedFile == file) $file.click();
                });

                if (!requestedFile) $('.files_bar > .wrapper > button').first().click();
                $('.files_bar > .wrapper').scroll();
            };

        }, {
            "../server": 64
        }
    ],
    10: [
        function (require, module, exports) {
            'use strict';

            module.exports = function () {
                var reqFunc = null;
                var extFunc = null;
                var reqFuncs = ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'];
                var extFuncs = ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen'];

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = reqFuncs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var tmpReqFunc = _step.value;

                        if (document.body[tmpReqFunc]) {
                            reqFunc = tmpReqFunc;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = extFuncs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var tmpExtFunc = _step2.value;

                        if (document[tmpExtFunc]) {
                            extFunc = tmpExtFunc;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                var $btnFullscreen = $('#btn_fullscreen');

                $btnFullscreen.click(function () {
                    if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {
                        if (extFunc) document[extFunc]();
                    } else {
                        if (reqFunc) document.body[reqFunc]();
                    }
                });
            };

        }, {}
    ],
    11: [
        function (require, module, exports) {
            'use strict';

            module.exports = function () {
                var $buttons = $('[data-category]');

                $('#search-bar').keyup(function () {
                    var query = $(this).val();
                    var re = new RegExp(query, 'i');

                    query ? $('#footer').hide() : $('#footer').show();
                    $.each($('#list .category'), function (i, c) {
                        var $c = $(c);
                        !$c.hasClass('open') && $c.click();
                    });

                    $buttons.show().filter(function () {
                        var cName = $(this).attr('data-category');

                        if ($(this).hasClass('category')) {
                            return !re.test($('[data-category="' + cName + '"]').text());
                        } else {
                            return !(re.test($('.category[data-category="' + cName + '"]').text()) || re.test($(this).text()));
                        }
                    }).hide();

                    $('.algorithms').show().filter(function () {
                        return !$(this).children(':visible').length;
                    }).hide();
                });
            };

        }, {}
    ],
    12: [
        function (require, module, exports) {
            'use strict';

            var showAlgorithm = require('./show_algorithm');
            var addCategories = require('./add_categories');
            var showDescription = require('./show_description');
            var addFiles = require('./add_files');
            var showFirstAlgorithm = require('./show_first_algorithm');
            var showRequestedAlgorithm = require('./show_requested_algorithm');
            var showWiki = require('./show_wiki');
            var enableSearch = require('./enable_search');
            var resizeWorkspace = require('./resize_workspace');
            var enableFullScreen = require('./enable_fullscreen');

            module.exports = {
                showAlgorithm: showAlgorithm,
                addCategories: addCategories,
                showDescription: showDescription,
                addFiles: addFiles,
                showFirstAlgorithm: showFirstAlgorithm,
                showRequestedAlgorithm: showRequestedAlgorithm,
                showWiki: showWiki,
                enableSearch: enableSearch,
                resizeWorkspace: resizeWorkspace,
                enableFullScreen: enableFullScreen
            };

        }, {
            "./add_categories": 8,
            "./add_files": 9,
            "./enable_fullscreen": 10,
            "./enable_search": 11,
            "./resize_workspace": 15,
            "./show_algorithm": 26,
            "./show_description": 27,
            "./show_first_algorithm": 28,
            "./show_requested_algorithm": 29,
            "./show_wiki": 30
        }
    ],
    13: [
        function (require, module, exports) {
            'use strict';

            var showLoadingSlider = function showLoadingSlider() {
                $('#loading-slider').removeClass('loaded');
            };

            var hideLoadingSlider = function hideLoadingSlider() {
                $('#loading-slider').addClass('loaded');
            };

            module.exports = {
                showLoadingSlider: showLoadingSlider,
                hideLoadingSlider: hideLoadingSlider
            };

        }, {}
    ],
    14: [
        function (require, module, exports) {
            'use strict';

            var create = function create() {
                var $container = $('<section class="module_wrapper">');
                $('.module_container').append($container);
                return $container;
            };

            module.exports = {
                create: create
            };

        }, {}
    ],
    15: [
        function (require, module, exports) {
            'use strict';

            var app = require('../app');

            module.exports = function () {
                app.getTracerManager().resize();
                app.getEditor().resize();
                $('.files_bar > .wrapper').scroll();
            };

        }, {
            "../app": 3
        }
    ],
    16: [
        function (require, module, exports) {
            'use strict';

            var setupDividers = require('./setup_dividers');
            var setupDocument = require('./setup_document');
            var setupFilesBar = require('./setup_files_bar');
            var setupInterval = require('./setup_interval');
            var setupModuleContainer = require('./setup_module_container');
            var setupTabContainer = require('./setup_tab_container');
            var setupSideMenu = require('./setup_side_menu');
            var setupTopMenu = require('./setup_top_menu');
            var setupWindow = require('./setup_window');

            /**
             * Initializes elements once the app loads in the DOM.
             */
            var setup = function setup() {

                $('.btn input').click(function (e) {
                    e.stopPropagation();
                });

                // dividers
                setupDividers();

                // document
                setupDocument();

                // files bar
                setupFilesBar();

                // interval
                setupInterval();

                // module container
                setupModuleContainer();

                // tab container
                setupTabContainer();

                // side menu
                setupSideMenu();

                // top menu
                setupTopMenu();

                // window
                setupWindow();
            };

            module.exports = {
                setup: setup
            };

        }, {
            "./setup_dividers": 17,
            "./setup_document": 18,
            "./setup_files_bar": 19,
            "./setup_interval": 20,
            "./setup_module_container": 21,
            "./setup_side_menu": 22,
            "./setup_tab_container": 23,
            "./setup_top_menu": 24,
            "./setup_window": 25
        }
    ],
    17: [
        function (require, module, exports) {
            'use strict';

            var _slicedToArray = function () {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;
                    try {
                        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function (arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                };
            }();

            var app = require('../../app');
            var resizeWorkspace = require('../resize_workspace');

            var addDividerToDom = function addDividerToDom(divider) {
                var _divider = _slicedToArray(divider, 3),
                    vertical = _divider[0],
                    $first = _divider[1],
                    $second = _divider[2];

                var $parent = $first.parent();
                var thickness = 5;

                var $divider = $('<div class="divider">');

                var dragging = false;
                if (vertical === 'v') {
                    $divider.addClass('vertical');
                    var _left = -thickness / 2;
                    $divider.css({
                        top: 0,
                        bottom: 0,
                        left: _left,
                        width: thickness
                    });

                    var x = void 0;
                    $divider.mousedown(function (_ref) {
                        var pageX = _ref.pageX;

                        x = pageX;
                        dragging = true;
                    });

                    $(document).mousemove(function (_ref2) {
                        var pageX = _ref2.pageX;

                        if (dragging) {
                            var new_left = $second.position().left + pageX - x;
                            var percent = new_left / $parent.width() * 100;
                            percent = Math.min(90, Math.max(10, percent));
                            $first.css('right', 100 - percent + '%');
                            $second.css('left', percent + '%');
                            x = pageX;
                            resizeWorkspace();
                        }
                    });

                    $(document).mouseup(function (e) {
                        dragging = false;
                    });
                } else {
                    $divider.addClass('horizontal');
                    var _top = -thickness / 2;
                    $divider.css({
                        top: _top,
                        height: thickness,
                        left: 0,
                        right: 0
                    });

                    var y = void 0;
                    $divider.mousedown(function (_ref3) {
                        var pageY = _ref3.pageY;

                        y = pageY;
                        dragging = true;
                    });

                    $(document).mousemove(function (_ref4) {
                        var pageY = _ref4.pageY;

                        if (dragging) {
                            var new_top = $second.position().top + pageY - y;
                            var percent = new_top / $parent.height() * 100;
                            percent = Math.min(90, Math.max(10, percent));
                            $first.css('bottom', 100 - percent + '%');
                            $second.css('top', percent + '%');
                            y = pageY;
                            resizeWorkspace();
                        }
                    });

                    $(document).mouseup(function (e) {
                        dragging = false;
                    });
                }

                $second.append($divider);
            };

            module.exports = function () {
                var dividers = [
                    ['v', $('.sidemenu'), $('.workspace')],
                    ['v', $('.viewer_container'), $('.editor_container')],
                    ['h', $('.data_container'), $('.code_container')]
                ];
                for (var i = 0; i < dividers.length; i++) {
                    addDividerToDom(dividers[i]);
                }
            };

        }, {
            "../../app": 3,
            "../resize_workspace": 15
        }
    ],
    18: [
        function (require, module, exports) {
            'use strict';

            var app = require('../../app');

            module.exports = function () {
                $(document).on('click', 'a', function (e) {
                    var href = $(this).attr('href');
                    if (/^(https?:\/\/).+/.test(href)) {
                        e.preventDefault();
                        if (!window.open(href, '_blank')) {
                            alert('Please allow popups for this site');
                        }
                    }
                });

                $(document).mouseup(function (e) {
                    app.getTracerManager().command('mouseup', e);
                });
            };

        }, {
            "../../app": 3
        }
    ],
    19: [
        function (require, module, exports) {
            'use strict';

            var definitelyBigger = function definitelyBigger(x, y) {
                return x > y + 2;
            };

            module.exports = function () {

                $('.files_bar > .btn-left').click(function () {
                    var $wrapper = $('.files_bar > .wrapper');
                    var clipWidth = $wrapper.width();
                    var scrollLeft = $wrapper.scrollLeft();

                    $($wrapper.children('button').get().reverse()).each(function () {
                        var left = $(this).position().left;
                        var right = left + $(this).outerWidth();
                        if (0 > left) {
                            $wrapper.scrollLeft(scrollLeft + right - clipWidth);
                            return false;
                        }
                    });
                });

                $('.files_bar > .btn-right').click(function () {
                    var $wrapper = $('.files_bar > .wrapper');
                    var clipWidth = $wrapper.width();
                    var scrollLeft = $wrapper.scrollLeft();

                    $wrapper.children('button').each(function () {
                        var left = $(this).position().left;
                        var right = left + $(this).outerWidth();
                        if (clipWidth < right) {
                            $wrapper.scrollLeft(scrollLeft + left);
                            return false;
                        }
                    });
                });

                $('.files_bar > .wrapper').scroll(function () {

                    var $wrapper = $('.files_bar > .wrapper');
                    var clipWidth = $wrapper.width();
                    var $left = $wrapper.children('button:first-child');
                    var $right = $wrapper.children('button:last-child');
                    var left = $left.position().left;
                    var right = $right.position().left + $right.outerWidth();

                    if (definitelyBigger(0, left) && definitelyBigger(clipWidth, right)) {
                        var scrollLeft = $wrapper.scrollLeft();
                        $wrapper.scrollLeft(scrollLeft + clipWidth - right);
                        return;
                    }

                    var lefter = definitelyBigger(0, left);
                    var righter = definitelyBigger(right, clipWidth);
                    $wrapper.toggleClass('shadow-left', lefter);
                    $wrapper.toggleClass('shadow-right', righter);
                    $('.files_bar > .btn-left').attr('disabled', !lefter);
                    $('.files_bar > .btn-right').attr('disabled', !righter);
                });
            };

        }, {}
    ],
    20: [
        function (require, module, exports) {
            'use strict';

            var _slicedToArray = function () {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;
                    try {
                        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function (arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                };
            }();

            var app = require('../../app');
            var Toast = require('../toast');

            var parseFloat = Number.parseFloat;


            var minInterval = 0.01;
            var maxInterval = 10;
            var startInterval = 0.05;
            var stepInterval = 0.1;

            var normalize = function normalize(sec) {

                var interval = void 0;
                var message = void 0;
                if (sec < minInterval) {
                    interval = minInterval;
                    message = `动画延时 ${sec} 秒太短。最小值为 ${minInterval} 秒。`;
                   } else if (sec > maxInterval) {
                    interval = maxInterval;
                    message = `动画延时 ${sec} 秒太长。最大值为 ${maxInterval} 秒。`;
                } else {
                    interval = sec;
                    message = `动画延时设置为 ${sec} 秒。`;
                }

                return [interval, message];
            };

            module.exports = function () {

                var $interval = $('#interval');
                $interval.val(startInterval);
                $interval.attr({
                    max: maxInterval,
                    min: minInterval,
                    step: stepInterval
                });

                $('#interval').on('change', function () {
                    var tracerManager = app.getTracerManager();

                    var _normalize = normalize(parseFloat($(this).val())),
                        _normalize2 = _slicedToArray(_normalize, 2),
                        seconds = _normalize2[0],
                        message = _normalize2[1];

                    $(this).val(seconds);
                    tracerManager.interval = seconds * 1000;
                    Toast.showInfoToast(message);
                });
            };

        }, {
            "../../app": 3,
            "../toast": 31
        }
    ],
    21: [
        function (require, module, exports) {
            'use strict';

            var app = require('../../app');

            module.exports = function () {

                var $module_container = $('.module_container');

                $module_container.on('mousedown', '.module_wrapper', function (e) {
                    app.getTracerManager().findOwner(this).mousedown(e);
                });

                $module_container.on('mousemove', '.module_wrapper', function (e) {
                    app.getTracerManager().findOwner(this).mousemove(e);
                });

                $module_container.on('DOMMouseScroll mousewheel', '.module_wrapper', function (e) {
                    app.getTracerManager().findOwner(this).mousewheel(e);
                });
            };

        }, {
            "../../app": 3
        }
    ],
    22: [
        function (require, module, exports) {
            'use strict';

            var app = require('../../app');
            var Server = require('../../server');
            var showAlgorithm = require('../show_algorithm');
            var resizeWorkspace = require('../resize_workspace');

            var sidemenu_percent = void 0;

            module.exports = function () {
                $('#navigation').click(function () {
                    var $sidemenu = $('.sidemenu');
                    var $workspace = $('.workspace');

                    $sidemenu.toggleClass('active');

                    $('.nav-dropdown').toggleClass('fa-caret-down fa-caret-right');
                    if ($sidemenu.hasClass('active')) {
                        $sidemenu.animate({
                            "right": 100 - sidemenu_percent + '%'
                        }, "fast");
                        $workspace.animate({
                            "left": sidemenu_percent + '%'
                        }, "fast");
                    } else {
                        sidemenu_percent = $workspace.position().left / $('body').width() * 100;
                        $sidemenu.animate({
                            "right": "0%"
                        }, "fast");
                        $workspace.animate({
                            "left": "0%"
                        }, "fast");
                    }

                    resizeWorkspace();
                });

                $('#documentation').click(function () {
                    $('#btn_doc').click();
                });

                $('#powered-by').click(function () {
                    $(this).toggleClass('open');
                    $('#powered-by-list').toggle(300);
                });

                $('#scratch-paper').click(function () {
                    var category = 'scratch';
                    var algorithm = app.getLoadedScratch();
                    Server.loadAlgorithm(category, algorithm).then(function (data) {
                        showAlgorithm(category, algorithm, data);
                    });
                });
            };

        }, {
            "../../app": 3,
            "../../server": 64,
            "../resize_workspace": 15,
            "../show_algorithm": 26
        }
    ],
    23: [
        function (require, module, exports) {
            'use strict';

            module.exports = function () {
                $('.tab_bar > button').click(function () {
                    $('.tab_bar > button').removeClass('active');
                    $('.tab_container > .tab').removeClass('active');
                    $(this).addClass('active');
                    $($(this).attr('data-target')).addClass('active');
                });
            };

        }, {}
    ],
    24: [
        function (require, module, exports) {
            'use strict';

            var app = require('../../app');
            var Server = require('../../server');
            var Toast = require('../toast');
            var TopMenu = require('../top_menu');
            var create = require('../../create');

            module.exports = function () {

                // shared
                $('#shared').mouseup(function () {
                    $(this).select();
                });

                $('#btn_share').click(function () {

                    var $icon = $(this).find('.fa-share');
                    $icon.addClass('fa-spin fa-spin-faster');

                    Server.shareScratchPaper().then(function (url) {
                        $icon.removeClass('fa-spin fa-spin-faster');
                        $('#shared').removeClass('collapse');
                        $('#shared').val(url);
                        Toast.showInfoToast('Shareable link is created.');
                    });
                });

                // control

                var $btnRun = $('#btn_run');
                var $btnTrace = $('#btn_trace');
                var $btnPause = $('#btn_pause');
                var $btnPrev = $('#btn_prev');
                var $btnNext = $('#btn_next');
                var $btnGenerate = $('#btn_generate');

                // initially, control buttons are disabled
                TopMenu.disableFlowControl();

                $btnRun.click(function () {
                    $btnTrace.click();
                    $btnPause.removeClass('active');
                    $btnRun.addClass('active');
                    TopMenu.enableFlowControl();
                    var err = app.getEditor().execute();
                    if (err) {
                        console.error(err);
                        Toast.showErrorToast(err);
                        TopMenu.resetTopMenuButtons();
                    }
                });

                $btnPause.click(function () {
                    $btnRun.toggleClass('active');
                    $btnPause.toggleClass('active');
                    if (app.getTracerManager().isPause()) {
                        app.getTracerManager().resumeStep();
                    } else {
                        app.getTracerManager().pauseStep();
                    }
                });

                $btnPrev.click(function () {
                    $btnRun.removeClass('active');
                    $btnPause.addClass('active');
                    app.getTracerManager().pauseStep();
                    app.getTracerManager().prevStep();
                });

                $btnNext.click(function () {
                    $btnRun.removeClass('active');
                    $btnPause.addClass('active');
                    app.getTracerManager().pauseStep();
                    app.getTracerManager().nextStep();
                });

                $btnGenerate.click(function () {
                    create.init();
                });
            };

        }, {
            "../../app": 3,
            "../../create": 6,
            "../../server": 64,
            "../toast": 31,
            "../top_menu": 32
        }
    ],
    25: [
        function (require, module, exports) {
            'use strict';

            var app = require('../../app');

            module.exports = function () {
                $(window).resize(function () {
                    app.getTracerManager().resize();
                });
            };

        }, {
            "../../app": 3
        }
    ],
    26: [
        function (require, module, exports) {
            'use strict';

            var app = require('../app');
            var utils = require('../utils');
            var showDescription = require('./show_description');
            var addFiles = require('./add_files');

            module.exports = function (category, algorithm, data, requestedFile) {
                var $menu = void 0;
                var category_name = void 0;
                var algorithm_name = void 0;

                if (utils.isScratchPaper(category)) {
                    $menu = $('#scratch-paper');
                    category_name = 'Scratch Paper';
                    algorithm_name = algorithm ? 'Shared' : 'Temporary';
                } else {
                    $menu = $('[data-category="' + category + '"][data-algorithm="' + algorithm + '"]');
                    var categoryObj = app.getCategory(category);
                    category_name = categoryObj.name;
                    algorithm_name = categoryObj.list[algorithm];
                }

                $('.sidemenu button').removeClass('active');
                $menu.addClass('active');

                $('#category').html(category_name);
                $('#algorithm').html(algorithm_name);
                $('#tab_desc > .wrapper').empty();
                $('.files_bar > .wrapper').empty();
                $('#explanation').html('');

                app.setLastFileUsed(null);
                app.getEditor().clearContent();

                var files = data.files;


                delete data.files;

                showDescription(data);
                addFiles(category, algorithm, files, requestedFile);
                utils.renderMathJax();
            };

        }, {
            "../app": 3,
            "../utils": 78,
            "./add_files": 9,
            "./show_description": 27
        }
    ],
    27: [
        function (require, module, exports) {
            'use strict';

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            var isArray = Array.isArray;
            var _$ = $,
                each = _$.each;


            module.exports = function (data) {
                var $container = $('#tab_desc > .wrapper');
                $container.empty();

                each(data, function (key, value) {

                    if (key) {
                        $container.append($('<h3>').html(key));
                    }

                    if (typeof value === 'string') {
                        $container.append($('<p>').html(value));
                    } else if (isArray(value)) {

                        var $ul = $('<ul class="applications">');
                        $container.append($ul);

                        value.forEach(function (li) {
                            $ul.append($('<li>').html(li));
                        });
                    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {

                        var _$ul = $('<ul class="complexities">');
                        $container.append(_$ul);

                        each(value, function (prop) {
                            var $wrapper = $('<div class="complexity">');
                            var $type = $('<span class="complexity-type">').html(prop + ': ');
                            var $value = $('<span class="complexity-value">').html('' + value[prop]);

                            $wrapper.append($type).append($value);

                            _$ul.append($('<li>').append($wrapper));
                        });
                    }
                });
            };

        }, {}
    ],
    28: [
        function (require, module, exports) {
            'use strict';

            // click the first algorithm in the first category

            module.exports = function () {
                $('#list .category').first().click();
                $('#list .category + .algorithms > .indent').first().click();
            };

        }, {}
    ],
    29: [
        function (require, module, exports) {
            'use strict';

            var Server = require('../server');
            var showAlgorithm = require('./show_algorithm');

            module.exports = function (category, algorithm, file) {
                $('.category[data-category="' + category + '"]').click();
                Server.loadAlgorithm(category, algorithm).then(function (data) {
                    showAlgorithm(category, algorithm, data, file);
                });
            };

        }, {
            "../server": 64,
            "./show_algorithm": 26
        }
    ],
    30: [
        function (require, module, exports) {
            'use strict';

            var app = require('../app');
            var Server = require('../server');
            var converter = new showdown.Converter({
                tables: true
            });

            module.exports = function (wiki) {
                Server.loadWiki(wiki).then(function (data) {
                    $('#tab_doc > .wrapper').html(converter.makeHtml('#' + wiki + '\n' + data));
                    $('#tab_doc').scrollTop(0);
                    $('#tab_doc > .wrapper a').click(function (e) {
                        var href = $(this).attr('href');
                        if (app.hasWiki(href)) {
                            e.preventDefault();
                            module.exports(href);
                        }
                    });
                });
            };

        }, {
            "../app": 3,
            "../server": 64
        }
    ],
    31: [
        function (require, module, exports) {
            'use strict';

            var showToast = function showToast(data, type) {
                var $toast = $('<div class="toast ' + type + '">').append(data);

                $('.toast_container').append($toast);
                setTimeout(function () {
                    $toast.fadeOut(function () {
                        $toast.remove();
                    });
                }, 3000);
            };

            var showErrorToast = function showErrorToast(err) {
                showToast(err, 'error');
            };

            var showInfoToast = function showInfoToast(err) {
                showToast(err, 'info');
            };

            module.exports = {
                showErrorToast: showErrorToast,
                showInfoToast: showInfoToast
            };

        }, {}
    ],
    32: [
        function (require, module, exports) {
            'use strict';

            var app = require('../app');

            var flowControlBtns = [$('#btn_pause'), $('#btn_prev'), $('#btn_next')];
            var setFlowControlState = function setFlowControlState(isDisabled) {
                flowControlBtns.forEach(function ($btn) {
                    return $btn.attr('disabled', isDisabled);
                });
            };

            var enableFlowControl = function enableFlowControl() {
                setFlowControlState(false);
            };

            var disableFlowControl = function disableFlowControl() {
                setFlowControlState(true);
            };

            var resetTopMenuButtons = function resetTopMenuButtons() {
                $('.top-menu-buttons button').removeClass('active');
                disableFlowControl();
                app.getEditor().unhighlightLine();
            };

            var setInterval = function setInterval(val) {
                $('#interval').val(interval);
            };

            var activateBtnPause = function activateBtnPause() {
                $('#btn_pause').addClass('active');
            };

            var deactivateBtnPause = function deactivateBtnPause() {
                $('#btn_pause').removeClass('active');
            };

            module.exports = {
                enableFlowControl: enableFlowControl,
                disableFlowControl: disableFlowControl,
                resetTopMenuButtons: resetTopMenuButtons,
                setInterval: setInterval,
                activateBtnPause: activateBtnPause,
                deactivateBtnPause: deactivateBtnPause
            };

        }, {
            "../app": 3
        }
    ],
    33: [
        function (require, module, exports) {
            'use strict';

            module.exports = function (id) {
                var editor = ace.edit(id);

                editor.setOptions({
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true
                });

                editor.setTheme('ace/theme/tomorrow_night_eighties');
                editor.session.setMode('ace/mode/javascript');
                editor.$blockScrolling = Infinity;

                return editor;
            };

        }, {}
    ],
    34: [
        function (require, module, exports) {
            'use strict';

            var execute = function execute(tracerManager, code, dataLines) {
                // all modules available to eval are obtained from window
                try {
                    tracerManager.deallocateAll();
                    var lines = code.split('\n');
                    var newLines = [];
                    lines.forEach(function (line, i) {
                        newLines.push(line);//.replace(/(.+\. *_wait *)(\( *\))/g, '$1(' + (i - dataLines) + ')'));
                    });
                    eval(Babel.transform(newLines.join('\n'), {
                        presets: ['es2015']
                    }).code);
                    tracerManager.visualize();
                } catch (err) {
                    return err;
                } finally {
                    tracerManager.removeUnallocated();
                }
            };

            var executeData = function executeData(tracerManager, algoData) {
                return execute(tracerManager, algoData);
            };

            var executeDataAndCode = function executeDataAndCode(tracerManager, algoData, algoCode) {
                var dataLines = algoData.split('\n').length;
                return execute(tracerManager, algoData + '\n' + algoCode, dataLines);
            };

            module.exports = {
                executeData: executeData,
                executeDataAndCode: executeDataAndCode
            };

        }, {}
    ],
    35: [
        function (require, module, exports) {
            'use strict';

            var app = require('../app');
            var createEditor = require('./create');
            var Executor = require('./executor');
            var TopMenu = require('../dom/top_menu');

            function Editor(tracerManager) {
                var _this = this;

                if (!tracerManager) {
                    throw 'Cannot create Editor. Missing the tracerManager';
                }

                ace.require('ace/ext/language_tools');
                var Range = ace.require("ace/range").Range;

                this.dataEditor = createEditor('data');
                this.codeEditor = createEditor('code');
                this.codeshowEditor = createEditor('codeshow');
                
                // Setting data

                this.setData = function (data) {
                    _this.dataEditor.setValue(data, -1);
                };

                this.setCode = function (code) {
                    _this.codeEditor.setValue(code, -1);
                };
                this.setCodeshow = function (codeshow) {
                    _this.codeshowEditor.setValue(codeshow, -1);
                };

                this.setContent = function (_ref) {
                    var data = _ref.data,
                        code = _ref.code,
                        codeshow = _ref.codeshow;

                    _this.setData(data);
                    _this.setCode(code);
                    _this.setCodeshow(codeshow);

                };

                // Clearing data

                this.clearData = function () {
                    _this.dataEditor.setValue('');
                };

                this.clearCode = function () {
                    _this.codeEditor.setValue('');
                };

                this.clearCodeshow = function () {
                    _this.codeshowEditor.setValue('');
                };

                this.clearContent = function () {
                    _this.clearData();
                    _this.clearCode();
                    _this.clearCodeshow();
                };

                this.execute = function () {
                    var data = _this.dataEditor.getValue();
                    var code = _this.codeEditor.getValue();

                    return Executor.executeDataAndCode(tracerManager, data, code);
                };

                this.highlightLine = function (lineNumber) {
                    var session = _this.codeshowEditor.getSession();
                    if (_this.marker) session.removeMarker(_this.marker);
                    _this.marker = session.addMarker(new Range(lineNumber, 0, lineNumber, Infinity), "executing", "line", true);
                };

                this.unhighlightLine = function () {
                    var session = _this.codeshowEditor.getSession();
                    if (_this.marker) session.removeMarker(_this.marker);
                };

                this.resize = function () {
                    _this.dataEditor.resize();
                    _this.codeshowEditor.resize();
                };

                // listeners

                this.dataEditor.on('change', function () {
                    var data = _this.dataEditor.getValue();
                    var lastFileUsed = app.getLastFileUsed();
                    if (lastFileUsed) {
                        app.updateCachedFile(lastFileUsed, {
                            data: data
                        });
                    }
                    Executor.executeData(tracerManager, data);
                    TopMenu.resetTopMenuButtons();
                });

                this.codeshowEditor.on('change', function () {
                    var code = _this.codeshowEditor.getValue();
                    var lastFileUsed = app.getLastFileUsed();
                    if (lastFileUsed) {
                        app.updateCachedFile(lastFileUsed, {
                            code: code
                        });
                    }
                    tracerManager.reset();
                    TopMenu.resetTopMenuButtons();
                });
            }

            module.exports = Editor;

        }, {
            "../app": 3,
            "../dom/top_menu": 32,
            "./create": 33,
            "./executor": 34
        }
    ],
    36: [
        function (require, module, exports) {
            'use strict';

            var RSVP = require('rsvp');
            var app = require('./app');
            var AppConstructor = require('./app/constructor');
            var DOM = require('./dom');
            var Server = require('./server');
            var modules = require('./module');

            var _$ = $,
                extend = _$.extend;


            $.ajaxSetup({
                cache: false,
                dataType: 'text'
            });

            var _require = require('./utils'),
                isScratchPaper = _require.isScratchPaper;

            var _require2 = require('./server/helpers'),
                getHashValue = _require2.getHashValue,
                getParameterByName = _require2.getParameterByName,
                getPath = _require2.getPath;

            // set global promise error handler


            RSVP.on('error', function (reason) {
                console.assert(false, reason);
            });

            $(function () {
                // initialize the application and attach in to the instance module
                var appConstructor = new AppConstructor();
                extend(true, app, appConstructor);

                // load modules to the global scope so they can be evaled
                extend(true, window, modules);

                Server.loadCategories().then(function (data) {
                    app.setCategories(data);
                    DOM.addCategories();

                    //enable search feature
                    DOM.enableSearch();
                    //enable fullscreen feature
                    DOM.enableFullScreen();

                    // determine if the app is loading a pre-existing scratch-pad
                    // or the home page

                    var _getPath = getPath(),
                        category = _getPath.category,
                        algorithm = _getPath.algorithm,
                        file = _getPath.file;

                    if (isScratchPaper(category)) {
                        if (algorithm) {
                            Server.loadScratchPaper(algorithm).then(function (_ref) {
                                var category = _ref.category,
                                    algorithm = _ref.algorithm,
                                    data = _ref.data;

                                DOM.showAlgorithm(category, algorithm, data);
                            });
                        } else {
                            Server.loadAlgorithm(category).then(function (data) {
                                DOM.showAlgorithm(category, null, data);
                            });
                        }
                    } else if (category && algorithm) {
                        DOM.showRequestedAlgorithm(category, algorithm, file);
                    } else {
                        DOM.showFirstAlgorithm();
                    }
                });

                //Server.loadWikiList().then(function (data) {
                 //   app.setWikiList(data.wikis);

                   // DOM.showWiki('Tracer');
                //});

                var v1LoadedScratch = getHashValue('scratch-paper');
                var v2LoadedScratch = getParameterByName('scratch-paper');
                var vLoadedScratch = v1LoadedScratch || v2LoadedScratch;
                if (vLoadedScratch) {
                    window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname + '#path=scratch/' + vLoadedScratch;
                }
            });

        }, {
            "./app": 3,
            "./app/constructor": 2,
            "./dom": 12,
            "./module": 46,
            "./server": 64,
            "./server/helpers": 63,
            "./utils": 78,
            "rsvp": 80
        }
    ],
    37: [
        function (require, module, exports) {
            'use strict';

            var Array2D = require('./array2d');

            var random = function random(N, min, max) {
                return Array2D.random(1, N, min, max)[0];
            };

            var randomSorted = function randomSorted(N, min, max) {
                return Array2D.randomSorted(1, N, min, max)[0];
            };

            module.exports = {
                random: random,
                randomSorted: randomSorted
            };

        }, {
            "./array2d": 38
        }
    ],
    38: [
        function (require, module, exports) {
            'use strict';

            var Integer = require('./integer');

            var random = function random(N, M, min, max) {
                if (!N) N = 10;
                if (!M) M = 10;
                if (min === undefined) min = 1;
                if (max === undefined) max = 9;
                var D = [];
                for (var i = 0; i < N; i++) {
                    D.push([]);
                    for (var j = 0; j < M; j++) {
                        D[i].push(Integer.random(min, max));
                    }
                }
                return D;
            };

            var randomSorted = function randomSorted(N, M, min, max) {
                return random(N, M, min, max).map(function (arr) {
                    return arr.sort(function (a, b) {
                        return a - b;
                    });
                });
            };

            module.exports = {
                random: random,
                randomSorted: randomSorted
            };

        }, {
            "./integer": 42
        }
    ],
    39: [
        function (require, module, exports) {
            'use strict';

            var Integer = require('./integer');

            var random = function random(N, min, max) {
                if (!N) N = 7;
                if (!min) min = 1;
                if (!max) max = 10;
                var C = new Array(N);
                for (var i = 0; i < N; i++) {
                    C[i] = new Array(2);
                }
                for (var i = 0; i < N; i++) {
                    for (var j = 0; j < C[i].length; j++) {
                        C[i][j] = Integer.random(min, max);
                    }
                }
                return C;
            };

            module.exports = {
                random: random
            };

        }, {
            "./integer": 42
        }
    ],
    40: [
        function (require, module, exports) {
            'use strict';

            var random = function random(N, ratio) {
                if (!N) N = 5;
                if (!ratio) ratio = .3;
                var G = new Array(N);
                for (var i = 0; i < N; i++) {
                    G[i] = new Array(N);
                    for (var j = 0; j < N; j++) {
                        if (i != j) {
                            G[i][j] = (Math.random() * (1 / ratio) | 0) == 0 ? 1 : 0;
                        }
                    }
                }
                return G;
            };

            module.exports = {
                random: random
            };

        }, {}
    ],
    41: [
        function (require, module, exports) {
            'use strict';

            var Integer = require('./integer');
            var Array1D = require('./array1d');
            var Array2D = require('./array2d');
            var CoordinateSystem = require('./coordinate_system');
            var DirectedGraph = require('./directed_graph');
            var UndirectedGraph = require('./undirected_graph');
            var WeightedDirectedGraph = require('./weighted_directed_graph');
            var WeightedUndirectedGraph = require('./weighted_undirected_graph');

            module.exports = {
                Integer: Integer,
                Array1D: Array1D,
                Array2D: Array2D,
                CoordinateSystem: CoordinateSystem,
                DirectedGraph: DirectedGraph,
                UndirectedGraph: UndirectedGraph,
                WeightedDirectedGraph: WeightedDirectedGraph,
                WeightedUndirectedGraph: WeightedUndirectedGraph
            };

        }, {
            "./array1d": 37,
            "./array2d": 38,
            "./coordinate_system": 39,
            "./directed_graph": 40,
            "./integer": 42,
            "./undirected_graph": 43,
            "./weighted_directed_graph": 44,
            "./weighted_undirected_graph": 45
        }
    ],
    42: [
        function (require, module, exports) {
            'use strict';

            var random = function random(min, max) {
                return (Math.random() * (max - min + 1) | 0) + min;
            };

            module.exports = {
                random: random
            };

        }, {}
    ],
    43: [
        function (require, module, exports) {
            'use strict';

            var random = function random(N, ratio) {
                if (!N) N = 5;
                if (!ratio) ratio = .3;
                var G = new Array(N);
                for (var i = 0; i < N; i++) {
                    G[i] = new Array(N);
                }
                for (var i = 0; i < N; i++) {
                    for (var j = 0; j < N; j++) {
                        if (i > j) {
                            G[i][j] = G[j][i] = (Math.random() * (1 / ratio) | 0) == 0 ? 1 : 0;
                        }
                    }
                }
                return G;
            };

            module.exports = {
                random: random
            };

        }, {}
    ],
    44: [
        function (require, module, exports) {
            'use strict';

            var Integer = require('./integer');

            var random = function random(N, ratio, min, max) {
                if (!N) N = 5;
                if (!ratio) ratio = .3;
                if (!min) min = 1;
                if (!max) max = 5;
                var G = new Array(N);
                for (var i = 0; i < N; i++) {
                    G[i] = new Array(N);
                    for (var j = 0; j < N; j++) {
                        if (i != j && (Math.random() * (1 / ratio) | 0) == 0) {
                            G[i][j] = Integer.random(min, max);
                        }
                    }
                }
                return G;
            };

            module.exports = {
                random: random
            };

        }, {
            "./integer": 42
        }
    ],
    45: [
        function (require, module, exports) {
            'use strict';

            var Integer = require('./integer');

            var random = function random(N, ratio, min, max) {
                if (!N) N = 5;
                if (!ratio) ratio = .3;
                if (!min) min = 1;
                if (!max) max = 5;
                var G = new Array(N);
                for (var i = 0; i < N; i++) {
                    G[i] = new Array(N);
                }
                for (var i = 0; i < N; i++) {
                    for (var j = 0; j < N; j++) {
                        if (i > j && (Math.random() * (1 / ratio) | 0) == 0) {
                            G[i][j] = G[j][i] = Integer.random(min, max);
                        }
                    }
                }
                return G;
            };

            module.exports = {
                random: random
            };

        }, {
            "./integer": 42
        }
    ],
    46: [
        function (require, module, exports) {
            'use strict';

            var tracers = require('./tracer');
            var datas = require('./data');

            var _$ = $,
                extend = _$.extend;


            module.exports = extend(true, {}, tracers, datas);

        }, {
            "./data": 41,
            "./tracer": 53
        }
    ],
    47: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var Array2DTracer = require('./array2d');

            var Array1DTracer = function (_Array2DTracer) {
                _inherits(Array1DTracer, _Array2DTracer);

                _createClass(Array1DTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'Array1DTracer';
                    }
                }]);

                function Array1DTracer(name) {
                    _classCallCheck(this, Array1DTracer);

                    return _possibleConstructorReturn(this, (Array1DTracer.__proto__ || Object.getPrototypeOf(Array1DTracer)).call(this, name));
                }

                _createClass(Array1DTracer, [{
                    key: '_notify',
                    value: function _notify(idx, v) {
                        _get(Array1DTracer.prototype.__proto__ || Object.getPrototypeOf(Array1DTracer.prototype), '_notify', this).call(this, 0, idx, v);
                        return this;
                    }
                }, {
                    key: '_denotify',
                    value: function _denotify(idx) {
                        _get(Array1DTracer.prototype.__proto__ || Object.getPrototypeOf(Array1DTracer.prototype), '_denotify', this).call(this, 0, idx);
                        return this;
                    }
                }, {
                    key: '_select',
                    value: function _select(s, e) {
                        if (e === undefined) {
                            _get(Array1DTracer.prototype.__proto__ || Object.getPrototypeOf(Array1DTracer.prototype), '_select', this).call(this, 0, s);
                        } else {
                            _get(Array1DTracer.prototype.__proto__ || Object.getPrototypeOf(Array1DTracer.prototype), '_selectRow', this).call(this, 0, s, e);
                        }
                        return this;
                    }
                }, {
                    key: '_deselect',
                    value: function _deselect(s, e) {
                        if (e === undefined) {
                            _get(Array1DTracer.prototype.__proto__ || Object.getPrototypeOf(Array1DTracer.prototype), '_deselect', this).call(this, 0, s);
                        } else {
                            _get(Array1DTracer.prototype.__proto__ || Object.getPrototypeOf(Array1DTracer.prototype), '_deselectRow', this).call(this, 0, s, e);
                        }
                        return this;
                    }
                }, {
                    key: 'processStep',
                    value: function processStep(step, options) {
                        _get(Array1DTracer.prototype.__proto__ || Object.getPrototypeOf(Array1DTracer.prototype), 'processStep', this).call(this, step, options);
                        if (this.chartTracer) {
                            var newStep = $.extend(true, {}, step);
                            newStep.capsule = this.chartTracer.capsule;
                            newStep.s = newStep.sy;
                            newStep.e = newStep.ey;
                            if (newStep.s === undefined) newStep.s = newStep.y;
                            delete newStep.x;
                            delete newStep.y;
                            delete newStep.sx;
                            delete newStep.sy;
                            delete newStep.ex;
                            delete newStep.ey;
                            this.chartTracer.processStep(newStep, options);
                        }
                    }
                }, {
                    key: 'setData',
                    value: function setData(D) {
                        return _get(Array1DTracer.prototype.__proto__ || Object.getPrototypeOf(Array1DTracer.prototype), 'setData', this).call(this, [D]);
                    }
                }]);

                return Array1DTracer;
            }(Array2DTracer);

            module.exports = Array1DTracer;

        }, {
            "./array2d": 48
        }
    ],
    48: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var Tracer = require('./tracer');

            var _require = require('../../tracer_manager/util/index'),
                refineByType = _require.refineByType;

            var Array2DTracer = function (_Tracer) {
                _inherits(Array2DTracer, _Tracer);

                _createClass(Array2DTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'Array2DTracer';
                    }
                }]);

                function Array2DTracer(name) {
                    _classCallCheck(this, Array2DTracer);

                    var _this = _possibleConstructorReturn(this, (Array2DTracer.__proto__ || Object.getPrototypeOf(Array2DTracer)).call(this, name));

                    if (_this.isNew) initView(_this);
                    return _this;
                }

                _createClass(Array2DTracer, [{
                    key: '_notify',
                    value: function _notify(x, y, v) {
                        this.manager.pushStep(this.capsule, {
                            type: 'notify',
                            x: x,
                            y: y,
                            v: v
                        });
                        return this;
                    }
                }, {
                    key: '_denotify',
                    value: function _denotify(x, y) {
                        this.manager.pushStep(this.capsule, {
                            type: 'denotify',
                            x: x,
                            y: y
                        });
                        return this;
                    }
                }, {
                    key: '_select',
                    value: function _select(sx, sy, ex, ey) {
                        this.pushSelectingStep('select', null, arguments);
                        return this;
                    }
                }, {
                    key: '_selectRow',
                    value: function _selectRow(x, sy, ey) {
                        this.pushSelectingStep('select', 'row', arguments);
                        return this;
                    }
                }, {
                    key: '_selectCol',
                    value: function _selectCol(y, sx, ex) {
                        this.pushSelectingStep('select', 'col', arguments);
                        return this;
                    }
                }, {
                    key: '_deselect',
                    value: function _deselect(sx, sy, ex, ey) {
                        this.pushSelectingStep('deselect', null, arguments);
                        return this;
                    }
                }, {
                    key: '_deselectRow',
                    value: function _deselectRow(x, sy, ey) {
                        this.pushSelectingStep('deselect', 'row', arguments);
                        return this;
                    }
                }, {
                    key: '_deselectCol',
                    value: function _deselectCol(y, sx, ex) {
                        this.pushSelectingStep('deselect', 'col', arguments);
                        return this;
                    }
                }, {
                    key: '_separate',
                    value: function _separate(x, y) {
                        this.manager.pushStep(this.capsule, {
                            type: 'separate',
                            x: x,
                            y: y
                        });
                        return this;
                    }
                }, {
                    key: '_separateRow',
                    value: function _separateRow(x) {
                        this._separate(x, -1);
                        return this;
                    }
                }, {
                    key: '_separateCol',
                    value: function _separateCol(y) {
                        this._separate(-1, y);
                        return this;
                    }
                }, {
                    key: '_deseparate',
                    value: function _deseparate(x, y) {
                        this.manager.pushStep(this.capsule, {
                            type: 'deseparate',
                            x: x,
                            y: y
                        });
                        return this;
                    }
                }, {
                    key: '_deseparateRow',
                    value: function _deseparateRow(x) {
                        this._deseparate(x, -1);
                        return this;
                    }
                }, {
                    key: '_deseparateCol',
                    value: function _deseparateCol(y) {
                        this._deseparate(-1, y);
                        return this;
                    }
                }, {
                    key: 'pushSelectingStep',
                    value: function pushSelectingStep() {
                        var args = Array.prototype.slice.call(arguments);
                        var type = args.shift();
                        var mode = args.shift();
                        args = Array.prototype.slice.call(args.shift());
                        var coord;
                        switch (mode) {
                        case 'row':
                            coord = {
                                x: args[0],
                                sy: args[1],
                                ey: args[2]
                            };
                            break;
                        case 'col':
                            coord = {
                                y: args[0],
                                sx: args[1],
                                ex: args[2]
                            };
                            break;
                        default:
                            if (args[2] === undefined && args[3] === undefined) {
                                coord = {
                                    x: args[0],
                                    y: args[1]
                                };
                            } else {
                                coord = {
                                    sx: args[0],
                                    sy: args[1],
                                    ex: args[2],
                                    ey: args[3]
                                };
                            }
                        }
                        var step = {
                            type: type
                        };
                        $.extend(step, coord);
                        this.manager.pushStep(this.capsule, step);
                    }
                }, {
                    key: 'processStep',
                    value: function processStep(step, options) {
                        switch (step.type) {
                        case 'notify':
                            if (step.v !== undefined) {
                                var $row = this.$table.find('.mtbl-row').eq(step.x);
                                var $col = $row.find('.mtbl-col').eq(step.y);
                                $col.text(refineByType(step.v));
                            }
                        case 'denotify':
                        case 'select':
                        case 'deselect':
                            var color = step.type == 'select' || step.type == 'deselect' ? this.color.selected : this.color.notified;
                            var paint = step.type == 'select' || step.type == 'notify';
                            var sx = step.sx;
                            var sy = step.sy;
                            var ex = step.ex;
                            var ey = step.ey;
                            if (sx === undefined) sx = step.x;
                            if (sy === undefined) sy = step.y;
                            if (ex === undefined) ex = step.x;
                            if (ey === undefined) ey = step.y;
                            this.paintColor(sx, sy, ex, ey, color, paint);
                            break;
                        case 'separate':
                            this.deseparate(step.x, step.y);
                            this.separate(step.x, step.y);
                            break;
                        case 'deseparate':
                            this.deseparate(step.x, step.y);
                            break;
                        default:
                            _get(Array2DTracer.prototype.__proto__ || Object.getPrototypeOf(Array2DTracer.prototype), 'processStep', this).call(this, step, options);
                        }
                    }
                }, {
                    key: 'setData',
                    value: function setData(D) {
                        this.viewX = this.viewY = 0;
                        this.paddingH = 6;
                        this.paddingV = 3;
                        this.fontSize = 16;

                        if (_get(Array2DTracer.prototype.__proto__ || Object.getPrototypeOf(Array2DTracer.prototype), 'setData', this).apply(this, arguments)) {
                            this.$table.find('.mtbl-row').each(function (i) {
                                $(this).find('.mtbl-col').each(function (j) {
                                    $(this).text(refineByType(D[i][j]));
                                });
                            });
                            return true;
                        }

                        this.$table.empty();
                        for (var i = 0; i < D.length; i++) {
                            var $row = $('<div class="mtbl-row">');
                            this.$table.append($row);
                            for (var j = 0; j < D[i].length; j++) {
                                var $col = $('<div class="mtbl-col">').css(this.getCellCss()).text(refineByType(D[i][j]));
                                $row.append($col);
                            }
                        }
                        this.resize();

                        return false;
                    }
                }, {
                    key: 'resize',
                    value: function resize() {
                        _get(Array2DTracer.prototype.__proto__ || Object.getPrototypeOf(Array2DTracer.prototype), 'resize', this).call(this);

                        this.refresh();
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        _get(Array2DTracer.prototype.__proto__ || Object.getPrototypeOf(Array2DTracer.prototype), 'clear', this).call(this);

                        this.clearColor();
                        this.deseparateAll();
                    }
                }, {
                    key: 'getCellCss',
                    value: function getCellCss() {
                        return {
                            padding: this.paddingV.toFixed(1) + 'px ' + this.paddingH.toFixed(1) + 'px',
                            'font-size': this.fontSize.toFixed(1) + 'px'
                        };
                    }
                }, {
                    key: 'refresh',
                    value: function refresh() {
                        _get(Array2DTracer.prototype.__proto__ || Object.getPrototypeOf(Array2DTracer.prototype), 'refresh', this).call(this);

                        var $parent = this.$table.parent();
                        var top = $parent.height() / 2 - this.$table.height() / 2 + this.viewY;
                        var left = $parent.width() / 2 - this.$table.width() / 2 + this.viewX;
                        this.$table.css('margin-top', top);
                        this.$table.css('margin-left', left);
                    }
                }, {
                    key: 'mousedown',
                    value: function mousedown(e) {
                        _get(Array2DTracer.prototype.__proto__ || Object.getPrototypeOf(Array2DTracer.prototype), 'mousedown', this).call(this, e);

                        this.dragX = e.pageX;
                        this.dragY = e.pageY;
                        this.dragging = true;
                    }
                }, {
                    key: 'mousemove',
                    value: function mousemove(e) {
                        _get(Array2DTracer.prototype.__proto__ || Object.getPrototypeOf(Array2DTracer.prototype), 'mousemove', this).call(this, e);

                        if (this.dragging) {
                            this.viewX += e.pageX - this.dragX;
                            this.viewY += e.pageY - this.dragY;
                            this.dragX = e.pageX;
                            this.dragY = e.pageY;
                            this.refresh();
                        }
                    }
                }, {
                    key: 'mouseup',
                    value: function mouseup(e) {
                        _get(Array2DTracer.prototype.__proto__ || Object.getPrototypeOf(Array2DTracer.prototype), 'mouseup', this).call(this, e);

                        this.dragging = false;
                    }
                }, {
                    key: 'mousewheel',
                    value: function mousewheel(e) {
                        _get(Array2DTracer.prototype.__proto__ || Object.getPrototypeOf(Array2DTracer.prototype), 'mousewheel', this).call(this, e);

                        e.preventDefault();
                        e = e.originalEvent;
                        var delta = e.wheelDelta !== undefined && e.wheelDelta || e.detail !== undefined && -e.detail;
                        var weight = 1.01;
                        var ratio = delta > 0 ? 1 / weight : weight;
                        if (this.fontSize < 4 && ratio < 1) return;
                        if (this.fontSize > 40 && ratio > 1) return;
                        this.paddingV *= ratio;
                        this.paddingH *= ratio;
                        this.fontSize *= ratio;
                        this.$table.find('.mtbl-col').css(this.getCellCss());
                        this.refresh();
                    }
                }, {
                    key: 'paintColor',
                    value: function paintColor(sx, sy, ex, ey, color, paint) {
                        for (var i = sx; i <= ex; i++) {
                            var $row = this.$table.find('.mtbl-row').eq(i);
                            for (var j = sy; j <= ey; j++) {
                                var $col = $row.find('.mtbl-col').eq(j);
                                if (paint) $col.css('background', color);
                                else $col.css('background', '');
                            }
                        }
                    }
                }, {
                    key: 'clearColor',
                    value: function clearColor() {
                        this.$table.find('.mtbl-col').css('background', '');
                    }
                }, {
                    key: 'separate',
                    value: function separate(x, y) {
                        this.$table.find('.mtbl-row').each(function (i) {
                            var $row = $(this);
                            if (i == x) {
                                $row.after($('<div class="mtbl-empty-row">').attr('data-row', i));
                            }
                            $row.find('.mtbl-col').each(function (j) {
                                var $col = $(this);
                                if (j == y) {
                                    $col.after($('<div class="mtbl-empty-col">').attr('data-col', j));
                                }
                            });
                        });
                    }
                }, {
                    key: 'deseparate',
                    value: function deseparate(x, y) {
                        this.$table.find('[data-row=' + x + ']').remove();
                        this.$table.find('[data-col=' + y + ']').remove();
                    }
                }, {
                    key: 'deseparateAll',
                    value: function deseparateAll() {
                        this.$table.find('.mtbl-empty-row, .mtbl-empty-col').remove();
                    }
                }]);

                return Array2DTracer;
            }(Tracer);

            var initView = function initView(tracer) {
                tracer.$table = tracer.capsule.$table = $('<div class="mtbl-table">');
                tracer.$container.append(tracer.$table);
            };

            module.exports = Array2DTracer;

        }, {
            "../../tracer_manager/util/index": 75,
            "./tracer": 55
        }
    ],
    49: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var Tracer = require('./tracer');

            var ChartTracer = function (_Tracer) {
                _inherits(ChartTracer, _Tracer);

                _createClass(ChartTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'ChartTracer';
                    }
                }]);

                function ChartTracer(name) {
                    _classCallCheck(this, ChartTracer);

                    var _this = _possibleConstructorReturn(this, (ChartTracer.__proto__ || Object.getPrototypeOf(ChartTracer)).call(this, name));

                    if (_this.isNew) initView(_this);
                    return _this;
                }

                _createClass(ChartTracer, [{
                    key: 'setData',
                    value: function setData(C) {
                        if (_get(ChartTracer.prototype.__proto__ || Object.getPrototypeOf(ChartTracer.prototype), 'setData', this).apply(this, arguments)) {
                            this.chart.config.data.datasets[0].data = C;
                            this.chart.update();
                            return true;
                        }

                        var color = [];
                        for (var i = 0; i < C.length; i++) {
                            color.push(this.color.default);
                        }
                        this.chart.config.data = {
                            labels: C.map(String),
                            datasets: [{
                                backgroundColor: color,
                                data: C
                            }]
                        };
                        this.chart.update();
                    }
                }, {
                    key: '_notify',
                    value: function _notify(s, v) {
                        this.manager.pushStep(this.capsule, {
                            type: 'notify',
                            s: s,
                            v: v
                        });
                        return this;
                    }
                }, {
                    key: '_denotify',
                    value: function _denotify(s) {
                        this.manager.pushStep(this.capsule, {
                            type: 'denotify',
                            s: s
                        });
                        return this;
                    }
                }, {
                    key: '_select',
                    value: function _select(s, e) {
                        this.manager.pushStep(this.capsule, {
                            type: 'select',
                            s: s,
                            e: e
                        });
                        return this;
                    }
                }, {
                    key: '_deselect',
                    value: function _deselect(s, e) {
                        this.manager.pushStep(this.capsule, {
                            type: 'deselect',
                            s: s,
                            e: e
                        });
                        return this;
                    }
                }, {
                    key: 'processStep',
                    value: function processStep(step, options) {
                        switch (step.type) {
                        case 'notify':
                            if (step.v !== undefined) {
                                this.chart.config.data.datasets[0].data[step.s] = step.v;
                                this.chart.config.data.labels[step.s] = step.v.toString();
                            }
                        case 'denotify':
                        case 'select':
                        case 'deselect':
                            var color = step.type == 'notify' ? this.color.notified : step.type == 'select' ? this.color.selected : this.color.default;
                            if (step.e !== undefined)
                                for (var i = step.s; i <= step.e; i++) {
                                    this.chart.config.data.datasets[0].backgroundColor[i] = color;
                                } else this.chart.config.data.datasets[0].backgroundColor[step.s] = color;
                            this.chart.update();
                            break;
                        default:
                            _get(ChartTracer.prototype.__proto__ || Object.getPrototypeOf(ChartTracer.prototype), 'processStep', this).call(this, step, options);
                        }
                    }
                }, {
                    key: 'resize',
                    value: function resize() {
                        _get(ChartTracer.prototype.__proto__ || Object.getPrototypeOf(ChartTracer.prototype), 'resize', this).call(this);

                        this.chart.resize();
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        _get(ChartTracer.prototype.__proto__ || Object.getPrototypeOf(ChartTracer.prototype), 'clear', this).call(this);

                        var data = this.chart.config.data;
                        if (data.datasets.length) {
                            var backgroundColor = data.datasets[0].backgroundColor;
                            for (var i = 0; i < backgroundColor.length; i++) {
                                backgroundColor[i] = this.color.default;
                            }
                            this.chart.update();
                        }
                    }
                }]);

                return ChartTracer;
            }(Tracer);

            var initView = function initView(tracer) {
                tracer.$wrapper = tracer.capsule.$wrapper = $('<canvas class="mchrt-chart">');
                tracer.$container.append(tracer.$wrapper);
                tracer.chart = tracer.capsule.chart = new Chart(tracer.$wrapper, {
                    type: 'bar',
                    data: {
                        labels: [],
                        datasets: []
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        animation: false,
                        legend: false,
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            };

            module.exports = ChartTracer;

        }, {
            "./tracer": 55
        }
    ],
    50: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var DirectedGraphTracer = require('./directed_graph');

            var CoordinateSystemTracer = function (_DirectedGraphTracer) {
                _inherits(CoordinateSystemTracer, _DirectedGraphTracer);

                _createClass(CoordinateSystemTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'CoordinateSystemTracer';
                    }
                }]);

                function CoordinateSystemTracer(name) {
                    _classCallCheck(this, CoordinateSystemTracer);

                    var _this = _possibleConstructorReturn(this, (CoordinateSystemTracer.__proto__ || Object.getPrototypeOf(CoordinateSystemTracer)).call(this, name));

                    if (_this.isNew) initView(_this);
                    return _this;
                }

                _createClass(CoordinateSystemTracer, [{
                    key: 'setData',
                    value: function setData(C) {
                        if (Tracer.prototype.setData.apply(this, arguments)) return true;

                        this.graph.clear();
                        var nodes = [];
                        var edges = [];
                        for (var i = 0; i < C.length; i++) {
                            nodes.push({
                                id: this.n(i),
                                x: C[i][0],
                                y: C[i][1],
                                label: '' + i,
                                size: 1
                            });
                        }
                        this.graph.read({
                            nodes: nodes,
                            edges: edges
                        });
                        this.s.camera.goTo({
                            x: 0,
                            y: 0,
                            angle: 0,
                            ratio: 1
                        });
                        this.refresh();

                        return false;
                    }
                }, {
                    key: 'processStep',
                    value: function processStep(step, options) {
                        switch (step.type) {
                        case 'visit':
                        case 'leave':
                            var visit = step.type == 'visit';
                            var targetNode = this.graph.nodes(this.n(step.target));
                            var color = visit ? this.color.visited : this.color.left;
                            targetNode.color = color;
                            if (step.source !== undefined) {
                                var edgeId = this.e(step.source, step.target);
                                if (this.graph.edges(edgeId)) {
                                    var edge = this.graph.edges(edgeId);
                                    edge.color = color;
                                    this.graph.dropEdge(edgeId).addEdge(edge);
                                } else {
                                    this.graph.addEdge({
                                        id: this.e(step.target, step.source),
                                        source: this.n(step.source),
                                        target: this.n(step.target),
                                        size: 1
                                    });
                                }
                            }
                            if (this.logTracer) {
                                var source = step.source;
                                if (source === undefined) source = '';
                                this.logTracer.print(visit ? source + ' -> ' + step.target : source + ' <- ' + step.target);
                            }
                            break;
                        default:
                            _get(CoordinateSystemTracer.prototype.__proto__ || Object.getPrototypeOf(CoordinateSystemTracer.prototype), 'processStep', this).call(this, step, options);
                        }
                    }
                }, {
                    key: 'e',
                    value: function e(v1, v2) {
                        if (v1 > v2) {
                            var temp = v1;
                            v1 = v2;
                            v2 = temp;
                        }
                        return 'e' + v1 + '_' + v2;
                    }
                }, {
                    key: 'drawOnHover',
                    value: function drawOnHover(node, context, settings, next) {
                        var tracer = this;

                        context.setLineDash([5, 5]);
                        var nodeIdx = node.id.substring(1);
                        this.graph.edges().forEach(function (edge) {
                            var ends = edge.id.substring(1).split("_");
                            if (ends[0] == nodeIdx) {
                                var color = '#0ff';
                                var source = node;
                                var target = tracer.graph.nodes('n' + ends[1]);
                                tracer.drawEdge(edge, source, target, color, context, settings);
                                if (next) next(edge, source, target, color, context, settings);
                            } else if (ends[1] == nodeIdx) {
                                var color = '#0ff';
                                var source = tracer.graph.nodes('n' + ends[0]);
                                var target = node;
                                tracer.drawEdge(edge, source, target, color, context, settings);
                                if (next) next(edge, source, target, color, context, settings);
                            }
                        });
                    }
                }, {
                    key: 'drawEdge',
                    value: function drawEdge(edge, source, target, color, context, settings) {
                        var prefix = settings('prefix') || '',
                            size = edge[prefix + 'size'] || 1;

                        context.strokeStyle = color;
                        context.lineWidth = size;
                        context.beginPath();
                        context.moveTo(source[prefix + 'x'], source[prefix + 'y']);
                        context.lineTo(target[prefix + 'x'], target[prefix + 'y']);
                        context.stroke();
                    }
                }]);

                return CoordinateSystemTracer;
            }(DirectedGraphTracer);

            var initView = function initView(tracer) {
                tracer.s.settings({
                    defaultEdgeType: 'def',
                    funcEdgesDef: function funcEdgesDef(edge, source, target, context, settings) {
                        var color = tracer.getColor(edge, source, target, settings);
                        tracer.drawEdge(edge, source, target, color, context, settings);
                    }
                });
            };

            module.exports = CoordinateSystemTracer;

        }, {
            "./directed_graph": 51
        }
    ],
    51: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var Tracer = require('./tracer');

            var _require = require('../../tracer_manager/util/index'),
                refineByType = _require.refineByType;

            var DirectedGraphTracer = function (_Tracer) {
                _inherits(DirectedGraphTracer, _Tracer);

                _createClass(DirectedGraphTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'DirectedGraphTracer';
                    }
                }]);

                function DirectedGraphTracer(name) {
                    _classCallCheck(this, DirectedGraphTracer);

                    var _this = _possibleConstructorReturn(this, (DirectedGraphTracer.__proto__ || Object.getPrototypeOf(DirectedGraphTracer)).call(this, name));

                    if (_this.isNew) initView(_this);
                    return _this;
                }

                _createClass(DirectedGraphTracer, [{
                    key: '_setTreeData',
                    value: function _setTreeData(G, root) {
                        this.manager.pushStep(this.capsule, {
                            type: 'setTreeData',
                            arguments: arguments
                        });
                        return this;
                    }
                }, {
                    key: '_visit',
                    value: function _visit(target, source) {
                        this.manager.pushStep(this.capsule, {
                            type: 'visit',
                            target: target,
                            source: source
                        });
                        return this;
                    }
                }, {
                    key: '_leave',
                    value: function _leave(target, source) {
                        this.manager.pushStep(this.capsule, {
                            type: 'leave',
                            target: target,
                            source: source
                        });
                        return this;
                    }
                }, {
                    key: '_setNodePositions',
                    value: function _setNodePositions(positions) {
                        this.manager.pushStep(this.capsule, {
                            type: 'setNodePositions',
                            positions: positions
                        });
                        return this;
                    }
                }, {
                    key: 'processStep',
                    value: function processStep(step, options) {
                        switch (step.type) {
                        case 'setTreeData':
                            this.setTreeData.apply(this, step.arguments);
                            break;
                        case 'setNodePositions':
                            $.each(this.graph.nodes(), function (i, node) {
                                if (i >= step.positions.length) return false;
                                var position = step.positions[i];
                                node.x = position.x;
                                node.y = position.y;
                            });
                            break;
                        case 'visit':
                        case 'leave':
                            var visit = step.type == 'visit';
                            var targetNode = this.graph.nodes(this.n(step.target));
                            var color = visit ? this.color.visited : this.color.left;
                            targetNode.color = color;
                            if (step.source !== undefined) {
                                var edgeId = this.e(step.source, step.target);
                                var edge = this.graph.edges(edgeId);
                                edge.color = color;
                                this.graph.dropEdge(edgeId).addEdge(edge);
                            }
                            if (this.logTracer) {
                                var source = step.source;
                                if (source === undefined) source = '';
                                this.logTracer.print(visit ? source + ' -> ' + step.target : source + ' <- ' + step.target);
                            }
                            break;
                        default:
                            _get(DirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(DirectedGraphTracer.prototype), 'processStep', this).call(this, step, options);
                        }
                    }
                }, {
                    key: 'setTreeData',
                    value: function setTreeData(G, root, undirected) {
                        var tracer = this;

                        root = root || 0;
                        var maxDepth = -1;

                        var chk = new Array(G.length);
                        var getDepth = function getDepth(node, depth) {
                            if (chk[node]) throw "the given graph is not a tree because it forms a circuit";
                            chk[node] = true;
                            if (maxDepth < depth) maxDepth = depth;
                            for (var i = 0; i < G[node].length; i++) {
                                if (G[node][i]) getDepth(i, depth + 1);
                            }
                        };
                        getDepth(root, 1);

                        if (this.setData(G, undirected)) return true;

                        var place = function place(node, x, y) {
                            var temp = tracer.graph.nodes(tracer.n(node));
                            temp.x = x;
                            temp.y = y;
                        };

                        var wgap = 1 / (maxDepth - 1);
                        var dfs = function dfs(node, depth, top, bottom) {
                            place(node, top + bottom, depth * wgap);
                            var children = 0;
                            for (var i = 0; i < G[node].length; i++) {
                                if (G[node][i]) children++;
                            }
                            var vgap = (bottom - top) / children;
                            var cnt = 0;
                            for (var i = 0; i < G[node].length; i++) {
                                if (G[node][i]) dfs(i, depth + 1, top + vgap * cnt, top + vgap * ++cnt);
                            }
                        };
                        dfs(root, 0, 0, 1);

                        this.refresh();
                    }
                }, {
                    key: 'setData',
                    value: function setData(G, undirected) {
                        if (_get(DirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(DirectedGraphTracer.prototype), 'setData', this).apply(this, arguments)) return true;
                        this.graph.clear();
                        var nodes = [];
                        var edges = [];
                        var unitAngle = 2 * Math.PI / G.length;
                        var currentAngle = 0;
                        for (var i = 0; i < G.length; i++) {
                            currentAngle += unitAngle;
                            nodes.push({
                                id: this.n(i),
                                label: '' + i,
                                x: .5 + Math.sin(currentAngle) / 2,
                                y: .5 + Math.cos(currentAngle) / 2,
                                size: 1,
                                color: this.color.default,
                                weight: 0
                            });

                            if (undirected) {
                                for (var j = 0; j <= i; j++) {
                                    var value = G[i][j] || G[j][i];
                                    if (value) {
                                        edges.push({
                                            id: this.e(i, j),
                                            source: this.n(i),
                                            target: this.n(j),
                                            color: this.color.default,
                                            size: 1,
                                            weight: refineByType(value)
                                        });
                                    }
                                }
                            } else {
                                for (var _j = 0; _j < G[i].length; _j++) {
                                    if (G[i][_j]) {
                                        edges.push({
                                            id: this.e(i, _j),
                                            source: this.n(i),
                                            target: this.n(_j),
                                            color: this.color.default,
                                            size: 1,
                                            weight: refineByType(G[i][_j])
                                        });
                                    }
                                }
                            }
                        }

                        this.graph.read({
                            nodes: nodes,
                            edges: edges
                        });
                        this.s.camera.goTo({
                            x: 0,
                            y: 0,
                            angle: 0,
                            ratio: 1
                        });
                        this.refresh();

                        return false;
                    }
                }, {
                    key: 'resize',
                    value: function resize() {
                        _get(DirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(DirectedGraphTracer.prototype), 'resize', this).call(this);

                        this.s.renderers[0].resize();
                        this.refresh();
                    }
                }, {
                    key: 'refresh',
                    value: function refresh() {
                        _get(DirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(DirectedGraphTracer.prototype), 'refresh', this).call(this);

                        this.s.refresh();
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        _get(DirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(DirectedGraphTracer.prototype), 'clear', this).call(this);

                        this.clearGraphColor();
                        this.refresh();
                    }
                }, {
                    key: 'clearGraphColor',
                    value: function clearGraphColor() {
                        var tracer = this;

                        this.graph.nodes().forEach(function (node) {
                            node.color = tracer.color.default;
                        });
                        this.graph.edges().forEach(function (edge) {
                            edge.color = tracer.color.default;
                        });
                    }
                }, {
                    key: 'n',
                    value: function n(v) {
                        return 'n' + v;
                    }
                }, {
                    key: 'e',
                    value: function e(v1, v2) {
                        return 'e' + v1 + '_' + v2;
                    }
                }, {
                    key: 'getColor',
                    value: function getColor(edge, source, target, settings) {
                        var color = edge.color,
                            edgeColor = settings('edgeColor'),
                            defaultNodeColor = settings('defaultNodeColor'),
                            defaultEdgeColor = settings('defaultEdgeColor');
                        if (!color) switch (edgeColor) {
                        case 'source':
                            color = source.color || defaultNodeColor;
                            break;
                        case 'target':
                            color = target.color || defaultNodeColor;
                            break;
                        default:
                            color = defaultEdgeColor;
                            break;
                        }

                        return color;
                    }
                }, {
                    key: 'drawLabel',
                    value: function drawLabel(node, context, settings) {
                        var fontSize,
                            prefix = settings('prefix') || '',
                            size = node[prefix + 'size'];

                        if (size < settings('labelThreshold')) return;

                        if (!node.label || typeof node.label !== 'string') return;

                        fontSize = settings('labelSize') === 'fixed' ? settings('defaultLabelSize') : settings('labelSizeRatio') * size;

                        context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') + fontSize + 'px ' + settings('font');
                        context.fillStyle = settings('labelColor') === 'node' ? node.color || settings('defaultNodeColor') : settings('defaultLabelColor');

                        context.textAlign = 'center';
                        context.fillText(node.label, Math.round(node[prefix + 'x']), Math.round(node[prefix + 'y'] + fontSize / 3));
                    }
                }, {
                    key: 'drawArrow',
                    value: function drawArrow(edge, source, target, color, context, settings) {
                        var prefix = settings('prefix') || '',
                            size = edge[prefix + 'size'] || 1,
                            tSize = target[prefix + 'size'],
                            sX = source[prefix + 'x'],
                            sY = source[prefix + 'y'],
                            tX = target[prefix + 'x'],
                            tY = target[prefix + 'y'],
                            angle = Math.atan2(tY - sY, tX - sX),
                            dist = 3;
                        sX += Math.sin(angle) * dist;
                        tX += Math.sin(angle) * dist;
                        sY += -Math.cos(angle) * dist;
                        tY += -Math.cos(angle) * dist;
                        var aSize = Math.max(size * 2.5, settings('minArrowSize')),
                            d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
                            aX = sX + (tX - sX) * (d - aSize - tSize) / d,
                            aY = sY + (tY - sY) * (d - aSize - tSize) / d,
                            vX = (tX - sX) * aSize / d,
                            vY = (tY - sY) * aSize / d;

                        context.strokeStyle = color;
                        context.lineWidth = size;
                        context.beginPath();
                        context.moveTo(sX, sY);
                        context.lineTo(aX, aY);
                        context.stroke();

                        context.fillStyle = color;
                        context.beginPath();
                        context.moveTo(aX + vX, aY + vY);
                        context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
                        context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
                        context.lineTo(aX + vX, aY + vY);
                        context.closePath();
                        context.fill();
                    }
                }, {
                    key: 'drawOnHover',
                    value: function drawOnHover(node, context, settings, next) {
                        var tracer = this;

                        context.setLineDash([5, 5]);
                        var nodeIdx = node.id.substring(1);
                        this.graph.edges().forEach(function (edge) {
                            var ends = edge.id.substring(1).split("_");
                            if (ends[0] == nodeIdx) {
                                var color = '#0ff';
                                var source = node;
                                var target = tracer.graph.nodes('n' + ends[1]);
                                tracer.drawArrow(edge, source, target, color, context, settings);
                                if (next) next(edge, source, target, color, context, settings);
                            } else if (ends[1] == nodeIdx) {
                                var color = '#ff0';
                                var source = tracer.graph.nodes('n' + ends[0]);
                                var target = node;
                                tracer.drawArrow(edge, source, target, color, context, settings);
                                if (next) next(edge, source, target, color, context, settings);
                            }
                        });
                    }
                }]);

                return DirectedGraphTracer;
            }(Tracer);

            var initView = function initView(tracer) {
                tracer.s = tracer.capsule.s = new sigma({
                    renderer: {
                        container: tracer.$container[0],
                        type: 'canvas'
                    },
                    settings: {
                        minArrowSize: 8,
                        defaultEdgeType: 'arrow',
                        maxEdgeSize: 2.5,
                        labelThreshold: 4,
                        font: 'Roboto',
                        defaultLabelColor: '#fff',
                        zoomMin: 0.6,
                        zoomMax: 1.2,
                        skipErrors: true,
                        minNodeSize: .5,
                        maxNodeSize: 12,
                        labelSize: 'proportional',
                        labelSizeRatio: 1.3,
                        funcLabelsDef: function funcLabelsDef(node, context, settings) {
                                tracer.drawLabel(node, context, settings);
                            },
                            funcHoversDef: function funcHoversDef(node, context, settings, next) {
                                tracer.drawOnHover(node, context, settings, next);
                            },
                            funcEdgesArrow: function funcEdgesArrow(edge, source, target, context, settings) {
                                var color = tracer.getColor(edge, source, target, settings);
                                tracer.drawArrow(edge, source, target, color, context, settings);
                            }
                    }
                });
                sigma.plugins.dragNodes(tracer.s, tracer.s.renderers[0]);
                tracer.graph = tracer.capsule.graph = tracer.s.graph;
            };

            sigma.canvas.labels.def = function (node, context, settings) {
                var func = settings('funcLabelsDef');
                if (func) {
                    func(node, context, settings);
                }
            };
            sigma.canvas.hovers.def = function (node, context, settings) {
                var func = settings('funcHoversDef');
                if (func) {
                    func(node, context, settings);
                }
            };
            sigma.canvas.edges.def = function (edge, source, target, context, settings) {
                var func = settings('funcEdgesDef');
                if (func) {
                    func(edge, source, target, context, settings);
                }
            };
            sigma.canvas.edges.arrow = function (edge, source, target, context, settings) {
                var func = settings('funcEdgesArrow');
                if (func) {
                    func(edge, source, target, context, settings);
                }
            };

            module.exports = DirectedGraphTracer;

        }, {
            "../../tracer_manager/util/index": 75,
            "./tracer": 55
        }
    ],
    52: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var Tracer = require('./tracer');

            var _require = require('../../tracer_manager/util/index'),
                refineByType = _require.refineByType;

            var DirectedGraphConstructTracer = function (_Tracer) {
                _inherits(DirectedGraphConstructTracer, _Tracer);

                _createClass(DirectedGraphConstructTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'DirectedGraphConstructTracer';
                    }
                }]);

                function DirectedGraphConstructTracer(name) {
                    var nodePlacement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                    _classCallCheck(this, DirectedGraphConstructTracer);

                    var _this = _possibleConstructorReturn(this, (DirectedGraphConstructTracer.__proto__ || Object.getPrototypeOf(DirectedGraphConstructTracer)).call(this, name));

                    _this.nodePlacement = nodePlacement;
                    _this.nodeCollection = [];
                    if (_this.isNew) initView(_this);
                    return _this;
                }

                _createClass(DirectedGraphConstructTracer, [{
                    key: '_addRoot',
                    value: function _addRoot(root) {
                        this.manager.pushStep(this.capsule, {
                            type: 'addRoot',
                            arguments: arguments
                        });
                        return this;
                    }
                }, {
                    key: '_addNode',
                    value: function _addNode(element) {
                        var parentElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                        this.manager.pushStep(this.capsule, {
                            type: 'addNode',
                            arguments: arguments
                        });
                        return this;
                    }
                }, {
                    key: '_findNode',
                    value: function _findNode(val) {
                        var idToFind = this.n(val);
                        var G = this.nodeCollection;
                        var result = null;
                        for (var i = 0; i < G.length; i++) {
                            if (G[i].id === idToFind) {
                                result = G[i];
                                break;
                            }
                        }
                        return result;
                    }
                }, {
                    key: '_visit',
                    value: function _visit(target, source) {
                        this.manager.pushStep(this.capsule, {
                            type: 'visit',
                            target: target,
                            source: source
                        });
                        return this;
                    }
                }, {
                    key: '_leave',
                    value: function _leave(target, source) {
                        this.manager.pushStep(this.capsule, {
                            type: 'leave',
                            target: target,
                            source: source
                        });
                        return this;
                    }
                }, {
                    key: '_setNodePositions',
                    value: function _setNodePositions(positions) {
                        this.manager.pushStep(this.capsule, {
                            type: 'setNodePositions',
                            positions: positions
                        });
                        return this;
                    }
                }, {
                    key: '_clearTraversal',
                    value: function _clearTraversal() {
                        this.manager.pushStep(this.capsule, {
                            type: 'clear'
                        });
                        return this;
                    }
                }, {
                    key: 'processStep',
                    value: function processStep(step, options) {
                        switch (step.type) {
                        case 'clear':
                            this.clear.apply(this);
                            break;
                        case 'setNodePositions':
                            $.each(this.graph.nodes(), function (i, node) {
                                if (i >= step.positions.length) return false;
                                var position = step.positions[i];
                                node.x = position.x;
                                node.y = position.y;
                            });
                            break;
                        case 'addRoot':
                            this.addRoot.apply(this, step.arguments);
                            break;
                        case 'addNode':
                            this.addNode.apply(this, step.arguments);
                            break;
                        case 'visit':
                        case 'leave':
                            var visit = step.type == 'visit';
                            var nodeObject = this._findNode(step.target);
                            nodeObject.visited = visit;
                            nodeObject.isNew = false;
                            var targetNode = this.graph.nodes(this.n(step.target));
                            var color = visit ? this.color.visited : this.color.left;
                            if (targetNode) {
                                targetNode.color = color;
                                if (step.source !== undefined) {
                                    var edgeId = this.e(step.source, step.target);
                                    var edge = this.graph.edges(edgeId);
                                    edge.color = color;
                                    this.graph.dropEdge(edgeId).addEdge(edge);
                                }
                            }
                            if (this.logTracer) {
                                var source = step.source;
                                if (source === undefined) source = '';
                                this.logTracer.print(visit ? source + ' -> ' + step.target : source + ' <- ' + step.target);
                            }
                            break;
                        default:
                            _get(DirectedGraphConstructTracer.prototype.__proto__ || Object.getPrototypeOf(DirectedGraphConstructTracer.prototype), 'processStep', this).call(this, step, options);
                        }
                    }
                }, {
                    key: 'addRoot',
                    value: function addRoot(root) {
                        if (this.rootObject) throw 'Root for this graph is already added';
                        this.rootObject = this.createGraphNode(root);
                        this.drawGraph(this.rootObject.level);
                    }
                }, {
                    key: 'addNode',
                    value: function addNode(node, parent) {
                        var nodeObject = this.createGraphNode(node, parent);
                        this.drawGraph(nodeObject.level);
                    }
                }, {
                    key: 'createGraphNode',
                    value: function createGraphNode(node, parent) {
                        var nodeObject = this.nodeConstruct(node);
                        var parentObject = this._findNode(parent);
                        if (parentObject) {
                            nodeObject.parent = parentObject;
                            nodeObject.level = parentObject.level + 1;
                            if (this.nodePlacement === null) {
                                parentObject.children.push(nodeObject);
                            } else if (this.nodePlacement === 0) {
                                var isSpliced = false;
                                var insertIndex = 0;
                                if (parentObject.children.length > 0) {
                                    for (var i = 0; i < parentObject.children.length; i++) {
                                        var child = parentObject.children[i];
                                        if (child.originalVal > node) {
                                            isSpliced = true;
                                            break;
                                        }
                                        insertIndex++;
                                    }
                                }
                                if (isSpliced) {
                                    parentObject.children.splice(insertIndex, 0, nodeObject);
                                } else {
                                    parentObject.children.push(nodeObject);
                                }
                            }
                        }
                        this.nodeCollection.push(nodeObject);
                        return nodeObject;
                    }
                }, {
                    key: 'nodeConstruct',
                    value: function nodeConstruct(val) {
                        var nodeObject = {
                            id: this.n(val),
                            originalVal: val,
                            isNew: true,
                            visited: false,
                            children: [],
                            level: 1,
                            parent: null
                        };
                        return nodeObject;
                    }
                }, {
                    key: 'drawGraph',
                    value: function drawGraph(nodeLevel) {
                        var nodes = [];
                        var edges = [];
                        var tracer = this;

                        var arrangeChildNodes = function arrangeChildNodes(node, offsetWidth) {
                            if (node.children.length > 1) {
                                var midPoint = Math.floor(node.children.length / 2);
                                for (var i = 0; i < node.children.length; i++) {
                                    if (i === midPoint) {
                                        offsetWidth += node.children.length % 2 === 0 ? 1 : 0;
                                        addGraphNode(node, offsetWidth);
                                    }
                                    offsetWidth = arrangeChildNodes(node.children[i], offsetWidth);
                                    addEdge(node, node.children[i]);
                                }
                            } else {
                                if (node.children.length === 0) {
                                    offsetWidth += 1;
                                } else {
                                    offsetWidth = arrangeChildNodes(node.children[0], offsetWidth);
                                    addEdge(node, node.children[0]);
                                }
                                addGraphNode(node, offsetWidth);
                            }
                            return offsetWidth;
                        };

                        var addGraphNode = function addGraphNode(node, calculatedX) {
                            var color = getColor(node.isNew, node.visited, tracer.color);
                            nodes.push({
                                id: node.id,
                                label: '' + node.originalVal,
                                x: calculatedX,
                                y: node.level - 1,
                                size: 1,
                                color: color,
                                weight: 0
                            });
                        };

                        var addEdge = function addEdge(node, childNode) {
                            var color = getColor(node.visited && childNode.isNew, node.visited && childNode.visited, tracer.color);
                            edges.push({
                                id: tracer.e(node.originalVal, childNode.originalVal),
                                source: node.id,
                                target: childNode.id,
                                color: color,
                                size: 1,
                                weight: refineByType(childNode.originalVal)
                            });
                        };

                        var getColor = function getColor(isNew, isVisited, colorPalete) {
                            return isNew ? colorPalete.selected : isVisited ? colorPalete.visited : colorPalete.default;
                        };
                        arrangeChildNodes(this.rootObject, 0);

                        this.graph.clear();
                        this.graph.read({
                            nodes: nodes,
                            edges: edges
                        });
                        this.s.camera.goTo({
                            x: 0,
                            y: nodeLevel,
                            angle: 0,
                            ratio: 1
                        });
                        this.refresh();

                        return false;
                    }
                }, {
                    key: 'resize',
                    value: function resize() {
                        _get(DirectedGraphConstructTracer.prototype.__proto__ || Object.getPrototypeOf(DirectedGraphConstructTracer.prototype), 'resize', this).call(this);

                        this.s.renderers[0].resize();
                        this.refresh();
                    }
                }, {
                    key: 'refresh',
                    value: function refresh() {
                        _get(DirectedGraphConstructTracer.prototype.__proto__ || Object.getPrototypeOf(DirectedGraphConstructTracer.prototype), 'refresh', this).call(this);

                        this.s.refresh();
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        _get(DirectedGraphConstructTracer.prototype.__proto__ || Object.getPrototypeOf(DirectedGraphConstructTracer.prototype), 'clear', this).call(this);

                        this.clearGraphColor();
                        this.refresh();
                    }
                }, {
                    key: 'clearGraphColor',
                    value: function clearGraphColor() {
                        var tracer = this;
                        this.nodeCollection.forEach(function (node) {
                            node.visited = node.isNew = false;
                        });

                        this.graph.nodes().forEach(function (node) {
                            node.color = tracer.color.default;
                        });
                        this.graph.edges().forEach(function (edge) {
                            edge.color = tracer.color.default;
                        });
                    }
                }, {
                    key: 'n',
                    value: function n(v) {
                        return 'n' + v;
                    }
                }, {
                    key: 'e',
                    value: function e(v1, v2) {
                        return 'e' + v1 + '_' + v2;
                    }
                }, {
                    key: 'getColor',
                    value: function getColor(edge, source, target, settings) {
                        var color = edge.color,
                            edgeColor = settings('edgeColor'),
                            defaultNodeColor = settings('defaultNodeColor'),
                            defaultEdgeColor = settings('defaultEdgeColor');
                        if (!color) switch (edgeColor) {
                        case 'source':
                            color = source.color || defaultNodeColor;
                            break;
                        case 'target':
                            color = target.color || defaultNodeColor;
                            break;
                        default:
                            color = defaultEdgeColor;
                            break;
                        }

                        return color;
                    }
                }, {
                    key: 'drawLabel',
                    value: function drawLabel(node, context, settings) {
                        var fontSize,
                            prefix = settings('prefix') || '',
                            size = node[prefix + 'size'];

                        if (size < settings('labelThreshold')) return;

                        if (!node.label || typeof node.label !== 'string') return;

                        fontSize = settings('labelSize') === 'fixed' ? settings('defaultLabelSize') : settings('labelSizeRatio') * size;

                        context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') + fontSize + 'px ' + settings('font');
                        context.fillStyle = settings('labelColor') === 'node' ? node.color || settings('defaultNodeColor') : settings('defaultLabelColor');

                        context.textAlign = 'center';
                        context.fillText(node.label, Math.round(node[prefix + 'x']), Math.round(node[prefix + 'y'] + fontSize / 3));
                    }
                }, {
                    key: 'drawArrow',
                    value: function drawArrow(edge, source, target, color, context, settings) {
                        var prefix = settings('prefix') || '',
                            size = edge[prefix + 'size'] || 1,
                            tSize = target[prefix + 'size'],
                            sX = source[prefix + 'x'],
                            sY = source[prefix + 'y'],
                            tX = target[prefix + 'x'],
                            tY = target[prefix + 'y'],
                            angle = Math.atan2(tY - sY, tX - sX),
                            dist = 3;
                        sX += Math.sin(angle) * dist;
                        tX += Math.sin(angle) * dist;
                        sY += -Math.cos(angle) * dist;
                        tY += -Math.cos(angle) * dist;
                        var aSize = Math.max(size * 2.5, settings('minArrowSize')),
                            d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
                            aX = sX + (tX - sX) * (d - aSize - tSize) / d,
                            aY = sY + (tY - sY) * (d - aSize - tSize) / d,
                            vX = (tX - sX) * aSize / d,
                            vY = (tY - sY) * aSize / d;

                        context.strokeStyle = color;
                        context.lineWidth = size;
                        context.beginPath();
                        context.moveTo(sX, sY);
                        context.lineTo(aX, aY);
                        context.stroke();

                        context.fillStyle = color;
                        context.beginPath();
                        context.moveTo(aX + vX, aY + vY);
                        context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
                        context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
                        context.lineTo(aX + vX, aY + vY);
                        context.closePath();
                        context.fill();
                    }
                }, {
                    key: 'drawOnHover',
                    value: function drawOnHover(node, context, settings, next) {
                        var tracer = this;

                        context.setLineDash([5, 5]);
                        var nodeIdx = node.id.substring(1);
                        this.graph.edges().forEach(function (edge) {
                            var ends = edge.id.substring(1).split("_");
                            if (ends[0] == nodeIdx) {
                                var color = '#0ff';
                                var source = node;
                                var target = tracer.graph.nodes('n' + ends[1]);
                                tracer.drawArrow(edge, source, target, color, context, settings);
                                if (next) next(edge, source, target, color, context, settings);
                            } else if (ends[1] == nodeIdx) {
                                var color = '#ff0';
                                var source = tracer.graph.nodes('n' + ends[0]);
                                var target = node;
                                tracer.drawArrow(edge, source, target, color, context, settings);
                                if (next) next(edge, source, target, color, context, settings);
                            }
                        });
                    }
                }]);

                return DirectedGraphConstructTracer;
            }(Tracer);

            var initView = function initView(tracer) {
                tracer.s = tracer.capsule.s = new sigma({
                    renderer: {
                        container: tracer.$container[0],
                        type: 'canvas'
                    },
                    settings: {
                        minArrowSize: 8,
                        defaultEdgeType: 'arrow',
                        maxEdgeSize: 2.5,
                        labelThreshold: 4,
                        font: 'Roboto',
                        defaultLabelColor: '#fff',
                        zoomMin: 0.6,
                        zoomMax: 1.2,
                        skipErrors: true,
                        minNodeSize: .5,
                        maxNodeSize: 12,
                        labelSize: 'proportional',
                        labelSizeRatio: 1.3,
                        funcLabelsDef: function funcLabelsDef(node, context, settings) {
                                tracer.drawLabel(node, context, settings);
                            },
                            funcHoversDef: function funcHoversDef(node, context, settings, next) {
                                tracer.drawOnHover(node, context, settings, next);
                            },
                            funcEdgesArrow: function funcEdgesArrow(edge, source, target, context, settings) {
                                var color = tracer.getColor(edge, source, target, settings);
                                tracer.drawArrow(edge, source, target, color, context, settings);
                            }
                    }
                });
                sigma.plugins.dragNodes(tracer.s, tracer.s.renderers[0]);
                tracer.graph = tracer.capsule.graph = tracer.s.graph;
            };

            sigma.canvas.labels.def = function (node, context, settings) {
                var func = settings('funcLabelsDef');
                if (func) {
                    func(node, context, settings);
                }
            };
            sigma.canvas.hovers.def = function (node, context, settings) {
                var func = settings('funcHoversDef');
                if (func) {
                    func(node, context, settings);
                }
            };
            sigma.canvas.edges.def = function (edge, source, target, context, settings) {
                var func = settings('funcEdgesDef');
                if (func) {
                    func(edge, source, target, context, settings);
                }
            };
            sigma.canvas.edges.arrow = function (edge, source, target, context, settings) {
                var func = settings('funcEdgesArrow');
                if (func) {
                    func(edge, source, target, context, settings);
                }
            };

            module.exports = DirectedGraphConstructTracer;

        }, {
            "../../tracer_manager/util/index": 75,
            "./tracer": 55
        }
    ],
    53: [
        function (require, module, exports) {
            'use strict';

            var Tracer = require('./tracer');
            var LogTracer = require('./log');
            var Array1DTracer = require('./array1d');
            var Array2DTracer = require('./array2d');
            var ChartTracer = require('./chart');
            var CoordinateSystemTracer = require('./coordinate_system');
            var DirectedGraphTracer = require('./directed_graph');
            var DirectedGraphConstructTracer = require('./directed_graph_construct');
            var UndirectedGraphTracer = require('./undirected_graph');
            var WeightedDirectedGraphTracer = require('./weighted_directed_graph');
            var WeightedUndirectedGraphTracer = require('./weighted_undirected_graph');

            module.exports = {
                Tracer: Tracer,
                LogTracer: LogTracer,
                Array1DTracer: Array1DTracer,
                Array2DTracer: Array2DTracer,
                ChartTracer: ChartTracer,
                CoordinateSystemTracer: CoordinateSystemTracer,
                DirectedGraphTracer: DirectedGraphTracer,
                DirectedGraphConstructTracer: DirectedGraphConstructTracer,
                UndirectedGraphTracer: UndirectedGraphTracer,
                WeightedDirectedGraphTracer: WeightedDirectedGraphTracer,
                WeightedUndirectedGraphTracer: WeightedUndirectedGraphTracer
            };

        }, {
            "./array1d": 47,
            "./array2d": 48,
            "./chart": 49,
            "./coordinate_system": 50,
            "./directed_graph": 51,
            "./directed_graph_construct": 52,
            "./log": 54,
            "./tracer": 55,
            "./undirected_graph": 56,
            "./weighted_directed_graph": 57,
            "./weighted_undirected_graph": 58
        }
    ],
    54: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var Tracer = require('./tracer');

            var LogTracer = function (_Tracer) {
                _inherits(LogTracer, _Tracer);

                _createClass(LogTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'LogTracer';
                    }
                }]);

                function LogTracer(name) {
                    _classCallCheck(this, LogTracer);

                    var _this = _possibleConstructorReturn(this, (LogTracer.__proto__ || Object.getPrototypeOf(LogTracer)).call(this, name));

                    if (_this.isNew) initView(_this);
                    return _this;
                }

                _createClass(LogTracer, [{
                    key: '_print',
                    value: function _print(msg) {
                        this.manager.pushStep(this.capsule, {
                            type: 'print',
                            msg: msg
                        });
                        return this;
                    }
                }, {
                    key: 'processStep',
                    value: function processStep(step, options) {
                        switch (step.type) {
                        case 'print':
                            this.print(step.msg);
                            break;
                        }
                    }
                }, {
                    key: 'refresh',
                    value: function refresh() {
                        this.scrollToEnd(Math.min(50, this.interval));
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        _get(LogTracer.prototype.__proto__ || Object.getPrototypeOf(LogTracer.prototype), 'clear', this).call(this);

                        this.$wrapper.empty();
                    }
                }, {
                    key: 'print',
                    value: function print(message) {
                        this.$wrapper.append($('<span>').append(message + '<br/>'));
                    }
                }, {
                    key: 'scrollToEnd',
                    value: function scrollToEnd(duration) {
                        this.$container.animate({
                            scrollTop: this.$container[0].scrollHeight
                        }, duration);
                    }
                }]);

                return LogTracer;
            }(Tracer);

            var initView = function initView(tracer) {
                tracer.$wrapper = tracer.capsule.$wrapper = $('<div class="wrapper">');
                tracer.$container.append(tracer.$wrapper);
            };

            module.exports = LogTracer;

        }, {
            "./tracer": 55
        }
    ],
    55: [
        function (require, module, exports) {
            'use strict';

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _toConsumableArray(arr) {
                if (Array.isArray(arr)) {
                    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                        arr2[i] = arr[i];
                    }
                    return arr2;
                } else {
                    return Array.from(arr);
                }
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var app = require('../../app');

            var _require = require('../../tracer_manager/util/index'),
                toJSON = _require.toJSON,
                fromJSON = _require.fromJSON;

            var Tracer = function () {
                _createClass(Tracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'Tracer';
                    }
                }]);

                function Tracer(name) {
                    _classCallCheck(this, Tracer);

                    this.module = this.constructor;

                    this.color = {
                        selected: '#2962ff',
                        notified: '#f50057',
                        visited: '#f50057',
                        left: '#616161',
                        default: '#bdbdbd'
                    };

                    this.manager = app.getTracerManager();
                    this.capsule = this.manager.allocate(this);
                    $.extend(this, this.capsule);

                    this.setName(name);
                }

                _createClass(Tracer, [{
                    key: '_setData',
                    value: function _setData() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        this.manager.pushStep(this.capsule, {
                            type: 'setData',
                            args: toJSON(args)
                        });
                        return this;
                    }
                }, {
                    key: '_clear',
                    value: function _clear() {
                        this.manager.pushStep(this.capsule, {
                            type: 'clear'
                        });
                        return this;
                    }
                }, {
                    key: '_wait',
                    value: function _wait(line) {
                        this.manager.newStep(line);
                        return this;
                    }
                }, {
                    key: 'processStep',
                    value: function processStep(step, options) {
                        var type = step.type,
                            args = step.args;


                        switch (type) {
                        case 'setData':
                            this.setData.apply(this, _toConsumableArray(fromJSON(args)));
                            break;
                        case 'clear':
                            this.clear();
                            break;
                        }
                    }
                }, {
                    key: 'setName',
                    value: function setName(name) {
                        var $name = void 0;
                        if (this.isNew) {
                            $name = $('<span class="name">');
                            this.$container.append($name);
                        } else {
                            $name = this.$container.find('span.name');
                        }
                        $name.text(name || this.defaultName);
                    }
                }, {
                    key: 'setData',
                    value: function setData() {
                        var data = toJSON(arguments);
                        if (!this.isNew && this.lastData === data) {
                            return true;
                        }
                        this.lastData = this.capsule.lastData = data;
                        return false;
                    }
                }, {
                    key: 'resize',
                    value: function resize() {}
                }, {
                    key: 'refresh',
                    value: function refresh() {}
                }, {
                    key: 'clear',
                    value: function clear() {}
                }, {
                    key: 'attach',
                    value: function attach(tracer) {
                        switch (tracer.module) {
                        case LogTracer:
                            this.logTracer = tracer;
                            break;
                        case ChartTracer:
                            this.chartTracer = tracer;
                            break;
                        }
                        return this;
                    }
                }, {
                    key: 'palette',
                    value: function palette(color) {
                        $.extend(this.color, color);
                        return this;
                    }
                }, {
                    key: 'mousedown',
                    value: function mousedown(e) {}
                }, {
                    key: 'mousemove',
                    value: function mousemove(e) {}
                }, {
                    key: 'mouseup',
                    value: function mouseup(e) {}
                }, {
                    key: 'mousewheel',
                    value: function mousewheel(e) {}
                }]);

                return Tracer;
            }();

            module.exports = Tracer;

        }, {
            "../../app": 3,
            "../../tracer_manager/util/index": 75
        }
    ],
    56: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var DirectedGraphTracer = require('./directed_graph');

            var UndirectedGraphTracer = function (_DirectedGraphTracer) {
                _inherits(UndirectedGraphTracer, _DirectedGraphTracer);

                _createClass(UndirectedGraphTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'UndirectedGraphTracer';
                    }
                }]);

                function UndirectedGraphTracer(name) {
                    _classCallCheck(this, UndirectedGraphTracer);

                    var _this = _possibleConstructorReturn(this, (UndirectedGraphTracer.__proto__ || Object.getPrototypeOf(UndirectedGraphTracer)).call(this, name));

                    if (_this.isNew) initView(_this);
                    return _this;
                }

                _createClass(UndirectedGraphTracer, [{
                    key: 'setTreeData',
                    value: function setTreeData(G, root) {
                        return _get(UndirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(UndirectedGraphTracer.prototype), 'setTreeData', this).call(this, G, root, true);
                    }
                }, {
                    key: 'setData',
                    value: function setData(G) {
                        return _get(UndirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(UndirectedGraphTracer.prototype), 'setData', this).call(this, G, true);
                    }
                }, {
                    key: 'e',
                    value: function e(v1, v2) {
                        if (v1 > v2) {
                            var temp = v1;
                            v1 = v2;
                            v2 = temp;
                        }
                        return 'e' + v1 + '_' + v2;
                    }
                }, {
                    key: 'drawOnHover',
                    value: function drawOnHover(node, context, settings, next) {
                        var tracer = this;

                        context.setLineDash([5, 5]);
                        var nodeIdx = node.id.substring(1);
                        this.graph.edges().forEach(function (edge) {
                            var ends = edge.id.substring(1).split("_");
                            if (ends[0] == nodeIdx) {
                                var color = '#0ff';
                                var source = node;
                                var target = tracer.graph.nodes('n' + ends[1]);
                                tracer.drawEdge(edge, source, target, color, context, settings);
                                if (next) next(edge, source, target, color, context, settings);
                            } else if (ends[1] == nodeIdx) {
                                var color = '#0ff';
                                var source = tracer.graph.nodes('n' + ends[0]);
                                var target = node;
                                tracer.drawEdge(edge, source, target, color, context, settings);
                                if (next) next(edge, source, target, color, context, settings);
                            }
                        });
                    }
                }, {
                    key: 'drawEdge',
                    value: function drawEdge(edge, source, target, color, context, settings) {
                        var prefix = settings('prefix') || '',
                            size = edge[prefix + 'size'] || 1;

                        context.strokeStyle = color;
                        context.lineWidth = size;
                        context.beginPath();
                        context.moveTo(source[prefix + 'x'], source[prefix + 'y']);
                        context.lineTo(target[prefix + 'x'], target[prefix + 'y']);
                        context.stroke();
                    }
                }]);

                return UndirectedGraphTracer;
            }(DirectedGraphTracer);

            var initView = function initView(tracer) {
                tracer.s.settings({
                    defaultEdgeType: 'def',
                    funcEdgesDef: function funcEdgesDef(edge, source, target, context, settings) {
                        var color = tracer.getColor(edge, source, target, settings);
                        tracer.drawEdge(edge, source, target, color, context, settings);
                    }
                });
            };

            module.exports = UndirectedGraphTracer;

        }, {
            "./directed_graph": 51
        }
    ],
    57: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var DirectedGraphTracer = require('./directed_graph');

            var _require = require('../../tracer_manager/util/index'),
                refineByType = _require.refineByType;

            var WeightedDirectedGraphTracer = function (_DirectedGraphTracer) {
                _inherits(WeightedDirectedGraphTracer, _DirectedGraphTracer);

                _createClass(WeightedDirectedGraphTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'WeightedDirectedGraphTracer';
                    }
                }]);

                function WeightedDirectedGraphTracer(name) {
                    _classCallCheck(this, WeightedDirectedGraphTracer);

                    var _this = _possibleConstructorReturn(this, (WeightedDirectedGraphTracer.__proto__ || Object.getPrototypeOf(WeightedDirectedGraphTracer)).call(this, name));

                    if (_this.isNew) initView(_this);
                    return _this;
                }

                _createClass(WeightedDirectedGraphTracer, [{
                    key: '_weight',
                    value: function _weight(target, weight) {
                        this.manager.pushStep(this.capsule, {
                            type: 'weight',
                            target: target,
                            weight: weight
                        });
                        return this;
                    }
                }, {
                    key: '_visit',
                    value: function _visit(target, source, weight) {
                        this.manager.pushStep(this.capsule, {
                            type: 'visit',
                            target: target,
                            source: source,
                            weight: weight
                        });
                        return this;
                    }
                }, {
                    key: '_leave',
                    value: function _leave(target, source, weight) {
                        this.manager.pushStep(this.capsule, {
                            type: 'leave',
                            target: target,
                            source: source,
                            weight: weight
                        });
                        return this;
                    }
                }, {
                    key: 'processStep',
                    value: function processStep(step, options) {
                        switch (step.type) {
                        case 'weight':
                            var targetNode = this.graph.nodes(this.n(step.target));
                            if (step.weight !== undefined) targetNode.weight = refineByType(step.weight);
                            break;
                        case 'visit':
                        case 'leave':
                            var visit = step.type == 'visit';
                            var targetNode = this.graph.nodes(this.n(step.target));
                            var color = visit ? step.weight === undefined ? this.color.selected : this.color.visited : this.color.left;
                            targetNode.color = color;
                            if (step.weight !== undefined) targetNode.weight = refineByType(step.weight);
                            if (step.source !== undefined) {
                                var edgeId = this.e(step.source, step.target);
                                var edge = this.graph.edges(edgeId);
                                edge.color = color;
                                this.graph.dropEdge(edgeId).addEdge(edge);
                            }
                            if (this.logTracer) {
                                var source = step.source;
                                if (source === undefined) source = '';
                                this.logTracer.print(visit ? source + ' -> ' + step.target : source + ' <- ' + step.target);
                            }
                            break;
                        default:
                            _get(WeightedDirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(WeightedDirectedGraphTracer.prototype), 'processStep', this).call(this, step, options);
                        }
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        _get(WeightedDirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(WeightedDirectedGraphTracer.prototype), 'clear', this).call(this);

                        this.clearWeights();
                    }
                }, {
                    key: 'clearWeights',
                    value: function clearWeights() {
                        this.graph.nodes().forEach(function (node) {
                            node.weight = 0;
                        });
                    }
                }, {
                    key: 'drawEdgeWeight',
                    value: function drawEdgeWeight(edge, source, target, color, context, settings) {
                        if (source == target) return;

                        var prefix = settings('prefix') || '',
                            size = edge[prefix + 'size'] || 1;

                        if (size < settings('edgeLabelThreshold')) return;

                        if (0 === settings('edgeLabelSizePowRatio')) throw '"edgeLabelSizePowRatio" must not be 0.';

                        var fontSize,
                            x = (source[prefix + 'x'] + target[prefix + 'x']) / 2,
                            y = (source[prefix + 'y'] + target[prefix + 'y']) / 2,
                            dX = target[prefix + 'x'] - source[prefix + 'x'],
                            dY = target[prefix + 'y'] - source[prefix + 'y'],
                            angle = Math.atan2(dY, dX);

                        fontSize = settings('edgeLabelSize') === 'fixed' ? settings('defaultEdgeLabelSize') : settings('defaultEdgeLabelSize') * size * Math.pow(size, -1 / settings('edgeLabelSizePowRatio'));

                        context.save();

                        if (edge.active) {
                            context.font = [settings('activeFontStyle'), fontSize + 'px', settings('activeFont') || settings('font')].join(' ');

                            context.fillStyle = color;
                        } else {
                            context.font = [settings('fontStyle'), fontSize + 'px', settings('font')].join(' ');

                            context.fillStyle = color;
                        }

                        context.textAlign = 'center';
                        context.textBaseline = 'alphabetic';

                        context.translate(x, y);
                        context.rotate(angle);
                        context.fillText(edge.weight, 0, -size / 2 - 3);

                        context.restore();
                    }
                }, {
                    key: 'drawNodeWeight',
                    value: function drawNodeWeight(node, context, settings) {
                        var fontSize,
                            prefix = settings('prefix') || '',
                            size = node[prefix + 'size'];

                        if (size < settings('labelThreshold')) return;

                        fontSize = settings('labelSize') === 'fixed' ? settings('defaultLabelSize') : settings('labelSizeRatio') * size;

                        context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') + fontSize + 'px ' + settings('font');
                        context.fillStyle = settings('labelColor') === 'node' ? node.color || settings('defaultNodeColor') : settings('defaultLabelColor');

                        context.textAlign = 'left';
                        context.fillText(node.weight, Math.round(node[prefix + 'x'] + size * 1.5), Math.round(node[prefix + 'y'] + fontSize / 3));
                    }
                }]);

                return WeightedDirectedGraphTracer;
            }(DirectedGraphTracer);

            var initView = function initView(tracer) {
                tracer.s.settings({
                    edgeLabelSize: 'proportional',
                    defaultEdgeLabelSize: 20,
                    edgeLabelSizePowRatio: 0.8,
                    funcLabelsDef: function funcLabelsDef(node, context, settings) {
                            tracer.drawNodeWeight(node, context, settings);
                            tracer.drawLabel(node, context, settings);
                        },
                        funcHoversDef: function funcHoversDef(node, context, settings) {
                            tracer.drawOnHover(node, context, settings, tracer.drawEdgeWeight);
                        },
                        funcEdgesArrow: function funcEdgesArrow(edge, source, target, context, settings) {
                            var color = tracer.getColor(edge, source, target, settings);
                            tracer.drawArrow(edge, source, target, color, context, settings);
                            tracer.drawEdgeWeight(edge, source, target, color, context, settings);
                        }
                });
            };

            module.exports = WeightedDirectedGraphTracer;

        }, {
            "../../tracer_manager/util/index": 75,
            "./directed_graph": 51
        }
    ],
    58: [
        function (require, module, exports) {
            'use strict';

            var _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);
                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;
                    if (getter === undefined) {
                        return undefined;
                    }
                    return getter.call(receiver);
                }
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && (typeof call === "object" || typeof call === "function") ? call : self;
            }

            function _inherits(subClass, superClass) {
                if (typeof superClass !== "function" && superClass !== null) {
                    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                }
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }

            var WeightedDirectedGraphTracer = require('./weighted_directed_graph');
            var UndirectedGraphTracer = require('./undirected_graph');

            var WeightedUndirectedGraphTracer = function (_WeightedDirectedGrap) {
                _inherits(WeightedUndirectedGraphTracer, _WeightedDirectedGrap);

                _createClass(WeightedUndirectedGraphTracer, null, [{
                    key: 'getClassName',
                    value: function getClassName() {
                        return 'WeightedUndirectedGraphTracer';
                    }
                }]);

                function WeightedUndirectedGraphTracer(name) {
                    _classCallCheck(this, WeightedUndirectedGraphTracer);

                    var _this = _possibleConstructorReturn(this, (WeightedUndirectedGraphTracer.__proto__ || Object.getPrototypeOf(WeightedUndirectedGraphTracer)).call(this, name));

                    _this.e = UndirectedGraphTracer.prototype.e;
                    _this.drawOnHover = UndirectedGraphTracer.prototype.drawOnHover;
                    _this.drawEdge = UndirectedGraphTracer.prototype.drawEdge;

                    if (_this.isNew) initView(_this);
                    return _this;
                }

                _createClass(WeightedUndirectedGraphTracer, [{
                    key: 'setTreeData',
                    value: function setTreeData(G, root) {
                        return _get(WeightedUndirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(WeightedUndirectedGraphTracer.prototype), 'setTreeData', this).call(this, G, root, true);
                    }
                }, {
                    key: 'setData',
                    value: function setData(G) {
                        return _get(WeightedUndirectedGraphTracer.prototype.__proto__ || Object.getPrototypeOf(WeightedUndirectedGraphTracer.prototype), 'setData', this).call(this, G, true);
                    }
                }, {
                    key: 'drawEdgeWeight',
                    value: function drawEdgeWeight(edge, source, target, color, context, settings) {
                        var prefix = settings('prefix') || '';
                        if (source[prefix + 'x'] > target[prefix + 'x']) {
                            var temp = source;
                            source = target;
                            target = temp;
                        }
                        WeightedDirectedGraphTracer.prototype.drawEdgeWeight.call(this, edge, source, target, color, context, settings);
                    }
                }]);

                return WeightedUndirectedGraphTracer;
            }(WeightedDirectedGraphTracer);

            var initView = function initView(tracer) {
                tracer.s.settings({
                    defaultEdgeType: 'def',
                    funcEdgesDef: function funcEdgesDef(edge, source, target, context, settings) {
                        var color = tracer.getColor(edge, source, target, settings);
                        tracer.drawEdge(edge, source, target, color, context, settings);
                        tracer.drawEdgeWeight(edge, source, target, color, context, settings);
                    }
                });
            };

            module.exports = WeightedUndirectedGraphTracer;

        }, {
            "./undirected_graph": 56,
            "./weighted_directed_graph": 57
        }
    ],
    59: [
        function (require, module, exports) {
            'use strict';

            var request = require('./request');

            module.exports = function (url) {
                return request(url, {
                    type: 'GET'
                });
            };

        }, {
            "./request": 62
        }
    ],
    60: [
        function (require, module, exports) {
            'use strict';

            var request = require('./request');

            module.exports = function (url) {
                return request(url, {
                    dataType: 'json',
                    type: 'GET'
                });
            };

        }, {
            "./request": 62
        }
    ],
    61: [
        function (require, module, exports) {
            'use strict';

            var request = require('./request');

            module.exports = function (url, data) {
                return request(url, {
                    dataType: 'json',
                    type: 'POST',
                    data: JSON.stringify(data)
                });
            };

        }, {
            "./request": 62
        }
    ],
    62: [
        function (require, module, exports) {
            'use strict';

            var RSVP = require('rsvp');
            var app = require('../../app');

            var _$ = $,
                ajax = _$.ajax,
                extend = _$.extend;


            var defaults = {};

            module.exports = function (url) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                app.setIsLoading(true);

                return new RSVP.Promise(function (resolve, reject) {
                    var callbacks = {
                        success: function success(response) {
                                app.setIsLoading(false);
                                resolve(response);
                            },
                            error: function error(reason) {
                                app.setIsLoading(false);
                                reject(reason);
                            }
                    };

                    var opts = extend({}, defaults, options, callbacks, {
                        url: url
                    });

                    ajax(opts);
                });
            };

        }, {
            "../../app": 3,
            "rsvp": 80
        }
    ],
    63: [
        function (require, module, exports) {
            'use strict';

            var _slicedToArray = function () {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;
                    try {
                        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function (arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                };
            }();

            var app = require('../app');
            var Toast = require('../dom/toast');

            var checkLoading = function checkLoading() {
                if (app.getIsLoading()) {
                    Toast.showErrorToast('Wait until it completes loading of previous file.');
                    return true;
                }
                return false;
            };

            var getParameterByName = function getParameterByName(name) {
                var url = window.location.href;
                var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');

                var results = regex.exec(url);

                if (!results || results.length !== 3) {
                    return null;
                }

                var _results = _slicedToArray(results, 3),
                    id = _results[2];

                return id;
            };

            var getHashValue = function getHashValue(key) {
                if (!key) return null;
                var hash = window.location.hash.substr(1);
                var params = hash ? hash.split('&') : [];
                for (var i = 0; i < params.length; i++) {
                    var pair = params[i].split('=');
                    if (pair[0] === key) {
                        return pair[1];
                    }
                }
                return null;
            };

            var setHashValue = function setHashValue(key, value) {
                if (!key || !value) return;
                var hash = window.location.hash.substr(1);
                var params = hash ? hash.split('&') : [];

                var found = false;
                for (var i = 0; i < params.length && !found; i++) {
                    var pair = params[i].split('=');
                    if (pair[0] === key) {
                        pair[1] = value;
                        params[i] = pair.join('=');
                        found = true;
                    }
                }
                if (!found) {
                    params.push([key, value].join('='));
                }

                var newHash = params.join('&');
                window.location.hash = '#' + newHash;
            };

            var removeHashValue = function removeHashValue(key) {
                if (!key) return;
                var hash = window.location.hash.substr(1);
                var params = hash ? hash.split('&') : [];

                for (var i = 0; i < params.length; i++) {
                    var pair = params[i].split('=');
                    if (pair[0] === key) {
                        params.splice(i, 1);
                        break;
                    }
                }

                var newHash = params.join('&');
                window.location.hash = '#' + newHash;
            };

            var setPath = function setPath(category, algorithm, file) {
                var path = category ? category + (algorithm ? '/' + algorithm + (file ? '/' + file : '') : '') : '';
                setHashValue('path', path);
            };

            var getPath = function getPath() {
                var hash = getHashValue('path');
                if (hash) {
                    var _hash$split = hash.split('/'),
                        _hash$split2 = _slicedToArray(_hash$split, 3),
                        category = _hash$split2[0],
                        algorithm = _hash$split2[1],
                        file = _hash$split2[2];

                    return {
                        category: category,
                        algorithm: algorithm,
                        file: file
                    };
                } else {
                    return false;
                }
            };

            module.exports = {
                checkLoading: checkLoading,
                getParameterByName: getParameterByName,
                getHashValue: getHashValue,
                setHashValue: setHashValue,
                removeHashValue: removeHashValue,
                setPath: setPath,
                getPath: getPath
            };

        }, {
            "../app": 3,
            "../dom/toast": 31
        }
    ],
    64: [
        function (require, module, exports) {
            'use strict';

            var loadAlgorithm = require('./load_algorithm');
            var loadCategories = require('./load_categories');
            var loadFile = require('./load_file');
            var loadScratchPaper = require('./load_scratch_paper');
            var shareScratchPaper = require('./share_scratch_paper');
            var loadWikiList = require('./load_wiki_list');
            var loadWiki = require('./load_wiki');

            module.exports = {
                loadAlgorithm: loadAlgorithm,
                loadCategories: loadCategories,
                loadFile: loadFile,
                loadScratchPaper: loadScratchPaper,
                shareScratchPaper: shareScratchPaper,
                loadWikiList: loadWikiList,
                loadWiki: loadWiki
            };

        }, {
            "./load_algorithm": 65,
            "./load_categories": 66,
            "./load_file": 67,
            "./load_scratch_paper": 68,
            "./load_wiki": 69,
            "./load_wiki_list": 70,
            "./share_scratch_paper": 71
        }
    ],
    65: [
        function (require, module, exports) {
            'use strict';

            var getJSON = require('./ajax/get_json');

            var _require = require('../utils'),
                getAlgorithmDir = _require.getAlgorithmDir;

            module.exports = function (category, algorithm) {
                var dir = getAlgorithmDir(category, algorithm);
                return getJSON(dir + 'desc.json');
            };

        }, {
            "../utils": 78,
            "./ajax/get_json": 60
        }
    ],
    66: [
        function (require, module, exports) {
            'use strict';

            var getJSON = require('./ajax/get_json');

            module.exports = function () {
                return getJSON('./algorithm/category.json');
            };

        }, {
            "./ajax/get_json": 60
        }
    ],
    67: [
        function (require, module, exports) {
            'use strict';

            var RSVP = require('rsvp');

            var app = require('../app');

            var _require = require('../utils'),
                getFileDir = _require.getFileDir,
                isScratchPaper = _require.isScratchPaper;

            var _require2 = require('./helpers'),
                checkLoading = _require2.checkLoading,
                setPath = _require2.setPath;

            var get = require('./ajax/get');

            var loadDataAndCode = function loadDataAndCode(dir) {
                return RSVP.hash({
                    data: get(dir + 'data.js'),
                    code: get(dir + 'code.js'),
                    codeshow: get(dir + 'codeshow.js')
                });
            };

            var loadFileAndUpdateContent = function loadFileAndUpdateContent(dir) {
                app.getEditor().clearContent();

                return loadDataAndCode(dir).then(function (content) {
                    app.updateCachedFile(dir, content);
                    app.getEditor().setContent(content);
                });
            };

            var cachedContentExists = function cachedContentExists(cachedFile) {
                return cachedFile && cachedFile.data !== undefined && cachedFile.code !== undefined;
            };

            module.exports = function (category, algorithm, file, explanation) {
                return new RSVP.Promise(function (resolve, reject) {
                    if (checkLoading()) {
                        reject();
                    } else {
                        if (isScratchPaper(category)) {
                            setPath(category, app.getLoadedScratch());
                        } else {
                            setPath(category, algorithm, file);
                        }
                        $('#explanation').html(explanation);

                        var dir = getFileDir(category, algorithm, file);
                        app.setLastFileUsed(dir);
                        var cachedFile = app.getCachedFile(dir);

                        if (cachedContentExists(cachedFile)) {
                            app.getEditor().setContent(cachedFile);
                            resolve();
                        } else {
                            loadFileAndUpdateContent(dir).then(resolve, reject);
                        }
                    }
                });
            };

        }, {
            "../app": 3,
            "../utils": 78,
            "./ajax/get": 59,
            "./helpers": 63,
            "rsvp": 80
        }
    ],
    68: [
        function (require, module, exports) {
            'use strict';

            var RSVP = require('rsvp');
            var app = require('../app');

            var _require = require('../utils'),
                getFileDir = _require.getFileDir;

            var getJSON = require('./ajax/get_json');
            var loadAlgorithm = require('./load_algorithm');

            var extractGistCode = function extractGistCode(files, name) {
                return files[name + '.js'].content;
            };

            module.exports = function (gistID) {
                return new RSVP.Promise(function (resolve, reject) {
                    app.setLoadedScratch(gistID);

                    getJSON('https://api.github.com/gists/' + gistID).then(function (_ref) {
                        var files = _ref.files;


                        var category = 'scratch';
                        var algorithm = gistID;

                        loadAlgorithm(category, algorithm).then(function (data) {

                            var algoData = extractGistCode(files, 'data');
                            var algoCode = extractGistCode(files, 'code');

                            // update scratch paper algo code with the loaded gist code
                            var dir = getFileDir(category, algorithm, 'scratch_paper');
                            app.updateCachedFile(dir, {
                                data: algoData,
                                code: algoCode,
                                'CREDIT.md': 'Shared by an anonymous user from http://parkjs814.github.io/AlgorithmVisualizer'
                            });

                            resolve({
                                category: category,
                                algorithm: algorithm,
                                data: data
                            });
                        });
                    });
                });
            };

        }, {
            "../app": 3,
            "../utils": 78,
            "./ajax/get_json": 60,
            "./load_algorithm": 65,
            "rsvp": 80
        }
    ],
    69: [
        function (require, module, exports) {
            'use strict';

            var get = require('./ajax/get');

            module.exports = function (wiki) {
                return get('./wiki/' + wiki + '.md');
            };

        }, {
            "./ajax/get": 59
        }
    ],
    70: [
        function (require, module, exports) {
            'use strict';

            var getJSON = require('./ajax/get_json');

            module.exports = function () {
                return getJSON('./wiki.json');
            };

        }, {
            "./ajax/get_json": 60
        }
    ],
    71: [
        function (require, module, exports) {
            'use strict';

            var RSVP = require('rsvp');
            var app = require('../app');

            var postJSON = require('./ajax/post_json');

            var _require = require('./helpers'),
                setPath = _require.setPath;

            module.exports = function () {
                return new RSVP.Promise(function (resolve, reject) {
                    var _app$getEditor = app.getEditor(),
                        dataEditor = _app$getEditor.dataEditor,
                        codeEditor = _app$getEditor.codeEditor;

                    var gist = {
                        'description': 'temp',
                        'public': true,
                        'files': {
                            'data.js': {
                                'content': dataEditor.getValue()
                            },
                            'code.js': {
                                'content': codeEditor.getValue()
                            }
                        }
                    };

                    postJSON('https://api.github.com/gists', gist).then(function (_ref) {
                        var id = _ref.id;

                        app.setLoadedScratch(id);
                        setPath('scratch', id);
                        var _location = location,
                            href = _location.href;

                        $('#algorithm').html('Shared');
                        resolve(href);
                    });
                });
            };

        }, {
            "../app": 3,
            "./ajax/post_json": 61,
            "./helpers": 63,
            "rsvp": 80
        }
    ],
    72: [
        function (require, module, exports) {
            'use strict';

            var TracerManager = require('./manager');
            var Tracer = require('../module/tracer/tracer');

            module.exports = {
                init: function init() {
                    var tm = new TracerManager();
                    Tracer.prototype.manager = tm;
                    return tm;
                }
            };

        }, {
            "../module/tracer/tracer": 55,
            "./manager": 73
        }
    ],
    73: [
        function (require, module, exports) {
            'use strict';

            var app = require('../app');
            var ModuleContainer = require('../dom/module_container');
            var TopMenu = require('../dom/top_menu');

            var _$ = $,
                each = _$.each,
                extend = _$.extend,
                grep = _$.grep;


            var stepLimit = 1e6;

            var TracerManager = function TracerManager() {
                this.timer = null;
                this.pause = false;
                this.capsules = [];
                this.interval = 50;
            };

            TracerManager.prototype = {
                add: function add(tracer) {

                        var $container = ModuleContainer.create();

                        var capsule = {
                            module: tracer.module,
                            tracer: tracer,
                            allocated: true,
                            defaultName: null,
                            $container: $container,
                            isNew: true
                        };

                        this.capsules.push(capsule);
                        return capsule;
                    },
                    allocate: function allocate(newTracer) {
                        var selectedCapsule = null;
                        var count = 0;

                        each(this.capsules, function (i, capsule) {
                            if (capsule.module === newTracer.module) {
                                count++;
                                if (!capsule.allocated) {
                                    capsule.tracer = newTracer;
                                    capsule.allocated = true;
                                    capsule.isNew = false;
                                    selectedCapsule = capsule;
                                    return false;
                                }
                            }
                        });

                        if (selectedCapsule === null) {
                            count++;
                            selectedCapsule = this.add(newTracer);
                        }

                        var className = newTracer.module.getClassName();
                        selectedCapsule.defaultName = className + ' ' + count;
                        selectedCapsule.order = this.order++;
                        return selectedCapsule;
                    },
                    deallocateAll: function deallocateAll() {
                        this.order = 0;
                        this.reset();
                        each(this.capsules, function (i, capsule) {
                            capsule.allocated = false;
                        });
                    },
                    removeUnallocated: function removeUnallocated() {
                        var changed = false;

                        this.capsules = grep(this.capsules, function (capsule) {
                            var removed = !capsule.allocated;

                            if (capsule.isNew || removed) {
                                changed = true;
                            }
                            if (removed) {
                                capsule.$container.remove();
                            }

                            return !removed;
                        });

                        if (changed) {
                            this.place();
                        }
                    },
                    place: function place() {
                        var capsules = this.capsules;


                        each(capsules, function (i, capsule) {
                            var width = 100;
                            var height = 100 / capsules.length;
                            var top = height * capsule.order;

                            capsule.$container.css({
                                top: top + '%',
                                width: width + '%',
                                height: height + '%'
                            });

                            capsule.tracer.resize();
                        });
                    },
                    resize: function resize() {
                        this.command('resize');
                    },
                    isPause: function isPause() {
                        return this.pause;
                    },
                    setInterval: function setInterval(interval) {
                        TopMenu.setInterval(interval);
                    },
                    reset: function reset() {
                        this.traces = [];
                        this.traceIndex = -1;
                        this.stepCnt = 0;
                        if (this.timer) {
                            clearTimeout(this.timer);
                        }
                        this.command('clear');
                    },
                    pushStep: function pushStep(capsule, step) {
                        if (this.stepCnt++ > stepLimit) throw "Tracer's stack overflow";
                        var len = this.traces.length;
                        if (len == 0) len += this.newStep();
                        var last = this.traces[len - 1];
                        last.push(extend(step, {
                            capsule: capsule
                        }));
                    },
                    newStep: function newStep() {
                        var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

                        var len = this.traces.length;
                        if (len > 0 && ~line) {
                            this.traces[len - 1].push(line);
                        }
                        return this.traces.push([]);
                    },
                    pauseStep: function pauseStep() {
                        if (this.traceIndex < 0) return;
                        this.pause = true;
                        if (this.timer) {
                            clearTimeout(this.timer);
                        }
                        TopMenu.activateBtnPause();
                    },
                    resumeStep: function resumeStep() {
                        this.pause = false;
                        this.step(this.traceIndex + 1);
                        TopMenu.deactivateBtnPause();
                    },
                    step: function step(i) {
                        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                        var tracer = this;

                        if (isNaN(i) || i >= this.traces.length || i < 0) return;

                        this.traceIndex = i;
                        var trace = this.traces[i];
                        trace.forEach(function (step) {
                            if (typeof step === 'number') {
                                app.getEditor().highlightLine(step);
                                return;
                            }
                            step.capsule.tracer.processStep(step, options);
                        });

                        if (!options.virtual) {
                            this.command('refresh');
                        }

                        if (this.pause) return;

                        this.timer = setTimeout(function () {
                            if (!tracer.nextStep(options)) {
                                TopMenu.resetTopMenuButtons();
                            }
                        }, this.interval);
                    },
                    prevStep: function prevStep() {
                        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                        this.command('clear');

                        var finalIndex = this.traceIndex - 1;
                        if (finalIndex < 0) {
                            this.traceIndex = -1;
                            this.command('refresh');
                            return false;
                        }

                        for (var i = 0; i < finalIndex; i++) {
                            this.step(i, extend(options, {
                                virtual: true
                            }));
                        }

                        this.step(finalIndex);
                        return true;
                    },
                    nextStep: function nextStep() {
                        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                        var finalIndex = this.traceIndex + 1;
                        if (finalIndex >= this.traces.length) {
                            this.traceIndex = this.traces.length - 1;
                            return false;
                        }

                        this.step(finalIndex, options);
                        return true;
                    },
                    visualize: function visualize() {
                        this.traceIndex = -1;
                        this.resumeStep();
                    },
                    command: function command() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        var functionName = args.shift();
                        each(this.capsules, function (i, capsule) {
                            if (capsule.allocated) {
                                capsule.tracer.module.prototype[functionName].apply(capsule.tracer, args);
                            }
                        });
                    },
                    findOwner: function findOwner(container) {
                        var selectedCapsule = null;
                        each(this.capsules, function (i, capsule) {
                            if (capsule.$container[0] === container) {
                                selectedCapsule = capsule;
                                return false;
                            }
                        });
                        return selectedCapsule.tracer;
                    }
            };

            module.exports = TracerManager;

        }, {
            "../app": 3,
            "../dom/module_container": 14,
            "../dom/top_menu": 32
        }
    ],
    74: [
        function (require, module, exports) {
            'use strict';

            var parse = JSON.parse;


            var fromJSON = function fromJSON(obj) {
                return parse(obj, function (key, value) {
                    return value === 'Infinity' ? Infinity : value;
                });
            };

            module.exports = fromJSON;

        }, {}
    ],
    75: [
        function (require, module, exports) {
            'use strict';

            var toJSON = require('./to_json');
            var fromJSON = require('./from_json');
            var refineByType = require('./refine_by_type');

            module.exports = {
                toJSON: toJSON,
                fromJSON: fromJSON,
                refineByType: refineByType
            };

        }, {
            "./from_json": 74,
            "./refine_by_type": 76,
            "./to_json": 77
        }
    ],
    76: [
        function (require, module, exports) {
            'use strict';

            var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };

            var refineByType = function refineByType(item) {
                switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
                case 'number':
                    return refineNumber(item);
                case 'boolean':
                    return refineBoolean(item);
                default:
                    return refineString(item);
                }
            };

            var refineString = function refineString(str) {
                return str === '' ? ' ' : str;
            };

            var refineNumber = function refineNumber(num) {
                return num === Infinity ? '∞' : num;
            };

            var refineBoolean = function refineBoolean(bool) {
                return bool ? 'T' : 'F';
            };

            module.exports = refineByType;

        }, {}
    ],
    77: [
        function (require, module, exports) {
            'use strict';

            var stringify = JSON.stringify;


            var toJSON = function toJSON(obj) {
                return stringify(obj, function (key, value) {
                    return value === Infinity ? 'Infinity' : value;
                });
            };

            module.exports = toJSON;

        }, {}
    ],
    78: [
        function (require, module, exports) {
            'use strict';

            var isScratchPaper = function isScratchPaper(category, algorithm) {
                return category == 'scratch';
            };

            var getAlgorithmDir = function getAlgorithmDir(category, algorithm) {
                if (isScratchPaper(category)) return './algorithm/scratch_paper/';
                return './algorithm/' + category + '/' + algorithm + '/';
            };

            var getFileDir = function getFileDir(category, algorithm, file) {
                if (isScratchPaper(category)) return './algorithm/scratch_paper/';
                return './algorithm/' + category + '/' + algorithm + '/' + file + '/';
            };

            var renderMathJax = function renderMathJax() {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            };

            module.exports = {
                isScratchPaper: isScratchPaper,
                getAlgorithmDir: getAlgorithmDir,
                getFileDir: getFileDir,
                renderMathJax: renderMathJax
            };

        }, {}
    ],
    79: [
        function (require, module, exports) {
            // shim for using process in browser
            var process = module.exports = {};

            // cached from whatever global is present so that test runners that stub it
            // don't break things.  But we need to wrap it in a try catch in case it is
            // wrapped in strict mode code which doesn't define any globals.  It's inside a
            // function because try/catches deoptimize in certain engines.

            var cachedSetTimeout;
            var cachedClearTimeout;

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }

            function defaultClearTimeout() {
                    throw new Error('clearTimeout has not been defined');
                }
                (function () {
                    try {
                        if (typeof setTimeout === 'function') {
                            cachedSetTimeout = setTimeout;
                        } else {
                            cachedSetTimeout = defaultSetTimout;
                        }
                    } catch (e) {
                        cachedSetTimeout = defaultSetTimout;
                    }
                    try {
                        if (typeof clearTimeout === 'function') {
                            cachedClearTimeout = clearTimeout;
                        } else {
                            cachedClearTimeout = defaultClearTimeout;
                        }
                    } catch (e) {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                }())

            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                    //normal enviroments in sane situations
                    return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedSetTimeout(fun, 0);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }


            }

            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                    //normal enviroments in sane situations
                    return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedClearTimeout(marker);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                        return cachedClearTimeout.call(this, marker);
                    }
                }



            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                    return;
                }
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while (len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        if (currentQueue) {
                            currentQueue[queueIndex].run();
                        }
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
            }

            process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                }
            };

            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function () {
                this.fun.apply(null, this.array);
            };
            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = ''; // empty string to avoid regexp issues
            process.versions = {};

            function noop() {}

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;

            process.listeners = function (name) {
                return []
            }

            process.binding = function (name) {
                throw new Error('process.binding is not supported');
            };

            process.cwd = function () {
                return '/'
            };
            process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function () {
                return 0;
            };

        }, {}
    ],
    80: [
        function (require, module, exports) {
            (function (process, global) {
                /*!
                 * @overview RSVP - a tiny implementation of Promises/A+.
                 * @copyright Copyright (c) 2016 Yehuda Katz, Tom Dale, Stefan Penner and contributors
                 * @license   Licensed under MIT license
                 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
                 * @version   3.5.0
                 */

                (function (global, factory) {
                    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
                        typeof define === 'function' && define.amd ? define(['exports'], factory) :
                        (factory((global.RSVP = global.RSVP || {})));
                }(this, (function (exports) {
                    'use strict';

                    function indexOf(callbacks, callback) {
                        for (var i = 0, l = callbacks.length; i < l; i++) {
                            if (callbacks[i] === callback) {
                                return i;
                            }
                        }

                        return -1;
                    }

                    function callbacksFor(object) {
                        var callbacks = object._promiseCallbacks;

                        if (!callbacks) {
                            callbacks = object._promiseCallbacks = {};
                        }

                        return callbacks;
                    }

                    /**
  @class RSVP.EventTarget
*/
                    var EventTarget = {

                        /**
    `RSVP.EventTarget.mixin` extends an object with EventTarget methods. For
    Example:
     ```javascript
    let object = {};
     RSVP.EventTarget.mixin(object);
     object.on('finished', function(event) {
      // handle event
    });
     object.trigger('finished', { detail: value });
    ```
     `EventTarget.mixin` also works with prototypes:
     ```javascript
    let Person = function() {};
    RSVP.EventTarget.mixin(Person.prototype);
     let yehuda = new Person();
    let tom = new Person();
     yehuda.on('poke', function(event) {
      console.log('Yehuda says OW');
    });
     tom.on('poke', function(event) {
      console.log('Tom says OW');
    });
     yehuda.trigger('poke');
    tom.trigger('poke');
    ```
     @method mixin
    @for RSVP.EventTarget
    @private
    @param {Object} object object to extend with EventTarget methods
  */
                        mixin: function mixin(object) {
                                object['on'] = this['on'];
                                object['off'] = this['off'];
                                object['trigger'] = this['trigger'];
                                object._promiseCallbacks = undefined;
                                return object;
                            },

                            /**
    Registers a callback to be executed when `eventName` is triggered
     ```javascript
    object.on('event', function(eventInfo){
      // handle the event
    });
     object.trigger('event');
    ```
     @method on
    @for RSVP.EventTarget
    @private
    @param {String} eventName name of the event to listen for
    @param {Function} callback function to be called when the event is triggered.
  */
                            on: function on(eventName, callback) {
                                if (typeof callback !== 'function') {
                                    throw new TypeError('Callback must be a function');
                                }

                                var allCallbacks = callbacksFor(this),
                                    callbacks = undefined;

                                callbacks = allCallbacks[eventName];

                                if (!callbacks) {
                                    callbacks = allCallbacks[eventName] = [];
                                }

                                if (indexOf(callbacks, callback) === -1) {
                                    callbacks.push(callback);
                                }
                            },

                            /**
    You can use `off` to stop firing a particular callback for an event:
     ```javascript
    function doStuff() { // do stuff! }
    object.on('stuff', doStuff);
     object.trigger('stuff'); // doStuff will be called
     // Unregister ONLY the doStuff callback
    object.off('stuff', doStuff);
    object.trigger('stuff'); // doStuff will NOT be called
    ```
     If you don't pass a `callback` argument to `off`, ALL callbacks for the
    event will not be executed when the event fires. For example:
     ```javascript
    let callback1 = function(){};
    let callback2 = function(){};
     object.on('stuff', callback1);
    object.on('stuff', callback2);
     object.trigger('stuff'); // callback1 and callback2 will be executed.
     object.off('stuff');
    object.trigger('stuff'); // callback1 and callback2 will not be executed!
    ```
     @method off
    @for RSVP.EventTarget
    @private
    @param {String} eventName event to stop listening to
    @param {Function} callback optional argument. If given, only the function
    given will be removed from the event's callback queue. If no `callback`
    argument is given, all callbacks will be removed from the event's callback
    queue.
  */
                            off: function off(eventName, callback) {
                                var allCallbacks = callbacksFor(this),
                                    callbacks = undefined,
                                    index = undefined;

                                if (!callback) {
                                    allCallbacks[eventName] = [];
                                    return;
                                }

                                callbacks = allCallbacks[eventName];

                                index = indexOf(callbacks, callback);

                                if (index !== -1) {
                                    callbacks.splice(index, 1);
                                }
                            },

                            /**
    Use `trigger` to fire custom events. For example:
     ```javascript
    object.on('foo', function(){
      console.log('foo event happened!');
    });
    object.trigger('foo');
    // 'foo event happened!' logged to the console
    ```
     You can also pass a value as a second argument to `trigger` that will be
    passed as an argument to all event listeners for the event:
     ```javascript
    object.on('foo', function(value){
      console.log(value.name);
    });
     object.trigger('foo', { name: 'bar' });
    // 'bar' logged to the console
    ```
     @method trigger
    @for RSVP.EventTarget
    @private
    @param {String} eventName name of the event to be triggered
    @param {*} options optional value to be passed to any event handlers for
    the given `eventName`
  */
                            trigger: function trigger(eventName, options, label) {
                                var allCallbacks = callbacksFor(this),
                                    callbacks = undefined,
                                    callback = undefined;

                                if (callbacks = allCallbacks[eventName]) {
                                    // Don't cache the callbacks.length since it may grow
                                    for (var i = 0; i < callbacks.length; i++) {
                                        callback = callbacks[i];

                                        callback(options, label);
                                    }
                                }
                            }
                    };

                    var config = {
                        instrument: false
                    };

                    EventTarget['mixin'](config);

                    function configure(name, value) {
                        if (name === 'onerror') {
                            // handle for legacy users that expect the actual
                            // error to be passed to their function added via
                            // `RSVP.configure('onerror', someFunctionHere);`
                            config['on']('error', value);
                            return;
                        }

                        if (arguments.length === 2) {
                            config[name] = value;
                        } else {
                            return config[name];
                        }
                    }

                    function objectOrFunction(x) {
                        return typeof x === 'function' || typeof x === 'object' && x !== null;
                    }

                    function isFunction(x) {
                        return typeof x === 'function';
                    }

                    function isMaybeThenable(x) {
                        return typeof x === 'object' && x !== null;
                    }

                    var _isArray = undefined;
                    if (!Array.isArray) {
                        _isArray = function (x) {
                            return Object.prototype.toString.call(x) === '[object Array]';
                        };
                    } else {
                        _isArray = Array.isArray;
                    }

                    var isArray = _isArray;

                    // Date.now is not available in browsers < IE9
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
                    var now = Date.now || function () {
                        return new Date().getTime();
                    };

                    function F() {}

                    var o_create = Object.create || function (o) {
                        if (arguments.length > 1) {
                            throw new Error('Second argument not supported');
                        }
                        if (typeof o !== 'object') {
                            throw new TypeError('Argument must be an object');
                        }
                        F.prototype = o;
                        return new F();
                    };

                    var queue = [];

                    function scheduleFlush() {
                        setTimeout(function () {
                            for (var i = 0; i < queue.length; i++) {
                                var entry = queue[i];

                                var payload = entry.payload;

                                payload.guid = payload.key + payload.id;
                                payload.childGuid = payload.key + payload.childId;
                                if (payload.error) {
                                    payload.stack = payload.error.stack;
                                }

                                config['trigger'](entry.name, entry.payload);
                            }
                            queue.length = 0;
                        }, 50);
                    }

                    function instrument$1(eventName, promise, child) {
                        if (1 === queue.push({
                            name: eventName,
                            payload: {
                                key: promise._guidKey,
                                id: promise._id,
                                eventName: eventName,
                                detail: promise._result,
                                childId: child && child._id,
                                label: promise._label,
                                timeStamp: now(),
                                error: config["instrument-with-stack"] ? new Error(promise._label) : null
                            }
                        })) {
                            scheduleFlush();
                        }
                    }

                    /**
  `RSVP.Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new RSVP.Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = RSVP.Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {*} object value that the returned promise will be resolved with
  @param {String} label optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
                    function resolve$1(object, label) {
                        /*jshint validthis:true */
                        var Constructor = this;

                        if (object && typeof object === 'object' && object.constructor === Constructor) {
                            return object;
                        }

                        var promise = new Constructor(noop, label);
                        resolve(promise, object);
                        return promise;
                    }

                    function withOwnPromise() {
                        return new TypeError('A promises callback cannot return that same promise.');
                    }

                    function noop() {}

                    var PENDING = void 0;
                    var FULFILLED = 1;
                    var REJECTED = 2;

                    var GET_THEN_ERROR = new ErrorObject();

                    function getThen(promise) {
                        try {
                            return promise.then;
                        } catch (error) {
                            GET_THEN_ERROR.error = error;
                            return GET_THEN_ERROR;
                        }
                    }

                    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
                        try {
                            then$$1.call(value, fulfillmentHandler, rejectionHandler);
                        } catch (e) {
                            return e;
                        }
                    }

                    function handleForeignThenable(promise, thenable, then$$1) {
                        config.async(function (promise) {
                            var sealed = false;
                            var error = tryThen(then$$1, thenable, function (value) {
                                if (sealed) {
                                    return;
                                }
                                sealed = true;
                                if (thenable !== value) {
                                    resolve(promise, value, undefined);
                                } else {
                                    fulfill(promise, value);
                                }
                            }, function (reason) {
                                if (sealed) {
                                    return;
                                }
                                sealed = true;

                                reject(promise, reason);
                            }, 'Settle: ' + (promise._label || ' unknown promise'));

                            if (!sealed && error) {
                                sealed = true;
                                reject(promise, error);
                            }
                        }, promise);
                    }

                    function handleOwnThenable(promise, thenable) {
                        if (thenable._state === FULFILLED) {
                            fulfill(promise, thenable._result);
                        } else if (thenable._state === REJECTED) {
                            thenable._onError = null;
                            reject(promise, thenable._result);
                        } else {
                            subscribe(thenable, undefined, function (value) {
                                if (thenable !== value) {
                                    resolve(promise, value, undefined);
                                } else {
                                    fulfill(promise, value);
                                }
                            }, function (reason) {
                                return reject(promise, reason);
                            });
                        }
                    }

                    function handleMaybeThenable(promise, maybeThenable, then$$1) {
                        if (maybeThenable.constructor === promise.constructor && then$$1 === then && promise.constructor.resolve === resolve$1) {
                            handleOwnThenable(promise, maybeThenable);
                        } else {
                            if (then$$1 === GET_THEN_ERROR) {
                                reject(promise, GET_THEN_ERROR.error);
                                GET_THEN_ERROR.error = null;
                            } else if (then$$1 === undefined) {
                                fulfill(promise, maybeThenable);
                            } else if (isFunction(then$$1)) {
                                handleForeignThenable(promise, maybeThenable, then$$1);
                            } else {
                                fulfill(promise, maybeThenable);
                            }
                        }
                    }

                    function resolve(promise, value) {
                        if (promise === value) {
                            fulfill(promise, value);
                        } else if (objectOrFunction(value)) {
                            handleMaybeThenable(promise, value, getThen(value));
                        } else {
                            fulfill(promise, value);
                        }
                    }

                    function publishRejection(promise) {
                        if (promise._onError) {
                            promise._onError(promise._result);
                        }

                        publish(promise);
                    }

                    function fulfill(promise, value) {
                        if (promise._state !== PENDING) {
                            return;
                        }

                        promise._result = value;
                        promise._state = FULFILLED;

                        if (promise._subscribers.length === 0) {
                            if (config.instrument) {
                                instrument$1('fulfilled', promise);
                            }
                        } else {
                            config.async(publish, promise);
                        }
                    }

                    function reject(promise, reason) {
                        if (promise._state !== PENDING) {
                            return;
                        }
                        promise._state = REJECTED;
                        promise._result = reason;
                        config.async(publishRejection, promise);
                    }

                    function subscribe(parent, child, onFulfillment, onRejection) {
                        var subscribers = parent._subscribers;
                        var length = subscribers.length;

                        parent._onError = null;

                        subscribers[length] = child;
                        subscribers[length + FULFILLED] = onFulfillment;
                        subscribers[length + REJECTED] = onRejection;

                        if (length === 0 && parent._state) {
                            config.async(publish, parent);
                        }
                    }

                    function publish(promise) {
                        var subscribers = promise._subscribers;
                        var settled = promise._state;

                        if (config.instrument) {
                            instrument$1(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
                        }

                        if (subscribers.length === 0) {
                            return;
                        }

                        var child = undefined,
                            callback = undefined,
                            detail = promise._result;

                        for (var i = 0; i < subscribers.length; i += 3) {
                            child = subscribers[i];
                            callback = subscribers[i + settled];

                            if (child) {
                                invokeCallback(settled, child, callback, detail);
                            } else {
                                callback(detail);
                            }
                        }

                        promise._subscribers.length = 0;
                    }

                    function ErrorObject() {
                        this.error = null;
                    }

                    var TRY_CATCH_ERROR = new ErrorObject();

                    function tryCatch(callback, detail) {
                        try {
                            return callback(detail);
                        } catch (e) {
                            TRY_CATCH_ERROR.error = e;
                            return TRY_CATCH_ERROR;
                        }
                    }

                    function invokeCallback(settled, promise, callback, detail) {
                        var hasCallback = isFunction(callback),
                            value = undefined,
                            error = undefined,
                            succeeded = undefined,
                            failed = undefined;

                        if (hasCallback) {
                            value = tryCatch(callback, detail);

                            if (value === TRY_CATCH_ERROR) {
                                failed = true;
                                error = value.error;
                                value.error = null; // release
                            } else {
                                succeeded = true;
                            }

                            if (promise === value) {
                                reject(promise, withOwnPromise());
                                return;
                            }
                        } else {
                            value = detail;
                            succeeded = true;
                        }

                        if (promise._state !== PENDING) {
                            // noop
                        } else if (hasCallback && succeeded) {
                            resolve(promise, value);
                        } else if (failed) {
                            reject(promise, error);
                        } else if (settled === FULFILLED) {
                            fulfill(promise, value);
                        } else if (settled === REJECTED) {
                            reject(promise, value);
                        }
                    }

                    function initializePromise(promise, resolver) {
                        var resolved = false;
                        try {
                            resolver(function (value) {
                                if (resolved) {
                                    return;
                                }
                                resolved = true;
                                resolve(promise, value);
                            }, function (reason) {
                                if (resolved) {
                                    return;
                                }
                                resolved = true;
                                reject(promise, reason);
                            });
                        } catch (e) {
                            reject(promise, e);
                        }
                    }

                    function then(onFulfillment, onRejection, label) {
                        var _arguments = arguments;

                        var parent = this;
                        var state = parent._state;

                        if (state === FULFILLED && !onFulfillment || state === REJECTED && !onRejection) {
                            config.instrument && instrument$1('chained', parent, parent);
                            return parent;
                        }

                        parent._onError = null;

                        var child = new parent.constructor(noop, label);
                        var result = parent._result;

                        config.instrument && instrument$1('chained', parent, child);

                        if (state) {
                            (function () {
                                var callback = _arguments[state - 1];
                                config.async(function () {
                                    return invokeCallback(state, child, callback, result);
                                });
                            })();
                        } else {
                            subscribe(parent, child, onFulfillment, onRejection);
                        }

                        return child;
                    }

                    function makeSettledResult(state, position, value) {
                        if (state === FULFILLED) {
                            return {
                                state: 'fulfilled',
                                value: value
                            };
                        } else {
                            return {
                                state: 'rejected',
                                reason: value
                            };
                        }
                    }

                    function Enumerator(Constructor, input, abortOnReject, label) {
                        this._instanceConstructor = Constructor;
                        this.promise = new Constructor(noop, label);
                        this._abortOnReject = abortOnReject;

                        if (this._validateInput(input)) {
                            this._input = input;
                            this.length = input.length;
                            this._remaining = input.length;

                            this._init();

                            if (this.length === 0) {
                                fulfill(this.promise, this._result);
                            } else {
                                this.length = this.length || 0;
                                this._enumerate();
                                if (this._remaining === 0) {
                                    fulfill(this.promise, this._result);
                                }
                            }
                        } else {
                            reject(this.promise, this._validationError());
                        }
                    }

                    Enumerator.prototype._validateInput = function (input) {
                        return isArray(input);
                    };

                    Enumerator.prototype._validationError = function () {
                        return new Error('Array Methods must be provided an Array');
                    };

                    Enumerator.prototype._init = function () {
                        this._result = new Array(this.length);
                    };

                    Enumerator.prototype._enumerate = function () {
                        var length = this.length;
                        var promise = this.promise;
                        var input = this._input;

                        for (var i = 0; promise._state === PENDING && i < length; i++) {
                            this._eachEntry(input[i], i);
                        }
                    };

                    Enumerator.prototype._settleMaybeThenable = function (entry, i) {
                        var c = this._instanceConstructor;
                        var resolve$$1 = c.resolve;

                        if (resolve$$1 === resolve$1) {
                            var then$$1 = getThen(entry);

                            if (then$$1 === then && entry._state !== PENDING) {
                                entry._onError = null;
                                this._settledAt(entry._state, i, entry._result);
                            } else if (typeof then$$1 !== 'function') {
                                this._remaining--;
                                this._result[i] = this._makeResult(FULFILLED, i, entry);
                            } else if (c === Promise$1) {
                                var promise = new c(noop);
                                handleMaybeThenable(promise, entry, then$$1);
                                this._willSettleAt(promise, i);
                            } else {
                                this._willSettleAt(new c(function (resolve$$1) {
                                    return resolve$$1(entry);
                                }), i);
                            }
                        } else {
                            this._willSettleAt(resolve$$1(entry), i);
                        }
                    };

                    Enumerator.prototype._eachEntry = function (entry, i) {
                        if (isMaybeThenable(entry)) {
                            this._settleMaybeThenable(entry, i);
                        } else {
                            this._remaining--;
                            this._result[i] = this._makeResult(FULFILLED, i, entry);
                        }
                    };

                    Enumerator.prototype._settledAt = function (state, i, value) {
                        var promise = this.promise;

                        if (promise._state === PENDING) {
                            this._remaining--;

                            if (this._abortOnReject && state === REJECTED) {
                                reject(promise, value);
                            } else {
                                this._result[i] = this._makeResult(state, i, value);
                            }
                        }

                        if (this._remaining === 0) {
                            fulfill(promise, this._result);
                        }
                    };

                    Enumerator.prototype._makeResult = function (state, i, value) {
                        return value;
                    };

                    Enumerator.prototype._willSettleAt = function (promise, i) {
                        var enumerator = this;

                        subscribe(promise, undefined, function (value) {
                            return enumerator._settledAt(FULFILLED, i, value);
                        }, function (reason) {
                            return enumerator._settledAt(REJECTED, i, reason);
                        });
                    };

                    /**
  `RSVP.Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = RSVP.resolve(1);
  let promise2 = RSVP.resolve(2);
  let promise3 = RSVP.resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  RSVP.Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `RSVP.all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = RSVP.resolve(1);
  let promise2 = RSVP.reject(new Error("2"));
  let promise3 = RSVP.reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  RSVP.Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
                    function all$1(entries, label) {
                        return new Enumerator(this, entries, true, /* abort on reject */ label).promise;
                    }

                    /**
  `RSVP.Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new RSVP.Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new RSVP.Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  RSVP.Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `RSVP.Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new RSVP.Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new RSVP.Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  RSVP.Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  RSVP.Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} entries array of promises to observe
  @param {String} label optional string for describing the promise returned.
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
                    function race$1(entries, label) {
                        /*jshint validthis:true */
                        var Constructor = this;

                        var promise = new Constructor(noop, label);

                        if (!isArray(entries)) {
                            reject(promise, new TypeError('You must pass an array to race.'));
                            return promise;
                        }

                        for (var i = 0; promise._state === PENDING && i < entries.length; i++) {
                            subscribe(Constructor.resolve(entries[i]), undefined, function (value) {
                                return resolve(promise, value);
                            }, function (reason) {
                                return reject(promise, reason);
                            });
                        }

                        return promise;
                    }

                    /**
  `RSVP.Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new RSVP.Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = RSVP.Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {*} reason value that the returned promise will be rejected with.
  @param {String} label optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
                    function reject$1(reason, label) {
                        /*jshint validthis:true */
                        var Constructor = this;
                        var promise = new Constructor(noop, label);
                        reject(promise, reason);
                        return promise;
                    }

                    var guidKey = 'rsvp_' + now() + '-';
                    var counter = 0;

                    function needsResolver() {
                        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
                    }

                    function needsNew() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    }

                    /**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise’s eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class RSVP.Promise
  @param {function} resolver
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @constructor
*/
                    function Promise$1(resolver, label) {
                        this._id = counter++;
                        this._label = label;
                        this._state = undefined;
                        this._result = undefined;
                        this._subscribers = [];

                        config.instrument && instrument$1('created', this);

                        if (noop !== resolver) {
                            typeof resolver !== 'function' && needsResolver();
                            this instanceof Promise$1 ? initializePromise(this, resolver) : needsNew();
                        }
                    }

                    Promise$1.cast = resolve$1; // deprecated
                    Promise$1.all = all$1;
                    Promise$1.race = race$1;
                    Promise$1.resolve = resolve$1;
                    Promise$1.reject = reject$1;

                    Promise$1.prototype = {
                        constructor: Promise$1,

                        _guidKey: guidKey,

                        _onError: function _onError(reason) {
                                var promise = this;
                                config.after(function () {
                                    if (promise._onError) {
                                        config['trigger']('error', reason, promise._label);
                                    }
                                });
                            },

                            /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we\'re unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we\'re unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfillment
    @param {Function} onRejection
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise}
  */
                            then: then,

                        /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn\'t find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise}
  */
                        'catch': function _catch(onRejection, label) {
                                return this.then(undefined, onRejection, label);
                            },

                            /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuthor();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuthor();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise}
  */
                            'finally': function _finally(callback, label) {
                                var promise = this;
                                var constructor = promise.constructor;

                                return promise.then(function (value) {
                                    return constructor.resolve(callback()).then(function () {
                                        return value;
                                    });
                                }, function (reason) {
                                    return constructor.resolve(callback()).then(function () {
                                        throw reason;
                                    });
                                }, label);
                            }
                    };

                    function Result() {
                        this.value = undefined;
                    }

                    var ERROR = new Result();
                    var GET_THEN_ERROR$1 = new Result();

                    function getThen$1(obj) {
                        try {
                            return obj.then;
                        } catch (error) {
                            ERROR.value = error;
                            return ERROR;
                        }
                    }

                    function tryApply(f, s, a) {
                        try {
                            f.apply(s, a);
                        } catch (error) {
                            ERROR.value = error;
                            return ERROR;
                        }
                    }

                    function makeObject(_, argumentNames) {
                        var obj = {};
                        var length = _.length;
                        var args = new Array(length);

                        for (var x = 0; x < length; x++) {
                            args[x] = _[x];
                        }

                        for (var i = 0; i < argumentNames.length; i++) {
                            var _name = argumentNames[i];
                            obj[_name] = args[i + 1];
                        }

                        return obj;
                    }

                    function arrayResult(_) {
                        var length = _.length;
                        var args = new Array(length - 1);

                        for (var i = 1; i < length; i++) {
                            args[i - 1] = _[i];
                        }

                        return args;
                    }

                    function wrapThenable(_then, promise) {
                        return {
                            then: function then(onFulFillment, onRejection) {
                                return _then.call(promise, onFulFillment, onRejection);
                            }
                        };
                    }

                    /**
  `RSVP.denodeify` takes a 'node-style' function and returns a function that
  will return an `RSVP.Promise`. You can use `denodeify` in Node.js or the
  browser when you'd prefer to use promises over using callbacks. For example,
  `denodeify` transforms the following:

  ```javascript
  let fs = require('fs');

  fs.readFile('myfile.txt', function(err, data){
    if (err) return handleError(err);
    handleData(data);
  });
  ```

  into:

  ```javascript
  let fs = require('fs');
  let readFile = RSVP.denodeify(fs.readFile);

  readFile('myfile.txt').then(handleData, handleError);
  ```

  If the node function has multiple success parameters, then `denodeify`
  just returns the first one:

  ```javascript
  let request = RSVP.denodeify(require('request'));

  request('http://example.com').then(function(res) {
    // ...
  });
  ```

  However, if you need all success parameters, setting `denodeify`'s
  second parameter to `true` causes it to return all success parameters
  as an array:

  ```javascript
  let request = RSVP.denodeify(require('request'), true);

  request('http://example.com').then(function(result) {
    // result[0] -> res
    // result[1] -> body
  });
  ```

  Or if you pass it an array with names it returns the parameters as a hash:

  ```javascript
  let request = RSVP.denodeify(require('request'), ['res', 'body']);

  request('http://example.com').then(function(result) {
    // result.res
    // result.body
  });
  ```

  Sometimes you need to retain the `this`:

  ```javascript
  let app = require('express')();
  let render = RSVP.denodeify(app.render.bind(app));
  ```

  The denodified function inherits from the original function. It works in all
  environments, except IE 10 and below. Consequently all properties of the original
  function are available to you. However, any properties you change on the
  denodeified function won't be changed on the original function. Example:

  ```javascript
  let request = RSVP.denodeify(require('request')),
      cookieJar = request.jar(); // <- Inheritance is used here

  request('http://example.com', {jar: cookieJar}).then(function(res) {
    // cookieJar.cookies holds now the cookies returned by example.com
  });
  ```

  Using `denodeify` makes it easier to compose asynchronous operations instead
  of using callbacks. For example, instead of:

  ```javascript
  let fs = require('fs');

  fs.readFile('myfile.txt', function(err, data){
    if (err) { ... } // Handle error
    fs.writeFile('myfile2.txt', data, function(err){
      if (err) { ... } // Handle error
      console.log('done')
    });
  });
  ```

  you can chain the operations together using `then` from the returned promise:

  ```javascript
  let fs = require('fs');
  let readFile = RSVP.denodeify(fs.readFile);
  let writeFile = RSVP.denodeify(fs.writeFile);

  readFile('myfile.txt').then(function(data){
    return writeFile('myfile2.txt', data);
  }).then(function(){
    console.log('done')
  }).catch(function(error){
    // Handle error
  });
  ```

  @method denodeify
  @static
  @for RSVP
  @param {Function} nodeFunc a 'node-style' function that takes a callback as
  its last argument. The callback expects an error to be passed as its first
  argument (if an error occurred, otherwise null), and the value from the
  operation as its second argument ('function(err, value){ }').
  @param {Boolean|Array} [options] An optional paramter that if set
  to `true` causes the promise to fulfill with the callback's success arguments
  as an array. This is useful if the node function has multiple success
  paramters. If you set this paramter to an array with names, the promise will
  fulfill with a hash with these names as keys and the success parameters as
  values.
  @return {Function} a function that wraps `nodeFunc` to return an
  `RSVP.Promise`
  @static
*/
                    function denodeify$1(nodeFunc, options) {
                        var fn = function fn() {
                            var self = this;
                            var l = arguments.length;
                            var args = new Array(l + 1);
                            var promiseInput = false;

                            for (var i = 0; i < l; ++i) {
                                var arg = arguments[i];

                                if (!promiseInput) {
                                    // TODO: clean this up
                                    promiseInput = needsPromiseInput(arg);
                                    if (promiseInput === GET_THEN_ERROR$1) {
                                        var p = new Promise$1(noop);
                                        reject(p, GET_THEN_ERROR$1.value);
                                        return p;
                                    } else if (promiseInput && promiseInput !== true) {
                                        arg = wrapThenable(promiseInput, arg);
                                    }
                                }
                                args[i] = arg;
                            }

                            var promise = new Promise$1(noop);

                            args[l] = function (err, val) {
                                if (err) reject(promise, err);
                                else if (options === undefined) resolve(promise, val);
                                else if (options === true) resolve(promise, arrayResult(arguments));
                                else if (isArray(options)) resolve(promise, makeObject(arguments, options));
                                else resolve(promise, val);
                            };

                            if (promiseInput) {
                                return handlePromiseInput(promise, args, nodeFunc, self);
                            } else {
                                return handleValueInput(promise, args, nodeFunc, self);
                            }
                        };

                        fn.__proto__ = nodeFunc;

                        return fn;
                    }

                    function handleValueInput(promise, args, nodeFunc, self) {
                        var result = tryApply(nodeFunc, self, args);
                        if (result === ERROR) {
                            reject(promise, result.value);
                        }
                        return promise;
                    }

                    function handlePromiseInput(promise, args, nodeFunc, self) {
                        return Promise$1.all(args).then(function (args) {
                            var result = tryApply(nodeFunc, self, args);
                            if (result === ERROR) {
                                reject(promise, result.value);
                            }
                            return promise;
                        });
                    }

                    function needsPromiseInput(arg) {
                        if (arg && typeof arg === 'object') {
                            if (arg.constructor === Promise$1) {
                                return true;
                            } else {
                                return getThen$1(arg);
                            }
                        } else {
                            return false;
                        }
                    }

                    /**
  This is a convenient alias for `RSVP.Promise.all`.

  @method all
  @static
  @for RSVP
  @param {Array} array Array of promises.
  @param {String} label An optional label. This is useful
  for tooling.
*/
                    function all$3(array, label) {
                        return Promise$1.all(array, label);
                    }

                    function AllSettled(Constructor, entries, label) {
                        this._superConstructor(Constructor, entries, false, /* don't abort on reject */ label);
                    }

                    AllSettled.prototype = o_create(Enumerator.prototype);
                    AllSettled.prototype._superConstructor = Enumerator;
                    AllSettled.prototype._makeResult = makeSettledResult;
                    AllSettled.prototype._validationError = function () {
                        return new Error('allSettled must be called with an array');
                    };

                    /**
  `RSVP.allSettled` is similar to `RSVP.all`, but instead of implementing
  a fail-fast method, it waits until all the promises have returned and
  shows you all the results. This is useful if you want to handle multiple
  promises' failure states together as a set.

  Returns a promise that is fulfilled when all the given promises have been
  settled. The return promise is fulfilled with an array of the states of
  the promises passed into the `promises` array argument.

  Each state object will either indicate fulfillment or rejection, and
  provide the corresponding value or reason. The states will take one of
  the following formats:

  ```javascript
  { state: 'fulfilled', value: value }
    or
  { state: 'rejected', reason: reason }
  ```

  Example:

  ```javascript
  let promise1 = RSVP.Promise.resolve(1);
  let promise2 = RSVP.Promise.reject(new Error('2'));
  let promise3 = RSVP.Promise.reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];

  RSVP.allSettled(promises).then(function(array){
    // array == [
    //   { state: 'fulfilled', value: 1 },
    //   { state: 'rejected', reason: Error },
    //   { state: 'rejected', reason: Error }
    // ]
    // Note that for the second item, reason.message will be '2', and for the
    // third item, reason.message will be '3'.
  }, function(error) {
    // Not run. (This block would only be called if allSettled had failed,
    // for instance if passed an incorrect argument type.)
  });
  ```

  @method allSettled
  @static
  @for RSVP
  @param {Array} entries
  @param {String} label - optional string that describes the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled with an array of the settled
  states of the constituent promises.
*/
                    function allSettled$1(entries, label) {
                        return new AllSettled(Promise$1, entries, label).promise;
                    }

                    /**
  This is a convenient alias for `RSVP.Promise.race`.

  @method race
  @static
  @for RSVP
  @param {Array} array Array of promises.
  @param {String} label An optional label. This is useful
  for tooling.
 */
                    function race$3(array, label) {
                        return Promise$1.race(array, label);
                    }

                    function PromiseHash(Constructor, object, label) {
                        this._superConstructor(Constructor, object, true, label);
                    }

                    PromiseHash.prototype = o_create(Enumerator.prototype);
                    PromiseHash.prototype._superConstructor = Enumerator;
                    PromiseHash.prototype._init = function () {
                        this._result = {};
                    };

                    PromiseHash.prototype._validateInput = function (input) {
                        return input && typeof input === 'object';
                    };

                    PromiseHash.prototype._validationError = function () {
                        return new Error('Promise.hash must be called with an object');
                    };

                    PromiseHash.prototype._enumerate = function () {
                        var enumerator = this;
                        var promise = enumerator.promise;
                        var input = enumerator._input;
                        var results = [];

                        for (var key in input) {
                            if (promise._state === PENDING && Object.prototype.hasOwnProperty.call(input, key)) {
                                results.push({
                                    position: key,
                                    entry: input[key]
                                });
                            }
                        }

                        var length = results.length;
                        enumerator._remaining = length;
                        var result = undefined;

                        for (var i = 0; promise._state === PENDING && i < length; i++) {
                            result = results[i];
                            enumerator._eachEntry(result.entry, result.position);
                        }
                    };

                    /**
  `RSVP.hash` is similar to `RSVP.all`, but takes an object instead of an array
  for its `promises` argument.

  Returns a promise that is fulfilled when all the given promises have been
  fulfilled, or rejected if any of them become rejected. The returned promise
  is fulfilled with a hash that has the same key names as the `promises` object
  argument. If any of the values in the object are not promises, they will
  simply be copied over to the fulfilled object.

  Example:

  ```javascript
  let promises = {
    myPromise: RSVP.resolve(1),
    yourPromise: RSVP.resolve(2),
    theirPromise: RSVP.resolve(3),
    notAPromise: 4
  };

  RSVP.hash(promises).then(function(hash){
    // hash here is an object that looks like:
    // {
    //   myPromise: 1,
    //   yourPromise: 2,
    //   theirPromise: 3,
    //   notAPromise: 4
    // }
  });
  ````

  If any of the `promises` given to `RSVP.hash` are rejected, the first promise
  that is rejected will be given as the reason to the rejection handler.

  Example:

  ```javascript
  let promises = {
    myPromise: RSVP.resolve(1),
    rejectedPromise: RSVP.reject(new Error('rejectedPromise')),
    anotherRejectedPromise: RSVP.reject(new Error('anotherRejectedPromise')),
  };

  RSVP.hash(promises).then(function(hash){
    // Code here never runs because there are rejected promises!
  }, function(reason) {
    // reason.message === 'rejectedPromise'
  });
  ```

  An important note: `RSVP.hash` is intended for plain JavaScript objects that
  are just a set of keys and values. `RSVP.hash` will NOT preserve prototype
  chains.

  Example:

  ```javascript
  function MyConstructor(){
    this.example = RSVP.resolve('Example');
  }

  MyConstructor.prototype = {
    protoProperty: RSVP.resolve('Proto Property')
  };

  let myObject = new MyConstructor();

  RSVP.hash(myObject).then(function(hash){
    // protoProperty will not be present, instead you will just have an
    // object that looks like:
    // {
    //   example: 'Example'
    // }
    //
    // hash.hasOwnProperty('protoProperty'); // false
    // 'undefined' === typeof hash.protoProperty
  });
  ```

  @method hash
  @static
  @for RSVP
  @param {Object} object
  @param {String} label optional string that describes the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all properties of `promises`
  have been fulfilled, or rejected if any of them become rejected.
*/
                    function hash$1(object, label) {
                        return new PromiseHash(Promise$1, object, label).promise;
                    }

                    function HashSettled(Constructor, object, label) {
                        this._superConstructor(Constructor, object, false, label);
                    }

                    HashSettled.prototype = o_create(PromiseHash.prototype);
                    HashSettled.prototype._superConstructor = Enumerator;
                    HashSettled.prototype._makeResult = makeSettledResult;

                    HashSettled.prototype._validationError = function () {
                        return new Error('hashSettled must be called with an object');
                    };

                    /**
  `RSVP.hashSettled` is similar to `RSVP.allSettled`, but takes an object
  instead of an array for its `promises` argument.

  Unlike `RSVP.all` or `RSVP.hash`, which implement a fail-fast method,
  but like `RSVP.allSettled`, `hashSettled` waits until all the
  constituent promises have returned and then shows you all the results
  with their states and values/reasons. This is useful if you want to
  handle multiple promises' failure states together as a set.

  Returns a promise that is fulfilled when all the given promises have been
  settled, or rejected if the passed parameters are invalid.

  The returned promise is fulfilled with a hash that has the same key names as
  the `promises` object argument. If any of the values in the object are not
  promises, they will be copied over to the fulfilled object and marked with state
  'fulfilled'.

  Example:

  ```javascript
  let promises = {
    myPromise: RSVP.Promise.resolve(1),
    yourPromise: RSVP.Promise.resolve(2),
    theirPromise: RSVP.Promise.resolve(3),
    notAPromise: 4
  };

  RSVP.hashSettled(promises).then(function(hash){
    // hash here is an object that looks like:
    // {
    //   myPromise: { state: 'fulfilled', value: 1 },
    //   yourPromise: { state: 'fulfilled', value: 2 },
    //   theirPromise: { state: 'fulfilled', value: 3 },
    //   notAPromise: { state: 'fulfilled', value: 4 }
    // }
  });
  ```

  If any of the `promises` given to `RSVP.hash` are rejected, the state will
  be set to 'rejected' and the reason for rejection provided.

  Example:

  ```javascript
  let promises = {
    myPromise: RSVP.Promise.resolve(1),
    rejectedPromise: RSVP.Promise.reject(new Error('rejection')),
    anotherRejectedPromise: RSVP.Promise.reject(new Error('more rejection')),
  };

  RSVP.hashSettled(promises).then(function(hash){
    // hash here is an object that looks like:
    // {
    //   myPromise:              { state: 'fulfilled', value: 1 },
    //   rejectedPromise:        { state: 'rejected', reason: Error },
    //   anotherRejectedPromise: { state: 'rejected', reason: Error },
    // }
    // Note that for rejectedPromise, reason.message == 'rejection',
    // and for anotherRejectedPromise, reason.message == 'more rejection'.
  });
  ```

  An important note: `RSVP.hashSettled` is intended for plain JavaScript objects that
  are just a set of keys and values. `RSVP.hashSettled` will NOT preserve prototype
  chains.

  Example:

  ```javascript
  function MyConstructor(){
    this.example = RSVP.Promise.resolve('Example');
  }

  MyConstructor.prototype = {
    protoProperty: RSVP.Promise.resolve('Proto Property')
  };

  let myObject = new MyConstructor();

  RSVP.hashSettled(myObject).then(function(hash){
    // protoProperty will not be present, instead you will just have an
    // object that looks like:
    // {
    //   example: { state: 'fulfilled', value: 'Example' }
    // }
    //
    // hash.hasOwnProperty('protoProperty'); // false
    // 'undefined' === typeof hash.protoProperty
  });
  ```

  @method hashSettled
  @for RSVP
  @param {Object} object
  @param {String} label optional string that describes the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when when all properties of `promises`
  have been settled.
  @static
*/
                    function hashSettled$1(object, label) {
                        return new HashSettled(Promise$1, object, label).promise;
                    }

                    /**
  `RSVP.rethrow` will rethrow an error on the next turn of the JavaScript event
  loop in order to aid debugging.

  Promises A+ specifies that any exceptions that occur with a promise must be
  caught by the promises implementation and bubbled to the last handler. For
  this reason, it is recommended that you always specify a second rejection
  handler function to `then`. However, `RSVP.rethrow` will throw the exception
  outside of the promise, so it bubbles up to your console if in the browser,
  or domain/cause uncaught exception in Node. `rethrow` will also throw the
  error again so the error can be handled by the promise per the spec.

  ```javascript
  function throws(){
    throw new Error('Whoops!');
  }

  let promise = new RSVP.Promise(function(resolve, reject){
    throws();
  });

  promise.catch(RSVP.rethrow).then(function(){
    // Code here doesn't run because the promise became rejected due to an
    // error!
  }, function (err){
    // handle the error here
  });
  ```

  The 'Whoops' error will be thrown on the next turn of the event loop
  and you can watch for it in your console. You can also handle it using a
  rejection handler given to `.then` or `.catch` on the returned promise.

  @method rethrow
  @static
  @for RSVP
  @param {Error} reason reason the promise became rejected.
  @throws Error
  @static
*/
                    function rethrow$1(reason) {
                        setTimeout(function () {
                            throw reason;
                        });
                        throw reason;
                    }

                    /**
  `RSVP.defer` returns an object similar to jQuery's `$.Deferred`.
  `RSVP.defer` should be used when porting over code reliant on `$.Deferred`'s
  interface. New code should use the `RSVP.Promise` constructor instead.

  The object returned from `RSVP.defer` is a plain object with three properties:

  * promise - an `RSVP.Promise`.
  * reject - a function that causes the `promise` property on this object to
    become rejected
  * resolve - a function that causes the `promise` property on this object to
    become fulfilled.

  Example:

   ```javascript
   let deferred = RSVP.defer();

   deferred.resolve("Success!");

   deferred.promise.then(function(value){
     // value here is "Success!"
   });
   ```

  @method defer
  @static
  @for RSVP
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Object}
 */
                    function defer$1(label) {
                        var deferred = {
                            resolve: undefined,
                            reject: undefined
                        };

                        deferred.promise = new Promise$1(function (resolve, reject) {
                            deferred.resolve = resolve;
                            deferred.reject = reject;
                        }, label);

                        return deferred;
                    }

                    /**
 `RSVP.map` is similar to JavaScript's native `map` method, except that it
  waits for all promises to become fulfilled before running the `mapFn` on
  each item in given to `promises`. `RSVP.map` returns a promise that will
  become fulfilled with the result of running `mapFn` on the values the promises
  become fulfilled with.

  For example:

  ```javascript

  let promise1 = RSVP.resolve(1);
  let promise2 = RSVP.resolve(2);
  let promise3 = RSVP.resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  let mapFn = function(item){
    return item + 1;
  };

  RSVP.map(promises, mapFn).then(function(result){
    // result is [ 2, 3, 4 ]
  });
  ```

  If any of the `promises` given to `RSVP.map` are rejected, the first promise
  that is rejected will be given as an argument to the returned promise's
  rejection handler. For example:

  ```javascript
  let promise1 = RSVP.resolve(1);
  let promise2 = RSVP.reject(new Error('2'));
  let promise3 = RSVP.reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];

  let mapFn = function(item){
    return item + 1;
  };

  RSVP.map(promises, mapFn).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(reason) {
    // reason.message === '2'
  });
  ```

  `RSVP.map` will also wait if a promise is returned from `mapFn`. For example,
  say you want to get all comments from a set of blog posts, but you need
  the blog posts first because they contain a url to those comments.

  ```javscript

  let mapFn = function(blogPost){
    // getComments does some ajax and returns an RSVP.Promise that is fulfilled
    // with some comments data
    return getComments(blogPost.comments_url);
  };

  // getBlogPosts does some ajax and returns an RSVP.Promise that is fulfilled
  // with some blog post data
  RSVP.map(getBlogPosts(), mapFn).then(function(comments){
    // comments is the result of asking the server for the comments
    // of all blog posts returned from getBlogPosts()
  });
  ```

  @method map
  @static
  @for RSVP
  @param {Array} promises
  @param {Function} mapFn function to be called on each fulfilled promise.
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled with the result of calling
  `mapFn` on each fulfilled promise or value when they become fulfilled.
   The promise will be rejected if any of the given `promises` become rejected.
  @static
*/
                    function map$1(promises, mapFn, label) {
                        return Promise$1.all(promises, label).then(function (values) {
                            if (!isFunction(mapFn)) {
                                throw new TypeError("You must pass a function as map's second argument.");
                            }

                            var length = values.length;
                            var results = new Array(length);

                            for (var i = 0; i < length; i++) {
                                results[i] = mapFn(values[i]);
                            }

                            return Promise$1.all(results, label);
                        });
                    }

                    /**
  This is a convenient alias for `RSVP.Promise.resolve`.

  @method resolve
  @static
  @for RSVP
  @param {*} value value that the returned promise will be resolved with
  @param {String} label optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
                    function resolve$3(value, label) {
                        return Promise$1.resolve(value, label);
                    }

                    /**
  This is a convenient alias for `RSVP.Promise.reject`.

  @method reject
  @static
  @for RSVP
  @param {*} reason value that the returned promise will be rejected with.
  @param {String} label optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
                    function reject$3(reason, label) {
                        return Promise$1.reject(reason, label);
                    }

                    /**
 `RSVP.filter` is similar to JavaScript's native `filter` method, except that it
  waits for all promises to become fulfilled before running the `filterFn` on
  each item in given to `promises`. `RSVP.filter` returns a promise that will
  become fulfilled with the result of running `filterFn` on the values the
  promises become fulfilled with.

  For example:

  ```javascript

  let promise1 = RSVP.resolve(1);
  let promise2 = RSVP.resolve(2);
  let promise3 = RSVP.resolve(3);

  let promises = [promise1, promise2, promise3];

  let filterFn = function(item){
    return item > 1;
  };

  RSVP.filter(promises, filterFn).then(function(result){
    // result is [ 2, 3 ]
  });
  ```

  If any of the `promises` given to `RSVP.filter` are rejected, the first promise
  that is rejected will be given as an argument to the returned promise's
  rejection handler. For example:

  ```javascript
  let promise1 = RSVP.resolve(1);
  let promise2 = RSVP.reject(new Error('2'));
  let promise3 = RSVP.reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];

  let filterFn = function(item){
    return item > 1;
  };

  RSVP.filter(promises, filterFn).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(reason) {
    // reason.message === '2'
  });
  ```

  `RSVP.filter` will also wait for any promises returned from `filterFn`.
  For instance, you may want to fetch a list of users then return a subset
  of those users based on some asynchronous operation:

  ```javascript

  let alice = { name: 'alice' };
  let bob   = { name: 'bob' };
  let users = [ alice, bob ];

  let promises = users.map(function(user){
    return RSVP.resolve(user);
  });

  let filterFn = function(user){
    // Here, Alice has permissions to create a blog post, but Bob does not.
    return getPrivilegesForUser(user).then(function(privs){
      return privs.can_create_blog_post === true;
    });
  };
  RSVP.filter(promises, filterFn).then(function(users){
    // true, because the server told us only Alice can create a blog post.
    users.length === 1;
    // false, because Alice is the only user present in `users`
    users[0] === bob;
  });
  ```

  @method filter
  @static
  @for RSVP
  @param {Array} promises
  @param {Function} filterFn - function to be called on each resolved value to
  filter the final results.
  @param {String} label optional string describing the promise. Useful for
  tooling.
  @return {Promise}
*/

                    function resolveAll(promises, label) {
                        return Promise$1.all(promises, label);
                    }

                    function resolveSingle(promise, label) {
                        return Promise$1.resolve(promise, label).then(function (promises) {
                            return resolveAll(promises, label);
                        });
                    }

                    function filter$1(promises, filterFn, label) {
                        var promise = isArray(promises) ? resolveAll(promises, label) : resolveSingle(promises, label);
                        return promise.then(function (values) {
                            if (!isFunction(filterFn)) {
                                throw new TypeError("You must pass a function as filter's second argument.");
                            }

                            var length = values.length;
                            var filtered = new Array(length);

                            for (var i = 0; i < length; i++) {
                                filtered[i] = filterFn(values[i]);
                            }

                            return resolveAll(filtered, label).then(function (filtered) {
                                var results = new Array(length);
                                var newLength = 0;

                                for (var i = 0; i < length; i++) {
                                    if (filtered[i]) {
                                        results[newLength] = values[i];
                                        newLength++;
                                    }
                                }

                                results.length = newLength;

                                return results;
                            });
                        });
                    }

                    var len = 0;
                    var vertxNext = undefined;

                    function asap$1(callback, arg) {
                        queue$1[len] = callback;
                        queue$1[len + 1] = arg;
                        len += 2;
                        if (len === 2) {
                            // If len is 1, that means that we need to schedule an async flush.
                            // If additional callbacks are queued before the queue is flushed, they
                            // will be processed by this flush that we are scheduling.
                            scheduleFlush$1();
                        }
                    }

                    var browserWindow = typeof window !== 'undefined' ? window : undefined;
                    var browserGlobal = browserWindow || {};
                    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
                    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

                    // test for web worker but not in IE10
                    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

                    // node
                    function useNextTick() {
                        var nextTick = process.nextTick;
                        // node version 0.10.x displays a deprecation warning when nextTick is used recursively
                        // setImmediate should be used instead instead
                        var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
                        if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
                            nextTick = setImmediate;
                        }
                        return function () {
                            return nextTick(flush);
                        };
                    }

                    // vertx
                    function useVertxTimer() {
                        if (typeof vertxNext !== 'undefined') {
                            return function () {
                                vertxNext(flush);
                            };
                        }
                        return useSetTimeout();
                    }

                    function useMutationObserver() {
                        var iterations = 0;
                        var observer = new BrowserMutationObserver(flush);
                        var node = document.createTextNode('');
                        observer.observe(node, {
                            characterData: true
                        });

                        return function () {
                            return node.data = iterations = ++iterations % 2;
                        };
                    }

                    // web worker
                    function useMessageChannel() {
                        var channel = new MessageChannel();
                        channel.port1.onmessage = flush;
                        return function () {
                            return channel.port2.postMessage(0);
                        };
                    }

                    function useSetTimeout() {
                        return function () {
                            return setTimeout(flush, 1);
                        };
                    }

                    var queue$1 = new Array(1000);

                    function flush() {
                        for (var i = 0; i < len; i += 2) {
                            var callback = queue$1[i];
                            var arg = queue$1[i + 1];

                            callback(arg);

                            queue$1[i] = undefined;
                            queue$1[i + 1] = undefined;
                        }

                        len = 0;
                    }

                    function attemptVertex() {
                        try {
                            var r = require;
                            var vertx = r('vertx');
                            vertxNext = vertx.runOnLoop || vertx.runOnContext;
                            return useVertxTimer();
                        } catch (e) {
                            return useSetTimeout();
                        }
                    }

                    var scheduleFlush$1 = undefined;
                    // Decide what async method to use to triggering processing of queued callbacks:
                    if (isNode) {
                        scheduleFlush$1 = useNextTick();
                    } else if (BrowserMutationObserver) {
                        scheduleFlush$1 = useMutationObserver();
                    } else if (isWorker) {
                        scheduleFlush$1 = useMessageChannel();
                    } else if (browserWindow === undefined && typeof require === 'function') {
                        scheduleFlush$1 = attemptVertex();
                    } else {
                        scheduleFlush$1 = useSetTimeout();
                    }

                    var platform = undefined;

                    /* global self */
                    if (typeof self === 'object') {
                        platform = self;

                        /* global global */
                    } else if (typeof global === 'object') {
                        platform = global;
                    } else {
                        throw new Error('no global: `self` or `global` found');
                    }

                    var _async$filter;

                    function _defineProperty(obj, key, value) {
                        if (key in obj) {
                            Object.defineProperty(obj, key, {
                                value: value,
                                enumerable: true,
                                configurable: true,
                                writable: true
                            });
                        } else {
                            obj[key] = value;
                        }
                        return obj;
                    }

                    // defaults

                    // the default export here is for backwards compat:
                    //   https://github.com/tildeio/rsvp.js/issues/434
                    config.async = asap$1;
                    config.after = function (cb) {
                        return setTimeout(cb, 0);
                    };
                    var cast = resolve$3;

                    var async = function async(callback, arg) {
                        return config.async(callback, arg);
                    };

                    function on() {
                        config['on'].apply(config, arguments);
                    }

                    function off() {
                        config['off'].apply(config, arguments);
                    }

                    // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
                    if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
                        var callbacks = window['__PROMISE_INSTRUMENTATION__'];
                        configure('instrument', true);
                        for (var eventName in callbacks) {
                            if (callbacks.hasOwnProperty(eventName)) {
                                on(eventName, callbacks[eventName]);
                            }
                        }
                    }
                    var rsvp = (_async$filter = {
                        asap: asap$1,
                        cast: cast,
                        Promise: Promise$1,
                        EventTarget: EventTarget,
                        all: all$3,
                        allSettled: allSettled$1,
                        race: race$3,
                        hash: hash$1,
                        hashSettled: hashSettled$1,
                        rethrow: rethrow$1,
                        defer: defer$1,
                        denodeify: denodeify$1,
                        configure: configure,
                        on: on,
                        off: off,
                        resolve: resolve$3,
                        reject: reject$3,
                        map: map$1
                    }, _defineProperty(_async$filter, 'async', async), _defineProperty(_async$filter, 'filter', // babel seems to error if async isn't a computed prop here...
                        filter$1), _async$filter);

                    exports['default'] = rsvp;
                    exports.asap = asap$1;
                    exports.cast = cast;
                    exports.Promise = Promise$1;
                    exports.EventTarget = EventTarget;
                    exports.all = all$3;
                    exports.allSettled = allSettled$1;
                    exports.race = race$3;
                    exports.hash = hash$1;
                    exports.hashSettled = hashSettled$1;
                    exports.rethrow = rethrow$1;
                    exports.defer = defer$1;
                    exports.denodeify = denodeify$1;
                    exports.configure = configure;
                    exports.on = on;
                    exports.off = off;
                    exports.resolve = resolve$3;
                    exports.reject = reject$3;
                    exports.map = map$1;
                    exports.async = async;
                    exports.filter = filter$1;

                    Object.defineProperty(exports, '__esModule', {
                        value: true
                    });

                })));



            }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {
            "_process": 79
        }
    ]
}, {}, [36])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcHAvY2FjaGUuanMiLCJqcy9hcHAvY29uc3RydWN0b3IuanMiLCJqcy9hcHAvaW5kZXguanMiLCJqcy9jcmVhdGUvYXJyYXkxZC5qcyIsImpzL2NyZWF0ZS9hcnJheTJkLmpzIiwianMvY3JlYXRlL2luZGV4LmpzIiwianMvY3JlYXRlL3V0aWwuanMiLCJqcy9kb20vYWRkX2NhdGVnb3JpZXMuanMiLCJqcy9kb20vYWRkX2ZpbGVzLmpzIiwianMvZG9tL2VuYWJsZV9mdWxsc2NyZWVuLmpzIiwianMvZG9tL2VuYWJsZV9zZWFyY2guanMiLCJqcy9kb20vaW5kZXguanMiLCJqcy9kb20vbG9hZGluZ19zbGlkZXIuanMiLCJqcy9kb20vbW9kdWxlX2NvbnRhaW5lci5qcyIsImpzL2RvbS9yZXNpemVfd29ya3NwYWNlLmpzIiwianMvZG9tL3NldHVwL2luZGV4LmpzIiwianMvZG9tL3NldHVwL3NldHVwX2RpdmlkZXJzLmpzIiwianMvZG9tL3NldHVwL3NldHVwX2RvY3VtZW50LmpzIiwianMvZG9tL3NldHVwL3NldHVwX2ZpbGVzX2Jhci5qcyIsImpzL2RvbS9zZXR1cC9zZXR1cF9pbnRlcnZhbC5qcyIsImpzL2RvbS9zZXR1cC9zZXR1cF9tb2R1bGVfY29udGFpbmVyLmpzIiwianMvZG9tL3NldHVwL3NldHVwX3NpZGVfbWVudS5qcyIsImpzL2RvbS9zZXR1cC9zZXR1cF90YWJfY29udGFpbmVyLmpzIiwianMvZG9tL3NldHVwL3NldHVwX3RvcF9tZW51LmpzIiwianMvZG9tL3NldHVwL3NldHVwX3dpbmRvdy5qcyIsImpzL2RvbS9zaG93X2FsZ29yaXRobS5qcyIsImpzL2RvbS9zaG93X2Rlc2NyaXB0aW9uLmpzIiwianMvZG9tL3Nob3dfZmlyc3RfYWxnb3JpdGhtLmpzIiwianMvZG9tL3Nob3dfcmVxdWVzdGVkX2FsZ29yaXRobS5qcyIsImpzL2RvbS9zaG93X3dpa2kuanMiLCJqcy9kb20vdG9hc3QuanMiLCJqcy9kb20vdG9wX21lbnUuanMiLCJqcy9lZGl0b3IvY3JlYXRlLmpzIiwianMvZWRpdG9yL2V4ZWN1dG9yLmpzIiwianMvZWRpdG9yL2luZGV4LmpzIiwianMvaW5kZXguanMiLCJqcy9tb2R1bGUvZGF0YS9hcnJheTFkLmpzIiwianMvbW9kdWxlL2RhdGEvYXJyYXkyZC5qcyIsImpzL21vZHVsZS9kYXRhL2Nvb3JkaW5hdGVfc3lzdGVtLmpzIiwianMvbW9kdWxlL2RhdGEvZGlyZWN0ZWRfZ3JhcGguanMiLCJqcy9tb2R1bGUvZGF0YS9pbmRleC5qcyIsImpzL21vZHVsZS9kYXRhL2ludGVnZXIuanMiLCJqcy9tb2R1bGUvZGF0YS91bmRpcmVjdGVkX2dyYXBoLmpzIiwianMvbW9kdWxlL2RhdGEvd2VpZ2h0ZWRfZGlyZWN0ZWRfZ3JhcGguanMiLCJqcy9tb2R1bGUvZGF0YS93ZWlnaHRlZF91bmRpcmVjdGVkX2dyYXBoLmpzIiwianMvbW9kdWxlL2luZGV4LmpzIiwianMvbW9kdWxlL3RyYWNlci9hcnJheTFkLmpzIiwianMvbW9kdWxlL3RyYWNlci9hcnJheTJkLmpzIiwianMvbW9kdWxlL3RyYWNlci9jaGFydC5qcyIsImpzL21vZHVsZS90cmFjZXIvY29vcmRpbmF0ZV9zeXN0ZW0uanMiLCJqcy9tb2R1bGUvdHJhY2VyL2RpcmVjdGVkX2dyYXBoLmpzIiwianMvbW9kdWxlL3RyYWNlci9kaXJlY3RlZF9ncmFwaF9jb25zdHJ1Y3QuanMiLCJqcy9tb2R1bGUvdHJhY2VyL2luZGV4LmpzIiwianMvbW9kdWxlL3RyYWNlci9sb2cuanMiLCJqcy9tb2R1bGUvdHJhY2VyL3RyYWNlci5qcyIsImpzL21vZHVsZS90cmFjZXIvdW5kaXJlY3RlZF9ncmFwaC5qcyIsImpzL21vZHVsZS90cmFjZXIvd2VpZ2h0ZWRfZGlyZWN0ZWRfZ3JhcGguanMiLCJqcy9tb2R1bGUvdHJhY2VyL3dlaWdodGVkX3VuZGlyZWN0ZWRfZ3JhcGguanMiLCJqcy9zZXJ2ZXIvYWpheC9nZXQuanMiLCJqcy9zZXJ2ZXIvYWpheC9nZXRfanNvbi5qcyIsImpzL3NlcnZlci9hamF4L3Bvc3RfanNvbi5qcyIsImpzL3NlcnZlci9hamF4L3JlcXVlc3QuanMiLCJqcy9zZXJ2ZXIvaGVscGVycy5qcyIsImpzL3NlcnZlci9pbmRleC5qcyIsImpzL3NlcnZlci9sb2FkX2FsZ29yaXRobS5qcyIsImpzL3NlcnZlci9sb2FkX2NhdGVnb3JpZXMuanMiLCJqcy9zZXJ2ZXIvbG9hZF9maWxlLmpzIiwianMvc2VydmVyL2xvYWRfc2NyYXRjaF9wYXBlci5qcyIsImpzL3NlcnZlci9sb2FkX3dpa2kuanMiLCJqcy9zZXJ2ZXIvbG9hZF93aWtpX2xpc3QuanMiLCJqcy9zZXJ2ZXIvc2hhcmVfc2NyYXRjaF9wYXBlci5qcyIsImpzL3RyYWNlcl9tYW5hZ2VyL2luZGV4LmpzIiwianMvdHJhY2VyX21hbmFnZXIvbWFuYWdlci5qcyIsImpzL3RyYWNlcl9tYW5hZ2VyL3V0aWwvZnJvbV9qc29uLmpzIiwianMvdHJhY2VyX21hbmFnZXIvdXRpbC9pbmRleC5qcyIsImpzL3RyYWNlcl9tYW5hZ2VyL3V0aWwvcmVmaW5lX2J5X3R5cGUuanMiLCJqcy90cmFjZXJfbWFuYWdlci91dGlsL3RvX2pzb24uanMiLCJqcy91dGlscy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcnN2cC9kaXN0L3JzdnAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7U0FJSSxDO0lBREYsTSxNQUFBLE07OztBQUdGLElBQU0sUUFBUTtBQUNaLGdCQUFjLEVBREY7QUFFWixTQUFPO0FBRkssQ0FBZDs7QUFLQSxJQUFNLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLElBQUQsRUFBVTtBQUMvQixNQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1QsVUFBTSxtQkFBTjtBQUNEO0FBQ0YsQ0FKRDs7QUFPQTs7O0FBR0EsT0FBTyxPQUFQLEdBQWlCO0FBRWYsZUFGZSx5QkFFRCxJ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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qge1xuICBleHRlbmRcbn0gPSAkO1xuXG5jb25zdCBjYWNoZSA9IHtcbiAgbGFzdEZpbGVVc2VkOiAnJyxcbiAgZmlsZXM6IHt9XG59O1xuXG5jb25zdCBhc3NlcnRGaWxlTmFtZSA9IChuYW1lKSA9PiB7XG4gIGlmICghbmFtZSkge1xuICAgIHRocm93ICdNaXNzaW5nIGZpbGUgbmFtZSc7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBHbG9iYWwgYXBwbGljYXRpb24gY2FjaGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZ2V0Q2FjaGVkRmlsZShuYW1lKSB7XG4gICAgYXNzZXJ0RmlsZU5hbWUobmFtZSk7XG4gICAgcmV0dXJuIGNhY2hlLmZpbGVzW25hbWVdO1xuICB9LFxuXG4gIHVwZGF0ZUNhY2hlZEZpbGUobmFtZSwgdXBkYXRlcykge1xuICAgIGFzc2VydEZpbGVOYW1lKG5hbWUpO1xuICAgIGlmICghY2FjaGUuZmlsZXNbbmFtZV0pIHtcbiAgICAgIGNhY2hlLmZpbGVzW25hbWVdID0ge307XG4gICAgfVxuICAgIGV4dGVuZChjYWNoZS5maWxlc1tuYW1lXSwgdXBkYXRlcyk7XG4gIH0sXG5cbiAgZ2V0TGFzdEZpbGVVc2VkKCkge1xuICAgIHJldHVybiBjYWNoZS5sYXN0RmlsZVVzZWQ7XG4gIH0sXG5cbiAgc2V0TGFzdEZpbGVVc2VkKGZpbGUpIHtcbiAgICBjYWNoZS5sYXN0RmlsZVVzZWQgPSBmaWxlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWRpdG9yID0gcmVxdWlyZSgnLi4vZWRpdG9yJyk7XG5jb25zdCBUcmFjZXJNYW5hZ2VyID0gcmVxdWlyZSgnLi4vdHJhY2VyX21hbmFnZXInKTtcbmNvbnN0IERPTSA9IHJlcXVpcmUoJy4uL2RvbS9zZXR1cCcpO1xuXG5jb25zdCB7XG4gIHNob3dMb2FkaW5nU2xpZGVyLFxuICBoaWRlTG9hZGluZ1NsaWRlclxufSA9IHJlcXVpcmUoJy4uL2RvbS9sb2FkaW5nX3NsaWRlcicpO1xuXG5jb25zdCBDYWNoZSA9IHJlcXVpcmUoJy4vY2FjaGUnKTtcblxuY29uc3Qgc3RhdGUgPSB7XG4gIGlzTG9hZGluZzogbnVsbCxcbiAgZWRpdG9yOiBudWxsLFxuICB0cmFjZXJNYW5hZ2VyOiBudWxsLFxuICBjYXRlZ29yaWVzOiBudWxsLFxuICBsb2FkZWRTY3JhdGNoOiBudWxsLFxuICB3aWtpTGlzdDogbnVsbFxufTtcblxuY29uc3QgaW5pdFN0YXRlID0gKHRyYWNlck1hbmFnZXIpID0+IHtcbiAgc3RhdGUuaXNMb2FkaW5nID0gZmFsc2U7XG4gIHN0YXRlLmVkaXRvciA9IG5ldyBFZGl0b3IodHJhY2VyTWFuYWdlcik7XG4gIHN0YXRlLnRyYWNlck1hbmFnZXIgPSB0cmFjZXJNYW5hZ2VyO1xuICBzdGF0ZS5jYXRlZ29yaWVzID0ge307XG4gIHN0YXRlLmxvYWRlZFNjcmF0Y2ggPSBudWxsO1xuICBzdGF0ZS53aWtpTGlzdCA9IFtdO1xufTtcblxuLyoqXG4gKiBHbG9iYWwgYXBwbGljYXRpb24gc2luZ2xldG9uLlxuICovXG5jb25zdCBBcHAgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdGhpcy5nZXRJc0xvYWRpbmcgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLmlzTG9hZGluZztcbiAgfTtcblxuICB0aGlzLnNldElzTG9hZGluZyA9IChsb2FkaW5nKSA9PiB7XG4gICAgc3RhdGUuaXNMb2FkaW5nID0gbG9hZGluZztcbiAgICBpZiAobG9hZGluZykge1xuICAgICAgc2hvd0xvYWRpbmdTbGlkZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUxvYWRpbmdTbGlkZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5nZXRFZGl0b3IgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLmVkaXRvcjtcbiAgfTtcblxuICB0aGlzLmdldENhdGVnb3JpZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLmNhdGVnb3JpZXM7XG4gIH07XG5cbiAgdGhpcy5nZXRDYXRlZ29yeSA9IChuYW1lKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLmNhdGVnb3JpZXNbbmFtZV07XG4gIH07XG5cbiAgdGhpcy5zZXRDYXRlZ29yaWVzID0gKGNhdGVnb3JpZXMpID0+IHtcbiAgICBzdGF0ZS5jYXRlZ29yaWVzID0gY2F0ZWdvcmllcztcbiAgfTtcblxuICB0aGlzLnVwZGF0ZUNhdGVnb3J5ID0gKG5hbWUsIHVwZGF0ZXMpID0+IHtcbiAgICAkLmV4dGVuZChzdGF0ZS5jYXRlZ29yaWVzW25hbWVdLCB1cGRhdGVzKTtcbiAgfTtcblxuICB0aGlzLmdldFRyYWNlck1hbmFnZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLnRyYWNlck1hbmFnZXI7XG4gIH07XG5cbiAgdGhpcy5nZXRMb2FkZWRTY3JhdGNoID0gKCkgPT4ge1xuICAgIHJldHVybiBzdGF0ZS5sb2FkZWRTY3JhdGNoO1xuICB9O1xuXG4gIHRoaXMuc2V0TG9hZGVkU2NyYXRjaCA9IChsb2FkZWRTY3JhdGNoKSA9PiB7XG4gICAgc3RhdGUubG9hZGVkU2NyYXRjaCA9IGxvYWRlZFNjcmF0Y2g7XG4gIH07XG5cbiAgdGhpcy5nZXRXaWtpTGlzdCA9ICgpID0+IHtcbiAgICByZXR1cm4gc3RhdGUud2lraUxpc3Q7XG4gIH07XG5cbiAgdGhpcy5zZXRXaWtpTGlzdCA9ICh3aWtpTGlzdCkgPT4ge1xuICAgIHN0YXRlLndpa2lMaXN0ID0gd2lraUxpc3Q7XG4gIH07XG5cbiAgdGhpcy5oYXNXaWtpID0gKHdpa2kpID0+IHtcbiAgICByZXR1cm4gfnN0YXRlLndpa2lMaXN0LmluZGV4T2Yod2lraSk7XG4gIH07XG5cbiAgY29uc3QgdHJhY2VyTWFuYWdlciA9IFRyYWNlck1hbmFnZXIuaW5pdCgpO1xuXG4gIGluaXRTdGF0ZSh0cmFjZXJNYW5hZ2VyKTtcbiAgRE9NLnNldHVwKHRyYWNlck1hbmFnZXIpO1xuXG59O1xuXG5BcHAucHJvdG90eXBlID0gQ2FjaGU7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1haW4gYXBwbGljYXRpb24gaW5zdGFuY2UuXG4gKiBHZXRzIHBvcHVsYXRlZCBvbiBwYWdlIGxvYWQuIFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHt9OyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXJyYXkyRCA9IHJlcXVpcmUoJy4vYXJyYXkyZCcpO1xuY29uc3QgbW9kdWxlcyA9IHJlcXVpcmUoJy4uL21vZHVsZScpO1xuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBnZXRUcmFjZXJOYW1lID0gKCkgPT57XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhY2VyTmFtZS0xRFwiKS52YWx1ZTtcbn1cblxuY29uc3QgZ2V0TnVtQ29sdW1ucyA9ICgpID0+IHtcbiAgICB2YXIgY29sdW1uX2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251bUNvbHVtbnMtMUQnKTtcbiAgICByZXR1cm4gY29sdW1uX2ZpZWxkLnZhbHVlO1xufTtcblxuY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gICAgdmFyIGJ1dHRvbl8xRE1hdHJpeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uLTFETWF0cml4XCIpO1xuICAgIHZhciBsb2dnZXI7XG4gICAgdmFyIGFycjFEVHJhY2VyO1xuICAgIGJ1dHRvbl8xRE1hdHJpeC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgdXRpbC5jbGVhck1vZHVsZXMoKTtcbiAgICAgICAgYXJyMURUcmFjZXIgPSBuZXcgbW9kdWxlcy5BcnJheTFEVHJhY2VyKCk7XG4gICAgICAgIHZhciBhcnJFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZHVsZV93cmFwcGVyJyk7XG4gICAgICAgIGFyckVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgYXJyYXkyRC5tb3VzZXNjcm9sbCwgZmFsc2UpO1xuICAgICAgICBhcnJFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Nb3VzZVNjcm9sbFwiLCBhcnJheTJELm1vdXNlc2Nyb2xsLCBmYWxzZSk7XG4gICAgICAgIGxvZ2dlciA9IG5ldyBtb2R1bGVzLkxvZ1RyYWNlcignR2VuZXJhdGVkIEphdmFzY3JpcHQnKTtcblxuICAgICAgICB2YXIgbnVtQ29sdW1ucyA9IGdldE51bUNvbHVtbnMoKTtcbiAgICAgICAgdmFyIGRhdGEgPSBhcnJheTJELmZhdXhEYXRhKDEsbnVtQ29sdW1ucylbMF07XG5cbiAgICAgICAgYXJyMURUcmFjZXIuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgYXJyYXkyRC50YWJsZVRvSW5wdXRGaWVsZHMoMSwgbnVtQ29sdW1ucyk7XG4gICAgICAgIHV0aWwucG9zaXRpb25Nb2R1bGVzKCk7XG4gICAgICAgIGFycjFEVHJhY2VyLnJlZnJlc2goKTtcbiAgICB9LGZhbHNlKTtcbiAgICB2YXIgYnV0dG9uX0pTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1nZW5lcmF0ZUpTLTFEJyk7XG4gICAgYnV0dG9uX0pTLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBhcnJheTJELmdlbmVyYXRlSlMobG9nZ2VyLCAnQXJyYXkxRFRyYWNlcicsZ2V0VHJhY2VyTmFtZSgpKTtcbiAgICB9LGZhbHNlKTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2V0dXBcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1vZHVsZXMgPSByZXF1aXJlKCcuLi9tb2R1bGUnKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuXG5jb25zdCBnZXRUcmFjZXJOYW1lID0gKCkgPT57XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhY2VyTmFtZS0yRFwiKS52YWx1ZTtcbn1cblxuY29uc3QgZ2V0TnVtUm93cyA9ICgpID0+IHtcbiAgICB2YXIgcm93X2ZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251bVJvd3MtMkQnKTtcbiAgICByZXR1cm4gcm93X2ZpZWxkLnZhbHVlO1xufVxuXG5jb25zdCBnZXROdW1Db2x1bW5zID0gKCkgPT4ge1xuICAgIHZhciBjb2x1bW5fZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVtQ29sdW1ucy0yRCcpO1xuICAgIHJldHVybiBjb2x1bW5fZmllbGQudmFsdWU7XG59XG5cbmNvbnN0IGZhdXhEYXRhID0gKHIsIGMpID0+IHtcbiAgICB2YXIgRCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcjsgaSsrKSB7XG4gICAgICBELnB1c2goW10pO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjOyBqKyspIHtcbiAgICAgICAgRFtpXS5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSogMTAgKyAxKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBEO1xufVxuXG5jb25zdCB0YWJsZVRvSW5wdXRGaWVsZHMgPSAobnVtUm93cywgbnVtQ29sdW1ucykgPT4ge1xuICAgIHZhciB0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tdGJsLXRhYmxlJyk7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbnVtUm93czsgaSsrKXtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IG51bUNvbHVtbnM7IGorKyl7XG4gICAgICAgICAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBlbGVtLnR5cGUgPSAnVGV4dCc7XG4gICAgICAgICAgICBlbGVtLnZhbHVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAgKyAxKTtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnbXRibC1jb2wnLCdpbnB1dEZpZWxkJyk7XG4gICAgICAgICAgICB0YWJsZS5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbal0uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICB0YWJsZS5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbal0uYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IGdlbmVyYXRlSlMgPSAobG9nZ2VyLCB0cmFjZXIsIHRyYWNlck5hbWUpID0+IHtcbiAgICBpZighbG9nZ2VyKSByZXR1cm47XG5cbiAgICBsb2dnZXIuY2xlYXIoKTtcbiAgICB2YXIgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXRibC10YWJsZScpO1xuXG4gICAgdmFyIG51bVJvd3MgPSB0YWJsZS5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICB2YXIgbnVtQ29sdW1ucyA9IHRhYmxlLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlcy5sZW5ndGg7XG5cbiAgICBsb2dnZXIucHJpbnQoJ0NvcHkgYW5kIHBhc3RlIHRoaXMgY29kZSBpbiB5b3VyIGRhdGEuanMgZmlsZSEnKTtcbiAgICBsb2dnZXIucHJpbnQoJycpO1xuXG4gICAgaWYobnVtUm93cyA+IDEpIHtcbiAgICAgICAgbG9nZ2VyLnByaW50KCdsZXQgbXlUYWJsZSA9IFsnKTtcbiAgICB9XG5cbiAgICB2YXIgbGluZSA9ICdsZXQgbXlUYWJsZSA9IFsnO1xuICAgIHZhciBpO1xuICAgIHZhciBqO1xuICAgIHZhciBjb21tYSA9ICcsJztcbiAgICB2YXIgY3VyclZhbDtcbiAgICB2YXIgbm9ycztcbiAgICBmb3IoaSA9IDA7IGkgPCBudW1Sb3dzOyBpKyspe1xuICAgICAgICBpZihudW1Sb3dzID4gMSl7XG4gICAgICAgICAgICBsaW5lID0gJ1snO1xuICAgICAgICB9XG4gICAgICAgIGZvcihqID0gMDsgaiA8IG51bUNvbHVtbnMtMTsgaisrKXtcbiAgICAgICAgICAgIGN1cnJWYWwgPSB0YWJsZS5jaGlsZE5vZGVzW2ldLmNoaWxkTm9kZXNbal0uY2hpbGROb2Rlc1swXS52YWx1ZTtcbiAgICAgICAgICAgIG5vcnMgPSBOdW1iZXIoY3VyclZhbCk7XG4gICAgICAgICAgICBpZihpc05hTihub3JzKSl7XG4gICAgICAgICAgICAgICAgY3VyclZhbCA9IFwiJ1wiICsgY3VyclZhbCArIFwiJ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGluZSArPSBjdXJyVmFsICsgJywnO1xuICAgICAgICB9XG4gICAgICAgIGlmKGkgPT09IG51bVJvd3MgLSAxKXtjb21tYSA9ICcnO31cbiAgICAgICAgY3VyclZhbCA9IHRhYmxlLmNoaWxkTm9kZXNbaV0uY2hpbGROb2Rlc1tqKytdLmNoaWxkTm9kZXNbMF0udmFsdWU7XG4gICAgICAgIG5vcnMgPSBOdW1iZXIoY3VyclZhbCk7XG4gICAgICAgIGlmKGlzTmFOKG5vcnMpKXtcbiAgICAgICAgICAgIGN1cnJWYWwgPSBcIidcIiArIGN1cnJWYWwgKyBcIidcIjtcbiAgICAgICAgfVxuICAgICAgICBsaW5lICs9IGN1cnJWYWwgKyAnXScgKyBjb21tYTtcbiAgICAgICAgbG9nZ2VyLnByaW50KGxpbmUpO1xuICAgIH1cbiAgICBpZihudW1Sb3dzID4gMSl7XG4gICAgICAgIGxvZ2dlci5wcmludCgnXScpO1xuICAgIH1cblxuXG4gICAgbG9nZ2VyLnByaW50KFwibGV0IG15VGFibGVUcmFjZXIgPSBuZXcgXCIrIHRyYWNlciArXCIgKCdcIit0cmFjZXJOYW1lK1wiJylcIik7XG4gICAgbG9nZ2VyLnByaW50KCdteVRhYmxlVHJhY2VyLl9zZXREYXRhIChteVRhYmxlKScpO1xuXG4gICAgdXRpbC5lbmFibGVkSGlnaHRsaWdodGluZygpO1xufVxuXG5jb25zdCBtb3VzZXNjcm9sbCA9IChlKSA9PntcbiAgICB2YXIgY29sbUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXRibC1jb2wnKTtcbiAgICB2YXIgZGVsdGEgPSAoZS53aGVlbERlbHRhICE9PSB1bmRlZmluZWQgJiYgZS53aGVlbERlbHRhKSB8fFxuICAgICAgKGUuZGV0YWlsICE9PSB1bmRlZmluZWQgJiYgLWUuZGV0YWlsKTtcblxuICAgIHZhciBpbnB1dEZpZWxkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbnB1dEZpZWxkXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRGaWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW5wdXRGaWVsZHNbaV0uc3R5bGUud2lkdGggPSAocGFyc2VGbG9hdChjb2xtRWxlbS5zdHlsZS5mb250U2l6ZSkgKiAyLjUpICsgXCJweFwiO1xuICAgICB9XG5cbn1cblxuY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG4gICAgdmFyIGJ1dHRvbl8yRE1hdHJpeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uLTJETWF0cml4XCIpO1xuICAgIHZhciBsb2dnZXI7XG4gICAgdmFyIGFycjJEVHJhY2VyO1xuICAgIGJ1dHRvbl8yRE1hdHJpeC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgdXRpbC5jbGVhck1vZHVsZXMoKTtcbiAgICAgICAgYXJyMkRUcmFjZXIgPSBuZXcgbW9kdWxlcy5BcnJheTJEVHJhY2VyKCk7XG4gICAgICAgIHZhciBhcnJFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZHVsZV93cmFwcGVyJyk7XG4gICAgICAgIGFyckVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgbW91c2VzY3JvbGwsIGZhbHNlKTtcbiAgICAgICAgYXJyRWxlbS5hZGRFdmVudExpc3RlbmVyKFwiRE9NTW91c2VTY3JvbGxcIiwgbW91c2VzY3JvbGwsIGZhbHNlKTtcbiAgICAgICAgbG9nZ2VyID0gbmV3IG1vZHVsZXMuTG9nVHJhY2VyKCdHZW5lcmF0ZWQgSmF2YXNjcmlwdCcpO1xuXG4gICAgICAgIHZhciBudW1Sb3dzID0gZ2V0TnVtUm93cygpO1xuICAgICAgICB2YXIgbnVtQ29sdW1ucyA9IGdldE51bUNvbHVtbnMoKTtcbiAgICAgICAgdmFyIGRhdGEgPSBmYXV4RGF0YShudW1Sb3dzLCBudW1Db2x1bW5zKTtcblxuICAgICAgICBhcnIyRFRyYWNlci5zZXREYXRhKGRhdGEpO1xuICAgICAgICB0YWJsZVRvSW5wdXRGaWVsZHMobnVtUm93cywgbnVtQ29sdW1ucyk7XG4gICAgICAgIHV0aWwucG9zaXRpb25Nb2R1bGVzKCk7XG4gICAgICAgIGFycjJEVHJhY2VyLnJlZnJlc2goKTtcbiAgICB9LGZhbHNlKTtcbiAgICB2YXIgYnV0dG9uX0pTID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbi1nZW5lcmF0ZUpTLTJEJyk7XG4gICAgYnV0dG9uX0pTLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICAgICBnZW5lcmF0ZUpTKGxvZ2dlciwgJ0FycmF5MkRUcmFjZXInLCBnZXRUcmFjZXJOYW1lKCkpO1xuICAgIH0sZmFsc2UpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzZXR1cCxcbiAgICBtb3VzZXNjcm9sbCxcbiAgICBmYXV4RGF0YSxcbiAgICB0YWJsZVRvSW5wdXRGaWVsZHMsXG4gICAgZ2VuZXJhdGVKU1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbW9kdWxlcyA9IHJlcXVpcmUoJy4uL21vZHVsZScpO1xuY29uc3QgYXJyYXkyZCA9IHJlcXVpcmUoJy4vYXJyYXkyZCcpO1xuY29uc3QgYXJyYXkxZCA9IHJlcXVpcmUoJy4vYXJyYXkxZCcpO1xuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuY29uc3QgU2VydmVyID0gcmVxdWlyZSgnLi4vc2VydmVyJyk7XG5jb25zdCBET00gPSByZXF1aXJlKCcuLi9kb20nKTtcblxuY29uc3Qge1xuICBnZXRQYXRoXG59ID0gcmVxdWlyZSgnLi4vc2VydmVyL2hlbHBlcnMnKTtcblxuY29uc3QgY2xvc2VDcmVhdGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0ICRidG5DbG9zZSA9ICQoJyNidG5fY2xvc2UnKTtcblxuICAgICAgICAkYnRuQ2xvc2UuY2xpY2soKCkgPT4ge1xuICAgICAgICAgICAgJCgnLnNhbmRib3hfY29udGFpbmVyJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB1dGlsLmNsZWFyTW9kdWxlcygpO1xuICAgICAgICAgICAgcmVsb2FkQWxnb3JpdGhtKCk7XG4gICAgICAgIH0pO1xufTtcblxuY29uc3QgcmVsb2FkQWxnb3JpdGhtID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgYWxnb3JpdGhtLFxuICAgICAgZmlsZVxuICAgIH0gPSBnZXRQYXRoKCk7XG5cbiAgICBTZXJ2ZXIubG9hZEFsZ29yaXRobShjYXRlZ29yeSwgYWxnb3JpdGhtKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBET00uc2hvd0FsZ29yaXRobShjYXRlZ29yeSwgYWxnb3JpdGhtLCBkYXRhKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IGNyZWF0ZUhUTUwgPSAoKSA9PiB7XG4gICAgJCgnLndvcmtzcGFjZScpLmFwcGVuZChcIjxkaXYgY2xhc3M9J3NhbmRib3hfY29udGFpbmVyJz5cXFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9J2Nsb3NlX2Jhcic+XFxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2J0bicgaWQ9J2J0bl9jbG9zZSc+XFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSd3cmFwcGVyJz5cXFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz0nZmEgZmEtdGltZXMnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+XFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cXFxuICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3M9J2F1dG8tZ2VuJz5cXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2dyaWQnIGlkPSdhcnJheTFELWdlbic+XFxcbiAgICAgICAgICAgICAgICA8ZGl2PiBhcnJheTFEVHJhY2VyIDwvZGl2PlxcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9J2ZhIGZhLWVsbGlwc2lzLWggZmEtNXgnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+XFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdmaWVsZHMnPlxcXG4gICAgICAgICAgICAgICAgIyBvZiBDb2x1bW5zOiA8aW5wdXQgY2xhc3M9J2lucHV0cydpZD0nbnVtQ29sdW1ucy0xRCcgdHlwZT0nbnVtYmVyJyB2YWx1ZT0nNSc+XFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ZpZWxkcyc+XFxcbiAgICAgICAgICAgICAgICBUcmFjZXIgTmFtZTogPGlucHV0IGNsYXNzPSdpbnB1dHMnaWQ9J3RyYWNlck5hbWUtMUQnIHR5cGU9J3RleHQnIHZhbHVlPSdkZWZhdWx0Jz5cXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nc2ItYnV0dG9uJyBpZD0nYnV0dG9uLTFETWF0cml4Jz5DcmVhdGUgMURNYXRyaXg8L2J1dHRvbj5cXFxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J3NiLWJ1dHRvbicgaWQ9J2J1dHRvbi1nZW5lcmF0ZUpTLTFEJz5HZW5lcmF0ZSBKYXZhc2NyaXB0PC9idXR0b24+XFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2dyaWQnIGlkPSdhcnJheTJELWdlbic+XFxcbiAgICAgICAgICAgICAgICA8ZGl2PiBhcnJheTJEVHJhY2VyIDwvZGl2PlxcXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9J2ZhIGZhLXRoIGZhLTV4JyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPlxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZmllbGRzJz5cXFxuICAgICAgICAgICAgICAgICMgb2YgUm93czogPGlucHV0IGNsYXNzPSdpbnB1dHMnaWQ9J251bVJvd3MtMkQnIHR5cGU9J251bWJlcicgdmFsdWU9JzUnPlxcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdmaWVsZHMnPlxcXG4gICAgICAgICAgICAgICAgIyBvZiBDb2x1bW5zOiA8aW5wdXQgY2xhc3M9J2lucHV0cydpZD0nbnVtQ29sdW1ucy0yRCcgdHlwZT0nbnVtYmVyJyB2YWx1ZT0nNSc+XFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ZpZWxkcyc+XFxcbiAgICAgICAgICAgICAgICBUcmFjZXIgTmFtZTogPGlucHV0IGNsYXNzPSdpbnB1dHMnaWQ9J3RyYWNlck5hbWUtMkQnIHR5cGU9J3RleHQnIHZhbHVlPSdkZWZhdWx0Jz5cXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nc2ItYnV0dG9uJyBpZD0nYnV0dG9uLTJETWF0cml4Jz5DcmVhdGUgMkRNYXRyaXg8L2J1dHRvbj5cXFxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J3NiLWJ1dHRvbicgaWQ9J2J1dHRvbi1nZW5lcmF0ZUpTLTJEJz5HZW5lcmF0ZSBKYXZhc2NyaXB0PC9idXR0b24+XFxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2dyaWQnIGlkPSdjaGFydC1nZW4nPjwvZGl2PlxcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZ3JpZCcgaWQ9J2dyYXBoLWdlbic+PC9kaXY+XFxcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cXFxuICAgIDwvZGl2PlwiKTtcbn07XG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG5cbiAgICB2YXIgY2hlY2sgPSAkKCcuc2FuZGJveF9jb250YWluZXInKTtcbiAgICBpZighY2hlY2subGVuZ3RoKXtcbiAgICAgICAgdXRpbC5jbGVhck1vZHVsZXMoKTtcbiAgICAgICAgY3JlYXRlSFRNTCgpO1xuICAgICAgICBhcnJheTJkLnNldHVwKCk7XG4gICAgICAgIGFycmF5MWQuc2V0dXAoKTtcbiAgICAgICAgY2xvc2VDcmVhdGUoKTtcbiAgICAgICAgdXRpbC5jbGlja1RyYWNlVGFiKCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcG9zaXRpb25Nb2R1bGVzID0gKCkgPT57XG4gICAgdmFyIGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kdWxlX3dyYXBwZXInKTtcbiAgICBpZihlbGVtcyA8PSAwKSByZXR1cm47XG5cbiAgICB2YXIgbiA9IGVsZW1zLmxlbmd0aDtcbiAgICB2YXIgc3BhY2luZyA9ICgxMDAvbik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICBpZiggaSA9PT0gMCl7XG4gICAgICAgICAgICBlbGVtc1tpXS5zdHlsZS5ib3R0b20gPSAoc3BhY2luZyAqIChuLTEpKSArICclJztcbiAgICAgICAgfWVsc2UgaWYoaSA9PT0gbiAtIDEpe1xuICAgICAgICAgICAgZWxlbXNbaV0uc3R5bGUudG9wID0gKHNwYWNpbmcgKiBpKSArICclJztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBlbGVtc1tpXS5zdHlsZS50b3AgPSAoc3BhY2luZyAqIGkpICsgJyUnO1xuICAgICAgICAgICAgZWxlbXNbaV0uc3R5bGUuYm90dG9tID0gKHNwYWNpbmcgKiBpKSArICclJztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgY2xlYXJNb2R1bGVzID0gKCkgPT57XG4gICAgdmFyIGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kdWxlX3dyYXBwZXInKTtcbiAgICBpZihlbGVtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgdmFyIHBhcmVudCA9IGVsZW1zWzBdLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHZhciBudW1DaGlsZCA9IHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG51bUNoaWxkOyBpKyspe1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgZW5hYmxlZEhpZ2h0bGlnaHRpbmcgPSAoKSA9PntcbiAgICB2YXIgZWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2R1bGVfd3JhcHBlcicpO1xuICAgIHZhciBsb2dnZXIgPSBlbGVtc1sxXTtcbiAgICB2YXIgd3JhcHBlciA9IGxvZ2dlci5jaGlsZE5vZGVzWzFdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd3JhcHBlci5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdyYXBwZXIuY2hpbGROb2Rlc1tpXS5zdHlsZVtcIi13ZWJraXQtdXNlci1zZWxlY3RcIl0gPSBcImFsbFwiO1xuICAgIH1cbn1cblxuY29uc3QgY2xpY2tUcmFjZVRhYiA9ICgpID0+IHtcbiAgICB2YXIgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bl90cmFjZScpO1xuICAgIGlmKGJ0bil7XG4gICAgICAgIGJ0bi5jbGljaygpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZW5hYmxlZEhpZ2h0bGlnaHRpbmcsXG4gICAgcG9zaXRpb25Nb2R1bGVzLFxuICAgIGNsZWFyTW9kdWxlcyxcbiAgICBjbGlja1RyYWNlVGFiXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKTtcbmNvbnN0IFNlcnZlciA9IHJlcXVpcmUoJy4uL3NlcnZlcicpO1xuY29uc3Qgc2hvd0FsZ29yaXRobSA9IHJlcXVpcmUoJy4vc2hvd19hbGdvcml0aG0nKTtcblxuY29uc3Qge1xuICBlYWNoXG59ID0gJDtcblxuY29uc3QgZ2V0QWxnb3JpdGhtRE9NID0gKGNhdGVnb3J5LCBzdWJMaXN0LCBhbGdvcml0aG0pID0+IHtcbiAgcmV0dXJuICQoJzxidXR0b24gY2xhc3M9XCJpbmRlbnRcIj4nKVxuICAgIC5hcHBlbmQoc3ViTGlzdFthbGdvcml0aG1dKVxuICAgIC5hdHRyKCdkYXRhLWFsZ29yaXRobScsIGFsZ29yaXRobSlcbiAgICAuYXR0cignZGF0YS1jYXRlZ29yeScsIGNhdGVnb3J5KVxuICAgIC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBTZXJ2ZXIubG9hZEFsZ29yaXRobShjYXRlZ29yeSwgYWxnb3JpdGhtKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHNob3dBbGdvcml0aG0oY2F0ZWdvcnksIGFsZ29yaXRobSwgZGF0YSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAkKCcjbGlzdCcpLmFwcGVuZCgkYWxnb3JpdGhtKTtcbn07XG5cbmNvbnN0IGFkZENhdGVnb3J5VG9ET00gPSAoY2F0ZWdvcnkpID0+IHtcblxuICBjb25zdCB7XG4gICAgbmFtZTogY2F0ZWdvcnlOYW1lLFxuICAgIGxpc3Q6IGNhdGVnb3J5U3ViTGlzdFxuICB9ID0gYXBwLmdldENhdGVnb3J5KGNhdGVnb3J5KTtcblxuICBjb25zdCAkY2F0ZWdvcnkgPSAkKCc8YnV0dG9uIGNsYXNzPVwiY2F0ZWdvcnlcIj4nKVxuICAgIC5hcHBlbmQoJzxpIGNsYXNzPVwiZmEgZmEtZncgZmEtY2FyZXQtcmlnaHRcIj4nKVxuICAgIC5hcHBlbmQoY2F0ZWdvcnlOYW1lKVxuICAgIC5hdHRyKCdkYXRhLWNhdGVnb3J5JywgY2F0ZWdvcnkpO1xuXG4gICRjYXRlZ29yeS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgJHNlbGYgPSAkKHRoaXMpO1xuICAgICRzZWxmLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgJHNlbGYuZmluZCgnaS5mYScpLnRvZ2dsZUNsYXNzKCdmYS1jYXJldC1yaWdodCBmYS1jYXJldC1kb3duJyk7XG4gICAgJHNlbGYubmV4dCgpLnRvZ2dsZSgzMDApO1xuICB9KTtcblxuICBjb25zdCAkYWxnb3JpdGhtcyA9ICQoJzxkaXYgY2xhc3M9XCJhbGdvcml0aG1zIGNvbGxhcHNlXCI+Jyk7XG4gICQoJyNsaXN0JykuYXBwZW5kKCRjYXRlZ29yeSkuYXBwZW5kKCRhbGdvcml0aG1zKTtcblxuICBlYWNoKGNhdGVnb3J5U3ViTGlzdCwgKGFsZ29yaXRobSkgPT4ge1xuICAgIGNvbnN0ICRhbGdvcml0aG0gPSBnZXRBbGdvcml0aG1ET00oY2F0ZWdvcnksIGNhdGVnb3J5U3ViTGlzdCwgYWxnb3JpdGhtKTtcbiAgICAkYWxnb3JpdGhtcy5hcHBlbmQoJGFsZ29yaXRobSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIGVhY2goYXBwLmdldENhdGVnb3JpZXMoKSwgYWRkQ2F0ZWdvcnlUb0RPTSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCcuLi9zZXJ2ZXInKTtcblxuY29uc3Qge1xuICBlYWNoXG59ID0gJDtcblxuY29uc3QgYWRkRmlsZVRvRE9NID0gKGNhdGVnb3J5LCBhbGdvcml0aG0sIGZpbGUsIGV4cGxhbmF0aW9uKSA9PiB7XG4gIHZhciAkZmlsZSA9ICQoJzxidXR0b24+JylcbiAgICAuYXBwZW5kKGZpbGUpXG4gICAgLmF0dHIoJ2RhdGEtZmlsZScsIGZpbGUpXG4gICAgLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIFNlcnZlci5sb2FkRmlsZShjYXRlZ29yeSwgYWxnb3JpdGhtLCBmaWxlLCBleHBsYW5hdGlvbik7XG4gICAgICAkKCcuZmlsZXNfYmFyID4gLndyYXBwZXIgPiBidXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgJCgnLmZpbGVzX2JhciA+IC53cmFwcGVyJykuYXBwZW5kKCRmaWxlKTtcbiAgcmV0dXJuICRmaWxlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoY2F0ZWdvcnksIGFsZ29yaXRobSwgZmlsZXMsIHJlcXVlc3RlZEZpbGUpID0+IHtcbiAgJCgnLmZpbGVzX2JhciA+IC53cmFwcGVyJykuZW1wdHkoKTtcblxuICBlYWNoKGZpbGVzLCAoZmlsZSwgZXhwbGFuYXRpb24pID0+IHtcbiAgICB2YXIgJGZpbGUgPSBhZGRGaWxlVG9ET00oY2F0ZWdvcnksIGFsZ29yaXRobSwgZmlsZSwgZXhwbGFuYXRpb24pO1xuICAgICRmaWxlLmFkZENsYXNzKCd0YWJfYnV0dG9uJyk7XG4gICAgaWYgKHJlcXVlc3RlZEZpbGUgJiYgcmVxdWVzdGVkRmlsZSA9PSBmaWxlKSAkZmlsZS5jbGljaygpO1xuICB9KTtcblxuICBpZiAoIXJlcXVlc3RlZEZpbGUpICQoJy5maWxlc19iYXIgPiAud3JhcHBlciA+IGJ1dHRvbicpLmZpcnN0KCkuY2xpY2soKTtcbiAgJCgnLmZpbGVzX2JhciA+IC53cmFwcGVyJykuc2Nyb2xsKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgbGV0IHJlcUZ1bmMgPSBudWxsO1xuICBsZXQgZXh0RnVuYyA9IG51bGw7XG4gIGxldCByZXFGdW5jcyA9IFtcbiAgICAncmVxdWVzdEZ1bGxzY3JlZW4nLFxuICAgICd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbicsXG4gICAgJ21velJlcXVlc3RGdWxsU2NyZWVuJyxcbiAgICAnbXNSZXF1ZXN0RnVsbHNjcmVlbicsXG4gIF07XG4gIGxldCBleHRGdW5jcyA9IFtcbiAgICAnZXhpdEZ1bGxzY3JlZW4nLFxuICAgICd3ZWJraXRFeGl0RnVsbHNjcmVlbicsXG4gICAgJ21vekNhbmNlbEZ1bGxTY3JlZW4nLFxuICAgICdtc0V4aXRGdWxsc2NyZWVuJ1xuICBdO1xuXG4gIGZvciAobGV0IHRtcFJlcUZ1bmMgb2YgcmVxRnVuY3MpIHtcbiAgICBpZiAoZG9jdW1lbnQuYm9keVt0bXBSZXFGdW5jXSkge1xuICAgICAgcmVxRnVuYyA9IHRtcFJlcUZ1bmM7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgdG1wRXh0RnVuYyBvZiBleHRGdW5jcykge1xuICAgIGlmIChkb2N1bWVudFt0bXBFeHRGdW5jXSkge1xuICAgICAgZXh0RnVuYyA9IHRtcEV4dEZ1bmM7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgJGJ0bkZ1bGxzY3JlZW4gPSAkKCcjYnRuX2Z1bGxzY3JlZW4nKTtcblxuICAkYnRuRnVsbHNjcmVlbi5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRvY3VtZW50LmZ1bGxTY3JlZW4gfHwgZG9jdW1lbnQubW96RnVsbFNjcmVlbiB8fCBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4pIHtcbiAgICAgIGlmIChleHRGdW5jKSBkb2N1bWVudFtleHRGdW5jXSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmVxRnVuYykgZG9jdW1lbnQuYm9keVtyZXFGdW5jXSgpO1xuICAgIH1cbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG5cdGxldCAkYnV0dG9ucyA9ICQoJ1tkYXRhLWNhdGVnb3J5XScpO1xuXG5cdCQoJyNzZWFyY2gtYmFyJykua2V5dXAgKGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgcXVlcnkgPSAkKHRoaXMpLnZhbCAoKTtcblx0XHRsZXQgcmUgPSBuZXcgUmVnRXhwIChxdWVyeSwgJ2knKTtcblxuXHRcdHF1ZXJ5ID8gJCgnI2Zvb3RlcicpLmhpZGUgKCkgOiAkKCcjZm9vdGVyJykuc2hvdyAoKTtcblx0XHQkLmVhY2ggKCQoJyNsaXN0IC5jYXRlZ29yeScpLCBmdW5jdGlvbiAoaSwgYykge1xuXHRcdFx0bGV0ICRjID0gJChjKTtcblx0XHRcdCEkYy5oYXNDbGFzcyAoJ29wZW4nKSAmJiAkYy5jbGljayAoKTtcblx0XHR9KTtcblxuXHRcdCRidXR0b25zLnNob3cgKCkuZmlsdGVyIChmdW5jdGlvbiAoKSB7XG5cdFx0XHRsZXQgY05hbWUgPSAkKHRoaXMpLmF0dHIgKCdkYXRhLWNhdGVnb3J5Jyk7XG5cblx0XHRcdGlmICgkKHRoaXMpLmhhc0NsYXNzICgnY2F0ZWdvcnknKSkge1xuXHRcdFx0XHRyZXR1cm4gIXJlLnRlc3QgKCQoYFtkYXRhLWNhdGVnb3J5PVwiJHtjTmFtZX1cIl1gKS50ZXh0ICgpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gIShcblx0XHRcdFx0XHRyZS50ZXN0ICgkKGAuY2F0ZWdvcnlbZGF0YS1jYXRlZ29yeT1cIiR7Y05hbWV9XCJdYCkudGV4dCgpKSB8fCByZS50ZXN0ICgkKHRoaXMpLnRleHQgKCkpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSkuaGlkZSAoKTtcblxuXHRcdCQoJy5hbGdvcml0aG1zJykuc2hvdyAoKS5maWx0ZXIgKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiAhJCh0aGlzKS5jaGlsZHJlbiAoJzp2aXNpYmxlJykubGVuZ3RoO1xuXHRcdH0pLmhpZGUgKCk7XG5cdH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc2hvd0FsZ29yaXRobSA9IHJlcXVpcmUoJy4vc2hvd19hbGdvcml0aG0nKTtcbmNvbnN0IGFkZENhdGVnb3JpZXMgPSByZXF1aXJlKCcuL2FkZF9jYXRlZ29yaWVzJyk7XG5jb25zdCBzaG93RGVzY3JpcHRpb24gPSByZXF1aXJlKCcuL3Nob3dfZGVzY3JpcHRpb24nKTtcbmNvbnN0IGFkZEZpbGVzID0gcmVxdWlyZSgnLi9hZGRfZmlsZXMnKTtcbmNvbnN0IHNob3dGaXJzdEFsZ29yaXRobSA9IHJlcXVpcmUoJy4vc2hvd19maXJzdF9hbGdvcml0aG0nKTtcbmNvbnN0IHNob3dSZXF1ZXN0ZWRBbGdvcml0aG0gPSByZXF1aXJlKCcuL3Nob3dfcmVxdWVzdGVkX2FsZ29yaXRobScpO1xuY29uc3Qgc2hvd1dpa2kgPSByZXF1aXJlKCcuL3Nob3dfd2lraScpO1xuY29uc3QgZW5hYmxlU2VhcmNoID0gcmVxdWlyZSgnLi9lbmFibGVfc2VhcmNoJyk7XG5jb25zdCByZXNpemVXb3Jrc3BhY2UgPSByZXF1aXJlKCcuL3Jlc2l6ZV93b3Jrc3BhY2UnKTtcbmNvbnN0IGVuYWJsZUZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2VuYWJsZV9mdWxsc2NyZWVuJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaG93QWxnb3JpdGhtLFxuICBhZGRDYXRlZ29yaWVzLFxuICBzaG93RGVzY3JpcHRpb24sXG4gIGFkZEZpbGVzLFxuICBzaG93Rmlyc3RBbGdvcml0aG0sXG4gIHNob3dSZXF1ZXN0ZWRBbGdvcml0aG0sXG4gIHNob3dXaWtpLFxuICBlbmFibGVTZWFyY2gsXG4gIHJlc2l6ZVdvcmtzcGFjZSxcbiAgZW5hYmxlRnVsbFNjcmVlblxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc2hvd0xvYWRpbmdTbGlkZXIgPSAoKSA9PiB7XG4gICQoJyNsb2FkaW5nLXNsaWRlcicpLnJlbW92ZUNsYXNzKCdsb2FkZWQnKTtcbn07XG5cbmNvbnN0IGhpZGVMb2FkaW5nU2xpZGVyID0gKCkgPT4ge1xuICAkKCcjbG9hZGluZy1zbGlkZXInKS5hZGRDbGFzcygnbG9hZGVkJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hvd0xvYWRpbmdTbGlkZXIsXG4gIGhpZGVMb2FkaW5nU2xpZGVyXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjcmVhdGUgPSAoKSA9PiB7XG4gIGNvbnN0ICRjb250YWluZXIgPSAkKCc8c2VjdGlvbiBjbGFzcz1cIm1vZHVsZV93cmFwcGVyXCI+Jyk7XG4gICQoJy5tb2R1bGVfY29udGFpbmVyJykuYXBwZW5kKCRjb250YWluZXIpO1xuICByZXR1cm4gJGNvbnRhaW5lcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL2FwcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgYXBwLmdldFRyYWNlck1hbmFnZXIoKS5yZXNpemUoKTtcbiAgYXBwLmdldEVkaXRvcigpLnJlc2l6ZSgpO1xuICAkKCcuZmlsZXNfYmFyID4gLndyYXBwZXInKS5zY3JvbGwoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHNldHVwRGl2aWRlcnMgPSByZXF1aXJlKCcuL3NldHVwX2RpdmlkZXJzJyk7XG5jb25zdCBzZXR1cERvY3VtZW50ID0gcmVxdWlyZSgnLi9zZXR1cF9kb2N1bWVudCcpO1xuY29uc3Qgc2V0dXBGaWxlc0JhciA9IHJlcXVpcmUoJy4vc2V0dXBfZmlsZXNfYmFyJyk7XG5jb25zdCBzZXR1cEludGVydmFsID0gcmVxdWlyZSgnLi9zZXR1cF9pbnRlcnZhbCcpO1xuY29uc3Qgc2V0dXBNb2R1bGVDb250YWluZXIgPSByZXF1aXJlKCcuL3NldHVwX21vZHVsZV9jb250YWluZXInKTtcbmNvbnN0IHNldHVwVGFiQ29udGFpbmVyID0gcmVxdWlyZSgnLi9zZXR1cF90YWJfY29udGFpbmVyJyk7XG5jb25zdCBzZXR1cFNpZGVNZW51ID0gcmVxdWlyZSgnLi9zZXR1cF9zaWRlX21lbnUnKTtcbmNvbnN0IHNldHVwVG9wTWVudSA9IHJlcXVpcmUoJy4vc2V0dXBfdG9wX21lbnUnKTtcbmNvbnN0IHNldHVwV2luZG93ID0gcmVxdWlyZSgnLi9zZXR1cF93aW5kb3cnKTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBlbGVtZW50cyBvbmNlIHRoZSBhcHAgbG9hZHMgaW4gdGhlIERPTS5cbiAqL1xuY29uc3Qgc2V0dXAgPSAoKSA9PiB7XG5cbiAgJCgnLmJ0biBpbnB1dCcpLmNsaWNrKChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gZGl2aWRlcnNcbiAgc2V0dXBEaXZpZGVycygpO1xuXG4gIC8vIGRvY3VtZW50XG4gIHNldHVwRG9jdW1lbnQoKTtcblxuICAvLyBmaWxlcyBiYXJcbiAgc2V0dXBGaWxlc0JhcigpO1xuXG4gIC8vIGludGVydmFsXG4gIHNldHVwSW50ZXJ2YWwoKTtcblxuICAvLyBtb2R1bGUgY29udGFpbmVyXG4gIHNldHVwTW9kdWxlQ29udGFpbmVyKCk7XG5cbiAgLy8gdGFiIGNvbnRhaW5lclxuICBzZXR1cFRhYkNvbnRhaW5lcigpO1xuXG4gIC8vIHNpZGUgbWVudVxuICBzZXR1cFNpZGVNZW51KCk7XG5cbiAgLy8gdG9wIG1lbnVcbiAgc2V0dXBUb3BNZW51KCk7XG5cbiAgLy8gd2luZG93XG4gIHNldHVwV2luZG93KCk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXR1cFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vYXBwJyk7XG5jb25zdCByZXNpemVXb3Jrc3BhY2UgPSByZXF1aXJlKCcuLi9yZXNpemVfd29ya3NwYWNlJyk7XG5cbmNvbnN0IGFkZERpdmlkZXJUb0RvbSA9IChkaXZpZGVyKSA9PiB7XG4gIGNvbnN0IFt2ZXJ0aWNhbCwgJGZpcnN0LCAkc2Vjb25kXSA9IGRpdmlkZXI7XG4gIGNvbnN0ICRwYXJlbnQgPSAkZmlyc3QucGFyZW50KCk7XG4gIGNvbnN0IHRoaWNrbmVzcyA9IDU7XG5cbiAgY29uc3QgJGRpdmlkZXIgPSAkKCc8ZGl2IGNsYXNzPVwiZGl2aWRlclwiPicpO1xuXG4gIGxldCBkcmFnZ2luZyA9IGZhbHNlO1xuICBpZiAodmVydGljYWwgPT09ICd2Jykge1xuICAgICRkaXZpZGVyLmFkZENsYXNzKCd2ZXJ0aWNhbCcpO1xuICAgIGNvbnN0IF9sZWZ0ID0gLXRoaWNrbmVzcyAvIDI7XG4gICAgJGRpdmlkZXIuY3NzKHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIGxlZnQ6IF9sZWZ0LFxuICAgICAgd2lkdGg6IHRoaWNrbmVzc1xuICAgIH0pO1xuXG4gICAgbGV0IHg7XG4gICAgJGRpdmlkZXIubW91c2Vkb3duKCh7XG4gICAgICBwYWdlWFxuICAgIH0pID0+IHtcbiAgICAgIHggPSBwYWdlWDtcbiAgICAgIGRyYWdnaW5nID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm1vdXNlbW92ZSgoe1xuICAgICAgcGFnZVhcbiAgICB9KSA9PiB7XG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgY29uc3QgbmV3X2xlZnQgPSAkc2Vjb25kLnBvc2l0aW9uKCkubGVmdCArIHBhZ2VYIC0geDtcbiAgICAgICAgbGV0IHBlcmNlbnQgPSBuZXdfbGVmdCAvICRwYXJlbnQud2lkdGgoKSAqIDEwMDtcbiAgICAgICAgcGVyY2VudCA9IE1hdGgubWluKDkwLCBNYXRoLm1heCgxMCwgcGVyY2VudCkpO1xuICAgICAgICAkZmlyc3QuY3NzKCdyaWdodCcsICgxMDAgLSBwZXJjZW50KSArICclJyk7XG4gICAgICAgICRzZWNvbmQuY3NzKCdsZWZ0JywgcGVyY2VudCArICclJyk7XG4gICAgICAgIHggPSBwYWdlWDtcbiAgICAgICAgcmVzaXplV29ya3NwYWNlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5tb3VzZXVwKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICAkZGl2aWRlci5hZGRDbGFzcygnaG9yaXpvbnRhbCcpO1xuICAgIGNvbnN0IF90b3AgPSAtdGhpY2tuZXNzIC8gMjtcbiAgICAkZGl2aWRlci5jc3Moe1xuICAgICAgdG9wOiBfdG9wLFxuICAgICAgaGVpZ2h0OiB0aGlja25lc3MsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDBcbiAgICB9KTtcblxuICAgIGxldCB5O1xuICAgICRkaXZpZGVyLm1vdXNlZG93bihmdW5jdGlvbih7XG4gICAgICBwYWdlWVxuICAgIH0pIHtcbiAgICAgIHkgPSBwYWdlWTtcbiAgICAgIGRyYWdnaW5nID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm1vdXNlbW92ZShmdW5jdGlvbih7XG4gICAgICBwYWdlWVxuICAgIH0pIHtcbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBjb25zdCBuZXdfdG9wID0gJHNlY29uZC5wb3NpdGlvbigpLnRvcCArIHBhZ2VZIC0geTtcbiAgICAgICAgbGV0IHBlcmNlbnQgPSBuZXdfdG9wIC8gJHBhcmVudC5oZWlnaHQoKSAqIDEwMDtcbiAgICAgICAgcGVyY2VudCA9IE1hdGgubWluKDkwLCBNYXRoLm1heCgxMCwgcGVyY2VudCkpO1xuICAgICAgICAkZmlyc3QuY3NzKCdib3R0b20nLCAoMTAwIC0gcGVyY2VudCkgKyAnJScpO1xuICAgICAgICAkc2Vjb25kLmNzcygndG9wJywgcGVyY2VudCArICclJyk7XG4gICAgICAgIHkgPSBwYWdlWTtcbiAgICAgICAgcmVzaXplV29ya3NwYWNlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5tb3VzZXVwKGZ1bmN0aW9uKGUpIHtcbiAgICAgIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAkc2Vjb25kLmFwcGVuZCgkZGl2aWRlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgY29uc3QgZGl2aWRlcnMgPSBbXG4gICAgWyd2JywgJCgnLnNpZGVtZW51JyksICQoJy53b3Jrc3BhY2UnKV0sXG4gICAgWyd2JywgJCgnLnZpZXdlcl9jb250YWluZXInKSwgJCgnLmVkaXRvcl9jb250YWluZXInKV0sXG4gICAgWydoJywgJCgnLmRhdGFfY29udGFpbmVyJyksICQoJy5jb2RlX2NvbnRhaW5lcicpXVxuICBdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgYWRkRGl2aWRlclRvRG9tKGRpdmlkZXJzW2ldKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uLy4uL2FwcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnN0IGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICBpZiAoL14oaHR0cHM/OlxcL1xcLykuKy8udGVzdChocmVmKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCF3aW5kb3cub3BlbihocmVmLCAnX2JsYW5rJykpIHtcbiAgICAgICAgYWxlcnQoJ1BsZWFzZSBhbGxvdyBwb3B1cHMgZm9yIHRoaXMgc2l0ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgJChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbiAoZSkge1xuICAgIGFwcC5nZXRUcmFjZXJNYW5hZ2VyKCkuY29tbWFuZCgnbW91c2V1cCcsIGUpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRlZmluaXRlbHlCaWdnZXIgPSAoeCwgeSkgPT4geCA+ICh5ICsgMik7XG5cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuXG4gICQoJy5maWxlc19iYXIgPiAuYnRuLWxlZnQnKS5jbGljaygoKSA9PiB7XG4gICAgY29uc3QgJHdyYXBwZXIgPSAkKCcuZmlsZXNfYmFyID4gLndyYXBwZXInKTtcbiAgICBjb25zdCBjbGlwV2lkdGggPSAkd3JhcHBlci53aWR0aCgpO1xuICAgIGNvbnN0IHNjcm9sbExlZnQgPSAkd3JhcHBlci5zY3JvbGxMZWZ0KCk7XG5cbiAgICAkKCR3cmFwcGVyLmNoaWxkcmVuKCdidXR0b24nKS5nZXQoKS5yZXZlcnNlKCkpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsZWZ0ID0gJCh0aGlzKS5wb3NpdGlvbigpLmxlZnQ7XG4gICAgICBjb25zdCByaWdodCA9IGxlZnQgKyAkKHRoaXMpLm91dGVyV2lkdGgoKTtcbiAgICAgIGlmICgwID4gbGVmdCkge1xuICAgICAgICAkd3JhcHBlci5zY3JvbGxMZWZ0KHNjcm9sbExlZnQgKyByaWdodCAtIGNsaXBXaWR0aCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgJCgnLmZpbGVzX2JhciA+IC5idG4tcmlnaHQnKS5jbGljaygoKSA9PiB7XG4gICAgY29uc3QgJHdyYXBwZXIgPSAkKCcuZmlsZXNfYmFyID4gLndyYXBwZXInKTtcbiAgICBjb25zdCBjbGlwV2lkdGggPSAkd3JhcHBlci53aWR0aCgpO1xuICAgIGNvbnN0IHNjcm9sbExlZnQgPSAkd3JhcHBlci5zY3JvbGxMZWZ0KCk7XG5cbiAgICAkd3JhcHBlci5jaGlsZHJlbignYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGxlZnQgPSAkKHRoaXMpLnBvc2l0aW9uKCkubGVmdDtcbiAgICAgIGNvbnN0IHJpZ2h0ID0gbGVmdCArICQodGhpcykub3V0ZXJXaWR0aCgpO1xuICAgICAgaWYgKGNsaXBXaWR0aCA8IHJpZ2h0KSB7XG4gICAgICAgICR3cmFwcGVyLnNjcm9sbExlZnQoc2Nyb2xsTGVmdCArIGxlZnQpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gICQoJy5maWxlc19iYXIgPiAud3JhcHBlcicpLnNjcm9sbChmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0ICR3cmFwcGVyID0gJCgnLmZpbGVzX2JhciA+IC53cmFwcGVyJyk7XG4gICAgY29uc3QgY2xpcFdpZHRoID0gJHdyYXBwZXIud2lkdGgoKTtcbiAgICBjb25zdCAkbGVmdCA9ICR3cmFwcGVyLmNoaWxkcmVuKCdidXR0b246Zmlyc3QtY2hpbGQnKTtcbiAgICBjb25zdCAkcmlnaHQgPSAkd3JhcHBlci5jaGlsZHJlbignYnV0dG9uOmxhc3QtY2hpbGQnKTtcbiAgICBjb25zdCBsZWZ0ID0gJGxlZnQucG9zaXRpb24oKS5sZWZ0O1xuICAgIGNvbnN0IHJpZ2h0ID0gJHJpZ2h0LnBvc2l0aW9uKCkubGVmdCArICRyaWdodC5vdXRlcldpZHRoKCk7XG5cbiAgICBpZiAoZGVmaW5pdGVseUJpZ2dlcigwLCBsZWZ0KSAmJiBkZWZpbml0ZWx5QmlnZ2VyKGNsaXBXaWR0aCwgcmlnaHQpKSB7XG4gICAgICBjb25zdCBzY3JvbGxMZWZ0ID0gJHdyYXBwZXIuc2Nyb2xsTGVmdCgpO1xuICAgICAgJHdyYXBwZXIuc2Nyb2xsTGVmdChzY3JvbGxMZWZ0ICsgY2xpcFdpZHRoIC0gcmlnaHQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZnRlciA9IGRlZmluaXRlbHlCaWdnZXIoMCwgbGVmdCk7XG4gICAgY29uc3QgcmlnaHRlciA9IGRlZmluaXRlbHlCaWdnZXIocmlnaHQsIGNsaXBXaWR0aCk7XG4gICAgJHdyYXBwZXIudG9nZ2xlQ2xhc3MoJ3NoYWRvdy1sZWZ0JywgbGVmdGVyKTtcbiAgICAkd3JhcHBlci50b2dnbGVDbGFzcygnc2hhZG93LXJpZ2h0JywgcmlnaHRlcik7XG4gICAgJCgnLmZpbGVzX2JhciA+IC5idG4tbGVmdCcpLmF0dHIoJ2Rpc2FibGVkJywgIWxlZnRlcik7XG4gICAgJCgnLmZpbGVzX2JhciA+IC5idG4tcmlnaHQnKS5hdHRyKCdkaXNhYmxlZCcsICFyaWdodGVyKTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uLy4uL2FwcCcpO1xuY29uc3QgVG9hc3QgPSByZXF1aXJlKCcuLi90b2FzdCcpO1xuXG5jb25zdCB7XG4gIHBhcnNlRmxvYXRcbn0gPSBOdW1iZXI7XG5cbmNvbnN0IG1pbkludGVydmFsID0gMC4xO1xuY29uc3QgbWF4SW50ZXJ2YWwgPSAxMDtcbmNvbnN0IHN0YXJ0SW50ZXJ2YWwgPSAwLjU7XG5jb25zdCBzdGVwSW50ZXJ2YWwgPSAwLjE7XG5cbmNvbnN0IG5vcm1hbGl6ZSA9IChzZWMpID0+IHtcblxuXG4gIGxldCBpbnRlcnZhbDtcbiAgbGV0IG1lc3NhZ2U7XG4gIGlmIChzZWMgPCBtaW5JbnRlcnZhbCkge1xuICAgIGludGVydmFsID0gbWluSW50ZXJ2YWw7XG4gICAgbWVzc2FnZSA9IGBJbnRlcnZhbCBvZiAke3NlY30gc2Vjb25kcyBpcyB0b28gbG93LiBTZXR0aW5nIHRvIG1pbiBhbGxvd2VkIGludGVydmFsIG9mICR7bWluSW50ZXJ2YWx9IHNlY29uZChzKS5gO1xuICB9IGVsc2UgaWYgKHNlYyA+IG1heEludGVydmFsKSB7XG4gICAgaW50ZXJ2YWwgPSBtYXhJbnRlcnZhbDtcbiAgICBtZXNzYWdlID0gYEludGVydmFsIG9mICR7c2VjfSBzZWNvbmRzIGlzIHRvbyBoaWdoLiBTZXR0aW5nIHRvIG1heCBhbGxvd2VkIGludGVydmFsIG9mICR7bWF4SW50ZXJ2YWx9IHNlY29uZChzKS5gO1xuICB9IGVsc2Uge1xuICAgIGludGVydmFsID0gc2VjO1xuICAgIG1lc3NhZ2UgPSBgSW50ZXJ2YWwgaGFzIGJlZW4gc2V0IHRvICR7c2VjfSBzZWNvbmQocykuYFxuICB9XG5cbiAgcmV0dXJuIFtpbnRlcnZhbCwgbWVzc2FnZV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcblxuICBjb25zdCAkaW50ZXJ2YWwgPSAkKCcjaW50ZXJ2YWwnKTtcbiAgJGludGVydmFsLnZhbChzdGFydEludGVydmFsKTtcbiAgJGludGVydmFsLmF0dHIoe1xuICAgIG1heDogbWF4SW50ZXJ2YWwsXG4gICAgbWluOiBtaW5JbnRlcnZhbCxcbiAgICBzdGVwOiBzdGVwSW50ZXJ2YWxcbiAgfSk7XG5cbiAgJCgnI2ludGVydmFsJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHRyYWNlck1hbmFnZXIgPSBhcHAuZ2V0VHJhY2VyTWFuYWdlcigpO1xuICAgIGNvbnN0IFtzZWNvbmRzLCBtZXNzYWdlXSA9IG5vcm1hbGl6ZShwYXJzZUZsb2F0KCQodGhpcykudmFsKCkpKTtcblxuICAgICQodGhpcykudmFsKHNlY29uZHMpO1xuICAgIHRyYWNlck1hbmFnZXIuaW50ZXJ2YWwgPSBzZWNvbmRzICogMTAwMDtcbiAgICBUb2FzdC5zaG93SW5mb1RvYXN0KG1lc3NhZ2UpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uLy4uL2FwcCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcblxuICBjb25zdCAkbW9kdWxlX2NvbnRhaW5lciA9ICQoJy5tb2R1bGVfY29udGFpbmVyJyk7XG5cbiAgJG1vZHVsZV9jb250YWluZXIub24oJ21vdXNlZG93bicsICcubW9kdWxlX3dyYXBwZXInLCBmdW5jdGlvbihlKSB7XG4gICAgYXBwLmdldFRyYWNlck1hbmFnZXIoKS5maW5kT3duZXIodGhpcykubW91c2Vkb3duKGUpO1xuICB9KTtcblxuICAkbW9kdWxlX2NvbnRhaW5lci5vbignbW91c2Vtb3ZlJywgJy5tb2R1bGVfd3JhcHBlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICBhcHAuZ2V0VHJhY2VyTWFuYWdlcigpLmZpbmRPd25lcih0aGlzKS5tb3VzZW1vdmUoZSk7XG4gIH0pO1xuXG4gICRtb2R1bGVfY29udGFpbmVyLm9uKCdET01Nb3VzZVNjcm9sbCBtb3VzZXdoZWVsJywgJy5tb2R1bGVfd3JhcHBlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICBhcHAuZ2V0VHJhY2VyTWFuYWdlcigpLmZpbmRPd25lcih0aGlzKS5tb3VzZXdoZWVsKGUpO1xuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vYXBwJyk7XG5jb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCcuLi8uLi9zZXJ2ZXInKTtcbmNvbnN0IHNob3dBbGdvcml0aG0gPSByZXF1aXJlKCcuLi9zaG93X2FsZ29yaXRobScpO1xuY29uc3QgcmVzaXplV29ya3NwYWNlID0gcmVxdWlyZSgnLi4vcmVzaXplX3dvcmtzcGFjZScpO1xuXG5sZXQgc2lkZW1lbnVfcGVyY2VudDtcblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gICQoJyNuYXZpZ2F0aW9uJykuY2xpY2soKCkgPT4ge1xuICAgIGNvbnN0ICRzaWRlbWVudSA9ICQoJy5zaWRlbWVudScpO1xuICAgIGNvbnN0ICR3b3Jrc3BhY2UgPSAkKCcud29ya3NwYWNlJyk7XG5cbiAgICAkc2lkZW1lbnUudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgJCgnLm5hdi1kcm9wZG93bicpLnRvZ2dsZUNsYXNzKCdmYS1jYXJldC1kb3duIGZhLWNhcmV0LXJpZ2h0Jyk7XG4gICAgaWYgKCRzaWRlbWVudS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgJHNpZGVtZW51LmFuaW1hdGUoeyBcInJpZ2h0XCI6ICgxMDAgLSBzaWRlbWVudV9wZXJjZW50KSArICclJ30sIFwiZmFzdFwiICk7XG4gICAgICAgICR3b3Jrc3BhY2UuYW5pbWF0ZSh7IFwibGVmdFwiOiBzaWRlbWVudV9wZXJjZW50ICsgJyUnIH0sIFwiZmFzdFwiICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2lkZW1lbnVfcGVyY2VudCA9ICR3b3Jrc3BhY2UucG9zaXRpb24oKS5sZWZ0IC8gJCgnYm9keScpLndpZHRoKCkgKiAxMDA7XG4gICAgICAgICRzaWRlbWVudS5hbmltYXRlKHsgXCJyaWdodFwiOiBcIjAlXCIgfSwgXCJmYXN0XCIgKTtcbiAgICAgICAgJHdvcmtzcGFjZS5hbmltYXRlKHsgXCJsZWZ0XCI6IFwiMCVcIiB9LCBcImZhc3RcIiApO1xuICAgIH1cblxuICAgIHJlc2l6ZVdvcmtzcGFjZSgpO1xuICB9KTtcblxuICAkKCcjZG9jdW1lbnRhdGlvbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcjYnRuX2RvYycpLmNsaWNrKCk7XG4gIH0pO1xuXG4gICQoJyNwb3dlcmVkLWJ5JykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29wZW4nKVxuICAgICQoJyNwb3dlcmVkLWJ5LWxpc3QnKS50b2dnbGUoMzAwKTtcbiAgfSk7XG5cbiAgJCgnI3NjcmF0Y2gtcGFwZXInKS5jbGljaygoKSA9PiB7XG4gICAgY29uc3QgY2F0ZWdvcnkgPSAnc2NyYXRjaCc7XG4gICAgY29uc3QgYWxnb3JpdGhtID0gYXBwLmdldExvYWRlZFNjcmF0Y2goKTtcbiAgICBTZXJ2ZXIubG9hZEFsZ29yaXRobShjYXRlZ29yeSwgYWxnb3JpdGhtKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBzaG93QWxnb3JpdGhtKGNhdGVnb3J5LCBhbGdvcml0aG0sIGRhdGEpO1xuICAgIH0pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICAkKCcudGFiX2JhciA+IGJ1dHRvbicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcudGFiX2JhciA+IGJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKCcudGFiX2NvbnRhaW5lciA+IC50YWInKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgJCgkKHRoaXMpLmF0dHIoJ2RhdGEtdGFyZ2V0JykpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vYXBwJyk7XG5jb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCcuLi8uLi9zZXJ2ZXInKTtcbmNvbnN0IFRvYXN0ID0gcmVxdWlyZSgnLi4vdG9hc3QnKTtcbmNvbnN0IFRvcE1lbnUgPSByZXF1aXJlKCcuLi90b3BfbWVudScpO1xuY29uc3QgY3JlYXRlID0gcmVxdWlyZSgnLi4vLi4vY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuXG4gIC8vIHNoYXJlZFxuICAkKCcjc2hhcmVkJykubW91c2V1cChmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5zZWxlY3QoKTtcbiAgfSk7XG5cbiAgJCgnI2J0bl9zaGFyZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0ICRpY29uID0gJCh0aGlzKS5maW5kKCcuZmEtc2hhcmUnKTtcbiAgICAkaWNvbi5hZGRDbGFzcygnZmEtc3BpbiBmYS1zcGluLWZhc3RlcicpO1xuXG4gICAgU2VydmVyLnNoYXJlU2NyYXRjaFBhcGVyKCkudGhlbigodXJsKSA9PiB7XG4gICAgICAkaWNvbi5yZW1vdmVDbGFzcygnZmEtc3BpbiBmYS1zcGluLWZhc3RlcicpO1xuICAgICAgJCgnI3NoYXJlZCcpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZScpO1xuICAgICAgJCgnI3NoYXJlZCcpLnZhbCh1cmwpO1xuICAgICAgVG9hc3Quc2hvd0luZm9Ub2FzdCgnU2hhcmVhYmxlIGxpbmsgaXMgY3JlYXRlZC4nKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gY29udHJvbFxuXG4gIGNvbnN0ICRidG5SdW4gPSAkKCcjYnRuX3J1bicpO1xuICBjb25zdCAkYnRuVHJhY2UgPSAkKCcjYnRuX3RyYWNlJyk7XG4gIGNvbnN0ICRidG5QYXVzZSA9ICQoJyNidG5fcGF1c2UnKTtcbiAgY29uc3QgJGJ0blByZXYgPSAkKCcjYnRuX3ByZXYnKTtcbiAgY29uc3QgJGJ0bk5leHQgPSAkKCcjYnRuX25leHQnKTtcbiAgY29uc3QgJGJ0bkdlbmVyYXRlID0gJCgnI2J0bl9nZW5lcmF0ZScpO1xuXG4gIC8vIGluaXRpYWxseSwgY29udHJvbCBidXR0b25zIGFyZSBkaXNhYmxlZFxuICBUb3BNZW51LmRpc2FibGVGbG93Q29udHJvbCgpO1xuXG4gICRidG5SdW4uY2xpY2soKCkgPT4ge1xuICAgICRidG5UcmFjZS5jbGljaygpO1xuICAgICRidG5QYXVzZS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJGJ0blJ1bi5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgVG9wTWVudS5lbmFibGVGbG93Q29udHJvbCgpO1xuICAgIHZhciBlcnIgPSBhcHAuZ2V0RWRpdG9yKCkuZXhlY3V0ZSgpO1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIFRvYXN0LnNob3dFcnJvclRvYXN0KGVycik7XG4gICAgICBUb3BNZW51LnJlc2V0VG9wTWVudUJ1dHRvbnMoKTtcbiAgICB9XG4gIH0pO1xuXG4gICRidG5QYXVzZS5jbGljaygoKSA9PiB7XG4gICAgJGJ0blJ1bi50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG4gICAgJGJ0blBhdXNlLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICBpZiAoYXBwLmdldFRyYWNlck1hbmFnZXIoKS5pc1BhdXNlKCkpIHtcbiAgICAgIGFwcC5nZXRUcmFjZXJNYW5hZ2VyKCkucmVzdW1lU3RlcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcHAuZ2V0VHJhY2VyTWFuYWdlcigpLnBhdXNlU3RlcCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgJGJ0blByZXYuY2xpY2soKCkgPT4ge1xuICAgICRidG5SdW4ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICRidG5QYXVzZS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgYXBwLmdldFRyYWNlck1hbmFnZXIoKS5wYXVzZVN0ZXAoKTtcbiAgICBhcHAuZ2V0VHJhY2VyTWFuYWdlcigpLnByZXZTdGVwKCk7XG4gIH0pO1xuXG4gICRidG5OZXh0LmNsaWNrKCgpID0+IHtcbiAgICAkYnRuUnVuLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkYnRuUGF1c2UuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIGFwcC5nZXRUcmFjZXJNYW5hZ2VyKCkucGF1c2VTdGVwKCk7XG4gICAgYXBwLmdldFRyYWNlck1hbmFnZXIoKS5uZXh0U3RlcCgpO1xuICB9KTtcblxuICAkYnRuR2VuZXJhdGUuY2xpY2soKCkgPT4ge1xuICAgICBjcmVhdGUuaW5pdCgpO1xuICB9KTtcblxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vYXBwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgYXBwLmdldFRyYWNlck1hbmFnZXIoKS5yZXNpemUoKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbmNvbnN0IHNob3dEZXNjcmlwdGlvbiA9IHJlcXVpcmUoJy4vc2hvd19kZXNjcmlwdGlvbicpO1xuY29uc3QgYWRkRmlsZXMgPSByZXF1aXJlKCcuL2FkZF9maWxlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjYXRlZ29yeSwgYWxnb3JpdGhtLCBkYXRhLCByZXF1ZXN0ZWRGaWxlKSA9PiB7XG4gIGxldCAkbWVudTtcbiAgbGV0IGNhdGVnb3J5X25hbWU7XG4gIGxldCBhbGdvcml0aG1fbmFtZTtcblxuICBpZiAodXRpbHMuaXNTY3JhdGNoUGFwZXIoY2F0ZWdvcnkpKSB7XG4gICAgJG1lbnUgPSAkKCcjc2NyYXRjaC1wYXBlcicpO1xuICAgIGNhdGVnb3J5X25hbWUgPSAnU2NyYXRjaCBQYXBlcic7XG4gICAgYWxnb3JpdGhtX25hbWUgPSBhbGdvcml0aG0gPyAnU2hhcmVkJyA6ICdUZW1wb3JhcnknO1xuICB9IGVsc2Uge1xuICAgICRtZW51ID0gJChgW2RhdGEtY2F0ZWdvcnk9XCIke2NhdGVnb3J5fVwiXVtkYXRhLWFsZ29yaXRobT1cIiR7YWxnb3JpdGhtfVwiXWApO1xuICAgIGNvbnN0IGNhdGVnb3J5T2JqID0gYXBwLmdldENhdGVnb3J5KGNhdGVnb3J5KTtcbiAgICBjYXRlZ29yeV9uYW1lID0gY2F0ZWdvcnlPYmoubmFtZTtcbiAgICBhbGdvcml0aG1fbmFtZSA9IGNhdGVnb3J5T2JqLmxpc3RbYWxnb3JpdGhtXTtcbiAgfVxuXG4gICQoJy5zaWRlbWVudSBidXR0b24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICRtZW51LmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAkKCcjY2F0ZWdvcnknKS5odG1sKGNhdGVnb3J5X25hbWUpO1xuICAkKCcjYWxnb3JpdGhtJykuaHRtbChhbGdvcml0aG1fbmFtZSk7XG4gICQoJyN0YWJfZGVzYyA+IC53cmFwcGVyJykuZW1wdHkoKTtcbiAgJCgnLmZpbGVzX2JhciA+IC53cmFwcGVyJykuZW1wdHkoKTtcbiAgJCgnI2V4cGxhbmF0aW9uJykuaHRtbCgnJyk7XG5cbiAgYXBwLnNldExhc3RGaWxlVXNlZChudWxsKTtcbiAgYXBwLmdldEVkaXRvcigpLmNsZWFyQ29udGVudCgpO1xuXG4gIGNvbnN0IHtcbiAgICBmaWxlc1xuICB9ID0gZGF0YTtcblxuICBkZWxldGUgZGF0YS5maWxlcztcblxuICBzaG93RGVzY3JpcHRpb24oZGF0YSk7XG4gIGFkZEZpbGVzKGNhdGVnb3J5LCBhbGdvcml0aG0sIGZpbGVzLCByZXF1ZXN0ZWRGaWxlKTtcbiAgdXRpbHMucmVuZGVyTWF0aEpheCgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qge1xuICBpc0FycmF5XG59ID0gQXJyYXk7XG5cbmNvbnN0IHtcbiAgZWFjaFxufSA9ICQ7XG5cbm1vZHVsZS5leHBvcnRzID0gKGRhdGEpID0+IHtcbiAgY29uc3QgJGNvbnRhaW5lciA9ICQoJyN0YWJfZGVzYyA+IC53cmFwcGVyJyk7XG4gICRjb250YWluZXIuZW1wdHkoKTtcblxuICBlYWNoKGRhdGEsIChrZXksIHZhbHVlKSA9PiB7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICAkY29udGFpbmVyLmFwcGVuZCgkKCc8aDM+JykuaHRtbChrZXkpKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgJGNvbnRhaW5lci5hcHBlbmQoJCgnPHA+JykuaHRtbCh2YWx1ZSkpO1xuXG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuXG4gICAgICBjb25zdCAkdWwgPSAkKCc8dWwgY2xhc3M9XCJhcHBsaWNhdGlvbnNcIj4nKTtcbiAgICAgICRjb250YWluZXIuYXBwZW5kKCR1bCk7XG5cbiAgICAgIHZhbHVlLmZvckVhY2goKGxpKSA9PiB7XG4gICAgICAgICR1bC5hcHBlbmQoJCgnPGxpPicpLmh0bWwobGkpKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgIGNvbnN0ICR1bCA9ICQoJzx1bCBjbGFzcz1cImNvbXBsZXhpdGllc1wiPicpO1xuICAgICAgJGNvbnRhaW5lci5hcHBlbmQoJHVsKTtcblxuICAgICAgZWFjaCh2YWx1ZSwgKHByb3ApID0+IHtcbiAgICAgICAgY29uc3QgJHdyYXBwZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY29tcGxleGl0eVwiPicpO1xuICAgICAgICBjb25zdCAkdHlwZSA9ICQoJzxzcGFuIGNsYXNzPVwiY29tcGxleGl0eS10eXBlXCI+JykuaHRtbChgJHtwcm9wfTogYCk7XG4gICAgICAgIGNvbnN0ICR2YWx1ZSA9ICQoJzxzcGFuIGNsYXNzPVwiY29tcGxleGl0eS12YWx1ZVwiPicpLmh0bWwoYCR7dmFsdWVbcHJvcF19YCk7XG5cbiAgICAgICAgJHdyYXBwZXIuYXBwZW5kKCR0eXBlKS5hcHBlbmQoJHZhbHVlKTtcblxuICAgICAgICAkdWwuYXBwZW5kKCQoJzxsaT4nKS5hcHBlbmQoJHdyYXBwZXIpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBjbGljayB0aGUgZmlyc3QgYWxnb3JpdGhtIGluIHRoZSBmaXJzdCBjYXRlZ29yeVxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gICQoJyNsaXN0IC5jYXRlZ29yeScpLmZpcnN0KCkuY2xpY2soKTtcbiAgJCgnI2xpc3QgLmNhdGVnb3J5ICsgLmFsZ29yaXRobXMgPiAuaW5kZW50JykuZmlyc3QoKS5jbGljaygpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgU2VydmVyID0gcmVxdWlyZSgnLi4vc2VydmVyJyk7XG5jb25zdCBzaG93QWxnb3JpdGhtID0gcmVxdWlyZSgnLi9zaG93X2FsZ29yaXRobScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjYXRlZ29yeSwgYWxnb3JpdGhtLCBmaWxlKSA9PiB7XG4gICQoYC5jYXRlZ29yeVtkYXRhLWNhdGVnb3J5PVwiJHtjYXRlZ29yeX1cIl1gKS5jbGljaygpO1xuICBTZXJ2ZXIubG9hZEFsZ29yaXRobShjYXRlZ29yeSwgYWxnb3JpdGhtKS50aGVuKChkYXRhKSA9PiB7XG4gICAgc2hvd0FsZ29yaXRobShjYXRlZ29yeSwgYWxnb3JpdGhtLCBkYXRhLCBmaWxlKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKTtcbmNvbnN0IFNlcnZlciA9IHJlcXVpcmUoJy4uL3NlcnZlcicpO1xuY29uc3QgY29udmVydGVyID0gbmV3IHNob3dkb3duLkNvbnZlcnRlcih7dGFibGVzOiB0cnVlfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHdpa2kpID0+IHtcbiAgU2VydmVyLmxvYWRXaWtpKHdpa2kpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAkKCcjdGFiX2RvYyA+IC53cmFwcGVyJykuaHRtbChjb252ZXJ0ZXIubWFrZUh0bWwoYCMke3dpa2l9XFxuJHtkYXRhfWApKTtcbiAgICAkKCcjdGFiX2RvYycpLnNjcm9sbFRvcCgwKTtcbiAgICAkKCcjdGFiX2RvYyA+IC53cmFwcGVyIGEnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgaWYgKGFwcC5oYXNXaWtpKGhyZWYpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMoaHJlZik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHNob3dUb2FzdCA9IChkYXRhLCB0eXBlKSA9PiB7XG4gIGNvbnN0ICR0b2FzdCA9ICQoYDxkaXYgY2xhc3M9XCJ0b2FzdCAke3R5cGV9XCI+YCkuYXBwZW5kKGRhdGEpO1xuXG4gICQoJy50b2FzdF9jb250YWluZXInKS5hcHBlbmQoJHRvYXN0KTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgJHRvYXN0LmZhZGVPdXQoKCkgPT4ge1xuICAgICAgJHRvYXN0LnJlbW92ZSgpO1xuICAgIH0pO1xuICB9LCAzMDAwKTtcbn07XG5cbmNvbnN0IHNob3dFcnJvclRvYXN0ID0gKGVycikgPT4ge1xuICBzaG93VG9hc3QoZXJyLCAnZXJyb3InKTtcbn07XG5cbmNvbnN0IHNob3dJbmZvVG9hc3QgPSAoZXJyKSA9PiB7XG4gIHNob3dUb2FzdChlcnIsICdpbmZvJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hvd0Vycm9yVG9hc3QsXG4gIHNob3dJbmZvVG9hc3Rcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKTtcblxuY29uc3QgZmxvd0NvbnRyb2xCdG5zID0gWyAkKCcjYnRuX3BhdXNlJyksICQoJyNidG5fcHJldicpLCAkKCcjYnRuX25leHQnKSBdO1xuY29uc3Qgc2V0Rmxvd0NvbnRyb2xTdGF0ZSA9IChpc0Rpc2FibGVkKSA9PiB7XG4gIGZsb3dDb250cm9sQnRucy5mb3JFYWNoKCRidG4gPT4gJGJ0bi5hdHRyKCdkaXNhYmxlZCcsIGlzRGlzYWJsZWQpKTtcbn07XG5cbmNvbnN0IGVuYWJsZUZsb3dDb250cm9sID0gKCkgPT4ge1xuICBzZXRGbG93Q29udHJvbFN0YXRlKGZhbHNlKTtcbn07XG5cbmNvbnN0IGRpc2FibGVGbG93Q29udHJvbCA9ICgpID0+IHtcbiAgc2V0Rmxvd0NvbnRyb2xTdGF0ZSh0cnVlKTtcbn07XG5cbmNvbnN0IHJlc2V0VG9wTWVudUJ1dHRvbnMgPSAoKSA9PiB7XG4gICQoJy50b3AtbWVudS1idXR0b25zIGJ1dHRvbicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgZGlzYWJsZUZsb3dDb250cm9sKCk7XG4gIGFwcC5nZXRFZGl0b3IoKS51bmhpZ2hsaWdodExpbmUoKTtcbn07XG5cbmNvbnN0IHNldEludGVydmFsID0gKHZhbCkgPT4ge1xuICAkKCcjaW50ZXJ2YWwnKS52YWwoaW50ZXJ2YWwpO1xufTtcblxuY29uc3QgYWN0aXZhdGVCdG5QYXVzZSA9ICgpID0+IHtcbiAgJCgnI2J0bl9wYXVzZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbn07XG5cbmNvbnN0IGRlYWN0aXZhdGVCdG5QYXVzZSA9ICgpID0+IHtcbiAgJCgnI2J0bl9wYXVzZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbmFibGVGbG93Q29udHJvbCxcbiAgZGlzYWJsZUZsb3dDb250cm9sLFxuICByZXNldFRvcE1lbnVCdXR0b25zLFxuICBzZXRJbnRlcnZhbCxcbiAgYWN0aXZhdGVCdG5QYXVzZSxcbiAgZGVhY3RpdmF0ZUJ0blBhdXNlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlkKSB7XG4gIGNvbnN0IGVkaXRvciA9IGFjZS5lZGl0KGlkKTtcblxuICBlZGl0b3Iuc2V0T3B0aW9ucyh7XG4gICAgZW5hYmxlQmFzaWNBdXRvY29tcGxldGlvbjogdHJ1ZSxcbiAgICBlbmFibGVTbmlwcGV0czogdHJ1ZSxcbiAgICBlbmFibGVMaXZlQXV0b2NvbXBsZXRpb246IHRydWVcbiAgfSk7XG5cbiAgZWRpdG9yLnNldFRoZW1lKCdhY2UvdGhlbWUvdG9tb3Jyb3dfbmlnaHRfZWlnaHRpZXMnKTtcbiAgZWRpdG9yLnNlc3Npb24uc2V0TW9kZSgnYWNlL21vZGUvamF2YXNjcmlwdCcpO1xuICBlZGl0b3IuJGJsb2NrU2Nyb2xsaW5nID0gSW5maW5pdHk7XG5cbiAgcmV0dXJuIGVkaXRvcjtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBleGVjdXRlID0gKHRyYWNlck1hbmFnZXIsIGNvZGUsIGRhdGFMaW5lcykgPT4ge1xuICAvLyBhbGwgbW9kdWxlcyBhdmFpbGFibGUgdG8gZXZhbCBhcmUgb2J0YWluZWQgZnJvbSB3aW5kb3dcbiAgdHJ5IHtcbiAgICB0cmFjZXJNYW5hZ2VyLmRlYWxsb2NhdGVBbGwoKTtcbiAgICBjb25zdCBsaW5lcyA9IGNvZGUuc3BsaXQoJ1xcbicpO1xuICAgIGNvbnN0IG5ld0xpbmVzID0gW107XG4gICAgbGluZXMuZm9yRWFjaCgobGluZSwgaSkgPT4ge1xuICAgICAgbmV3TGluZXMucHVzaChsaW5lLnJlcGxhY2UoLyguK1xcLiAqX3dhaXQgKikoXFwoICpcXCkpL2csIGAkMSgke2kgLSBkYXRhTGluZXN9KWApKTtcbiAgICB9KTtcbiAgICBldmFsKEJhYmVsLnRyYW5zZm9ybShuZXdMaW5lcy5qb2luKCdcXG4nKSwge3ByZXNldHM6IFsnZXMyMDE1J119KS5jb2RlKTtcbiAgICB0cmFjZXJNYW5hZ2VyLnZpc3VhbGl6ZSgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyYWNlck1hbmFnZXIucmVtb3ZlVW5hbGxvY2F0ZWQoKTtcbiAgfVxufTtcblxuY29uc3QgZXhlY3V0ZURhdGEgPSAodHJhY2VyTWFuYWdlciwgYWxnb0RhdGEpID0+IHtcbiAgcmV0dXJuIGV4ZWN1dGUodHJhY2VyTWFuYWdlciwgYWxnb0RhdGEpO1xufTtcblxuY29uc3QgZXhlY3V0ZURhdGFBbmRDb2RlID0gKHRyYWNlck1hbmFnZXIsIGFsZ29EYXRhLCBhbGdvQ29kZSkgPT4ge1xuICBjb25zdCBkYXRhTGluZXMgPSBhbGdvRGF0YS5zcGxpdCgnXFxuJykubGVuZ3RoO1xuICByZXR1cm4gZXhlY3V0ZSh0cmFjZXJNYW5hZ2VyLCBgJHthbGdvRGF0YX1cXG4ke2FsZ29Db2RlfWAsIGRhdGFMaW5lcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXhlY3V0ZURhdGEsXG4gIGV4ZWN1dGVEYXRhQW5kQ29kZVxufTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL2FwcCcpO1xuY29uc3QgY3JlYXRlRWRpdG9yID0gcmVxdWlyZSgnLi9jcmVhdGUnKTtcbmNvbnN0IEV4ZWN1dG9yID0gcmVxdWlyZSgnLi9leGVjdXRvcicpO1xuY29uc3QgVG9wTWVudSA9IHJlcXVpcmUoJy4uL2RvbS90b3BfbWVudScpO1xuXG5mdW5jdGlvbiBFZGl0b3IodHJhY2VyTWFuYWdlcikge1xuICBpZiAoIXRyYWNlck1hbmFnZXIpIHtcbiAgICB0aHJvdyAnQ2Fubm90IGNyZWF0ZSBFZGl0b3IuIE1pc3NpbmcgdGhlIHRyYWNlck1hbmFnZXInO1xuICB9XG5cbiAgYWNlLnJlcXVpcmUoJ2FjZS9leHQvbGFuZ3VhZ2VfdG9vbHMnKTtcbiAgY29uc3QgUmFuZ2UgPSBhY2UucmVxdWlyZShcImFjZS9yYW5nZVwiKS5SYW5nZTtcblxuICB0aGlzLmRhdGFFZGl0b3IgPSBjcmVhdGVFZGl0b3IoJ2RhdGEnKTtcbiAgdGhpcy5jb2RlRWRpdG9yID0gY3JlYXRlRWRpdG9yKCdjb2RlJyk7XG5cbiAgLy8gU2V0dGluZyBkYXRhXG5cbiAgdGhpcy5zZXREYXRhID0gKGRhdGEpID0+IHtcbiAgICB0aGlzLmRhdGFFZGl0b3Iuc2V0VmFsdWUoZGF0YSwgLTEpO1xuICB9O1xuXG4gIHRoaXMuc2V0Q29kZSA9IChjb2RlKSA9PiB7XG4gICAgdGhpcy5jb2RlRWRpdG9yLnNldFZhbHVlKGNvZGUsIC0xKTtcbiAgfTtcblxuICB0aGlzLnNldENvbnRlbnQgPSAoKHtcbiAgICBkYXRhLFxuICAgIGNvZGVcbiAgfSkgPT4ge1xuICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcbiAgICB0aGlzLnNldENvZGUoY29kZSk7XG4gIH0pO1xuXG4gIC8vIENsZWFyaW5nIGRhdGFcblxuICB0aGlzLmNsZWFyRGF0YSA9ICgpID0+IHtcbiAgICB0aGlzLmRhdGFFZGl0b3Iuc2V0VmFsdWUoJycpO1xuICB9O1xuXG4gIHRoaXMuY2xlYXJDb2RlID0gKCkgPT4ge1xuICAgIHRoaXMuY29kZUVkaXRvci5zZXRWYWx1ZSgnJyk7XG4gIH07XG5cbiAgdGhpcy5jbGVhckNvbnRlbnQgPSAoKSA9PiB7XG4gICAgdGhpcy5jbGVhckRhdGEoKTtcbiAgICB0aGlzLmNsZWFyQ29kZSgpO1xuICB9O1xuXG4gIHRoaXMuZXhlY3V0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5kYXRhRWRpdG9yLmdldFZhbHVlKCk7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuY29kZUVkaXRvci5nZXRWYWx1ZSgpO1xuICAgIHJldHVybiBFeGVjdXRvci5leGVjdXRlRGF0YUFuZENvZGUodHJhY2VyTWFuYWdlciwgZGF0YSwgY29kZSk7XG4gIH07XG5cbiAgdGhpcy5oaWdobGlnaHRMaW5lID0gKGxpbmVOdW1iZXIpID0+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gdGhpcy5jb2RlRWRpdG9yLmdldFNlc3Npb24oKTtcbiAgICBpZiAodGhpcy5tYXJrZXIpIHNlc3Npb24ucmVtb3ZlTWFya2VyKHRoaXMubWFya2VyKTtcbiAgICB0aGlzLm1hcmtlciA9IHNlc3Npb24uYWRkTWFya2VyKG5ldyBSYW5nZShsaW5lTnVtYmVyLCAwLCBsaW5lTnVtYmVyLCBJbmZpbml0eSksIFwiZXhlY3V0aW5nXCIsIFwibGluZVwiLCB0cnVlKTtcbiAgfTtcblxuICB0aGlzLnVuaGlnaGxpZ2h0TGluZSA9ICgpID0+IHtcbiAgICBjb25zdCBzZXNzaW9uID0gdGhpcy5jb2RlRWRpdG9yLmdldFNlc3Npb24oKTtcbiAgICBpZiAodGhpcy5tYXJrZXIpIHNlc3Npb24ucmVtb3ZlTWFya2VyKHRoaXMubWFya2VyKTtcbiAgfTtcblxuICB0aGlzLnJlc2l6ZSA9ICgpID0+IHtcbiAgICB0aGlzLmRhdGFFZGl0b3IucmVzaXplKCk7XG4gICAgdGhpcy5jb2RlRWRpdG9yLnJlc2l6ZSgpO1xuICB9O1xuXG4gIC8vIGxpc3RlbmVyc1xuXG4gIHRoaXMuZGF0YUVkaXRvci5vbignY2hhbmdlJywgKCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGFFZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBsYXN0RmlsZVVzZWQgPSBhcHAuZ2V0TGFzdEZpbGVVc2VkKCk7XG4gICAgaWYgKGxhc3RGaWxlVXNlZCkge1xuICAgICAgYXBwLnVwZGF0ZUNhY2hlZEZpbGUobGFzdEZpbGVVc2VkLCB7XG4gICAgICAgIGRhdGFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBFeGVjdXRvci5leGVjdXRlRGF0YSh0cmFjZXJNYW5hZ2VyLCBkYXRhKTtcbiAgICBUb3BNZW51LnJlc2V0VG9wTWVudUJ1dHRvbnMoKTtcbiAgfSk7XG5cbiAgdGhpcy5jb2RlRWRpdG9yLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuY29kZUVkaXRvci5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IGxhc3RGaWxlVXNlZCA9IGFwcC5nZXRMYXN0RmlsZVVzZWQoKTtcbiAgICBpZiAobGFzdEZpbGVVc2VkKSB7XG4gICAgICBhcHAudXBkYXRlQ2FjaGVkRmlsZShsYXN0RmlsZVVzZWQsIHtcbiAgICAgICAgY29kZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRyYWNlck1hbmFnZXIucmVzZXQoKTtcbiAgICBUb3BNZW51LnJlc2V0VG9wTWVudUJ1dHRvbnMoKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yOyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgUlNWUCA9IHJlcXVpcmUoJ3JzdnAnKTtcbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4vYXBwJyk7XG5jb25zdCBBcHBDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vYXBwL2NvbnN0cnVjdG9yJyk7XG5jb25zdCBET00gPSByZXF1aXJlKCcuL2RvbScpO1xuY29uc3QgU2VydmVyID0gcmVxdWlyZSgnLi9zZXJ2ZXInKTtcbmNvbnN0IG1vZHVsZXMgPSByZXF1aXJlKCcuL21vZHVsZScpO1xuXG5jb25zdCB7XG4gIGV4dGVuZFxufSA9ICQ7XG5cbiQuYWpheFNldHVwKHtcbiAgY2FjaGU6IGZhbHNlLFxuICBkYXRhVHlwZTogJ3RleHQnXG59KTtcblxuY29uc3Qge1xuICBpc1NjcmF0Y2hQYXBlclxufSA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuY29uc3Qge1xuICBnZXRIYXNoVmFsdWUsXG4gIGdldFBhcmFtZXRlckJ5TmFtZSxcbiAgZ2V0UGF0aFxufSA9IHJlcXVpcmUoJy4vc2VydmVyL2hlbHBlcnMnKTtcblxuLy8gc2V0IGdsb2JhbCBwcm9taXNlIGVycm9yIGhhbmRsZXJcblJTVlAub24oJ2Vycm9yJywgZnVuY3Rpb24gKHJlYXNvbikge1xuICBjb25zb2xlLmFzc2VydChmYWxzZSwgcmVhc29uKTtcbn0pO1xuXG4kKCgpID0+IHtcbiAgLy8gaW5pdGlhbGl6ZSB0aGUgYXBwbGljYXRpb24gYW5kIGF0dGFjaCBpbiB0byB0aGUgaW5zdGFuY2UgbW9kdWxlXG4gIGNvbnN0IGFwcENvbnN0cnVjdG9yID0gbmV3IEFwcENvbnN0cnVjdG9yKCk7XG4gIGV4dGVuZCh0cnVlLCBhcHAsIGFwcENvbnN0cnVjdG9yKTtcblxuICAvLyBsb2FkIG1vZHVsZXMgdG8gdGhlIGdsb2JhbCBzY29wZSBzbyB0aGV5IGNhbiBiZSBldmFsZWRcbiAgZXh0ZW5kKHRydWUsIHdpbmRvdywgbW9kdWxlcyk7XG5cbiAgU2VydmVyLmxvYWRDYXRlZ29yaWVzKCkudGhlbigoZGF0YSkgPT4ge1xuICAgIGFwcC5zZXRDYXRlZ29yaWVzKGRhdGEpO1xuICAgIERPTS5hZGRDYXRlZ29yaWVzKCk7XG5cbiAgICAvL2VuYWJsZSBzZWFyY2ggZmVhdHVyZVxuICAgIERPTS5lbmFibGVTZWFyY2ggKCk7XG4gICAgLy9lbmFibGUgZnVsbHNjcmVlbiBmZWF0dXJlXG4gICAgRE9NLmVuYWJsZUZ1bGxTY3JlZW4gKCk7XG5cbiAgICAvLyBkZXRlcm1pbmUgaWYgdGhlIGFwcCBpcyBsb2FkaW5nIGEgcHJlLWV4aXN0aW5nIHNjcmF0Y2gtcGFkXG4gICAgLy8gb3IgdGhlIGhvbWUgcGFnZVxuICAgIGNvbnN0IHtcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgYWxnb3JpdGhtLFxuICAgICAgZmlsZVxuICAgIH0gPSBnZXRQYXRoKCk7XG4gICAgaWYgKGlzU2NyYXRjaFBhcGVyKGNhdGVnb3J5KSkge1xuICAgICAgaWYgKGFsZ29yaXRobSkge1xuICAgICAgICBTZXJ2ZXIubG9hZFNjcmF0Y2hQYXBlcihhbGdvcml0aG0pLnRoZW4oKHtjYXRlZ29yeSwgYWxnb3JpdGhtLCBkYXRhfSkgPT4ge1xuICAgICAgICAgIERPTS5zaG93QWxnb3JpdGhtKGNhdGVnb3J5LCBhbGdvcml0aG0sIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNlcnZlci5sb2FkQWxnb3JpdGhtKGNhdGVnb3J5KS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgRE9NLnNob3dBbGdvcml0aG0oY2F0ZWdvcnksIG51bGwsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNhdGVnb3J5ICYmIGFsZ29yaXRobSkge1xuICAgICAgRE9NLnNob3dSZXF1ZXN0ZWRBbGdvcml0aG0oY2F0ZWdvcnksIGFsZ29yaXRobSwgZmlsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIERPTS5zaG93Rmlyc3RBbGdvcml0aG0oKTtcbiAgICB9XG5cbiAgfSk7XG5cbiAgU2VydmVyLmxvYWRXaWtpTGlzdCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICBhcHAuc2V0V2lraUxpc3QoZGF0YS53aWtpcyk7XG5cbiAgICBET00uc2hvd1dpa2koJ1RyYWNlcicpO1xuICB9KTtcblxuICB2YXIgdjFMb2FkZWRTY3JhdGNoID0gZ2V0SGFzaFZhbHVlKCdzY3JhdGNoLXBhcGVyJyk7XG4gIHZhciB2MkxvYWRlZFNjcmF0Y2ggPSBnZXRQYXJhbWV0ZXJCeU5hbWUoJ3NjcmF0Y2gtcGFwZXInKTtcbiAgdmFyIHZMb2FkZWRTY3JhdGNoID0gdjFMb2FkZWRTY3JhdGNoIHx8IHYyTG9hZGVkU2NyYXRjaDtcbiAgaWYgKHZMb2FkZWRTY3JhdGNoKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyAnI3BhdGg9c2NyYXRjaC8nICsgdkxvYWRlZFNjcmF0Y2g7XG4gIH1cblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEFycmF5MkQgPSByZXF1aXJlKCcuL2FycmF5MmQnKTtcblxuY29uc3QgcmFuZG9tID0gKE4sIG1pbiwgbWF4KSA9PiB7XG4gIHJldHVybiBBcnJheTJELnJhbmRvbSgxLCBOLCBtaW4sIG1heClbMF07XG59O1xuXG5jb25zdCByYW5kb21Tb3J0ZWQgPSAoTiwgbWluLCBtYXgpPT4ge1xuICByZXR1cm4gQXJyYXkyRC5yYW5kb21Tb3J0ZWQoMSwgTiwgbWluLCBtYXgpWzBdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJhbmRvbSxcbiAgcmFuZG9tU29ydGVkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnRlZ2VyID0gcmVxdWlyZSgnLi9pbnRlZ2VyJyk7XG5cbmNvbnN0IHJhbmRvbSA9IChOLCBNLCBtaW4sIG1heCkgPT4ge1xuICBpZiAoIU4pIE4gPSAxMDtcbiAgaWYgKCFNKSBNID0gMTA7XG4gIGlmIChtaW4gPT09IHVuZGVmaW5lZCkgbWluID0gMTtcbiAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSBtYXggPSA5O1xuICB2YXIgRCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgIEQucHVzaChbXSk7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBNOyBqKyspIHtcbiAgICAgIERbaV0ucHVzaChJbnRlZ2VyLnJhbmRvbShtaW4sIG1heCkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gRDtcbn07XG5cbmNvbnN0IHJhbmRvbVNvcnRlZCA9IChOLCBNLCBtaW4sIG1heCkgPT4ge1xuICByZXR1cm4gcmFuZG9tKE4sIE0sIG1pbiwgbWF4KS5tYXAoZnVuY3Rpb24gKGFycikge1xuICAgIHJldHVybiBhcnIuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEgLSBiO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByYW5kb20sXG4gIHJhbmRvbVNvcnRlZFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgSW50ZWdlciA9IHJlcXVpcmUoJy4vaW50ZWdlcicpO1xuXG5jb25zdCByYW5kb20gPSAoTiwgbWluLCBtYXgpID0+IHtcbiAgaWYgKCFOKSBOID0gNztcbiAgaWYgKCFtaW4pIG1pbiA9IDE7XG4gIGlmICghbWF4KSBtYXggPSAxMDtcbiAgdmFyIEMgPSBuZXcgQXJyYXkoTik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgTjsgaSsrKSBDW2ldID0gbmV3IEFycmF5KDIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKylcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IENbaV0ubGVuZ3RoOyBqKyspXG4gICAgICBDW2ldW2pdID0gSW50ZWdlci5yYW5kb20obWluLCBtYXgpO1xuICByZXR1cm4gQztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByYW5kb21cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHJhbmRvbSA9IChOLCByYXRpbykgPT4ge1xuICBpZiAoIU4pIE4gPSA1O1xuICBpZiAoIXJhdGlvKSByYXRpbyA9IC4zO1xuICB2YXIgRyA9IG5ldyBBcnJheShOKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICBHW2ldID0gbmV3IEFycmF5KE4pO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgTjsgaisrKSB7XG4gICAgICBpZiAoaSAhPSBqKSB7XG4gICAgICAgIEdbaV1bal0gPSAoTWF0aC5yYW5kb20oKSAqICgxIC8gcmF0aW8pIHwgMCkgPT0gMCA/IDEgOiAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gRztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByYW5kb21cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEludGVnZXIgPSByZXF1aXJlKCcuL2ludGVnZXInKTtcbmNvbnN0IEFycmF5MUQgPSByZXF1aXJlKCcuL2FycmF5MWQnKTtcbmNvbnN0IEFycmF5MkQgPSByZXF1aXJlKCcuL2FycmF5MmQnKTtcbmNvbnN0IENvb3JkaW5hdGVTeXN0ZW0gPSByZXF1aXJlKCcuL2Nvb3JkaW5hdGVfc3lzdGVtJyk7XG5jb25zdCBEaXJlY3RlZEdyYXBoID0gcmVxdWlyZSgnLi9kaXJlY3RlZF9ncmFwaCcpO1xuY29uc3QgVW5kaXJlY3RlZEdyYXBoID0gcmVxdWlyZSgnLi91bmRpcmVjdGVkX2dyYXBoJyk7XG5jb25zdCBXZWlnaHRlZERpcmVjdGVkR3JhcGggPSByZXF1aXJlKCcuL3dlaWdodGVkX2RpcmVjdGVkX2dyYXBoJyk7XG5jb25zdCBXZWlnaHRlZFVuZGlyZWN0ZWRHcmFwaCA9IHJlcXVpcmUoJy4vd2VpZ2h0ZWRfdW5kaXJlY3RlZF9ncmFwaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSW50ZWdlcixcbiAgQXJyYXkxRCxcbiAgQXJyYXkyRCxcbiAgQ29vcmRpbmF0ZVN5c3RlbSxcbiAgRGlyZWN0ZWRHcmFwaCxcbiAgVW5kaXJlY3RlZEdyYXBoLFxuICBXZWlnaHRlZERpcmVjdGVkR3JhcGgsXG4gIFdlaWdodGVkVW5kaXJlY3RlZEdyYXBoXG59OyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcmFuZG9tID0gKG1pbiwgbWF4KSA9PiB7XG4gIHJldHVybiAoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSB8IDApICsgbWluO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJhbmRvbVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcmFuZG9tID0gKE4sIHJhdGlvKSA9PiB7XG4gIGlmICghTikgTiA9IDU7XG4gIGlmICghcmF0aW8pIHJhdGlvID0gLjM7XG4gIHZhciBHID0gbmV3IEFycmF5KE4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykgR1tpXSA9IG5ldyBBcnJheShOKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IE47IGorKykge1xuICAgICAgaWYgKGkgPiBqKSB7XG4gICAgICAgIEdbaV1bal0gPSBHW2pdW2ldID0gKE1hdGgucmFuZG9tKCkgKiAoMSAvIHJhdGlvKSB8IDApID09IDAgPyAxIDogMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIEc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmFuZG9tXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnRlZ2VyID0gcmVxdWlyZSgnLi9pbnRlZ2VyJyk7XG5cbmNvbnN0IHJhbmRvbSA9IChOLCByYXRpbywgbWluLCBtYXgpID0+IHtcbiAgaWYgKCFOKSBOID0gNTtcbiAgaWYgKCFyYXRpbykgcmF0aW8gPSAuMztcbiAgaWYgKCFtaW4pIG1pbiA9IDE7XG4gIGlmICghbWF4KSBtYXggPSA1O1xuICB2YXIgRyA9IG5ldyBBcnJheShOKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICBHW2ldID0gbmV3IEFycmF5KE4pO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgTjsgaisrKSB7XG4gICAgICBpZiAoaSAhPSBqICYmIChNYXRoLnJhbmRvbSgpICogKDEgLyByYXRpbykgfCAwKSA9PSAwKSB7XG4gICAgICAgIEdbaV1bal0gPSBJbnRlZ2VyLnJhbmRvbShtaW4sIG1heCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBHO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJhbmRvbVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgSW50ZWdlciA9IHJlcXVpcmUoJy4vaW50ZWdlcicpO1xuXG5jb25zdCByYW5kb20gPSAoTiwgcmF0aW8sIG1pbiwgbWF4KSA9PiB7XG4gIGlmICghTikgTiA9IDU7XG4gIGlmICghcmF0aW8pIHJhdGlvID0gLjM7XG4gIGlmICghbWluKSBtaW4gPSAxO1xuICBpZiAoIW1heCkgbWF4ID0gNTtcbiAgdmFyIEcgPSBuZXcgQXJyYXkoTik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgTjsgaSsrKSBHW2ldID0gbmV3IEFycmF5KE4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IE47IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgTjsgaisrKSB7XG4gICAgICBpZiAoaSA+IGogJiYgKE1hdGgucmFuZG9tKCkgKiAoMSAvIHJhdGlvKSB8IDApID09IDApIHtcbiAgICAgICAgR1tpXVtqXSA9IEdbal1baV0gPSBJbnRlZ2VyLnJhbmRvbShtaW4sIG1heCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBHO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJhbmRvbVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRyYWNlcnMgPSByZXF1aXJlKCcuL3RyYWNlcicpO1xudmFyIGRhdGFzID0gcmVxdWlyZSgnLi9kYXRhJyk7XG5cbmNvbnN0IHtcbiAgZXh0ZW5kXG59ID0gJDtcblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQodHJ1ZSwge30sIHRyYWNlcnMsIGRhdGFzKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQXJyYXkyRFRyYWNlciA9IHJlcXVpcmUoJy4vYXJyYXkyZCcpO1xuXG5jbGFzcyBBcnJheTFEVHJhY2VyIGV4dGVuZHMgQXJyYXkyRFRyYWNlciB7XG4gIHN0YXRpYyBnZXRDbGFzc05hbWUoKSB7XG4gICAgcmV0dXJuICdBcnJheTFEVHJhY2VyJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcihuYW1lKTtcbiAgfVxuXG4gIF9ub3RpZnkoaWR4LCB2KSB7XG4gICAgc3VwZXIuX25vdGlmeSgwLCBpZHgsIHYpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2Rlbm90aWZ5KGlkeCkge1xuICAgIHN1cGVyLl9kZW5vdGlmeSgwLCBpZHgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX3NlbGVjdChzLCBlKSB7XG4gICAgaWYgKGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc3VwZXIuX3NlbGVjdCgwLCBzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuX3NlbGVjdFJvdygwLCBzLCBlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfZGVzZWxlY3QocywgZSkge1xuICAgIGlmIChlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHN1cGVyLl9kZXNlbGVjdCgwLCBzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuX2Rlc2VsZWN0Um93KDAsIHMsIGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByb2Nlc3NTdGVwKHN0ZXAsIG9wdGlvbnMpIHtcbiAgICBzdXBlci5wcm9jZXNzU3RlcChzdGVwLCBvcHRpb25zKTtcbiAgICBpZiAodGhpcy5jaGFydFRyYWNlcikge1xuICAgICAgY29uc3QgbmV3U3RlcCA9ICQuZXh0ZW5kKHRydWUsIHt9LCBzdGVwKTtcbiAgICAgIG5ld1N0ZXAuY2Fwc3VsZSA9IHRoaXMuY2hhcnRUcmFjZXIuY2Fwc3VsZTtcbiAgICAgIG5ld1N0ZXAucyA9IG5ld1N0ZXAuc3k7XG4gICAgICBuZXdTdGVwLmUgPSBuZXdTdGVwLmV5O1xuICAgICAgaWYgKG5ld1N0ZXAucyA9PT0gdW5kZWZpbmVkKSBuZXdTdGVwLnMgPSBuZXdTdGVwLnk7XG4gICAgICBkZWxldGUgbmV3U3RlcC54O1xuICAgICAgZGVsZXRlIG5ld1N0ZXAueTtcbiAgICAgIGRlbGV0ZSBuZXdTdGVwLnN4O1xuICAgICAgZGVsZXRlIG5ld1N0ZXAuc3k7XG4gICAgICBkZWxldGUgbmV3U3RlcC5leDtcbiAgICAgIGRlbGV0ZSBuZXdTdGVwLmV5O1xuICAgICAgdGhpcy5jaGFydFRyYWNlci5wcm9jZXNzU3RlcChuZXdTdGVwLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBzZXREYXRhKEQpIHtcbiAgICByZXR1cm4gc3VwZXIuc2V0RGF0YShbRF0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkxRFRyYWNlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgVHJhY2VyID0gcmVxdWlyZSgnLi90cmFjZXInKTtcblxuY29uc3Qge1xuICByZWZpbmVCeVR5cGVcbn0gPSByZXF1aXJlKCcuLi8uLi90cmFjZXJfbWFuYWdlci91dGlsL2luZGV4Jyk7XG5cbmNsYXNzIEFycmF5MkRUcmFjZXIgZXh0ZW5kcyBUcmFjZXIge1xuICBzdGF0aWMgZ2V0Q2xhc3NOYW1lKCkge1xuICAgIHJldHVybiAnQXJyYXkyRFRyYWNlcic7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgc3VwZXIobmFtZSk7XG5cbiAgICBpZiAodGhpcy5pc05ldykgaW5pdFZpZXcodGhpcyk7XG4gIH1cblxuICBfbm90aWZ5KHgsIHksIHYpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAnbm90aWZ5JyxcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5LFxuICAgICAgdjogdlxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2Rlbm90aWZ5KHgsIHkpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAnZGVub3RpZnknLFxuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9zZWxlY3Qoc3gsIHN5LCBleCwgZXkpIHtcbiAgICB0aGlzLnB1c2hTZWxlY3RpbmdTdGVwKCdzZWxlY3QnLCBudWxsLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX3NlbGVjdFJvdyh4LCBzeSwgZXkpIHtcbiAgICB0aGlzLnB1c2hTZWxlY3RpbmdTdGVwKCdzZWxlY3QnLCAncm93JywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9zZWxlY3RDb2woeSwgc3gsIGV4KSB7XG4gICAgdGhpcy5wdXNoU2VsZWN0aW5nU3RlcCgnc2VsZWN0JywgJ2NvbCcsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfZGVzZWxlY3Qoc3gsIHN5LCBleCwgZXkpIHtcbiAgICB0aGlzLnB1c2hTZWxlY3RpbmdTdGVwKCdkZXNlbGVjdCcsIG51bGwsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfZGVzZWxlY3RSb3coeCwgc3ksIGV5KSB7XG4gICAgdGhpcy5wdXNoU2VsZWN0aW5nU3RlcCgnZGVzZWxlY3QnLCAncm93JywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9kZXNlbGVjdENvbCh5LCBzeCwgZXgpIHtcbiAgICB0aGlzLnB1c2hTZWxlY3RpbmdTdGVwKCdkZXNlbGVjdCcsICdjb2wnLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX3NlcGFyYXRlKHgsIHkpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAnc2VwYXJhdGUnLFxuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9zZXBhcmF0ZVJvdyh4KSB7XG4gICAgdGhpcy5fc2VwYXJhdGUoeCwgLTEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX3NlcGFyYXRlQ29sKHkpIHtcbiAgICB0aGlzLl9zZXBhcmF0ZSgtMSwgeSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfZGVzZXBhcmF0ZSh4LCB5KSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ2Rlc2VwYXJhdGUnLFxuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9kZXNlcGFyYXRlUm93KHgpIHtcbiAgICB0aGlzLl9kZXNlcGFyYXRlKHgsIC0xKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9kZXNlcGFyYXRlQ29sKHkpIHtcbiAgICB0aGlzLl9kZXNlcGFyYXRlKC0xLCB5KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1c2hTZWxlY3RpbmdTdGVwKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB2YXIgdHlwZSA9IGFyZ3Muc2hpZnQoKTtcbiAgICB2YXIgbW9kZSA9IGFyZ3Muc2hpZnQoKTtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncy5zaGlmdCgpKTtcbiAgICB2YXIgY29vcmQ7XG4gICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICBjYXNlICdyb3cnOlxuICAgICAgICBjb29yZCA9IHtcbiAgICAgICAgICB4OiBhcmdzWzBdLFxuICAgICAgICAgIHN5OiBhcmdzWzFdLFxuICAgICAgICAgIGV5OiBhcmdzWzJdXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY29sJzpcbiAgICAgICAgY29vcmQgPSB7XG4gICAgICAgICAgeTogYXJnc1swXSxcbiAgICAgICAgICBzeDogYXJnc1sxXSxcbiAgICAgICAgICBleDogYXJnc1syXVxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChhcmdzWzJdID09PSB1bmRlZmluZWQgJiYgYXJnc1szXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29vcmQgPSB7XG4gICAgICAgICAgICB4OiBhcmdzWzBdLFxuICAgICAgICAgICAgeTogYXJnc1sxXVxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29vcmQgPSB7XG4gICAgICAgICAgICBzeDogYXJnc1swXSxcbiAgICAgICAgICAgIHN5OiBhcmdzWzFdLFxuICAgICAgICAgICAgZXg6IGFyZ3NbMl0sXG4gICAgICAgICAgICBleTogYXJnc1szXVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHN0ZXAgPSB7XG4gICAgICB0eXBlOiB0eXBlXG4gICAgfTtcbiAgICAkLmV4dGVuZChzdGVwLCBjb29yZCk7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwgc3RlcCk7XG4gIH1cblxuICBwcm9jZXNzU3RlcChzdGVwLCBvcHRpb25zKSB7XG4gICAgc3dpdGNoIChzdGVwLnR5cGUpIHtcbiAgICAgIGNhc2UgJ25vdGlmeSc6XG4gICAgICAgIGlmIChzdGVwLnYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHZhciAkcm93ID0gdGhpcy4kdGFibGUuZmluZCgnLm10Ymwtcm93JykuZXEoc3RlcC54KTtcbiAgICAgICAgICB2YXIgJGNvbCA9ICRyb3cuZmluZCgnLm10YmwtY29sJykuZXEoc3RlcC55KTtcbiAgICAgICAgICAkY29sLnRleHQocmVmaW5lQnlUeXBlKHN0ZXAudikpO1xuICAgICAgICB9XG4gICAgICBjYXNlICdkZW5vdGlmeSc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgY2FzZSAnZGVzZWxlY3QnOlxuICAgICAgICB2YXIgY29sb3IgPSBzdGVwLnR5cGUgPT0gJ3NlbGVjdCcgfHwgc3RlcC50eXBlID09ICdkZXNlbGVjdCcgPyB0aGlzLmNvbG9yLnNlbGVjdGVkIDogdGhpcy5jb2xvci5ub3RpZmllZDtcbiAgICAgICAgdmFyIHBhaW50ID0gc3RlcC50eXBlID09ICdzZWxlY3QnIHx8IHN0ZXAudHlwZSA9PSAnbm90aWZ5JztcbiAgICAgICAgdmFyIHN4ID0gc3RlcC5zeDtcbiAgICAgICAgdmFyIHN5ID0gc3RlcC5zeTtcbiAgICAgICAgdmFyIGV4ID0gc3RlcC5leDtcbiAgICAgICAgdmFyIGV5ID0gc3RlcC5leTtcbiAgICAgICAgaWYgKHN4ID09PSB1bmRlZmluZWQpIHN4ID0gc3RlcC54O1xuICAgICAgICBpZiAoc3kgPT09IHVuZGVmaW5lZCkgc3kgPSBzdGVwLnk7XG4gICAgICAgIGlmIChleCA9PT0gdW5kZWZpbmVkKSBleCA9IHN0ZXAueDtcbiAgICAgICAgaWYgKGV5ID09PSB1bmRlZmluZWQpIGV5ID0gc3RlcC55O1xuICAgICAgICB0aGlzLnBhaW50Q29sb3Ioc3gsIHN5LCBleCwgZXksIGNvbG9yLCBwYWludCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2VwYXJhdGUnOlxuICAgICAgICB0aGlzLmRlc2VwYXJhdGUoc3RlcC54LCBzdGVwLnkpO1xuICAgICAgICB0aGlzLnNlcGFyYXRlKHN0ZXAueCwgc3RlcC55KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkZXNlcGFyYXRlJzpcbiAgICAgICAgdGhpcy5kZXNlcGFyYXRlKHN0ZXAueCwgc3RlcC55KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdXBlci5wcm9jZXNzU3RlcChzdGVwLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBzZXREYXRhKEQpIHtcbiAgICB0aGlzLnZpZXdYID0gdGhpcy52aWV3WSA9IDA7XG4gICAgdGhpcy5wYWRkaW5nSCA9IDY7XG4gICAgdGhpcy5wYWRkaW5nViA9IDM7XG4gICAgdGhpcy5mb250U2l6ZSA9IDE2O1xuXG4gICAgaWYgKHN1cGVyLnNldERhdGEuYXBwbHkodGhpcywgYXJndW1lbnRzKSkge1xuICAgICAgdGhpcy4kdGFibGUuZmluZCgnLm10Ymwtcm93JykuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5tdGJsLWNvbCcpLmVhY2goZnVuY3Rpb24gKGopIHtcbiAgICAgICAgICAkKHRoaXMpLnRleHQocmVmaW5lQnlUeXBlKERbaV1bal0pKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuJHRhYmxlLmVtcHR5KCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBELmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgJHJvdyA9ICQoJzxkaXYgY2xhc3M9XCJtdGJsLXJvd1wiPicpO1xuICAgICAgdGhpcy4kdGFibGUuYXBwZW5kKCRyb3cpO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBEW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciAkY29sID0gJCgnPGRpdiBjbGFzcz1cIm10YmwtY29sXCI+JylcbiAgICAgICAgICAuY3NzKHRoaXMuZ2V0Q2VsbENzcygpKVxuICAgICAgICAgIC50ZXh0KHJlZmluZUJ5VHlwZShEW2ldW2pdKSk7XG4gICAgICAgICRyb3cuYXBwZW5kKCRjb2wpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlc2l6ZSgpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmVzaXplKCkge1xuICAgIHN1cGVyLnJlc2l6ZSgpO1xuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICBzdXBlci5jbGVhcigpO1xuXG4gICAgdGhpcy5jbGVhckNvbG9yKCk7XG4gICAgdGhpcy5kZXNlcGFyYXRlQWxsKCk7XG4gIH1cblxuICBnZXRDZWxsQ3NzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWRkaW5nOiB0aGlzLnBhZGRpbmdWLnRvRml4ZWQoMSkgKyAncHggJyArIHRoaXMucGFkZGluZ0gudG9GaXhlZCgxKSArICdweCcsXG4gICAgICAnZm9udC1zaXplJzogdGhpcy5mb250U2l6ZS50b0ZpeGVkKDEpICsgJ3B4J1xuICAgIH07XG4gIH1cblxuICByZWZyZXNoKCkge1xuICAgIHN1cGVyLnJlZnJlc2goKTtcblxuICAgIHZhciAkcGFyZW50ID0gdGhpcy4kdGFibGUucGFyZW50KCk7XG4gICAgdmFyIHRvcCA9ICRwYXJlbnQuaGVpZ2h0KCkgLyAyIC0gdGhpcy4kdGFibGUuaGVpZ2h0KCkgLyAyICsgdGhpcy52aWV3WTtcbiAgICB2YXIgbGVmdCA9ICRwYXJlbnQud2lkdGgoKSAvIDIgLSB0aGlzLiR0YWJsZS53aWR0aCgpIC8gMiArIHRoaXMudmlld1g7XG4gICAgdGhpcy4kdGFibGUuY3NzKCdtYXJnaW4tdG9wJywgdG9wKTtcbiAgICB0aGlzLiR0YWJsZS5jc3MoJ21hcmdpbi1sZWZ0JywgbGVmdCk7XG4gIH1cblxuICBtb3VzZWRvd24oZSkge1xuICAgIHN1cGVyLm1vdXNlZG93bihlKTtcblxuICAgIHRoaXMuZHJhZ1ggPSBlLnBhZ2VYO1xuICAgIHRoaXMuZHJhZ1kgPSBlLnBhZ2VZO1xuICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICB9XG5cbiAgbW91c2Vtb3ZlKGUpIHtcbiAgICBzdXBlci5tb3VzZW1vdmUoZSk7XG5cbiAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgdGhpcy52aWV3WCArPSBlLnBhZ2VYIC0gdGhpcy5kcmFnWDtcbiAgICAgIHRoaXMudmlld1kgKz0gZS5wYWdlWSAtIHRoaXMuZHJhZ1k7XG4gICAgICB0aGlzLmRyYWdYID0gZS5wYWdlWDtcbiAgICAgIHRoaXMuZHJhZ1kgPSBlLnBhZ2VZO1xuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2V1cChlKSB7XG4gICAgc3VwZXIubW91c2V1cChlKTtcblxuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIG1vdXNld2hlZWwoZSkge1xuICAgIHN1cGVyLm1vdXNld2hlZWwoZSk7XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICB2YXIgZGVsdGEgPSAoZS53aGVlbERlbHRhICE9PSB1bmRlZmluZWQgJiYgZS53aGVlbERlbHRhKSB8fFxuICAgICAgKGUuZGV0YWlsICE9PSB1bmRlZmluZWQgJiYgLWUuZGV0YWlsKTtcbiAgICB2YXIgd2VpZ2h0ID0gMS4wMTtcbiAgICB2YXIgcmF0aW8gPSBkZWx0YSA+IDAgPyAxIC8gd2VpZ2h0IDogd2VpZ2h0O1xuICAgIGlmICh0aGlzLmZvbnRTaXplIDwgNCAmJiByYXRpbyA8IDEpIHJldHVybjtcbiAgICBpZiAodGhpcy5mb250U2l6ZSA+IDQwICYmIHJhdGlvID4gMSkgcmV0dXJuO1xuICAgIHRoaXMucGFkZGluZ1YgKj0gcmF0aW87XG4gICAgdGhpcy5wYWRkaW5nSCAqPSByYXRpbztcbiAgICB0aGlzLmZvbnRTaXplICo9IHJhdGlvO1xuICAgIHRoaXMuJHRhYmxlLmZpbmQoJy5tdGJsLWNvbCcpLmNzcyh0aGlzLmdldENlbGxDc3MoKSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBwYWludENvbG9yKHN4LCBzeSwgZXgsIGV5LCBjb2xvciwgcGFpbnQpIHtcbiAgICBmb3IgKHZhciBpID0gc3g7IGkgPD0gZXg7IGkrKykge1xuICAgICAgdmFyICRyb3cgPSB0aGlzLiR0YWJsZS5maW5kKCcubXRibC1yb3cnKS5lcShpKTtcbiAgICAgIGZvciAodmFyIGogPSBzeTsgaiA8PSBleTsgaisrKSB7XG4gICAgICAgIHZhciAkY29sID0gJHJvdy5maW5kKCcubXRibC1jb2wnKS5lcShqKTtcbiAgICAgICAgaWYgKHBhaW50KSAkY29sLmNzcygnYmFja2dyb3VuZCcsIGNvbG9yKTtcbiAgICAgICAgZWxzZSAkY29sLmNzcygnYmFja2dyb3VuZCcsICcnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbGVhckNvbG9yKCkge1xuICAgIHRoaXMuJHRhYmxlLmZpbmQoJy5tdGJsLWNvbCcpLmNzcygnYmFja2dyb3VuZCcsICcnKTtcbiAgfVxuXG4gIHNlcGFyYXRlKHgsIHkpIHtcbiAgICB0aGlzLiR0YWJsZS5maW5kKCcubXRibC1yb3cnKS5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICB2YXIgJHJvdyA9ICQodGhpcyk7XG4gICAgICBpZiAoaSA9PSB4KSB7XG4gICAgICAgICRyb3cuYWZ0ZXIoJCgnPGRpdiBjbGFzcz1cIm10YmwtZW1wdHktcm93XCI+JykuYXR0cignZGF0YS1yb3cnLCBpKSlcbiAgICAgIH1cbiAgICAgICRyb3cuZmluZCgnLm10YmwtY29sJykuZWFjaChmdW5jdGlvbiAoaikge1xuICAgICAgICB2YXIgJGNvbCA9ICQodGhpcyk7XG4gICAgICAgIGlmIChqID09IHkpIHtcbiAgICAgICAgICAkY29sLmFmdGVyKCQoJzxkaXYgY2xhc3M9XCJtdGJsLWVtcHR5LWNvbFwiPicpLmF0dHIoJ2RhdGEtY29sJywgaikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRlc2VwYXJhdGUoeCwgeSkge1xuICAgIHRoaXMuJHRhYmxlLmZpbmQoJ1tkYXRhLXJvdz0nICsgeCArICddJykucmVtb3ZlKCk7XG4gICAgdGhpcy4kdGFibGUuZmluZCgnW2RhdGEtY29sPScgKyB5ICsgJ10nKS5yZW1vdmUoKTtcbiAgfVxuXG4gIGRlc2VwYXJhdGVBbGwoKSB7XG4gICAgdGhpcy4kdGFibGUuZmluZCgnLm10YmwtZW1wdHktcm93LCAubXRibC1lbXB0eS1jb2wnKS5yZW1vdmUoKTtcbiAgfVxufVxuXG5jb25zdCBpbml0VmlldyA9ICh0cmFjZXIpID0+IHtcbiAgdHJhY2VyLiR0YWJsZSA9IHRyYWNlci5jYXBzdWxlLiR0YWJsZSA9ICQoJzxkaXYgY2xhc3M9XCJtdGJsLXRhYmxlXCI+Jyk7XG4gIHRyYWNlci4kY29udGFpbmVyLmFwcGVuZCh0cmFjZXIuJHRhYmxlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkyRFRyYWNlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgVHJhY2VyID0gcmVxdWlyZSgnLi90cmFjZXInKTtcblxuY2xhc3MgQ2hhcnRUcmFjZXIgZXh0ZW5kcyBUcmFjZXIge1xuICBzdGF0aWMgZ2V0Q2xhc3NOYW1lKCkge1xuICAgIHJldHVybiAnQ2hhcnRUcmFjZXInO1xuICB9XG5cbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpO1xuXG4gICAgaWYgKHRoaXMuaXNOZXcpIGluaXRWaWV3KHRoaXMpO1xuICB9XG5cbiAgc2V0RGF0YShDKSB7XG4gICAgaWYgKHN1cGVyLnNldERhdGEuYXBwbHkodGhpcywgYXJndW1lbnRzKSkge1xuICAgICAgdGhpcy5jaGFydC5jb25maWcuZGF0YS5kYXRhc2V0c1swXS5kYXRhID0gQztcbiAgICAgIHRoaXMuY2hhcnQudXBkYXRlKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgY29sb3IgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IEMubGVuZ3RoOyBpKyspIGNvbG9yLnB1c2godGhpcy5jb2xvci5kZWZhdWx0KTtcbiAgICB0aGlzLmNoYXJ0LmNvbmZpZy5kYXRhID0ge1xuICAgICAgbGFiZWxzOiBDLm1hcChTdHJpbmcpLFxuICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICAgIGRhdGE6IENcbiAgICAgIH1dXG4gICAgfTtcbiAgICB0aGlzLmNoYXJ0LnVwZGF0ZSgpO1xuICB9XG5cbiAgX25vdGlmeShzLCB2KSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ25vdGlmeScsXG4gICAgICBzOiBzLFxuICAgICAgdjogdlxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2Rlbm90aWZ5KHMpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAnZGVub3RpZnknLFxuICAgICAgczogc1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX3NlbGVjdChzLCBlKSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICBzOiBzLFxuICAgICAgZTogZVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2Rlc2VsZWN0KHMsIGUpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAnZGVzZWxlY3QnLFxuICAgICAgczogcyxcbiAgICAgIGU6IGVcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByb2Nlc3NTdGVwKHN0ZXAsIG9wdGlvbnMpIHtcbiAgICBzd2l0Y2ggKHN0ZXAudHlwZSkge1xuICAgICAgY2FzZSAnbm90aWZ5JzpcbiAgICAgICAgaWYgKHN0ZXAudiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5jaGFydC5jb25maWcuZGF0YS5kYXRhc2V0c1swXS5kYXRhW3N0ZXAuc10gPSBzdGVwLnY7XG4gICAgICAgICAgdGhpcy5jaGFydC5jb25maWcuZGF0YS5sYWJlbHNbc3RlcC5zXSA9IHN0ZXAudi50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICBjYXNlICdkZW5vdGlmeSc6XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgY2FzZSAnZGVzZWxlY3QnOlxuICAgICAgICBsZXQgY29sb3IgPSBzdGVwLnR5cGUgPT0gJ25vdGlmeScgPyB0aGlzLmNvbG9yLm5vdGlmaWVkIDogc3RlcC50eXBlID09ICdzZWxlY3QnID8gdGhpcy5jb2xvci5zZWxlY3RlZCA6IHRoaXMuY29sb3IuZGVmYXVsdDtcbiAgICAgICAgaWYgKHN0ZXAuZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIGZvciAodmFyIGkgPSBzdGVwLnM7IGkgPD0gc3RlcC5lOyBpKyspXG4gICAgICAgICAgICB0aGlzLmNoYXJ0LmNvbmZpZy5kYXRhLmRhdGFzZXRzWzBdLmJhY2tncm91bmRDb2xvcltpXSA9IGNvbG9yO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGhpcy5jaGFydC5jb25maWcuZGF0YS5kYXRhc2V0c1swXS5iYWNrZ3JvdW5kQ29sb3Jbc3RlcC5zXSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNoYXJ0LnVwZGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN1cGVyLnByb2Nlc3NTdGVwKHN0ZXAsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICBzdXBlci5yZXNpemUoKTtcblxuICAgIHRoaXMuY2hhcnQucmVzaXplKCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICBzdXBlci5jbGVhcigpO1xuXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuY2hhcnQuY29uZmlnLmRhdGE7XG4gICAgaWYgKGRhdGEuZGF0YXNldHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3IgPSBkYXRhLmRhdGFzZXRzWzBdLmJhY2tncm91bmRDb2xvcjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFja2dyb3VuZENvbG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcltpXSA9IHRoaXMuY29sb3IuZGVmYXVsdDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhcnQudXBkYXRlKCk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGluaXRWaWV3ID0gKHRyYWNlcikgPT4ge1xuICB0cmFjZXIuJHdyYXBwZXIgPSB0cmFjZXIuY2Fwc3VsZS4kd3JhcHBlciA9ICQoJzxjYW52YXMgY2xhc3M9XCJtY2hydC1jaGFydFwiPicpO1xuICB0cmFjZXIuJGNvbnRhaW5lci5hcHBlbmQodHJhY2VyLiR3cmFwcGVyKTtcbiAgdHJhY2VyLmNoYXJ0ID0gdHJhY2VyLmNhcHN1bGUuY2hhcnQgPSBuZXcgQ2hhcnQodHJhY2VyLiR3cmFwcGVyLCB7XG4gICAgdHlwZTogJ2JhcicsXG4gICAgZGF0YToge1xuICAgICAgbGFiZWxzOiBbXSxcbiAgICAgIGRhdGFzZXRzOiBbXVxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgc2NhbGVzOiB7XG4gICAgICAgIHlBeGVzOiBbe1xuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBiZWdpbkF0WmVybzogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgICAgIH0sXG4gICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgbGVnZW5kOiBmYWxzZSxcbiAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZVxuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJ0VHJhY2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBEaXJlY3RlZEdyYXBoVHJhY2VyID0gcmVxdWlyZSgnLi9kaXJlY3RlZF9ncmFwaCcpO1xuXG5jbGFzcyBDb29yZGluYXRlU3lzdGVtVHJhY2VyIGV4dGVuZHMgRGlyZWN0ZWRHcmFwaFRyYWNlciB7XG4gIHN0YXRpYyBnZXRDbGFzc05hbWUoKSB7XG4gICAgcmV0dXJuICdDb29yZGluYXRlU3lzdGVtVHJhY2VyJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcihuYW1lKTtcblxuICAgIGlmICh0aGlzLmlzTmV3KSBpbml0Vmlldyh0aGlzKTtcbiAgfVxuXG4gIHNldERhdGEoQykge1xuICAgIGlmIChUcmFjZXIucHJvdG90eXBlLnNldERhdGEuYXBwbHkodGhpcywgYXJndW1lbnRzKSkgcmV0dXJuIHRydWU7XG5cbiAgICB0aGlzLmdyYXBoLmNsZWFyKCk7XG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgdmFyIGVkZ2VzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBDLmxlbmd0aDsgaSsrKVxuICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgIGlkOiB0aGlzLm4oaSksXG4gICAgICAgIHg6IENbaV1bMF0sXG4gICAgICAgIHk6IENbaV1bMV0sXG4gICAgICAgIGxhYmVsOiAnJyArIGksXG4gICAgICAgIHNpemU6IDFcbiAgICAgIH0pO1xuICAgIHRoaXMuZ3JhcGgucmVhZCh7XG4gICAgICBub2Rlczogbm9kZXMsXG4gICAgICBlZGdlczogZWRnZXNcbiAgICB9KTtcbiAgICB0aGlzLnMuY2FtZXJhLmdvVG8oe1xuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICBhbmdsZTogMCxcbiAgICAgIHJhdGlvOiAxXG4gICAgfSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcm9jZXNzU3RlcChzdGVwLCBvcHRpb25zKSB7XG4gICAgc3dpdGNoIChzdGVwLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3Zpc2l0JzpcbiAgICAgIGNhc2UgJ2xlYXZlJzpcbiAgICAgICAgdmFyIHZpc2l0ID0gc3RlcC50eXBlID09ICd2aXNpdCc7XG4gICAgICAgIHZhciB0YXJnZXROb2RlID0gdGhpcy5ncmFwaC5ub2Rlcyh0aGlzLm4oc3RlcC50YXJnZXQpKTtcbiAgICAgICAgdmFyIGNvbG9yID0gdmlzaXQgPyB0aGlzLmNvbG9yLnZpc2l0ZWQgOiB0aGlzLmNvbG9yLmxlZnQ7XG4gICAgICAgIHRhcmdldE5vZGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgaWYgKHN0ZXAuc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgZWRnZUlkID0gdGhpcy5lKHN0ZXAuc291cmNlLCBzdGVwLnRhcmdldCk7XG4gICAgICAgICAgaWYgKHRoaXMuZ3JhcGguZWRnZXMoZWRnZUlkKSkge1xuICAgICAgICAgICAgdmFyIGVkZ2UgPSB0aGlzLmdyYXBoLmVkZ2VzKGVkZ2VJZCk7XG4gICAgICAgICAgICBlZGdlLmNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLmdyYXBoLmRyb3BFZGdlKGVkZ2VJZCkuYWRkRWRnZShlZGdlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ncmFwaC5hZGRFZGdlKHtcbiAgICAgICAgICAgICAgaWQ6IHRoaXMuZShzdGVwLnRhcmdldCwgc3RlcC5zb3VyY2UpLFxuICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMubihzdGVwLnNvdXJjZSksXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcy5uKHN0ZXAudGFyZ2V0KSxcbiAgICAgICAgICAgICAgc2l6ZTogMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxvZ1RyYWNlcikge1xuICAgICAgICAgIHZhciBzb3VyY2UgPSBzdGVwLnNvdXJjZTtcbiAgICAgICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHNvdXJjZSA9ICcnO1xuICAgICAgICAgIHRoaXMubG9nVHJhY2VyLnByaW50KHZpc2l0ID8gc291cmNlICsgJyAtPiAnICsgc3RlcC50YXJnZXQgOiBzb3VyY2UgKyAnIDwtICcgKyBzdGVwLnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdXBlci5wcm9jZXNzU3RlcChzdGVwLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBlKHYxLCB2Mikge1xuICAgIGlmICh2MSA+IHYyKSB7XG4gICAgICB2YXIgdGVtcCA9IHYxO1xuICAgICAgdjEgPSB2MjtcbiAgICAgIHYyID0gdGVtcDtcbiAgICB9XG4gICAgcmV0dXJuICdlJyArIHYxICsgJ18nICsgdjI7XG4gIH1cblxuICBkcmF3T25Ib3Zlcihub2RlLCBjb250ZXh0LCBzZXR0aW5ncywgbmV4dCkge1xuICAgIHZhciB0cmFjZXIgPSB0aGlzO1xuXG4gICAgY29udGV4dC5zZXRMaW5lRGFzaChbNSwgNV0pO1xuICAgIHZhciBub2RlSWR4ID0gbm9kZS5pZC5zdWJzdHJpbmcoMSk7XG4gICAgdGhpcy5ncmFwaC5lZGdlcygpLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgIHZhciBlbmRzID0gZWRnZS5pZC5zdWJzdHJpbmcoMSkuc3BsaXQoXCJfXCIpO1xuICAgICAgaWYgKGVuZHNbMF0gPT0gbm9kZUlkeCkge1xuICAgICAgICB2YXIgY29sb3IgPSAnIzBmZic7XG4gICAgICAgIHZhciBzb3VyY2UgPSBub2RlO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdHJhY2VyLmdyYXBoLm5vZGVzKCduJyArIGVuZHNbMV0pO1xuICAgICAgICB0cmFjZXIuZHJhd0VkZ2UoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICAgIGlmIChuZXh0KSBuZXh0KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgfSBlbHNlIGlmIChlbmRzWzFdID09IG5vZGVJZHgpIHtcbiAgICAgICAgdmFyIGNvbG9yID0gJyMwZmYnO1xuICAgICAgICB2YXIgc291cmNlID0gdHJhY2VyLmdyYXBoLm5vZGVzKCduJyArIGVuZHNbMF0pO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gbm9kZTtcbiAgICAgICAgdHJhY2VyLmRyYXdFZGdlKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgICBpZiAobmV4dCkgbmV4dChlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29sb3IsIGNvbnRleHQsIHNldHRpbmdzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGRyYXdFZGdlKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICB2YXIgcHJlZml4ID0gc2V0dGluZ3MoJ3ByZWZpeCcpIHx8ICcnLFxuICAgICAgc2l6ZSA9IGVkZ2VbcHJlZml4ICsgJ3NpemUnXSB8fCAxO1xuXG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGNvbnRleHQubGluZVdpZHRoID0gc2l6ZTtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKFxuICAgICAgc291cmNlW3ByZWZpeCArICd4J10sXG4gICAgICBzb3VyY2VbcHJlZml4ICsgJ3knXVxuICAgICk7XG4gICAgY29udGV4dC5saW5lVG8oXG4gICAgICB0YXJnZXRbcHJlZml4ICsgJ3gnXSxcbiAgICAgIHRhcmdldFtwcmVmaXggKyAneSddXG4gICAgKTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuICB9XG59XG5cbmNvbnN0IGluaXRWaWV3ID0gKHRyYWNlcikgPT4ge1xuICB0cmFjZXIucy5zZXR0aW5ncyh7XG4gICAgZGVmYXVsdEVkZ2VUeXBlOiAnZGVmJyxcbiAgICBmdW5jRWRnZXNEZWYoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICB2YXIgY29sb3IgPSB0cmFjZXIuZ2V0Q29sb3IoZWRnZSwgc291cmNlLCB0YXJnZXQsIHNldHRpbmdzKTtcbiAgICAgIHRyYWNlci5kcmF3RWRnZShlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29sb3IsIGNvbnRleHQsIHNldHRpbmdzKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb29yZGluYXRlU3lzdGVtVHJhY2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUcmFjZXIgPSByZXF1aXJlKCcuL3RyYWNlcicpO1xuXG5jb25zdCB7XG4gIHJlZmluZUJ5VHlwZVxufSA9IHJlcXVpcmUoJy4uLy4uL3RyYWNlcl9tYW5hZ2VyL3V0aWwvaW5kZXgnKTtcblxuY2xhc3MgRGlyZWN0ZWRHcmFwaFRyYWNlciBleHRlbmRzIFRyYWNlciB7XG4gIHN0YXRpYyBnZXRDbGFzc05hbWUoKSB7XG4gICAgcmV0dXJuICdEaXJlY3RlZEdyYXBoVHJhY2VyJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcihuYW1lKTtcblxuICAgIGlmICh0aGlzLmlzTmV3KSBpbml0Vmlldyh0aGlzKTtcbiAgfVxuXG4gIF9zZXRUcmVlRGF0YShHLCByb290KSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ3NldFRyZWVEYXRhJyxcbiAgICAgIGFyZ3VtZW50czogYXJndW1lbnRzXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfdmlzaXQodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAndmlzaXQnLFxuICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICBzb3VyY2U6IHNvdXJjZVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2xlYXZlKHRhcmdldCwgc291cmNlKSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ2xlYXZlJyxcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgc291cmNlOiBzb3VyY2VcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9zZXROb2RlUG9zaXRpb25zKHBvc2l0aW9ucykge1xuICAgIHRoaXMubWFuYWdlci5wdXNoU3RlcCh0aGlzLmNhcHN1bGUsIHtcbiAgICAgIHR5cGU6ICdzZXROb2RlUG9zaXRpb25zJyxcbiAgICAgIHBvc2l0aW9uczogcG9zaXRpb25zXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcm9jZXNzU3RlcChzdGVwLCBvcHRpb25zKSB7XG4gICAgc3dpdGNoIChzdGVwLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3NldFRyZWVEYXRhJzpcbiAgICAgICAgdGhpcy5zZXRUcmVlRGF0YS5hcHBseSh0aGlzLCBzdGVwLmFyZ3VtZW50cyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2V0Tm9kZVBvc2l0aW9ucyc6XG4gICAgICAgICQuZWFjaCh0aGlzLmdyYXBoLm5vZGVzKCksIChpLCBub2RlKSA9PiB7XG4gICAgICAgICAgaWYgKGkgPj0gc3RlcC5wb3NpdGlvbnMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBzdGVwLnBvc2l0aW9uc1tpXTtcbiAgICAgICAgICBub2RlLnggPSBwb3NpdGlvbi54O1xuICAgICAgICAgIG5vZGUueSA9IHBvc2l0aW9uLnk7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Zpc2l0JzpcbiAgICAgIGNhc2UgJ2xlYXZlJzpcbiAgICAgICAgdmFyIHZpc2l0ID0gc3RlcC50eXBlID09ICd2aXNpdCc7XG4gICAgICAgIHZhciB0YXJnZXROb2RlID0gdGhpcy5ncmFwaC5ub2Rlcyh0aGlzLm4oc3RlcC50YXJnZXQpKTtcbiAgICAgICAgdmFyIGNvbG9yID0gdmlzaXQgPyB0aGlzLmNvbG9yLnZpc2l0ZWQgOiB0aGlzLmNvbG9yLmxlZnQ7XG4gICAgICAgIHRhcmdldE5vZGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgaWYgKHN0ZXAuc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgZWRnZUlkID0gdGhpcy5lKHN0ZXAuc291cmNlLCBzdGVwLnRhcmdldCk7XG4gICAgICAgICAgdmFyIGVkZ2UgPSB0aGlzLmdyYXBoLmVkZ2VzKGVkZ2VJZCk7XG4gICAgICAgICAgZWRnZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICAgIHRoaXMuZ3JhcGguZHJvcEVkZ2UoZWRnZUlkKS5hZGRFZGdlKGVkZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxvZ1RyYWNlcikge1xuICAgICAgICAgIHZhciBzb3VyY2UgPSBzdGVwLnNvdXJjZTtcbiAgICAgICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHNvdXJjZSA9ICcnO1xuICAgICAgICAgIHRoaXMubG9nVHJhY2VyLnByaW50KHZpc2l0ID8gc291cmNlICsgJyAtPiAnICsgc3RlcC50YXJnZXQgOiBzb3VyY2UgKyAnIDwtICcgKyBzdGVwLnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdXBlci5wcm9jZXNzU3RlcChzdGVwLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBzZXRUcmVlRGF0YShHLCByb290LCB1bmRpcmVjdGVkKSB7XG4gICAgdmFyIHRyYWNlciA9IHRoaXM7XG5cbiAgICByb290ID0gcm9vdCB8fCAwO1xuICAgIHZhciBtYXhEZXB0aCA9IC0xO1xuXG4gICAgdmFyIGNoayA9IG5ldyBBcnJheShHLmxlbmd0aCk7XG4gICAgdmFyIGdldERlcHRoID0gZnVuY3Rpb24gKG5vZGUsIGRlcHRoKSB7XG4gICAgICBpZiAoY2hrW25vZGVdKSB0aHJvdyBcInRoZSBnaXZlbiBncmFwaCBpcyBub3QgYSB0cmVlIGJlY2F1c2UgaXQgZm9ybXMgYSBjaXJjdWl0XCI7XG4gICAgICBjaGtbbm9kZV0gPSB0cnVlO1xuICAgICAgaWYgKG1heERlcHRoIDwgZGVwdGgpIG1heERlcHRoID0gZGVwdGg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEdbbm9kZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKEdbbm9kZV1baV0pIGdldERlcHRoKGksIGRlcHRoICsgMSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBnZXREZXB0aChyb290LCAxKTtcblxuICAgIGlmICh0aGlzLnNldERhdGEoRywgdW5kaXJlY3RlZCkpIHJldHVybiB0cnVlO1xuXG4gICAgdmFyIHBsYWNlID0gZnVuY3Rpb24gKG5vZGUsIHgsIHkpIHtcbiAgICAgIHZhciB0ZW1wID0gdHJhY2VyLmdyYXBoLm5vZGVzKHRyYWNlci5uKG5vZGUpKTtcbiAgICAgIHRlbXAueCA9IHg7XG4gICAgICB0ZW1wLnkgPSB5O1xuICAgIH07XG5cbiAgICB2YXIgd2dhcCA9IDEgLyAobWF4RGVwdGggLSAxKTtcbiAgICB2YXIgZGZzID0gZnVuY3Rpb24gKG5vZGUsIGRlcHRoLCB0b3AsIGJvdHRvbSkge1xuICAgICAgcGxhY2Uobm9kZSwgdG9wICsgYm90dG9tLCBkZXB0aCAqIHdnYXApO1xuICAgICAgdmFyIGNoaWxkcmVuID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgR1tub2RlXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoR1tub2RlXVtpXSkgY2hpbGRyZW4rKztcbiAgICAgIH1cbiAgICAgIHZhciB2Z2FwID0gKGJvdHRvbSAtIHRvcCkgLyBjaGlsZHJlbjtcbiAgICAgIHZhciBjbnQgPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBHW25vZGVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChHW25vZGVdW2ldKSBkZnMoaSwgZGVwdGggKyAxLCB0b3AgKyB2Z2FwICogY250LCB0b3AgKyB2Z2FwICogKytjbnQpO1xuICAgICAgfVxuICAgIH07XG4gICAgZGZzKHJvb3QsIDAsIDAsIDEpO1xuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBzZXREYXRhKEcsIHVuZGlyZWN0ZWQpIHtcbiAgICBpZiAoc3VwZXIuc2V0RGF0YS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSByZXR1cm4gdHJ1ZTtcbiAgICB0aGlzLmdyYXBoLmNsZWFyKCk7XG4gICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICBjb25zdCBlZGdlcyA9IFtdO1xuICAgIGNvbnN0IHVuaXRBbmdsZSA9IDIgKiBNYXRoLlBJIC8gRy5sZW5ndGg7XG4gICAgbGV0IGN1cnJlbnRBbmdsZSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjdXJyZW50QW5nbGUgKz0gdW5pdEFuZ2xlO1xuICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgIGlkOiB0aGlzLm4oaSksXG4gICAgICAgIGxhYmVsOiAnJyArIGksXG4gICAgICAgIHg6IC41ICsgTWF0aC5zaW4oY3VycmVudEFuZ2xlKSAvIDIsXG4gICAgICAgIHk6IC41ICsgTWF0aC5jb3MoY3VycmVudEFuZ2xlKSAvIDIsXG4gICAgICAgIHNpemU6IDEsXG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLmRlZmF1bHQsXG4gICAgICAgIHdlaWdodDogMFxuICAgICAgfSk7XG5cbiAgICAgIGlmICh1bmRpcmVjdGVkKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGk7IGorKykge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gR1tpXVtqXSB8fCBHW2pdW2ldO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgZWRnZXMucHVzaCh7XG4gICAgICAgICAgICAgIGlkOiB0aGlzLmUoaSwgaiksXG4gICAgICAgICAgICAgIHNvdXJjZTogdGhpcy5uKGkpLFxuICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMubihqKSxcbiAgICAgICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IuZGVmYXVsdCxcbiAgICAgICAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgICAgICAgd2VpZ2h0OiByZWZpbmVCeVR5cGUodmFsdWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgR1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChHW2ldW2pdKSB7XG4gICAgICAgICAgICBlZGdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgaWQ6IHRoaXMuZShpLCBqKSxcbiAgICAgICAgICAgICAgc291cmNlOiB0aGlzLm4oaSksXG4gICAgICAgICAgICAgIHRhcmdldDogdGhpcy5uKGopLFxuICAgICAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvci5kZWZhdWx0LFxuICAgICAgICAgICAgICBzaXplOiAxLFxuICAgICAgICAgICAgICB3ZWlnaHQ6IHJlZmluZUJ5VHlwZShHW2ldW2pdKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ncmFwaC5yZWFkKHtcbiAgICAgIG5vZGVzOiBub2RlcyxcbiAgICAgIGVkZ2VzOiBlZGdlc1xuICAgIH0pO1xuICAgIHRoaXMucy5jYW1lcmEuZ29Ubyh7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICAgIGFuZ2xlOiAwLFxuICAgICAgcmF0aW86IDFcbiAgICB9KTtcbiAgICB0aGlzLnJlZnJlc2goKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICBzdXBlci5yZXNpemUoKTtcblxuICAgIHRoaXMucy5yZW5kZXJlcnNbMF0ucmVzaXplKCk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICByZWZyZXNoKCkge1xuICAgIHN1cGVyLnJlZnJlc2goKTtcblxuICAgIHRoaXMucy5yZWZyZXNoKCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICBzdXBlci5jbGVhcigpO1xuXG4gICAgdGhpcy5jbGVhckdyYXBoQ29sb3IoKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIGNsZWFyR3JhcGhDb2xvcigpIHtcbiAgICB2YXIgdHJhY2VyID0gdGhpcztcblxuICAgIHRoaXMuZ3JhcGgubm9kZXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBub2RlLmNvbG9yID0gdHJhY2VyLmNvbG9yLmRlZmF1bHQ7XG4gICAgfSk7XG4gICAgdGhpcy5ncmFwaC5lZGdlcygpLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgIGVkZ2UuY29sb3IgPSB0cmFjZXIuY29sb3IuZGVmYXVsdDtcbiAgICB9KTtcbiAgfVxuXG4gIG4odikge1xuICAgIHJldHVybiAnbicgKyB2O1xuICB9XG5cbiAgZSh2MSwgdjIpIHtcbiAgICByZXR1cm4gJ2UnICsgdjEgKyAnXycgKyB2MjtcbiAgfVxuXG4gIGdldENvbG9yKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBzZXR0aW5ncykge1xuICAgIHZhciBjb2xvciA9IGVkZ2UuY29sb3IsXG4gICAgICBlZGdlQ29sb3IgPSBzZXR0aW5ncygnZWRnZUNvbG9yJyksXG4gICAgICBkZWZhdWx0Tm9kZUNvbG9yID0gc2V0dGluZ3MoJ2RlZmF1bHROb2RlQ29sb3InKSxcbiAgICAgIGRlZmF1bHRFZGdlQ29sb3IgPSBzZXR0aW5ncygnZGVmYXVsdEVkZ2VDb2xvcicpO1xuICAgIGlmICghY29sb3IpXG4gICAgICBzd2l0Y2ggKGVkZ2VDb2xvcikge1xuICAgICAgICBjYXNlICdzb3VyY2UnOlxuICAgICAgICAgIGNvbG9yID0gc291cmNlLmNvbG9yIHx8IGRlZmF1bHROb2RlQ29sb3I7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RhcmdldCc6XG4gICAgICAgICAgY29sb3IgPSB0YXJnZXQuY29sb3IgfHwgZGVmYXVsdE5vZGVDb2xvcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xvciA9IGRlZmF1bHRFZGdlQ29sb3I7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICByZXR1cm4gY29sb3I7XG4gIH1cblxuICBkcmF3TGFiZWwobm9kZSwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICB2YXIgZm9udFNpemUsXG4gICAgICBwcmVmaXggPSBzZXR0aW5ncygncHJlZml4JykgfHwgJycsXG4gICAgICBzaXplID0gbm9kZVtwcmVmaXggKyAnc2l6ZSddO1xuXG4gICAgaWYgKHNpemUgPCBzZXR0aW5ncygnbGFiZWxUaHJlc2hvbGQnKSlcbiAgICAgIHJldHVybjtcblxuICAgIGlmICghbm9kZS5sYWJlbCB8fCB0eXBlb2Ygbm9kZS5sYWJlbCAhPT0gJ3N0cmluZycpXG4gICAgICByZXR1cm47XG5cbiAgICBmb250U2l6ZSA9IChzZXR0aW5ncygnbGFiZWxTaXplJykgPT09ICdmaXhlZCcpID9cbiAgICAgIHNldHRpbmdzKCdkZWZhdWx0TGFiZWxTaXplJykgOlxuICAgIHNldHRpbmdzKCdsYWJlbFNpemVSYXRpbycpICogc2l6ZTtcblxuICAgIGNvbnRleHQuZm9udCA9IChzZXR0aW5ncygnZm9udFN0eWxlJykgPyBzZXR0aW5ncygnZm9udFN0eWxlJykgKyAnICcgOiAnJykgK1xuICAgICAgZm9udFNpemUgKyAncHggJyArIHNldHRpbmdzKCdmb250Jyk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAoc2V0dGluZ3MoJ2xhYmVsQ29sb3InKSA9PT0gJ25vZGUnKSA/XG4gICAgICAobm9kZS5jb2xvciB8fCBzZXR0aW5ncygnZGVmYXVsdE5vZGVDb2xvcicpKSA6XG4gICAgICBzZXR0aW5ncygnZGVmYXVsdExhYmVsQ29sb3InKTtcblxuICAgIGNvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29udGV4dC5maWxsVGV4dChcbiAgICAgIG5vZGUubGFiZWwsXG4gICAgICBNYXRoLnJvdW5kKG5vZGVbcHJlZml4ICsgJ3gnXSksXG4gICAgICBNYXRoLnJvdW5kKG5vZGVbcHJlZml4ICsgJ3knXSArIGZvbnRTaXplIC8gMylcbiAgICApO1xuICB9XG5cbiAgZHJhd0Fycm93KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICB2YXIgcHJlZml4ID0gc2V0dGluZ3MoJ3ByZWZpeCcpIHx8ICcnLFxuICAgICAgc2l6ZSA9IGVkZ2VbcHJlZml4ICsgJ3NpemUnXSB8fCAxLFxuICAgICAgdFNpemUgPSB0YXJnZXRbcHJlZml4ICsgJ3NpemUnXSxcbiAgICAgIHNYID0gc291cmNlW3ByZWZpeCArICd4J10sXG4gICAgICBzWSA9IHNvdXJjZVtwcmVmaXggKyAneSddLFxuICAgICAgdFggPSB0YXJnZXRbcHJlZml4ICsgJ3gnXSxcbiAgICAgIHRZID0gdGFyZ2V0W3ByZWZpeCArICd5J10sXG4gICAgICBhbmdsZSA9IE1hdGguYXRhbjIodFkgLSBzWSwgdFggLSBzWCksXG4gICAgICBkaXN0ID0gMztcbiAgICBzWCArPSBNYXRoLnNpbihhbmdsZSkgKiBkaXN0O1xuICAgIHRYICs9IE1hdGguc2luKGFuZ2xlKSAqIGRpc3Q7XG4gICAgc1kgKz0gLU1hdGguY29zKGFuZ2xlKSAqIGRpc3Q7XG4gICAgdFkgKz0gLU1hdGguY29zKGFuZ2xlKSAqIGRpc3Q7XG4gICAgdmFyIGFTaXplID0gTWF0aC5tYXgoc2l6ZSAqIDIuNSwgc2V0dGluZ3MoJ21pbkFycm93U2l6ZScpKSxcbiAgICAgIGQgPSBNYXRoLnNxcnQoTWF0aC5wb3codFggLSBzWCwgMikgKyBNYXRoLnBvdyh0WSAtIHNZLCAyKSksXG4gICAgICBhWCA9IHNYICsgKHRYIC0gc1gpICogKGQgLSBhU2l6ZSAtIHRTaXplKSAvIGQsXG4gICAgICBhWSA9IHNZICsgKHRZIC0gc1kpICogKGQgLSBhU2l6ZSAtIHRTaXplKSAvIGQsXG4gICAgICB2WCA9ICh0WCAtIHNYKSAqIGFTaXplIC8gZCxcbiAgICAgIHZZID0gKHRZIC0gc1kpICogYVNpemUgLyBkO1xuXG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGNvbnRleHQubGluZVdpZHRoID0gc2l6ZTtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKHNYLCBzWSk7XG4gICAgY29udGV4dC5saW5lVG8oXG4gICAgICBhWCxcbiAgICAgIGFZXG4gICAgKTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKGFYICsgdlgsIGFZICsgdlkpO1xuICAgIGNvbnRleHQubGluZVRvKGFYICsgdlkgKiAwLjYsIGFZIC0gdlggKiAwLjYpO1xuICAgIGNvbnRleHQubGluZVRvKGFYIC0gdlkgKiAwLjYsIGFZICsgdlggKiAwLjYpO1xuICAgIGNvbnRleHQubGluZVRvKGFYICsgdlgsIGFZICsgdlkpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5maWxsKCk7XG4gIH1cblxuICBkcmF3T25Ib3Zlcihub2RlLCBjb250ZXh0LCBzZXR0aW5ncywgbmV4dCkge1xuICAgIHZhciB0cmFjZXIgPSB0aGlzO1xuXG4gICAgY29udGV4dC5zZXRMaW5lRGFzaChbNSwgNV0pO1xuICAgIHZhciBub2RlSWR4ID0gbm9kZS5pZC5zdWJzdHJpbmcoMSk7XG4gICAgdGhpcy5ncmFwaC5lZGdlcygpLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgIHZhciBlbmRzID0gZWRnZS5pZC5zdWJzdHJpbmcoMSkuc3BsaXQoXCJfXCIpO1xuICAgICAgaWYgKGVuZHNbMF0gPT0gbm9kZUlkeCkge1xuICAgICAgICB2YXIgY29sb3IgPSAnIzBmZic7XG4gICAgICAgIHZhciBzb3VyY2UgPSBub2RlO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdHJhY2VyLmdyYXBoLm5vZGVzKCduJyArIGVuZHNbMV0pO1xuICAgICAgICB0cmFjZXIuZHJhd0Fycm93KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgICBpZiAobmV4dCkgbmV4dChlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29sb3IsIGNvbnRleHQsIHNldHRpbmdzKTtcbiAgICAgIH0gZWxzZSBpZiAoZW5kc1sxXSA9PSBub2RlSWR4KSB7XG4gICAgICAgIHZhciBjb2xvciA9ICcjZmYwJztcbiAgICAgICAgdmFyIHNvdXJjZSA9IHRyYWNlci5ncmFwaC5ub2RlcygnbicgKyBlbmRzWzBdKTtcbiAgICAgICAgdmFyIHRhcmdldCA9IG5vZGU7XG4gICAgICAgIHRyYWNlci5kcmF3QXJyb3coZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICAgIGlmIChuZXh0KSBuZXh0KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IGluaXRWaWV3ID0gKHRyYWNlcikgPT4ge1xuICB0cmFjZXIucyA9IHRyYWNlci5jYXBzdWxlLnMgPSBuZXcgc2lnbWEoe1xuICAgIHJlbmRlcmVyOiB7XG4gICAgICBjb250YWluZXI6IHRyYWNlci4kY29udGFpbmVyWzBdLFxuICAgICAgdHlwZTogJ2NhbnZhcydcbiAgICB9LFxuICAgIHNldHRpbmdzOiB7XG4gICAgICBtaW5BcnJvd1NpemU6IDgsXG4gICAgICBkZWZhdWx0RWRnZVR5cGU6ICdhcnJvdycsXG4gICAgICBtYXhFZGdlU2l6ZTogMi41LFxuICAgICAgbGFiZWxUaHJlc2hvbGQ6IDQsXG4gICAgICBmb250OiAnUm9ib3RvJyxcbiAgICAgIGRlZmF1bHRMYWJlbENvbG9yOiAnI2ZmZicsXG4gICAgICB6b29tTWluOiAwLjYsXG4gICAgICB6b29tTWF4OiAxLjIsXG4gICAgICBza2lwRXJyb3JzOiB0cnVlLFxuICAgICAgbWluTm9kZVNpemU6IC41LFxuICAgICAgbWF4Tm9kZVNpemU6IDEyLFxuICAgICAgbGFiZWxTaXplOiAncHJvcG9ydGlvbmFsJyxcbiAgICAgIGxhYmVsU2l6ZVJhdGlvOiAxLjMsXG4gICAgICBmdW5jTGFiZWxzRGVmKG5vZGUsIGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgIHRyYWNlci5kcmF3TGFiZWwobm9kZSwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgfSxcbiAgICAgIGZ1bmNIb3ZlcnNEZWYobm9kZSwgY29udGV4dCwgc2V0dGluZ3MsIG5leHQpIHtcbiAgICAgICAgdHJhY2VyLmRyYXdPbkhvdmVyKG5vZGUsIGNvbnRleHQsIHNldHRpbmdzLCBuZXh0KTtcbiAgICAgIH0sXG4gICAgICBmdW5jRWRnZXNBcnJvdyhlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgdmFyIGNvbG9yID0gdHJhY2VyLmdldENvbG9yKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBzZXR0aW5ncyk7XG4gICAgICAgIHRyYWNlci5kcmF3QXJyb3coZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgc2lnbWEucGx1Z2lucy5kcmFnTm9kZXModHJhY2VyLnMsIHRyYWNlci5zLnJlbmRlcmVyc1swXSk7XG4gIHRyYWNlci5ncmFwaCA9IHRyYWNlci5jYXBzdWxlLmdyYXBoID0gdHJhY2VyLnMuZ3JhcGg7XG59O1xuXG5zaWdtYS5jYW52YXMubGFiZWxzLmRlZiA9IGZ1bmN0aW9uIChub2RlLCBjb250ZXh0LCBzZXR0aW5ncykge1xuICB2YXIgZnVuYyA9IHNldHRpbmdzKCdmdW5jTGFiZWxzRGVmJyk7XG4gIGlmIChmdW5jKSB7XG4gICAgZnVuYyhub2RlLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gIH1cbn07XG5zaWdtYS5jYW52YXMuaG92ZXJzLmRlZiA9IGZ1bmN0aW9uIChub2RlLCBjb250ZXh0LCBzZXR0aW5ncykge1xuICB2YXIgZnVuYyA9IHNldHRpbmdzKCdmdW5jSG92ZXJzRGVmJyk7XG4gIGlmIChmdW5jKSB7XG4gICAgZnVuYyhub2RlLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gIH1cbn07XG5zaWdtYS5jYW52YXMuZWRnZXMuZGVmID0gZnVuY3Rpb24gKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb250ZXh0LCBzZXR0aW5ncykge1xuICB2YXIgZnVuYyA9IHNldHRpbmdzKCdmdW5jRWRnZXNEZWYnKTtcbiAgaWYgKGZ1bmMpIHtcbiAgICBmdW5jKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gIH1cbn07XG5zaWdtYS5jYW52YXMuZWRnZXMuYXJyb3cgPSBmdW5jdGlvbiAoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbnRleHQsIHNldHRpbmdzKSB7XG4gIHZhciBmdW5jID0gc2V0dGluZ3MoJ2Z1bmNFZGdlc0Fycm93Jyk7XG4gIGlmIChmdW5jKSB7XG4gICAgZnVuYyhlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29udGV4dCwgc2V0dGluZ3MpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdGVkR3JhcGhUcmFjZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFRyYWNlciA9IHJlcXVpcmUoJy4vdHJhY2VyJyk7XG5cbmNvbnN0IHtcbiAgcmVmaW5lQnlUeXBlXG59ID0gcmVxdWlyZSgnLi4vLi4vdHJhY2VyX21hbmFnZXIvdXRpbC9pbmRleCcpO1xuXG5jbGFzcyBEaXJlY3RlZEdyYXBoQ29uc3RydWN0VHJhY2VyIGV4dGVuZHMgVHJhY2VyIHtcbiAgc3RhdGljIGdldENsYXNzTmFtZSgpIHtcbiAgICByZXR1cm4gJ0RpcmVjdGVkR3JhcGhDb25zdHJ1Y3RUcmFjZXInO1xuICB9XG5cbiAgY29uc3RydWN0b3IobmFtZSwgbm9kZVBsYWNlbWVudCA9IG51bGwpIHtcbiAgICBzdXBlcihuYW1lKTtcbiAgICB0aGlzLm5vZGVQbGFjZW1lbnQgPSBub2RlUGxhY2VtZW50O1xuICAgIHRoaXMubm9kZUNvbGxlY3Rpb24gPSBbXTtcbiAgICBpZiAodGhpcy5pc05ldykgaW5pdFZpZXcodGhpcyk7XG4gIH1cblxuICBfYWRkUm9vdChyb290KSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ2FkZFJvb3QnLFxuICAgICAgYXJndW1lbnRzOiBhcmd1bWVudHNcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9hZGROb2RlKGVsZW1lbnQsIHBhcmVudEVsZW1lbnQgPSBudWxsKSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ2FkZE5vZGUnLFxuICAgICAgYXJndW1lbnRzOiBhcmd1bWVudHNcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF9maW5kTm9kZSh2YWwpIHtcbiAgICB2YXIgaWRUb0ZpbmQgPSB0aGlzLm4odmFsKTtcbiAgICB2YXIgRyA9IHRoaXMubm9kZUNvbGxlY3Rpb247XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihHW2ldLmlkID09PSBpZFRvRmluZCkge1xuICAgICAgICByZXN1bHQgPSBHW2ldO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIF92aXNpdCh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHRoaXMubWFuYWdlci5wdXNoU3RlcCh0aGlzLmNhcHN1bGUsIHtcbiAgICAgIHR5cGU6ICd2aXNpdCcsXG4gICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgIHNvdXJjZTogc291cmNlXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfbGVhdmUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAnbGVhdmUnLFxuICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICBzb3VyY2U6IHNvdXJjZVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX3NldE5vZGVQb3NpdGlvbnMocG9zaXRpb25zKSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ3NldE5vZGVQb3NpdGlvbnMnLFxuICAgICAgcG9zaXRpb25zOiBwb3NpdGlvbnNcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBcbiAgX2NsZWFyVHJhdmVyc2FsKCkge1xuICAgIHRoaXMubWFuYWdlci5wdXNoU3RlcCh0aGlzLmNhcHN1bGUsIHtcbiAgICAgIHR5cGU6ICdjbGVhcidcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByb2Nlc3NTdGVwKHN0ZXAsIG9wdGlvbnMpIHtcbiAgICBzd2l0Y2ggKHN0ZXAudHlwZSkge1xuICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICB0aGlzLmNsZWFyLmFwcGx5KHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NldE5vZGVQb3NpdGlvbnMnOlxuICAgICAgICAkLmVhY2godGhpcy5ncmFwaC5ub2RlcygpLCAoaSwgbm9kZSkgPT4ge1xuICAgICAgICAgIGlmIChpID49IHN0ZXAucG9zaXRpb25zLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gc3RlcC5wb3NpdGlvbnNbaV07XG4gICAgICAgICAgbm9kZS54ID0gcG9zaXRpb24ueDtcbiAgICAgICAgICBub2RlLnkgPSBwb3NpdGlvbi55O1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhZGRSb290JzpcbiAgICAgICAgdGhpcy5hZGRSb290LmFwcGx5KHRoaXMsIHN0ZXAuYXJndW1lbnRzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhZGROb2RlJzpcbiAgICAgICAgdGhpcy5hZGROb2RlLmFwcGx5KHRoaXMsIHN0ZXAuYXJndW1lbnRzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aXNpdCc6XG4gICAgICBjYXNlICdsZWF2ZSc6XG4gICAgICAgIHZhciB2aXNpdCA9IHN0ZXAudHlwZSA9PSAndmlzaXQnO1xuICAgICAgICB2YXIgbm9kZU9iamVjdCA9IHRoaXMuX2ZpbmROb2RlKHN0ZXAudGFyZ2V0KTtcbiAgICAgICAgbm9kZU9iamVjdC52aXNpdGVkID0gdmlzaXQ7XG4gICAgICAgIG5vZGVPYmplY3QuaXNOZXcgPSBmYWxzZTtcbiAgICAgICAgdmFyIHRhcmdldE5vZGUgPSB0aGlzLmdyYXBoLm5vZGVzKHRoaXMubihzdGVwLnRhcmdldCkpO1xuICAgICAgICB2YXIgY29sb3IgPSB2aXNpdCA/IHRoaXMuY29sb3IudmlzaXRlZCA6IHRoaXMuY29sb3IubGVmdDtcbiAgICAgICAgaWYodGFyZ2V0Tm9kZSkge1xuICAgICAgICAgIHRhcmdldE5vZGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICBpZiAoc3RlcC5zb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIGVkZ2VJZCA9IHRoaXMuZShzdGVwLnNvdXJjZSwgc3RlcC50YXJnZXQpO1xuICAgICAgICAgICAgdmFyIGVkZ2UgPSB0aGlzLmdyYXBoLmVkZ2VzKGVkZ2VJZCk7XG4gICAgICAgICAgICBlZGdlLmNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLmdyYXBoLmRyb3BFZGdlKGVkZ2VJZCkuYWRkRWRnZShlZGdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubG9nVHJhY2VyKSB7XG4gICAgICAgICAgdmFyIHNvdXJjZSA9IHN0ZXAuc291cmNlO1xuICAgICAgICAgIGlmIChzb3VyY2UgPT09IHVuZGVmaW5lZCkgc291cmNlID0gJyc7XG4gICAgICAgICAgdGhpcy5sb2dUcmFjZXIucHJpbnQodmlzaXQgPyBzb3VyY2UgKyAnIC0+ICcgKyBzdGVwLnRhcmdldCA6IHNvdXJjZSArICcgPC0gJyArIHN0ZXAudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN1cGVyLnByb2Nlc3NTdGVwKHN0ZXAsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFJvb3Qocm9vdCkge1xuICAgIGlmKHRoaXMucm9vdE9iamVjdCkgdGhyb3cgJ1Jvb3QgZm9yIHRoaXMgZ3JhcGggaXMgYWxyZWFkeSBhZGRlZCc7XG4gICAgdGhpcy5yb290T2JqZWN0ID0gdGhpcy5jcmVhdGVHcmFwaE5vZGUocm9vdCk7XG4gICAgdGhpcy5kcmF3R3JhcGgodGhpcy5yb290T2JqZWN0LmxldmVsKTtcbiAgfVxuXG4gIGFkZE5vZGUobm9kZSwgcGFyZW50KSB7XG4gICAgdmFyIG5vZGVPYmplY3QgPSB0aGlzLmNyZWF0ZUdyYXBoTm9kZShub2RlLCBwYXJlbnQpXG4gICAgdGhpcy5kcmF3R3JhcGgobm9kZU9iamVjdC5sZXZlbCk7XG4gIH1cblxuICBjcmVhdGVHcmFwaE5vZGUobm9kZSwgcGFyZW50KSB7XG4gICAgdmFyIG5vZGVPYmplY3QgPSB0aGlzLm5vZGVDb25zdHJ1Y3Qobm9kZSk7XG4gICAgdmFyIHBhcmVudE9iamVjdCA9IHRoaXMuX2ZpbmROb2RlKHBhcmVudCk7XG4gICAgaWYgKHBhcmVudE9iamVjdCkge1xuICAgICAgbm9kZU9iamVjdC5wYXJlbnQgPSBwYXJlbnRPYmplY3Q7XG4gICAgICBub2RlT2JqZWN0LmxldmVsID0gcGFyZW50T2JqZWN0LmxldmVsICsgMTtcbiAgICAgIGlmICh0aGlzLm5vZGVQbGFjZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgcGFyZW50T2JqZWN0LmNoaWxkcmVuLnB1c2gobm9kZU9iamVjdCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZVBsYWNlbWVudCA9PT0gMCkge1xuICAgICAgICB2YXIgaXNTcGxpY2VkID0gZmFsc2U7XG4gICAgICAgIHZhciBpbnNlcnRJbmRleCA9IDA7XG4gICAgICAgIGlmIChwYXJlbnRPYmplY3QuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwYXJlbnRPYmplY3QuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHBhcmVudE9iamVjdC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmKGNoaWxkLm9yaWdpbmFsVmFsID4gbm9kZSkge1xuICAgICAgICAgICAgICBpc1NwbGljZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc2VydEluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGlzU3BsaWNlZCkge1xuICAgICAgICAgIHBhcmVudE9iamVjdC5jaGlsZHJlbi5zcGxpY2UoaW5zZXJ0SW5kZXgsIDAsIG5vZGVPYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmVudE9iamVjdC5jaGlsZHJlbi5wdXNoKG5vZGVPYmplY3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubm9kZUNvbGxlY3Rpb24ucHVzaChub2RlT2JqZWN0KTtcbiAgICByZXR1cm4gbm9kZU9iamVjdDtcbiAgfVxuXG4gIG5vZGVDb25zdHJ1Y3QodmFsKSB7XG4gICAgdmFyIG5vZGVPYmplY3QgPSB7XG4gICAgICBpZDogdGhpcy5uKHZhbCksXG4gICAgICBvcmlnaW5hbFZhbDogdmFsLFxuICAgICAgaXNOZXc6IHRydWUsXG4gICAgICB2aXNpdGVkOiBmYWxzZSxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIGxldmVsOiAxLFxuICAgICAgcGFyZW50OiBudWxsXG4gICAgfVxuICAgIHJldHVybiBub2RlT2JqZWN0O1xuICB9XG4gIFxuICBkcmF3R3JhcGgobm9kZUxldmVsKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICBjb25zdCBlZGdlcyA9IFtdO1xuICAgIHZhciB0cmFjZXIgPSB0aGlzO1xuXG4gICAgdmFyIGFycmFuZ2VDaGlsZE5vZGVzID0gZnVuY3Rpb24obm9kZSwgb2Zmc2V0V2lkdGgpIHtcbiAgICAgIGlmKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMSl7XG4gICAgICAgIHZhciBtaWRQb2ludCA9IE1hdGguZmxvb3Iobm9kZS5jaGlsZHJlbi5sZW5ndGggLyAyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGk9PT1taWRQb2ludCkge1xuICAgICAgICAgICAgb2Zmc2V0V2lkdGggKz0gKG5vZGUuY2hpbGRyZW4ubGVuZ3RoICUgMiA9PT0gMCA/IDEgOiAwKTtcbiAgICAgICAgICAgIGFkZEdyYXBoTm9kZShub2RlLCBvZmZzZXRXaWR0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9mZnNldFdpZHRoID0gYXJyYW5nZUNoaWxkTm9kZXMobm9kZS5jaGlsZHJlbltpXSwgb2Zmc2V0V2lkdGgpO1xuICAgICAgICAgIGFkZEVkZ2Uobm9kZSwgbm9kZS5jaGlsZHJlbltpXSk7XG4gICAgICAgIH0gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHsgICAgICAgIFxuICAgICAgICAgIG9mZnNldFdpZHRoICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Zmc2V0V2lkdGggPSBhcnJhbmdlQ2hpbGROb2Rlcyhub2RlLmNoaWxkcmVuWzBdLCBvZmZzZXRXaWR0aCk7XG4gICAgICAgICAgYWRkRWRnZShub2RlLCBub2RlLmNoaWxkcmVuWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRHcmFwaE5vZGUobm9kZSwgb2Zmc2V0V2lkdGgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9mZnNldFdpZHRoO1xuICAgIH07XG5cbiAgICB2YXIgYWRkR3JhcGhOb2RlID0gZnVuY3Rpb24gKG5vZGUsIGNhbGN1bGF0ZWRYKSB7XG4gICAgICB2YXIgY29sb3IgPSBnZXRDb2xvcihub2RlLmlzTmV3LCBub2RlLnZpc2l0ZWQsIHRyYWNlci5jb2xvcik7XG4gICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgaWQ6IG5vZGUuaWQsXG4gICAgICAgIGxhYmVsOiAnJyArIG5vZGUub3JpZ2luYWxWYWwsXG4gICAgICAgIHg6IGNhbGN1bGF0ZWRYLFxuICAgICAgICB5OiBub2RlLmxldmVsIC0gMSxcbiAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICB3ZWlnaHQ6IDBcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgYWRkRWRnZSA9IGZ1bmN0aW9uIChub2RlLCBjaGlsZE5vZGUpIHtcbiAgICAgIHZhciBjb2xvciA9IGdldENvbG9yKG5vZGUudmlzaXRlZCAmJiBjaGlsZE5vZGUuaXNOZXcsIG5vZGUudmlzaXRlZCAmJiBjaGlsZE5vZGUudmlzaXRlZCwgdHJhY2VyLmNvbG9yKTtcbiAgICAgIGVkZ2VzLnB1c2goe1xuICAgICAgICBpZDogdHJhY2VyLmUobm9kZS5vcmlnaW5hbFZhbCwgY2hpbGROb2RlLm9yaWdpbmFsVmFsKSxcbiAgICAgICAgc291cmNlOiBub2RlLmlkLFxuICAgICAgICB0YXJnZXQ6IGNoaWxkTm9kZS5pZCxcbiAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICBzaXplOiAxLFxuICAgICAgICB3ZWlnaHQ6IHJlZmluZUJ5VHlwZShjaGlsZE5vZGUub3JpZ2luYWxWYWwpXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGdldENvbG9yID0gZnVuY3Rpb24gKGlzTmV3LCBpc1Zpc2l0ZWQsIGNvbG9yUGFsZXRlKSB7XG4gICAgICByZXR1cm4gaXNOZXcgPyBjb2xvclBhbGV0ZS5zZWxlY3RlZCA6XG4gICAgICAgICAgICAgIChpc1Zpc2l0ZWQgPyBjb2xvclBhbGV0ZS52aXNpdGVkIDogY29sb3JQYWxldGUuZGVmYXVsdCk7XG4gICAgfTtcbiAgICBhcnJhbmdlQ2hpbGROb2Rlcyh0aGlzLnJvb3RPYmplY3QsIDApO1xuICAgIFxuICAgIHRoaXMuZ3JhcGguY2xlYXIoKTtcbiAgICB0aGlzLmdyYXBoLnJlYWQoe1xuICAgICAgbm9kZXM6IG5vZGVzLFxuICAgICAgZWRnZXM6IGVkZ2VzXG4gICAgfSk7XG4gICAgdGhpcy5zLmNhbWVyYS5nb1RvKHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiBub2RlTGV2ZWwsXG4gICAgICBhbmdsZTogMCxcbiAgICAgIHJhdGlvOiAxXG4gICAgfSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXNpemUoKSB7XG4gICAgc3VwZXIucmVzaXplKCk7XG5cbiAgICB0aGlzLnMucmVuZGVyZXJzWzBdLnJlc2l6ZSgpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcmVmcmVzaCgpIHtcbiAgICBzdXBlci5yZWZyZXNoKCk7XG5cbiAgICB0aGlzLnMucmVmcmVzaCgpO1xuICB9XG5cbiAgY2xlYXIoKSB7XG4gICAgc3VwZXIuY2xlYXIoKTtcblxuICAgIHRoaXMuY2xlYXJHcmFwaENvbG9yKCk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBjbGVhckdyYXBoQ29sb3IoKSB7XG4gICAgdmFyIHRyYWNlciA9IHRoaXM7XG4gICAgdGhpcy5ub2RlQ29sbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpe1xuICAgICAgbm9kZS52aXNpdGVkID0gbm9kZS5pc05ldyA9IGZhbHNlO1xuICAgIH0pO1xuICAgIFxuICAgIHRoaXMuZ3JhcGgubm9kZXMoKS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBub2RlLmNvbG9yID0gdHJhY2VyLmNvbG9yLmRlZmF1bHQ7XG4gICAgfSk7XG4gICAgdGhpcy5ncmFwaC5lZGdlcygpLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgIGVkZ2UuY29sb3IgPSB0cmFjZXIuY29sb3IuZGVmYXVsdDtcbiAgICB9KTtcbiAgfVxuXG4gIG4odikge1xuICAgIHJldHVybiAnbicgKyB2O1xuICB9XG5cbiAgZSh2MSwgdjIpIHtcbiAgICByZXR1cm4gJ2UnICsgdjEgKyAnXycgKyB2MjtcbiAgfVxuXG4gIGdldENvbG9yKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBzZXR0aW5ncykge1xuICAgIHZhciBjb2xvciA9IGVkZ2UuY29sb3IsXG4gICAgICBlZGdlQ29sb3IgPSBzZXR0aW5ncygnZWRnZUNvbG9yJyksXG4gICAgICBkZWZhdWx0Tm9kZUNvbG9yID0gc2V0dGluZ3MoJ2RlZmF1bHROb2RlQ29sb3InKSxcbiAgICAgIGRlZmF1bHRFZGdlQ29sb3IgPSBzZXR0aW5ncygnZGVmYXVsdEVkZ2VDb2xvcicpO1xuICAgIGlmICghY29sb3IpXG4gICAgICBzd2l0Y2ggKGVkZ2VDb2xvcikge1xuICAgICAgICBjYXNlICdzb3VyY2UnOlxuICAgICAgICAgIGNvbG9yID0gc291cmNlLmNvbG9yIHx8IGRlZmF1bHROb2RlQ29sb3I7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RhcmdldCc6XG4gICAgICAgICAgY29sb3IgPSB0YXJnZXQuY29sb3IgfHwgZGVmYXVsdE5vZGVDb2xvcjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xvciA9IGRlZmF1bHRFZGdlQ29sb3I7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICByZXR1cm4gY29sb3I7XG4gIH1cblxuICBkcmF3TGFiZWwobm9kZSwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICB2YXIgZm9udFNpemUsXG4gICAgICBwcmVmaXggPSBzZXR0aW5ncygncHJlZml4JykgfHwgJycsXG4gICAgICBzaXplID0gbm9kZVtwcmVmaXggKyAnc2l6ZSddO1xuXG4gICAgaWYgKHNpemUgPCBzZXR0aW5ncygnbGFiZWxUaHJlc2hvbGQnKSlcbiAgICAgIHJldHVybjtcblxuICAgIGlmICghbm9kZS5sYWJlbCB8fCB0eXBlb2Ygbm9kZS5sYWJlbCAhPT0gJ3N0cmluZycpXG4gICAgICByZXR1cm47XG5cbiAgICBmb250U2l6ZSA9IChzZXR0aW5ncygnbGFiZWxTaXplJykgPT09ICdmaXhlZCcpID9cbiAgICAgIHNldHRpbmdzKCdkZWZhdWx0TGFiZWxTaXplJykgOlxuICAgIHNldHRpbmdzKCdsYWJlbFNpemVSYXRpbycpICogc2l6ZTtcblxuICAgIGNvbnRleHQuZm9udCA9IChzZXR0aW5ncygnZm9udFN0eWxlJykgPyBzZXR0aW5ncygnZm9udFN0eWxlJykgKyAnICcgOiAnJykgK1xuICAgICAgZm9udFNpemUgKyAncHggJyArIHNldHRpbmdzKCdmb250Jyk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAoc2V0dGluZ3MoJ2xhYmVsQ29sb3InKSA9PT0gJ25vZGUnKSA/XG4gICAgICAobm9kZS5jb2xvciB8fCBzZXR0aW5ncygnZGVmYXVsdE5vZGVDb2xvcicpKSA6XG4gICAgICBzZXR0aW5ncygnZGVmYXVsdExhYmVsQ29sb3InKTtcblxuICAgIGNvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29udGV4dC5maWxsVGV4dChcbiAgICAgIG5vZGUubGFiZWwsXG4gICAgICBNYXRoLnJvdW5kKG5vZGVbcHJlZml4ICsgJ3gnXSksXG4gICAgICBNYXRoLnJvdW5kKG5vZGVbcHJlZml4ICsgJ3knXSArIGZvbnRTaXplIC8gMylcbiAgICApO1xuICB9XG5cbiAgZHJhd0Fycm93KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICB2YXIgcHJlZml4ID0gc2V0dGluZ3MoJ3ByZWZpeCcpIHx8ICcnLFxuICAgICAgc2l6ZSA9IGVkZ2VbcHJlZml4ICsgJ3NpemUnXSB8fCAxLFxuICAgICAgdFNpemUgPSB0YXJnZXRbcHJlZml4ICsgJ3NpemUnXSxcbiAgICAgIHNYID0gc291cmNlW3ByZWZpeCArICd4J10sXG4gICAgICBzWSA9IHNvdXJjZVtwcmVmaXggKyAneSddLFxuICAgICAgdFggPSB0YXJnZXRbcHJlZml4ICsgJ3gnXSxcbiAgICAgIHRZID0gdGFyZ2V0W3ByZWZpeCArICd5J10sXG4gICAgICBhbmdsZSA9IE1hdGguYXRhbjIodFkgLSBzWSwgdFggLSBzWCksXG4gICAgICBkaXN0ID0gMztcbiAgICBzWCArPSBNYXRoLnNpbihhbmdsZSkgKiBkaXN0O1xuICAgIHRYICs9IE1hdGguc2luKGFuZ2xlKSAqIGRpc3Q7XG4gICAgc1kgKz0gLU1hdGguY29zKGFuZ2xlKSAqIGRpc3Q7XG4gICAgdFkgKz0gLU1hdGguY29zKGFuZ2xlKSAqIGRpc3Q7XG4gICAgdmFyIGFTaXplID0gTWF0aC5tYXgoc2l6ZSAqIDIuNSwgc2V0dGluZ3MoJ21pbkFycm93U2l6ZScpKSxcbiAgICAgIGQgPSBNYXRoLnNxcnQoTWF0aC5wb3codFggLSBzWCwgMikgKyBNYXRoLnBvdyh0WSAtIHNZLCAyKSksXG4gICAgICBhWCA9IHNYICsgKHRYIC0gc1gpICogKGQgLSBhU2l6ZSAtIHRTaXplKSAvIGQsXG4gICAgICBhWSA9IHNZICsgKHRZIC0gc1kpICogKGQgLSBhU2l6ZSAtIHRTaXplKSAvIGQsXG4gICAgICB2WCA9ICh0WCAtIHNYKSAqIGFTaXplIC8gZCxcbiAgICAgIHZZID0gKHRZIC0gc1kpICogYVNpemUgLyBkO1xuXG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGNvbnRleHQubGluZVdpZHRoID0gc2l6ZTtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKHNYLCBzWSk7XG4gICAgY29udGV4dC5saW5lVG8oXG4gICAgICBhWCxcbiAgICAgIGFZXG4gICAgKTtcbiAgICBjb250ZXh0LnN0cm9rZSgpO1xuXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQubW92ZVRvKGFYICsgdlgsIGFZICsgdlkpO1xuICAgIGNvbnRleHQubGluZVRvKGFYICsgdlkgKiAwLjYsIGFZIC0gdlggKiAwLjYpO1xuICAgIGNvbnRleHQubGluZVRvKGFYIC0gdlkgKiAwLjYsIGFZICsgdlggKiAwLjYpO1xuICAgIGNvbnRleHQubGluZVRvKGFYICsgdlgsIGFZICsgdlkpO1xuICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgY29udGV4dC5maWxsKCk7XG4gIH1cblxuICBkcmF3T25Ib3Zlcihub2RlLCBjb250ZXh0LCBzZXR0aW5ncywgbmV4dCkge1xuICAgIHZhciB0cmFjZXIgPSB0aGlzO1xuXG4gICAgY29udGV4dC5zZXRMaW5lRGFzaChbNSwgNV0pO1xuICAgIHZhciBub2RlSWR4ID0gbm9kZS5pZC5zdWJzdHJpbmcoMSk7XG4gICAgdGhpcy5ncmFwaC5lZGdlcygpLmZvckVhY2goZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgIHZhciBlbmRzID0gZWRnZS5pZC5zdWJzdHJpbmcoMSkuc3BsaXQoXCJfXCIpO1xuICAgICAgaWYgKGVuZHNbMF0gPT0gbm9kZUlkeCkge1xuICAgICAgICB2YXIgY29sb3IgPSAnIzBmZic7XG4gICAgICAgIHZhciBzb3VyY2UgPSBub2RlO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdHJhY2VyLmdyYXBoLm5vZGVzKCduJyArIGVuZHNbMV0pO1xuICAgICAgICB0cmFjZXIuZHJhd0Fycm93KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgICBpZiAobmV4dCkgbmV4dChlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29sb3IsIGNvbnRleHQsIHNldHRpbmdzKTtcbiAgICAgIH0gZWxzZSBpZiAoZW5kc1sxXSA9PSBub2RlSWR4KSB7XG4gICAgICAgIHZhciBjb2xvciA9ICcjZmYwJztcbiAgICAgICAgdmFyIHNvdXJjZSA9IHRyYWNlci5ncmFwaC5ub2RlcygnbicgKyBlbmRzWzBdKTtcbiAgICAgICAgdmFyIHRhcmdldCA9IG5vZGU7XG4gICAgICAgIHRyYWNlci5kcmF3QXJyb3coZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICAgIGlmIChuZXh0KSBuZXh0KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IGluaXRWaWV3ID0gKHRyYWNlcikgPT4ge1xuICB0cmFjZXIucyA9IHRyYWNlci5jYXBzdWxlLnMgPSBuZXcgc2lnbWEoe1xuICAgIHJlbmRlcmVyOiB7XG4gICAgICBjb250YWluZXI6IHRyYWNlci4kY29udGFpbmVyWzBdLFxuICAgICAgdHlwZTogJ2NhbnZhcydcbiAgICB9LFxuICAgIHNldHRpbmdzOiB7XG4gICAgICBtaW5BcnJvd1NpemU6IDgsXG4gICAgICBkZWZhdWx0RWRnZVR5cGU6ICdhcnJvdycsXG4gICAgICBtYXhFZGdlU2l6ZTogMi41LFxuICAgICAgbGFiZWxUaHJlc2hvbGQ6IDQsXG4gICAgICBmb250OiAnUm9ib3RvJyxcbiAgICAgIGRlZmF1bHRMYWJlbENvbG9yOiAnI2ZmZicsXG4gICAgICB6b29tTWluOiAwLjYsXG4gICAgICB6b29tTWF4OiAxLjIsXG4gICAgICBza2lwRXJyb3JzOiB0cnVlLFxuICAgICAgbWluTm9kZVNpemU6IC41LFxuICAgICAgbWF4Tm9kZVNpemU6IDEyLFxuICAgICAgbGFiZWxTaXplOiAncHJvcG9ydGlvbmFsJyxcbiAgICAgIGxhYmVsU2l6ZVJhdGlvOiAxLjMsXG4gICAgICBmdW5jTGFiZWxzRGVmKG5vZGUsIGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgICAgIHRyYWNlci5kcmF3TGFiZWwobm9kZSwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgfSxcbiAgICAgIGZ1bmNIb3ZlcnNEZWYobm9kZSwgY29udGV4dCwgc2V0dGluZ3MsIG5leHQpIHtcbiAgICAgICAgdHJhY2VyLmRyYXdPbkhvdmVyKG5vZGUsIGNvbnRleHQsIHNldHRpbmdzLCBuZXh0KTtcbiAgICAgIH0sXG4gICAgICBmdW5jRWRnZXNBcnJvdyhlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgICAgdmFyIGNvbG9yID0gdHJhY2VyLmdldENvbG9yKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBzZXR0aW5ncyk7XG4gICAgICAgIHRyYWNlci5kcmF3QXJyb3coZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgc2lnbWEucGx1Z2lucy5kcmFnTm9kZXModHJhY2VyLnMsIHRyYWNlci5zLnJlbmRlcmVyc1swXSk7XG4gIHRyYWNlci5ncmFwaCA9IHRyYWNlci5jYXBzdWxlLmdyYXBoID0gdHJhY2VyLnMuZ3JhcGg7XG59O1xuXG5zaWdtYS5jYW52YXMubGFiZWxzLmRlZiA9IGZ1bmN0aW9uIChub2RlLCBjb250ZXh0LCBzZXR0aW5ncykge1xuICB2YXIgZnVuYyA9IHNldHRpbmdzKCdmdW5jTGFiZWxzRGVmJyk7XG4gIGlmIChmdW5jKSB7XG4gICAgZnVuYyhub2RlLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gIH1cbn07XG5zaWdtYS5jYW52YXMuaG92ZXJzLmRlZiA9IGZ1bmN0aW9uIChub2RlLCBjb250ZXh0LCBzZXR0aW5ncykge1xuICB2YXIgZnVuYyA9IHNldHRpbmdzKCdmdW5jSG92ZXJzRGVmJyk7XG4gIGlmIChmdW5jKSB7XG4gICAgZnVuYyhub2RlLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gIH1cbn07XG5zaWdtYS5jYW52YXMuZWRnZXMuZGVmID0gZnVuY3Rpb24gKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb250ZXh0LCBzZXR0aW5ncykge1xuICB2YXIgZnVuYyA9IHNldHRpbmdzKCdmdW5jRWRnZXNEZWYnKTtcbiAgaWYgKGZ1bmMpIHtcbiAgICBmdW5jKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gIH1cbn07XG5zaWdtYS5jYW52YXMuZWRnZXMuYXJyb3cgPSBmdW5jdGlvbiAoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbnRleHQsIHNldHRpbmdzKSB7XG4gIHZhciBmdW5jID0gc2V0dGluZ3MoJ2Z1bmNFZGdlc0Fycm93Jyk7XG4gIGlmIChmdW5jKSB7XG4gICAgZnVuYyhlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29udGV4dCwgc2V0dGluZ3MpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdGVkR3JhcGhDb25zdHJ1Y3RUcmFjZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFRyYWNlciA9IHJlcXVpcmUoJy4vdHJhY2VyJyk7XG5jb25zdCBMb2dUcmFjZXIgPSByZXF1aXJlKCcuL2xvZycpO1xuY29uc3QgQXJyYXkxRFRyYWNlciA9IHJlcXVpcmUoJy4vYXJyYXkxZCcpO1xuY29uc3QgQXJyYXkyRFRyYWNlciA9IHJlcXVpcmUoJy4vYXJyYXkyZCcpO1xuY29uc3QgQ2hhcnRUcmFjZXIgPSByZXF1aXJlKCcuL2NoYXJ0Jyk7XG5jb25zdCBDb29yZGluYXRlU3lzdGVtVHJhY2VyID0gcmVxdWlyZSgnLi9jb29yZGluYXRlX3N5c3RlbScpO1xuY29uc3QgRGlyZWN0ZWRHcmFwaFRyYWNlciA9IHJlcXVpcmUoJy4vZGlyZWN0ZWRfZ3JhcGgnKTtcbmNvbnN0IERpcmVjdGVkR3JhcGhDb25zdHJ1Y3RUcmFjZXIgPSByZXF1aXJlKCcuL2RpcmVjdGVkX2dyYXBoX2NvbnN0cnVjdCcpO1xuY29uc3QgVW5kaXJlY3RlZEdyYXBoVHJhY2VyID0gcmVxdWlyZSgnLi91bmRpcmVjdGVkX2dyYXBoJyk7XG5jb25zdCBXZWlnaHRlZERpcmVjdGVkR3JhcGhUcmFjZXIgPSByZXF1aXJlKCcuL3dlaWdodGVkX2RpcmVjdGVkX2dyYXBoJyk7XG5jb25zdCBXZWlnaHRlZFVuZGlyZWN0ZWRHcmFwaFRyYWNlciA9IHJlcXVpcmUoJy4vd2VpZ2h0ZWRfdW5kaXJlY3RlZF9ncmFwaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgVHJhY2VyLFxuICBMb2dUcmFjZXIsXG4gIEFycmF5MURUcmFjZXIsXG4gIEFycmF5MkRUcmFjZXIsXG4gIENoYXJ0VHJhY2VyLFxuICBDb29yZGluYXRlU3lzdGVtVHJhY2VyLFxuICBEaXJlY3RlZEdyYXBoVHJhY2VyLFxuICBEaXJlY3RlZEdyYXBoQ29uc3RydWN0VHJhY2VyLFxuICBVbmRpcmVjdGVkR3JhcGhUcmFjZXIsXG4gIFdlaWdodGVkRGlyZWN0ZWRHcmFwaFRyYWNlcixcbiAgV2VpZ2h0ZWRVbmRpcmVjdGVkR3JhcGhUcmFjZXJcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUcmFjZXIgPSByZXF1aXJlKCcuL3RyYWNlcicpO1xuXG5jbGFzcyBMb2dUcmFjZXIgZXh0ZW5kcyBUcmFjZXIge1xuICBzdGF0aWMgZ2V0Q2xhc3NOYW1lKCkge1xuICAgIHJldHVybiAnTG9nVHJhY2VyJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcihuYW1lKTtcblxuICAgIGlmICh0aGlzLmlzTmV3KSBpbml0Vmlldyh0aGlzKTtcbiAgfVxuXG4gIF9wcmludChtc2cpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAncHJpbnQnLFxuICAgICAgbXNnOiBtc2dcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByb2Nlc3NTdGVwKHN0ZXAsIG9wdGlvbnMpIHtcbiAgICBzd2l0Y2ggKHN0ZXAudHlwZSkge1xuICAgICAgY2FzZSAncHJpbnQnOlxuICAgICAgICB0aGlzLnByaW50KHN0ZXAubXNnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLnNjcm9sbFRvRW5kKE1hdGgubWluKDUwLCB0aGlzLmludGVydmFsKSk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICBzdXBlci5jbGVhcigpO1xuXG4gICAgdGhpcy4kd3JhcHBlci5lbXB0eSgpO1xuICB9XG5cbiAgcHJpbnQobWVzc2FnZSkge1xuICAgIHRoaXMuJHdyYXBwZXIuYXBwZW5kKCQoJzxzcGFuPicpLmFwcGVuZChtZXNzYWdlICsgJzxici8+JykpO1xuICB9XG5cbiAgc2Nyb2xsVG9FbmQoZHVyYXRpb24pIHtcbiAgICB0aGlzLiRjb250YWluZXIuYW5pbWF0ZSh7XG4gICAgICBzY3JvbGxUb3A6IHRoaXMuJGNvbnRhaW5lclswXS5zY3JvbGxIZWlnaHRcbiAgICB9LCBkdXJhdGlvbik7XG4gIH1cbn1cblxuY29uc3QgaW5pdFZpZXcgPSAodHJhY2VyKSA9PiB7XG4gIHRyYWNlci4kd3JhcHBlciA9IHRyYWNlci5jYXBzdWxlLiR3cmFwcGVyID0gJCgnPGRpdiBjbGFzcz1cIndyYXBwZXJcIj4nKTtcbiAgdHJhY2VyLiRjb250YWluZXIuYXBwZW5kKHRyYWNlci4kd3JhcHBlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ1RyYWNlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vYXBwJyk7XG5cbmNvbnN0IHtcbiAgdG9KU09OLFxuICBmcm9tSlNPTlxufSA9IHJlcXVpcmUoJy4uLy4uL3RyYWNlcl9tYW5hZ2VyL3V0aWwvaW5kZXgnKTtcblxuY2xhc3MgVHJhY2VyIHtcbiAgc3RhdGljIGdldENsYXNzTmFtZSgpIHtcbiAgICByZXR1cm4gJ1RyYWNlcic7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5tb2R1bGUgPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgdGhpcy5jb2xvciA9IHtcbiAgICAgIHNlbGVjdGVkOiAnIzI5NjJmZicsXG4gICAgICBub3RpZmllZDogJyNmNTAwNTcnLFxuICAgICAgdmlzaXRlZDogJyNmNTAwNTcnLFxuICAgICAgbGVmdDogJyM2MTYxNjEnLFxuICAgICAgZGVmYXVsdDogJyNiZGJkYmQnXG4gICAgfTtcblxuICAgIHRoaXMubWFuYWdlciA9IGFwcC5nZXRUcmFjZXJNYW5hZ2VyKCk7XG4gICAgdGhpcy5jYXBzdWxlID0gdGhpcy5tYW5hZ2VyLmFsbG9jYXRlKHRoaXMpO1xuICAgICQuZXh0ZW5kKHRoaXMsIHRoaXMuY2Fwc3VsZSk7XG5cbiAgICB0aGlzLnNldE5hbWUobmFtZSk7XG4gIH1cblxuICBfc2V0RGF0YSguLi5hcmdzKSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ3NldERhdGEnLFxuICAgICAgYXJnczogdG9KU09OKGFyZ3MpXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBfY2xlYXIoKSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ2NsZWFyJ1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX3dhaXQobGluZSkge1xuICAgIHRoaXMubWFuYWdlci5uZXdTdGVwKGxpbmUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJvY2Vzc1N0ZXAoc3RlcCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHtcbiAgICAgIHR5cGUsXG4gICAgICBhcmdzXG4gICAgfSA9IHN0ZXA7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3NldERhdGEnOlxuICAgICAgICB0aGlzLnNldERhdGEoLi4uZnJvbUpTT04oYXJncykpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NsZWFyJzpcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICBsZXQgJG5hbWU7XG4gICAgaWYgKHRoaXMuaXNOZXcpIHtcbiAgICAgICRuYW1lID0gJCgnPHNwYW4gY2xhc3M9XCJuYW1lXCI+Jyk7XG4gICAgICB0aGlzLiRjb250YWluZXIuYXBwZW5kKCRuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJG5hbWUgPSB0aGlzLiRjb250YWluZXIuZmluZCgnc3Bhbi5uYW1lJyk7XG4gICAgfVxuICAgICRuYW1lLnRleHQobmFtZSB8fCB0aGlzLmRlZmF1bHROYW1lKTtcbiAgfVxuXG4gIHNldERhdGEoKSB7XG4gICAgY29uc3QgZGF0YSA9IHRvSlNPTihhcmd1bWVudHMpO1xuICAgIGlmICghdGhpcy5pc05ldyAmJiB0aGlzLmxhc3REYXRhID09PSBkYXRhKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5sYXN0RGF0YSA9IHRoaXMuY2Fwc3VsZS5sYXN0RGF0YSA9IGRhdGE7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmVzaXplKCkge1xuICB9XG5cbiAgcmVmcmVzaCgpIHtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICB9XG5cbiAgYXR0YWNoKHRyYWNlcikge1xuICAgIHN3aXRjaCAodHJhY2VyLm1vZHVsZSkge1xuICAgICAgY2FzZSBMb2dUcmFjZXI6XG4gICAgICAgIHRoaXMubG9nVHJhY2VyID0gdHJhY2VyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2hhcnRUcmFjZXI6XG4gICAgICAgIHRoaXMuY2hhcnRUcmFjZXIgPSB0cmFjZXI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHBhbGV0dGUoY29sb3IpIHtcbiAgICAkLmV4dGVuZCh0aGlzLmNvbG9yLCBjb2xvcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb3VzZWRvd24oZSkge1xuICB9XG5cbiAgbW91c2Vtb3ZlKGUpIHtcbiAgfVxuXG4gIG1vdXNldXAoZSkge1xuICB9XG5cbiAgbW91c2V3aGVlbChlKSB7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFjZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IERpcmVjdGVkR3JhcGhUcmFjZXIgPSByZXF1aXJlKCcuL2RpcmVjdGVkX2dyYXBoJyk7XG5cbmNsYXNzIFVuZGlyZWN0ZWRHcmFwaFRyYWNlciBleHRlbmRzIERpcmVjdGVkR3JhcGhUcmFjZXIge1xuICBzdGF0aWMgZ2V0Q2xhc3NOYW1lKCkge1xuICAgIHJldHVybiAnVW5kaXJlY3RlZEdyYXBoVHJhY2VyJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcihuYW1lKTtcblxuICAgIGlmICh0aGlzLmlzTmV3KSBpbml0Vmlldyh0aGlzKTtcbiAgfVxuXG4gIHNldFRyZWVEYXRhKEcsIHJvb3QpIHtcbiAgICByZXR1cm4gc3VwZXIuc2V0VHJlZURhdGEoRywgcm9vdCwgdHJ1ZSk7XG4gIH1cblxuICBzZXREYXRhKEcpIHtcbiAgICByZXR1cm4gc3VwZXIuc2V0RGF0YShHLCB0cnVlKTtcbiAgfVxuXG4gIGUodjEsIHYyKSB7XG4gICAgaWYgKHYxID4gdjIpIHtcbiAgICAgIHZhciB0ZW1wID0gdjE7XG4gICAgICB2MSA9IHYyO1xuICAgICAgdjIgPSB0ZW1wO1xuICAgIH1cbiAgICByZXR1cm4gJ2UnICsgdjEgKyAnXycgKyB2MjtcbiAgfVxuXG4gIGRyYXdPbkhvdmVyKG5vZGUsIGNvbnRleHQsIHNldHRpbmdzLCBuZXh0KSB7XG4gICAgdmFyIHRyYWNlciA9IHRoaXM7XG5cbiAgICBjb250ZXh0LnNldExpbmVEYXNoKFs1LCA1XSk7XG4gICAgdmFyIG5vZGVJZHggPSBub2RlLmlkLnN1YnN0cmluZygxKTtcbiAgICB0aGlzLmdyYXBoLmVkZ2VzKCkuZm9yRWFjaChmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgdmFyIGVuZHMgPSBlZGdlLmlkLnN1YnN0cmluZygxKS5zcGxpdChcIl9cIik7XG4gICAgICBpZiAoZW5kc1swXSA9PSBub2RlSWR4KSB7XG4gICAgICAgIHZhciBjb2xvciA9ICcjMGZmJztcbiAgICAgICAgdmFyIHNvdXJjZSA9IG5vZGU7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0cmFjZXIuZ3JhcGgubm9kZXMoJ24nICsgZW5kc1sxXSk7XG4gICAgICAgIHRyYWNlci5kcmF3RWRnZShlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29sb3IsIGNvbnRleHQsIHNldHRpbmdzKTtcbiAgICAgICAgaWYgKG5leHQpIG5leHQoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICB9IGVsc2UgaWYgKGVuZHNbMV0gPT0gbm9kZUlkeCkge1xuICAgICAgICB2YXIgY29sb3IgPSAnIzBmZic7XG4gICAgICAgIHZhciBzb3VyY2UgPSB0cmFjZXIuZ3JhcGgubm9kZXMoJ24nICsgZW5kc1swXSk7XG4gICAgICAgIHZhciB0YXJnZXQgPSBub2RlO1xuICAgICAgICB0cmFjZXIuZHJhd0VkZ2UoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICAgIGlmIChuZXh0KSBuZXh0KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZHJhd0VkZ2UoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncykge1xuICAgIHZhciBwcmVmaXggPSBzZXR0aW5ncygncHJlZml4JykgfHwgJycsXG4gICAgICBzaXplID0gZWRnZVtwcmVmaXggKyAnc2l6ZSddIHx8IDE7XG5cbiAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY29udGV4dC5saW5lV2lkdGggPSBzaXplO1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5tb3ZlVG8oXG4gICAgICBzb3VyY2VbcHJlZml4ICsgJ3gnXSxcbiAgICAgIHNvdXJjZVtwcmVmaXggKyAneSddXG4gICAgKTtcbiAgICBjb250ZXh0LmxpbmVUbyhcbiAgICAgIHRhcmdldFtwcmVmaXggKyAneCddLFxuICAgICAgdGFyZ2V0W3ByZWZpeCArICd5J11cbiAgICApO1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gIH1cbn1cblxuY29uc3QgaW5pdFZpZXcgPSAodHJhY2VyKSA9PiB7XG4gIHRyYWNlci5zLnNldHRpbmdzKHtcbiAgICBkZWZhdWx0RWRnZVR5cGU6ICdkZWYnLFxuICAgIGZ1bmNFZGdlc0RlZihlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHZhciBjb2xvciA9IHRyYWNlci5nZXRDb2xvcihlZGdlLCBzb3VyY2UsIHRhcmdldCwgc2V0dGluZ3MpO1xuICAgICAgdHJhY2VyLmRyYXdFZGdlKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVuZGlyZWN0ZWRHcmFwaFRyYWNlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRGlyZWN0ZWRHcmFwaFRyYWNlciA9IHJlcXVpcmUoJy4vZGlyZWN0ZWRfZ3JhcGgnKTtcblxuY29uc3Qge1xuICByZWZpbmVCeVR5cGVcbn0gPSByZXF1aXJlKCcuLi8uLi90cmFjZXJfbWFuYWdlci91dGlsL2luZGV4Jyk7XG5cbmNsYXNzIFdlaWdodGVkRGlyZWN0ZWRHcmFwaFRyYWNlciBleHRlbmRzIERpcmVjdGVkR3JhcGhUcmFjZXIge1xuICBzdGF0aWMgZ2V0Q2xhc3NOYW1lKCkge1xuICAgIHJldHVybiAnV2VpZ2h0ZWREaXJlY3RlZEdyYXBoVHJhY2VyJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcihuYW1lKTtcblxuICAgIGlmICh0aGlzLmlzTmV3KSBpbml0Vmlldyh0aGlzKTtcbiAgfVxuXG4gIF93ZWlnaHQodGFyZ2V0LCB3ZWlnaHQpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAnd2VpZ2h0JyxcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgd2VpZ2h0OiB3ZWlnaHRcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIF92aXNpdCh0YXJnZXQsIHNvdXJjZSwgd2VpZ2h0KSB7XG4gICAgdGhpcy5tYW5hZ2VyLnB1c2hTdGVwKHRoaXMuY2Fwc3VsZSwge1xuICAgICAgdHlwZTogJ3Zpc2l0JyxcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICB3ZWlnaHQ6IHdlaWdodFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2xlYXZlKHRhcmdldCwgc291cmNlLCB3ZWlnaHQpIHtcbiAgICB0aGlzLm1hbmFnZXIucHVzaFN0ZXAodGhpcy5jYXBzdWxlLCB7XG4gICAgICB0eXBlOiAnbGVhdmUnLFxuICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgIHdlaWdodDogd2VpZ2h0XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcm9jZXNzU3RlcChzdGVwLCBvcHRpb25zKSB7XG4gICAgc3dpdGNoIChzdGVwLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3dlaWdodCc6XG4gICAgICAgIHZhciB0YXJnZXROb2RlID0gdGhpcy5ncmFwaC5ub2Rlcyh0aGlzLm4oc3RlcC50YXJnZXQpKTtcbiAgICAgICAgaWYgKHN0ZXAud2VpZ2h0ICE9PSB1bmRlZmluZWQpIHRhcmdldE5vZGUud2VpZ2h0ID0gcmVmaW5lQnlUeXBlKHN0ZXAud2VpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2aXNpdCc6XG4gICAgICBjYXNlICdsZWF2ZSc6XG4gICAgICAgIHZhciB2aXNpdCA9IHN0ZXAudHlwZSA9PSAndmlzaXQnO1xuICAgICAgICB2YXIgdGFyZ2V0Tm9kZSA9IHRoaXMuZ3JhcGgubm9kZXModGhpcy5uKHN0ZXAudGFyZ2V0KSk7XG4gICAgICAgIHZhciBjb2xvciA9IHZpc2l0ID8gc3RlcC53ZWlnaHQgPT09IHVuZGVmaW5lZCA/IHRoaXMuY29sb3Iuc2VsZWN0ZWQgOiB0aGlzLmNvbG9yLnZpc2l0ZWQgOiB0aGlzLmNvbG9yLmxlZnQ7XG4gICAgICAgIHRhcmdldE5vZGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgaWYgKHN0ZXAud2VpZ2h0ICE9PSB1bmRlZmluZWQpIHRhcmdldE5vZGUud2VpZ2h0ID0gcmVmaW5lQnlUeXBlKHN0ZXAud2VpZ2h0KTtcbiAgICAgICAgaWYgKHN0ZXAuc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB2YXIgZWRnZUlkID0gdGhpcy5lKHN0ZXAuc291cmNlLCBzdGVwLnRhcmdldCk7XG4gICAgICAgICAgdmFyIGVkZ2UgPSB0aGlzLmdyYXBoLmVkZ2VzKGVkZ2VJZCk7XG4gICAgICAgICAgZWRnZS5jb2xvciA9IGNvbG9yO1xuICAgICAgICAgIHRoaXMuZ3JhcGguZHJvcEVkZ2UoZWRnZUlkKS5hZGRFZGdlKGVkZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxvZ1RyYWNlcikge1xuICAgICAgICAgIHZhciBzb3VyY2UgPSBzdGVwLnNvdXJjZTtcbiAgICAgICAgICBpZiAoc291cmNlID09PSB1bmRlZmluZWQpIHNvdXJjZSA9ICcnO1xuICAgICAgICAgIHRoaXMubG9nVHJhY2VyLnByaW50KHZpc2l0ID8gc291cmNlICsgJyAtPiAnICsgc3RlcC50YXJnZXQgOiBzb3VyY2UgKyAnIDwtICcgKyBzdGVwLnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdXBlci5wcm9jZXNzU3RlcChzdGVwLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICBzdXBlci5jbGVhcigpO1xuXG4gICAgdGhpcy5jbGVhcldlaWdodHMoKTtcbiAgfVxuXG4gIGNsZWFyV2VpZ2h0cygpIHtcbiAgICB0aGlzLmdyYXBoLm5vZGVzKCkuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgbm9kZS53ZWlnaHQgPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgZHJhd0VkZ2VXZWlnaHQoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncykge1xuICAgIGlmIChzb3VyY2UgPT0gdGFyZ2V0KVxuICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHByZWZpeCA9IHNldHRpbmdzKCdwcmVmaXgnKSB8fCAnJyxcbiAgICAgIHNpemUgPSBlZGdlW3ByZWZpeCArICdzaXplJ10gfHwgMTtcblxuICAgIGlmIChzaXplIDwgc2V0dGluZ3MoJ2VkZ2VMYWJlbFRocmVzaG9sZCcpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKDAgPT09IHNldHRpbmdzKCdlZGdlTGFiZWxTaXplUG93UmF0aW8nKSlcbiAgICAgIHRocm93ICdcImVkZ2VMYWJlbFNpemVQb3dSYXRpb1wiIG11c3Qgbm90IGJlIDAuJztcblxuICAgIHZhciBmb250U2l6ZSxcbiAgICAgIHggPSAoc291cmNlW3ByZWZpeCArICd4J10gKyB0YXJnZXRbcHJlZml4ICsgJ3gnXSkgLyAyLFxuICAgICAgeSA9IChzb3VyY2VbcHJlZml4ICsgJ3knXSArIHRhcmdldFtwcmVmaXggKyAneSddKSAvIDIsXG4gICAgICBkWCA9IHRhcmdldFtwcmVmaXggKyAneCddIC0gc291cmNlW3ByZWZpeCArICd4J10sXG4gICAgICBkWSA9IHRhcmdldFtwcmVmaXggKyAneSddIC0gc291cmNlW3ByZWZpeCArICd5J10sXG4gICAgICBhbmdsZSA9IE1hdGguYXRhbjIoZFksIGRYKTtcblxuICAgIGZvbnRTaXplID0gKHNldHRpbmdzKCdlZGdlTGFiZWxTaXplJykgPT09ICdmaXhlZCcpID9cbiAgICAgIHNldHRpbmdzKCdkZWZhdWx0RWRnZUxhYmVsU2l6ZScpIDpcbiAgICBzZXR0aW5ncygnZGVmYXVsdEVkZ2VMYWJlbFNpemUnKSAqXG4gICAgc2l6ZSAqXG4gICAgTWF0aC5wb3coc2l6ZSwgLTEgLyBzZXR0aW5ncygnZWRnZUxhYmVsU2l6ZVBvd1JhdGlvJykpO1xuXG4gICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICBpZiAoZWRnZS5hY3RpdmUpIHtcbiAgICAgIGNvbnRleHQuZm9udCA9IFtcbiAgICAgICAgc2V0dGluZ3MoJ2FjdGl2ZUZvbnRTdHlsZScpLFxuICAgICAgICBmb250U2l6ZSArICdweCcsXG4gICAgICAgIHNldHRpbmdzKCdhY3RpdmVGb250JykgfHwgc2V0dGluZ3MoJ2ZvbnQnKVxuICAgICAgXS5qb2luKCcgJyk7XG5cbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRleHQuZm9udCA9IFtcbiAgICAgICAgc2V0dGluZ3MoJ2ZvbnRTdHlsZScpLFxuICAgICAgICBmb250U2l6ZSArICdweCcsXG4gICAgICAgIHNldHRpbmdzKCdmb250JylcbiAgICAgIF0uam9pbignICcpO1xuXG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIH1cblxuICAgIGNvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnYWxwaGFiZXRpYyc7XG5cbiAgICBjb250ZXh0LnRyYW5zbGF0ZSh4LCB5KTtcbiAgICBjb250ZXh0LnJvdGF0ZShhbmdsZSk7XG4gICAgY29udGV4dC5maWxsVGV4dChcbiAgICAgIGVkZ2Uud2VpZ2h0LFxuICAgICAgMCxcbiAgICAgICgtc2l6ZSAvIDIpIC0gM1xuICAgICk7XG5cbiAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGRyYXdOb2RlV2VpZ2h0KG5vZGUsIGNvbnRleHQsIHNldHRpbmdzKSB7XG4gICAgdmFyIGZvbnRTaXplLFxuICAgICAgcHJlZml4ID0gc2V0dGluZ3MoJ3ByZWZpeCcpIHx8ICcnLFxuICAgICAgc2l6ZSA9IG5vZGVbcHJlZml4ICsgJ3NpemUnXTtcblxuICAgIGlmIChzaXplIDwgc2V0dGluZ3MoJ2xhYmVsVGhyZXNob2xkJykpXG4gICAgICByZXR1cm47XG5cbiAgICBmb250U2l6ZSA9IChzZXR0aW5ncygnbGFiZWxTaXplJykgPT09ICdmaXhlZCcpID9cbiAgICAgIHNldHRpbmdzKCdkZWZhdWx0TGFiZWxTaXplJykgOlxuICAgIHNldHRpbmdzKCdsYWJlbFNpemVSYXRpbycpICogc2l6ZTtcblxuICAgIGNvbnRleHQuZm9udCA9IChzZXR0aW5ncygnZm9udFN0eWxlJykgPyBzZXR0aW5ncygnZm9udFN0eWxlJykgKyAnICcgOiAnJykgK1xuICAgICAgZm9udFNpemUgKyAncHggJyArIHNldHRpbmdzKCdmb250Jyk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAoc2V0dGluZ3MoJ2xhYmVsQ29sb3InKSA9PT0gJ25vZGUnKSA/XG4gICAgICAobm9kZS5jb2xvciB8fCBzZXR0aW5ncygnZGVmYXVsdE5vZGVDb2xvcicpKSA6XG4gICAgICBzZXR0aW5ncygnZGVmYXVsdExhYmVsQ29sb3InKTtcblxuICAgIGNvbnRleHQudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgIGNvbnRleHQuZmlsbFRleHQoXG4gICAgICBub2RlLndlaWdodCxcbiAgICAgIE1hdGgucm91bmQobm9kZVtwcmVmaXggKyAneCddICsgc2l6ZSAqIDEuNSksXG4gICAgICBNYXRoLnJvdW5kKG5vZGVbcHJlZml4ICsgJ3knXSArIGZvbnRTaXplIC8gMylcbiAgICApO1xuICB9XG59XG5cbmNvbnN0IGluaXRWaWV3ID0gKHRyYWNlcikgPT4ge1xuICB0cmFjZXIucy5zZXR0aW5ncyh7XG4gICAgZWRnZUxhYmVsU2l6ZTogJ3Byb3BvcnRpb25hbCcsXG4gICAgZGVmYXVsdEVkZ2VMYWJlbFNpemU6IDIwLFxuICAgIGVkZ2VMYWJlbFNpemVQb3dSYXRpbzogMC44LFxuICAgIGZ1bmNMYWJlbHNEZWYobm9kZSwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHRyYWNlci5kcmF3Tm9kZVdlaWdodChub2RlLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICB0cmFjZXIuZHJhd0xhYmVsKG5vZGUsIGNvbnRleHQsIHNldHRpbmdzKTtcbiAgICB9LFxuICAgIGZ1bmNIb3ZlcnNEZWYobm9kZSwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIHRyYWNlci5kcmF3T25Ib3Zlcihub2RlLCBjb250ZXh0LCBzZXR0aW5ncywgdHJhY2VyLmRyYXdFZGdlV2VpZ2h0KTtcbiAgICB9LFxuICAgIGZ1bmNFZGdlc0Fycm93KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGNvbG9yID0gdHJhY2VyLmdldENvbG9yKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBzZXR0aW5ncyk7XG4gICAgICB0cmFjZXIuZHJhd0Fycm93KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgICAgdHJhY2VyLmRyYXdFZGdlV2VpZ2h0KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlaWdodGVkRGlyZWN0ZWRHcmFwaFRyYWNlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgV2VpZ2h0ZWREaXJlY3RlZEdyYXBoVHJhY2VyID0gcmVxdWlyZSgnLi93ZWlnaHRlZF9kaXJlY3RlZF9ncmFwaCcpO1xuY29uc3QgVW5kaXJlY3RlZEdyYXBoVHJhY2VyID0gcmVxdWlyZSgnLi91bmRpcmVjdGVkX2dyYXBoJyk7XG5cbmNsYXNzIFdlaWdodGVkVW5kaXJlY3RlZEdyYXBoVHJhY2VyIGV4dGVuZHMgV2VpZ2h0ZWREaXJlY3RlZEdyYXBoVHJhY2VyIHtcbiAgc3RhdGljIGdldENsYXNzTmFtZSgpIHtcbiAgICByZXR1cm4gJ1dlaWdodGVkVW5kaXJlY3RlZEdyYXBoVHJhY2VyJztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcihuYW1lKTtcblxuICAgIHRoaXMuZSA9IFVuZGlyZWN0ZWRHcmFwaFRyYWNlci5wcm90b3R5cGUuZTtcbiAgICB0aGlzLmRyYXdPbkhvdmVyID0gVW5kaXJlY3RlZEdyYXBoVHJhY2VyLnByb3RvdHlwZS5kcmF3T25Ib3ZlcjtcbiAgICB0aGlzLmRyYXdFZGdlID0gVW5kaXJlY3RlZEdyYXBoVHJhY2VyLnByb3RvdHlwZS5kcmF3RWRnZTtcblxuICAgIGlmICh0aGlzLmlzTmV3KSBpbml0Vmlldyh0aGlzKTtcbiAgfVxuXG4gIHNldFRyZWVEYXRhKEcsIHJvb3QpIHtcbiAgICByZXR1cm4gc3VwZXIuc2V0VHJlZURhdGEoRywgcm9vdCwgdHJ1ZSk7XG4gIH1cblxuICBzZXREYXRhKEcpIHtcbiAgICByZXR1cm4gc3VwZXIuc2V0RGF0YShHLCB0cnVlKTtcbiAgfVxuXG4gIGRyYXdFZGdlV2VpZ2h0KGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb2xvciwgY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICB2YXIgcHJlZml4ID0gc2V0dGluZ3MoJ3ByZWZpeCcpIHx8ICcnO1xuICAgIGlmIChzb3VyY2VbcHJlZml4ICsgJ3gnXSA+IHRhcmdldFtwcmVmaXggKyAneCddKSB7XG4gICAgICB2YXIgdGVtcCA9IHNvdXJjZTtcbiAgICAgIHNvdXJjZSA9IHRhcmdldDtcbiAgICAgIHRhcmdldCA9IHRlbXA7XG4gICAgfVxuICAgIFdlaWdodGVkRGlyZWN0ZWRHcmFwaFRyYWNlci5wcm90b3R5cGUuZHJhd0VkZ2VXZWlnaHQuY2FsbCh0aGlzLCBlZGdlLCBzb3VyY2UsIHRhcmdldCwgY29sb3IsIGNvbnRleHQsIHNldHRpbmdzKTtcbiAgfVxufVxuXG5jb25zdCBpbml0VmlldyA9ICh0cmFjZXIpID0+IHtcbiAgdHJhY2VyLnMuc2V0dGluZ3Moe1xuICAgIGRlZmF1bHRFZGdlVHlwZTogJ2RlZicsXG4gICAgZnVuY0VkZ2VzRGVmKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgdmFyIGNvbG9yID0gdHJhY2VyLmdldENvbG9yKGVkZ2UsIHNvdXJjZSwgdGFyZ2V0LCBzZXR0aW5ncyk7XG4gICAgICB0cmFjZXIuZHJhd0VkZ2UoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgICB0cmFjZXIuZHJhd0VkZ2VXZWlnaHQoZWRnZSwgc291cmNlLCB0YXJnZXQsIGNvbG9yLCBjb250ZXh0LCBzZXR0aW5ncyk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV2VpZ2h0ZWRVbmRpcmVjdGVkR3JhcGhUcmFjZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAodXJsKSA9PiB7XG4gIHJldHVybiByZXF1ZXN0KHVybCwge1xuICAgIHR5cGU6ICdHRVQnXG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1cmwpIHtcbiAgcmV0dXJuIHJlcXVlc3QodXJsLCB7XG4gICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICB0eXBlOiAnR0VUJ1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXJsLCBkYXRhKSB7XG4gIHJldHVybiByZXF1ZXN0KHVybCwge1xuICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgdHlwZTogJ1BPU1QnLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBSU1ZQID0gcmVxdWlyZSgncnN2cCcpO1xuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vLi4vYXBwJyk7XG5cbmNvbnN0IHtcbiAgYWpheCxcbiAgZXh0ZW5kXG59ID0gJDtcblxuY29uc3QgZGVmYXVsdHMgPSB7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXJsLCBvcHRpb25zID0ge30pIHtcbiAgYXBwLnNldElzTG9hZGluZyh0cnVlKTtcblxuICByZXR1cm4gbmV3IFJTVlAuUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgY2FsbGJhY2tzID0ge1xuICAgICAgc3VjY2VzcyhyZXNwb25zZSkge1xuICAgICAgICBhcHAuc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9LFxuICAgICAgZXJyb3IocmVhc29uKSB7XG4gICAgICAgIGFwcC5zZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICByZWplY3QocmVhc29uKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb3B0cyA9IGV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMsIGNhbGxiYWNrcywge1xuICAgICAgdXJsXG4gICAgfSk7XG5cbiAgICBhamF4KG9wdHMpO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKTtcbmNvbnN0IFRvYXN0ID0gcmVxdWlyZSgnLi4vZG9tL3RvYXN0Jyk7XG5cbmNvbnN0IGNoZWNrTG9hZGluZyA9ICgpID0+IHtcbiAgaWYgKGFwcC5nZXRJc0xvYWRpbmcoKSkge1xuICAgIFRvYXN0LnNob3dFcnJvclRvYXN0KCdXYWl0IHVudGlsIGl0IGNvbXBsZXRlcyBsb2FkaW5nIG9mIHByZXZpb3VzIGZpbGUuJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgZ2V0UGFyYW1ldGVyQnlOYW1lID0gKG5hbWUpID0+IHtcbiAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgWz8mXSR7bmFtZX0oPShbXiYjXSopfCZ8I3wkKWApO1xuXG4gIGNvbnN0IHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG5cbiAgaWYgKCFyZXN1bHRzIHx8IHJlc3VsdHMubGVuZ3RoICE9PSAzKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBbLCAsIGlkXSA9IHJlc3VsdHM7XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuY29uc3QgZ2V0SGFzaFZhbHVlID0gKGtleSk9PiB7XG4gIGlmICgha2V5KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgY29uc3QgcGFyYW1zID0gaGFzaCA/IGhhc2guc3BsaXQoJyYnKSA6IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHBhaXIgPSBwYXJhbXNbaV0uc3BsaXQoJz0nKTtcbiAgICBpZiAocGFpclswXSA9PT0ga2V5KSB7XG4gICAgICByZXR1cm4gcGFpclsxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCBzZXRIYXNoVmFsdWUgPSAoa2V5LCB2YWx1ZSk9PiB7XG4gIGlmICgha2V5IHx8ICF2YWx1ZSkgcmV0dXJuO1xuICBjb25zdCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuICBjb25zdCBwYXJhbXMgPSBoYXNoID8gaGFzaC5zcGxpdCgnJicpIDogW107XG5cbiAgbGV0IGZvdW5kID0gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aCAmJiAhZm91bmQ7IGkrKykge1xuICAgIGNvbnN0IHBhaXIgPSBwYXJhbXNbaV0uc3BsaXQoJz0nKTtcbiAgICBpZiAocGFpclswXSA9PT0ga2V5KSB7XG4gICAgICBwYWlyWzFdID0gdmFsdWU7XG4gICAgICBwYXJhbXNbaV0gPSBwYWlyLmpvaW4oJz0nKTtcbiAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKCFmb3VuZCkge1xuICAgIHBhcmFtcy5wdXNoKFtrZXksIHZhbHVlXS5qb2luKCc9JykpO1xuICB9XG5cbiAgY29uc3QgbmV3SGFzaCA9IHBhcmFtcy5qb2luKCcmJyk7XG4gIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gYCMke25ld0hhc2h9YDtcbn07XG5cbmNvbnN0IHJlbW92ZUhhc2hWYWx1ZSA9IChrZXkpID0+IHtcbiAgaWYgKCFrZXkpIHJldHVybjtcbiAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcbiAgY29uc3QgcGFyYW1zID0gaGFzaCA/IGhhc2guc3BsaXQoJyYnKSA6IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcGFpciA9IHBhcmFtc1tpXS5zcGxpdCgnPScpO1xuICAgIGlmIChwYWlyWzBdID09PSBrZXkpIHtcbiAgICAgIHBhcmFtcy5zcGxpY2UoaSwgMSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBuZXdIYXNoID0gcGFyYW1zLmpvaW4oJyYnKTtcbiAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBgIyR7bmV3SGFzaH1gO1xufTtcblxuY29uc3Qgc2V0UGF0aCA9IChjYXRlZ29yeSwgYWxnb3JpdGhtLCBmaWxlKSA9PiB7XG4gIGNvbnN0IHBhdGggPSBjYXRlZ29yeSA/IGNhdGVnb3J5ICsgKGFsZ29yaXRobSA/IGAvJHthbGdvcml0aG19YCArIChmaWxlID8gYC8ke2ZpbGV9YCA6ICcnKSA6ICcnKSA6ICcnO1xuICBzZXRIYXNoVmFsdWUoJ3BhdGgnLCBwYXRoKTtcbn07XG5cbmNvbnN0IGdldFBhdGggPSAoKSA9PiB7XG4gIGNvbnN0IGhhc2ggPSBnZXRIYXNoVmFsdWUoJ3BhdGgnKTtcbiAgaWYgKGhhc2gpIHtcbiAgICBjb25zdCBbIGNhdGVnb3J5LCBhbGdvcml0aG0sIGZpbGUgXSA9IGhhc2guc3BsaXQoJy8nKTtcbiAgICByZXR1cm4geyBjYXRlZ29yeSwgYWxnb3JpdGhtLCBmaWxlIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2hlY2tMb2FkaW5nLFxuICBnZXRQYXJhbWV0ZXJCeU5hbWUsXG4gIGdldEhhc2hWYWx1ZSxcbiAgc2V0SGFzaFZhbHVlLFxuICByZW1vdmVIYXNoVmFsdWUsXG4gIHNldFBhdGgsXG4gIGdldFBhdGhcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGxvYWRBbGdvcml0aG0gPSByZXF1aXJlKCcuL2xvYWRfYWxnb3JpdGhtJyk7XG5jb25zdCBsb2FkQ2F0ZWdvcmllcyA9IHJlcXVpcmUoJy4vbG9hZF9jYXRlZ29yaWVzJyk7XG5jb25zdCBsb2FkRmlsZSA9IHJlcXVpcmUoJy4vbG9hZF9maWxlJyk7XG5jb25zdCBsb2FkU2NyYXRjaFBhcGVyID0gcmVxdWlyZSgnLi9sb2FkX3NjcmF0Y2hfcGFwZXInKTtcbmNvbnN0IHNoYXJlU2NyYXRjaFBhcGVyID0gcmVxdWlyZSgnLi9zaGFyZV9zY3JhdGNoX3BhcGVyJyk7XG5jb25zdCBsb2FkV2lraUxpc3QgPSByZXF1aXJlKCcuL2xvYWRfd2lraV9saXN0Jyk7XG5jb25zdCBsb2FkV2lraSA9IHJlcXVpcmUoJy4vbG9hZF93aWtpJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsb2FkQWxnb3JpdGhtLFxuICBsb2FkQ2F0ZWdvcmllcyxcbiAgbG9hZEZpbGUsXG4gIGxvYWRTY3JhdGNoUGFwZXIsXG4gIHNoYXJlU2NyYXRjaFBhcGVyLFxuICBsb2FkV2lraUxpc3QsXG4gIGxvYWRXaWtpXG59OyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZ2V0SlNPTiA9IHJlcXVpcmUoJy4vYWpheC9nZXRfanNvbicpO1xuXG5jb25zdCB7XG4gIGdldEFsZ29yaXRobURpclxufSA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGNhdGVnb3J5LCBhbGdvcml0aG0pID0+IHtcbiAgY29uc3QgZGlyID0gZ2V0QWxnb3JpdGhtRGlyKGNhdGVnb3J5LCBhbGdvcml0aG0pO1xuICByZXR1cm4gZ2V0SlNPTihgJHtkaXJ9ZGVzYy5qc29uYCk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZ2V0SlNPTiA9IHJlcXVpcmUoJy4vYWpheC9nZXRfanNvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgcmV0dXJuIGdldEpTT04oJy4vYWxnb3JpdGhtL2NhdGVnb3J5Lmpzb24nKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBSU1ZQID0gcmVxdWlyZSgncnN2cCcpO1xuXG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKTtcblxuY29uc3Qge1xuICBnZXRGaWxlRGlyLFxuICBpc1NjcmF0Y2hQYXBlclxufSA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbmNvbnN0IHtcbiAgY2hlY2tMb2FkaW5nLFxuICBzZXRQYXRoXG59ID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbmNvbnN0IGdldCA9IHJlcXVpcmUoJy4vYWpheC9nZXQnKTtcblxuY29uc3QgbG9hZERhdGFBbmRDb2RlID0gKGRpcikgPT4ge1xuICByZXR1cm4gUlNWUC5oYXNoKHtcbiAgICBkYXRhOiBnZXQoYCR7ZGlyfWRhdGEuanNgKSxcbiAgICBjb2RlOiBnZXQoYCR7ZGlyfWNvZGUuanNgKVxuICB9KTtcbn07XG5cbmNvbnN0IGxvYWRGaWxlQW5kVXBkYXRlQ29udGVudCA9IChkaXIpID0+IHtcbiAgYXBwLmdldEVkaXRvcigpLmNsZWFyQ29udGVudCgpO1xuXG4gIHJldHVybiBsb2FkRGF0YUFuZENvZGUoZGlyKS50aGVuKChjb250ZW50KSA9PiB7XG4gICAgYXBwLnVwZGF0ZUNhY2hlZEZpbGUoZGlyLCBjb250ZW50KTtcbiAgICBhcHAuZ2V0RWRpdG9yKCkuc2V0Q29udGVudChjb250ZW50KTtcbiAgfSk7XG59O1xuXG5jb25zdCBjYWNoZWRDb250ZW50RXhpc3RzID0gKGNhY2hlZEZpbGUpID0+IHtcbiAgcmV0dXJuIGNhY2hlZEZpbGUgJiZcbiAgICBjYWNoZWRGaWxlLmRhdGEgIT09IHVuZGVmaW5lZCAmJlxuICAgIGNhY2hlZEZpbGUuY29kZSAhPT0gdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoY2F0ZWdvcnksIGFsZ29yaXRobSwgZmlsZSwgZXhwbGFuYXRpb24pID0+IHtcbiAgcmV0dXJuIG5ldyBSU1ZQLlByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChjaGVja0xvYWRpbmcoKSkge1xuICAgICAgcmVqZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1NjcmF0Y2hQYXBlcihjYXRlZ29yeSkpIHtcbiAgICAgICAgc2V0UGF0aChjYXRlZ29yeSwgYXBwLmdldExvYWRlZFNjcmF0Y2goKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRQYXRoKGNhdGVnb3J5LCBhbGdvcml0aG0sIGZpbGUpO1xuICAgICAgfVxuICAgICAgJCgnI2V4cGxhbmF0aW9uJykuaHRtbChleHBsYW5hdGlvbik7XG5cbiAgICAgIGxldCBkaXIgPSBnZXRGaWxlRGlyKGNhdGVnb3J5LCBhbGdvcml0aG0sIGZpbGUpO1xuICAgICAgYXBwLnNldExhc3RGaWxlVXNlZChkaXIpO1xuICAgICAgY29uc3QgY2FjaGVkRmlsZSA9IGFwcC5nZXRDYWNoZWRGaWxlKGRpcik7XG5cbiAgICAgIGlmIChjYWNoZWRDb250ZW50RXhpc3RzKGNhY2hlZEZpbGUpKSB7XG4gICAgICAgIGFwcC5nZXRFZGl0b3IoKS5zZXRDb250ZW50KGNhY2hlZEZpbGUpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2FkRmlsZUFuZFVwZGF0ZUNvbnRlbnQoZGlyKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBSU1ZQID0gcmVxdWlyZSgncnN2cCcpO1xuY29uc3QgYXBwID0gcmVxdWlyZSgnLi4vYXBwJyk7XG5cbmNvbnN0IHtcbiAgZ2V0RmlsZURpclxufSA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbmNvbnN0IGdldEpTT04gPSByZXF1aXJlKCcuL2FqYXgvZ2V0X2pzb24nKTtcbmNvbnN0IGxvYWRBbGdvcml0aG0gPSByZXF1aXJlKCcuL2xvYWRfYWxnb3JpdGhtJyk7XG5cbmNvbnN0IGV4dHJhY3RHaXN0Q29kZSA9IChmaWxlcywgbmFtZSkgPT4gZmlsZXNbYCR7bmFtZX0uanNgXS5jb250ZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChnaXN0SUQpID0+IHtcbiAgcmV0dXJuIG5ldyBSU1ZQLlByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGFwcC5zZXRMb2FkZWRTY3JhdGNoKGdpc3RJRCk7XG5cbiAgICBnZXRKU09OKGBodHRwczovL2FwaS5naXRodWIuY29tL2dpc3RzLyR7Z2lzdElEfWApLnRoZW4oKHtcbiAgICAgIGZpbGVzXG4gICAgfSkgPT4ge1xuXG4gICAgICBjb25zdCBjYXRlZ29yeSA9ICdzY3JhdGNoJztcbiAgICAgIGNvbnN0IGFsZ29yaXRobSA9IGdpc3RJRDtcblxuICAgICAgbG9hZEFsZ29yaXRobShjYXRlZ29yeSwgYWxnb3JpdGhtKS50aGVuKChkYXRhKSA9PiB7XG5cbiAgICAgICAgY29uc3QgYWxnb0RhdGEgPSBleHRyYWN0R2lzdENvZGUoZmlsZXMsICdkYXRhJyk7XG4gICAgICAgIGNvbnN0IGFsZ29Db2RlID0gZXh0cmFjdEdpc3RDb2RlKGZpbGVzLCAnY29kZScpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBzY3JhdGNoIHBhcGVyIGFsZ28gY29kZSB3aXRoIHRoZSBsb2FkZWQgZ2lzdCBjb2RlXG4gICAgICAgIGNvbnN0IGRpciA9IGdldEZpbGVEaXIoY2F0ZWdvcnksIGFsZ29yaXRobSwgJ3NjcmF0Y2hfcGFwZXInKTtcbiAgICAgICAgYXBwLnVwZGF0ZUNhY2hlZEZpbGUoZGlyLCB7XG4gICAgICAgICAgZGF0YTogYWxnb0RhdGEsXG4gICAgICAgICAgY29kZTogYWxnb0NvZGUsXG4gICAgICAgICAgJ0NSRURJVC5tZCc6ICdTaGFyZWQgYnkgYW4gYW5vbnltb3VzIHVzZXIgZnJvbSBodHRwOi8vcGFya2pzODE0LmdpdGh1Yi5pby9BbGdvcml0aG1WaXN1YWxpemVyJ1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICBhbGdvcml0aG0sXG4gICAgICAgICAgZGF0YVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxufTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGdldCA9IHJlcXVpcmUoJy4vYWpheC9nZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAod2lraSkgPT4ge1xuICByZXR1cm4gZ2V0KGAuL3dpa2kvJHt3aWtpfS5tZGApO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGdldEpTT04gPSByZXF1aXJlKCcuL2FqYXgvZ2V0X2pzb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIHJldHVybiBnZXRKU09OKCcuL3dpa2kuanNvbicpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFJTVlAgPSByZXF1aXJlKCdyc3ZwJyk7XG5jb25zdCBhcHAgPSByZXF1aXJlKCcuLi9hcHAnKTtcblxuY29uc3QgcG9zdEpTT04gPSByZXF1aXJlKCcuL2FqYXgvcG9zdF9qc29uJyk7XG5cbmNvbnN0IHtcbiAgc2V0UGF0aFxufSA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBSU1ZQLlByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgY29uc3Qge1xuICAgICAgZGF0YUVkaXRvcixcbiAgICAgIGNvZGVFZGl0b3JcbiAgICB9ID0gYXBwLmdldEVkaXRvcigpO1xuXG4gICAgY29uc3QgZ2lzdCA9IHtcbiAgICAgICdkZXNjcmlwdGlvbic6ICd0ZW1wJyxcbiAgICAgICdwdWJsaWMnOiB0cnVlLFxuICAgICAgJ2ZpbGVzJzoge1xuICAgICAgICAnZGF0YS5qcyc6IHtcbiAgICAgICAgICAnY29udGVudCc6IGRhdGFFZGl0b3IuZ2V0VmFsdWUoKVxuICAgICAgICB9LFxuICAgICAgICAnY29kZS5qcyc6IHtcbiAgICAgICAgICAnY29udGVudCc6IGNvZGVFZGl0b3IuZ2V0VmFsdWUoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHBvc3RKU09OKCdodHRwczovL2FwaS5naXRodWIuY29tL2dpc3RzJywgZ2lzdCkudGhlbigoe1xuICAgICAgaWRcbiAgICB9KSA9PiB7XG4gICAgICBhcHAuc2V0TG9hZGVkU2NyYXRjaChpZCk7XG4gICAgICBzZXRQYXRoKCdzY3JhdGNoJywgaWQpO1xuICAgICAgY29uc3Qge1xuICAgICAgICBocmVmXG4gICAgICB9ID0gbG9jYXRpb247XG4gICAgICAkKCcjYWxnb3JpdGhtJykuaHRtbCgnU2hhcmVkJyk7XG4gICAgICByZXNvbHZlKGhyZWYpO1xuICAgIH0pO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUcmFjZXJNYW5hZ2VyID0gcmVxdWlyZSgnLi9tYW5hZ2VyJyk7XG5jb25zdCBUcmFjZXIgPSByZXF1aXJlKCcuLi9tb2R1bGUvdHJhY2VyL3RyYWNlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBpbml0KCkge1xuICAgIGNvbnN0IHRtID0gbmV3IFRyYWNlck1hbmFnZXIoKTtcbiAgICBUcmFjZXIucHJvdG90eXBlLm1hbmFnZXIgPSB0bTtcbiAgICByZXR1cm4gdG07XG4gIH1cblxufTsiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFwcCA9IHJlcXVpcmUoJy4uL2FwcCcpO1xuY29uc3QgTW9kdWxlQ29udGFpbmVyID0gcmVxdWlyZSgnLi4vZG9tL21vZHVsZV9jb250YWluZXInKTtcbmNvbnN0IFRvcE1lbnUgPSByZXF1aXJlKCcuLi9kb20vdG9wX21lbnUnKTtcblxuY29uc3Qge1xuICBlYWNoLFxuICBleHRlbmQsXG4gIGdyZXBcbn0gPSAkO1xuXG5jb25zdCBzdGVwTGltaXQgPSAxZTY7XG5cbmNvbnN0IFRyYWNlck1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudGltZXIgPSBudWxsO1xuICB0aGlzLnBhdXNlID0gZmFsc2U7XG4gIHRoaXMuY2Fwc3VsZXMgPSBbXTtcbiAgdGhpcy5pbnRlcnZhbCA9IDUwMDtcbn07XG5cblRyYWNlck1hbmFnZXIucHJvdG90eXBlID0ge1xuXG4gIGFkZCh0cmFjZXIpIHtcblxuICAgIGNvbnN0ICRjb250YWluZXIgPSBNb2R1bGVDb250YWluZXIuY3JlYXRlKCk7XG5cbiAgICBjb25zdCBjYXBzdWxlID0ge1xuICAgICAgbW9kdWxlOiB0cmFjZXIubW9kdWxlLFxuICAgICAgdHJhY2VyLFxuICAgICAgYWxsb2NhdGVkOiB0cnVlLFxuICAgICAgZGVmYXVsdE5hbWU6IG51bGwsXG4gICAgICAkY29udGFpbmVyLFxuICAgICAgaXNOZXc6IHRydWVcbiAgICB9O1xuXG4gICAgdGhpcy5jYXBzdWxlcy5wdXNoKGNhcHN1bGUpO1xuICAgIHJldHVybiBjYXBzdWxlO1xuICB9LFxuXG4gIGFsbG9jYXRlKG5ld1RyYWNlcikge1xuICAgIGxldCBzZWxlY3RlZENhcHN1bGUgPSBudWxsO1xuICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICBlYWNoKHRoaXMuY2Fwc3VsZXMsIChpLCBjYXBzdWxlKSA9PiB7XG4gICAgICBpZiAoY2Fwc3VsZS5tb2R1bGUgPT09IG5ld1RyYWNlci5tb2R1bGUpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgICAgaWYgKCFjYXBzdWxlLmFsbG9jYXRlZCkge1xuICAgICAgICAgIGNhcHN1bGUudHJhY2VyID0gbmV3VHJhY2VyO1xuICAgICAgICAgIGNhcHN1bGUuYWxsb2NhdGVkID0gdHJ1ZTtcbiAgICAgICAgICBjYXBzdWxlLmlzTmV3ID0gZmFsc2U7XG4gICAgICAgICAgc2VsZWN0ZWRDYXBzdWxlID0gY2Fwc3VsZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChzZWxlY3RlZENhcHN1bGUgPT09IG51bGwpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgICBzZWxlY3RlZENhcHN1bGUgPSB0aGlzLmFkZChuZXdUcmFjZXIpO1xuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IG5ld1RyYWNlci5tb2R1bGUuZ2V0Q2xhc3NOYW1lKCk7XG4gICAgc2VsZWN0ZWRDYXBzdWxlLmRlZmF1bHROYW1lID0gYCR7Y2xhc3NOYW1lfSAke2NvdW50fWA7XG4gICAgc2VsZWN0ZWRDYXBzdWxlLm9yZGVyID0gdGhpcy5vcmRlcisrO1xuICAgIHJldHVybiBzZWxlY3RlZENhcHN1bGU7XG4gIH0sXG5cbiAgZGVhbGxvY2F0ZUFsbCgpIHtcbiAgICB0aGlzLm9yZGVyID0gMDtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgZWFjaCh0aGlzLmNhcHN1bGVzLCAoaSwgY2Fwc3VsZSkgPT4ge1xuICAgICAgY2Fwc3VsZS5hbGxvY2F0ZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfSxcblxuICByZW1vdmVVbmFsbG9jYXRlZCgpIHtcbiAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5jYXBzdWxlcyA9IGdyZXAodGhpcy5jYXBzdWxlcywgKGNhcHN1bGUpID0+IHtcbiAgICAgIGxldCByZW1vdmVkID0gIWNhcHN1bGUuYWxsb2NhdGVkO1xuXG4gICAgICBpZiAoY2Fwc3VsZS5pc05ldyB8fCByZW1vdmVkKSB7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHJlbW92ZWQpIHtcbiAgICAgICAgY2Fwc3VsZS4kY29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIXJlbW92ZWQ7XG4gICAgfSk7XG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy5wbGFjZSgpO1xuICAgIH1cbiAgfSxcblxuICBwbGFjZSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBjYXBzdWxlc1xuICAgIH0gPSB0aGlzO1xuXG4gICAgZWFjaChjYXBzdWxlcywgKGksIGNhcHN1bGUpID0+IHtcbiAgICAgIGxldCB3aWR0aCA9IDEwMDtcbiAgICAgIGxldCBoZWlnaHQgPSAoMTAwIC8gY2Fwc3VsZXMubGVuZ3RoKTtcbiAgICAgIGxldCB0b3AgPSBoZWlnaHQgKiBjYXBzdWxlLm9yZGVyO1xuXG4gICAgICBjYXBzdWxlLiRjb250YWluZXIuY3NzKHtcbiAgICAgICAgdG9wOiBgJHt0b3B9JWAsXG4gICAgICAgIHdpZHRoOiBgJHt3aWR0aH0lYCxcbiAgICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9JWBcbiAgICAgIH0pO1xuXG4gICAgICBjYXBzdWxlLnRyYWNlci5yZXNpemUoKTtcbiAgICB9KTtcbiAgfSxcblxuICByZXNpemUoKSB7XG4gICAgdGhpcy5jb21tYW5kKCdyZXNpemUnKTtcbiAgfSxcblxuICBpc1BhdXNlKCkge1xuICAgIHJldHVybiB0aGlzLnBhdXNlO1xuICB9LFxuXG4gIHNldEludGVydmFsKGludGVydmFsKSB7XG4gICAgVG9wTWVudS5zZXRJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0sXG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy50cmFjZXMgPSBbXTtcbiAgICB0aGlzLnRyYWNlSW5kZXggPSAtMTtcbiAgICB0aGlzLnN0ZXBDbnQgPSAwO1xuICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgfVxuICAgIHRoaXMuY29tbWFuZCgnY2xlYXInKTtcbiAgfSxcblxuICBwdXNoU3RlcChjYXBzdWxlLCBzdGVwKSB7XG4gICAgaWYgKHRoaXMuc3RlcENudCsrID4gc3RlcExpbWl0KSB0aHJvdyBcIlRyYWNlcidzIHN0YWNrIG92ZXJmbG93XCI7XG4gICAgbGV0IGxlbiA9IHRoaXMudHJhY2VzLmxlbmd0aDtcbiAgICBpZiAobGVuID09IDApIGxlbiArPSB0aGlzLm5ld1N0ZXAoKTtcbiAgICBjb25zdCBsYXN0ID0gdGhpcy50cmFjZXNbbGVuIC0gMV07XG4gICAgbGFzdC5wdXNoKGV4dGVuZChzdGVwLCB7XG4gICAgICBjYXBzdWxlXG4gICAgfSkpO1xuICB9LFxuXG4gIG5ld1N0ZXAobGluZSA9IC0xKSB7XG4gICAgbGV0IGxlbiA9IHRoaXMudHJhY2VzLmxlbmd0aDtcbiAgICBpZiAobGVuID4gMCAmJiB+bGluZSkge1xuICAgICAgdGhpcy50cmFjZXNbbGVuIC0gMV0ucHVzaChsaW5lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHJhY2VzLnB1c2goW10pO1xuICB9LFxuXG4gIHBhdXNlU3RlcCgpIHtcbiAgICBpZiAodGhpcy50cmFjZUluZGV4IDwgMCkgcmV0dXJuO1xuICAgIHRoaXMucGF1c2UgPSB0cnVlO1xuICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgfVxuICAgIFRvcE1lbnUuYWN0aXZhdGVCdG5QYXVzZSgpO1xuICB9LFxuXG4gIHJlc3VtZVN0ZXAoKSB7XG4gICAgdGhpcy5wYXVzZSA9IGZhbHNlO1xuICAgIHRoaXMuc3RlcCh0aGlzLnRyYWNlSW5kZXggKyAxKTtcbiAgICBUb3BNZW51LmRlYWN0aXZhdGVCdG5QYXVzZSgpO1xuICB9LFxuXG4gIHN0ZXAoaSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgdHJhY2VyID0gdGhpcztcblxuICAgIGlmIChpc05hTihpKSB8fCBpID49IHRoaXMudHJhY2VzLmxlbmd0aCB8fCBpIDwgMCkgcmV0dXJuO1xuXG4gICAgdGhpcy50cmFjZUluZGV4ID0gaTtcbiAgICBjb25zdCB0cmFjZSA9IHRoaXMudHJhY2VzW2ldO1xuICAgIHRyYWNlLmZvckVhY2goKHN0ZXApID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygc3RlcCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgYXBwLmdldEVkaXRvcigpLmhpZ2hsaWdodExpbmUoc3RlcCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHN0ZXAuY2Fwc3VsZS50cmFjZXIucHJvY2Vzc1N0ZXAoc3RlcCwgb3B0aW9ucyk7XG4gICAgfSk7XG5cbiAgICBpZiAoIW9wdGlvbnMudmlydHVhbCkge1xuICAgICAgdGhpcy5jb21tYW5kKCdyZWZyZXNoJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGF1c2UpIHJldHVybjtcblxuICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghdHJhY2VyLm5leHRTdGVwKG9wdGlvbnMpKSB7XG4gICAgICAgIFRvcE1lbnUucmVzZXRUb3BNZW51QnV0dG9ucygpO1xuICAgICAgfVxuICAgIH0sIHRoaXMuaW50ZXJ2YWwpO1xuICB9LFxuXG4gIHByZXZTdGVwKG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuY29tbWFuZCgnY2xlYXInKTtcblxuICAgIGNvbnN0IGZpbmFsSW5kZXggPSB0aGlzLnRyYWNlSW5kZXggLSAxO1xuICAgIGlmIChmaW5hbEluZGV4IDwgMCkge1xuICAgICAgdGhpcy50cmFjZUluZGV4ID0gLTE7XG4gICAgICB0aGlzLmNvbW1hbmQoJ3JlZnJlc2gnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbmFsSW5kZXg7IGkrKykge1xuICAgICAgdGhpcy5zdGVwKGksIGV4dGVuZChvcHRpb25zLCB7XG4gICAgICAgIHZpcnR1YWw6IHRydWVcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0ZXAoZmluYWxJbmRleCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgbmV4dFN0ZXAob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZmluYWxJbmRleCA9IHRoaXMudHJhY2VJbmRleCArIDE7XG4gICAgaWYgKGZpbmFsSW5kZXggPj0gdGhpcy50cmFjZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnRyYWNlSW5kZXggPSB0aGlzLnRyYWNlcy5sZW5ndGggLSAxO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc3RlcChmaW5hbEluZGV4LCBvcHRpb25zKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICB2aXN1YWxpemUoKSB7XG4gICAgdGhpcy50cmFjZUluZGV4ID0gLTE7XG4gICAgdGhpcy5yZXN1bWVTdGVwKCk7XG4gIH0sXG5cbiAgY29tbWFuZCguLi5hcmdzKSB7XG4gICAgY29uc3QgZnVuY3Rpb25OYW1lID0gYXJncy5zaGlmdCgpO1xuICAgIGVhY2godGhpcy5jYXBzdWxlcywgKGksIGNhcHN1bGUpID0+IHtcbiAgICAgIGlmIChjYXBzdWxlLmFsbG9jYXRlZCkge1xuICAgICAgICBjYXBzdWxlLnRyYWNlci5tb2R1bGUucHJvdG90eXBlW2Z1bmN0aW9uTmFtZV0uYXBwbHkoY2Fwc3VsZS50cmFjZXIsIGFyZ3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGZpbmRPd25lcihjb250YWluZXIpIHtcbiAgICBsZXQgc2VsZWN0ZWRDYXBzdWxlID0gbnVsbDtcbiAgICBlYWNoKHRoaXMuY2Fwc3VsZXMsIChpLCBjYXBzdWxlKSA9PiB7XG4gICAgICBpZiAoY2Fwc3VsZS4kY29udGFpbmVyWzBdID09PSBjb250YWluZXIpIHtcbiAgICAgICAgc2VsZWN0ZWRDYXBzdWxlID0gY2Fwc3VsZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzZWxlY3RlZENhcHN1bGUudHJhY2VyO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNlck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHtcbiAgcGFyc2Vcbn0gPSBKU09OO1xuXG5jb25zdCBmcm9tSlNPTiA9IChvYmopID0+IHtcbiAgcmV0dXJuIHBhcnNlKG9iaiwgKGtleSwgdmFsdWUpID0+IHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICdJbmZpbml0eScgPyBJbmZpbml0eSA6IHZhbHVlO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnJvbUpTT047XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHRvSlNPTiA9IHJlcXVpcmUoJy4vdG9fanNvbicpO1xuY29uc3QgZnJvbUpTT04gPSByZXF1aXJlKCcuL2Zyb21fanNvbicpO1xuY29uc3QgcmVmaW5lQnlUeXBlID0gcmVxdWlyZSgnLi9yZWZpbmVfYnlfdHlwZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdG9KU09OLFxuICBmcm9tSlNPTixcbiAgcmVmaW5lQnlUeXBlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCByZWZpbmVCeVR5cGUgPSAoaXRlbSkgPT4ge1xuICBzd2l0Y2ggKHR5cGVvZihpdGVtKSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gcmVmaW5lTnVtYmVyKGl0ZW0pO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIHJlZmluZUJvb2xlYW4oaXRlbSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiByZWZpbmVTdHJpbmcoaXRlbSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlZmluZVN0cmluZyA9IChzdHIpID0+IHtcbiAgcmV0dXJuIHN0ciA9PT0gJycgPyAnICcgOiBzdHI7XG59O1xuXG5jb25zdCByZWZpbmVOdW1iZXIgPSAobnVtKSA9PiB7XG4gIHJldHVybiBudW0gPT09IEluZmluaXR5ID8gJ+KInicgOiBudW07XG59O1xuXG5jb25zdCByZWZpbmVCb29sZWFuID0gKGJvb2wpID0+IHtcbiAgcmV0dXJuIGJvb2wgPyAnVCcgOiAnRic7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZmluZUJ5VHlwZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qge1xuICBzdHJpbmdpZnlcbn0gPSBKU09OO1xuXG5jb25zdCB0b0pTT04gPSAob2JqKSA9PiB7XG4gIHJldHVybiBzdHJpbmdpZnkob2JqLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gSW5maW5pdHkgPyAnSW5maW5pdHknIDogdmFsdWU7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB0b0pTT047XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGlzU2NyYXRjaFBhcGVyID0gKGNhdGVnb3J5LCBhbGdvcml0aG0pID0+IHtcbiAgcmV0dXJuIGNhdGVnb3J5ID09ICdzY3JhdGNoJztcbn07XG5cbmNvbnN0IGdldEFsZ29yaXRobURpciA9IChjYXRlZ29yeSwgYWxnb3JpdGhtKSA9PiB7XG4gIGlmIChpc1NjcmF0Y2hQYXBlcihjYXRlZ29yeSkpIHJldHVybiAnLi9hbGdvcml0aG0vc2NyYXRjaF9wYXBlci8nO1xuICByZXR1cm4gYC4vYWxnb3JpdGhtLyR7Y2F0ZWdvcnl9LyR7YWxnb3JpdGhtfS9gO1xufTtcblxuY29uc3QgZ2V0RmlsZURpciA9IChjYXRlZ29yeSwgYWxnb3JpdGhtLCBmaWxlKSA9PiB7XG4gIGlmIChpc1NjcmF0Y2hQYXBlcihjYXRlZ29yeSkpIHJldHVybiAnLi9hbGdvcml0aG0vc2NyYXRjaF9wYXBlci8nO1xuICByZXR1cm4gYC4vYWxnb3JpdGhtLyR7Y2F0ZWdvcnl9LyR7YWxnb3JpdGhtfS8ke2ZpbGV9L2A7XG59O1xuXG5jb25zdCByZW5kZXJNYXRoSmF4ID0gKCkgPT57XG4gICAgTWF0aEpheC5IdWIuUXVldWUoW1wiVHlwZXNldFwiLE1hdGhKYXguSHViXSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNTY3JhdGNoUGFwZXIsXG4gIGdldEFsZ29yaXRobURpcixcbiAgZ2V0RmlsZURpcixcbiAgcmVuZGVyTWF0aEpheFxufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKiFcbiAqIEBvdmVydmlldyBSU1ZQIC0gYSB0aW55IGltcGxlbWVudGF0aW9uIG9mIFByb21pc2VzL0ErLlxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgKGMpIDIwMTYgWWVodWRhIEthdHosIFRvbSBEYWxlLCBTdGVmYW4gUGVubmVyIGFuZCBjb250cmlidXRvcnNcbiAqIEBsaWNlbnNlICAgTGljZW5zZWQgdW5kZXIgTUlUIGxpY2Vuc2VcbiAqICAgICAgICAgICAgU2VlIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS90aWxkZWlvL3JzdnAuanMvbWFzdGVyL0xJQ0VOU0VcbiAqIEB2ZXJzaW9uICAgMy41LjBcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG5cdChmYWN0b3J5KChnbG9iYWwuUlNWUCA9IGdsb2JhbC5SU1ZQIHx8IHt9KSkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpbmRleE9mKGNhbGxiYWNrcywgY2FsbGJhY2spIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGNhbGxiYWNrc1tpXSA9PT0gY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gY2FsbGJhY2tzRm9yKG9iamVjdCkge1xuICB2YXIgY2FsbGJhY2tzID0gb2JqZWN0Ll9wcm9taXNlQ2FsbGJhY2tzO1xuXG4gIGlmICghY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gb2JqZWN0Ll9wcm9taXNlQ2FsbGJhY2tzID0ge307XG4gIH1cblxuICByZXR1cm4gY2FsbGJhY2tzO1xufVxuXG4vKipcbiAgQGNsYXNzIFJTVlAuRXZlbnRUYXJnZXRcbiovXG52YXIgRXZlbnRUYXJnZXQgPSB7XG5cbiAgLyoqXG4gICAgYFJTVlAuRXZlbnRUYXJnZXQubWl4aW5gIGV4dGVuZHMgYW4gb2JqZWN0IHdpdGggRXZlbnRUYXJnZXQgbWV0aG9kcy4gRm9yXG4gICAgRXhhbXBsZTpcbiAgICAgYGBgamF2YXNjcmlwdFxuICAgIGxldCBvYmplY3QgPSB7fTtcbiAgICAgUlNWUC5FdmVudFRhcmdldC5taXhpbihvYmplY3QpO1xuICAgICBvYmplY3Qub24oJ2ZpbmlzaGVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIC8vIGhhbmRsZSBldmVudFxuICAgIH0pO1xuICAgICBvYmplY3QudHJpZ2dlcignZmluaXNoZWQnLCB7IGRldGFpbDogdmFsdWUgfSk7XG4gICAgYGBgXG4gICAgIGBFdmVudFRhcmdldC5taXhpbmAgYWxzbyB3b3JrcyB3aXRoIHByb3RvdHlwZXM6XG4gICAgIGBgYGphdmFzY3JpcHRcbiAgICBsZXQgUGVyc29uID0gZnVuY3Rpb24oKSB7fTtcbiAgICBSU1ZQLkV2ZW50VGFyZ2V0Lm1peGluKFBlcnNvbi5wcm90b3R5cGUpO1xuICAgICBsZXQgeWVodWRhID0gbmV3IFBlcnNvbigpO1xuICAgIGxldCB0b20gPSBuZXcgUGVyc29uKCk7XG4gICAgIHllaHVkYS5vbigncG9rZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBjb25zb2xlLmxvZygnWWVodWRhIHNheXMgT1cnKTtcbiAgICB9KTtcbiAgICAgdG9tLm9uKCdwb2tlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdUb20gc2F5cyBPVycpO1xuICAgIH0pO1xuICAgICB5ZWh1ZGEudHJpZ2dlcigncG9rZScpO1xuICAgIHRvbS50cmlnZ2VyKCdwb2tlJyk7XG4gICAgYGBgXG4gICAgIEBtZXRob2QgbWl4aW5cbiAgICBAZm9yIFJTVlAuRXZlbnRUYXJnZXRcbiAgICBAcHJpdmF0ZVxuICAgIEBwYXJhbSB7T2JqZWN0fSBvYmplY3Qgb2JqZWN0IHRvIGV4dGVuZCB3aXRoIEV2ZW50VGFyZ2V0IG1ldGhvZHNcbiAgKi9cbiAgbWl4aW46IGZ1bmN0aW9uIG1peGluKG9iamVjdCkge1xuICAgIG9iamVjdFsnb24nXSA9IHRoaXNbJ29uJ107XG4gICAgb2JqZWN0WydvZmYnXSA9IHRoaXNbJ29mZiddO1xuICAgIG9iamVjdFsndHJpZ2dlciddID0gdGhpc1sndHJpZ2dlciddO1xuICAgIG9iamVjdC5fcHJvbWlzZUNhbGxiYWNrcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9LFxuXG4gIC8qKlxuICAgIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gYGV2ZW50TmFtZWAgaXMgdHJpZ2dlcmVkXG4gICAgIGBgYGphdmFzY3JpcHRcbiAgICBvYmplY3Qub24oJ2V2ZW50JywgZnVuY3Rpb24oZXZlbnRJbmZvKXtcbiAgICAgIC8vIGhhbmRsZSB0aGUgZXZlbnRcbiAgICB9KTtcbiAgICAgb2JqZWN0LnRyaWdnZXIoJ2V2ZW50Jyk7XG4gICAgYGBgXG4gICAgIEBtZXRob2Qgb25cbiAgICBAZm9yIFJTVlAuRXZlbnRUYXJnZXRcbiAgICBAcHJpdmF0ZVxuICAgIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gbGlzdGVuIGZvclxuICAgIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQuXG4gICovXG4gIG9uOiBmdW5jdGlvbiBvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuXG4gICAgdmFyIGFsbENhbGxiYWNrcyA9IGNhbGxiYWNrc0Zvcih0aGlzKSxcbiAgICAgICAgY2FsbGJhY2tzID0gdW5kZWZpbmVkO1xuXG4gICAgY2FsbGJhY2tzID0gYWxsQ2FsbGJhY2tzW2V2ZW50TmFtZV07XG5cbiAgICBpZiAoIWNhbGxiYWNrcykge1xuICAgICAgY2FsbGJhY2tzID0gYWxsQ2FsbGJhY2tzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICBpZiAoaW5kZXhPZihjYWxsYmFja3MsIGNhbGxiYWNrKSA9PT0gLTEpIHtcbiAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAgWW91IGNhbiB1c2UgYG9mZmAgdG8gc3RvcCBmaXJpbmcgYSBwYXJ0aWN1bGFyIGNhbGxiYWNrIGZvciBhbiBldmVudDpcbiAgICAgYGBgamF2YXNjcmlwdFxuICAgIGZ1bmN0aW9uIGRvU3R1ZmYoKSB7IC8vIGRvIHN0dWZmISB9XG4gICAgb2JqZWN0Lm9uKCdzdHVmZicsIGRvU3R1ZmYpO1xuICAgICBvYmplY3QudHJpZ2dlcignc3R1ZmYnKTsgLy8gZG9TdHVmZiB3aWxsIGJlIGNhbGxlZFxuICAgICAvLyBVbnJlZ2lzdGVyIE9OTFkgdGhlIGRvU3R1ZmYgY2FsbGJhY2tcbiAgICBvYmplY3Qub2ZmKCdzdHVmZicsIGRvU3R1ZmYpO1xuICAgIG9iamVjdC50cmlnZ2VyKCdzdHVmZicpOyAvLyBkb1N0dWZmIHdpbGwgTk9UIGJlIGNhbGxlZFxuICAgIGBgYFxuICAgICBJZiB5b3UgZG9uJ3QgcGFzcyBhIGBjYWxsYmFja2AgYXJndW1lbnQgdG8gYG9mZmAsIEFMTCBjYWxsYmFja3MgZm9yIHRoZVxuICAgIGV2ZW50IHdpbGwgbm90IGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGV2ZW50IGZpcmVzLiBGb3IgZXhhbXBsZTpcbiAgICAgYGBgamF2YXNjcmlwdFxuICAgIGxldCBjYWxsYmFjazEgPSBmdW5jdGlvbigpe307XG4gICAgbGV0IGNhbGxiYWNrMiA9IGZ1bmN0aW9uKCl7fTtcbiAgICAgb2JqZWN0Lm9uKCdzdHVmZicsIGNhbGxiYWNrMSk7XG4gICAgb2JqZWN0Lm9uKCdzdHVmZicsIGNhbGxiYWNrMik7XG4gICAgIG9iamVjdC50cmlnZ2VyKCdzdHVmZicpOyAvLyBjYWxsYmFjazEgYW5kIGNhbGxiYWNrMiB3aWxsIGJlIGV4ZWN1dGVkLlxuICAgICBvYmplY3Qub2ZmKCdzdHVmZicpO1xuICAgIG9iamVjdC50cmlnZ2VyKCdzdHVmZicpOyAvLyBjYWxsYmFjazEgYW5kIGNhbGxiYWNrMiB3aWxsIG5vdCBiZSBleGVjdXRlZCFcbiAgICBgYGBcbiAgICAgQG1ldGhvZCBvZmZcbiAgICBAZm9yIFJTVlAuRXZlbnRUYXJnZXRcbiAgICBAcHJpdmF0ZVxuICAgIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWUgZXZlbnQgdG8gc3RvcCBsaXN0ZW5pbmcgdG9cbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBvcHRpb25hbCBhcmd1bWVudC4gSWYgZ2l2ZW4sIG9ubHkgdGhlIGZ1bmN0aW9uXG4gICAgZ2l2ZW4gd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50J3MgY2FsbGJhY2sgcXVldWUuIElmIG5vIGBjYWxsYmFja2BcbiAgICBhcmd1bWVudCBpcyBnaXZlbiwgYWxsIGNhbGxiYWNrcyB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgZXZlbnQncyBjYWxsYmFja1xuICAgIHF1ZXVlLlxuICAqL1xuICBvZmY6IGZ1bmN0aW9uIG9mZihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGFsbENhbGxiYWNrcyA9IGNhbGxiYWNrc0Zvcih0aGlzKSxcbiAgICAgICAgY2FsbGJhY2tzID0gdW5kZWZpbmVkLFxuICAgICAgICBpbmRleCA9IHVuZGVmaW5lZDtcblxuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGFsbENhbGxiYWNrc1tldmVudE5hbWVdID0gW107XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2FsbGJhY2tzID0gYWxsQ2FsbGJhY2tzW2V2ZW50TmFtZV07XG5cbiAgICBpbmRleCA9IGluZGV4T2YoY2FsbGJhY2tzLCBjYWxsYmFjayk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAgVXNlIGB0cmlnZ2VyYCB0byBmaXJlIGN1c3RvbSBldmVudHMuIEZvciBleGFtcGxlOlxuICAgICBgYGBqYXZhc2NyaXB0XG4gICAgb2JqZWN0Lm9uKCdmb28nLCBmdW5jdGlvbigpe1xuICAgICAgY29uc29sZS5sb2coJ2ZvbyBldmVudCBoYXBwZW5lZCEnKTtcbiAgICB9KTtcbiAgICBvYmplY3QudHJpZ2dlcignZm9vJyk7XG4gICAgLy8gJ2ZvbyBldmVudCBoYXBwZW5lZCEnIGxvZ2dlZCB0byB0aGUgY29uc29sZVxuICAgIGBgYFxuICAgICBZb3UgY2FuIGFsc28gcGFzcyBhIHZhbHVlIGFzIGEgc2Vjb25kIGFyZ3VtZW50IHRvIGB0cmlnZ2VyYCB0aGF0IHdpbGwgYmVcbiAgICBwYXNzZWQgYXMgYW4gYXJndW1lbnQgdG8gYWxsIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIGV2ZW50OlxuICAgICBgYGBqYXZhc2NyaXB0XG4gICAgb2JqZWN0Lm9uKCdmb28nLCBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBjb25zb2xlLmxvZyh2YWx1ZS5uYW1lKTtcbiAgICB9KTtcbiAgICAgb2JqZWN0LnRyaWdnZXIoJ2ZvbycsIHsgbmFtZTogJ2JhcicgfSk7XG4gICAgLy8gJ2JhcicgbG9nZ2VkIHRvIHRoZSBjb25zb2xlXG4gICAgYGBgXG4gICAgIEBtZXRob2QgdHJpZ2dlclxuICAgIEBmb3IgUlNWUC5FdmVudFRhcmdldFxuICAgIEBwcml2YXRlXG4gICAgQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZSBuYW1lIG9mIHRoZSBldmVudCB0byBiZSB0cmlnZ2VyZWRcbiAgICBAcGFyYW0geyp9IG9wdGlvbnMgb3B0aW9uYWwgdmFsdWUgdG8gYmUgcGFzc2VkIHRvIGFueSBldmVudCBoYW5kbGVycyBmb3JcbiAgICB0aGUgZ2l2ZW4gYGV2ZW50TmFtZWBcbiAgKi9cbiAgdHJpZ2dlcjogZnVuY3Rpb24gdHJpZ2dlcihldmVudE5hbWUsIG9wdGlvbnMsIGxhYmVsKSB7XG4gICAgdmFyIGFsbENhbGxiYWNrcyA9IGNhbGxiYWNrc0Zvcih0aGlzKSxcbiAgICAgICAgY2FsbGJhY2tzID0gdW5kZWZpbmVkLFxuICAgICAgICBjYWxsYmFjayA9IHVuZGVmaW5lZDtcblxuICAgIGlmIChjYWxsYmFja3MgPSBhbGxDYWxsYmFja3NbZXZlbnROYW1lXSkge1xuICAgICAgLy8gRG9uJ3QgY2FjaGUgdGhlIGNhbGxiYWNrcy5sZW5ndGggc2luY2UgaXQgbWF5IGdyb3dcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldO1xuXG4gICAgICAgIGNhbGxiYWNrKG9wdGlvbnMsIGxhYmVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbnZhciBjb25maWcgPSB7XG4gIGluc3RydW1lbnQ6IGZhbHNlXG59O1xuXG5FdmVudFRhcmdldFsnbWl4aW4nXShjb25maWcpO1xuXG5mdW5jdGlvbiBjb25maWd1cmUobmFtZSwgdmFsdWUpIHtcbiAgaWYgKG5hbWUgPT09ICdvbmVycm9yJykge1xuICAgIC8vIGhhbmRsZSBmb3IgbGVnYWN5IHVzZXJzIHRoYXQgZXhwZWN0IHRoZSBhY3R1YWxcbiAgICAvLyBlcnJvciB0byBiZSBwYXNzZWQgdG8gdGhlaXIgZnVuY3Rpb24gYWRkZWQgdmlhXG4gICAgLy8gYFJTVlAuY29uZmlndXJlKCdvbmVycm9yJywgc29tZUZ1bmN0aW9uSGVyZSk7YFxuICAgIGNvbmZpZ1snb24nXSgnZXJyb3InLCB2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICBjb25maWdbbmFtZV0gPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29uZmlnW25hbWVdO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9iamVjdE9yRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHggIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTWF5YmVUaGVuYWJsZSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgJiYgeCAhPT0gbnVsbDtcbn1cblxudmFyIF9pc0FycmF5ID0gdW5kZWZpbmVkO1xuaWYgKCFBcnJheS5pc0FycmF5KSB7XG4gIF9pc0FycmF5ID0gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xufSBlbHNlIHtcbiAgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xufVxuXG52YXIgaXNBcnJheSA9IF9pc0FycmF5O1xuXG4vLyBEYXRlLm5vdyBpcyBub3QgYXZhaWxhYmxlIGluIGJyb3dzZXJzIDwgSUU5XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9EYXRlL25vdyNDb21wYXRpYmlsaXR5XG52YXIgbm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG59O1xuXG5mdW5jdGlvbiBGKCkge31cblxudmFyIG9fY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiAobykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlY29uZCBhcmd1bWVudCBub3Qgc3VwcG9ydGVkJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBvICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cbiAgRi5wcm90b3R5cGUgPSBvO1xuICByZXR1cm4gbmV3IEYoKTtcbn07XG5cbnZhciBxdWV1ZSA9IFtdO1xuXG5mdW5jdGlvbiBzY2hlZHVsZUZsdXNoKCkge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZW50cnkgPSBxdWV1ZVtpXTtcblxuICAgICAgdmFyIHBheWxvYWQgPSBlbnRyeS5wYXlsb2FkO1xuXG4gICAgICBwYXlsb2FkLmd1aWQgPSBwYXlsb2FkLmtleSArIHBheWxvYWQuaWQ7XG4gICAgICBwYXlsb2FkLmNoaWxkR3VpZCA9IHBheWxvYWQua2V5ICsgcGF5bG9hZC5jaGlsZElkO1xuICAgICAgaWYgKHBheWxvYWQuZXJyb3IpIHtcbiAgICAgICAgcGF5bG9hZC5zdGFjayA9IHBheWxvYWQuZXJyb3Iuc3RhY2s7XG4gICAgICB9XG5cbiAgICAgIGNvbmZpZ1sndHJpZ2dlciddKGVudHJ5Lm5hbWUsIGVudHJ5LnBheWxvYWQpO1xuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICB9LCA1MCk7XG59XG5mdW5jdGlvbiBpbnN0cnVtZW50JDEoZXZlbnROYW1lLCBwcm9taXNlLCBjaGlsZCkge1xuICBpZiAoMSA9PT0gcXVldWUucHVzaCh7XG4gICAgbmFtZTogZXZlbnROYW1lLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGtleTogcHJvbWlzZS5fZ3VpZEtleSxcbiAgICAgIGlkOiBwcm9taXNlLl9pZCxcbiAgICAgIGV2ZW50TmFtZTogZXZlbnROYW1lLFxuICAgICAgZGV0YWlsOiBwcm9taXNlLl9yZXN1bHQsXG4gICAgICBjaGlsZElkOiBjaGlsZCAmJiBjaGlsZC5faWQsXG4gICAgICBsYWJlbDogcHJvbWlzZS5fbGFiZWwsXG4gICAgICB0aW1lU3RhbXA6IG5vdygpLFxuICAgICAgZXJyb3I6IGNvbmZpZ1tcImluc3RydW1lbnQtd2l0aC1zdGFja1wiXSA/IG5ldyBFcnJvcihwcm9taXNlLl9sYWJlbCkgOiBudWxsXG4gICAgfSB9KSkge1xuICAgIHNjaGVkdWxlRmx1c2goKTtcbiAgfVxufVxuXG4vKipcbiAgYFJTVlAuUHJvbWlzZS5yZXNvbHZlYCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIHJlc29sdmVkIHdpdGggdGhlXG4gIHBhc3NlZCBgdmFsdWVgLiBJdCBpcyBzaG9ydGhhbmQgZm9yIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IG5ldyBSU1ZQLlByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZXNvbHZlKDEpO1xuICB9KTtcblxuICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgIC8vIHZhbHVlID09PSAxXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFJTVlAuUHJvbWlzZS5yZXNvbHZlKDEpO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gdmFsdWUgPT09IDFcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVzb2x2ZVxuICBAc3RhdGljXG4gIEBwYXJhbSB7Kn0gb2JqZWN0IHZhbHVlIHRoYXQgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCB3aXRoXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGlkZW50aWZ5aW5nIHRoZSByZXR1cm5lZCBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSB0aGF0IHdpbGwgYmVjb21lIGZ1bGZpbGxlZCB3aXRoIHRoZSBnaXZlblxuICBgdmFsdWVgXG4qL1xuZnVuY3Rpb24gcmVzb2x2ZSQxKG9iamVjdCwgbGFiZWwpIHtcbiAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgdmFyIENvbnN0cnVjdG9yID0gdGhpcztcblxuICBpZiAob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdC5jb25zdHJ1Y3RvciA9PT0gQ29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCwgbGFiZWwpO1xuICByZXNvbHZlKHByb21pc2UsIG9iamVjdCk7XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG5mdW5jdGlvbiB3aXRoT3duUHJvbWlzZSgpIHtcbiAgcmV0dXJuIG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZXMgY2FsbGJhY2sgY2Fubm90IHJldHVybiB0aGF0IHNhbWUgcHJvbWlzZS4nKTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBQRU5ESU5HID0gdm9pZCAwO1xudmFyIEZVTEZJTExFRCA9IDE7XG52YXIgUkVKRUNURUQgPSAyO1xuXG52YXIgR0VUX1RIRU5fRVJST1IgPSBuZXcgRXJyb3JPYmplY3QoKTtcblxuZnVuY3Rpb24gZ2V0VGhlbihwcm9taXNlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBHRVRfVEhFTl9FUlJPUi5lcnJvciA9IGVycm9yO1xuICAgIHJldHVybiBHRVRfVEhFTl9FUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cnlUaGVuKHRoZW4kJDEsIHZhbHVlLCBmdWxmaWxsbWVudEhhbmRsZXIsIHJlamVjdGlvbkhhbmRsZXIpIHtcbiAgdHJ5IHtcbiAgICB0aGVuJCQxLmNhbGwodmFsdWUsIGZ1bGZpbGxtZW50SGFuZGxlciwgcmVqZWN0aW9uSGFuZGxlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVGb3JlaWduVGhlbmFibGUocHJvbWlzZSwgdGhlbmFibGUsIHRoZW4kJDEpIHtcbiAgY29uZmlnLmFzeW5jKGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgdmFyIHNlYWxlZCA9IGZhbHNlO1xuICAgIHZhciBlcnJvciA9IHRyeVRoZW4odGhlbiQkMSwgdGhlbmFibGUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlLCB1bmRlZmluZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZWFsZWQgPSB0cnVlO1xuXG4gICAgICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9LCAnU2V0dGxlOiAnICsgKHByb21pc2UuX2xhYmVsIHx8ICcgdW5rbm93biBwcm9taXNlJykpO1xuXG4gICAgaWYgKCFzZWFsZWQgJiYgZXJyb3IpIHtcbiAgICAgIHNlYWxlZCA9IHRydWU7XG4gICAgICByZWplY3QocHJvbWlzZSwgZXJyb3IpO1xuICAgIH1cbiAgfSwgcHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU93blRoZW5hYmxlKHByb21pc2UsIHRoZW5hYmxlKSB7XG4gIGlmICh0aGVuYWJsZS5fc3RhdGUgPT09IEZVTEZJTExFRCkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSBpZiAodGhlbmFibGUuX3N0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgIHRoZW5hYmxlLl9vbkVycm9yID0gbnVsbDtcbiAgICByZWplY3QocHJvbWlzZSwgdGhlbmFibGUuX3Jlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgc3Vic2NyaWJlKHRoZW5hYmxlLCB1bmRlZmluZWQsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoZW5hYmxlICE9PSB2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlLCB1bmRlZmluZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcmV0dXJuIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSwgdGhlbiQkMSkge1xuICBpZiAobWF5YmVUaGVuYWJsZS5jb25zdHJ1Y3RvciA9PT0gcHJvbWlzZS5jb25zdHJ1Y3RvciAmJiB0aGVuJCQxID09PSB0aGVuICYmIHByb21pc2UuY29uc3RydWN0b3IucmVzb2x2ZSA9PT0gcmVzb2x2ZSQxKSB7XG4gICAgaGFuZGxlT3duVGhlbmFibGUocHJvbWlzZSwgbWF5YmVUaGVuYWJsZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoZW4kJDEgPT09IEdFVF9USEVOX0VSUk9SKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgR0VUX1RIRU5fRVJST1IuZXJyb3IpO1xuICAgICAgR0VUX1RIRU5fRVJST1IuZXJyb3IgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhlbiQkMSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGVuJCQxKSkge1xuICAgICAgaGFuZGxlRm9yZWlnblRoZW5hYmxlKHByb21pc2UsIG1heWJlVGhlbmFibGUsIHRoZW4kJDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdWxmaWxsKHByb21pc2UsIG1heWJlVGhlbmFibGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlKHByb21pc2UsIHZhbHVlKSB7XG4gIGlmIChwcm9taXNlID09PSB2YWx1ZSkge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKG9iamVjdE9yRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgaGFuZGxlTWF5YmVUaGVuYWJsZShwcm9taXNlLCB2YWx1ZSwgZ2V0VGhlbih2YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHB1Ymxpc2hSZWplY3Rpb24ocHJvbWlzZSkge1xuICBpZiAocHJvbWlzZS5fb25FcnJvcikge1xuICAgIHByb21pc2UuX29uRXJyb3IocHJvbWlzZS5fcmVzdWx0KTtcbiAgfVxuXG4gIHB1Ymxpc2gocHJvbWlzZSk7XG59XG5cbmZ1bmN0aW9uIGZ1bGZpbGwocHJvbWlzZSwgdmFsdWUpIHtcbiAgaWYgKHByb21pc2UuX3N0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHJvbWlzZS5fcmVzdWx0ID0gdmFsdWU7XG4gIHByb21pc2UuX3N0YXRlID0gRlVMRklMTEVEO1xuXG4gIGlmIChwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoY29uZmlnLmluc3RydW1lbnQpIHtcbiAgICAgIGluc3RydW1lbnQkMSgnZnVsZmlsbGVkJywgcHJvbWlzZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5hc3luYyhwdWJsaXNoLCBwcm9taXNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWplY3QocHJvbWlzZSwgcmVhc29uKSB7XG4gIGlmIChwcm9taXNlLl9zdGF0ZSAhPT0gUEVORElORykge1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9taXNlLl9zdGF0ZSA9IFJFSkVDVEVEO1xuICBwcm9taXNlLl9yZXN1bHQgPSByZWFzb247XG4gIGNvbmZpZy5hc3luYyhwdWJsaXNoUmVqZWN0aW9uLCBwcm9taXNlKTtcbn1cblxuZnVuY3Rpb24gc3Vic2NyaWJlKHBhcmVudCwgY2hpbGQsIG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gIHZhciBzdWJzY3JpYmVycyA9IHBhcmVudC5fc3Vic2NyaWJlcnM7XG4gIHZhciBsZW5ndGggPSBzdWJzY3JpYmVycy5sZW5ndGg7XG5cbiAgcGFyZW50Ll9vbkVycm9yID0gbnVsbDtcblxuICBzdWJzY3JpYmVyc1tsZW5ndGhdID0gY2hpbGQ7XG4gIHN1YnNjcmliZXJzW2xlbmd0aCArIEZVTEZJTExFRF0gPSBvbkZ1bGZpbGxtZW50O1xuICBzdWJzY3JpYmVyc1tsZW5ndGggKyBSRUpFQ1RFRF0gPSBvblJlamVjdGlvbjtcblxuICBpZiAobGVuZ3RoID09PSAwICYmIHBhcmVudC5fc3RhdGUpIHtcbiAgICBjb25maWcuYXN5bmMocHVibGlzaCwgcGFyZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwdWJsaXNoKHByb21pc2UpIHtcbiAgdmFyIHN1YnNjcmliZXJzID0gcHJvbWlzZS5fc3Vic2NyaWJlcnM7XG4gIHZhciBzZXR0bGVkID0gcHJvbWlzZS5fc3RhdGU7XG5cbiAgaWYgKGNvbmZpZy5pbnN0cnVtZW50KSB7XG4gICAgaW5zdHJ1bWVudCQxKHNldHRsZWQgPT09IEZVTEZJTExFRCA/ICdmdWxmaWxsZWQnIDogJ3JlamVjdGVkJywgcHJvbWlzZSk7XG4gIH1cblxuICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGNoaWxkID0gdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2sgPSB1bmRlZmluZWQsXG4gICAgICBkZXRhaWwgPSBwcm9taXNlLl9yZXN1bHQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgIGNoaWxkID0gc3Vic2NyaWJlcnNbaV07XG4gICAgY2FsbGJhY2sgPSBzdWJzY3JpYmVyc1tpICsgc2V0dGxlZF07XG5cbiAgICBpZiAoY2hpbGQpIHtcbiAgICAgIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIGNoaWxkLCBjYWxsYmFjaywgZGV0YWlsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soZGV0YWlsKTtcbiAgICB9XG4gIH1cblxuICBwcm9taXNlLl9zdWJzY3JpYmVycy5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiBFcnJvck9iamVjdCgpIHtcbiAgdGhpcy5lcnJvciA9IG51bGw7XG59XG5cbnZhciBUUllfQ0FUQ0hfRVJST1IgPSBuZXcgRXJyb3JPYmplY3QoKTtcblxuZnVuY3Rpb24gdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCkge1xuICB0cnkge1xuICAgIHJldHVybiBjYWxsYmFjayhkZXRhaWwpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgVFJZX0NBVENIX0VSUk9SLmVycm9yID0gZTtcbiAgICByZXR1cm4gVFJZX0NBVENIX0VSUk9SO1xuICB9XG59XG5cbmZ1bmN0aW9uIGludm9rZUNhbGxiYWNrKHNldHRsZWQsIHByb21pc2UsIGNhbGxiYWNrLCBkZXRhaWwpIHtcbiAgdmFyIGhhc0NhbGxiYWNrID0gaXNGdW5jdGlvbihjYWxsYmFjayksXG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZCxcbiAgICAgIGVycm9yID0gdW5kZWZpbmVkLFxuICAgICAgc3VjY2VlZGVkID0gdW5kZWZpbmVkLFxuICAgICAgZmFpbGVkID0gdW5kZWZpbmVkO1xuXG4gIGlmIChoYXNDYWxsYmFjaykge1xuICAgIHZhbHVlID0gdHJ5Q2F0Y2goY2FsbGJhY2ssIGRldGFpbCk7XG5cbiAgICBpZiAodmFsdWUgPT09IFRSWV9DQVRDSF9FUlJPUikge1xuICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgIGVycm9yID0gdmFsdWUuZXJyb3I7XG4gICAgICB2YWx1ZS5lcnJvciA9IG51bGw7IC8vIHJlbGVhc2VcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgd2l0aE93blByb21pc2UoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gZGV0YWlsO1xuICAgIHN1Y2NlZWRlZCA9IHRydWU7XG4gIH1cblxuICBpZiAocHJvbWlzZS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAvLyBub29wXG4gIH0gZWxzZSBpZiAoaGFzQ2FsbGJhY2sgJiYgc3VjY2VlZGVkKSB7XG4gICAgICByZXNvbHZlKHByb21pc2UsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGZhaWxlZCkge1xuICAgICAgcmVqZWN0KHByb21pc2UsIGVycm9yKTtcbiAgICB9IGVsc2UgaWYgKHNldHRsZWQgPT09IEZVTEZJTExFRCkge1xuICAgICAgZnVsZmlsbChwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChzZXR0bGVkID09PSBSRUpFQ1RFRCkge1xuICAgICAgcmVqZWN0KHByb21pc2UsIHZhbHVlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVQcm9taXNlKHByb21pc2UsIHJlc29sdmVyKSB7XG4gIHZhciByZXNvbHZlZCA9IGZhbHNlO1xuICB0cnkge1xuICAgIHJlc29sdmVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHJlc29sdmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHJlc29sdmUocHJvbWlzZSwgdmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIGlmIChyZXNvbHZlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXNvbHZlZCA9IHRydWU7XG4gICAgICByZWplY3QocHJvbWlzZSwgcmVhc29uKTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlamVjdChwcm9taXNlLCBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0aGVuKG9uRnVsZmlsbG1lbnQsIG9uUmVqZWN0aW9uLCBsYWJlbCkge1xuICB2YXIgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcblxuICB2YXIgcGFyZW50ID0gdGhpcztcbiAgdmFyIHN0YXRlID0gcGFyZW50Ll9zdGF0ZTtcblxuICBpZiAoc3RhdGUgPT09IEZVTEZJTExFRCAmJiAhb25GdWxmaWxsbWVudCB8fCBzdGF0ZSA9PT0gUkVKRUNURUQgJiYgIW9uUmVqZWN0aW9uKSB7XG4gICAgY29uZmlnLmluc3RydW1lbnQgJiYgaW5zdHJ1bWVudCQxKCdjaGFpbmVkJywgcGFyZW50LCBwYXJlbnQpO1xuICAgIHJldHVybiBwYXJlbnQ7XG4gIH1cblxuICBwYXJlbnQuX29uRXJyb3IgPSBudWxsO1xuXG4gIHZhciBjaGlsZCA9IG5ldyBwYXJlbnQuY29uc3RydWN0b3Iobm9vcCwgbGFiZWwpO1xuICB2YXIgcmVzdWx0ID0gcGFyZW50Ll9yZXN1bHQ7XG5cbiAgY29uZmlnLmluc3RydW1lbnQgJiYgaW5zdHJ1bWVudCQxKCdjaGFpbmVkJywgcGFyZW50LCBjaGlsZCk7XG5cbiAgaWYgKHN0YXRlKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjYWxsYmFjayA9IF9hcmd1bWVudHNbc3RhdGUgLSAxXTtcbiAgICAgIGNvbmZpZy5hc3luYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpbnZva2VDYWxsYmFjayhzdGF0ZSwgY2hpbGQsIGNhbGxiYWNrLCByZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfSBlbHNlIHtcbiAgICBzdWJzY3JpYmUocGFyZW50LCBjaGlsZCwgb25GdWxmaWxsbWVudCwgb25SZWplY3Rpb24pO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG5mdW5jdGlvbiBtYWtlU2V0dGxlZFJlc3VsdChzdGF0ZSwgcG9zaXRpb24sIHZhbHVlKSB7XG4gIGlmIChzdGF0ZSA9PT0gRlVMRklMTEVEKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiAnZnVsZmlsbGVkJyxcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiAncmVqZWN0ZWQnLFxuICAgICAgcmVhc29uOiB2YWx1ZVxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gRW51bWVyYXRvcihDb25zdHJ1Y3RvciwgaW5wdXQsIGFib3J0T25SZWplY3QsIGxhYmVsKSB7XG4gIHRoaXMuX2luc3RhbmNlQ29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgdGhpcy5wcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3AsIGxhYmVsKTtcbiAgdGhpcy5fYWJvcnRPblJlamVjdCA9IGFib3J0T25SZWplY3Q7XG5cbiAgaWYgKHRoaXMuX3ZhbGlkYXRlSW5wdXQoaW5wdXQpKSB7XG4gICAgdGhpcy5faW5wdXQgPSBpbnB1dDtcbiAgICB0aGlzLmxlbmd0aCA9IGlucHV0Lmxlbmd0aDtcbiAgICB0aGlzLl9yZW1haW5pbmcgPSBpbnB1dC5sZW5ndGg7XG5cbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGZ1bGZpbGwodGhpcy5wcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHRoaXMubGVuZ3RoIHx8IDA7XG4gICAgICB0aGlzLl9lbnVtZXJhdGUoKTtcbiAgICAgIGlmICh0aGlzLl9yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgZnVsZmlsbCh0aGlzLnByb21pc2UsIHRoaXMuX3Jlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlamVjdCh0aGlzLnByb21pc2UsIHRoaXMuX3ZhbGlkYXRpb25FcnJvcigpKTtcbiAgfVxufVxuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICByZXR1cm4gaXNBcnJheShpbnB1dCk7XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGlvbkVycm9yID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IEVycm9yKCdBcnJheSBNZXRob2RzIG11c3QgYmUgcHJvdmlkZWQgYW4gQXJyYXknKTtcbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9yZXN1bHQgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpO1xufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX2VudW1lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICB2YXIgcHJvbWlzZSA9IHRoaXMucHJvbWlzZTtcbiAgdmFyIGlucHV0ID0gdGhpcy5faW5wdXQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HICYmIGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHRoaXMuX2VhY2hFbnRyeShpbnB1dFtpXSwgaSk7XG4gIH1cbn07XG5cbkVudW1lcmF0b3IucHJvdG90eXBlLl9zZXR0bGVNYXliZVRoZW5hYmxlID0gZnVuY3Rpb24gKGVudHJ5LCBpKSB7XG4gIHZhciBjID0gdGhpcy5faW5zdGFuY2VDb25zdHJ1Y3RvcjtcbiAgdmFyIHJlc29sdmUkJDEgPSBjLnJlc29sdmU7XG5cbiAgaWYgKHJlc29sdmUkJDEgPT09IHJlc29sdmUkMSkge1xuICAgIHZhciB0aGVuJCQxID0gZ2V0VGhlbihlbnRyeSk7XG5cbiAgICBpZiAodGhlbiQkMSA9PT0gdGhlbiAmJiBlbnRyeS5fc3RhdGUgIT09IFBFTkRJTkcpIHtcbiAgICAgIGVudHJ5Ll9vbkVycm9yID0gbnVsbDtcbiAgICAgIHRoaXMuX3NldHRsZWRBdChlbnRyeS5fc3RhdGUsIGksIGVudHJ5Ll9yZXN1bHQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4kJDEgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX3JlbWFpbmluZy0tO1xuICAgICAgdGhpcy5fcmVzdWx0W2ldID0gdGhpcy5fbWFrZVJlc3VsdChGVUxGSUxMRUQsIGksIGVudHJ5KTtcbiAgICB9IGVsc2UgaWYgKGMgPT09IFByb21pc2UkMSkge1xuICAgICAgdmFyIHByb21pc2UgPSBuZXcgYyhub29wKTtcbiAgICAgIGhhbmRsZU1heWJlVGhlbmFibGUocHJvbWlzZSwgZW50cnksIHRoZW4kJDEpO1xuICAgICAgdGhpcy5fd2lsbFNldHRsZUF0KHByb21pc2UsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aWxsU2V0dGxlQXQobmV3IGMoZnVuY3Rpb24gKHJlc29sdmUkJDEpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUkJDEoZW50cnkpO1xuICAgICAgfSksIGkpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl93aWxsU2V0dGxlQXQocmVzb2x2ZSQkMShlbnRyeSksIGkpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fZWFjaEVudHJ5ID0gZnVuY3Rpb24gKGVudHJ5LCBpKSB7XG4gIGlmIChpc01heWJlVGhlbmFibGUoZW50cnkpKSB7XG4gICAgdGhpcy5fc2V0dGxlTWF5YmVUaGVuYWJsZShlbnRyeSwgaSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fcmVtYWluaW5nLS07XG4gICAgdGhpcy5fcmVzdWx0W2ldID0gdGhpcy5fbWFrZVJlc3VsdChGVUxGSUxMRUQsIGksIGVudHJ5KTtcbiAgfVxufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3NldHRsZWRBdCA9IGZ1bmN0aW9uIChzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzLnByb21pc2U7XG5cbiAgaWYgKHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HKSB7XG4gICAgdGhpcy5fcmVtYWluaW5nLS07XG5cbiAgICBpZiAodGhpcy5fYWJvcnRPblJlamVjdCAmJiBzdGF0ZSA9PT0gUkVKRUNURUQpIHtcbiAgICAgIHJlamVjdChwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Jlc3VsdFtpXSA9IHRoaXMuX21ha2VSZXN1bHQoc3RhdGUsIGksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5fcmVtYWluaW5nID09PSAwKSB7XG4gICAgZnVsZmlsbChwcm9taXNlLCB0aGlzLl9yZXN1bHQpO1xuICB9XG59O1xuXG5FbnVtZXJhdG9yLnByb3RvdHlwZS5fbWFrZVJlc3VsdCA9IGZ1bmN0aW9uIChzdGF0ZSwgaSwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuRW51bWVyYXRvci5wcm90b3R5cGUuX3dpbGxTZXR0bGVBdCA9IGZ1bmN0aW9uIChwcm9taXNlLCBpKSB7XG4gIHZhciBlbnVtZXJhdG9yID0gdGhpcztcblxuICBzdWJzY3JpYmUocHJvbWlzZSwgdW5kZWZpbmVkLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZW51bWVyYXRvci5fc2V0dGxlZEF0KEZVTEZJTExFRCwgaSwgdmFsdWUpO1xuICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgcmV0dXJuIGVudW1lcmF0b3IuX3NldHRsZWRBdChSRUpFQ1RFRCwgaSwgcmVhc29uKTtcbiAgfSk7XG59O1xuXG4vKipcbiAgYFJTVlAuUHJvbWlzZS5hbGxgIGFjY2VwdHMgYW4gYXJyYXkgb2YgcHJvbWlzZXMsIGFuZCByZXR1cm5zIGEgbmV3IHByb21pc2Ugd2hpY2hcbiAgaXMgZnVsZmlsbGVkIHdpdGggYW4gYXJyYXkgb2YgZnVsZmlsbG1lbnQgdmFsdWVzIGZvciB0aGUgcGFzc2VkIHByb21pc2VzLCBvclxuICByZWplY3RlZCB3aXRoIHRoZSByZWFzb24gb2YgdGhlIGZpcnN0IHBhc3NlZCBwcm9taXNlIHRvIGJlIHJlamVjdGVkLiBJdCBjYXN0cyBhbGxcbiAgZWxlbWVudHMgb2YgdGhlIHBhc3NlZCBpdGVyYWJsZSB0byBwcm9taXNlcyBhcyBpdCBydW5zIHRoaXMgYWxnb3JpdGhtLlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBSU1ZQLnJlc29sdmUoMSk7XG4gIGxldCBwcm9taXNlMiA9IFJTVlAucmVzb2x2ZSgyKTtcbiAgbGV0IHByb21pc2UzID0gUlNWUC5yZXNvbHZlKDMpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBSU1ZQLlByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKGFycmF5KXtcbiAgICAvLyBUaGUgYXJyYXkgaGVyZSB3b3VsZCBiZSBbIDEsIDIsIDMgXTtcbiAgfSk7XG4gIGBgYFxuXG4gIElmIGFueSBvZiB0aGUgYHByb21pc2VzYCBnaXZlbiB0byBgUlNWUC5hbGxgIGFyZSByZWplY3RlZCwgdGhlIGZpcnN0IHByb21pc2VcbiAgdGhhdCBpcyByZWplY3RlZCB3aWxsIGJlIGdpdmVuIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSByZXR1cm5lZCBwcm9taXNlcydzXG4gIHJlamVjdGlvbiBoYW5kbGVyLiBGb3IgZXhhbXBsZTpcblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gUlNWUC5yZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSBSU1ZQLnJlamVjdChuZXcgRXJyb3IoXCIyXCIpKTtcbiAgbGV0IHByb21pc2UzID0gUlNWUC5yZWplY3QobmV3IEVycm9yKFwiM1wiKSk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFJTVlAuUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zIGJlY2F1c2UgdGhlcmUgYXJlIHJlamVjdGVkIHByb21pc2VzIVxuICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgIC8vIGVycm9yLm1lc3NhZ2UgPT09IFwiMlwiXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIGFsbFxuICBAc3RhdGljXG4gIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgYXJyYXkgb2YgcHJvbWlzZXNcbiAgQHBhcmFtIHtTdHJpbmd9IGxhYmVsIG9wdGlvbmFsIHN0cmluZyBmb3IgbGFiZWxpbmcgdGhlIHByb21pc2UuXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aGVuIGFsbCBgcHJvbWlzZXNgIGhhdmUgYmVlblxuICBmdWxmaWxsZWQsIG9yIHJlamVjdGVkIGlmIGFueSBvZiB0aGVtIGJlY29tZSByZWplY3RlZC5cbiAgQHN0YXRpY1xuKi9cbmZ1bmN0aW9uIGFsbCQxKGVudHJpZXMsIGxhYmVsKSB7XG4gIHJldHVybiBuZXcgRW51bWVyYXRvcih0aGlzLCBlbnRyaWVzLCB0cnVlLCAvKiBhYm9ydCBvbiByZWplY3QgKi9sYWJlbCkucHJvbWlzZTtcbn1cblxuLyoqXG4gIGBSU1ZQLlByb21pc2UucmFjZWAgcmV0dXJucyBhIG5ldyBwcm9taXNlIHdoaWNoIGlzIHNldHRsZWQgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZVxuICBmaXJzdCBwYXNzZWQgcHJvbWlzZSB0byBzZXR0bGUuXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IG5ldyBSU1ZQLlByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXNvbHZlKCdwcm9taXNlIDEnKTtcbiAgICB9LCAyMDApO1xuICB9KTtcblxuICBsZXQgcHJvbWlzZTIgPSBuZXcgUlNWUC5Qcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAyJyk7XG4gICAgfSwgMTAwKTtcbiAgfSk7XG5cbiAgUlNWUC5Qcm9taXNlLnJhY2UoW3Byb21pc2UxLCBwcm9taXNlMl0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyByZXN1bHQgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgaXQgd2FzIHJlc29sdmVkIGJlZm9yZSBwcm9taXNlMVxuICAgIC8vIHdhcyByZXNvbHZlZC5cbiAgfSk7XG4gIGBgYFxuXG4gIGBSU1ZQLlByb21pc2UucmFjZWAgaXMgZGV0ZXJtaW5pc3RpYyBpbiB0aGF0IG9ubHkgdGhlIHN0YXRlIG9mIHRoZSBmaXJzdFxuICBzZXR0bGVkIHByb21pc2UgbWF0dGVycy4gRm9yIGV4YW1wbGUsIGV2ZW4gaWYgb3RoZXIgcHJvbWlzZXMgZ2l2ZW4gdG8gdGhlXG4gIGBwcm9taXNlc2AgYXJyYXkgYXJndW1lbnQgYXJlIHJlc29sdmVkLCBidXQgdGhlIGZpcnN0IHNldHRsZWQgcHJvbWlzZSBoYXNcbiAgYmVjb21lIHJlamVjdGVkIGJlZm9yZSB0aGUgb3RoZXIgcHJvbWlzZXMgYmVjYW1lIGZ1bGZpbGxlZCwgdGhlIHJldHVybmVkXG4gIHByb21pc2Ugd2lsbCBiZWNvbWUgcmVqZWN0ZWQ6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZTEgPSBuZXcgUlNWUC5Qcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmVzb2x2ZSgncHJvbWlzZSAxJyk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG5cbiAgbGV0IHByb21pc2UyID0gbmV3IFJTVlAuUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ3Byb21pc2UgMicpKTtcbiAgICB9LCAxMDApO1xuICB9KTtcblxuICBSU1ZQLlByb21pc2UucmFjZShbcHJvbWlzZTEsIHByb21pc2UyXSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdwcm9taXNlIDInIGJlY2F1c2UgcHJvbWlzZSAyIGJlY2FtZSByZWplY3RlZCBiZWZvcmVcbiAgICAvLyBwcm9taXNlIDEgYmVjYW1lIGZ1bGZpbGxlZFxuICB9KTtcbiAgYGBgXG5cbiAgQW4gZXhhbXBsZSByZWFsLXdvcmxkIHVzZSBjYXNlIGlzIGltcGxlbWVudGluZyB0aW1lb3V0czpcblxuICBgYGBqYXZhc2NyaXB0XG4gIFJTVlAuUHJvbWlzZS5yYWNlKFthamF4KCdmb28uanNvbicpLCB0aW1lb3V0KDUwMDApXSlcbiAgYGBgXG5cbiAgQG1ldGhvZCByYWNlXG4gIEBzdGF0aWNcbiAgQHBhcmFtIHtBcnJheX0gZW50cmllcyBhcnJheSBvZiBwcm9taXNlcyB0byBvYnNlcnZlXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGRlc2NyaWJpbmcgdGhlIHByb21pc2UgcmV0dXJuZWQuXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX0gYSBwcm9taXNlIHdoaWNoIHNldHRsZXMgaW4gdGhlIHNhbWUgd2F5IGFzIHRoZSBmaXJzdCBwYXNzZWRcbiAgcHJvbWlzZSB0byBzZXR0bGUuXG4qL1xuZnVuY3Rpb24gcmFjZSQxKGVudHJpZXMsIGxhYmVsKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG5cbiAgdmFyIHByb21pc2UgPSBuZXcgQ29uc3RydWN0b3Iobm9vcCwgbGFiZWwpO1xuXG4gIGlmICghaXNBcnJheShlbnRyaWVzKSkge1xuICAgIHJlamVjdChwcm9taXNlLCBuZXcgVHlwZUVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIGFycmF5IHRvIHJhY2UuJykpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HICYmIGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgc3Vic2NyaWJlKENvbnN0cnVjdG9yLnJlc29sdmUoZW50cmllc1tpXSksIHVuZGVmaW5lZCwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShwcm9taXNlLCB2YWx1ZSk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcmV0dXJuIHJlamVjdChwcm9taXNlLCByZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8qKlxuICBgUlNWUC5Qcm9taXNlLnJlamVjdGAgcmV0dXJucyBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgcGFzc2VkIGByZWFzb25gLlxuICBJdCBpcyBzaG9ydGhhbmQgZm9yIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IG5ldyBSU1ZQLlByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgLy8gQ29kZSBoZXJlIGRvZXNuJ3QgcnVuIGJlY2F1c2UgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdXSE9PUFMnXG4gIH0pO1xuICBgYGBcblxuICBJbnN0ZWFkIG9mIHdyaXRpbmcgdGhlIGFib3ZlLCB5b3VyIGNvZGUgbm93IHNpbXBseSBiZWNvbWVzIHRoZSBmb2xsb3dpbmc6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZSA9IFJTVlAuUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdXSE9PUFMnKSk7XG5cbiAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJ1dIT09QUydcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgcmVqZWN0XG4gIEBzdGF0aWNcbiAgQHBhcmFtIHsqfSByZWFzb24gdmFsdWUgdGhhdCB0aGUgcmV0dXJuZWQgcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkIHdpdGguXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGlkZW50aWZ5aW5nIHRoZSByZXR1cm5lZCBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IGEgcHJvbWlzZSByZWplY3RlZCB3aXRoIHRoZSBnaXZlbiBgcmVhc29uYC5cbiovXG5mdW5jdGlvbiByZWplY3QkMShyZWFzb24sIGxhYmVsKSB7XG4gIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gIHZhciBDb25zdHJ1Y3RvciA9IHRoaXM7XG4gIHZhciBwcm9taXNlID0gbmV3IENvbnN0cnVjdG9yKG5vb3AsIGxhYmVsKTtcbiAgcmVqZWN0KHByb21pc2UsIHJlYXNvbik7XG4gIHJldHVybiBwcm9taXNlO1xufVxuXG52YXIgZ3VpZEtleSA9ICdyc3ZwXycgKyBub3coKSArICctJztcbnZhciBjb3VudGVyID0gMDtcblxuZnVuY3Rpb24gbmVlZHNSZXNvbHZlcigpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignWW91IG11c3QgcGFzcyBhIHJlc29sdmVyIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGUgcHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xufVxuXG5mdW5jdGlvbiBuZWVkc05ldygpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ1Byb21pc2UnOiBQbGVhc2UgdXNlIHRoZSAnbmV3JyBvcGVyYXRvciwgdGhpcyBvYmplY3QgY29uc3RydWN0b3IgY2Fubm90IGJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLlwiKTtcbn1cblxuLyoqXG4gIFByb21pc2Ugb2JqZWN0cyByZXByZXNlbnQgdGhlIGV2ZW50dWFsIHJlc3VsdCBvZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGVcbiAgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCwgd2hpY2hcbiAgcmVnaXN0ZXJzIGNhbGxiYWNrcyB0byByZWNlaXZlIGVpdGhlciBhIHByb21pc2XigJlzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZSByZWFzb25cbiAgd2h5IHRoZSBwcm9taXNlIGNhbm5vdCBiZSBmdWxmaWxsZWQuXG5cbiAgVGVybWlub2xvZ3lcbiAgLS0tLS0tLS0tLS1cblxuICAtIGBwcm9taXNlYCBpcyBhbiBvYmplY3Qgb3IgZnVuY3Rpb24gd2l0aCBhIGB0aGVuYCBtZXRob2Qgd2hvc2UgYmVoYXZpb3IgY29uZm9ybXMgdG8gdGhpcyBzcGVjaWZpY2F0aW9uLlxuICAtIGB0aGVuYWJsZWAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyBhIGB0aGVuYCBtZXRob2QuXG4gIC0gYHZhbHVlYCBpcyBhbnkgbGVnYWwgSmF2YVNjcmlwdCB2YWx1ZSAoaW5jbHVkaW5nIHVuZGVmaW5lZCwgYSB0aGVuYWJsZSwgb3IgYSBwcm9taXNlKS5cbiAgLSBgZXhjZXB0aW9uYCBpcyBhIHZhbHVlIHRoYXQgaXMgdGhyb3duIHVzaW5nIHRoZSB0aHJvdyBzdGF0ZW1lbnQuXG4gIC0gYHJlYXNvbmAgaXMgYSB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aHkgYSBwcm9taXNlIHdhcyByZWplY3RlZC5cbiAgLSBgc2V0dGxlZGAgdGhlIGZpbmFsIHJlc3Rpbmcgc3RhdGUgb2YgYSBwcm9taXNlLCBmdWxmaWxsZWQgb3IgcmVqZWN0ZWQuXG5cbiAgQSBwcm9taXNlIGNhbiBiZSBpbiBvbmUgb2YgdGhyZWUgc3RhdGVzOiBwZW5kaW5nLCBmdWxmaWxsZWQsIG9yIHJlamVjdGVkLlxuXG4gIFByb21pc2VzIHRoYXQgYXJlIGZ1bGZpbGxlZCBoYXZlIGEgZnVsZmlsbG1lbnQgdmFsdWUgYW5kIGFyZSBpbiB0aGUgZnVsZmlsbGVkXG4gIHN0YXRlLiAgUHJvbWlzZXMgdGhhdCBhcmUgcmVqZWN0ZWQgaGF2ZSBhIHJlamVjdGlvbiByZWFzb24gYW5kIGFyZSBpbiB0aGVcbiAgcmVqZWN0ZWQgc3RhdGUuICBBIGZ1bGZpbGxtZW50IHZhbHVlIGlzIG5ldmVyIGEgdGhlbmFibGUuXG5cbiAgUHJvbWlzZXMgY2FuIGFsc28gYmUgc2FpZCB0byAqcmVzb2x2ZSogYSB2YWx1ZS4gIElmIHRoaXMgdmFsdWUgaXMgYWxzbyBhXG4gIHByb21pc2UsIHRoZW4gdGhlIG9yaWdpbmFsIHByb21pc2UncyBzZXR0bGVkIHN0YXRlIHdpbGwgbWF0Y2ggdGhlIHZhbHVlJ3NcbiAgc2V0dGxlZCBzdGF0ZS4gIFNvIGEgcHJvbWlzZSB0aGF0ICpyZXNvbHZlcyogYSBwcm9taXNlIHRoYXQgcmVqZWN0cyB3aWxsXG4gIGl0c2VsZiByZWplY3QsIGFuZCBhIHByb21pc2UgdGhhdCAqcmVzb2x2ZXMqIGEgcHJvbWlzZSB0aGF0IGZ1bGZpbGxzIHdpbGxcbiAgaXRzZWxmIGZ1bGZpbGwuXG5cblxuICBCYXNpYyBVc2FnZTpcbiAgLS0tLS0tLS0tLS0tXG5cbiAgYGBganNcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAvLyBvbiBzdWNjZXNzXG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG5cbiAgICAvLyBvbiBmYWlsdXJlXG4gICAgcmVqZWN0KHJlYXNvbik7XG4gIH0pO1xuXG4gIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgIC8vIG9uIGZ1bGZpbGxtZW50XG4gIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgIC8vIG9uIHJlamVjdGlvblxuICB9KTtcbiAgYGBgXG5cbiAgQWR2YW5jZWQgVXNhZ2U6XG4gIC0tLS0tLS0tLS0tLS0tLVxuXG4gIFByb21pc2VzIHNoaW5lIHdoZW4gYWJzdHJhY3RpbmcgYXdheSBhc3luY2hyb25vdXMgaW50ZXJhY3Rpb25zIHN1Y2ggYXNcbiAgYFhNTEh0dHBSZXF1ZXN0YHMuXG5cbiAgYGBganNcbiAgZnVuY3Rpb24gZ2V0SlNPTih1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gaGFuZGxlcjtcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IHRoaXMuRE9ORSkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdnZXRKU09OOiBgJyArIHVybCArICdgIGZhaWxlZCB3aXRoIHN0YXR1czogWycgKyB0aGlzLnN0YXR1cyArICddJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEpTT04oJy9wb3N0cy5qc29uJykudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgLy8gb24gZnVsZmlsbG1lbnRcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gb24gcmVqZWN0aW9uXG4gIH0pO1xuICBgYGBcblxuICBVbmxpa2UgY2FsbGJhY2tzLCBwcm9taXNlcyBhcmUgZ3JlYXQgY29tcG9zYWJsZSBwcmltaXRpdmVzLlxuXG4gIGBgYGpzXG4gIFByb21pc2UuYWxsKFtcbiAgICBnZXRKU09OKCcvcG9zdHMnKSxcbiAgICBnZXRKU09OKCcvY29tbWVudHMnKVxuICBdKS50aGVuKGZ1bmN0aW9uKHZhbHVlcyl7XG4gICAgdmFsdWVzWzBdIC8vID0+IHBvc3RzSlNPTlxuICAgIHZhbHVlc1sxXSAvLyA9PiBjb21tZW50c0pTT05cblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH0pO1xuICBgYGBcblxuICBAY2xhc3MgUlNWUC5Qcm9taXNlXG4gIEBwYXJhbSB7ZnVuY3Rpb259IHJlc29sdmVyXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGxhYmVsaW5nIHRoZSBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEBjb25zdHJ1Y3RvclxuKi9cbmZ1bmN0aW9uIFByb21pc2UkMShyZXNvbHZlciwgbGFiZWwpIHtcbiAgdGhpcy5faWQgPSBjb3VudGVyKys7XG4gIHRoaXMuX2xhYmVsID0gbGFiZWw7XG4gIHRoaXMuX3N0YXRlID0gdW5kZWZpbmVkO1xuICB0aGlzLl9yZXN1bHQgPSB1bmRlZmluZWQ7XG4gIHRoaXMuX3N1YnNjcmliZXJzID0gW107XG5cbiAgY29uZmlnLmluc3RydW1lbnQgJiYgaW5zdHJ1bWVudCQxKCdjcmVhdGVkJywgdGhpcyk7XG5cbiAgaWYgKG5vb3AgIT09IHJlc29sdmVyKSB7XG4gICAgdHlwZW9mIHJlc29sdmVyICE9PSAnZnVuY3Rpb24nICYmIG5lZWRzUmVzb2x2ZXIoKTtcbiAgICB0aGlzIGluc3RhbmNlb2YgUHJvbWlzZSQxID8gaW5pdGlhbGl6ZVByb21pc2UodGhpcywgcmVzb2x2ZXIpIDogbmVlZHNOZXcoKTtcbiAgfVxufVxuXG5Qcm9taXNlJDEuY2FzdCA9IHJlc29sdmUkMTsgLy8gZGVwcmVjYXRlZFxuUHJvbWlzZSQxLmFsbCA9IGFsbCQxO1xuUHJvbWlzZSQxLnJhY2UgPSByYWNlJDE7XG5Qcm9taXNlJDEucmVzb2x2ZSA9IHJlc29sdmUkMTtcblByb21pc2UkMS5yZWplY3QgPSByZWplY3QkMTtcblxuUHJvbWlzZSQxLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFByb21pc2UkMSxcblxuICBfZ3VpZEtleTogZ3VpZEtleSxcblxuICBfb25FcnJvcjogZnVuY3Rpb24gX29uRXJyb3IocmVhc29uKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuICAgIGNvbmZpZy5hZnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocHJvbWlzZS5fb25FcnJvcikge1xuICAgICAgICBjb25maWdbJ3RyaWdnZXInXSgnZXJyb3InLCByZWFzb24sIHByb21pc2UuX2xhYmVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICBUaGUgcHJpbWFyeSB3YXkgb2YgaW50ZXJhY3Rpbmcgd2l0aCBhIHByb21pc2UgaXMgdGhyb3VnaCBpdHMgYHRoZW5gIG1ldGhvZCxcbiAgICB3aGljaCByZWdpc3RlcnMgY2FsbGJhY2tzIHRvIHJlY2VpdmUgZWl0aGVyIGEgcHJvbWlzZSdzIGV2ZW50dWFsIHZhbHVlIG9yIHRoZVxuICAgIHJlYXNvbiB3aHkgdGhlIHByb21pc2UgY2Fubm90IGJlIGZ1bGZpbGxlZC5cbiAgXG4gICAgYGBganNcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24odXNlcil7XG4gICAgICAvLyB1c2VyIGlzIGF2YWlsYWJsZVxuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAvLyB1c2VyIGlzIHVuYXZhaWxhYmxlLCBhbmQgeW91IGFyZSBnaXZlbiB0aGUgcmVhc29uIHdoeVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBDaGFpbmluZ1xuICAgIC0tLS0tLS0tXG4gIFxuICAgIFRoZSByZXR1cm4gdmFsdWUgb2YgYHRoZW5gIGlzIGl0c2VsZiBhIHByb21pc2UuICBUaGlzIHNlY29uZCwgJ2Rvd25zdHJlYW0nXG4gICAgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZpcnN0IHByb21pc2UncyBmdWxmaWxsbWVudFxuICAgIG9yIHJlamVjdGlvbiBoYW5kbGVyLCBvciByZWplY3RlZCBpZiB0aGUgaGFuZGxlciB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIHVzZXIubmFtZTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICByZXR1cm4gJ2RlZmF1bHQgbmFtZSc7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodXNlck5hbWUpIHtcbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgZnVsZmlsbGVkLCBgdXNlck5hbWVgIHdpbGwgYmUgdGhlIHVzZXIncyBuYW1lLCBvdGhlcndpc2UgaXRcbiAgICAgIC8vIHdpbGwgYmUgYCdkZWZhdWx0IG5hbWUnYFxuICAgIH0pO1xuICBcbiAgICBmaW5kVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRm91bmQgdXNlciwgYnV0IHN0aWxsIHVuaGFwcHknKTtcbiAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlXFwncmUgdW5oYXBweScpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAvLyBuZXZlciByZWFjaGVkXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gaWYgYGZpbmRVc2VyYCBmdWxmaWxsZWQsIGByZWFzb25gIHdpbGwgYmUgJ0ZvdW5kIHVzZXIsIGJ1dCBzdGlsbCB1bmhhcHB5Jy5cbiAgICAgIC8vIElmIGBmaW5kVXNlcmAgcmVqZWN0ZWQsIGByZWFzb25gIHdpbGwgYmUgJ2BmaW5kVXNlcmAgcmVqZWN0ZWQgYW5kIHdlXFwncmUgdW5oYXBweScuXG4gICAgfSk7XG4gICAgYGBgXG4gICAgSWYgdGhlIGRvd25zdHJlYW0gcHJvbWlzZSBkb2VzIG5vdCBzcGVjaWZ5IGEgcmVqZWN0aW9uIGhhbmRsZXIsIHJlamVjdGlvbiByZWFzb25zIHdpbGwgYmUgcHJvcGFnYXRlZCBmdXJ0aGVyIGRvd25zdHJlYW0uXG4gIFxuICAgIGBgYGpzXG4gICAgZmluZFVzZXIoKS50aGVuKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgUGVkYWdvZ2ljYWxFeGNlcHRpb24oJ1Vwc3RyZWFtIGVycm9yJyk7XG4gICAgfSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIC8vIG5ldmVyIHJlYWNoZWRcbiAgICB9KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgLy8gbmV2ZXIgcmVhY2hlZFxuICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgIC8vIFRoZSBgUGVkZ2Fnb2NpYWxFeGNlcHRpb25gIGlzIHByb3BhZ2F0ZWQgYWxsIHRoZSB3YXkgZG93biB0byBoZXJlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEFzc2ltaWxhdGlvblxuICAgIC0tLS0tLS0tLS0tLVxuICBcbiAgICBTb21ldGltZXMgdGhlIHZhbHVlIHlvdSB3YW50IHRvIHByb3BhZ2F0ZSB0byBhIGRvd25zdHJlYW0gcHJvbWlzZSBjYW4gb25seSBiZVxuICAgIHJldHJpZXZlZCBhc3luY2hyb25vdXNseS4gVGhpcyBjYW4gYmUgYWNoaWV2ZWQgYnkgcmV0dXJuaW5nIGEgcHJvbWlzZSBpbiB0aGVcbiAgICBmdWxmaWxsbWVudCBvciByZWplY3Rpb24gaGFuZGxlci4gVGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIHRoZW4gYmUgcGVuZGluZ1xuICAgIHVudGlsIHRoZSByZXR1cm5lZCBwcm9taXNlIGlzIHNldHRsZWQuIFRoaXMgaXMgY2FsbGVkICphc3NpbWlsYXRpb24qLlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAvLyBUaGUgdXNlcidzIGNvbW1lbnRzIGFyZSBub3cgYXZhaWxhYmxlXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIElmIHRoZSBhc3NpbWxpYXRlZCBwcm9taXNlIHJlamVjdHMsIHRoZW4gdGhlIGRvd25zdHJlYW0gcHJvbWlzZSB3aWxsIGFsc28gcmVqZWN0LlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRVc2VyKCkudGhlbihmdW5jdGlvbiAodXNlcikge1xuICAgICAgcmV0dXJuIGZpbmRDb21tZW50c0J5QXV0aG9yKHVzZXIpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKGNvbW1lbnRzKSB7XG4gICAgICAvLyBJZiBgZmluZENvbW1lbnRzQnlBdXRob3JgIGZ1bGZpbGxzLCB3ZSdsbCBoYXZlIHRoZSB2YWx1ZSBoZXJlXG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgLy8gSWYgYGZpbmRDb21tZW50c0J5QXV0aG9yYCByZWplY3RzLCB3ZSdsbCBoYXZlIHRoZSByZWFzb24gaGVyZVxuICAgIH0pO1xuICAgIGBgYFxuICBcbiAgICBTaW1wbGUgRXhhbXBsZVxuICAgIC0tLS0tLS0tLS0tLS0tXG4gIFxuICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGxldCByZXN1bHQ7XG4gIFxuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBmaW5kUmVzdWx0KCk7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfSBjYXRjaChyZWFzb24pIHtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9XG4gICAgYGBgXG4gIFxuICAgIEVycmJhY2sgRXhhbXBsZVxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRSZXN1bHQoZnVuY3Rpb24ocmVzdWx0LCBlcnIpe1xuICAgICAgaWYgKGVycikge1xuICAgICAgICAvLyBmYWlsdXJlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzdWNjZXNzXG4gICAgICB9XG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIFByb21pc2UgRXhhbXBsZTtcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGZpbmRSZXN1bHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAvLyBzdWNjZXNzXG4gICAgfSwgZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIGZhaWx1cmVcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQWR2YW5jZWQgRXhhbXBsZVxuICAgIC0tLS0tLS0tLS0tLS0tXG4gIFxuICAgIFN5bmNocm9ub3VzIEV4YW1wbGVcbiAgXG4gICAgYGBgamF2YXNjcmlwdFxuICAgIGxldCBhdXRob3IsIGJvb2tzO1xuICBcbiAgICB0cnkge1xuICAgICAgYXV0aG9yID0gZmluZEF1dGhvcigpO1xuICAgICAgYm9va3MgID0gZmluZEJvb2tzQnlBdXRob3IoYXV0aG9yKTtcbiAgICAgIC8vIHN1Y2Nlc3NcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gZmFpbHVyZVxuICAgIH1cbiAgICBgYGBcbiAgXG4gICAgRXJyYmFjayBFeGFtcGxlXG4gIFxuICAgIGBgYGpzXG4gIFxuICAgIGZ1bmN0aW9uIGZvdW5kQm9va3MoYm9va3MpIHtcbiAgXG4gICAgfVxuICBcbiAgICBmdW5jdGlvbiBmYWlsdXJlKHJlYXNvbikge1xuICBcbiAgICB9XG4gIFxuICAgIGZpbmRBdXRob3IoZnVuY3Rpb24oYXV0aG9yLCBlcnIpe1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgIC8vIGZhaWx1cmVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZmluZEJvb29rc0J5QXV0aG9yKGF1dGhvciwgZnVuY3Rpb24oYm9va3MsIGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICBmYWlsdXJlKGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvdW5kQm9va3MoYm9va3MpO1xuICAgICAgICAgICAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGZhaWx1cmUocmVhc29uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgZmFpbHVyZShlcnIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN1Y2Nlc3NcbiAgICAgIH1cbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgUHJvbWlzZSBFeGFtcGxlO1xuICBcbiAgICBgYGBqYXZhc2NyaXB0XG4gICAgZmluZEF1dGhvcigpLlxuICAgICAgdGhlbihmaW5kQm9va3NCeUF1dGhvcikuXG4gICAgICB0aGVuKGZ1bmN0aW9uKGJvb2tzKXtcbiAgICAgICAgLy8gZm91bmQgYm9va3NcbiAgICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQG1ldGhvZCB0aGVuXG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gb25GdWxmaWxsbWVudFxuICAgIEBwYXJhbSB7RnVuY3Rpb259IG9uUmVqZWN0aW9uXG4gICAgQHBhcmFtIHtTdHJpbmd9IGxhYmVsIG9wdGlvbmFsIHN0cmluZyBmb3IgbGFiZWxpbmcgdGhlIHByb21pc2UuXG4gICAgVXNlZnVsIGZvciB0b29saW5nLlxuICAgIEByZXR1cm4ge1Byb21pc2V9XG4gICovXG4gIHRoZW46IHRoZW4sXG5cbiAgLyoqXG4gICAgYGNhdGNoYCBpcyBzaW1wbHkgc3VnYXIgZm9yIGB0aGVuKHVuZGVmaW5lZCwgb25SZWplY3Rpb24pYCB3aGljaCBtYWtlcyBpdCB0aGUgc2FtZVxuICAgIGFzIHRoZSBjYXRjaCBibG9jayBvZiBhIHRyeS9jYXRjaCBzdGF0ZW1lbnQuXG4gIFxuICAgIGBgYGpzXG4gICAgZnVuY3Rpb24gZmluZEF1dGhvcigpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZG5cXCd0IGZpbmQgdGhhdCBhdXRob3InKTtcbiAgICB9XG4gIFxuICAgIC8vIHN5bmNocm9ub3VzXG4gICAgdHJ5IHtcbiAgICAgIGZpbmRBdXRob3IoKTtcbiAgICB9IGNhdGNoKHJlYXNvbikge1xuICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICB9XG4gIFxuICAgIC8vIGFzeW5jIHdpdGggcHJvbWlzZXNcbiAgICBmaW5kQXV0aG9yKCkuY2F0Y2goZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgIC8vIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgfSk7XG4gICAgYGBgXG4gIFxuICAgIEBtZXRob2QgY2F0Y2hcbiAgICBAcGFyYW0ge0Z1bmN0aW9ufSBvblJlamVjdGlvblxuICAgIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBvcHRpb25hbCBzdHJpbmcgZm9yIGxhYmVsaW5nIHRoZSBwcm9taXNlLlxuICAgIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgICBAcmV0dXJuIHtQcm9taXNlfVxuICAqL1xuICAnY2F0Y2gnOiBmdW5jdGlvbiBfY2F0Y2gob25SZWplY3Rpb24sIGxhYmVsKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0aW9uLCBsYWJlbCk7XG4gIH0sXG5cbiAgLyoqXG4gICAgYGZpbmFsbHlgIHdpbGwgYmUgaW52b2tlZCByZWdhcmRsZXNzIG9mIHRoZSBwcm9taXNlJ3MgZmF0ZSBqdXN0IGFzIG5hdGl2ZVxuICAgIHRyeS9jYXRjaC9maW5hbGx5IGJlaGF2ZXNcbiAgXG4gICAgU3luY2hyb25vdXMgZXhhbXBsZTpcbiAgXG4gICAgYGBganNcbiAgICBmaW5kQXV0aG9yKCkge1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEF1dGhvcigpO1xuICAgIH1cbiAgXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmaW5kQXV0aG9yKCk7IC8vIHN1Y2NlZWQgb3IgZmFpbFxuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgIHJldHVybiBmaW5kT3RoZXJBdXRob3IoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgLy8gYWx3YXlzIHJ1bnNcbiAgICAgIC8vIGRvZXNuJ3QgYWZmZWN0IHRoZSByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgYGBgXG4gIFxuICAgIEFzeW5jaHJvbm91cyBleGFtcGxlOlxuICBcbiAgICBgYGBqc1xuICAgIGZpbmRBdXRob3IoKS5jYXRjaChmdW5jdGlvbihyZWFzb24pe1xuICAgICAgcmV0dXJuIGZpbmRPdGhlckF1dGhvcigpO1xuICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24oKXtcbiAgICAgIC8vIGF1dGhvciB3YXMgZWl0aGVyIGZvdW5kLCBvciBub3RcbiAgICB9KTtcbiAgICBgYGBcbiAgXG4gICAgQG1ldGhvZCBmaW5hbGx5XG4gICAgQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIGZvciBsYWJlbGluZyB0aGUgcHJvbWlzZS5cbiAgICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gICAgQHJldHVybiB7UHJvbWlzZX1cbiAgKi9cbiAgJ2ZpbmFsbHknOiBmdW5jdGlvbiBfZmluYWxseShjYWxsYmFjaywgbGFiZWwpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gcHJvbWlzZS5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSk7XG4gICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IHJlYXNvbjtcbiAgICAgIH0pO1xuICAgIH0sIGxhYmVsKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gUmVzdWx0KCkge1xuICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xufVxuXG52YXIgRVJST1IgPSBuZXcgUmVzdWx0KCk7XG52YXIgR0VUX1RIRU5fRVJST1IkMSA9IG5ldyBSZXN1bHQoKTtcblxuZnVuY3Rpb24gZ2V0VGhlbiQxKG9iaikge1xuICB0cnkge1xuICAgIHJldHVybiBvYmoudGhlbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBFUlJPUi52YWx1ZSA9IGVycm9yO1xuICAgIHJldHVybiBFUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cnlBcHBseShmLCBzLCBhKSB7XG4gIHRyeSB7XG4gICAgZi5hcHBseShzLCBhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBFUlJPUi52YWx1ZSA9IGVycm9yO1xuICAgIHJldHVybiBFUlJPUjtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYWtlT2JqZWN0KF8sIGFyZ3VtZW50TmFtZXMpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgbGVuZ3RoID0gXy5sZW5ndGg7XG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGxlbmd0aCk7XG5cbiAgZm9yICh2YXIgeCA9IDA7IHggPCBsZW5ndGg7IHgrKykge1xuICAgIGFyZ3NbeF0gPSBfW3hdO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIF9uYW1lID0gYXJndW1lbnROYW1lc1tpXTtcbiAgICBvYmpbX25hbWVdID0gYXJnc1tpICsgMV07XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBhcnJheVJlc3VsdChfKSB7XG4gIHZhciBsZW5ndGggPSBfLmxlbmd0aDtcbiAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobGVuZ3RoIC0gMSk7XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFyZ3NbaSAtIDFdID0gX1tpXTtcbiAgfVxuXG4gIHJldHVybiBhcmdzO1xufVxuXG5mdW5jdGlvbiB3cmFwVGhlbmFibGUoX3RoZW4sIHByb21pc2UpIHtcbiAgcmV0dXJuIHtcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsRmlsbG1lbnQsIG9uUmVqZWN0aW9uKSB7XG4gICAgICByZXR1cm4gX3RoZW4uY2FsbChwcm9taXNlLCBvbkZ1bEZpbGxtZW50LCBvblJlamVjdGlvbik7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAgYFJTVlAuZGVub2RlaWZ5YCB0YWtlcyBhICdub2RlLXN0eWxlJyBmdW5jdGlvbiBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXRcbiAgd2lsbCByZXR1cm4gYW4gYFJTVlAuUHJvbWlzZWAuIFlvdSBjYW4gdXNlIGBkZW5vZGVpZnlgIGluIE5vZGUuanMgb3IgdGhlXG4gIGJyb3dzZXIgd2hlbiB5b3UnZCBwcmVmZXIgdG8gdXNlIHByb21pc2VzIG92ZXIgdXNpbmcgY2FsbGJhY2tzLiBGb3IgZXhhbXBsZSxcbiAgYGRlbm9kZWlmeWAgdHJhbnNmb3JtcyB0aGUgZm9sbG93aW5nOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuICBmcy5yZWFkRmlsZSgnbXlmaWxlLnR4dCcsIGZ1bmN0aW9uKGVyciwgZGF0YSl7XG4gICAgaWYgKGVycikgcmV0dXJuIGhhbmRsZUVycm9yKGVycik7XG4gICAgaGFuZGxlRGF0YShkYXRhKTtcbiAgfSk7XG4gIGBgYFxuXG4gIGludG86XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgZnMgPSByZXF1aXJlKCdmcycpO1xuICBsZXQgcmVhZEZpbGUgPSBSU1ZQLmRlbm9kZWlmeShmcy5yZWFkRmlsZSk7XG5cbiAgcmVhZEZpbGUoJ215ZmlsZS50eHQnKS50aGVuKGhhbmRsZURhdGEsIGhhbmRsZUVycm9yKTtcbiAgYGBgXG5cbiAgSWYgdGhlIG5vZGUgZnVuY3Rpb24gaGFzIG11bHRpcGxlIHN1Y2Nlc3MgcGFyYW1ldGVycywgdGhlbiBgZGVub2RlaWZ5YFxuICBqdXN0IHJldHVybnMgdGhlIGZpcnN0IG9uZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCByZXF1ZXN0ID0gUlNWUC5kZW5vZGVpZnkocmVxdWlyZSgncmVxdWVzdCcpKTtcblxuICByZXF1ZXN0KCdodHRwOi8vZXhhbXBsZS5jb20nKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgIC8vIC4uLlxuICB9KTtcbiAgYGBgXG5cbiAgSG93ZXZlciwgaWYgeW91IG5lZWQgYWxsIHN1Y2Nlc3MgcGFyYW1ldGVycywgc2V0dGluZyBgZGVub2RlaWZ5YCdzXG4gIHNlY29uZCBwYXJhbWV0ZXIgdG8gYHRydWVgIGNhdXNlcyBpdCB0byByZXR1cm4gYWxsIHN1Y2Nlc3MgcGFyYW1ldGVyc1xuICBhcyBhbiBhcnJheTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCByZXF1ZXN0ID0gUlNWUC5kZW5vZGVpZnkocmVxdWlyZSgncmVxdWVzdCcpLCB0cnVlKTtcblxuICByZXF1ZXN0KCdodHRwOi8vZXhhbXBsZS5jb20nKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgIC8vIHJlc3VsdFswXSAtPiByZXNcbiAgICAvLyByZXN1bHRbMV0gLT4gYm9keVxuICB9KTtcbiAgYGBgXG5cbiAgT3IgaWYgeW91IHBhc3MgaXQgYW4gYXJyYXkgd2l0aCBuYW1lcyBpdCByZXR1cm5zIHRoZSBwYXJhbWV0ZXJzIGFzIGEgaGFzaDpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCByZXF1ZXN0ID0gUlNWUC5kZW5vZGVpZnkocmVxdWlyZSgncmVxdWVzdCcpLCBbJ3JlcycsICdib2R5J10pO1xuXG4gIHJlcXVlc3QoJ2h0dHA6Ly9leGFtcGxlLmNvbScpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgLy8gcmVzdWx0LnJlc1xuICAgIC8vIHJlc3VsdC5ib2R5XG4gIH0pO1xuICBgYGBcblxuICBTb21ldGltZXMgeW91IG5lZWQgdG8gcmV0YWluIHRoZSBgdGhpc2A6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgYXBwID0gcmVxdWlyZSgnZXhwcmVzcycpKCk7XG4gIGxldCByZW5kZXIgPSBSU1ZQLmRlbm9kZWlmeShhcHAucmVuZGVyLmJpbmQoYXBwKSk7XG4gIGBgYFxuXG4gIFRoZSBkZW5vZGlmaWVkIGZ1bmN0aW9uIGluaGVyaXRzIGZyb20gdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLiBJdCB3b3JrcyBpbiBhbGxcbiAgZW52aXJvbm1lbnRzLCBleGNlcHQgSUUgMTAgYW5kIGJlbG93LiBDb25zZXF1ZW50bHkgYWxsIHByb3BlcnRpZXMgb2YgdGhlIG9yaWdpbmFsXG4gIGZ1bmN0aW9uIGFyZSBhdmFpbGFibGUgdG8geW91LiBIb3dldmVyLCBhbnkgcHJvcGVydGllcyB5b3UgY2hhbmdlIG9uIHRoZVxuICBkZW5vZGVpZmllZCBmdW5jdGlvbiB3b24ndCBiZSBjaGFuZ2VkIG9uIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi4gRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCByZXF1ZXN0ID0gUlNWUC5kZW5vZGVpZnkocmVxdWlyZSgncmVxdWVzdCcpKSxcbiAgICAgIGNvb2tpZUphciA9IHJlcXVlc3QuamFyKCk7IC8vIDwtIEluaGVyaXRhbmNlIGlzIHVzZWQgaGVyZVxuXG4gIHJlcXVlc3QoJ2h0dHA6Ly9leGFtcGxlLmNvbScsIHtqYXI6IGNvb2tpZUphcn0pLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgLy8gY29va2llSmFyLmNvb2tpZXMgaG9sZHMgbm93IHRoZSBjb29raWVzIHJldHVybmVkIGJ5IGV4YW1wbGUuY29tXG4gIH0pO1xuICBgYGBcblxuICBVc2luZyBgZGVub2RlaWZ5YCBtYWtlcyBpdCBlYXNpZXIgdG8gY29tcG9zZSBhc3luY2hyb25vdXMgb3BlcmF0aW9ucyBpbnN0ZWFkXG4gIG9mIHVzaW5nIGNhbGxiYWNrcy4gRm9yIGV4YW1wbGUsIGluc3RlYWQgb2Y6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgZnMgPSByZXF1aXJlKCdmcycpO1xuXG4gIGZzLnJlYWRGaWxlKCdteWZpbGUudHh0JywgZnVuY3Rpb24oZXJyLCBkYXRhKXtcbiAgICBpZiAoZXJyKSB7IC4uLiB9IC8vIEhhbmRsZSBlcnJvclxuICAgIGZzLndyaXRlRmlsZSgnbXlmaWxlMi50eHQnLCBkYXRhLCBmdW5jdGlvbihlcnIpe1xuICAgICAgaWYgKGVycikgeyAuLi4gfSAvLyBIYW5kbGUgZXJyb3JcbiAgICAgIGNvbnNvbGUubG9nKCdkb25lJylcbiAgICB9KTtcbiAgfSk7XG4gIGBgYFxuXG4gIHlvdSBjYW4gY2hhaW4gdGhlIG9wZXJhdGlvbnMgdG9nZXRoZXIgdXNpbmcgYHRoZW5gIGZyb20gdGhlIHJldHVybmVkIHByb21pc2U6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgZnMgPSByZXF1aXJlKCdmcycpO1xuICBsZXQgcmVhZEZpbGUgPSBSU1ZQLmRlbm9kZWlmeShmcy5yZWFkRmlsZSk7XG4gIGxldCB3cml0ZUZpbGUgPSBSU1ZQLmRlbm9kZWlmeShmcy53cml0ZUZpbGUpO1xuXG4gIHJlYWRGaWxlKCdteWZpbGUudHh0JykudGhlbihmdW5jdGlvbihkYXRhKXtcbiAgICByZXR1cm4gd3JpdGVGaWxlKCdteWZpbGUyLnR4dCcsIGRhdGEpO1xuICB9KS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgY29uc29sZS5sb2coJ2RvbmUnKVxuICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgLy8gSGFuZGxlIGVycm9yXG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIGRlbm9kZWlmeVxuICBAc3RhdGljXG4gIEBmb3IgUlNWUFxuICBAcGFyYW0ge0Z1bmN0aW9ufSBub2RlRnVuYyBhICdub2RlLXN0eWxlJyBmdW5jdGlvbiB0aGF0IHRha2VzIGEgY2FsbGJhY2sgYXNcbiAgaXRzIGxhc3QgYXJndW1lbnQuIFRoZSBjYWxsYmFjayBleHBlY3RzIGFuIGVycm9yIHRvIGJlIHBhc3NlZCBhcyBpdHMgZmlyc3RcbiAgYXJndW1lbnQgKGlmIGFuIGVycm9yIG9jY3VycmVkLCBvdGhlcndpc2UgbnVsbCksIGFuZCB0aGUgdmFsdWUgZnJvbSB0aGVcbiAgb3BlcmF0aW9uIGFzIGl0cyBzZWNvbmQgYXJndW1lbnQgKCdmdW5jdGlvbihlcnIsIHZhbHVlKXsgfScpLlxuICBAcGFyYW0ge0Jvb2xlYW58QXJyYXl9IFtvcHRpb25zXSBBbiBvcHRpb25hbCBwYXJhbXRlciB0aGF0IGlmIHNldFxuICB0byBgdHJ1ZWAgY2F1c2VzIHRoZSBwcm9taXNlIHRvIGZ1bGZpbGwgd2l0aCB0aGUgY2FsbGJhY2sncyBzdWNjZXNzIGFyZ3VtZW50c1xuICBhcyBhbiBhcnJheS4gVGhpcyBpcyB1c2VmdWwgaWYgdGhlIG5vZGUgZnVuY3Rpb24gaGFzIG11bHRpcGxlIHN1Y2Nlc3NcbiAgcGFyYW10ZXJzLiBJZiB5b3Ugc2V0IHRoaXMgcGFyYW10ZXIgdG8gYW4gYXJyYXkgd2l0aCBuYW1lcywgdGhlIHByb21pc2Ugd2lsbFxuICBmdWxmaWxsIHdpdGggYSBoYXNoIHdpdGggdGhlc2UgbmFtZXMgYXMga2V5cyBhbmQgdGhlIHN1Y2Nlc3MgcGFyYW1ldGVycyBhc1xuICB2YWx1ZXMuXG4gIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uIHRoYXQgd3JhcHMgYG5vZGVGdW5jYCB0byByZXR1cm4gYW5cbiAgYFJTVlAuUHJvbWlzZWBcbiAgQHN0YXRpY1xuKi9cbmZ1bmN0aW9uIGRlbm9kZWlmeSQxKG5vZGVGdW5jLCBvcHRpb25zKSB7XG4gIHZhciBmbiA9IGZ1bmN0aW9uIGZuKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobCArIDEpO1xuICAgIHZhciBwcm9taXNlSW5wdXQgPSBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBpZiAoIXByb21pc2VJbnB1dCkge1xuICAgICAgICAvLyBUT0RPOiBjbGVhbiB0aGlzIHVwXG4gICAgICAgIHByb21pc2VJbnB1dCA9IG5lZWRzUHJvbWlzZUlucHV0KGFyZyk7XG4gICAgICAgIGlmIChwcm9taXNlSW5wdXQgPT09IEdFVF9USEVOX0VSUk9SJDEpIHtcbiAgICAgICAgICB2YXIgcCA9IG5ldyBQcm9taXNlJDEobm9vcCk7XG4gICAgICAgICAgcmVqZWN0KHAsIEdFVF9USEVOX0VSUk9SJDEudmFsdWUpO1xuICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9IGVsc2UgaWYgKHByb21pc2VJbnB1dCAmJiBwcm9taXNlSW5wdXQgIT09IHRydWUpIHtcbiAgICAgICAgICBhcmcgPSB3cmFwVGhlbmFibGUocHJvbWlzZUlucHV0LCBhcmcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhcmdzW2ldID0gYXJnO1xuICAgIH1cblxuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UkMShub29wKTtcblxuICAgIGFyZ3NbbF0gPSBmdW5jdGlvbiAoZXJyLCB2YWwpIHtcbiAgICAgIGlmIChlcnIpIHJlamVjdChwcm9taXNlLCBlcnIpO2Vsc2UgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkgcmVzb2x2ZShwcm9taXNlLCB2YWwpO2Vsc2UgaWYgKG9wdGlvbnMgPT09IHRydWUpIHJlc29sdmUocHJvbWlzZSwgYXJyYXlSZXN1bHQoYXJndW1lbnRzKSk7ZWxzZSBpZiAoaXNBcnJheShvcHRpb25zKSkgcmVzb2x2ZShwcm9taXNlLCBtYWtlT2JqZWN0KGFyZ3VtZW50cywgb3B0aW9ucykpO2Vsc2UgcmVzb2x2ZShwcm9taXNlLCB2YWwpO1xuICAgIH07XG5cbiAgICBpZiAocHJvbWlzZUlucHV0KSB7XG4gICAgICByZXR1cm4gaGFuZGxlUHJvbWlzZUlucHV0KHByb21pc2UsIGFyZ3MsIG5vZGVGdW5jLCBzZWxmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGhhbmRsZVZhbHVlSW5wdXQocHJvbWlzZSwgYXJncywgbm9kZUZ1bmMsIHNlbGYpO1xuICAgIH1cbiAgfTtcblxuICBmbi5fX3Byb3RvX18gPSBub2RlRnVuYztcblxuICByZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVZhbHVlSW5wdXQocHJvbWlzZSwgYXJncywgbm9kZUZ1bmMsIHNlbGYpIHtcbiAgdmFyIHJlc3VsdCA9IHRyeUFwcGx5KG5vZGVGdW5jLCBzZWxmLCBhcmdzKTtcbiAgaWYgKHJlc3VsdCA9PT0gRVJST1IpIHtcbiAgICByZWplY3QocHJvbWlzZSwgcmVzdWx0LnZhbHVlKTtcbiAgfVxuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUHJvbWlzZUlucHV0KHByb21pc2UsIGFyZ3MsIG5vZGVGdW5jLCBzZWxmKSB7XG4gIHJldHVybiBQcm9taXNlJDEuYWxsKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICB2YXIgcmVzdWx0ID0gdHJ5QXBwbHkobm9kZUZ1bmMsIHNlbGYsIGFyZ3MpO1xuICAgIGlmIChyZXN1bHQgPT09IEVSUk9SKSB7XG4gICAgICByZWplY3QocHJvbWlzZSwgcmVzdWx0LnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBuZWVkc1Byb21pc2VJbnB1dChhcmcpIHtcbiAgaWYgKGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChhcmcuY29uc3RydWN0b3IgPT09IFByb21pc2UkMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRUaGVuJDEoYXJnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICBUaGlzIGlzIGEgY29udmVuaWVudCBhbGlhcyBmb3IgYFJTVlAuUHJvbWlzZS5hbGxgLlxuXG4gIEBtZXRob2QgYWxsXG4gIEBzdGF0aWNcbiAgQGZvciBSU1ZQXG4gIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFycmF5IG9mIHByb21pc2VzLlxuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgQW4gb3B0aW9uYWwgbGFiZWwuIFRoaXMgaXMgdXNlZnVsXG4gIGZvciB0b29saW5nLlxuKi9cbmZ1bmN0aW9uIGFsbCQzKGFycmF5LCBsYWJlbCkge1xuICByZXR1cm4gUHJvbWlzZSQxLmFsbChhcnJheSwgbGFiZWwpO1xufVxuXG5mdW5jdGlvbiBBbGxTZXR0bGVkKENvbnN0cnVjdG9yLCBlbnRyaWVzLCBsYWJlbCkge1xuICB0aGlzLl9zdXBlckNvbnN0cnVjdG9yKENvbnN0cnVjdG9yLCBlbnRyaWVzLCBmYWxzZSwgLyogZG9uJ3QgYWJvcnQgb24gcmVqZWN0ICovbGFiZWwpO1xufVxuXG5BbGxTZXR0bGVkLnByb3RvdHlwZSA9IG9fY3JlYXRlKEVudW1lcmF0b3IucHJvdG90eXBlKTtcbkFsbFNldHRsZWQucHJvdG90eXBlLl9zdXBlckNvbnN0cnVjdG9yID0gRW51bWVyYXRvcjtcbkFsbFNldHRsZWQucHJvdG90eXBlLl9tYWtlUmVzdWx0ID0gbWFrZVNldHRsZWRSZXN1bHQ7XG5BbGxTZXR0bGVkLnByb3RvdHlwZS5fdmFsaWRhdGlvbkVycm9yID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IEVycm9yKCdhbGxTZXR0bGVkIG11c3QgYmUgY2FsbGVkIHdpdGggYW4gYXJyYXknKTtcbn07XG5cbi8qKlxuICBgUlNWUC5hbGxTZXR0bGVkYCBpcyBzaW1pbGFyIHRvIGBSU1ZQLmFsbGAsIGJ1dCBpbnN0ZWFkIG9mIGltcGxlbWVudGluZ1xuICBhIGZhaWwtZmFzdCBtZXRob2QsIGl0IHdhaXRzIHVudGlsIGFsbCB0aGUgcHJvbWlzZXMgaGF2ZSByZXR1cm5lZCBhbmRcbiAgc2hvd3MgeW91IGFsbCB0aGUgcmVzdWx0cy4gVGhpcyBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gaGFuZGxlIG11bHRpcGxlXG4gIHByb21pc2VzJyBmYWlsdXJlIHN0YXRlcyB0b2dldGhlciBhcyBhIHNldC5cblxuICBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aGVuIGFsbCB0aGUgZ2l2ZW4gcHJvbWlzZXMgaGF2ZSBiZWVuXG4gIHNldHRsZWQuIFRoZSByZXR1cm4gcHJvbWlzZSBpcyBmdWxmaWxsZWQgd2l0aCBhbiBhcnJheSBvZiB0aGUgc3RhdGVzIG9mXG4gIHRoZSBwcm9taXNlcyBwYXNzZWQgaW50byB0aGUgYHByb21pc2VzYCBhcnJheSBhcmd1bWVudC5cblxuICBFYWNoIHN0YXRlIG9iamVjdCB3aWxsIGVpdGhlciBpbmRpY2F0ZSBmdWxmaWxsbWVudCBvciByZWplY3Rpb24sIGFuZFxuICBwcm92aWRlIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIG9yIHJlYXNvbi4gVGhlIHN0YXRlcyB3aWxsIHRha2Ugb25lIG9mXG4gIHRoZSBmb2xsb3dpbmcgZm9ybWF0czpcblxuICBgYGBqYXZhc2NyaXB0XG4gIHsgc3RhdGU6ICdmdWxmaWxsZWQnLCB2YWx1ZTogdmFsdWUgfVxuICAgIG9yXG4gIHsgc3RhdGU6ICdyZWplY3RlZCcsIHJlYXNvbjogcmVhc29uIH1cbiAgYGBgXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IFJTVlAuUHJvbWlzZS5yZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSBSU1ZQLlByb21pc2UucmVqZWN0KG5ldyBFcnJvcignMicpKTtcbiAgbGV0IHByb21pc2UzID0gUlNWUC5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJzMnKSk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIFJTVlAuYWxsU2V0dGxlZChwcm9taXNlcykudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gYXJyYXkgPT0gW1xuICAgIC8vICAgeyBzdGF0ZTogJ2Z1bGZpbGxlZCcsIHZhbHVlOiAxIH0sXG4gICAgLy8gICB7IHN0YXRlOiAncmVqZWN0ZWQnLCByZWFzb246IEVycm9yIH0sXG4gICAgLy8gICB7IHN0YXRlOiAncmVqZWN0ZWQnLCByZWFzb246IEVycm9yIH1cbiAgICAvLyBdXG4gICAgLy8gTm90ZSB0aGF0IGZvciB0aGUgc2Vjb25kIGl0ZW0sIHJlYXNvbi5tZXNzYWdlIHdpbGwgYmUgJzInLCBhbmQgZm9yIHRoZVxuICAgIC8vIHRoaXJkIGl0ZW0sIHJlYXNvbi5tZXNzYWdlIHdpbGwgYmUgJzMnLlxuICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgIC8vIE5vdCBydW4uIChUaGlzIGJsb2NrIHdvdWxkIG9ubHkgYmUgY2FsbGVkIGlmIGFsbFNldHRsZWQgaGFkIGZhaWxlZCxcbiAgICAvLyBmb3IgaW5zdGFuY2UgaWYgcGFzc2VkIGFuIGluY29ycmVjdCBhcmd1bWVudCB0eXBlLilcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgYWxsU2V0dGxlZFxuICBAc3RhdGljXG4gIEBmb3IgUlNWUFxuICBAcGFyYW0ge0FycmF5fSBlbnRyaWVzXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCAtIG9wdGlvbmFsIHN0cmluZyB0aGF0IGRlc2NyaWJlcyB0aGUgcHJvbWlzZS5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYW4gYXJyYXkgb2YgdGhlIHNldHRsZWRcbiAgc3RhdGVzIG9mIHRoZSBjb25zdGl0dWVudCBwcm9taXNlcy5cbiovXG5mdW5jdGlvbiBhbGxTZXR0bGVkJDEoZW50cmllcywgbGFiZWwpIHtcbiAgcmV0dXJuIG5ldyBBbGxTZXR0bGVkKFByb21pc2UkMSwgZW50cmllcywgbGFiZWwpLnByb21pc2U7XG59XG5cbi8qKlxuICBUaGlzIGlzIGEgY29udmVuaWVudCBhbGlhcyBmb3IgYFJTVlAuUHJvbWlzZS5yYWNlYC5cblxuICBAbWV0aG9kIHJhY2VcbiAgQHN0YXRpY1xuICBAZm9yIFJTVlBcbiAgQHBhcmFtIHtBcnJheX0gYXJyYXkgQXJyYXkgb2YgcHJvbWlzZXMuXG4gIEBwYXJhbSB7U3RyaW5nfSBsYWJlbCBBbiBvcHRpb25hbCBsYWJlbC4gVGhpcyBpcyB1c2VmdWxcbiAgZm9yIHRvb2xpbmcuXG4gKi9cbmZ1bmN0aW9uIHJhY2UkMyhhcnJheSwgbGFiZWwpIHtcbiAgcmV0dXJuIFByb21pc2UkMS5yYWNlKGFycmF5LCBsYWJlbCk7XG59XG5cbmZ1bmN0aW9uIFByb21pc2VIYXNoKENvbnN0cnVjdG9yLCBvYmplY3QsIGxhYmVsKSB7XG4gIHRoaXMuX3N1cGVyQ29uc3RydWN0b3IoQ29uc3RydWN0b3IsIG9iamVjdCwgdHJ1ZSwgbGFiZWwpO1xufVxuXG5Qcm9taXNlSGFzaC5wcm90b3R5cGUgPSBvX2NyZWF0ZShFbnVtZXJhdG9yLnByb3RvdHlwZSk7XG5Qcm9taXNlSGFzaC5wcm90b3R5cGUuX3N1cGVyQ29uc3RydWN0b3IgPSBFbnVtZXJhdG9yO1xuUHJvbWlzZUhhc2gucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9yZXN1bHQgPSB7fTtcbn07XG5cblByb21pc2VIYXNoLnByb3RvdHlwZS5fdmFsaWRhdGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICByZXR1cm4gaW5wdXQgJiYgdHlwZW9mIGlucHV0ID09PSAnb2JqZWN0Jztcbn07XG5cblByb21pc2VIYXNoLnByb3RvdHlwZS5fdmFsaWRhdGlvbkVycm9yID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IEVycm9yKCdQcm9taXNlLmhhc2ggbXVzdCBiZSBjYWxsZWQgd2l0aCBhbiBvYmplY3QnKTtcbn07XG5cblByb21pc2VIYXNoLnByb3RvdHlwZS5fZW51bWVyYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZW51bWVyYXRvciA9IHRoaXM7XG4gIHZhciBwcm9taXNlID0gZW51bWVyYXRvci5wcm9taXNlO1xuICB2YXIgaW5wdXQgPSBlbnVtZXJhdG9yLl9pbnB1dDtcbiAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gaW5wdXQpIHtcbiAgICBpZiAocHJvbWlzZS5fc3RhdGUgPT09IFBFTkRJTkcgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGlucHV0LCBrZXkpKSB7XG4gICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICBwb3NpdGlvbjoga2V5LFxuICAgICAgICBlbnRyeTogaW5wdXRba2V5XVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdHMubGVuZ3RoO1xuICBlbnVtZXJhdG9yLl9yZW1haW5pbmcgPSBsZW5ndGg7XG4gIHZhciByZXN1bHQgPSB1bmRlZmluZWQ7XG5cbiAgZm9yICh2YXIgaSA9IDA7IHByb21pc2UuX3N0YXRlID09PSBQRU5ESU5HICYmIGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdCA9IHJlc3VsdHNbaV07XG4gICAgZW51bWVyYXRvci5fZWFjaEVudHJ5KHJlc3VsdC5lbnRyeSwgcmVzdWx0LnBvc2l0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gIGBSU1ZQLmhhc2hgIGlzIHNpbWlsYXIgdG8gYFJTVlAuYWxsYCwgYnV0IHRha2VzIGFuIG9iamVjdCBpbnN0ZWFkIG9mIGFuIGFycmF5XG4gIGZvciBpdHMgYHByb21pc2VzYCBhcmd1bWVudC5cblxuICBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aGVuIGFsbCB0aGUgZ2l2ZW4gcHJvbWlzZXMgaGF2ZSBiZWVuXG4gIGZ1bGZpbGxlZCwgb3IgcmVqZWN0ZWQgaWYgYW55IG9mIHRoZW0gYmVjb21lIHJlamVjdGVkLiBUaGUgcmV0dXJuZWQgcHJvbWlzZVxuICBpcyBmdWxmaWxsZWQgd2l0aCBhIGhhc2ggdGhhdCBoYXMgdGhlIHNhbWUga2V5IG5hbWVzIGFzIHRoZSBgcHJvbWlzZXNgIG9iamVjdFxuICBhcmd1bWVudC4gSWYgYW55IG9mIHRoZSB2YWx1ZXMgaW4gdGhlIG9iamVjdCBhcmUgbm90IHByb21pc2VzLCB0aGV5IHdpbGxcbiAgc2ltcGx5IGJlIGNvcGllZCBvdmVyIHRvIHRoZSBmdWxmaWxsZWQgb2JqZWN0LlxuXG4gIEV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuICBsZXQgcHJvbWlzZXMgPSB7XG4gICAgbXlQcm9taXNlOiBSU1ZQLnJlc29sdmUoMSksXG4gICAgeW91clByb21pc2U6IFJTVlAucmVzb2x2ZSgyKSxcbiAgICB0aGVpclByb21pc2U6IFJTVlAucmVzb2x2ZSgzKSxcbiAgICBub3RBUHJvbWlzZTogNFxuICB9O1xuXG4gIFJTVlAuaGFzaChwcm9taXNlcykudGhlbihmdW5jdGlvbihoYXNoKXtcbiAgICAvLyBoYXNoIGhlcmUgaXMgYW4gb2JqZWN0IHRoYXQgbG9va3MgbGlrZTpcbiAgICAvLyB7XG4gICAgLy8gICBteVByb21pc2U6IDEsXG4gICAgLy8gICB5b3VyUHJvbWlzZTogMixcbiAgICAvLyAgIHRoZWlyUHJvbWlzZTogMyxcbiAgICAvLyAgIG5vdEFQcm9taXNlOiA0XG4gICAgLy8gfVxuICB9KTtcbiAgYGBgYFxuXG4gIElmIGFueSBvZiB0aGUgYHByb21pc2VzYCBnaXZlbiB0byBgUlNWUC5oYXNoYCBhcmUgcmVqZWN0ZWQsIHRoZSBmaXJzdCBwcm9taXNlXG4gIHRoYXQgaXMgcmVqZWN0ZWQgd2lsbCBiZSBnaXZlbiBhcyB0aGUgcmVhc29uIHRvIHRoZSByZWplY3Rpb24gaGFuZGxlci5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2VzID0ge1xuICAgIG15UHJvbWlzZTogUlNWUC5yZXNvbHZlKDEpLFxuICAgIHJlamVjdGVkUHJvbWlzZTogUlNWUC5yZWplY3QobmV3IEVycm9yKCdyZWplY3RlZFByb21pc2UnKSksXG4gICAgYW5vdGhlclJlamVjdGVkUHJvbWlzZTogUlNWUC5yZWplY3QobmV3IEVycm9yKCdhbm90aGVyUmVqZWN0ZWRQcm9taXNlJykpLFxuICB9O1xuXG4gIFJTVlAuaGFzaChwcm9taXNlcykudGhlbihmdW5jdGlvbihoYXNoKXtcbiAgICAvLyBDb2RlIGhlcmUgbmV2ZXIgcnVucyBiZWNhdXNlIHRoZXJlIGFyZSByZWplY3RlZCBwcm9taXNlcyFcbiAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgLy8gcmVhc29uLm1lc3NhZ2UgPT09ICdyZWplY3RlZFByb21pc2UnXG4gIH0pO1xuICBgYGBcblxuICBBbiBpbXBvcnRhbnQgbm90ZTogYFJTVlAuaGFzaGAgaXMgaW50ZW5kZWQgZm9yIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0cyB0aGF0XG4gIGFyZSBqdXN0IGEgc2V0IG9mIGtleXMgYW5kIHZhbHVlcy4gYFJTVlAuaGFzaGAgd2lsbCBOT1QgcHJlc2VydmUgcHJvdG90eXBlXG4gIGNoYWlucy5cblxuICBFeGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgZnVuY3Rpb24gTXlDb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuZXhhbXBsZSA9IFJTVlAucmVzb2x2ZSgnRXhhbXBsZScpO1xuICB9XG5cbiAgTXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSB7XG4gICAgcHJvdG9Qcm9wZXJ0eTogUlNWUC5yZXNvbHZlKCdQcm90byBQcm9wZXJ0eScpXG4gIH07XG5cbiAgbGV0IG15T2JqZWN0ID0gbmV3IE15Q29uc3RydWN0b3IoKTtcblxuICBSU1ZQLmhhc2gobXlPYmplY3QpLnRoZW4oZnVuY3Rpb24oaGFzaCl7XG4gICAgLy8gcHJvdG9Qcm9wZXJ0eSB3aWxsIG5vdCBiZSBwcmVzZW50LCBpbnN0ZWFkIHlvdSB3aWxsIGp1c3QgaGF2ZSBhblxuICAgIC8vIG9iamVjdCB0aGF0IGxvb2tzIGxpa2U6XG4gICAgLy8ge1xuICAgIC8vICAgZXhhbXBsZTogJ0V4YW1wbGUnXG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gaGFzaC5oYXNPd25Qcm9wZXJ0eSgncHJvdG9Qcm9wZXJ0eScpOyAvLyBmYWxzZVxuICAgIC8vICd1bmRlZmluZWQnID09PSB0eXBlb2YgaGFzaC5wcm90b1Byb3BlcnR5XG4gIH0pO1xuICBgYGBcblxuICBAbWV0aG9kIGhhc2hcbiAgQHN0YXRpY1xuICBAZm9yIFJTVlBcbiAgQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIHRoYXQgZGVzY3JpYmVzIHRoZSBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiBhbGwgcHJvcGVydGllcyBvZiBgcHJvbWlzZXNgXG4gIGhhdmUgYmVlbiBmdWxmaWxsZWQsIG9yIHJlamVjdGVkIGlmIGFueSBvZiB0aGVtIGJlY29tZSByZWplY3RlZC5cbiovXG5mdW5jdGlvbiBoYXNoJDEob2JqZWN0LCBsYWJlbCkge1xuICByZXR1cm4gbmV3IFByb21pc2VIYXNoKFByb21pc2UkMSwgb2JqZWN0LCBsYWJlbCkucHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gSGFzaFNldHRsZWQoQ29uc3RydWN0b3IsIG9iamVjdCwgbGFiZWwpIHtcbiAgdGhpcy5fc3VwZXJDb25zdHJ1Y3RvcihDb25zdHJ1Y3Rvciwgb2JqZWN0LCBmYWxzZSwgbGFiZWwpO1xufVxuXG5IYXNoU2V0dGxlZC5wcm90b3R5cGUgPSBvX2NyZWF0ZShQcm9taXNlSGFzaC5wcm90b3R5cGUpO1xuSGFzaFNldHRsZWQucHJvdG90eXBlLl9zdXBlckNvbnN0cnVjdG9yID0gRW51bWVyYXRvcjtcbkhhc2hTZXR0bGVkLnByb3RvdHlwZS5fbWFrZVJlc3VsdCA9IG1ha2VTZXR0bGVkUmVzdWx0O1xuXG5IYXNoU2V0dGxlZC5wcm90b3R5cGUuX3ZhbGlkYXRpb25FcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBFcnJvcignaGFzaFNldHRsZWQgbXVzdCBiZSBjYWxsZWQgd2l0aCBhbiBvYmplY3QnKTtcbn07XG5cbi8qKlxuICBgUlNWUC5oYXNoU2V0dGxlZGAgaXMgc2ltaWxhciB0byBgUlNWUC5hbGxTZXR0bGVkYCwgYnV0IHRha2VzIGFuIG9iamVjdFxuICBpbnN0ZWFkIG9mIGFuIGFycmF5IGZvciBpdHMgYHByb21pc2VzYCBhcmd1bWVudC5cblxuICBVbmxpa2UgYFJTVlAuYWxsYCBvciBgUlNWUC5oYXNoYCwgd2hpY2ggaW1wbGVtZW50IGEgZmFpbC1mYXN0IG1ldGhvZCxcbiAgYnV0IGxpa2UgYFJTVlAuYWxsU2V0dGxlZGAsIGBoYXNoU2V0dGxlZGAgd2FpdHMgdW50aWwgYWxsIHRoZVxuICBjb25zdGl0dWVudCBwcm9taXNlcyBoYXZlIHJldHVybmVkIGFuZCB0aGVuIHNob3dzIHlvdSBhbGwgdGhlIHJlc3VsdHNcbiAgd2l0aCB0aGVpciBzdGF0ZXMgYW5kIHZhbHVlcy9yZWFzb25zLiBUaGlzIGlzIHVzZWZ1bCBpZiB5b3Ugd2FudCB0b1xuICBoYW5kbGUgbXVsdGlwbGUgcHJvbWlzZXMnIGZhaWx1cmUgc3RhdGVzIHRvZ2V0aGVyIGFzIGEgc2V0LlxuXG4gIFJldHVybnMgYSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdoZW4gYWxsIHRoZSBnaXZlbiBwcm9taXNlcyBoYXZlIGJlZW5cbiAgc2V0dGxlZCwgb3IgcmVqZWN0ZWQgaWYgdGhlIHBhc3NlZCBwYXJhbWV0ZXJzIGFyZSBpbnZhbGlkLlxuXG4gIFRoZSByZXR1cm5lZCBwcm9taXNlIGlzIGZ1bGZpbGxlZCB3aXRoIGEgaGFzaCB0aGF0IGhhcyB0aGUgc2FtZSBrZXkgbmFtZXMgYXNcbiAgdGhlIGBwcm9taXNlc2Agb2JqZWN0IGFyZ3VtZW50LiBJZiBhbnkgb2YgdGhlIHZhbHVlcyBpbiB0aGUgb2JqZWN0IGFyZSBub3RcbiAgcHJvbWlzZXMsIHRoZXkgd2lsbCBiZSBjb3BpZWQgb3ZlciB0byB0aGUgZnVsZmlsbGVkIG9iamVjdCBhbmQgbWFya2VkIHdpdGggc3RhdGVcbiAgJ2Z1bGZpbGxlZCcuXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlcyA9IHtcbiAgICBteVByb21pc2U6IFJTVlAuUHJvbWlzZS5yZXNvbHZlKDEpLFxuICAgIHlvdXJQcm9taXNlOiBSU1ZQLlByb21pc2UucmVzb2x2ZSgyKSxcbiAgICB0aGVpclByb21pc2U6IFJTVlAuUHJvbWlzZS5yZXNvbHZlKDMpLFxuICAgIG5vdEFQcm9taXNlOiA0XG4gIH07XG5cbiAgUlNWUC5oYXNoU2V0dGxlZChwcm9taXNlcykudGhlbihmdW5jdGlvbihoYXNoKXtcbiAgICAvLyBoYXNoIGhlcmUgaXMgYW4gb2JqZWN0IHRoYXQgbG9va3MgbGlrZTpcbiAgICAvLyB7XG4gICAgLy8gICBteVByb21pc2U6IHsgc3RhdGU6ICdmdWxmaWxsZWQnLCB2YWx1ZTogMSB9LFxuICAgIC8vICAgeW91clByb21pc2U6IHsgc3RhdGU6ICdmdWxmaWxsZWQnLCB2YWx1ZTogMiB9LFxuICAgIC8vICAgdGhlaXJQcm9taXNlOiB7IHN0YXRlOiAnZnVsZmlsbGVkJywgdmFsdWU6IDMgfSxcbiAgICAvLyAgIG5vdEFQcm9taXNlOiB7IHN0YXRlOiAnZnVsZmlsbGVkJywgdmFsdWU6IDQgfVxuICAgIC8vIH1cbiAgfSk7XG4gIGBgYFxuXG4gIElmIGFueSBvZiB0aGUgYHByb21pc2VzYCBnaXZlbiB0byBgUlNWUC5oYXNoYCBhcmUgcmVqZWN0ZWQsIHRoZSBzdGF0ZSB3aWxsXG4gIGJlIHNldCB0byAncmVqZWN0ZWQnIGFuZCB0aGUgcmVhc29uIGZvciByZWplY3Rpb24gcHJvdmlkZWQuXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlcyA9IHtcbiAgICBteVByb21pc2U6IFJTVlAuUHJvbWlzZS5yZXNvbHZlKDEpLFxuICAgIHJlamVjdGVkUHJvbWlzZTogUlNWUC5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ3JlamVjdGlvbicpKSxcbiAgICBhbm90aGVyUmVqZWN0ZWRQcm9taXNlOiBSU1ZQLlByb21pc2UucmVqZWN0KG5ldyBFcnJvcignbW9yZSByZWplY3Rpb24nKSksXG4gIH07XG5cbiAgUlNWUC5oYXNoU2V0dGxlZChwcm9taXNlcykudGhlbihmdW5jdGlvbihoYXNoKXtcbiAgICAvLyBoYXNoIGhlcmUgaXMgYW4gb2JqZWN0IHRoYXQgbG9va3MgbGlrZTpcbiAgICAvLyB7XG4gICAgLy8gICBteVByb21pc2U6ICAgICAgICAgICAgICB7IHN0YXRlOiAnZnVsZmlsbGVkJywgdmFsdWU6IDEgfSxcbiAgICAvLyAgIHJlamVjdGVkUHJvbWlzZTogICAgICAgIHsgc3RhdGU6ICdyZWplY3RlZCcsIHJlYXNvbjogRXJyb3IgfSxcbiAgICAvLyAgIGFub3RoZXJSZWplY3RlZFByb21pc2U6IHsgc3RhdGU6ICdyZWplY3RlZCcsIHJlYXNvbjogRXJyb3IgfSxcbiAgICAvLyB9XG4gICAgLy8gTm90ZSB0aGF0IGZvciByZWplY3RlZFByb21pc2UsIHJlYXNvbi5tZXNzYWdlID09ICdyZWplY3Rpb24nLFxuICAgIC8vIGFuZCBmb3IgYW5vdGhlclJlamVjdGVkUHJvbWlzZSwgcmVhc29uLm1lc3NhZ2UgPT0gJ21vcmUgcmVqZWN0aW9uJy5cbiAgfSk7XG4gIGBgYFxuXG4gIEFuIGltcG9ydGFudCBub3RlOiBgUlNWUC5oYXNoU2V0dGxlZGAgaXMgaW50ZW5kZWQgZm9yIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0cyB0aGF0XG4gIGFyZSBqdXN0IGEgc2V0IG9mIGtleXMgYW5kIHZhbHVlcy4gYFJTVlAuaGFzaFNldHRsZWRgIHdpbGwgTk9UIHByZXNlcnZlIHByb3RvdHlwZVxuICBjaGFpbnMuXG5cbiAgRXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGZ1bmN0aW9uIE15Q29uc3RydWN0b3IoKXtcbiAgICB0aGlzLmV4YW1wbGUgPSBSU1ZQLlByb21pc2UucmVzb2x2ZSgnRXhhbXBsZScpO1xuICB9XG5cbiAgTXlDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSB7XG4gICAgcHJvdG9Qcm9wZXJ0eTogUlNWUC5Qcm9taXNlLnJlc29sdmUoJ1Byb3RvIFByb3BlcnR5JylcbiAgfTtcblxuICBsZXQgbXlPYmplY3QgPSBuZXcgTXlDb25zdHJ1Y3RvcigpO1xuXG4gIFJTVlAuaGFzaFNldHRsZWQobXlPYmplY3QpLnRoZW4oZnVuY3Rpb24oaGFzaCl7XG4gICAgLy8gcHJvdG9Qcm9wZXJ0eSB3aWxsIG5vdCBiZSBwcmVzZW50LCBpbnN0ZWFkIHlvdSB3aWxsIGp1c3QgaGF2ZSBhblxuICAgIC8vIG9iamVjdCB0aGF0IGxvb2tzIGxpa2U6XG4gICAgLy8ge1xuICAgIC8vICAgZXhhbXBsZTogeyBzdGF0ZTogJ2Z1bGZpbGxlZCcsIHZhbHVlOiAnRXhhbXBsZScgfVxuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIGhhc2guaGFzT3duUHJvcGVydHkoJ3Byb3RvUHJvcGVydHknKTsgLy8gZmFsc2VcbiAgICAvLyAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIGhhc2gucHJvdG9Qcm9wZXJ0eVxuICB9KTtcbiAgYGBgXG5cbiAgQG1ldGhvZCBoYXNoU2V0dGxlZFxuICBAZm9yIFJTVlBcbiAgQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIHRoYXQgZGVzY3JpYmVzIHRoZSBwcm9taXNlLlxuICBVc2VmdWwgZm9yIHRvb2xpbmcuXG4gIEByZXR1cm4ge1Byb21pc2V9IHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiB3aGVuIGFsbCBwcm9wZXJ0aWVzIG9mIGBwcm9taXNlc2BcbiAgaGF2ZSBiZWVuIHNldHRsZWQuXG4gIEBzdGF0aWNcbiovXG5mdW5jdGlvbiBoYXNoU2V0dGxlZCQxKG9iamVjdCwgbGFiZWwpIHtcbiAgcmV0dXJuIG5ldyBIYXNoU2V0dGxlZChQcm9taXNlJDEsIG9iamVjdCwgbGFiZWwpLnByb21pc2U7XG59XG5cbi8qKlxuICBgUlNWUC5yZXRocm93YCB3aWxsIHJldGhyb3cgYW4gZXJyb3Igb24gdGhlIG5leHQgdHVybiBvZiB0aGUgSmF2YVNjcmlwdCBldmVudFxuICBsb29wIGluIG9yZGVyIHRvIGFpZCBkZWJ1Z2dpbmcuXG5cbiAgUHJvbWlzZXMgQSsgc3BlY2lmaWVzIHRoYXQgYW55IGV4Y2VwdGlvbnMgdGhhdCBvY2N1ciB3aXRoIGEgcHJvbWlzZSBtdXN0IGJlXG4gIGNhdWdodCBieSB0aGUgcHJvbWlzZXMgaW1wbGVtZW50YXRpb24gYW5kIGJ1YmJsZWQgdG8gdGhlIGxhc3QgaGFuZGxlci4gRm9yXG4gIHRoaXMgcmVhc29uLCBpdCBpcyByZWNvbW1lbmRlZCB0aGF0IHlvdSBhbHdheXMgc3BlY2lmeSBhIHNlY29uZCByZWplY3Rpb25cbiAgaGFuZGxlciBmdW5jdGlvbiB0byBgdGhlbmAuIEhvd2V2ZXIsIGBSU1ZQLnJldGhyb3dgIHdpbGwgdGhyb3cgdGhlIGV4Y2VwdGlvblxuICBvdXRzaWRlIG9mIHRoZSBwcm9taXNlLCBzbyBpdCBidWJibGVzIHVwIHRvIHlvdXIgY29uc29sZSBpZiBpbiB0aGUgYnJvd3NlcixcbiAgb3IgZG9tYWluL2NhdXNlIHVuY2F1Z2h0IGV4Y2VwdGlvbiBpbiBOb2RlLiBgcmV0aHJvd2Agd2lsbCBhbHNvIHRocm93IHRoZVxuICBlcnJvciBhZ2FpbiBzbyB0aGUgZXJyb3IgY2FuIGJlIGhhbmRsZWQgYnkgdGhlIHByb21pc2UgcGVyIHRoZSBzcGVjLlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgZnVuY3Rpb24gdGhyb3dzKCl7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXaG9vcHMhJyk7XG4gIH1cblxuICBsZXQgcHJvbWlzZSA9IG5ldyBSU1ZQLlByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICB0aHJvd3MoKTtcbiAgfSk7XG5cbiAgcHJvbWlzZS5jYXRjaChSU1ZQLnJldGhyb3cpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAvLyBDb2RlIGhlcmUgZG9lc24ndCBydW4gYmVjYXVzZSB0aGUgcHJvbWlzZSBiZWNhbWUgcmVqZWN0ZWQgZHVlIHRvIGFuXG4gICAgLy8gZXJyb3IhXG4gIH0sIGZ1bmN0aW9uIChlcnIpe1xuICAgIC8vIGhhbmRsZSB0aGUgZXJyb3IgaGVyZVxuICB9KTtcbiAgYGBgXG5cbiAgVGhlICdXaG9vcHMnIGVycm9yIHdpbGwgYmUgdGhyb3duIG9uIHRoZSBuZXh0IHR1cm4gb2YgdGhlIGV2ZW50IGxvb3BcbiAgYW5kIHlvdSBjYW4gd2F0Y2ggZm9yIGl0IGluIHlvdXIgY29uc29sZS4gWW91IGNhbiBhbHNvIGhhbmRsZSBpdCB1c2luZyBhXG4gIHJlamVjdGlvbiBoYW5kbGVyIGdpdmVuIHRvIGAudGhlbmAgb3IgYC5jYXRjaGAgb24gdGhlIHJldHVybmVkIHByb21pc2UuXG5cbiAgQG1ldGhvZCByZXRocm93XG4gIEBzdGF0aWNcbiAgQGZvciBSU1ZQXG4gIEBwYXJhbSB7RXJyb3J9IHJlYXNvbiByZWFzb24gdGhlIHByb21pc2UgYmVjYW1lIHJlamVjdGVkLlxuICBAdGhyb3dzIEVycm9yXG4gIEBzdGF0aWNcbiovXG5mdW5jdGlvbiByZXRocm93JDEocmVhc29uKSB7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHRocm93IHJlYXNvbjtcbiAgfSk7XG4gIHRocm93IHJlYXNvbjtcbn1cblxuLyoqXG4gIGBSU1ZQLmRlZmVyYCByZXR1cm5zIGFuIG9iamVjdCBzaW1pbGFyIHRvIGpRdWVyeSdzIGAkLkRlZmVycmVkYC5cbiAgYFJTVlAuZGVmZXJgIHNob3VsZCBiZSB1c2VkIHdoZW4gcG9ydGluZyBvdmVyIGNvZGUgcmVsaWFudCBvbiBgJC5EZWZlcnJlZGAnc1xuICBpbnRlcmZhY2UuIE5ldyBjb2RlIHNob3VsZCB1c2UgdGhlIGBSU1ZQLlByb21pc2VgIGNvbnN0cnVjdG9yIGluc3RlYWQuXG5cbiAgVGhlIG9iamVjdCByZXR1cm5lZCBmcm9tIGBSU1ZQLmRlZmVyYCBpcyBhIHBsYWluIG9iamVjdCB3aXRoIHRocmVlIHByb3BlcnRpZXM6XG5cbiAgKiBwcm9taXNlIC0gYW4gYFJTVlAuUHJvbWlzZWAuXG4gICogcmVqZWN0IC0gYSBmdW5jdGlvbiB0aGF0IGNhdXNlcyB0aGUgYHByb21pc2VgIHByb3BlcnR5IG9uIHRoaXMgb2JqZWN0IHRvXG4gICAgYmVjb21lIHJlamVjdGVkXG4gICogcmVzb2x2ZSAtIGEgZnVuY3Rpb24gdGhhdCBjYXVzZXMgdGhlIGBwcm9taXNlYCBwcm9wZXJ0eSBvbiB0aGlzIG9iamVjdCB0b1xuICAgIGJlY29tZSBmdWxmaWxsZWQuXG5cbiAgRXhhbXBsZTpcblxuICAgYGBgamF2YXNjcmlwdFxuICAgbGV0IGRlZmVycmVkID0gUlNWUC5kZWZlcigpO1xuXG4gICBkZWZlcnJlZC5yZXNvbHZlKFwiU3VjY2VzcyFcIik7XG5cbiAgIGRlZmVycmVkLnByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgIC8vIHZhbHVlIGhlcmUgaXMgXCJTdWNjZXNzIVwiXG4gICB9KTtcbiAgIGBgYFxuXG4gIEBtZXRob2QgZGVmZXJcbiAgQHN0YXRpY1xuICBAZm9yIFJTVlBcbiAgQHBhcmFtIHtTdHJpbmd9IGxhYmVsIG9wdGlvbmFsIHN0cmluZyBmb3IgbGFiZWxpbmcgdGhlIHByb21pc2UuXG4gIFVzZWZ1bCBmb3IgdG9vbGluZy5cbiAgQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBkZWZlciQxKGxhYmVsKSB7XG4gIHZhciBkZWZlcnJlZCA9IHsgcmVzb2x2ZTogdW5kZWZpbmVkLCByZWplY3Q6IHVuZGVmaW5lZCB9O1xuXG4gIGRlZmVycmVkLnByb21pc2UgPSBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBkZWZlcnJlZC5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICBkZWZlcnJlZC5yZWplY3QgPSByZWplY3Q7XG4gIH0sIGxhYmVsKTtcblxuICByZXR1cm4gZGVmZXJyZWQ7XG59XG5cbi8qKlxuIGBSU1ZQLm1hcGAgaXMgc2ltaWxhciB0byBKYXZhU2NyaXB0J3MgbmF0aXZlIGBtYXBgIG1ldGhvZCwgZXhjZXB0IHRoYXQgaXRcbiAgd2FpdHMgZm9yIGFsbCBwcm9taXNlcyB0byBiZWNvbWUgZnVsZmlsbGVkIGJlZm9yZSBydW5uaW5nIHRoZSBgbWFwRm5gIG9uXG4gIGVhY2ggaXRlbSBpbiBnaXZlbiB0byBgcHJvbWlzZXNgLiBgUlNWUC5tYXBgIHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbFxuICBiZWNvbWUgZnVsZmlsbGVkIHdpdGggdGhlIHJlc3VsdCBvZiBydW5uaW5nIGBtYXBGbmAgb24gdGhlIHZhbHVlcyB0aGUgcHJvbWlzZXNcbiAgYmVjb21lIGZ1bGZpbGxlZCB3aXRoLlxuXG4gIEZvciBleGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcblxuICBsZXQgcHJvbWlzZTEgPSBSU1ZQLnJlc29sdmUoMSk7XG4gIGxldCBwcm9taXNlMiA9IFJTVlAucmVzb2x2ZSgyKTtcbiAgbGV0IHByb21pc2UzID0gUlNWUC5yZXNvbHZlKDMpO1xuICBsZXQgcHJvbWlzZXMgPSBbIHByb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTMgXTtcblxuICBsZXQgbWFwRm4gPSBmdW5jdGlvbihpdGVtKXtcbiAgICByZXR1cm4gaXRlbSArIDE7XG4gIH07XG5cbiAgUlNWUC5tYXAocHJvbWlzZXMsIG1hcEZuKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgLy8gcmVzdWx0IGlzIFsgMiwgMywgNCBdXG4gIH0pO1xuICBgYGBcblxuICBJZiBhbnkgb2YgdGhlIGBwcm9taXNlc2AgZ2l2ZW4gdG8gYFJTVlAubWFwYCBhcmUgcmVqZWN0ZWQsIHRoZSBmaXJzdCBwcm9taXNlXG4gIHRoYXQgaXMgcmVqZWN0ZWQgd2lsbCBiZSBnaXZlbiBhcyBhbiBhcmd1bWVudCB0byB0aGUgcmV0dXJuZWQgcHJvbWlzZSdzXG4gIHJlamVjdGlvbiBoYW5kbGVyLiBGb3IgZXhhbXBsZTpcblxuICBgYGBqYXZhc2NyaXB0XG4gIGxldCBwcm9taXNlMSA9IFJTVlAucmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gUlNWUC5yZWplY3QobmV3IEVycm9yKCcyJykpO1xuICBsZXQgcHJvbWlzZTMgPSBSU1ZQLnJlamVjdChuZXcgRXJyb3IoJzMnKSk7XG4gIGxldCBwcm9taXNlcyA9IFsgcHJvbWlzZTEsIHByb21pc2UyLCBwcm9taXNlMyBdO1xuXG4gIGxldCBtYXBGbiA9IGZ1bmN0aW9uKGl0ZW0pe1xuICAgIHJldHVybiBpdGVtICsgMTtcbiAgfTtcblxuICBSU1ZQLm1hcChwcm9taXNlcywgbWFwRm4pLnRoZW4oZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIENvZGUgaGVyZSBuZXZlciBydW5zIGJlY2F1c2UgdGhlcmUgYXJlIHJlamVjdGVkIHByb21pc2VzIVxuICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAvLyByZWFzb24ubWVzc2FnZSA9PT0gJzInXG4gIH0pO1xuICBgYGBcblxuICBgUlNWUC5tYXBgIHdpbGwgYWxzbyB3YWl0IGlmIGEgcHJvbWlzZSBpcyByZXR1cm5lZCBmcm9tIGBtYXBGbmAuIEZvciBleGFtcGxlLFxuICBzYXkgeW91IHdhbnQgdG8gZ2V0IGFsbCBjb21tZW50cyBmcm9tIGEgc2V0IG9mIGJsb2cgcG9zdHMsIGJ1dCB5b3UgbmVlZFxuICB0aGUgYmxvZyBwb3N0cyBmaXJzdCBiZWNhdXNlIHRoZXkgY29udGFpbiBhIHVybCB0byB0aG9zZSBjb21tZW50cy5cblxuICBgYGBqYXZzY3JpcHRcblxuICBsZXQgbWFwRm4gPSBmdW5jdGlvbihibG9nUG9zdCl7XG4gICAgLy8gZ2V0Q29tbWVudHMgZG9lcyBzb21lIGFqYXggYW5kIHJldHVybnMgYW4gUlNWUC5Qcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkXG4gICAgLy8gd2l0aCBzb21lIGNvbW1lbnRzIGRhdGFcbiAgICByZXR1cm4gZ2V0Q29tbWVudHMoYmxvZ1Bvc3QuY29tbWVudHNfdXJsKTtcbiAgfTtcblxuICAvLyBnZXRCbG9nUG9zdHMgZG9lcyBzb21lIGFqYXggYW5kIHJldHVybnMgYW4gUlNWUC5Qcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkXG4gIC8vIHdpdGggc29tZSBibG9nIHBvc3QgZGF0YVxuICBSU1ZQLm1hcChnZXRCbG9nUG9zdHMoKSwgbWFwRm4pLnRoZW4oZnVuY3Rpb24oY29tbWVudHMpe1xuICAgIC8vIGNvbW1lbnRzIGlzIHRoZSByZXN1bHQgb2YgYXNraW5nIHRoZSBzZXJ2ZXIgZm9yIHRoZSBjb21tZW50c1xuICAgIC8vIG9mIGFsbCBibG9nIHBvc3RzIHJldHVybmVkIGZyb20gZ2V0QmxvZ1Bvc3RzKClcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgbWFwXG4gIEBzdGF0aWNcbiAgQGZvciBSU1ZQXG4gIEBwYXJhbSB7QXJyYXl9IHByb21pc2VzXG4gIEBwYXJhbSB7RnVuY3Rpb259IG1hcEZuIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBlYWNoIGZ1bGZpbGxlZCBwcm9taXNlLlxuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIGZvciBsYWJlbGluZyB0aGUgcHJvbWlzZS5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggdGhlIHJlc3VsdCBvZiBjYWxsaW5nXG4gIGBtYXBGbmAgb24gZWFjaCBmdWxmaWxsZWQgcHJvbWlzZSBvciB2YWx1ZSB3aGVuIHRoZXkgYmVjb21lIGZ1bGZpbGxlZC5cbiAgIFRoZSBwcm9taXNlIHdpbGwgYmUgcmVqZWN0ZWQgaWYgYW55IG9mIHRoZSBnaXZlbiBgcHJvbWlzZXNgIGJlY29tZSByZWplY3RlZC5cbiAgQHN0YXRpY1xuKi9cbmZ1bmN0aW9uIG1hcCQxKHByb21pc2VzLCBtYXBGbiwgbGFiZWwpIHtcbiAgcmV0dXJuIFByb21pc2UkMS5hbGwocHJvbWlzZXMsIGxhYmVsKS50aGVuKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24obWFwRm4pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiWW91IG11c3QgcGFzcyBhIGZ1bmN0aW9uIGFzIG1hcCdzIHNlY29uZCBhcmd1bWVudC5cIik7XG4gICAgfVxuXG4gICAgdmFyIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG4gICAgdmFyIHJlc3VsdHMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdHNbaV0gPSBtYXBGbih2YWx1ZXNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlJDEuYWxsKHJlc3VsdHMsIGxhYmVsKTtcbiAgfSk7XG59XG5cbi8qKlxuICBUaGlzIGlzIGEgY29udmVuaWVudCBhbGlhcyBmb3IgYFJTVlAuUHJvbWlzZS5yZXNvbHZlYC5cblxuICBAbWV0aG9kIHJlc29sdmVcbiAgQHN0YXRpY1xuICBAZm9yIFJTVlBcbiAgQHBhcmFtIHsqfSB2YWx1ZSB2YWx1ZSB0aGF0IHRoZSByZXR1cm5lZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aFxuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIGZvciBpZGVudGlmeWluZyB0aGUgcmV0dXJuZWQgcHJvbWlzZS5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgdGhhdCB3aWxsIGJlY29tZSBmdWxmaWxsZWQgd2l0aCB0aGUgZ2l2ZW5cbiAgYHZhbHVlYFxuKi9cbmZ1bmN0aW9uIHJlc29sdmUkMyh2YWx1ZSwgbGFiZWwpIHtcbiAgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKHZhbHVlLCBsYWJlbCk7XG59XG5cbi8qKlxuICBUaGlzIGlzIGEgY29udmVuaWVudCBhbGlhcyBmb3IgYFJTVlAuUHJvbWlzZS5yZWplY3RgLlxuXG4gIEBtZXRob2QgcmVqZWN0XG4gIEBzdGF0aWNcbiAgQGZvciBSU1ZQXG4gIEBwYXJhbSB7Kn0gcmVhc29uIHZhbHVlIHRoYXQgdGhlIHJldHVybmVkIHByb21pc2Ugd2lsbCBiZSByZWplY3RlZCB3aXRoLlxuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIGZvciBpZGVudGlmeWluZyB0aGUgcmV0dXJuZWQgcHJvbWlzZS5cbiAgVXNlZnVsIGZvciB0b29saW5nLlxuICBAcmV0dXJuIHtQcm9taXNlfSBhIHByb21pc2UgcmVqZWN0ZWQgd2l0aCB0aGUgZ2l2ZW4gYHJlYXNvbmAuXG4qL1xuZnVuY3Rpb24gcmVqZWN0JDMocmVhc29uLCBsYWJlbCkge1xuICByZXR1cm4gUHJvbWlzZSQxLnJlamVjdChyZWFzb24sIGxhYmVsKTtcbn1cblxuLyoqXG4gYFJTVlAuZmlsdGVyYCBpcyBzaW1pbGFyIHRvIEphdmFTY3JpcHQncyBuYXRpdmUgYGZpbHRlcmAgbWV0aG9kLCBleGNlcHQgdGhhdCBpdFxuICB3YWl0cyBmb3IgYWxsIHByb21pc2VzIHRvIGJlY29tZSBmdWxmaWxsZWQgYmVmb3JlIHJ1bm5pbmcgdGhlIGBmaWx0ZXJGbmAgb25cbiAgZWFjaCBpdGVtIGluIGdpdmVuIHRvIGBwcm9taXNlc2AuIGBSU1ZQLmZpbHRlcmAgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsXG4gIGJlY29tZSBmdWxmaWxsZWQgd2l0aCB0aGUgcmVzdWx0IG9mIHJ1bm5pbmcgYGZpbHRlckZuYCBvbiB0aGUgdmFsdWVzIHRoZVxuICBwcm9taXNlcyBiZWNvbWUgZnVsZmlsbGVkIHdpdGguXG5cbiAgRm9yIGV4YW1wbGU6XG5cbiAgYGBgamF2YXNjcmlwdFxuXG4gIGxldCBwcm9taXNlMSA9IFJTVlAucmVzb2x2ZSgxKTtcbiAgbGV0IHByb21pc2UyID0gUlNWUC5yZXNvbHZlKDIpO1xuICBsZXQgcHJvbWlzZTMgPSBSU1ZQLnJlc29sdmUoMyk7XG5cbiAgbGV0IHByb21pc2VzID0gW3Byb21pc2UxLCBwcm9taXNlMiwgcHJvbWlzZTNdO1xuXG4gIGxldCBmaWx0ZXJGbiA9IGZ1bmN0aW9uKGl0ZW0pe1xuICAgIHJldHVybiBpdGVtID4gMTtcbiAgfTtcblxuICBSU1ZQLmZpbHRlcihwcm9taXNlcywgZmlsdGVyRm4pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyByZXN1bHQgaXMgWyAyLCAzIF1cbiAgfSk7XG4gIGBgYFxuXG4gIElmIGFueSBvZiB0aGUgYHByb21pc2VzYCBnaXZlbiB0byBgUlNWUC5maWx0ZXJgIGFyZSByZWplY3RlZCwgdGhlIGZpcnN0IHByb21pc2VcbiAgdGhhdCBpcyByZWplY3RlZCB3aWxsIGJlIGdpdmVuIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSByZXR1cm5lZCBwcm9taXNlJ3NcbiAgcmVqZWN0aW9uIGhhbmRsZXIuIEZvciBleGFtcGxlOlxuXG4gIGBgYGphdmFzY3JpcHRcbiAgbGV0IHByb21pc2UxID0gUlNWUC5yZXNvbHZlKDEpO1xuICBsZXQgcHJvbWlzZTIgPSBSU1ZQLnJlamVjdChuZXcgRXJyb3IoJzInKSk7XG4gIGxldCBwcm9taXNlMyA9IFJTVlAucmVqZWN0KG5ldyBFcnJvcignMycpKTtcbiAgbGV0IHByb21pc2VzID0gWyBwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzIF07XG5cbiAgbGV0IGZpbHRlckZuID0gZnVuY3Rpb24oaXRlbSl7XG4gICAgcmV0dXJuIGl0ZW0gPiAxO1xuICB9O1xuXG4gIFJTVlAuZmlsdGVyKHByb21pc2VzLCBmaWx0ZXJGbikudGhlbihmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gQ29kZSBoZXJlIG5ldmVyIHJ1bnMgYmVjYXVzZSB0aGVyZSBhcmUgcmVqZWN0ZWQgcHJvbWlzZXMhXG4gIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgIC8vIHJlYXNvbi5tZXNzYWdlID09PSAnMidcbiAgfSk7XG4gIGBgYFxuXG4gIGBSU1ZQLmZpbHRlcmAgd2lsbCBhbHNvIHdhaXQgZm9yIGFueSBwcm9taXNlcyByZXR1cm5lZCBmcm9tIGBmaWx0ZXJGbmAuXG4gIEZvciBpbnN0YW5jZSwgeW91IG1heSB3YW50IHRvIGZldGNoIGEgbGlzdCBvZiB1c2VycyB0aGVuIHJldHVybiBhIHN1YnNldFxuICBvZiB0aG9zZSB1c2VycyBiYXNlZCBvbiBzb21lIGFzeW5jaHJvbm91cyBvcGVyYXRpb246XG5cbiAgYGBgamF2YXNjcmlwdFxuXG4gIGxldCBhbGljZSA9IHsgbmFtZTogJ2FsaWNlJyB9O1xuICBsZXQgYm9iICAgPSB7IG5hbWU6ICdib2InIH07XG4gIGxldCB1c2VycyA9IFsgYWxpY2UsIGJvYiBdO1xuXG4gIGxldCBwcm9taXNlcyA9IHVzZXJzLm1hcChmdW5jdGlvbih1c2VyKXtcbiAgICByZXR1cm4gUlNWUC5yZXNvbHZlKHVzZXIpO1xuICB9KTtcblxuICBsZXQgZmlsdGVyRm4gPSBmdW5jdGlvbih1c2VyKXtcbiAgICAvLyBIZXJlLCBBbGljZSBoYXMgcGVybWlzc2lvbnMgdG8gY3JlYXRlIGEgYmxvZyBwb3N0LCBidXQgQm9iIGRvZXMgbm90LlxuICAgIHJldHVybiBnZXRQcml2aWxlZ2VzRm9yVXNlcih1c2VyKS50aGVuKGZ1bmN0aW9uKHByaXZzKXtcbiAgICAgIHJldHVybiBwcml2cy5jYW5fY3JlYXRlX2Jsb2dfcG9zdCA9PT0gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcbiAgUlNWUC5maWx0ZXIocHJvbWlzZXMsIGZpbHRlckZuKS50aGVuKGZ1bmN0aW9uKHVzZXJzKXtcbiAgICAvLyB0cnVlLCBiZWNhdXNlIHRoZSBzZXJ2ZXIgdG9sZCB1cyBvbmx5IEFsaWNlIGNhbiBjcmVhdGUgYSBibG9nIHBvc3QuXG4gICAgdXNlcnMubGVuZ3RoID09PSAxO1xuICAgIC8vIGZhbHNlLCBiZWNhdXNlIEFsaWNlIGlzIHRoZSBvbmx5IHVzZXIgcHJlc2VudCBpbiBgdXNlcnNgXG4gICAgdXNlcnNbMF0gPT09IGJvYjtcbiAgfSk7XG4gIGBgYFxuXG4gIEBtZXRob2QgZmlsdGVyXG4gIEBzdGF0aWNcbiAgQGZvciBSU1ZQXG4gIEBwYXJhbSB7QXJyYXl9IHByb21pc2VzXG4gIEBwYXJhbSB7RnVuY3Rpb259IGZpbHRlckZuIC0gZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGVhY2ggcmVzb2x2ZWQgdmFsdWUgdG9cbiAgZmlsdGVyIHRoZSBmaW5hbCByZXN1bHRzLlxuICBAcGFyYW0ge1N0cmluZ30gbGFiZWwgb3B0aW9uYWwgc3RyaW5nIGRlc2NyaWJpbmcgdGhlIHByb21pc2UuIFVzZWZ1bCBmb3JcbiAgdG9vbGluZy5cbiAgQHJldHVybiB7UHJvbWlzZX1cbiovXG5cbmZ1bmN0aW9uIHJlc29sdmVBbGwocHJvbWlzZXMsIGxhYmVsKSB7XG4gIHJldHVybiBQcm9taXNlJDEuYWxsKHByb21pc2VzLCBsYWJlbCk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTaW5nbGUocHJvbWlzZSwgbGFiZWwpIHtcbiAgcmV0dXJuIFByb21pc2UkMS5yZXNvbHZlKHByb21pc2UsIGxhYmVsKS50aGVuKGZ1bmN0aW9uIChwcm9taXNlcykge1xuICAgIHJldHVybiByZXNvbHZlQWxsKHByb21pc2VzLCBsYWJlbCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZmlsdGVyJDEocHJvbWlzZXMsIGZpbHRlckZuLCBsYWJlbCkge1xuICB2YXIgcHJvbWlzZSA9IGlzQXJyYXkocHJvbWlzZXMpID8gcmVzb2x2ZUFsbChwcm9taXNlcywgbGFiZWwpIDogcmVzb2x2ZVNpbmdsZShwcm9taXNlcywgbGFiZWwpO1xuICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24oZmlsdGVyRm4pKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiWW91IG11c3QgcGFzcyBhIGZ1bmN0aW9uIGFzIGZpbHRlcidzIHNlY29uZCBhcmd1bWVudC5cIik7XG4gICAgfVxuXG4gICAgdmFyIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGg7XG4gICAgdmFyIGZpbHRlcmVkID0gbmV3IEFycmF5KGxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBmaWx0ZXJlZFtpXSA9IGZpbHRlckZuKHZhbHVlc1tpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc29sdmVBbGwoZmlsdGVyZWQsIGxhYmVsKS50aGVuKGZ1bmN0aW9uIChmaWx0ZXJlZCkge1xuICAgICAgdmFyIHJlc3VsdHMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICAgIHZhciBuZXdMZW5ndGggPSAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmaWx0ZXJlZFtpXSkge1xuICAgICAgICAgIHJlc3VsdHNbbmV3TGVuZ3RoXSA9IHZhbHVlc1tpXTtcbiAgICAgICAgICBuZXdMZW5ndGgrKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXN1bHRzLmxlbmd0aCA9IG5ld0xlbmd0aDtcblxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSk7XG4gIH0pO1xufVxuXG52YXIgbGVuID0gMDtcbnZhciB2ZXJ0eE5leHQgPSB1bmRlZmluZWQ7XG5mdW5jdGlvbiBhc2FwJDEoY2FsbGJhY2ssIGFyZykge1xuICBxdWV1ZSQxW2xlbl0gPSBjYWxsYmFjaztcbiAgcXVldWUkMVtsZW4gKyAxXSA9IGFyZztcbiAgbGVuICs9IDI7XG4gIGlmIChsZW4gPT09IDIpIHtcbiAgICAvLyBJZiBsZW4gaXMgMSwgdGhhdCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gc2NoZWR1bGUgYW4gYXN5bmMgZmx1c2guXG4gICAgLy8gSWYgYWRkaXRpb25hbCBjYWxsYmFja3MgYXJlIHF1ZXVlZCBiZWZvcmUgdGhlIHF1ZXVlIGlzIGZsdXNoZWQsIHRoZXlcbiAgICAvLyB3aWxsIGJlIHByb2Nlc3NlZCBieSB0aGlzIGZsdXNoIHRoYXQgd2UgYXJlIHNjaGVkdWxpbmcuXG4gICAgc2NoZWR1bGVGbHVzaCQxKCk7XG4gIH1cbn1cblxudmFyIGJyb3dzZXJXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcbnZhciBicm93c2VyR2xvYmFsID0gYnJvd3NlcldpbmRvdyB8fCB7fTtcbnZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGJyb3dzZXJHbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBicm93c2VyR2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgaXNOb2RlID0gdHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAoe30pLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuLy8gdGVzdCBmb3Igd2ViIHdvcmtlciBidXQgbm90IGluIElFMTBcbnZhciBpc1dvcmtlciA9IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGltcG9ydFNjcmlwdHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCc7XG5cbi8vIG5vZGVcbmZ1bmN0aW9uIHVzZU5leHRUaWNrKCkge1xuICB2YXIgbmV4dFRpY2sgPSBwcm9jZXNzLm5leHRUaWNrO1xuICAvLyBub2RlIHZlcnNpb24gMC4xMC54IGRpc3BsYXlzIGEgZGVwcmVjYXRpb24gd2FybmluZyB3aGVuIG5leHRUaWNrIGlzIHVzZWQgcmVjdXJzaXZlbHlcbiAgLy8gc2V0SW1tZWRpYXRlIHNob3VsZCBiZSB1c2VkIGluc3RlYWQgaW5zdGVhZFxuICB2YXIgdmVyc2lvbiA9IHByb2Nlc3MudmVyc2lvbnMubm9kZS5tYXRjaCgvXig/OihcXGQrKVxcLik/KD86KFxcZCspXFwuKT8oXFwqfFxcZCspJC8pO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2ZXJzaW9uKSAmJiB2ZXJzaW9uWzFdID09PSAnMCcgJiYgdmVyc2lvblsyXSA9PT0gJzEwJykge1xuICAgIG5leHRUaWNrID0gc2V0SW1tZWRpYXRlO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG5leHRUaWNrKGZsdXNoKTtcbiAgfTtcbn1cblxuLy8gdmVydHhcbmZ1bmN0aW9uIHVzZVZlcnR4VGltZXIoKSB7XG4gIGlmICh0eXBlb2YgdmVydHhOZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2ZXJ0eE5leHQoZmx1c2gpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHVzZVNldFRpbWVvdXQoKTtcbn1cblxuZnVuY3Rpb24gdXNlTXV0YXRpb25PYnNlcnZlcigpIHtcbiAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpO1xuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbm9kZS5kYXRhID0gaXRlcmF0aW9ucyA9ICsraXRlcmF0aW9ucyAlIDI7XG4gIH07XG59XG5cbi8vIHdlYiB3b3JrZXJcbmZ1bmN0aW9uIHVzZU1lc3NhZ2VDaGFubmVsKCkge1xuICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZsdXNoO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1c2VTZXRUaW1lb3V0KCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZsdXNoLCAxKTtcbiAgfTtcbn1cblxudmFyIHF1ZXVlJDEgPSBuZXcgQXJyYXkoMTAwMCk7XG5cbmZ1bmN0aW9uIGZsdXNoKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gcXVldWUkMVtpXTtcbiAgICB2YXIgYXJnID0gcXVldWUkMVtpICsgMV07XG5cbiAgICBjYWxsYmFjayhhcmcpO1xuXG4gICAgcXVldWUkMVtpXSA9IHVuZGVmaW5lZDtcbiAgICBxdWV1ZSQxW2kgKyAxXSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGxlbiA9IDA7XG59XG5cbmZ1bmN0aW9uIGF0dGVtcHRWZXJ0ZXgoKSB7XG4gIHRyeSB7XG4gICAgdmFyIHIgPSByZXF1aXJlO1xuICAgIHZhciB2ZXJ0eCA9IHIoJ3ZlcnR4Jyk7XG4gICAgdmVydHhOZXh0ID0gdmVydHgucnVuT25Mb29wIHx8IHZlcnR4LnJ1bk9uQ29udGV4dDtcbiAgICByZXR1cm4gdXNlVmVydHhUaW1lcigpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHVzZVNldFRpbWVvdXQoKTtcbiAgfVxufVxuXG52YXIgc2NoZWR1bGVGbHVzaCQxID0gdW5kZWZpbmVkO1xuLy8gRGVjaWRlIHdoYXQgYXN5bmMgbWV0aG9kIHRvIHVzZSB0byB0cmlnZ2VyaW5nIHByb2Nlc3Npbmcgb2YgcXVldWVkIGNhbGxiYWNrczpcbmlmIChpc05vZGUpIHtcbiAgc2NoZWR1bGVGbHVzaCQxID0gdXNlTmV4dFRpY2soKTtcbn0gZWxzZSBpZiAoQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgc2NoZWR1bGVGbHVzaCQxID0gdXNlTXV0YXRpb25PYnNlcnZlcigpO1xufSBlbHNlIGlmIChpc1dvcmtlcikge1xuICBzY2hlZHVsZUZsdXNoJDEgPSB1c2VNZXNzYWdlQ2hhbm5lbCgpO1xufSBlbHNlIGlmIChicm93c2VyV2luZG93ID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgc2NoZWR1bGVGbHVzaCQxID0gYXR0ZW1wdFZlcnRleCgpO1xufSBlbHNlIHtcbiAgc2NoZWR1bGVGbHVzaCQxID0gdXNlU2V0VGltZW91dCgpO1xufVxuXG52YXIgcGxhdGZvcm0gPSB1bmRlZmluZWQ7XG5cbi8qIGdsb2JhbCBzZWxmICovXG5pZiAodHlwZW9mIHNlbGYgPT09ICdvYmplY3QnKSB7XG4gIHBsYXRmb3JtID0gc2VsZjtcblxuICAvKiBnbG9iYWwgZ2xvYmFsICovXG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnKSB7XG4gICAgcGxhdGZvcm0gPSBnbG9iYWw7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdubyBnbG9iYWw6IGBzZWxmYCBvciBgZ2xvYmFsYCBmb3VuZCcpO1xuICB9XG5cbnZhciBfYXN5bmMkZmlsdGVyO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG4vLyBkZWZhdWx0c1xuXG4vLyB0aGUgZGVmYXVsdCBleHBvcnQgaGVyZSBpcyBmb3IgYmFja3dhcmRzIGNvbXBhdDpcbi8vICAgaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9pc3N1ZXMvNDM0XG5jb25maWcuYXN5bmMgPSBhc2FwJDE7XG5jb25maWcuYWZ0ZXIgPSBmdW5jdGlvbiAoY2IpIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoY2IsIDApO1xufTtcbnZhciBjYXN0ID0gcmVzb2x2ZSQzO1xuXG52YXIgYXN5bmMgPSBmdW5jdGlvbiBhc3luYyhjYWxsYmFjaywgYXJnKSB7XG4gIHJldHVybiBjb25maWcuYXN5bmMoY2FsbGJhY2ssIGFyZyk7XG59O1xuXG5mdW5jdGlvbiBvbigpIHtcbiAgY29uZmlnWydvbiddLmFwcGx5KGNvbmZpZywgYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gb2ZmKCkge1xuICBjb25maWdbJ29mZiddLmFwcGx5KGNvbmZpZywgYXJndW1lbnRzKTtcbn1cblxuLy8gU2V0IHVwIGluc3RydW1lbnRhdGlvbiB0aHJvdWdoIGB3aW5kb3cuX19QUk9NSVNFX0lOVFJVTUVOVEFUSU9OX19gXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvd1snX19QUk9NSVNFX0lOU1RSVU1FTlRBVElPTl9fJ10gPT09ICdvYmplY3QnKSB7XG4gIHZhciBjYWxsYmFja3MgPSB3aW5kb3dbJ19fUFJPTUlTRV9JTlNUUlVNRU5UQVRJT05fXyddO1xuICBjb25maWd1cmUoJ2luc3RydW1lbnQnLCB0cnVlKTtcbiAgZm9yICh2YXIgZXZlbnROYW1lIGluIGNhbGxiYWNrcykge1xuICAgIGlmIChjYWxsYmFja3MuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKSkge1xuICAgICAgb24oZXZlbnROYW1lLCBjYWxsYmFja3NbZXZlbnROYW1lXSk7XG4gICAgfVxuICB9XG59dmFyIHJzdnAgPSAoX2FzeW5jJGZpbHRlciA9IHtcbiAgYXNhcDogYXNhcCQxLFxuICBjYXN0OiBjYXN0LFxuICBQcm9taXNlOiBQcm9taXNlJDEsXG4gIEV2ZW50VGFyZ2V0OiBFdmVudFRhcmdldCxcbiAgYWxsOiBhbGwkMyxcbiAgYWxsU2V0dGxlZDogYWxsU2V0dGxlZCQxLFxuICByYWNlOiByYWNlJDMsXG4gIGhhc2g6IGhhc2gkMSxcbiAgaGFzaFNldHRsZWQ6IGhhc2hTZXR0bGVkJDEsXG4gIHJldGhyb3c6IHJldGhyb3ckMSxcbiAgZGVmZXI6IGRlZmVyJDEsXG4gIGRlbm9kZWlmeTogZGVub2RlaWZ5JDEsXG4gIGNvbmZpZ3VyZTogY29uZmlndXJlLFxuICBvbjogb24sXG4gIG9mZjogb2ZmLFxuICByZXNvbHZlOiByZXNvbHZlJDMsXG4gIHJlamVjdDogcmVqZWN0JDMsXG4gIG1hcDogbWFwJDFcbn0sIF9kZWZpbmVQcm9wZXJ0eShfYXN5bmMkZmlsdGVyLCAnYXN5bmMnLCBhc3luYyksIF9kZWZpbmVQcm9wZXJ0eShfYXN5bmMkZmlsdGVyLCAnZmlsdGVyJywgLy8gYmFiZWwgc2VlbXMgdG8gZXJyb3IgaWYgYXN5bmMgaXNuJ3QgYSBjb21wdXRlZCBwcm9wIGhlcmUuLi5cbmZpbHRlciQxKSwgX2FzeW5jJGZpbHRlcik7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJzdnA7XG5leHBvcnRzLmFzYXAgPSBhc2FwJDE7XG5leHBvcnRzLmNhc3QgPSBjYXN0O1xuZXhwb3J0cy5Qcm9taXNlID0gUHJvbWlzZSQxO1xuZXhwb3J0cy5FdmVudFRhcmdldCA9IEV2ZW50VGFyZ2V0O1xuZXhwb3J0cy5hbGwgPSBhbGwkMztcbmV4cG9ydHMuYWxsU2V0dGxlZCA9IGFsbFNldHRsZWQkMTtcbmV4cG9ydHMucmFjZSA9IHJhY2UkMztcbmV4cG9ydHMuaGFzaCA9IGhhc2gkMTtcbmV4cG9ydHMuaGFzaFNldHRsZWQgPSBoYXNoU2V0dGxlZCQxO1xuZXhwb3J0cy5yZXRocm93ID0gcmV0aHJvdyQxO1xuZXhwb3J0cy5kZWZlciA9IGRlZmVyJDE7XG5leHBvcnRzLmRlbm9kZWlmeSA9IGRlbm9kZWlmeSQxO1xuZXhwb3J0cy5jb25maWd1cmUgPSBjb25maWd1cmU7XG5leHBvcnRzLm9uID0gb247XG5leHBvcnRzLm9mZiA9IG9mZjtcbmV4cG9ydHMucmVzb2x2ZSA9IHJlc29sdmUkMztcbmV4cG9ydHMucmVqZWN0ID0gcmVqZWN0JDM7XG5leHBvcnRzLm1hcCA9IG1hcCQxO1xuZXhwb3J0cy5hc3luYyA9IGFzeW5jO1xuZXhwb3J0cy5maWx0ZXIgPSBmaWx0ZXIkMTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cnN2cC5tYXBcbiJdfQ==

//# sourceMappingURL=algorithm_visualizer.js.map