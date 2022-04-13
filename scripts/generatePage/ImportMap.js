const ImportThing = require('./ImportThing');

class ImportMap {
  constructor() {
    this.map = new Map([]);
  }

  addImportDefault(path, def) {
    const importer = this.getImporter(path);
    importer.setDefault(def);
  }

  addNamed(path, item) {
    const importer = this.getImporter(path);
    importer.addNamed(item);
  }

  getImporter(path) {
    let importer;
    if (this.map.has(path)) {
      importer = this.map.get(path);
    } else {
      importer = new ImportThing(path);
      this.map.set(path, importer);
    }
    return importer;
  }

  asImportStatements() {
    return Array.from(this.map.values())
      .map((thing) => thing.asImportStr())
      .join('\n');
  }
}

module.exports = ImportMap;
