(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/tki-file-manager"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!E:\\project\\myApplication\\components\\tki-file-manager.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!E:/project/myApplication/components/tki-file-manager.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
var _default =
{
  name: 'tki-file-manager',
  props: {},
  data: function data() {
    return {};

  },
  methods: {
    _openFile: function _openFile() {

      if (plus.os.name.toLowerCase() != "android") {
        uni.showModal({
          title: '提示',
          content: '仅支持Android平台',
          success: function success(res) {} });

        return false;
      }
      var that = this;
      // java 代码来自 http://www.cnblogs.com/panhouye/archive/2017/04/23/6751710.html
      var main = plus.android.runtimeMainActivity();
      var Intent = plus.android.importClass("android.content.Intent");

      // 
      var fileIntent = new Intent(Intent.ACTION_GET_CONTENT);
      //fileIntent.setType(“image/*”);//选择图片
      //fileIntent.setType(“audio/*”); //选择音频
      //fileIntent.setType(“video/*”); //选择视频 （mp4 3gp 是android支持的视频格式）
      //fileIntent.setType(“video/*;image/*”);//同时选择视频和图片
      fileIntent.setType("*/*"); //无类型限制
      fileIntent.addCategory(Intent.CATEGORY_OPENABLE);
      main.startActivityForResult(fileIntent, 1);
      // 获取回调
      main.onActivityResult = function (requestCode, resultCode, data) {
        var Activity = plus.android.importClass("android.app.Activity");
        var ContentUris = plus.android.importClass("android.content.ContentUris");
        var Cursor = plus.android.importClass("android.database.Cursor");
        var Uri = plus.android.importClass("android.net.Uri");
        var Build = plus.android.importClass("android.os.Build");
        var Environment = plus.android.importClass("android.os.Environment");
        var DocumentsContract = plus.android.importClass("android.provider.DocumentsContract");
        var MediaStore = plus.android.importClass("android.provider.MediaStore");
        // 给系统导入 contentResolver
        var contentResolver = main.getContentResolver();
        plus.android.importClass(contentResolver);
        // 返回路径
        var path = '';
        if (resultCode == Activity.RESULT_OK) {
          var uri = data.getData();
          if ("file" == uri.getScheme().toLowerCase()) {//使用第三方应用打开
            path = uri.getPath();
            return;
          }
          if (Build.VERSION.SDK_INT > Build.VERSION_CODES.KITKAT) {//4.4以后
            path = getPath(this, uri);
          } else {//4.4以下下系统调用方法
            path = getRealPathFromURI(uri);
          }
          // 回调
          that.$emit('result', path);
        }
        // 4.4 以上 从Uri 获取文件绝对路径
        function getPath(context, uri) {
          var isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;
          var scheme = uri.getScheme().toLowerCase();
          if (isKitKat && DocumentsContract.isDocumentUri(context, uri)) {
            // ExternalStorageProvider
            if (isExternalStorageDocument(uri)) {
              var docId = DocumentsContract.getDocumentId(uri);
              var split = docId.split(":");
              var type = split[0];
              // 如果是手机内部存储
              if ("primary" == type.toLowerCase()) {
                return Environment.getExternalStorageDirectory() + "/" + split[1];
              } else {
                return '/storage/' + type + "/" + split[1];
              }
            }
            // DownloadsProvider
            else if (isDownloadsDocument(uri)) {
                var id = DocumentsContract.getDocumentId(uri);
                var _split = id.split(":");
                return _split[1];
                // console.log(id)
                // let contentUri = ContentUris.withAppendedId(Uri.parse("content://downloads/public_downloads"), id);
                // return getDataColumn(context, contentUri, null, null);
              }
              // MediaProvider
              else if (isMediaDocument(uri)) {
                  var _docId = DocumentsContract.getDocumentId(uri);
                  var _split2 = _docId.split(":");
                  var _type = _split2[0];
                  var contentUri = null;
                  if ("image" == _type.toLowerCase()) {
                    contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                  } else if ("video" == _type.toLowerCase()) {
                    contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                  } else if ("audio" == _type.toLowerCase()) {
                    contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                  }
                  var selection = "_id=?";
                  var selectionArgs = [_split2[1]];
                  return getDataColumn(context, contentUri, selection, selectionArgs);
                }
          }
          // MediaStore (and general)
          else if ("content" == scheme) {
              return getDataColumn(context, uri, null, null);
            }
            // File
            else if ("file" == scheme) {
                return uri.getPath();
              }
        }
        // 4.4 以下 获取 绝对路径
        function getRealPathFromURI(uri) {
          var res = null;
          var proj = [MediaStore.Images.Media.DATA];
          var cursor = contentResolver.query(uri, proj, null, null, null);
          if (null != cursor && cursor.moveToFirst()) {;
            var column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            res = cursor.getString(column_index);
            cursor.close();
          }
          return res;
        }
        // 通过uri 查找出绝对路径
        function getDataColumn(context, uri, selection, selectionArgs) {
          var cursor = null;
          var column = "_data";
          var projection = [column];
          // let contentResolver = context.getContentResolver()
          // plus.android.importClass(contentResolver);
          cursor = contentResolver.query(uri, projection, selection, selectionArgs, null);
          if (cursor != null && cursor.moveToFirst()) {
            var column_index = cursor.getColumnIndexOrThrow(column);
            return cursor.getString(column_index);
          }
        }
        function isExternalStorageDocument(uri) {
          return "com.android.externalstorage.documents" == uri.getAuthority() ? true : false;
        }
        function isDownloadsDocument(uri) {
          return "com.android.providers.downloads.documents" == uri.getAuthority() ? true : false;
        }
        function isMediaDocument(uri) {
          return "com.android.providers.media.documents" == uri.getAuthority() ? true : false;
        }
      };










    } },

  onLoad: function onLoad() {
    // 			plus.io.resolveLocalFileSystemURL( '/storage/emulated/0', function(fs) {
    // 				var directoryReader = fs.createReader();
    // 				directoryReader.readEntries(function(entries) {
    // 					var i;
    // 					for (i = 0; i < entries.length; i++) {
    // 						console.log(entries[i].name);
    // 					}
    // 				}, function(e) {
    // 					console.log("Read entries failed: " + e.message);
    // 				});
    // 			}, function(e) {
    // 				console.log("Request file system failed: " + e.message);
    // 			});
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!E:\\project\\myApplication\\components\\tki-file-manager.vue?vue&type=template&id=2c313363&xlang=wxml&minapp=mpvue&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!E:/project/myApplication/components/tki-file-manager.vue?vue&type=template&id=2c313363&xlang=wxml&minapp=mpvue& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "E:\\project\\myApplication\\components\\tki-file-manager.vue":
/*!****************************************************************!*\
  !*** E:/project/myApplication/components/tki-file-manager.vue ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tki_file_manager_vue_vue_type_template_id_2c313363_xlang_wxml_minapp_mpvue___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tki-file-manager.vue?vue&type=template&id=2c313363&xlang=wxml&minapp=mpvue& */ "E:\\project\\myApplication\\components\\tki-file-manager.vue?vue&type=template&id=2c313363&xlang=wxml&minapp=mpvue&");
/* harmony import */ var _tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tki-file-manager.vue?vue&type=script&lang=js& */ "E:\\project\\myApplication\\components\\tki-file-manager.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tki_file_manager_vue_vue_type_template_id_2c313363_xlang_wxml_minapp_mpvue___WEBPACK_IMPORTED_MODULE_0__["render"],
  _tki_file_manager_vue_vue_type_template_id_2c313363_xlang_wxml_minapp_mpvue___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/project/myApplication/components/tki-file-manager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "E:\\project\\myApplication\\components\\tki-file-manager.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** E:/project/myApplication/components/tki-file-manager.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./tki-file-manager.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!E:\\project\\myApplication\\components\\tki-file-manager.vue?vue&type=script&lang=js&");
/* harmony import */ var _F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tki_file_manager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "E:\\project\\myApplication\\components\\tki-file-manager.vue?vue&type=template&id=2c313363&xlang=wxml&minapp=mpvue&":
/*!***********************************************************************************************************************!*\
  !*** E:/project/myApplication/components/tki-file-manager.vue?vue&type=template&id=2c313363&xlang=wxml&minapp=mpvue& ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tki_file_manager_vue_vue_type_template_id_2c313363_xlang_wxml_minapp_mpvue___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./tki-file-manager.vue?vue&type=template&id=2c313363&xlang=wxml&minapp=mpvue& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!E:\\project\\myApplication\\components\\tki-file-manager.vue?vue&type=template&id=2c313363&xlang=wxml&minapp=mpvue&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tki_file_manager_vue_vue_type_template_id_2c313363_xlang_wxml_minapp_mpvue___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_HBuilderX012520180326_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tki_file_manager_vue_vue_type_template_id_2c313363_xlang_wxml_minapp_mpvue___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tki-file-manager-create-component',
    {
        'components/tki-file-manager-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('./node_modules/@dcloudio/uni-app-plus/dist/index.js')['createComponent'](__webpack_require__("E:\\project\\myApplication\\components\\tki-file-manager.vue"))
        })
    },
    [['components/tki-file-manager-create-component']]
]);                
