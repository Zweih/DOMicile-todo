/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor($htmlArr) {\n    this.$htmlArr = $htmlArr;\n  }\n\n  html(string = null) {\n    if (string && typeof string === \"string\") {\n      this.$htmlArr.forEach( (el) => {\n        el.innerHTML = string;\n      });\n    } else {\n      return this.$htmlArr[0];\n    }\n  }\n\n  empty() {\n    this.html('');\n  }\n\n  append(arg) {\n    let thing = arg;\n\n    if (arg instanceof HTMLElement) {\n      thing = arg.outerHTML;\n    } else if (arg instanceof DOMNodeCollection) {\n      this.$htmlArr.forEach((node) => {\n        arg.$htmlArr.forEach((childNode) => {\n          node.appendChild(childNode.cloneNode(true));\n        });\n      });\n      return undefined;\n    } else if (arg instanceof Object) {\n      thing = \"\";\n\n      for (let i = 0; i < arg.length; i++) {\n        thing += arg[i].outerHTML;\n      }\n    }\n\n    this.$htmlArr.forEach( (el) => {\n      el.innerHTML += thing;\n    });\n  }\n\n  children() {\n    const array = [];\n\n    this.$htmlArr.forEach( (el) => {\n      Array.from(el.children).forEach( (child) => {\n        array.push(child);\n      });\n    });\n\n    return new DOMNodeCollection(array);\n  }\n\n  parent() {\n    const array = [];\n\n    this.$htmlArr.forEach( (el) => {\n      const parent = el.parentElement;\n\n      if (!parent.visited) {\n        array.push(el.parentElement);\n        parent.visited = true;\n      }\n    });\n\n    return new DOMNodeCollection(array);\n  }\n\n  find(selector) {\n    const arr = [];\n\n    this.$htmlArr.forEach( (el) => {\n      Array.from(el.querySelectorAll(selector)).forEach( (node) => {\n        arr.push(node);\n      });\n    });\n\n    return new DOMNodeCollection(arr);\n  }\n\n  remove() {\n    this.each((child) => {\n      const parent = child.parentElement;\n      parent.removeChild(child);\n    });\n  }\n\n  on(e, callback) {\n    this.each((child) => {\n      child.addEventListener(e, callback);\n      const eKey = `jqliteEvents-${e}`;\n      if (typeof child[eKey] === \"undefined\") {\n        child[eKey] = [];\n      }\n      child[eKey].push(callback);\n    });\n  }\n\n  off(e) {\n    this.each((child) => {\n      const eKey = `jqliteEvents-${e}`;\n      if (child[eKey]) {\n        child[eKey].forEach((cb) => {\n          child.removeEventListener(e, cb);\n        });\n      }\n    });\n  }\n\n  each(callback) {\n    this.$htmlArr.forEach(callback);\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nconst xmlHttp = new XMLHttpRequest();\nconst callbackFns = [];\nlet isDocReady = false;\n\nxmlHttp.onreadystatechange = (func) => {\n  if (this.readyState == 4 && this.status == 200) {\n    func(this.responseText);\n  }\n};\n\nconst defaultRequest = {\n  type: \"GET\",\n  url: window.location.href,\n  async: true,\n  success: () => {},\n  error: () => {},\n  data: {},\n};\n\nwindow.$d = (arg) => {\n  switch(typeof arg) {\n    case \"object\":\n      if (arg instanceof HTMLElement) {\n        return new DOMNodeCollection([arg]);\n      }\n      break;\n    case \"function\":\n      return pushCallbackFns(arg);\n    case \"string\":\n      return collectNodes(arg);\n  }\n};\n\nwindow.$d.extend = (first, ...targets) => {\n  targets.map( (target) => {\n    let x;\n\n    for(x in target) {\n      first[x] = target[x];\n    }\n  });\n\n  return first;\n};\n\nwindow.$d.ajax = (options) => {\n  const newRequest = Object.assign({}, defaultRequest, options);\n  xmlHttp.open(\n    newRequest.type,\n    newRequest.url,\n    newRequest.async,\n    newRequest.success,\n    newRequest.error,\n    newRequest.data,\n  );\n\n  xmlHttp.send(JSON.stringify(options.data));\n};\n\nconst collectNodes = (selector) => {\n  const nodes = document.querySelectorAll(selector);\n  return new DOMNodeCollection(Array.from(nodes));\n};\n\nconst pushCallbackFns = (func) => {\n  if(isDocReady) {\n    callbackFns.push(func)\n  } else {\n    func();\n  }\n};\n\nconst executeFns = (funcs) => {\n  funcs.forEach((func) => {\n    func.call();\n  });\n};\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  isDocReady = true;\n  executeFns(callbackFns);\n});\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });