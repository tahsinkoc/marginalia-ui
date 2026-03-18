type CreateUsageSnippetOptions = {
  react?: boolean;
  imports?: string[];
  typeImports?: string[];
  body: string;
};

export function createUsageSnippet({
  react = false,
  imports = [],
  typeImports = [],
  body
}: CreateUsageSnippetOptions) {
  const blocks: string[] = [];

  if (react) {
    blocks.push(`import * as React from "react";`);
  }

  if (imports.length > 0) {
    blocks.push(formatImport(imports, "@marginalia/ui"));
  }

  if (typeImports.length > 0) {
    blocks.push(formatImport(typeImports, "@marginalia/ui", true));
  }

  blocks.push(body.trim());

  return blocks.join("\n\n");
}

function formatImport(names: string[], source: string, isType = false) {
  const sortedNames = [...names].sort((left, right) => left.localeCompare(right));

  if (sortedNames.length === 1) {
    return `import ${isType ? "type " : ""}{ ${sortedNames[0]} } from "${source}";`;
  }

  return [
    `import ${isType ? "type " : ""}{`,
    ...sortedNames.map((name) => `  ${name},`),
    `} from "${source}";`
  ].join("\n");
}
