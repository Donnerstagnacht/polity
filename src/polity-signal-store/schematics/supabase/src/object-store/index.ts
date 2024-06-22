import {
    apply,
    chain,
    MergeStrategy,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    SchematicsException,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {createDefaultPath, getWorkspace} from '@schematics/angular/utility/workspace';
import {parseName} from '@schematics/angular/utility/parse-name';
import {Schema} from './schema';

export function object(_options: Schema): Rule {
    return async (tree: Tree, _context: SchematicContext) => {
        const workspace = await getWorkspace(tree);
        if (!_options.project) {
            _options.project = workspace.projects.keys().next().value;
        }
        const project = workspace.projects.get(_options.project);
        if (!project) {
            throw new SchematicsException(`Invalid project name: ${_options.project}`);
        }


        if (_options.path === undefined) {
            _options.path = await createDefaultPath(tree, _options.project as string);
        }

        const parsedPath = parseName(_options.path, _options.name);
        _options.name = parsedPath.name;
        _options.path = parsedPath.path;

        const sourceTemplate = url("./files");
        const sourceParameterizedTemplate = apply(sourceTemplate, [
            template({
                ..._options,
                ...strings,
                prename: (str: string) => '_' + strings.dasherize(str),
                postname: (str: string) => strings.dasherize(str) + '_',
                prepostname: (str: string) => '_' + strings.dasherize(str) + '_'
            }),
            move(parsedPath.path)
        ]);

        return chain([mergeWith(sourceParameterizedTemplate, MergeStrategy.Overwrite)]);
    };
}
