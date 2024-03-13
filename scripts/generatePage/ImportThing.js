class ImportThing {
  constructor(path, def = null) {
    this.path = path;
    this.def = def;
    this.secondary = new Set([]);
  }

  setDefault(def) {
    this.def = def;
  }

  addNamed(item) {
    this.secondary.add(item);
  }

  asImportStr() {
    let imp = 'import';
    if (this.def) {
      imp += ` ${this.def}`;
    }
    if (this.def && this.secondary.size > 0) {
      imp += ',';
    }
    if (this.secondary.size > 0) {
      const objects = Array.from(this.secondary.values()).join(', ');
      imp += ` { ${objects} }`;
    }

    imp += ` from '${this.path}';`;
    return imp;
  }
}

export default ImportThing;
