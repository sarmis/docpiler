# Docpiler

<b>Doc</b>ument Com<b>piler</b>

## Introduction

Docpiler is a document compiler. The intented use is to compile markdown annotated text files to html files in order to produce a functional website.

The target use cases are:
- To be used as a static site generator for blogs
- To be used as a documentation generator

In contrast with most npm packages, docpiler is supposed to be installed as a global package. 

Examples will be provided in the github repo.

## Project Status

This project is in __alpha__ version. It's quite possible that the upcomming releases __will break__ something. Please feel free to contact me directly or via github for any issues related to this package.


## Usage

- In a node.js script 
```
    const docpiler = require('docpiler');
    const doc = new docpiler(...);
    ...
```
- As a CLI tool (with a `docpiler.config` file)
```
    /> docpiler
```

## Examples

- [Examples](examples/README.md)

## Todos

- support default layout
```
project-root/
    docpiler.config (optional - hence the "default" layout)
    src/ (or source/)
        posts/
        pages/
        galleries/
    theme/ (or themes/default/)
    dist/ 
```

- support folder-scope front-matter

- Rename templates to themes


- Support docpiler-* modules discovery in:
  - docpiler's folder
  - project folder (docpiler.config folder)
  - global node_modules folder...