"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerdb = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("@schematics/angular/utility/workspace");
const parse_name_1 = require("@schematics/angular/utility/parse-name");
function triggerdb(_options) {
    return (tree, _context) => __awaiter(this, void 0, void 0, function* () {
        const workspace = yield (0, workspace_1.getWorkspace)(tree);
        if (!_options.project) {
            _options.project = workspace.projects.keys().next().value;
        }
        const project = workspace.projects.get(_options.project);
        if (!project) {
            throw new schematics_1.SchematicsException(`Invalid project name: ${_options.project}`);
        }
        if (_options.path === undefined) {
            _options.path = yield (0, workspace_1.createDefaultPath)(tree, _options.project);
        }
        const parsedPath = (0, parse_name_1.parseName)(_options.path, _options.name);
        _options.name = parsedPath.name;
        _options.path = parsedPath.path;
        const sourceTemplate = (0, schematics_1.url)("./files");
        const sourceParameterizedTemplate = (0, schematics_1.apply)(sourceTemplate, [
            (0, schematics_1.template)(Object.assign(Object.assign(Object.assign({}, _options), core_1.strings), { prename: (str) => '_' + core_1.strings.dasherize(str), postname: (str) => core_1.strings.dasherize(str) + '_', prepostname: (str) => '_' + core_1.strings.dasherize(str) + '_' })),
            (0, schematics_1.move)(parsedPath.path)
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.mergeWith)(sourceParameterizedTemplate, schematics_1.MergeStrategy.Overwrite)]);
    });
}
exports.triggerdb = triggerdb;
//# sourceMappingURL=index.js.map